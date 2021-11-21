import React from 'react';
import {pick} from 'lodash';
import keycode from 'keycode';
import classNames from 'classnames';

import {
    shallowEqual,
} from './utils';

interface Props {
    useStaticHeight?: boolean;
    children: any;
    top?: number;
    zIndex?: number;
    validity?: boolean;
    onClick?: (event: any) => void;
    onTabWithin?: (event: any) => void;
    onFocusEnter?: (event: any) => void;
    onKeyDown?: (event: any) => void;
    onContextMenu?: (event: any, key?: string) => void;
    onMouseDown?: (event: any, key?: string) => void;
    onHeightChange?: (itemKey: string, height?: number) => void;
    itemKey?: string;
    hasFocus?: boolean;
    height?: number;
    id?: string;
    className?: string;
    role?: string;
    hasFocusWithin?: boolean;
    shouldHorizontallyScroll?: boolean;
    hasKeyboardFocus?: boolean;
    tabIndex?: number;
    dataQA?: string;
}

interface State {

}

const enterCode = keycode("enter");
const tabCode = keycode("tab");

export class ListItem extends React.Component<Props, State> {
    private node: any = undefined;
    private mutationObserver: any = undefined;

    constructor(props: Props) {
        super(props);

        if (!props.useStaticHeight) {
            this.mutationObserver = new MutationObserver(this.updateHeight);
        }

        this.node = null;
    }

    componentDidMount() {
        const {
            useStaticHeight,
        } = this.props;

        if (this.node && !useStaticHeight) {
            this.mutationObserver.observe(this.node, {
                subtree: true,
                childList: true,
                attributes: true,
                characterData: true,
            })

            this.node.addEventListener("load", this.updateHeight, true);
        }

        if (!useStaticHeight) {
            this.updateHeight();
        }

        this.maybeFocusNode();
    }

    shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
        const {
            children,
            top,
            zIndex,
        } = this.props;

        const i = pick(this.props, ["children", "validity", "height", "top", "zIndex"]);

        const {
            children: nextChildren,
            validity: nextValidity,
            top: nextTop,
            zIndex: nextZIndex,
        } = nextProps;

        const u = pick(nextProps, ["children", "validity", "height", "top", "zIndex"]);

        if (top !== nextTop || zIndex !== nextZIndex) {
            return true;
        }

        if (children && nextChildren) {
            if (!shallowEqual(nextChildren.props, children.props)) {
                return true;
            }

            if (nextChildren.key !== children.key) {
                return true;
            }
        }

        return !nextValidity || !shallowEqual(i, u);
    }

    componentDidUpdate() {
        if (!this.props.useStaticHeight) {
            this.updateHeight();
        }

        this.maybeFocusNode()
    }

    componentWillUnmount() {
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
            this.mutationObserver = null;
        }

        if (this.node) {
            this.node.removeEventListener("load", this.updateHeight, true);
        }
    }

    onClick = (event) => {
        this.props.onClick(Object.assign({
            id: this.props.itemKey,
        }, event))
    }

    onFocusEnter = (event) => {
        const {
            relatedEvent,
            target,
            currentTarget,
        } = event;

        const {
            itemKey,
            onTabWithin,
            onFocusEnter,
        } = this.props;

        if (relatedEvent && relatedEvent.type === "mousedown") {
            return;
        }

        if (target && (
            target instanceof HTMLMediaElement ||
            target.dataset.mediaFocusContainer
        )) {
            return;
        }

        if (relatedEvent && relatedEvent.keyCode === tabCode) {
            onTabWithin(Object.assign({
                id: itemKey,
            }, event));

            onFocusEnter(Object.assign({
                id: itemKey,
            }, event))
        }
    }

    onKeyDown = (event) => {
        const {
            target,
            currentTarget,
            keyCode,
        } = event;

        const {
            itemKey,
            onKeyDown,
            onClick,
        } = this.props;

        if (target === currentTarget) {
            onKeyDown(Object.assign({
                id: itemKey,
            }, event, {
                preventDefault: event.preventDefault,
                stopPropagation: event.stopPropagation,
            }));

            if (keyCode === enterCode) {
                onClick(Object.assign({
                    id: itemKey,
                }, event, {
                    preventDefault: event.preventDefault,
                    stopPropagation: event.stopPropagation,
                }))
            }
        }
    }

    onContextMenu = (event) => {
        const {
            itemKey,
            onContextMenu,
        } = this.props;

        onContextMenu(event, itemKey);
    }

    onMouseDown = (event) => {
        const {
            itemKey,
            onMouseDown,
        } = this.props;

        onMouseDown(event, itemKey);
    }

    setRef = (ref) => this.node = ref;

    maybeFocusNode = () => {
        if (this.props.hasFocus && this.node) {
            this.node.focus();
        }
    }

    updateHeight = () => {
        if (!this.node) return;

        const {
            height,
        } = this.node.getBoundingClientRect();

        if (Math.abs(height - this.props.height) > .5 || !this.props.validity) {
            this.props.onHeightChange(this.props.itemKey, height);
        }
    }

    render() {
        if (!this.props.children) return null;

        const {
            id: t,
            children: n,
            className,
            top: i,
            zIndex: o,
            role: d,
            height: u,
            hasFocus: p,
            hasFocusWithin: h,
            shouldHorizontallyScroll: f,
            tabIndex: _,
            useStaticHeight: g,
            hasKeyboardFocus: O,
            dataQA: v
        } = this.props;

        const j = pick(this.props,
            [
                "id",
                "children",
                "onFocusEnter",
                "onFocusWithin",
                "onFocusLeave",
                "onHeightChange",
                "onMouseDown",
                "onClick",
                "onKeyDown",
                "onContextMenu",
                "onTabWithin",
                "className",
                "top",
                "zIndex",
                "role",
                "height",
                "validity",
                "hasFocus",
                "hasFocusWithin",
                "shouldHorizontallyScroll",
                "tabIndex",
                "itemKey",
                "useStaticHeight",
                "hasKeyboardFocus",
                "dataQA"
            ]);

        const itemClass = classNames(className, "c-virtual_list__item", {
            "c-virtual_list__item--focus": p && O,
            "c-virtual_list__item--focus-within": h,
            "c-virtual_list__item--auto_width": f
        });


    }
}
