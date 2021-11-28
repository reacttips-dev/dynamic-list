var b = n("rIJ2"),
	f = n("wwBm"),
	_ = n("TxvE"),
	g = n("6kzs");
n("58KB");
const O = {
		ChannelList: .19
	},
	v = Object(f.d)(window.location.search),
	j = v.auto_trace_vlist_sample && parseFloat(v.auto_trace_vlist_sample);
class list_List extends i.Component {
	constructor(e) {
		super(e), 
Object(r.a)(this, "layout", void 0), 
Object(r.a)(this, "node", void 0), 
Object(r.a)(this, "contentNode", void 0), 
Object(r.a)(this, "isSelecting", void 0), 
Object(r.a)(this, "selectionStart", void 0), 
Object(r.a)(this, "selectionEnd", void 0), 
Object(r.a)(this, "scrollStartTimeout", void 0), 
Object(r.a)(this, "autoTraceState", void 0), 
Object(r.a)(this, "scrollTop", void 0), 
this.onScroll = this.onScroll.bind(this), 
this.onContentScroll = this.onContentScroll.bind(this), 
this.onSelectionChange = this.onSelectionChange.bind(this), 
this.setRef = this.setRef.bind(this), 
this.setContentRef = this.setContentRef.bind(this), 
this.setHeight = this.setHeight.bind(this), 
this.getScrollTop = this.getScrollTop.bind(this), 
this.getVisibleRange = this.getVisibleRange.bind(this), 
this.getRoleForList = this.getRoleForList.bind(this), 
this.isItemInView = this.isItemInView.bind(this), 
this.onScrollStart = this.onScrollStart.bind(this), 

// threadhold
// debounce
this.onScrollEnd = Object(m.a)(this.onScrollEnd.bind(this), 50), 

this.onItemContextMenu = this.onItemContextMenu.bind(this), 
this.onWindowBlur = this.onWindowBlur.bind(this), 
this.autoTraceFrame = this.autoTraceFrame.bind(this), 
this.layout = e.layout || new g.a, 
this.node = null, this.contentNode = null, this.isSelecting = !1, this.selectionStart = null, this.selectionEnd = null, this.scrollStartTimeout = null, this.layout.setKeys(e.keys);
		const {
			start: t,
			end: n
		} = this.getBounds(0, e.height);
		this.state = {
			start: t,
			end: n,
			scrolling: !1
		}, this.autoTraceState = {
			isTracing: !1,
			frameNumber: 0,
			traceId: void 0,
			rafHandle: void 0,
			activeSpan: void 0
		}
	}
	componentDidMount() {
		document.addEventListener("selectionchange", this.onSelectionChange), window.addEventListener("blur", this.onWindowBlur)
	}
	shouldComponentUpdate(e, t) {
		return this.props.experimentMessageListPerfDepth3GroupTreatment ? !Object(l.a)(e, this.props, 3) || !Object(l.a)(t, this.state, 3) : !Object(l.a)(e, this.props) || !Object(l.a)(t, this.state)
	}
	UNSAFE_componentWillReceiveProps(e) {
		e.width !== this.props.width && this.layout.heightCache.invalidate(), this.layout.setKeys(e.keys), this.relayout()
	}
	componentWillUnmount() {
		this.scrollStartTimeout && clearTimeout(this.scrollStartTimeout), document.removeEventListener("selectionchange", this.onSelectionChange), window.removeEventListener("blur", this.onWindowBlur), this.autoTraceStop()
	}
	onContentScroll(e) {
		this.props.onContentScroll(e)
	}
	onWindowBlur() {
		this.autoTraceStop()
	}
	onScroll(e) {
		this.maybeStartAutoTrace(), this.onScrollEnd(), this.scrollStartTimeout || this.isScrolling() || e.target !== this.getScrollerRef() || (this.scrollStartTimeout = setTimeout(this.onScrollStart, 100)), this.relayout(), this.props.onScroll(e, {
			scrollTop: this.getScrollTop(),
			scrollHeight: this.getContentHeight(),
			clientHeight: this.props.height
		})
	}
	onScrollEnd() {
		this.scrollStartTimeout && (clearTimeout(this.scrollStartTimeout), this.scrollStartTimeout = null), this.setState((e => e.scrolling ? {
			scrolling: !1
		} : null))
	}
	onScrollStart() {
		this.setState((() => ({
			scrolling: !0
		})), this.onScrollEnd), this.scrollStartTimeout = null
	}
	onSelectionChange() {
		if (!this.node) return;
		const e = window.getSelection && window.getSelection();
		e && "Range" === e.type && this.contentNode && this.contentNode.contains(e.anchorNode) ? (this.isSelecting = !0, this.selectionStart = this.props.keys[this.state.start], this.selectionEnd = this.props.keys[this.state.end - 1]) : (this.isSelecting = !1, this.selectionStart = null, this.selectionEnd = null), this.props.onSelectionChange(this.isSelecting)
	}
	onItemContextMenu(e, t) {
		this.props.onItemContextMenu(e, t)
	}
	getBottom(e) {
		return this.layout.getBottom(e)
	}
	getBounds(e, t) {
		this.onSelectionChange();
		let n = e,
			a = t;
		return this.selectionStart && (n = Math.min(n, this.layout.getTop(this.selectionStart))), this.selectionEnd && (a = Math.max(a, this.layout.getTop(this.selectionEnd))), this.layout.getBounds(n, a)
	}
	getBoundingClientRect() {
		return this.getScrollerRef().getBoundingClientRect()
	}
	getClassName() {
		return Object(c.a)("c-virtual_list", "c-virtual_list--scrollbar", this.props.className)
	}
	getContainerHeight() {
		return this.props.height
	}
	getContentHeight() {
		return this.layout.getTotalHeight()
	}
	getContentsClassName() {
		return Object(c.a)("c-virtual_list__scroll_container", this.props.containerClassName, {
			"c-virtual_list__scroll_container--scrolling": this.isScrolling() && !this.isSelecting
		})
	}
	getScrollTop() {
		return this.node && this.node.scrollTop() || 0
	}
	getScrollerRef() {
		var e, t, n;
		return this.props.useScrollbarV2 ? null === (t = this.node) || void 0 === t || null === (n = t.scrollRef) || void 0 === n ? void 0 : n.current : null === (e = this.node) || void 0 === e ? void 0 : e.scroller
	}
	getTop(e) {
		return this.layout.getTop(e)
	}
	getVisibleRange() {
		let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.getScrollTop(),
			t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
		const {
			keys: n,
			height: a
		} = this.props, {
			start: r,
			end: s
		} = this.layout.getBounds(e, e + a);
		if (t) return {
			start: r,
			end: s
		};
		const i = this.layout.getTop(n[r]) < e - 1 ? r + 1 : r,
			o = this.layout.getBottom(n[s - 1]) > e + a + 1 ? s - 1 : s,
			c = Math.min(i, n.length - 1);
		return {
			start: c,
			end: Math.max(o, c)
		}
	}
	getRoleForList() {
		return this.props.role
	}
	setContentRef(e) {
		this.contentNode = e
	}
	setHeight(e, t) {
		e && (Math.abs(t - this.layout.getHeight(e)) < .5 || (this.layout.setHeight(e, t), this.relayout()))
	}
	setRef(e) {
		this.node = e
	}
	setScrollTop(e) {
		this.node && this.node.scrollTop(Math.ceil(e))
	}
	getItemsToRender() {
		const {
			keys: e,
			persistentKeys: t,
			usePersistentOrder: n,
			renderOmittedItems: a
		} = this.props, {
			start: r,
			end: s
		} = this.state, i = [];
		if (n) {
			const n = {};
			for (let e = 0; e < t.length; e++) n[t[e]] = !0;
			for (let t = 0; t < e.length; t++) {
				const o = e[t];
				o && (n[o] || t >= r && t <= s) ? i.push({
					key: o,
					index: t,
					isOmitted: !1
				}) : o && a && i.push({
					key: o,
					index: t,
					isOmitted: !0
				})
			}
		} else {
			for (let t = r; t < s; t++) {
				const n = e[t];
				n && i.push({
					key: n,
					index: t,
					isOmitted: !1
				})
			}
			t.forEach((t => {
				const n = e.indexOf(t);
				n < 0 || n >= r && n < s || i.push({
					key: t,
					index: n,
					isOmitted: !1
				})
			}))
		}
		return i
	}
	maybeStartAutoTrace() {
		const {
			autoTraceTag: e
		} = this.props;
		if ("string" != typeof e || !(e in O)) return;
		if (!this.props.autoTraceTeamId) return;
		if (this.autoTraceState.isTracing) return;
		let t = O[e];
		if (!t) return;
		if (j && "number" == typeof j && !isNaN(j) && (t = j), !Object(b.a)(t)) return;
		this.autoTraceState.isTracing = !0, this.autoTraceState.frameNumber = 0, this.autoTraceState.traceId = Object(u.a)(), this.autoTraceState.rafHandle = window.requestAnimationFrame(this.autoTraceFrame);
		const n = d.d.start({
			label: d.a.ListScroll,
			id: this.autoTraceState.traceId,
			options: {
				teamId: this.props.autoTraceTeamId,
				tags: {
					tag1: this.props.autoTraceTag
				}
			}
		});
		n && (this.autoTraceState.activeSpan = n.createChildSpan({
			name: "scroll:start"
		}))
	}
	autoTraceStop() {
		this.autoTraceState.isTracing && (this.autoTraceState.activeSpan && this.autoTraceState.activeSpan.close(), d.d.stop({
			label: d.a.ListScroll,
			id: this.autoTraceState.traceId
		}), this.autoTraceState.isTracing = !1, this.autoTraceState.rafHandle && (window.cancelAnimationFrame(this.autoTraceState.rafHandle), this.autoTraceState.rafHandle = void 0))
	}
	autoTraceFrame() {
		this.autoTraceState.rafHandle = void 0;
		const e = this.autoTraceState.frameNumber + 1;
		if (this.autoTraceState.frameNumber = e, this.autoTraceState.activeSpan && (this.autoTraceState.activeSpan.close(), this.autoTraceState.activeSpan = void 0), e <= 3) {
			const t = d.d.get({
				label: d.a.ListScroll,
				id: this.autoTraceState.traceId
			});
			t && (this.autoTraceState.activeSpan = t.createChildSpan({
				name: "scroll:frame:" + e
			})), this.autoTraceState.rafHandle = requestAnimationFrame(this.autoTraceFrame)
		} else this.autoTraceStop()
	}
	bracketScrollTop(e) {
		return Math.max(0, Math.min(this.getContentHeight() - this.props.height, e))
	}
	isItemAboveView(e) {
		let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
		const n = this.getScrollTop() + t;
		return this.layout.getBottom(e) < n
	}
	isItemBelowView(e) {
		let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
		const n = this.getScrollTop();
		return this.layout.getTop(e) > n + (this.props.height - t)
	}
	isItemInView(e) {
		let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
		const n = this.getScrollTop(),
			a = this.layout.getTop(e);
		return a >= n + t && a <= n + (this.props.height - t)
	}
	isScrolledToBottom() {
		return this.getScrollTop() + this.getContainerHeight() >= this.layout.getTotalHeight() - 1
	}
	isScrolledToTop() {
		return Math.floor(this.getScrollTop()) <= 1
	}
	isScrolling() {
		return this.state.scrolling
	}
	relayout() {
		this.setState(((e, t) => {
			const n = this.getScrollTop(),
				a = t.height / 2,
				r = n - a,
				s = n + t.height + a,
				{
					start: i,
					end: o
				} = this.getBounds(r, s),
				c = this.layout.getTops(),
				l = this.layout.getTotalHeight();
			return i === e.start && o === e.end && c === e.tops && l === e.totalHeight ? null : {
				start: i,
				end: o,
				tops: c,
				totalHeight: l
			}
		}))
	}
	scrollToKey(e) {
		let {
			lazy: t,
			animate: n,
			offset: a = 0
		} = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
		if (t && this.isItemInView(e)) return;
		const r = this.layout.getOffsetForKey(e);
		this.scrollToOffset(r + a, {
			animate: n
		})
	}
	scrollToOffset(e) {
		let {
			animate: t
		} = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
		if (!this.node) return;
		const n = this.bracketScrollTop(e);
		t ? this.node.scrollWithAnimation(n) : (this.scrollTop = n, this.setScrollTop(n))
	}
	renderContents() {
		const e = this.getContentsClassName(),
			t = this.getContentHeight(),
			n = this.renderItems();
		return o.a.createElement("div", {
			"data-qa": "slack_kit_list",
			ref: this.setContentRef,
			className: e,
			role: this.getRoleForList(),
			"aria-label": this.props["aria-label"],
			"aria-describedby": this.props["aria-describedby"],
			style: {
				position: "relative",
				height: t
			}
		}, n)
	}
	renderItem(e, t, n) {
		const r = this.getTop(e),
			s = this.layout.getHeight(e),
			i = this.layout.getHeightValidity(e),
			{
				rowRenderer: c,
				getPropsForItem: l,
				shouldHorizontallyScroll: d
			} = this.props,
			u = l({
				key: e,
				index: t
			}) || {};
		return o.a.createElement(_.b, Object(a.a)({}, u, {
			id: e,
			itemKey: e,
			key: e,
			height: s,
			top: r,
			onHeightChange: this.setHeight,
			onContextMenu: this.onItemContextMenu,
			validity: i,
			shouldHorizontallyScroll: d,
			useStaticHeight: this.props.useStaticHeightForListItems
		}), c(t, {
			key: e,
			isExpanded: u["aria-expanded"],
			isOmitted: n
		}))
	}
	renderItems() {
		return this.getItemsToRender().map((e => {
			let {
				key: t,
				index: n,
				isOmitted: a
			} = e;
			return this.renderItem(t, n, a)
		}))
	}
	render() {
		const {
			width: e,
			height: t
		} = this.props;
		if (0 === e || 0 === t) return null;
		const n = this.getClassName(),
			a = this.renderContents(),
			r = this.props.useScrollbarV2 ? scrollbar_v2_ScrollbarV2 : p.a;
		return o.a.createElement(r, {
			className: n,
			width: e,
			height: this.getContainerHeight(),
			contentHeight: this.getContentHeight(),
			trackTop: 12,
			onTrackClick: p.a.track.page,
			onScroll: this.onScroll,
			onContentScroll: this.onContentScroll,
			anchor: "bottom",
			role: "presentation",
			id: this.props.id,
			ref: this.setRef,
			fade: this.props.fadeScrollbar,
			useFixedTrackHeight: this.props.useFixedTrackHeightForScrollbar,
			alwaysVisible: this.props.scrollbarAlwaysVisible || this.state.hasKeyboardFocus,
			initialScrollTop: this.props.initialScrollTop
		}, a, this.props.siblingNode)
	}
}
list_List.displayName = "List", Object(r.a)(list_List, "defaultProps", {
	className: "",
	containerClassName: "",
	layout: void 0,
	role: "list",
	"aria-label": void 0,
	"aria-describedby": void 0,
	persistentKeys: [],
	usePersistentOrder: !0,
	fadeScrollbar: !1,
	onScroll: s.a,
	onContentScroll: s.a,
	onSelectionChange: s.a,
	onItemContextMenu: s.a,
	getPropsForItem: s.a,
	shouldHorizontallyScroll: !1,
	scrollbarAlwaysVisible: !1,
	id: void 0,
	useStaticHeightForListItems: !1,
	useFixedTrackHeightForScrollbar: !1,
	useScrollbarV2: !1,
	initialScrollTop: 0,
	siblingNode: null,
	autoTraceTag: null,
	autoTraceTeamId: null,
	renderOmittedItems: !1,
	experimentMessageListPerfDepth3GroupTreatment: !1
})
}