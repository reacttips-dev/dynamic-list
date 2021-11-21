message_pane_input_disabled_MessagePaneInputDisabled.displayName = "MessagePaneInputDisabled", message_pane_input_disabled_MessagePaneInputDisabled.defaultProps = ie;
const oe = {
        closeChannelApi: c.a,
        archiveChannel: l.a,
        displayModelOrViewById: h.a,
        openSlackConnectDmInviteModal: S.a
    },
    ce = Object(F.a)(message_pane_input_disabled_MessagePaneInputDisabled, "MessagePaneInputDisabled", {
        index: 8
    }),
    le = Object(o.a)(((e, t) => {
        let {
            teamId: n,
            channelId: a
        } = t;
        const r = Object(d.b)(e, a),
            s = Object(v.g)(r) ? Object(m.e)(e, Object(g.a)(r)) : null,
            i = Object(_.fb)(e, r),
            o = Object(_.gb)(e, r),
            c = Object(p.a)(e),
            l = Object(_.db)(e, r),
            h = Object(P.a)(e, a),
            O = Object(D.a)(e, a);
        return {
            channel: r,
            member: s,
            channelIsIMWithDeletedMember: i,
            channelIsSeveredIm: o,
            channelIsImWithApp: l,
            prevChannelId: c,
            showCloseButton: !Object(f.a)(r) && (Object(b.a)(r) || i),
            isChannelFrozenAndInGracePeriod: Object(_.bb)(n, r),
            clogger: Object(R.a)({
                state: e
            }),
            isMessagesEnabledForApp: h,
            isMessagesReadOnlyEnabledForApp: O,
            userAttentionIsOnChat: Object(y.f)(e),
            composerVisible: Object(E.a)(e),
            canUserResumeDm: Object(C.b)(e),
            experimentScIntroductionsShareContactGroupOn: "on" === Object(u.d)(e, "sc_introductions_share_contact")
        }
    }), oe)(ce);
t.a = i.a.forwardRef(((e, t) => i.a.createElement(le, Object(a.a)({}, e, {
    refToForward: t
}))))
}, "3L56": function(e, t, n) {
    "use strict";
    var a = n("9oTK"),
        r = n("6jsb"),
        s = n("kQBZ"),
        i = n("RqAw"),
        o = n("B1w/");
    const c = Object(r.c)("Fetch Slack Doc file IDs for and re-map", function() {
        var e = Object(a.coroutine)((function*(e, t, n) {
            let {
                quipThreadId: a,
                reason: r = "get-and-upsert-slack-doc-file-id"
            } = n;
            const c = Object(o.a)(t(), a);
            if (c) return c;
            const {
                file_id: l
            } = yield e(Object(s.O)({
                quipThreadId: a,
                reason: r
            }));
            return e(Object(i.a)({
                objects: [{
                    id: a,
                    fileId: l
                }]
            })), l
        }));
        return function(t, n, a) {
            return e.apply(this, arguments)
        }
    }());
    c.meta = {
        name: "getAndUpsertSlackDocFileId",
        key: "slackDocFileIdsStoreThunksGetAndUpsertSlackDocFileIdGetAndUpsertSlackDocFileId",
        description: "Fetch Slack Doc file IDs for and re-map"
    }, t.a = c
}, "3Ldm": function(e, t, n) {
    "use strict";
    var a = n("ifKl"),
        r = n("q1tI"),
        s = n.n(r),
        i = (n("n3tL"), n("iuhU")),
        o = n("mYQK"),
        c = n.n(o),
        l = n("C59p"),
        d = n("jWJI");
    const u = e => {
        let {
            onScroll: t,
            children: n,
            width: a,
            role: r
        } = e;
        return s.a.createElement("div", {
            onScroll: t,
            role: r,
            className: "c-scrollbar__child",
            style: {
                width: a
            }
        }, n)
    };
    u.displayName = "Content", u.defaultProps = {
        children: null,
        role: "presentation",
        onScroll: a.a
    };
    var m = s.a.memo(u);
    n("Km4y");
    const p = e => e.stopPropagation(),
        h = {
            children: void 0,
            contentHeight: void 0,
            color: void 0,
            className: void 0,
            monkey: !1,
            fade: !1,
            alwaysVisible: !1,
            anchor: "top",
            role: "presentation",
            "aria-label": void 0,
            "aria-describedby": void 0,
            onScroll: void 0,
            onContentScroll: a.a,
            onTrackClick: void 0,
            initialScrollTop: 0,
            id: void 0,
            inheritSize: !1,
            useFixedTrackHeight: !1
        };

    class scrollbar_Scrollbar extends r.PureComponent {
        constructor(e) {
            super(e), this.scroller = null, this.currentScrollTop = 0, this.dragging = !1, this.delta = {
                y: null,
                top: null,
                speed: null
            }, this.trackInterval = void 0, this.trackTimeout = void 0, this.trackAnimation = void 0, this.onScroll = this.onScroll.bind(this), this.onDragStart = this.onDragStart.bind(this), this.onDragEnd = this.onDragEnd.bind(this), this.onDrag = this.onDrag.bind(this), this.onTrackDown = this.onTrackDown.bind(this), this.onTrackUp = this.onTrackUp.bind(this), this.setRef = this.setRef.bind(this), this.setTrackRef = this.setTrackRef.bind(this), this.state = {
                height: 0,
                top: 0
            }
        }
        componentDidMount() {
            this.scroller.scrollTop = this.props.initialScrollTop
        }
        componentDidUpdate() {
            this.update()
        }

        componentWillUnmount() {
            this.trackAnimation && this.trackAnimation.cancel(), clearInterval(this.trackInterval), clearTimeout(this.trackTimeout), window.removeEventListener("mouseup", this.onTrackUp)
        }

        onDrag(e) {
            e.preventDefault(), e.stopPropagation();
            const t = e.clientY,
                n = this.getScrollHeight(),
                a = (t - this.delta.y) * this.delta.speed,
                r = "top" === this.props.anchor ? this.delta.top + a : n - (this.delta.top - a);
            this.scrollTop(r)
        }
        onDragEnd() {
            this.dragging = !1, document.removeEventListener("mousemove", this.onDrag), document.removeEventListener("mouseup", this.onDragEnd), document.removeEventListener("mouseleave", this.onDragEnd)
        }
        onDragStart(e) {
            e.preventDefault(), e.stopPropagation();
            const t = this.getScrollHeight(),
                n = this.getTrackHeight();
            this.dragging = !0, this.delta.y = e.clientY, this.delta.top = "top" === this.props.anchor ? this.currentScrollTop : t - this.currentScrollTop, this.delta.speed = t / n, document.addEventListener("mousemove", this.onDrag), document.addEventListener("mouseup", this.onDragEnd), document.addEventListener("mouseleave", this.onDragEnd)
        }
        onScroll(e) {
            if (!this.scroller) return;
            const t = this.scroller.scrollTop;
            t && t === this.currentScrollTop || (this.currentScrollTop = t, this.update(), this.props.onScroll && this.props.onScroll(e))
        }
        onTrackDown(e) {
            e.preventDefault(), e.stopPropagation();
            const t = this.props.onTrackClick || scrollbar_Scrollbar.track.to,
                n = e.nativeEvent.offsetY,
                a = () => {
                    if (n >= this.state.top && n <= this.state.top + this.state.height) return void clearInterval(this.trackInterval);
                    const e = t({
                        y: n,
                        scrollTop: this.currentScrollTop,
                        scrollHeight: this.getScrollHeight(),
                        trackHeight: this.getTrackHeight(),
                        barTop: this.state.top,
                        barHeight: this.state.height
                    });
                    this.scrollWithAnimation(e)
                };
            a(), clearInterval(this.trackInterval), clearTimeout(this.trackTimeout), this.trackTimeout = setTimeout((() => {
                a(), this.trackInterval = setInterval(a, 200)
            }), 500), window.addEventListener("mouseup", this.onTrackUp)
        }
        onTrackUp() {
            this.trackAnimation && this.trackAnimation.cancel(), clearInterval(this.trackInterval), clearTimeout(this.trackTimeout), window.removeEventListener("mouseup", this.onTrackUp)
        }
        getBarHeight() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.getScrollHeight();
            const t = this.props.height;
            return 0 === e ? 0 : t / e * t
        }
        getBoundingClientRect() {
            return this.scroller.getBoundingClientRect()
        }
        getScrollHeight() {
            const {
                contentHeight: e
            } = this.props;
            return void 0 !== e ? e : this.scroller.scrollHeight
        }
        getTrackHeight() {
            return this.props.useFixedTrackHeight ? this.props.height - 8 : this.track && this.track.offsetHeight
        }
        setRef(e) {
            this.scroller = e
        }
        setTrackRef(e) {
            this.track = e
        }
        scrollTop(e) {
            return this.scroller ? void 0 !== e ? (this.scroller.scrollTop = e, this.scroller.scrollTop) : this.currentScrollTop : null
        }
        scrollWithAnimation(e) {
            let t = 0;
            return this.trackAnimation && this.trackAnimation.cancel(), this.trackAnimation = Object(l.a)({
                fromValue: this.scroller.scrollTop,
                toValue: e,
                duration: 200,
                delta: !0,
                onTick: e => {
                    let {
                        value: n,
                        nextTick: a
                    } = e;
                    const r = this.scroller.scrollTop + n + t,
                        s = Math.round(r);
                    t = r - s, this.scrollTop(s), a()
                }
            }), this.trackAnimation
        }
        update() {
            if (!this.scroller) return;
            const {
                height: e
            } = this.props, t = this.currentScrollTop, n = this.getScrollHeight();
            let a = this.getBarHeight(n);
            a = a < 50 ? 50 : a;
            const r = t / (n - e) * (this.getTrackHeight() - a),
                s = n <= e;
            this.setState((() => ({
                height: a,
                top: r,
                hidden: s
            })))
        }
        render() {
            const {
                width: e,
                height: t,
                children: n,
                className: a,
                onContentScroll: r,
                inheritSize: o,
                alwaysVisible: l,
                role: d,
                monkey: u,
                fade: h,
                id: b,
                color: f
            } = this.props, _ = c.a.firefox ? "-1" : void 0;
            return s.a.createElement("div", {
                role: d,
                "aria-label": this.props["aria-label"],
                "aria-describedby": this.props["aria-describedby"],
                className: Object(i.a)(a, "c-scrollbar", {
                    "c-scrollbar--hidden": this.state.hidden,
                    "c-scrollbar--monkey": u,
                    "c-scrollbar--fade": h,
                    "c-scrollbar--inherit_size": o,
                    "c-scrollbar--always_visible": l
                }),
                style: o ? void 0 : {
                    width: e,
                    height: t
                },
                id: b
            }, s.a.createElement("div", {
                "data-qa": "slack_kit_scrollbar",
                role: "presentation",
                className: "c-scrollbar__hider",
                tabIndex: _,
                onScroll: this.onScroll,
                ref: this.setRef
            }, s.a.createElement(m, {
                width: e,
                onScroll: r
            }, n)), s.a.createElement("div", {
                role: "presentation",
                className: "c-scrollbar__track",
                onMouseDown: this.onTrackDown,
                onMouseUp: this.onTrackUp,
                ref: this.setTrackRef
            }, s.a.createElement("div", {
                role: "presentation",
                className: "c-scrollbar__bar",
                style: {
                    height: this.state.height,
                    transform: "translateY(" + Math.floor(this.state.top) + "px)",
                    background: f
                },
                onClick: p,
                onMouseDown: this.onDragStart,
                tabIndex: -1
            })))
        }
    }

    scrollbar_Scrollbar.displayName = "Scrollbar", scrollbar_Scrollbar.defaultProps = h, scrollbar_Scrollbar.track = {
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
    };
    t.a = scrollbar_Scrollbar;
    Object(d.a)(scrollbar_Scrollbar, {
        getDerivedProps: e => {
            let {
                instance: t
            } = e;
            return {
                initialScrollTop: t.currentScrollTop
            }
        }
    })
}
