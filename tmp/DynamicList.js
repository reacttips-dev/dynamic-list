qpkA: function(e, t, n) {
	"use strict";
	n.d(t, "a", (function() {
		return i
	}));
	var a = n("6jsb"),
		r = n("1zbP"),
		s = n("3zNH");
	const i = Object(a.c)('Stores a "recent" file', (function(e, t) {
		let {
			files: n,
			ts: a
		} = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
		const i = [];
		return n.forEach((e => {
			Object(r.b)(e) && i.push(Object.assign({}, e, {
				actions: [{
					type: "CLOG",
					ts: a || String(Date.now() / 1e3)
				}]
			}))
		})), e(Object(s.a)({
			files: i
		}))
	}));
	i.meta = {
		name: "pushRecentFiles",
		key: "filesStoreThunksPushRecentFilesPushRecentFiles",
		description: 'Stores a "recent" file'
	}
}, qqis: function(e, t, n) {}, "qr0+": function(e, t, n) {
	"use strict";
	n.d(t, "a", (function() {
		return DynamicList
	}));
	var a = n("wx14"),
		r = n("rePB"),
		s = n("ifKl"),
		i = n("q1tI"),
		o = n.n(i),
		c = n("yxNq"),
		l = n("ZMRP"),
		d = n("TxvE"),
		u = n("oWj6");
	class DynamicList extends l.a {
		constructor(e) {
			super(e), Object(r.a)(this, "scrollTop", void 0), Object(r.a)(this, "pendingScrollTop", void 0), Object(r.a)(this, "layout", void 0), this.onScroll = this.onScroll.bind(this), this.setHeight = this.setHeight.bind(this), this.layout = e.layout || new u.a, this.node = null, this.scrollTop = this.layout.setContainerHeight(e.height, 0), this.scrollTop = this.layout.setKeys(e.keys, this.scrollTop);
			const {
				start: t,
				end: n
			} = this.layout.getBounds(this.scrollTop, this.scrollTop + e.height), a = this.layout.getTops();
			this.state = Object.assign({}, this.state, {
				start: t,
				end: n,
				tops: a
			})
		}
		UNSAFE_componentWillReceiveProps(e) {
			this.props.itemToScroll !== e.itemToScroll && this.scrollToIfNotVisible(e), e.width !== this.props.width && this.layout.heightCache.invalidate(), e.height !== this.props.height && (this.scrollTop = this.layout.setContainerHeight(e.height, this.getScrollTop())), Object(c.a)(e.keys, this.props.keys) || (this.scrollTop = this.layout.setKeys(e.keys, this.getScrollTop())), this.relayout()
		}
		scrollToIfNotVisible(e) {
			const {
				itemToScroll: t,
				animateOnScroll: n
			} = e;
			t && this.scrollToKey(t, {
				lazy: !0,
				animate: n
			})
		}
		componentDidUpdate(e, t) {
			super.componentDidUpdate(e, t), "number" == typeof this.pendingScrollTop && this.setScrollTop(this.pendingScrollTop), this.loadMore()
		}
		componentDidMount() {
			super.componentDidMount(), "number" == typeof this.pendingScrollTop && this.setScrollTop(this.pendingScrollTop), this.loadMore()
		}
		onScroll(e) {
			this.pendingScrollTop = !1, super.onScroll(e)
		}
		getScrollTop() {
			return "number" == typeof this.scrollTop ? this.scrollTop : "number" == typeof this.pendingScrollTop ? this.pendingScrollTop : this.node ? super.getScrollTop() : 0
		}
		setHeight(e, t) {
			if (!e) return;
			if (Math.abs(t - this.layout.getHeight(e)) < .5) return;
			const n = this.getScrollTop();
			this.scrollTop = this.layout.setHeight(e, t, n), this.relayout()
		}
		loadMore() {
			let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.state.start,
				t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.state.end,
				n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.props;
			const {
				keys: a,
				height: r
			} = n, s = this.layout.getTotalHeight(), i = this.layout.getTop(a[e]), o = this.layout.getBottom(a[t - 1]), c = !a.length || s <= r || i < 400, l = !a.length || s <= r || s - o < 400;
			return c && l ? n.loadAround() : c ? n.loadPre() : l ? n.loadPost() : void 0
		}
		renderItem(e, t, n) {
			const {
				activeItem: r,
				initialActiveItem: s,
				hasKeyboardFocus: i
			} = this.state, c = this.getTop(e), l = this.layout.getHeight(e), u = this.layout.getHeightValidity(e), m = r === e, p = null === r && i && s === e, h = this.isItemInView(e), {
				rowRenderer: b,
				getPropsForItem: f,
				onItemClick: _,
				onItemContextMenu: g,
				onItemKeyDown: O,
				shouldHorizontallyScroll: v,
				useStaticHeightForListItems: j,
				width: y
			} = this.props, E = this.getUniqueItemId(e), C = f({
				key: e,
				index: t,
				isInitialFocusInRange: m && this.state.isInitialFocusInRange,
				hasFocus: m,
				activeItem: r,
				firstItemInView: i && !this.isScrolling() ? this.getNextFirstFocusableItemInView() : void 0,
				initialActiveItem: s
			}) || {};
			return !C.role && this.context.experimentA11YDesktopRefinementsKnlistGroupOn && (C.role = "gridcell"), o.a.createElement(d.b, Object(a.a)({
				tabIndex: this.getListItemTabIndex(e)
			}, C, {
				id: E,
				itemKey: e,
				key: e,
				height: l,
				validity: u,
				top: c,
				hasFocus: m,
				hasFocusWithin: p,
				onFocusEnter: this.onItemFocusEnter,
				onFocusWithin: this.onItemFocusWithin,
				onTabWithin: this.onItemTabWithin,
				onHeightChange: this.setHeight,
				onContextMenu: g,
				onMouseDown: this.onItemMouseDown,
				onClick: _,
				onKeyDown: O,
				shouldHorizontallyScroll: v,
				useStaticHeight: j
			}), b(t, {
				key: e,
				hasFocus: m,
				hasFocusWithin: p,
				itemId: E,
				listWidth: y,
				isInView: h,
				isExpanded: C["aria-expanded"],
				isOmitted: n
			}))
		}
		render() {
			return "number" == typeof this.scrollTop && (this.pendingScrollTop = this.scrollTop, this.scrollTop = !1), super.render()
		}
	}
	DynamicList.displayName = "DynamicList", Object(r.a)(DynamicList, "defaultProps", Object.assign({}, l.a.defaultProps, {
		layout: void 0,
		loadPre: s.a,
		loadPost: s.a,
		loadAround: s.a,
		itemToScroll: void 0,
		animateOnScroll: !0
	}))
}