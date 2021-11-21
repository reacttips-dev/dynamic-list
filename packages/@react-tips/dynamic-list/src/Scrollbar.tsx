import React, {MouseEvent, UIEventHandler} from 'react';
import {noop} from 'lodash';
import classNames from 'classnames';

// import UserAgent from '@reacttips-dev/useragent';

import {Content} from './Content';

const defaultProps = {
    children: undefined,
    contentHeight: undefined,
    color: undefined,
    className: undefined,
    monkey: false,
    fade: false,
    alwaysVisible: false,
    anchor: "top",
    role: "presentation",
    "aria-label": undefined,
    "aria-describedby": undefined,
    onScroll: undefined,
    onContentScroll: noop,
    onTrackClick: undefined,
    initialScrollTop: 0,
    id: undefined,
    inheritSize: false,
    useFixedTrackHeight: false
}

interface Props {
    initialScrollTop?: number;
    anchor?: 'top' | 'bottom';
    onScroll?: (event: UIEventHandler<HTMLDivElement>) => void;
    onTrackClick?: (event: any) => any;
    contentHeight?: number;
    useFixedTrackHeight?: boolean;
    height?: number;
    width?: number;
    className?: string;
    onContentScroll?: () => void;
    inheritSize?: boolean;
    alwaysVisible?: boolean;
    role?: string;
    monkey?: string;
    fade: boolean;
    id?: string;
    color?: string;
}

interface State {
    height: number;
    top: number;
    hidden?: boolean;
}

export class Scrollbar extends React.PureComponent<Props, State> {
    static defaultProps = defaultProps;
    static displayName = "Scrollbar";
    static track = {
        to: e => {
            let {
                y: t,
                scrollTop: n,
                scrollHeight: a,
                trackHeight: r,
                barTop: s,
                barHeight: i
            } = e;
            return n + (t - s - i / 2) * (a / r)
        },
        page: e => {
            let {
                y: t,
                scrollTop: n,
                trackHeight: a,
                barTop: r
            } = e;
            return t < r ? n - (a - 21) : n + (a - 21)
        }
    }

    private scroller: any;
    private currentScrollTop: number;
    private dragging: boolean;
    private delta: {
        y?: number | null;
        top?: number | null;
        speed?: number | null;
    };
    private trackInterval: any;
    private trackTimeout: any;
    private trackAnimation: any;
    private track: any;

    constructor(props: Props) {
        super(props);

        this.scroller = null;
        this.currentScrollTop = 0;
        this.dragging = false;
        this.delta = {
            y: null,
            top: null,
            speed: null,
        }
        this.trackInterval = undefined;
        this.trackTimeout = undefined;
        this.trackAnimation = undefined;

        this.state = {
            height: 0,
            top: 0,
        }
    }

    componentDidMount() {
        this.scroller.scrollTop = this.props.initialScrollTop;
        this.update();
    }

    componentDidUpdate() {
        this.update()
    }

    componentWillUnmount() {
        if (this.trackAnimation) {
            this.trackAnimation.cancel();
        }
        clearInterval(this.trackInterval);
        clearTimeout(this.trackTimeout);
        window.removeEventListener("mouseup", this.onTrackUp);
    }

    onDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const {
            clientY,
        } = event;

        const scrollHeight = this.getScrollHeight();
        // TODO: ???
        const a = (clientY - this.delta.y) * this.delta.speed;
        const scrollTop = "top" === this.props.anchor ?
            this.delta.top + a : scrollHeight - (this.delta.top - a);
        this.scrollTop(scrollTop);
    }

    onDragEnd = () => {
        this.dragging = false;
        document.removeEventListener("mousemove", this.onDrag);
        document.removeEventListener("mouseup", this.onDragEnd);
        document.removeEventListener("mouseleave", this.onDragEnd);
    }

    onDragStart = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const scrollHeight = this.getScrollHeight();
        const trackHeight = this.getTrackHeight();

        this.dragging = true;
        this.delta.y = event.clientY;
        this.delta.top = "top" === this.props.anchor ?
            this.currentScrollTop : scrollHeight - this.currentScrollTop;
        this.delta.speed = scrollHeight / trackHeight;

        document.addEventListener("mousemove", this.onDrag);
        document.addEventListener("mouseup", this.onDragEnd);
        document.addEventListener("mouseleave", this.onDragEnd);
    }

    onScroll = (event) => {
        if (!this.scroller) return;

        const scrollTop = this.scroller.scrollTop;
        if (!scrollTop || (scrollTop !== this.currentScrollTop)) {
            this.currentScrollTop = scrollTop;
            this.update();
            if (this.props.onScroll) {
                this.props.onScroll(event);
            }
        }
    }

    onTrackDown = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const t = this.props.onTrackClick || Scrollbar.track.to;
        const offsetY = event.nativeEvent.offsetY;

        const a = () => {
            if (offsetY >= this.state.top && offsetY <= this.state.top + this.state.height) {
                clearInterval(this.trackInterval);
                return undefined;
            }

            const e = t({
                y: offsetY,
                scrollTop: this.currentScrollTop,
                scrollHeight: this.getScrollHeight(),
                trackHeight: this.getTrackHeight(),
                barTop: this.state.top,
                barHeight: this.state.height
            });
            this.scrollWithAnimation(e)
        }

        a();

        clearInterval(this.trackInterval);
        clearTimeout(this.trackTimeout);
        this.trackTimeout = setTimeout((() => {
            a();
            this.trackInterval = setInterval(a, 200);
        }), 500);

        window.addEventListener("mouseup", this.onTrackUp);
    }

    onTrackUp = () => {
        this.trackAnimation && this.trackAnimation.cancel();
        clearInterval(this.trackInterval);
        clearTimeout(this.trackTimeout);
        window.removeEventListener("mouseup", this.onTrackUp);
    };

    getBarHeight = (_scrollHeight?: number) => {
        let scrollHeight = _scrollHeight || this.getScrollHeight();
        const height = this.props.height;
        return scrollHeight === 0 ? 0 : height / scrollHeight * height;
    }

    getBoundingClientRect = () => {
        return this.scroller.getBoundingClientRect();
    }

    getScrollHeight = () => {
        const {
            contentHeight
        } = this.props;

        return contentHeight || this.scroller.scrollHeight;
    }

    getTrackHeight = () => {
        return this.props.useFixedTrackHeight ? this.props.height - 8 : this.track && this.track.offsetHeight
    }

    setRef = (ref: any) => {
        this.scroller = ref;
    }

    setTrackRef = (ref: any) => {
        this.track = ref;
    }

    scrollTop = (scrollTop?: number) => {
        if (this.scroller) {
            if (scrollTop) {
                this.scroller.scrollTop = scrollTop;
                return this.scroller.scrollTop;
            } else {
                return this.currentScrollTop;
            }
        }

        return null;
    }

    scrollWithAnimation = (event: any) => {
        // TODO: animation
    }

    update = () => {
        if (!this.scroller) return;
        const {
            height,
        } = this.props;

        const currentScrollTop = this.currentScrollTop;
        const scrollHeight = this.getScrollHeight();
        let barHeight = this.getBarHeight();
        barHeight = barHeight < 50 ? 50 : barHeight;

        const r = currentScrollTop / (scrollHeight - height) * (this.getTrackHeight() - barHeight),
            s = scrollHeight <= height;
        this.setState((() => ({
            height: barHeight,
            top: r,
            hidden: s
        })))
    }

    render() {
        const {
            width,
            height,
            children,
            className,
            onContentScroll,
            inheritSize,
            alwaysVisible,
            role,
            monkey,
            fade,
            id,
            color,
        } = this.props;

        const _ = /*UserAgent.isBrowser("Firefox")*/false ? -1 : undefined;

        return (
            <div
                id={id}
                role={role}
                aria-label={this.props['aria-label']}
                aria-describedby={this.props['aria-describedby']}
                className={classNames(className, "c-scrollbar", {
                    "c-scrollbar--hidden": this.state.hidden,
                    "c-scrollbar--monkey": monkey,
                    "c-scrollbar--fade": fade,
                    "c-scrollbar--inherit_size": inheritSize,
                    "c-scrollbar--always_visible": alwaysVisible,
                })}
                style={inheritSize ? undefined : {
                    width,
                    height,
                }}
            >
                <div
                    ref={this.setRef}
                    role="presentation"
                    className="c-scrollbar__hider"
                    tabIndex={_}
                    onScroll={this.onScroll}
                >
                    <Content
                        width={width}
                        onScroll={onContentScroll}
                    >
                        {children}
                    </Content>
                </div>
                <div
                    ref={this.setTrackRef}
                    role="presentation"
                    className="c-scrollbar__track"
                    onMouseDown={this.onTrackDown}
                    onMouseUp={this.onTrackUp}
                >
                    <div
                        role="presentation"
                        className="c-scrollbar__bar"
                        style={{
                            height: this.state.height,
                            transform: "translateY(" + Math.floor(this.state.top) + "px)",
                            background: color,
                        }}
                        onClick={(event) => {
                            event.stopPropagation()
                        }}
                        onMouseDown={this.onDragStart}
                        tabIndex={-1}
                    />
                </div>
            </div>
        )
    }
}
