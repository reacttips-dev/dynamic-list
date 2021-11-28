ZMRP: function(e, t, n) {
	"use strict";
	n.d(t, "a", (function() {
		return KeyboardNavigableList
	}));
	var a = n("wx14"),
		r = n("rePB"),
		s = n("gSGL"),
		i = n("3Hq1"),
		o = n("ifKl"),
		c = n("qAkX"),
		l = n("q1tI"),
		d = n.n(l),
		u = n("O9Jm"),
		m = n("k0G2"),
		p = n("VymY"),
		h = n("WIr4"),
		b = n("nNoG"),
		f = n("RMmo"),
		_ = n("YjxU"),
		g = n("ihLf"),
		O = n("lYQS"),
		v = n("54qz"),
		j = n("Nyj0"),
		y = n("TxvE");
	const E = new b.b("a11y");
	class KeyboardNavigableList extends j.a {
		constructor(e) {
			super(e), Object(r.a)(this, "keyCommands", void 0), Object(r.a)(this, "isHomeKeyPressed", void 0), Object(r.a)(this, "isEndKeyPressed", void 0), Object(r.a)(this, "ariaDescribedById", void 0), Object(h.a)(this, ["onFocusEnter", "onFocusLeave", "onFocusedElementRemoved", "onItemMouseDown", "onItemFocusEnter", "onItemFocusWithin", "onItemTabWithin", "focus"]), this.state = Object.assign({}, this.state, {
				initialActiveItem: null,
				activeItem: null,
				hasKeyboardFocus: !1,
				isInitialFocusInRange: !1
			})
		}
		componentDidMount() {
			super.componentDidMount();
			const {
				ignoreKeyCommandsOnInputs: e,
				shouldIgnoreScrollKeys: t
			} = this.props;
			this.determineInitialActiveItem(), this.removeAllItemsFromTabFlow(), this.restoreTabIndexesInsideInitialActiveItem();
			const n = t.bind(this),
				a = [{
					keys: ["pageup"],
					handler: this.onKeyDownPageUp.bind(this),
					filter: n
				}, {
					keys: ["pagedown"],
					handler: this.onKeyDownPageDown.bind(this),
					filter: n
				}, {
					keys: ["home"],
					handler: this.onKeyDownHome.bind(this),
					action: "keydown",
					filter: n
				}, {
					keys: ["end"],
					handler: this.onKeyDownEnd.bind(this),
					action: "keydown",
					filter: n
				}, {
					keys: ["home"],
					handler: this.onKeyUpHome.bind(this),
					action: "keyup"
				}, {
					keys: ["end"],
					handler: this.onKeyUpEnd.bind(this),
					action: "keyup"
				}, {
					keys: ["up", "down"],
					handler: this.onArrowKeyDown.bind(this),
					ignoreInputs: e,
					filter: this.props.shouldIgnoreArrowKeys.bind(this)
				}],
				r = this.props.keyCommands ? a.concat(this.props.keyCommands) : a;
			this.keyCommands = new f.a, this.keyCommands.bindAll(r)
		}
		componentWillUnmount() {
			super.componentWillUnmount(), this.keyCommands.reset(), this.keyCommands = null, this.node = null
		}
		componentDidUpdate(e, t) {
			const {
				activeItem: n,
				onActiveItemChange: a
			} = this.props, {
				initialActiveItem: r,
				activeItem: s,
				hasKeyboardFocus: i
			} = this.state, o = s, c = i && r && t.activeItem === r, l = r && t.initialActiveItem && r !== t.initialActiveItem;
			this.isScrolling() || (this.determineInitialActiveItem(), l && this.removeAllItemsFromTabFlow(), (o || c) && this.restoreTabIndexesInsideInitialActiveItem()), n && n !== e.activeItem && (this.setActiveItem(n, !0), this.isItemInView(n) || this.scrollToKey(n)), t.activeItem && s && s !== t.activeItem && a(s), this.isScrolling() || this.updateFocusIfPreviouslyFocusedItemWasRemoved(e)
		}
		determineInitialActiveItem() {
			const {
				keys: e,
				initialActiveItem: t
			} = this.props, {
				initialActiveItem: n
			} = this.state, a = null !== n && -1 !== e.indexOf(n), r = !(Object(i.a)(t) || null === t || -1 === e.indexOf(t));
			if (r || a)
				if (r && a && t === n) {
					if (this.isItemInView(n)) return;
					this.setInitialActiveItemToFirstItemInView()
				} else r && !a && this.setState((() => ({
					initialActiveItem: t
				})));
			else this.setInitialActiveItemToFirstItemInView()
		}
		updateFocusIfPreviouslyFocusedItemWasRemoved(e) {
			let {
				keys: t
			} = e;
			const {
				initialActiveItem: n,
				hasKeyboardFocus: a
			} = this.state, {
				keys: r
			} = this.props;
			if (this.props.activeItem) return;
			if (!a) return;
			if (!n) return;
			const s = t.indexOf(n);
			if (!(-1 !== s && !r.includes(n))) return;
			const i = r[s] || Object(c.a)(r);
			i && this.focusOnKey(i)
		}
		getPageHeight() {
			const {
				pageHeight: e,
				height: t
			} = this.props;
			return e || t - 21
		}
		getKeysForFocusableItems() {
			const {
				keys: e,
				isFocusableItem: t
			} = this.props;
			return e.filter(((e, n) => t({
				index: n,
				key: e
			})))
		}
		getListItemTabIndex(e) {
			const {
				hasKeyboardFocus: t,
				initialActiveItem: n
			} = this.state;
			return !t && this.props.preventTabKeyNavigationIntoList ? -1 : n === e ? 0 : -1
		}
		getRoleForList() {
			const e = this.props.role;
			return e === KeyboardNavigableList.defaultProps.role && this.context.experimentA11YDesktopRefinementsKnlistGroupOn ? "grid" : e
		}
		onKeyDownPageUp(e) {
			if (e.preventDefault(), !1 === this.props.onPageUp(e)) return;
			const t = this.getScrollTop() - this.getPageHeight();
			this.state.hasKeyboardFocus ? this.isScrolledToTop() ? this.focusFirstItemInView() : this.scrollToAndFocusFirstItemInView(t) : this.scrollToOffset(t)
		}
		onKeyDownPageDown(e) {
			if (e.preventDefault(), !1 === this.props.onPageDown(e)) return;
			const t = this.getScrollTop() + this.getPageHeight();
			if (!this.state.hasKeyboardFocus) return void this.scrollToOffset(t);
			if (this.isScrolledToBottom()) return void this.focusLastItemInView();
			const n = this.getNextLastFocusableItemInView(t);
			this.setActiveItem(null != n ? n : null, !0), this.scrollToOffset(t)
		}
		onKeyDownHome(e) {
			if (this.isHomeKeyPressed) return;
			if (this.isHomeKeyPressed = !0, e.preventDefault(), !1 === this.props.onHome(e)) return;
			if (!this.state.hasKeyboardFocus) return void this.scrollToOffset(0, {
				absolute: !0
			});
			if (this.isScrolledToTop()) return void this.focusFirstItemInView();
			const t = this.getKeysForFocusableItems()[0];
			this.setActiveItem(t, !0), this.scrollToKey(t)
		}
		onKeyDownEnd(e) {
			if (this.isEndKeyPressed) return;
			if (this.isEndKeyPressed = !0, e.preventDefault(), !1 === this.props.onEnd(e)) return;
			if (!this.state.hasKeyboardFocus) return void this.scrollToOffset(1 / 0, {
				absolute: !0
			});
			if (this.isScrolledToBottom()) return void this.focusLastItemInView();
			const t = this.getKeysForFocusableItems(),
				n = t[t.length - 1];
			this.setActiveItem(n, !0), this.scrollToKey(n)
		}
		onArrowKeyDown(e) {
			e.defaultPrevented || (e.preventDefault(), this.focusNextItem(e.keyCode))
		}
		onKeyUpHome() {
			this.isHomeKeyPressed = !1
		}
		onKeyUpEnd() {
			this.isEndKeyPressed = !1
		}
		onItemFocusEnter(e) {
			const {
				id: t,
				relatedEvent: n,
				currentTarget: a,
				target: r
			} = e;
			if (!this.haveActiveItem() && r === a) return void this.setActiveItem(t);
			const s = !this.haveActiveItem() && !n && a.contains(r),
				{
					keys: i,
					isFocusableItem: o
				} = this.props,
				c = o({
					index: i.indexOf(t),
					key: t
				}) ? t : this.state.initialActiveItem;
			s && this.setState((() => ({
				activeItem: null,
				initialActiveItem: c
			}))), this.props.onItemFocusEnter(e)
		}
		onItemFocusWithin(e) {
			const {
				id: t,
				currentTarget: n,
				target: a
			} = e;
			if (a === n) return void this.setActiveItem(t);
			const {
				keys: r,
				isFocusableItem: s
			} = this.props, i = s({
				index: r.indexOf(t),
				key: t
			}) ? t : this.state.initialActiveItem;
			this.setState((() => ({
				activeItem: null,
				initialActiveItem: i
			})))
		}
		onItemTabWithin(e) {
			this.props.onItemTabWithin(e)
		}
		onFocusEnter(e) {
			const {
				relatedEvent: t,
				target: n
			} = e;
			if (t && "mousedown" === t.type) return;
			if (n && (n instanceof HTMLMediaElement || n.dataset.mediaFocusContainer)) return;
			const a = !t,
				r = t && "keydown" === t.type || a;
			r ? this.props.onFocusEnter(Object.assign({
				isKeyboardFocus: r
			}, e)) : this.props.onFocusEnter(e)
		}
		onFocusLeave(e) {
			const {
				onFocusLeave: t
			} = this.props, n = this.state.activeItem, a = this.haveActiveItem() ? {
				activeItem: null,
				hasKeyboardFocus: !1,
				initialActiveItem: n,
				isInitialFocusInRange: !1
			} : {
				activeItem: null,
				hasKeyboardFocus: !1,
				isInitialFocusInRange: !1
			}, r = Object.assign({
				activeItem: n
			}, e);
			this.setState((() => a), (() => {
				t(r)
			}))
		}
		onFocusedElementRemoved() {
			this.state.hasKeyboardFocus && this.focus()
		}
		onItemMouseDown(e, t) {
			this.setState((() => ({
				hasKeyboardFocus: !1,
				activeItem: null,
				initialActiveItem: t
			})))
		}
		focus() {
			const e = this.state.initialActiveItem;
			e && this.isItemInView(e) ? this.setActiveItem(e, !0) : this.scrollToAndFocusFirstItemInView()
		}
		focusOnKey(e) {
			let {
				offset: t = 0
			} = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
			const {
				keys: n
			} = this.props;
			return !(!e || -1 === n.indexOf(e)) && (this.setActiveItem(e, !0), this.isItemInView(e) || this.scrollToKey(e, {
				offset: t
			}), !0)
		}
		scrollToAndFocusFirstItemInView(e) {
			const t = this.getNextFirstFocusableItemInView(e);
			t && (this.setActiveItem(t, !0), this.scrollToKey(t))
		}
		blur() {
			var e;
			const t = document.activeElement;
			null !== (e = this.getScrollerRef()) && void 0 !== e && e.contains(t) && t.blur()
		}
		getActiveItem() {
			return this.state.activeItem
		}
		removeAllItemsFromTabFlow() {
			const e = this.getScrollerRef();
			e && Object(p.a)(e).forEach((e => {
				if (null != e && e.classList.contains("c-virtual_list__item")) return;
				const t = e.getAttribute("tabindex");
				e.setAttribute("tabindex", "-1"), e.dataset.removeTabIndex = "true", Object(s.a)(t) && (e.dataset.tabIndexToRestore = t)
			}))
		}
		restoreTabIndexesInsideInitialActiveItem() {
			var e;
			const {
				initialActiveItem: t
			} = this.state, n = null !== t && (null === (e = this.contentNode) || void 0 === e ? void 0 : e.querySelector('.c-virtual_list__item[tabindex="0"]'));
			n && n.querySelectorAll("[data-remove-tab-index]").forEach((e => {
				const t = e.dataset.tabIndexToRestore;
				Object(s.a)(t) ? e.setAttribute("tabindex", t) : e.removeAttribute("tabindex"), delete e.dataset.removeTabIndex, delete e.dataset.tabIndexToRestore
			}))
		}
		setActiveItem(e) {
			let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
			this.setState((() => ({
				hasKeyboardFocus: !0,
				activeItem: e,
				initialActiveItem: e,
				isInitialFocusInRange: t
			})))
		}
		haveActiveItem() {
			return null !== this.state.activeItem
		}
		getUniqueItemId(e) {
			const {
				id: t
			} = this.props;
			return t ? t + "_" + e : e
		}
		focusFirstItemInView() {
			const e = this.getFocusableItemsInView()[0];
			this.state.activeItem !== e && this.setActiveItem(e, !0)
		}
		focusLastItemInView() {
			let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
			const t = this.getFocusableItemsInView(void 0, e),
				n = t[t.length - 1];
			this.state.activeItem !== n && this.setActiveItem(n, !0)
		}
		focusNextItem(e) {
			const t = this.getNextActiveItem(e, this.state.activeItem);
			t && (this.setActiveItem(t, !1), this.isItemInView(t, this.layout.anchorOffset) || this.scrollToKey(t))
		}
		getFocusableItemsInView(e, t) {
			const {
				keys: n,
				isFocusableItem: a
			} = this.props, {
				start: r,
				end: s
			} = this.getVisibleRange(e, t);
			return (r === s ? n.slice(r, r + 1) : n.slice(r, s)).filter((e => a({
				index: n.indexOf(e),
				key: e
			})))
		}
		getNextFirstFocusableItemInView(e) {
			const t = this.state.activeItem,
				n = this.getFocusableItemsInView(e)[0];
			return n && n === t || !n && t ? this.getNextActiveItem(m.o, t) : n
		}
		getNextLastFocusableItemInView(e) {
			const t = this.state.activeItem,
				n = this.getFocusableItemsInView(e),
				a = n[n.length - 1];
			return a && a === t || !a && t ? this.getNextActiveItem(m.c, t) : a
		}
		getInitialActiveItem() {
			return this.state.initialActiveItem
		}
		getNextActiveItem(e, t) {
			const n = this.state.initialActiveItem;
			if (!this.haveActiveItem()) return n && !this.isItemInView(n) ? this.getNextFirstFocusableItemInView() : n || this.getNextFirstFocusableItemInView();
			const a = t,
				r = this.props.keys.indexOf(a),
				s = e === m.o ? r - 1 : r + 1,
				i = this.props.keys[s];
			return i && !this.props.isFocusableItem({
				index: s,
				key: i
			}) ? this.getNextActiveItem(e, i) : i
		}
		makeAriaDescribedByNode() {
			if ("application" !== this.props.role) return;
			if (!this.contentNode) return;
			const e = "sr-list-instructions-" + Object(O.a)();
			if (document.getElementById(e)) return;
			const t = document.createElement("div");
			t.hidden = !0, t.id = e;
			const n = E.t("Use the up and down arrows or page up, page down, home and end to navigate the list");
			t.innerText = n, document.body.appendChild(t), this.contentNode.setAttribute("aria-describedby", e), this.ariaDescribedById = e
		}
		removeAriaDescribedByNode() {
			if ("application" !== this.props.role) return;
			const e = this.ariaDescribedById;
			if (!e) return;
			const t = document.getElementById(e);
			if (!t) return;
			document.querySelectorAll('[aria-describedby="' + e + '"]').length > 1 || t.remove()
		}
		setInitialActiveItemToFirstItemInView() {
			const e = this.getFocusableItemsInView()[0];
			e && this.setState((() => ({
				initialActiveItem: e
			})))
		}
		renderItem(e, t, n) {
			const {
				activeItem: r,
				initialActiveItem: s,
				hasKeyboardFocus: i
			} = this.state, o = this.getTop(e), c = this.layout.getHeight(e), l = r === e, u = null === r && i && s === e, m = this.isItemInView(e), p = this.layout.getHeightValidity(e), h = i && !this.isScrolling() ? this.getNextFirstFocusableItemInView() : void 0, {
				rowRenderer: b,
				getPropsForItem: f,
				onItemClick: _,
				onItemContextMenu: g,
				onItemKeyDown: O,
				shouldHorizontallyScroll: v,
				useStaticHeightForListItems: j,
				width: E
			} = this.props, C = this.getUniqueItemId(e), S = f({
				key: e,
				index: t,
				isInitialFocusInRange: l && this.state.isInitialFocusInRange,
				hasFocus: l,
				activeItem: r,
				initialActiveItem: s,
				firstItemInView: h
			}) || {};
			return !S.role && this.context.experimentA11YDesktopRefinementsKnlistGroupOn && (S.role = "gridcell"), d.a.createElement(y.b, Object(a.a)({
				tabIndex: this.getListItemTabIndex(e)
			}, S, {
				id: e,
				itemKey: e,
				key: e,
				height: c,
				validity: p,
				top: o,
				hasFocus: l,
				hasFocusWithin: u,
				onFocusEnter: this.onItemFocusEnter,
				onFocusWithin: this.onItemFocusWithin,
				onTabWithin: this.onItemTabWithin,
				onHeightChange: this.setHeight,
				onMouseDown: this.onItemMouseDown,
				onContextMenu: g,
				onClick: _,
				onKeyDown: O,
				shouldHorizontallyScroll: v,
				useStaticHeight: j
			}), b(t, {
				key: e,
				hasFocus: l,
				hasFocusWithin: u,
				itemId: C,
				listWidth: E,
				isInView: m,
				isExpanded: S["aria-expanded"],
				isOmitted: n
			}))
		}
		render() {
			const e = !this.context.experimentA11YDesktopRefinementsKnlistGroupOn && Object(u.H)() ? "application" : "presentation";
			return d.a.createElement(_.a, {
				onFocusEnter: this.onFocusEnter,
				onFocusLeave: this.onFocusLeave
			}, d.a.createElement(g.a, {
				onFocus: o.a,
				onBlur: o.a,
				onFocusedElementRemoved: this.onFocusedElementRemoved
			}, d.a.createElement("div", {
				role: e,
				id: this.props.id
			}, super.render())))
		}
	}
	KeyboardNavigableList.displayName = "KeyboardNavigableList", Object(r.a)(KeyboardNavigableList, "defaultProps", Object.assign({}, j.a.defaultProps, {
		activeItem: void 0,
		initialActiveItem: void 0,
		isFocusableItem: () => !0,
		onFocusEnter: o.a,
		onFocusLeave: o.a,
		onPageUp: o.a,
		onPageDown: o.a,
		onHome: o.a,
		onEnd: o.a,
		onItemClick: o.a,
		onItemKeyDown: o.a,
		onItemTabWithin: o.a,
		onItemFocusEnter: o.a,
		onItemFocusWithin: o.a,
		onItemContextMenu: o.a,
		onActiveItemChange: o.a,
		keyCommands: void 0,
		shouldIgnoreScrollKeys: function(e) {
			var t;
			return !this.node || !(null !== (t = this.getScrollerRef()) && void 0 !== t && t.contains(e.target))
		},
		shouldIgnoreArrowKeys: function(e) {
			var t;
			return !this.node || !(null !== (t = this.getScrollerRef()) && void 0 !== t && t.contains(e.target))
		},
		pageHeight: void 0,
		ignoreKeyCommandsOnInputs: !0,
		getPropsForItem: o.a,
		preventTabKeyNavigationIntoList: !1
	})), KeyboardNavigableList.contextType = v.a
}, ZQ7g: function(e, t, n) {
	"use strict";
	n.d(t, "a", (function() {
		return l
	}));
	var a = n("oTSI"),
		r = n("1zbP"),
		s = n("lhZz"),
		i = n("eCwn");

	function o(e, t) {
		Object(s.dispatchForTeamId)(e, Object(i.a)(t))
	}
	var c = n("c1tI");
	const l = Object(a.a)((() => new r.a({
		fetch: c.a,
		upsertKnown: o,
		upsertNonExistent: o
	})))
}, ZRDd: function(e, t, n) {
	e.exports = n.p + "rocket-9e9a6ea.svg"
}