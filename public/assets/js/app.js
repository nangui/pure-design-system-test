// node_modules/@pure-ds/core/public/assets/js/pds.js
var gt = Object.defineProperty;
var bt = (t3, e) => () => (t3 && (e = t3(t3 = 0)), e);
var $t = (t3, e) => {
  for (var s in e)
    gt(t3, s, { get: e[s], enumerable: true });
};
var it = {};
$t(it, { AutoDefiner: () => Pe });
async function Gt(...t3) {
  let e = {};
  t3.length && typeof t3[t3.length - 1] == "object" && (e = t3.pop() || {});
  let s = t3, { baseURL: n, mapper: r = (d) => `${d}.js`, onError: o = (d, l) => console.error(`[defineWebComponents] ${d}:`, l) } = e, i = n ? new URL(n, typeof location < "u" ? location.href : import.meta.url) : new URL("./", import.meta.url), a = (d) => d.toLowerCase().replace(/(^|-)([a-z])/g, (l, u, f) => f.toUpperCase()), c = async (d) => {
    try {
      if (customElements.get(d))
        return { tag: d, status: "already-defined" };
      let l = r(d), f = await (l instanceof URL ? import(l.href) : import(new URL(l, i).href)), m = f?.default ?? f?.[a(d)];
      if (!m) {
        if (customElements.get(d))
          return { tag: d, status: "self-defined" };
        throw new Error(`No export found for ${d}. Expected default export or named export "${a(d)}".`);
      }
      return customElements.get(d) ? { tag: d, status: "race-already-defined" } : (customElements.define(d, m), { tag: d, status: "defined" });
    } catch (l) {
      throw o(d, l), l;
    }
  };
  return Promise.all(s.map(c));
}
var Pe;
var at = bt(() => {
  Pe = class {
    constructor(e = {}) {
      let { baseURL: s, mapper: n, onError: r, predicate: o = () => true, attributeModule: i = "data-module", root: a = document, scanExisting: c = true, debounceMs: d = 16, observeShadows: l = true, enhancers: u = [], patchAttachShadow: f = true } = e, m = /* @__PURE__ */ new Set(), $ = /* @__PURE__ */ new Set(), x = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), A = 0, D = false, L = null, Z = (p) => {
        if (!p || !u.length)
          return;
        let y = H.get(p);
        y || (y = /* @__PURE__ */ new Set(), H.set(p, y));
        for (let h of u)
          if (!(!h.selector || !h.run) && !y.has(h.selector))
            try {
              p.matches && p.matches(h.selector) && (h.run(p), y.add(h.selector));
            } catch (v) {
              console.warn(`[AutoDefiner] Error applying enhancer for selector "${h.selector}":`, v);
            }
      }, I = (p, y) => {
        if (!D && !(!p || !p.includes("-")) && !customElements.get(p) && !$.has(p) && !x.has(p)) {
          if (y && y.getAttribute) {
            let h = y.getAttribute(i);
            h && !g.has(p) && g.set(p, h);
          }
          m.add(p), oe();
        }
      }, oe = () => {
        A || (A = setTimeout(z, d));
      }, E = (p) => {
        if (p) {
          if (p.nodeType === 1) {
            let y = p, h = y.tagName?.toLowerCase();
            h && h.includes("-") && !customElements.get(h) && o(h, y) && I(h, y), Z(y), l && y.shadowRoot && M(y.shadowRoot);
          }
          p.querySelectorAll && p.querySelectorAll("*").forEach((y) => {
            let h = y.tagName?.toLowerCase();
            h && h.includes("-") && !customElements.get(h) && o(h, y) && I(h, y), Z(y), l && y.shadowRoot && M(y.shadowRoot);
          });
        }
      }, M = (p) => {
        if (!p || _.has(p))
          return;
        E(p);
        let y = new MutationObserver((h) => {
          for (let v of h)
            v.addedNodes?.forEach((B) => {
              E(B);
            }), v.type === "attributes" && v.target && E(v.target);
        });
        y.observe(p, { childList: true, subtree: true, attributes: true, attributeFilter: [i, ...u.map((h) => h.selector).filter((h) => h.startsWith("data-"))] }), _.set(p, y);
      };
      async function z() {
        if (clearTimeout(A), A = 0, !m.size)
          return;
        let p = Array.from(m);
        m.clear(), p.forEach((y) => $.add(y));
        try {
          let y = (h) => g.get(h) ?? (n ? n(h) : `${h}.js`);
          await Gt(...p, { baseURL: s, mapper: y, onError: (h, v) => {
            x.add(h), r?.(h, v);
          } });
        } catch {
        } finally {
          p.forEach((y) => $.delete(y));
        }
      }
      let S = a === document ? document.documentElement : a, R = new MutationObserver((p) => {
        for (let y of p)
          y.addedNodes?.forEach((h) => {
            E(h);
          }), y.type === "attributes" && y.target && E(y.target);
      });
      if (R.observe(S, { childList: true, subtree: true, attributes: true, attributeFilter: [i, ...u.map((p) => p.selector).filter((p) => p.startsWith("data-"))] }), l && f && Element.prototype.attachShadow) {
        let p = Element.prototype.attachShadow;
        Element.prototype.attachShadow = function(h) {
          let v = p.call(this, h);
          if (h && h.mode === "open") {
            M(v);
            let B = this.tagName?.toLowerCase();
            B && B.includes("-") && !customElements.get(B) && I(B, this);
          }
          return v;
        }, L = () => Element.prototype.attachShadow = p;
      }
      return c && E(S), { stop() {
        D = true, R.disconnect(), L && L(), A && (clearTimeout(A), A = 0), _.forEach((p) => p.disconnect());
      }, flush: z };
    }
    static async define(...e) {
      let s = {};
      e.length && typeof e[e.length - 1] == "object" && (s = e.pop() || {});
      let n = e, { baseURL: r, mapper: o = (l) => `${l}.js`, onError: i = (l, u) => console.error(`[defineWebComponents] ${l}:`, u) } = s, a = r ? new URL(r, typeof location < "u" ? location.href : import.meta.url) : new URL("./", import.meta.url), c = (l) => l.toLowerCase().replace(/(^|-)([a-z])/g, (u, f, m) => m.toUpperCase()), d = async (l) => {
        try {
          if (customElements.get(l))
            return { tag: l, status: "already-defined" };
          let u = o(l), m = await (u instanceof URL ? import(u.href) : import(new URL(u, a).href)), $ = m?.default ?? m?.[c(l)];
          if (!$) {
            if (customElements.get(l))
              return { tag: l, status: "self-defined" };
            throw new Error(`No export found for ${l}. Expected default export or named export "${c(l)}".`);
          }
          return customElements.get(l) ? { tag: l, status: "race-already-defined" } : (customElements.define(l, $), { tag: l, status: "defined" });
        } catch (u) {
          throw i(l, u), u;
        }
      };
      return Promise.all(n.map(d));
    }
  };
});
var me = class {
  constructor() {
    this._mode = "static", this._staticPaths = { tokens: "/assets/pds/styles/pds-tokens.css.js", primitives: "/assets/pds/styles/pds-primitives.css.js", components: "/assets/pds/styles/pds-components.css.js", utilities: "/assets/pds/styles/pds-utilities.css.js", styles: "/assets/pds/styles/pds-styles.css.js" };
  }
  setLiveMode() {
    this._mode = "live";
  }
  setStaticMode(e = {}) {
    this._mode = "static", this._staticPaths = { ...this._staticPaths, ...e };
  }
  async getStylesheet(e) {
    if (this._mode === "live")
      return null;
    try {
      return (await import(this._staticPaths[e]))[e];
    } catch (s) {
      console.error(`[PDS Registry] Failed to load static ${e}:`, s), console.error(`[PDS Registry] Looking for: ${this._staticPaths[e]}`), console.error("[PDS Registry] Make sure you've run 'npm run pds:build' and configured PDS.start() with the correct static.root path");
      let n = new CSSStyleSheet();
      return n.replaceSync("/* Failed to load " + e + " */"), n;
    }
  }
  get mode() {
    return this._mode;
  }
  get isLive() {
    return this._mode === "live";
  }
};
var F = new me();
async function Oe(t3, e = [], s = null) {
  try {
    let n = s?.primitivesStylesheet ? s.primitivesStylesheet : await F.getStylesheet("primitives");
    t3.adoptedStyleSheets = [n, ...e];
  } catch (n) {
    let r = t3.host?.tagName?.toLowerCase() || "unknown";
    console.error(`[PDS Adopter] <${r}> failed to adopt primitives:`, n), t3.adoptedStyleSheets = e;
  }
}
async function Ne(t3, e = ["primitives"], s = [], n = null) {
  try {
    let o = (await Promise.all(e.map(async (i) => {
      if (n)
        switch (i) {
          case "tokens":
            return n.tokensStylesheet;
          case "primitives":
            return n.primitivesStylesheet;
          case "components":
            return n.componentsStylesheet;
          case "utilities":
            return n.utilitiesStylesheet;
          default:
            break;
        }
      return F.getStylesheet(i);
    }))).filter((i) => i !== null);
    t3.adoptedStyleSheets = [...o, ...s];
  } catch (r) {
    let o = t3.host?.tagName?.toLowerCase() || "unknown";
    console.error(`[PDS Adopter] <${o}> failed to adopt layers:`, r), t3.adoptedStyleSheets = s;
  }
}
function je(t3) {
  let e = new CSSStyleSheet();
  return e.replaceSync(t3), e;
}
var ie = globalThis;
var ce = ie.ShadowRoot && (ie.ShadyCSS === void 0 || ie.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var He = Symbol();
var qe = /* @__PURE__ */ new WeakMap();
var ae = class {
  constructor(e, s, n) {
    if (this._$cssResult$ = true, n !== He)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = s;
  }
  get styleSheet() {
    let e = this.o, s = this.t;
    if (ce && e === void 0) {
      let n = s !== void 0 && s.length === 1;
      n && (e = qe.get(s)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && qe.set(s, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
var Ie = (t3) => new ae(typeof t3 == "string" ? t3 : t3 + "", void 0, He);
var ze = (t3, e) => {
  if (ce)
    t3.adoptedStyleSheets = e.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else
    for (let s of e) {
      let n = document.createElement("style"), r = ie.litNonce;
      r !== void 0 && n.setAttribute("nonce", r), n.textContent = s.cssText, t3.appendChild(n);
    }
};
var ye = ce ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((e) => {
  let s = "";
  for (let n of e.cssRules)
    s += n.cssText;
  return Ie(s);
})(t3) : t3;
var { is: wt, defineProperty: _t, getOwnPropertyDescriptor: St, getOwnPropertyNames: At, getOwnPropertySymbols: Et, getPrototypeOf: vt } = Object;
var le = globalThis;
var Be = le.trustedTypes;
var Lt = Be ? Be.emptyScript : "";
var Ct = le.reactiveElementPolyfillSupport;
var J = (t3, e) => t3;
var ge = { toAttribute(t3, e) {
  switch (e) {
    case Boolean:
      t3 = t3 ? Lt : null;
      break;
    case Object:
    case Array:
      t3 = t3 == null ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, e) {
  let s = t3;
  switch (e) {
    case Boolean:
      s = t3 !== null;
      break;
    case Number:
      s = t3 === null ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(t3);
      } catch {
        s = null;
      }
  }
  return s;
} };
var We = (t3, e) => !wt(t3, e);
var Fe = { attribute: true, type: String, converter: ge, reflect: false, useDefault: false, hasChanged: We };
Symbol.metadata ??= Symbol("metadata"), le.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var P = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, s = Fe) {
    if (s.state && (s.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(e) && ((s = Object.create(s)).wrapped = true), this.elementProperties.set(e, s), !s.noAccessor) {
      let n = Symbol(), r = this.getPropertyDescriptor(e, n, s);
      r !== void 0 && _t(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, s, n) {
    let { get: r, set: o } = St(this.prototype, e) ?? { get() {
      return this[s];
    }, set(i) {
      this[s] = i;
    } };
    return { get: r, set(i) {
      let a = r?.call(this);
      o?.call(this, i), this.requestUpdate(e, a, n);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Fe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(J("elementProperties")))
      return;
    let e = vt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(J("finalized")))
      return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(J("properties"))) {
      let s = this.properties, n = [...At(s), ...Et(s)];
      for (let r of n)
        this.createProperty(r, s[r]);
    }
    let e = this[Symbol.metadata];
    if (e !== null) {
      let s = litPropertyMetadata.get(e);
      if (s !== void 0)
        for (let [n, r] of s)
          this.elementProperties.set(n, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (let [s, n] of this.elementProperties) {
      let r = this._$Eu(s, n);
      r !== void 0 && this._$Eh.set(r, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    let s = [];
    if (Array.isArray(e)) {
      let n = new Set(e.flat(1 / 0).reverse());
      for (let r of n)
        s.unshift(ye(r));
    } else
      e !== void 0 && s.push(ye(e));
    return s;
  }
  static _$Eu(e, s) {
    let n = s.attribute;
    return n === false ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    let e = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (let n of s.keys())
      this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ze(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, s, n) {
    this._$AK(e, n);
  }
  _$ET(e, s) {
    let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
    if (r !== void 0 && n.reflect === true) {
      let o = (n.converter?.toAttribute !== void 0 ? n.converter : ge).toAttribute(s, n.type);
      this._$Em = e, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(e, s) {
    let n = this.constructor, r = n._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      let o = n.getPropertyOptions(r), i = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : ge;
      this._$Em = r;
      let a = i.fromAttribute(s, o.type);
      this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, s, n) {
    if (e !== void 0) {
      let r = this.constructor, o = this[e];
      if (n ??= r.getPropertyOptions(e), !((n.hasChanged ?? We)(o, s) || n.useDefault && n.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, n))))
        return;
      this.C(e, s, n);
    }
    this.isUpdatePending === false && (this._$ES = this._$EP());
  }
  C(e, s, { useDefault: n, reflect: r, wrapped: o }, i) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, i ?? s ?? this[e]), o !== true || i !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (s = void 0), this._$AL.set(e, s)), r === true && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    let e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (let [r, o] of this._$Ep)
          this[r] = o;
        this._$Ep = void 0;
      }
      let n = this.constructor.elementProperties;
      if (n.size > 0)
        for (let [r, o] of n) {
          let { wrapped: i } = o, a = this[r];
          i !== true || this._$AL.has(r) || a === void 0 || this.C(r, void 0, o, a);
        }
    }
    let e = false, s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(s)) : this._$EM();
    } catch (n) {
      throw e = false, this._$EM(), n;
    }
    e && this._$AE(s);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((s) => s.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return true;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((s) => this._$ET(s, this[s])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[J("elementProperties")] = /* @__PURE__ */ new Map(), P[J("finalized")] = /* @__PURE__ */ new Map(), Ct?.({ ReactiveElement: P }), (le.reactiveElementVersions ??= []).push("2.1.1");
var Ee = globalThis;
var de = Ee.trustedTypes;
var Ve = de ? de.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
var Xe = "$lit$";
var k = `lit$${Math.random().toFixed(9).slice(2)}$`;
var Ye = "?" + k;
var xt = `<${Ye}>`;
var O = document;
var X = () => O.createComment("");
var Y = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function";
var ve = Array.isArray;
var Rt = (t3) => ve(t3) || typeof t3?.[Symbol.iterator] == "function";
var be = `[ 	
\f\r]`;
var Q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var Ke = /-->/g;
var Ge = />/g;
var U = RegExp(`>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var Ze = /'/g;
var Je = /"/g;
var et = /^(?:script|style|textarea|title)$/i;
var Le = (t3) => (e, ...s) => ({ _$litType$: t3, strings: e, values: s });
var cs = Le(1);
var ls = Le(2);
var ds = Le(3);
var N = Symbol.for("lit-noChange");
var w = Symbol.for("lit-nothing");
var Qe = /* @__PURE__ */ new WeakMap();
var T = O.createTreeWalker(O, 129);
function tt(t3, e) {
  if (!ve(t3) || !t3.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Ve !== void 0 ? Ve.createHTML(e) : e;
}
var Pt = (t3, e) => {
  let s = t3.length - 1, n = [], r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", i = Q;
  for (let a = 0; a < s; a++) {
    let c = t3[a], d, l, u = -1, f = 0;
    for (; f < c.length && (i.lastIndex = f, l = i.exec(c), l !== null); )
      f = i.lastIndex, i === Q ? l[1] === "!--" ? i = Ke : l[1] !== void 0 ? i = Ge : l[2] !== void 0 ? (et.test(l[2]) && (r = RegExp("</" + l[2], "g")), i = U) : l[3] !== void 0 && (i = U) : i === U ? l[0] === ">" ? (i = r ?? Q, u = -1) : l[1] === void 0 ? u = -2 : (u = i.lastIndex - l[2].length, d = l[1], i = l[3] === void 0 ? U : l[3] === '"' ? Je : Ze) : i === Je || i === Ze ? i = U : i === Ke || i === Ge ? i = Q : (i = U, r = void 0);
    let m = i === U && t3[a + 1].startsWith("/>") ? " " : "";
    o += i === Q ? c + xt : u >= 0 ? (n.push(d), c.slice(0, u) + Xe + c.slice(u) + k + m) : c + k + (u === -2 ? a : m);
  }
  return [tt(t3, o + (t3[s] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
var ee = class t {
  constructor({ strings: e, _$litType$: s }, n) {
    let r;
    this.parts = [];
    let o = 0, i = 0, a = e.length - 1, c = this.parts, [d, l] = Pt(e, s);
    if (this.el = t.createElement(d, n), T.currentNode = this.el.content, s === 2 || s === 3) {
      let u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (r = T.nextNode()) !== null && c.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes())
          for (let u of r.getAttributeNames())
            if (u.endsWith(Xe)) {
              let f = l[i++], m = r.getAttribute(u).split(k), $ = /([.?@])?(.*)/.exec(f);
              c.push({ type: 1, index: o, name: $[2], strings: m, ctor: $[1] === "." ? we : $[1] === "?" ? _e : $[1] === "@" ? Se : V }), r.removeAttribute(u);
            } else
              u.startsWith(k) && (c.push({ type: 6, index: o }), r.removeAttribute(u));
        if (et.test(r.tagName)) {
          let u = r.textContent.split(k), f = u.length - 1;
          if (f > 0) {
            r.textContent = de ? de.emptyScript : "";
            for (let m = 0; m < f; m++)
              r.append(u[m], X()), T.nextNode(), c.push({ type: 2, index: ++o });
            r.append(u[f], X());
          }
        }
      } else if (r.nodeType === 8)
        if (r.data === Ye)
          c.push({ type: 2, index: o });
        else {
          let u = -1;
          for (; (u = r.data.indexOf(k, u + 1)) !== -1; )
            c.push({ type: 7, index: o }), u += k.length - 1;
        }
      o++;
    }
  }
  static createElement(e, s) {
    let n = O.createElement("template");
    return n.innerHTML = e, n;
  }
};
function W(t3, e, s = t3, n) {
  if (e === N)
    return e;
  let r = n !== void 0 ? s._$Co?.[n] : s._$Cl, o = Y(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(false), o === void 0 ? r = void 0 : (r = new o(t3), r._$AT(t3, s, n)), n !== void 0 ? (s._$Co ??= [])[n] = r : s._$Cl = r), r !== void 0 && (e = W(t3, r._$AS(t3, e.values), r, n)), e;
}
var $e = class {
  constructor(e, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    let { el: { content: s }, parts: n } = this._$AD, r = (e?.creationScope ?? O).importNode(s, true);
    T.currentNode = r;
    let o = T.nextNode(), i = 0, a = 0, c = n[0];
    for (; c !== void 0; ) {
      if (i === c.index) {
        let d;
        c.type === 2 ? d = new te(o, o.nextSibling, this, e) : c.type === 1 ? d = new c.ctor(o, c.name, c.strings, this, e) : c.type === 6 && (d = new Ae(o, this, e)), this._$AV.push(d), c = n[++a];
      }
      i !== c?.index && (o = T.nextNode(), i++);
    }
    return T.currentNode = O, r;
  }
  p(e) {
    let s = 0;
    for (let n of this._$AV)
      n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, s), s += n.strings.length - 2) : n._$AI(e[s])), s++;
  }
};
var te = class t2 {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, s, n, r) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = e, this._$AB = s, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? true;
  }
  get parentNode() {
    let e = this._$AA.parentNode, s = this._$AM;
    return s !== void 0 && e?.nodeType === 11 && (e = s.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, s = this) {
    e = W(this, e, s), Y(e) ? e === w || e == null || e === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : e !== this._$AH && e !== N && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Rt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== w && Y(this._$AH) ? this._$AA.nextSibling.data = e : this.T(O.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    let { values: s, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = ee.createElement(tt(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r)
      this._$AH.p(s);
    else {
      let o = new $e(r, this), i = o.u(this.options);
      o.p(s), this.T(i), this._$AH = o;
    }
  }
  _$AC(e) {
    let s = Qe.get(e.strings);
    return s === void 0 && Qe.set(e.strings, s = new ee(e)), s;
  }
  k(e) {
    ve(this._$AH) || (this._$AH = [], this._$AR());
    let s = this._$AH, n, r = 0;
    for (let o of e)
      r === s.length ? s.push(n = new t2(this.O(X()), this.O(X()), this, this.options)) : n = s[r], n._$AI(o), r++;
    r < s.length && (this._$AR(n && n._$AB.nextSibling, r), s.length = r);
  }
  _$AR(e = this._$AA.nextSibling, s) {
    for (this._$AP?.(false, true, s); e !== this._$AB; ) {
      let n = e.nextSibling;
      e.remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
};
var V = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, s, n, r, o) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = e, this.name = s, this._$AM = r, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = w;
  }
  _$AI(e, s = this, n, r) {
    let o = this.strings, i = false;
    if (o === void 0)
      e = W(this, e, s, 0), i = !Y(e) || e !== this._$AH && e !== N, i && (this._$AH = e);
    else {
      let a = e, c, d;
      for (e = o[0], c = 0; c < o.length - 1; c++)
        d = W(this, a[n + c], s, c), d === N && (d = this._$AH[c]), i ||= !Y(d) || d !== this._$AH[c], d === w ? e = w : e !== w && (e += (d ?? "") + o[c + 1]), this._$AH[c] = d;
    }
    i && !r && this.j(e);
  }
  j(e) {
    e === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
var we = class extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === w ? void 0 : e;
  }
};
var _e = class extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== w);
  }
};
var Se = class extends V {
  constructor(e, s, n, r, o) {
    super(e, s, n, r, o), this.type = 5;
  }
  _$AI(e, s = this) {
    if ((e = W(this, e, s, 0) ?? w) === N)
      return;
    let n = this._$AH, r = e === w && n !== w || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, o = e !== w && (n === w || r);
    r && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
};
var Ae = class {
  constructor(e, s, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    W(this, e);
  }
};
var kt = Ee.litHtmlPolyfillSupport;
kt?.(ee, te), (Ee.litHtmlVersions ??= []).push("3.3.1");
var j = (t3, e, s) => {
  let n = s?.renderBefore ?? e, r = n._$litPart$;
  if (r === void 0) {
    let o = s?.renderBefore ?? null;
    n._$litPart$ = r = new te(e.insertBefore(X(), o), o, void 0, s ?? {});
  }
  return r._$AI(t3), r;
};
var Ce = globalThis;
var K = class extends P {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    let e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    let s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = j(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return N;
  }
};
K._$litElement$ = true, K.finalized = true, Ce.litElementHydrateSupport?.({ LitElement: K });
var Dt = Ce.litElementPolyfillSupport;
Dt?.({ LitElement: K });
(Ce.litElementVersions ??= []).push("4.2.1");
var st = { mode: "live", preset: "default", autoDefine: { predefine: ["pds-icon", "pds-drawer", "pds-toaster"] }, log(t3, e, ...s) {
  console[t3](e, ...s);
} };
async function nt(t3, e = {}) {
  return e = { ...{ title: "Confirm", type: "confirm", buttons: { ok: { name: "OK", primary: true }, cancel: { name: "Cancel", cancel: true } } }, ...e }, new Promise((n) => {
    let r = document.createElement("dialog");
    st.options?.liquidGlassEffects && r.classList.add("liquid-glass"), e.size && r.classList.add(`dialog-${e.size}`), e.type && r.classList.add(`dialog-${e.type}`), e.class && (Array.isArray(e.class) ? r.classList.add(...e.class) : r.classList.add(e.class)), e.maxHeight && r.style.setProperty("--dialog-max-height", e.maxHeight);
    let o = Object.entries(e.buttons).map(([a, c]) => {
      let d = c.primary ? "btn-primary btn-sm" : "btn-outline btn-sm";
      return `<button type="${c.cancel ? "button" : "submit"}" class="${d}" value="${a}">${c.name}</button>`;
    });
    if (e.useForm) {
      let a = document.createElement("div");
      typeof t3 == "object" && t3._$litType$ ? j(t3, a) : typeof t3 == "string" ? a.textContent = t3 : j(t3, a);
      let c = a.querySelector("form");
      if (c) {
        r.innerHTML = `
          <header>
            <h2>${e.title}</h2>
          </header>
        `;
        let d = document.createElement("article");
        for (d.className = "dialog-body"; c.firstChild; )
          d.appendChild(c.firstChild);
        c.appendChild(d);
        let l = document.createElement("footer");
        l.innerHTML = o.join(""), c.appendChild(l), r.appendChild(c);
      } else
        r.innerHTML = `
          <header>
            <h2>${e.title}</h2>
          </header>
          <article id="msg-container"></article>
          <footer>
            ${o.join("")}
          </footer>
        `, r.querySelector("#msg-container").appendChild(a);
    } else {
      r.innerHTML = `
        <form method="dialog">
          <header>
            <h2>${e.title}</h2>
          </header>
          
          <article id="msg-container"></article>
          
          <footer>
            ${o.join("")}
          </footer>
        </form>
      `;
      let a = r.querySelector("#msg-container");
      typeof t3 == "object" && t3._$litType$ ? j(t3, a) : typeof t3 == "string" ? a.textContent = t3 : j(t3, a);
    }
    r.addEventListener("click", (a) => {
      a.target.closest('button[value="cancel"]') && (r.close(), n(false));
    });
    let i = () => {
      let a = r.querySelector("form");
      a ? a.addEventListener("submit", (c) => {
        c.preventDefault();
        let d;
        e.useForm && c.submitter.value === "ok" ? (console.log("Found form:", a), console.log("Form elements:", a ? Array.from(a.elements) : "no form"), d = new FormData(a), console.log("FormData entries:", Array.from(d.entries()))) : d = c.submitter.value === "ok", r.close(), n(d);
      }) : requestAnimationFrame(i);
    };
    i(), r.addEventListener("close", () => {
      setTimeout(() => r.remove(), 200);
    }), document.body.appendChild(r), typeof e.rendered == "function" && e.rendered(r), r.showModal();
  });
}
async function Mt() {
  let t3 = document.querySelector("pds-toaster");
  return t3 || (t3 = document.createElement("pds-toaster"), document.body.appendChild(t3), await customElements.whenDefined("pds-toaster")), t3;
}
async function C(t3, e = {}) {
  return (await Mt()).toast(t3, e);
}
C.success = async function(t3, e = {}) {
  return C(t3, { ...e, type: "success" });
};
C.error = async function(t3, e = {}) {
  return C(t3, { ...e, type: "error" });
};
C.warning = async function(t3, e = {}) {
  return C(t3, { ...e, type: "warning" });
};
C.info = async function(t3, e = {}) {
  return C(t3, { ...e, type: "information" });
};
var Ut = [{ selector: ".accordion" }, { selector: "nav[data-dropdown]" }, { selector: "label[data-toggle]" }, { selector: 'input[type="range"]' }, { selector: "form[data-required]" }, { selector: "fieldset[role=group][data-open]" }, { selector: "button, a[class*='btn-']" }];
function Tt(t3) {
  t3.dataset.enhancedAccordion || (t3.dataset.enhancedAccordion = "true", t3.addEventListener("toggle", (e) => {
    e.target.open && e.target.parentElement === t3 && t3.querySelectorAll(":scope > details[open]").forEach((s) => {
      s !== e.target && (s.open = false);
    });
  }, true));
}
function Ot(t3) {
  if (t3.dataset.enhancedDropdown)
    return;
  t3.dataset.enhancedDropdown = "true";
  let e = t3.querySelector("menu");
  if (!e)
    return;
  let s = t3.querySelector("[data-dropdown-toggle]") || t3.querySelector("button");
  s && !s.hasAttribute("type") && s.setAttribute("type", "button"), e.id || (e.id = `dropdown-${Math.random().toString(36).slice(2, 9)}`), e.setAttribute("role", e.getAttribute("role") || "menu"), e.hasAttribute("aria-hidden") || e.setAttribute("aria-hidden", "true"), s && (s.setAttribute("aria-haspopup", "true"), s.setAttribute("aria-controls", e.id), s.setAttribute("aria-expanded", "false"));
  let n = () => {
    let a = (t3.getAttribute("data-mode") || "auto").toLowerCase();
    if (a === "up" || a === "down")
      return a;
    let c = t3.getBoundingClientRect(), d = Math.max(0, window.innerHeight - c.bottom);
    return Math.max(0, c.top) > d ? "up" : "down";
  }, r = () => {
    t3.dataset.dropdownDirection = n(), e.setAttribute("aria-hidden", "false"), s?.setAttribute("aria-expanded", "true");
  }, o = () => {
    e.setAttribute("aria-hidden", "true"), s?.setAttribute("aria-expanded", "false");
  }, i = () => {
    e.getAttribute("aria-hidden") === "false" ? o() : r();
  };
  s?.addEventListener("click", (a) => {
    a.preventDefault(), a.stopPropagation(), i();
  }), document.addEventListener("click", (a) => {
    t3.contains(a.target) || o();
  }), t3.addEventListener("keydown", (a) => {
    a.key === "Escape" && (o(), s?.focus());
  }), t3.addEventListener("focusout", (a) => {
    (!a.relatedTarget || !t3.contains(a.relatedTarget)) && o();
  });
}
function Nt(t3) {
  if (t3.dataset.enhancedToggle)
    return;
  t3.dataset.enhancedToggle = "true";
  let e = t3.querySelector('input[type="checkbox"]');
  if (!e)
    return;
  t3.hasAttribute("tabindex") || t3.setAttribute("tabindex", "0"), t3.setAttribute("role", "switch"), t3.setAttribute("aria-checked", e.checked ? "true" : "false");
  let s = document.createElement("span");
  s.className = "toggle-switch", s.setAttribute("role", "presentation"), s.setAttribute("aria-hidden", "true");
  let n = document.createElement("span");
  n.className = "toggle-knob", s.appendChild(n), t3.insertBefore(s, e.nextSibling);
  let r = () => {
    t3.setAttribute("aria-checked", e.checked ? "true" : "false");
  }, o = () => {
    e.disabled || (e.checked = !e.checked, r(), e.dispatchEvent(new Event("change", { bubbles: true })));
  };
  t3.addEventListener("click", (i) => {
    i.preventDefault(), o();
  }), t3.addEventListener("keydown", (i) => {
    (i.key === " " || i.key === "Enter") && (i.preventDefault(), o());
  }), e.addEventListener("change", r);
}
function jt(t3) {
  if (t3.dataset.enhancedRange)
    return;
  let e = t3.closest("label"), s = e?.classList.contains("range-output"), n = t3.id || `range-${Math.random().toString(36).substring(2, 11)}`, r = `${n}-output`;
  if (t3.id = n, s) {
    let o = e.querySelector("span");
    if (o && !o.classList.contains("range-output-wrapper")) {
      let i = document.createElement("span");
      i.className = "range-output-wrapper", i.style.display = "flex", i.style.justifyContent = "space-between", i.style.alignItems = "center";
      let a = document.createElement("span");
      a.textContent = o.textContent, i.appendChild(a);
      let c = document.createElement("output");
      c.id = r, c.setAttribute("for", n), c.style.color = "var(--surface-text-secondary, var(--color-text-secondary))", c.style.fontSize = "0.875rem", c.textContent = t3.value, i.appendChild(c), o.textContent = "", o.appendChild(i);
      let d = () => {
        c.textContent = t3.value;
      };
      t3.addEventListener("input", d);
    }
  } else {
    let o = t3.closest(".range-container");
    o || (o = document.createElement("div"), o.className = "range-container", t3.parentNode?.insertBefore(o, t3), o.appendChild(t3)), o.style.position = "relative";
    let i = document.createElement("output");
    i.id = r, i.setAttribute("for", n), i.className = "range-bubble", i.setAttribute("aria-live", "polite"), o.appendChild(i);
    let a = () => {
      let l = parseFloat(t3.min) || 0, u = parseFloat(t3.max) || 100, f = parseFloat(t3.value), m = (f - l) / (u - l);
      i.style.left = `calc(${m * 100}% )`, i.textContent = String(f);
    }, c = () => i.classList.add("visible"), d = () => i.classList.remove("visible");
    t3.addEventListener("input", a), t3.addEventListener("pointerdown", c), t3.addEventListener("pointerup", d), t3.addEventListener("pointerleave", d), t3.addEventListener("focus", c), t3.addEventListener("blur", d), a();
  }
  t3.dataset.enhancedRange = "1";
}
function qt(t3) {
  if (t3.dataset.enhancedRequired)
    return;
  t3.dataset.enhancedRequired = "true";
  let e = (s) => {
    let n = s.closest("label");
    if (!n || n.querySelector(".required-asterisk"))
      return;
    let r = document.createElement("span");
    r.classList.add("required-asterisk"), r.textContent = "*", r.style.marginLeft = "4px", n.querySelector("span").appendChild(r);
    let o = s.closest("form");
    if (o && !o.querySelector(".required-legend")) {
      let i = document.createElement("small");
      i.classList.add("required-legend"), i.textContent = "* Required fields", o.insertBefore(i, o.querySelector(".form-actions") || o.lastElementChild);
    }
  };
  t3.querySelectorAll("[required]").forEach((s) => {
    e(s);
  });
}
function Ht(t3) {
  if (t3.dataset.enhancedOpenGroup)
    return;
  t3.dataset.enhancedOpenGroup = "true", t3.classList.add("flex", "flex-wrap", "buttons");
  let e = document.createElement("input");
  e.type = "text", e.placeholder = "Add item...", e.classList.add("input-text", "input-sm"), e.style.width = "auto";
  let s = t3.querySelector('input[type="radio"], input[type="checkbox"]');
  t3.appendChild(e), e.addEventListener("keydown", (n) => {
    if (n.key === "Enter" || n.key === "Tab") {
      let r = e.value.trim();
      if (r) {
        n.preventDefault();
        let o = s.type === "radio" ? "radio" : "checkbox", i = `open-group-${Math.random().toString(36).substring(2, 11)}`, a = document.createElement("label"), c = document.createElement("span");
        c.setAttribute("data-label", ""), c.textContent = r;
        let d = document.createElement("input");
        d.type = o, d.name = s.name || t3.getAttribute("data-name") || "open-group", d.value = r, d.id = i, a.appendChild(c), a.appendChild(d), t3.insertBefore(a, e), e.value = "";
      }
    } else if (n.key === "Backspace" && e.value === "") {
      n.preventDefault();
      let r = t3.querySelectorAll("label");
      r.length > 0 && r[r.length - 1].remove();
    }
  });
}
function It(t3) {
  if (t3.dataset.enhancedBtnWorking)
    return;
  t3.dataset.enhancedBtnWorking = "true";
  let e = null, s = false;
  new MutationObserver((r) => {
    r.forEach((o) => {
      if (o.attributeName === "class") {
        let i = t3.classList.contains("btn-working"), a = t3.querySelector("pds-icon");
        if (i)
          if (a)
            e || (e = a.getAttribute("icon")), a.setAttribute("icon", "circle-notch");
          else {
            let c = document.createElement("pds-icon");
            c.setAttribute("icon", "circle-notch"), c.setAttribute("size", "sm"), t3.insertBefore(c, t3.firstChild), s = true;
          }
        else
          o.oldValue?.includes("btn-working") && a && (s ? (a.remove(), s = false) : e && (a.setAttribute("icon", e), e = null));
      }
    });
  }).observe(t3, { attributes: true, attributeFilter: ["class"], attributeOldValue: true });
}
var zt = /* @__PURE__ */ new Map([[".accordion", Tt], ["nav[data-dropdown]", Ot], ["label[data-toggle]", Nt], ['input[type="range"]', jt], ["form[data-required]", qt], ["fieldset[role=group][data-open]", Ht], ["button, a[class*='btn-']", It]]);
var xe = Ut.map((t3) => ({ ...t3, run: zt.get(t3.selector) || (() => {
}) }));
var ot = "pds";
var Bt = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
var rt = /^[a-z]:/i;
function se(t3 = "") {
  return t3.endsWith("/") ? t3 : `${t3}/`;
}
function Ft(t3 = "", e = ot) {
  let s = t3.replace(/\/+$/, "");
  return new RegExp(`(?:^|/)${e}$`, "i").test(s) ? s : `${s}/${e}`;
}
function Wt(t3) {
  return t3.replace(/^\.\/+/, "");
}
function Vt(t3) {
  return rt.test(t3) ? t3.replace(rt, "").replace(/^\/+/, "") : t3;
}
function Kt(t3) {
  return t3.startsWith("public/") ? t3.substring(7) : t3;
}
function Re(t3, e = {}) {
  let s = e.segment || ot, n = e.defaultRoot || `/assets/${s}/`, r = t3?.public && t3.public?.root || t3?.static && t3.static?.root || null;
  if (!r || typeof r != "string")
    return se(n);
  let o = r.trim();
  return o ? (o = o.replace(/\\/g, "/"), o = Ft(o, s), o = se(o), Bt.test(o) ? o : (o = Wt(o), o = Vt(o), o.startsWith("/") || (o = Kt(o), o.startsWith("/") || (o = `/${o}`), o = o.replace(/\/+/g, (i, a) => a === 0 ? i : "/")), se(o))) : se(n);
}
var Zt = /^[a-z][a-z0-9+\-.]*:\/\//i;
var ne = (() => {
  try {
    return import.meta.url;
  } catch {
    return;
  }
})();
var ue = (t3) => typeof t3 == "string" && t3.length && !t3.endsWith("/") ? `${t3}/` : t3;
function pe(t3, e = {}) {
  if (!t3 || Zt.test(t3))
    return t3;
  let { preferModule: s = true } = e, n = () => {
    if (!ne)
      return null;
    try {
      return new URL(t3, ne).href;
    } catch {
      return null;
    }
  }, r = () => {
    if (typeof window > "u" || !window.location?.origin)
      return null;
    try {
      return new URL(t3, window.location.origin).href;
    } catch {
      return null;
    }
  };
  return (s ? n() || r() : r() || n()) || t3;
}
var ct = (() => {
  if (ne)
    try {
      let t3 = new URL(ne);
      if (/\/public\/assets\/js\//.test(t3.pathname))
        return new URL("../pds/", ne).href;
    } catch {
      return;
    }
})();
var lt = false;
function dt(t3) {
  lt || typeof document > "u" || (lt = true, t3.addEventListener("pds:ready", (e) => {
    let s = e.detail?.mode;
    s && document.documentElement.classList.add(`pds-${s}`, "pds-ready");
  }));
}
function ut(t3 = {}, e = {}) {
  if (!e || typeof e != "object")
    return t3;
  let s = Array.isArray(t3) ? [...t3] : { ...t3 };
  for (let [n, r] of Object.entries(e))
    r && typeof r == "object" && !Array.isArray(r) ? s[n] = ut(s[n] && typeof s[n] == "object" ? s[n] : {}, r) : s[n] = r;
  return s;
}
function ke(t3 = "") {
  return String(t3).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function G(t3) {
  if (t3 == null)
    return t3;
  if (typeof t3 == "function")
    return;
  if (typeof t3 != "object")
    return t3;
  if (Array.isArray(t3))
    return t3.map((s) => G(s)).filter((s) => s !== void 0);
  let e = {};
  for (let s in t3)
    if (t3.hasOwnProperty(s)) {
      let n = t3[s];
      if (typeof n != "function") {
        let r = G(n);
        r !== void 0 && (e[s] = r);
      }
    }
  return e;
}
function pt(t3 = {}, e = {}, { presets: s, defaultLog: n }) {
  let r = typeof t3 == "object" && ("colors" in t3 || "typography" in t3 || "spatialRhythm" in t3 || "shape" in t3 || "behavior" in t3 || "layout" in t3 || "advanced" in t3 || "a11y" in t3 || "components" in t3 || "icons" in t3), o = t3 && t3.enhancers;
  o && !Array.isArray(o) && (o = Object.values(o));
  let i = o ?? e.enhancers ?? [], a = t3 && t3.preset, c = t3 && t3.design, d = "preset" in (t3 || {}) || "design" in (t3 || {}) || "enhancers" in (t3 || {}), l, u = null;
  if (d) {
    let f = String(a || "default").toLowerCase(), m = s?.[f] || Object.values(s || {}).find((R) => ke(R.name) === f || String(R.name || "").toLowerCase() === f);
    if (!m)
      throw new Error(`PDS preset not found: "${a || "default"}"`);
    u = { id: m.id || ke(m.name), name: m.name || m.id || String(f) };
    let $ = structuredClone(m);
    if (c && typeof c == "object") {
      let R = G(c);
      $ = ut($, structuredClone(R));
    }
    let { mode: x, autoDefine: g, applyGlobalStyles: _, manageTheme: H, themeStorageKey: A, preloadStyles: D, criticalLayers: L, managerURL: Z, manager: I, preset: oe, design: E, enhancers: M, log: z, ...S } = t3;
    l = { ...S, design: $, preset: u.name, log: z || n };
  } else if (r) {
    let { log: f, ...m } = t3;
    l = { design: structuredClone(m), log: f || n };
  } else {
    let f = s?.default || Object.values(s || {}).find((m) => ke(m.name) === "default");
    if (!f)
      throw new Error("PDS default preset not available");
    u = { id: f.id || "default", name: f.name || "Default" }, l = { design: structuredClone(f), preset: u.name, log: n };
  }
  return { generatorConfig: l, enhancers: i, presetInfo: u };
}
function ht({ manageTheme: t3, themeStorageKey: e, applyResolvedTheme: s, setupSystemListenerIfNeeded: n }) {
  let r = "light", o = null;
  if (t3 && typeof window < "u") {
    try {
      o = localStorage.getItem(e) || null;
    } catch {
      o = null;
    }
    try {
      s?.(o), n?.(o);
    } catch {
    }
    o ? o === "system" ? r = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : r = o : r = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return { resolvedTheme: r, storedTheme: o };
}
function De(t3, { resolvePublicAssetURL: e }) {
  let s = !!(t3?.public?.root || t3?.static?.root), n = e(t3);
  return !s && ct && (n = ct), ue(pe(n));
}
async function ft(t3, { baseEnhancers: e = [] } = {}) {
  let { autoDefineBaseURL: s = "/auto-define/", autoDefinePreload: n = [], autoDefineMapper: r = null, enhancers: o = [], autoDefineOverrides: i = null, autoDefinePreferModule: a = true } = t3, c = (() => {
    let l = /* @__PURE__ */ new Map();
    return (e || []).forEach((u) => l.set(u.selector, u)), (o || []).forEach((u) => l.set(u.selector, u)), Array.from(l.values());
  })(), d = null;
  if (typeof window < "u" && typeof document < "u") {
    let l = null;
    try {
      let g = await Promise.resolve().then(() => (at(), it));
      l = g?.AutoDefiner || g?.default?.AutoDefiner || g?.default || null;
    } catch (g) {
      console.warn("AutoDefiner not available:", g?.message || g);
    }
    let u = (g) => {
      switch (g) {
        case "pds-tabpanel":
          return "pds-tabstrip.js";
        default:
          return `${g}.js`;
      }
    }, { mapper: f, ...m } = i && typeof i == "object" ? i : {}, x = { baseURL: s && ue(pe(s, { preferModule: a })), predefine: n, scanExisting: true, observeShadows: true, patchAttachShadow: true, debounceMs: 16, enhancers: c, onError: (g, _) => {
      if (typeof g == "string" && g.startsWith("pds-")) {
        let A = ["pds-form", "pds-drawer"].includes(g), D = _?.message?.includes("#pds/lit") || _?.message?.includes("Failed to resolve module specifier");
        A && D ? console.error(`\u274C PDS component <${g}> requires Lit but #pds/lit is not in import map.
Add this to your HTML <head>:
<script type="importmap">
  { "imports": { "#pds/lit": "./path/to/lit.js" } }
<\/script>
See: https://github.com/pure-ds/core#lit-components`) : console.warn(`\u26A0\uFE0F PDS component <${g}> not found. Assets may not be installed.`);
      } else
        console.error(`\u274C Auto-define error for <${g}>:`, _);
    }, ...m, mapper: (g) => {
      if (customElements.get(g))
        return null;
      if (typeof r == "function")
        try {
          let _ = r(g);
          return _ === void 0 ? u(g) : _;
        } catch (_) {
          return console.warn("Custom autoDefine.mapper error; falling back to default:", _?.message || _), u(g);
        }
      return u(g);
    } };
    l && (d = new l(x), n.length > 0 && typeof l.define == "function" && await l.define(...n, { baseURL: s, mapper: x.mapper, onError: x.onError }));
  }
  return { autoDefiner: d, mergedEnhancers: c };
}
var Te = class extends EventTarget {
};
var b = new Te();
b.initializing = false;
b.currentPreset = null;
b.debug = false;
var mt = (t3 = "") => String(t3).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
var Me = function(t3 = "log", e, ...s) {
  let n = !!(b.registry && !b.registry.isLive), r = (this?.debug || this?.design?.debug || b.debug || false) === true;
  if (n) {
    if (!b.debug)
      return;
  } else if (!r && t3 !== "error" && t3 !== "warn")
    return;
  let o = console[t3] || console.log;
  s.length > 0 ? o(e, ...s) : o(e);
};
async function Jt(t3, e = {}) {
  if (e?.runtimeConfig === false || typeof fetch != "function")
    return null;
  let s = e?.runtimeConfigURL || `${t3}pds-runtime-config.json`;
  try {
    let n = await fetch(s, { cache: "no-store" });
    return n.ok ? await n.json() : null;
  } catch {
    return null;
  }
}
b.registry = F;
b.adoptLayers = Ne;
b.adoptPrimitives = Oe;
b.createStylesheet = je;
b.isLiveMode = () => F.isLive;
b.ask = nt;
b.toast = C;
function yt(t3) {
  let e = typeof CustomEvent == "function";
  try {
    let s = e ? new CustomEvent("pds:ready", { detail: t3 }) : new Event("pds:ready");
    b.dispatchEvent(s);
  } catch {
  }
  if (typeof document < "u")
    if (e) {
      let s = { detail: t3, bubbles: true, composed: true };
      try {
        document.dispatchEvent(new CustomEvent("pds:ready", s));
      } catch {
      }
      try {
        document.dispatchEvent(new CustomEvent("pds-ready", s));
      } catch {
      }
    } else {
      try {
        document.dispatchEvent(new Event("pds:ready"));
      } catch {
      }
      try {
        document.dispatchEvent(new Event("pds-ready"));
      } catch {
      }
    }
}
typeof window < "u" && (window.PDS = b);
var Ue = "pure-ds-theme";
var q = null;
var re = null;
function he(t3) {
  try {
    if (typeof document > "u")
      return;
    let e = "light";
    t3 ? t3 === "system" ? e = typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : e = t3 : e = typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", document.documentElement.setAttribute("data-theme", e);
  } catch {
  }
}
function fe(t3) {
  try {
    if (q && re) {
      try {
        typeof q.removeEventListener == "function" ? q.removeEventListener("change", re) : typeof q.removeListener == "function" && q.removeListener(re);
      } catch {
      }
      q = null, re = null;
    }
    if (t3 === "system" && typeof window < "u" && window.matchMedia) {
      let e = window.matchMedia("(prefers-color-scheme: dark)"), s = (n) => {
        let r = n?.matches === void 0 ? e.matches : n.matches;
        try {
          let o = r ? "dark" : "light";
          document.documentElement.setAttribute("data-theme", o), b.dispatchEvent(new CustomEvent("pds:theme:changed", { detail: { theme: o, source: "system" } }));
        } catch {
        }
      };
      q = e, re = s, typeof e.addEventListener == "function" ? e.addEventListener("change", s) : typeof e.addListener == "function" && e.addListener(s);
    }
  } catch {
  }
}
Object.defineProperty(b, "theme", { get() {
  try {
    return typeof window > "u" ? null : localStorage.getItem(Ue) || null;
  } catch {
    return null;
  }
}, set(t3) {
  try {
    if (typeof window > "u")
      return;
    t3 == null ? localStorage.removeItem(Ue) : localStorage.setItem(Ue, t3), he(t3), fe(t3), b.dispatchEvent(new CustomEvent("pds:theme:changed", { detail: { theme: t3, source: "api" } }));
  } catch {
  }
} });
b.defaultEnhancers = xe;
async function Qt(t3) {
  let e = t3 && t3.mode || "live", { mode: s, ...n } = t3 || {};
  if (e === "static")
    return Xt(n);
  let r = De(n, { resolvePublicAssetURL: Re }), o = n?.managerURL || n?.public?.managerURL || n?.manager?.url || new URL("core/pds-manager.js", r).href || new URL("./pds-manager.js", import.meta.url).href, { startLive: i } = await import(o);
  return i(b, n, { emitReady: yt, applyResolvedTheme: he, setupSystemListenerIfNeeded: fe });
}
b.start = Qt;
async function Xt(t3) {
  if (!t3 || typeof t3 != "object")
    throw new Error("PDS.start({ mode: 'static', ... }) requires a valid configuration object");
  let e = t3.applyGlobalStyles ?? true, s = t3.manageTheme ?? true, n = t3.themeStorageKey ?? "pure-ds-theme", r = t3.staticPaths ?? {}, o = De(t3, { resolvePublicAssetURL: Re }), i = t3 && t3.autoDefine || null, a;
  i && i.baseURL ? a = ue(pe(i.baseURL, { preferModule: false })) : a = `${o}components/`;
  let c = i && Array.isArray(i.predefine) && i.predefine || [], d = i && typeof i.mapper == "function" && i.mapper || null;
  try {
    dt(b);
    let { resolvedTheme: l } = ht({ manageTheme: s, themeStorageKey: n, applyResolvedTheme: he, setupSystemListenerIfNeeded: fe }), u = await Jt(o, t3), f = u?.config?.design || u?.design || null, m = u?.config?.preset || u?.preset || "default", $ = u?.presetId || mt(m) || "default", x = f ? { [String($).toLowerCase()]: f, ...String($).toLowerCase() !== "default" ? { default: f } : {} } : null, g = t3?.design && typeof t3.design == "object" ? G(t3.design) : null, _ = mt(t3?.preset || "default") || "default", H = g ? { [String(_).toLowerCase()]: g, ...String(_).toLowerCase() !== "default" ? { default: g } : {} } : null, A = x || t3?.presets || H || {};
    if (!Object.keys(A || {}).length)
      throw new Error("PDS static mode requires preset data. Run pds:build or provide config.presets/config.design.");
    let D = u?.config ? { ...u.config, ...t3, preset: t3?.preset || $, design: g || f || u?.config?.design } : t3, L = pt(D, {}, { presets: A, defaultLog: Me }), Z = L.enhancers, I = { tokens: `${o}styles/pds-tokens.css.js`, primitives: `${o}styles/pds-primitives.css.js`, components: `${o}styles/pds-components.css.js`, utilities: `${o}styles/pds-utilities.css.js`, styles: `${o}styles/pds-styles.css.js` }, oe = u?.paths || {};
    if (r = { ...I, ...oe, ...r }, b.registry.setStaticMode(r), e && typeof document < "u")
      try {
        let S = await b.registry.getStylesheet("styles");
        if (S) {
          S._pds = true;
          let R = (document.adoptedStyleSheets || []).filter((p) => p._pds !== true);
          document.adoptedStyleSheets = [...R, S];
        }
      } catch (S) {
        Me.call(b, "warn", "Failed to apply static styles:", S);
      }
    let E = null, M = [];
    try {
      let S = await ft({ autoDefineBaseURL: a, autoDefinePreload: c, autoDefineMapper: d, enhancers: Z, autoDefineOverrides: i || null, autoDefinePreferModule: !(i && i.baseURL) }, { baseEnhancers: xe });
      E = S.autoDefiner, M = S.mergedEnhancers || [];
    } catch (S) {
      Me.call(b, "error", "\u274C Failed to initialize AutoDefiner/Enhancers (static):", S);
    }
    let z = G(t3);
    return b.currentConfig = Object.freeze({ mode: "static", ...structuredClone(z), design: structuredClone(L.generatorConfig.design), preset: L.generatorConfig.preset, theme: l, enhancers: M }), yt({ mode: "static", config: L.generatorConfig, theme: l, autoDefiner: E }), { config: L.generatorConfig, theme: l, autoDefiner: E };
  } catch (l) {
    throw b.dispatchEvent(new CustomEvent("pds:error", { detail: { error: l } })), l;
  }
}

// pds.config.js
var defaultEnhancers = Array.isArray(globalThis.PDS?.defaultEnhancers) ? globalThis.PDS.defaultEnhancers : [];
var config = {
  mode: "static",
  preset: "social-feed",
  autoDefine: {
    predefine: ["pds-icon", "pds-drawer", "pds-toaster"],
    // Custom component paths
    mapper: (tag) => {
      if (tag.startsWith("my-"))
        return `/assets/my/${tag}.js`;
    },
    enhancers: [
      ...defaultEnhancers,
      {
        selector: ".hero",
        description: "Make PDS border-gradient rotate slowly",
        run: (element) => {
          let angle = 135;
          const speed = 0.5;
          function animate() {
            angle = (angle + speed) % 360;
            element.style.setProperty("--gradient-angle", `${angle}deg`);
            requestAnimationFrame(animate);
          }
          animate();
        }
      }
    ]
  }
  // Uncomment to override preset design tokens:
  // design: {
  //   colors: {
  //     primary: '#007acc',
  //     secondary: '#5c2d91',
  //     accent: '#ec4899'
  //   },
  //   typography: {
  //     fontFamilyHeadings: 'Inter, sans-serif',
  //     fontFamilyBody: 'Inter, sans-serif',
  //     baseFontSize: 16,
  //     fontScale: 1.25
  //   },
  //   spatialRhythm: {
  //     baseUnit: 8,
  //     scaleRatio: 1.5
  //   }
  // }
};

// src/js/app.js
await b.start(config);
var main = document.querySelector("main");
if (main && !main.querySelector("my-home")) {
  main.innerHTML = "<my-home></my-home>";
}
var parseHTML = (html) => {
  return new DOMParser().parseFromString(html, "text/html").body.childNodes;
};
var settingsBtn = parseHTML(
  /*html*/
  `<button id="settings-btn" class="icon-only btn-xs btn-outline" aria-label="Settings">
    <pds-icon icon="gear"></pds-icon>
  </button>`
)[0];
document.body.appendChild(settingsBtn);
var drawer = document.createElement("pds-drawer");
drawer.setAttribute("position", "right");
drawer.innerHTML = /*html*/
`<div slot="drawer-header">Settings</div>
  <div slot="drawer-content"><pds-theme></pds-theme></div>`;
document.body.appendChild(drawer);
settingsBtn.addEventListener("click", () => {
  drawer.open = true;
});
var THEME_LABELS = /* @__PURE__ */ new Map([
  ["system", "System"],
  ["light", "Light"],
  ["dark", "Dark"]
]);
b.addEventListener("pds:theme:changed", (event) => {
  const { detail } = event ?? {};
  if (detail?.source !== "api")
    return;
  const theme = detail?.theme;
  if (!theme || typeof b.toast !== "function")
    return;
  const label = THEME_LABELS.get(theme) ?? theme.charAt(0).toUpperCase() + theme.slice(1);
  void b.toast(`Theme changed to ${label}`, {
    type: "information",
    duration: 2e3
  });
});
/*! Bundled license information:

@pure-ds/core/public/assets/js/pds.js:
  (*! Bundled license information:
  
  @lit/reactive-element/css-tag.js:
    (**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/reactive-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  lit-html/lit-html.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  lit-element/lit-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  lit-html/is-server.js:
    (**
     * @license
     * Copyright 2022 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  *)
*/
//# sourceMappingURL=/assets/js/app.js.map
