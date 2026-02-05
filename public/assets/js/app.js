// node_modules/.pnpm/@pure-ds+core@0.5.58/node_modules/@pure-ds/core/public/assets/js/pds.js
var _e = Object.defineProperty;
var Ue = (e2, t) => () => (e2 && (t = e2(e2 = 0)), t);
var ue = (e2, t) => {
  for (var n in t)
    _e(e2, n, { get: t[n], enumerable: true });
};
var Ae = {};
ue(Ae, { AutoDefiner: () => se });
async function Ye(...e2) {
  let t = {};
  e2.length && typeof e2[e2.length - 1] == "object" && (t = e2.pop() || {});
  let n = e2, { baseURL: r, mapper: o = (d) => `${d}.js`, onError: s = (d, l) => console.error(`[defineWebComponents] ${d}:`, l) } = t, i = r ? new URL(r, typeof location < "u" ? location.href : import.meta.url) : new URL("./", import.meta.url), u = (d) => d.toLowerCase().replace(/(^|-)([a-z])/g, (l, a, m) => m.toUpperCase()), c = async (d) => {
    try {
      if (customElements.get(d))
        return { tag: d, status: "already-defined" };
      let l = o(d), m = await (l instanceof URL ? import(l.href) : import(new URL(l, i).href)), h = m?.default ?? m?.[u(d)];
      if (!h) {
        if (customElements.get(d))
          return { tag: d, status: "self-defined" };
        throw new Error(`No export found for ${d}. Expected default export or named export "${u(d)}".`);
      }
      return customElements.get(d) ? { tag: d, status: "race-already-defined" } : (customElements.define(d, h), { tag: d, status: "defined" });
    } catch (l) {
      throw s(d, l), l;
    }
  };
  return Promise.all(n.map(c));
}
var se;
var Ce = Ue(() => {
  se = class {
    constructor(t = {}) {
      let { baseURL: n, mapper: r, onError: o, predicate: s = () => true, attributeModule: i = "data-module", root: u = document, scanExisting: c = true, debounceMs: d = 16, observeShadows: l = true, enhancers: a = [], patchAttachShadow: m = true } = t, h = /* @__PURE__ */ new Set(), w = /* @__PURE__ */ new Set(), v = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), E = 0, k = false, C = null, q = (p) => {
        if (!p || !a.length)
          return;
        let y = M.get(p);
        y || (y = /* @__PURE__ */ new Set(), M.set(p, y));
        for (let f of a)
          if (!(!f.selector || !f.run) && !y.has(f.selector))
            try {
              p.matches && p.matches(f.selector) && (f.run(p), y.add(f.selector));
            } catch (A) {
              console.warn(`[AutoDefiner] Error applying enhancer for selector "${f.selector}":`, A);
            }
      }, I = (p, y) => {
        if (!k && !(!p || !p.includes("-")) && !customElements.get(p) && !w.has(p) && !v.has(p)) {
          if (y && y.getAttribute) {
            let f = y.getAttribute(i);
            f && !g.has(p) && g.set(p, f);
          }
          h.add(p), F();
        }
      }, F = () => {
        E || (E = setTimeout(O, d));
      }, L = (p) => {
        if (p) {
          if (p.nodeType === 1) {
            let y = p, f = y.tagName?.toLowerCase();
            f && f.includes("-") && !customElements.get(f) && s(f, y) && I(f, y), q(y), l && y.shadowRoot && R(y.shadowRoot);
          }
          p.querySelectorAll && p.querySelectorAll("*").forEach((y) => {
            let f = y.tagName?.toLowerCase();
            f && f.includes("-") && !customElements.get(f) && s(f, y) && I(f, y), q(y), l && y.shadowRoot && R(y.shadowRoot);
          });
        }
      }, R = (p) => {
        if (!p || x.has(p))
          return;
        L(p);
        let y = new MutationObserver((f) => {
          for (let A of f)
            A.addedNodes?.forEach((_) => {
              L(_);
            }), A.type === "attributes" && A.target && L(A.target);
        });
        y.observe(p, { childList: true, subtree: true, attributes: true, attributeFilter: [i, ...a.map((f) => f.selector).filter((f) => f.startsWith("data-"))] }), x.set(p, y);
      };
      async function O() {
        if (clearTimeout(E), E = 0, !h.size)
          return;
        let p = Array.from(h);
        h.clear(), p.forEach((y) => w.add(y));
        try {
          let y = (f) => g.get(f) ?? (r ? r(f) : `${f}.js`);
          await Ye(...p, { baseURL: n, mapper: y, onError: (f, A) => {
            v.add(f), o?.(f, A);
          } });
        } catch {
        } finally {
          p.forEach((y) => w.delete(y));
        }
      }
      let S = u === document ? document.documentElement : u, P = new MutationObserver((p) => {
        for (let y of p)
          y.addedNodes?.forEach((f) => {
            L(f);
          }), y.type === "attributes" && y.target && L(y.target);
      });
      if (P.observe(S, { childList: true, subtree: true, attributes: true, attributeFilter: [i, ...a.map((p) => p.selector).filter((p) => p.startsWith("data-"))] }), l && m && Element.prototype.attachShadow) {
        let p = Element.prototype.attachShadow;
        Element.prototype.attachShadow = function(f) {
          let A = p.call(this, f);
          if (f && f.mode === "open") {
            R(A);
            let _ = this.tagName?.toLowerCase();
            _ && _.includes("-") && !customElements.get(_) && I(_, this);
          }
          return A;
        }, C = () => Element.prototype.attachShadow = p;
      }
      return c && L(S), { stop() {
        k = true, P.disconnect(), C && C(), E && (clearTimeout(E), E = 0), x.forEach((p) => p.disconnect());
      }, flush: O };
    }
    static async define(...t) {
      let n = {};
      t.length && typeof t[t.length - 1] == "object" && (n = t.pop() || {});
      let r = t, { baseURL: o, mapper: s = (l) => `${l}.js`, onError: i = (l, a) => console.error(`[defineWebComponents] ${l}:`, a) } = n, u = o ? new URL(o, typeof location < "u" ? location.href : import.meta.url) : new URL("./", import.meta.url), c = (l) => l.toLowerCase().replace(/(^|-)([a-z])/g, (a, m, h) => h.toUpperCase()), d = async (l) => {
        try {
          if (customElements.get(l))
            return { tag: l, status: "already-defined" };
          let a = s(l), h = await (a instanceof URL ? import(a.href) : import(new URL(a, u).href)), w = h?.default ?? h?.[c(l)];
          if (!w) {
            if (customElements.get(l))
              return { tag: l, status: "self-defined" };
            throw new Error(`No export found for ${l}. Expected default export or named export "${c(l)}".`);
          }
          return customElements.get(l) ? { tag: l, status: "race-already-defined" } : (customElements.define(l, w), { tag: l, status: "defined" });
        } catch (a) {
          throw i(l, a), a;
        }
      };
      return Promise.all(r.map(d));
    }
  };
});
function pe(e2) {
  return new DOMParser().parseFromString(e2, "text/html").body.childNodes;
}
function he(e2, t = 100) {
  let n;
  return function(...o) {
    let s = () => {
      clearTimeout(n), e2(...o);
    };
    clearTimeout(n), n = setTimeout(s, t);
  };
}
function W(e2) {
  setTimeout(e2, 0);
}
function fe(e2) {
  try {
    if (typeof e2 != "string" || e2.indexOf(`
`) !== -1 || e2.indexOf(" ") !== -1 || e2.startsWith("#/"))
      return false;
    let t = new URL(e2, window.location.origin);
    return t.protocol === "http:" || t.protocol === "https:";
  } catch {
    return false;
  }
}
function me(e2, t, n) {
  let r = window.screen.width / 2 - t / 2, o = window.screen.height / 2 - n / 2;
  return window.open(e2, "", `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=${t}, height=${n}, top=${o}, left=${r}`);
}
var Z = { result: "ac-suggestion", item: "ac-itm" };
var z = class e extends EventTarget {
  constructor(t, n, r) {
    super(), this.settings = { emptyResultsText: "", ...r }, this.container = t, this.input = n, this.input.setAttribute("autocomplete", "off"), this.categories = r.categories || {}, this.caches = /* @__PURE__ */ new Map(), W(this.attach.bind(this));
  }
  static connect(t, n) {
    let r = t.target;
    if (!r._autoComplete) {
      if (!n?.categories)
        throw Error("Missing autocomplete settings");
      r._autoComplete = new e(r.parentNode, r, n), t.type === "focus" && setTimeout(() => {
        r._autoComplete.focusHandler(t);
      }, 100);
    }
    return r._autoComplete;
  }
  on(t, n) {
    return this.input.addEventListener(t, n), this;
  }
  attach() {
    this.resultsDiv = document.createElement("div"), this.resultsDiv.title = "", this.resultsDiv.classList.add(Z.result), this.container.offsetWidth > 100 && (this.resultsDiv.style.width = this.container.offsetWidth), this.resultsDiv.addEventListener("mousedown", this.resultClick.bind(this)), this.container.classList.add("ac-container"), this.input.classList.add("ac-input");
    let t = getComputedStyle(this.input);
    this.container.style.setProperty("--ac-bg-default", t.backgroundColor), this.container.style.setProperty("--ac-color-default", t.color);
    let n = getComputedStyle(this.input).accentColor;
    n !== "auto" && this.container.style.setProperty("--ac-accent-color", n), (this.container?.shadowRoot ?? this.container).appendChild(this.resultsDiv), this.controller().clear("attach"), this.on("input", he(this.inputHandler.bind(this), this.settings.throttleInputMs ?? 300)).on("focus", this.focusHandler.bind(this)).on("focusout", this.blurHandler.bind(this)).on("keyup", this.keyUpHandler.bind(this)).on("keydown", this.keyDownHandler.bind(this));
  }
  controller() {
    let t = this.internalController();
    return typeof this.settings.controller == "function" && (t = this.settings.controller(this) ?? t), t;
  }
  internalController() {
    return { show: this.show.bind(this), hide: this.hide.bind(this), clear: this.clear.bind(this), empty: () => {
    } };
  }
  moveResult(t) {
    this.controller().show();
    let n = this.acItems.length;
    this.rowIndex = this.rowIndex + t, this.rowIndex <= 0 ? this.rowIndex = 0 : this.rowIndex > n - 1 && (this.rowIndex = 0);
    for (let o of this.acItems)
      o.classList.remove("selected");
    let r = this.getSelectedDiv();
    r ? (r.classList.add("selected"), r.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })) : this.focusHandler({ target: this.input });
  }
  getSelectedDiv() {
    return this.resultsDiv.querySelector(`div:nth-child(${this.rowIndex + 1})`);
  }
  selectResult(t) {
    if (t = t || this.getSelectedDiv(), t) {
      let n = parseInt(t.getAttribute("data-index"));
      this.resultClicked = true;
      let r = this.results[n], o = this.categories[r.category] ?? {};
      o.action = o.action ?? this.setText.bind(this), o.newTab && (this.tabWindow = me("about:blank"));
      let s = { ...r, search: this.input.value };
      t.classList.add("ac-active"), setTimeout(() => {
        this.controller().hide("result-selected"), s.action ? s.action(s) : (o.action(s), o.newTab && (s.url ? this.tabWindow.location.href = s.url : this.tabWindow.close()));
        var i = new Event("change", { bubbles: true });
        this.input.dispatchEvent(i), this.controller().clear("result-selected");
        let u = new Event("result-selected");
        u.detail = s, this.input.dispatchEvent(u);
      }, 0);
    }
  }
  setText(t) {
    this.container.autoCompleteInput || (this.container.value = t.text), this.controller().hide("settext");
  }
  resultClick(t) {
    this.selectResult(t.target.closest(`.${Z.item}`));
  }
  blurHandler() {
    setTimeout(() => {
      this.resultClicked || this.controller().clear("blurred"), this.resultClicked = false;
    }, 100);
  }
  clear() {
    this.settings.debug || this.resultsDiv && (this.resultsDiv.innerHTML = "", this.controller().hide("clear"), this.cacheTmr && clearTimeout(this.cacheTmr), this.cacheTmr = setTimeout(() => {
      this.caches.clear();
    }, 60 * 1e3 * 5));
  }
  show() {
    if (!this.resultsDiv.classList.contains("ac-active")) {
      let t = this.getViewBounds();
      this.resultsDiv.style.position = "absolute", t.rect.width > 100 && (this.resultsDiv.style.width = `${t.rect.width}px`), this.settings.direction = this.settings.direction ?? t.suggestedDirection, this.resultsDiv.setAttribute("data-direction", this.settings.direction), this.settings.direction === "up" ? (this.resultsDiv.style.top = "unset", this.resultsDiv.style.bottom = `${t.rect.height + 20}px`, this.rowIndex = this.acItems.length) : (this.resultsDiv.style.bottom = "unset", this.resultsDiv.style.top = `${t.rect.height}px`, this.rowIndex = -1), this.resultsDiv.style.maxWidth = "unset", this.resultsDiv.classList.toggle("ac-active", true);
    }
  }
  getViewBounds() {
    let t = this.input.getBoundingClientRect();
    return { rect: t, suggestedDirection: t.top + t.height + 500 > window.innerHeight ? "up" : "down" };
  }
  hide() {
    this.resultsDiv.classList.toggle("ac-active", false);
  }
  empty() {
    this.resultsDiv.innerHTML = `<div class="ac-empty">${this.settings.emptyResultsText}</div>`, this.controller().show();
  }
  inputHandler(t) {
    this.cacheTmr && clearTimeout(this.cacheTmr);
    let n = { search: t.target.value, categories: this.categories };
    this.container.classList.add("search-running"), this.getItems(n, t).then((r) => {
      this.controller().clear("new-results"), this.resultsHandler(r, n), this.container.classList.remove("search-running");
    });
  }
  keyDownHandler(t) {
    switch (t.key) {
      case "Enter":
        t.stopPropagation(), t.preventDefault();
        break;
      case "ArrowDown":
        W(this.moveResult(1));
        break;
      case "ArrowUp":
        W(this.moveResult(-1));
        break;
    }
  }
  keyUpHandler(t) {
    switch (t.key) {
      case "Escape":
        this.controller().hide("escape");
        break;
      case "Enter":
        this.getSelectedDiv() && (this.container.preventEnter = true, t.stopPropagation(), t.preventDefault(), this.selectResult(), setTimeout(() => {
          this.container.preventEnter = false;
        }, 10));
        break;
      default:
        break;
    }
  }
  focusHandler(t) {
    this.controller().clear("focus");
    let n = t.target.value;
    this.suggest(n, t);
  }
  suggest(t, n) {
    this.input.focus();
    let r = { suggest: true, search: t || "", categories: this.categories };
    this.getItems(r, n).then((o) => {
      this.input.dispatchEvent(new CustomEvent("show-results", { detail: { results: o } })), this.resultsHandler(o, r);
    });
  }
  sort(t, n) {
    return t.sort((r, o) => {
      let s = n.categories[r.category], i = n.categories[o.category], u = typeof s.sortIndex == "function" ? s.sortIndex(n) : s.sortIndex ?? 0;
      return (typeof i.sortIndex == "function" ? i.sortIndex(n) : i.sortIndex ?? 0) > u ? 1 : -1;
    });
  }
  resultsHandler(t, n) {
    this.results = t, this.rowIndex = -1;
    let r = 0, o = (s, i) => `
      <div title="${i.tooltip || ""}" data-index="${r}" class="${`${Z.item} cat-${i.category} ${i.class ?? ""}`.trim()}">
        ${this.handleImageOrIcon(i)}
        <span class="text">${this.formatResultItem(i, n, s)}</span>
        ${this.settings.hideCategory ? "" : `<span class="category">${i.category || ""}</span>`}
      </div>`;
    t.forEach((s) => {
      let i = n.categories[s.category] || {};
      s.element ? this.resultsDiv.appendChild(s.element) : (s = typeof s == "string" ? { text: s } : s, this.resultsDiv.appendChild(pe(o(i, s))[0])), r++;
    }), t.length ? (this.acItems = this.resultsDiv.querySelectorAll(".ac-itm"), this.controller().show()) : n.search.length && this.controller().empty();
  }
  handleImageOrIcon(t) {
    return t.image ? `<img src="${t.image}"/>` : typeof this.settings.iconHandler == "function" ? this.settings.iconHandler(t) : `<svg-icon icon="${t.icon}"></svg-icon>`;
  }
  formatResultItem(t, n, r) {
    let o = typeof t == "string" ? { text: t } : t, s = o.text;
    return n.search && (s = s.replace("%search%", n.search), o.description = o.description?.replace("%search%", n.search)), s = this.highlight(s, n.search), o.description && (s = `<div>${s}</div><small>${o.description}</small>`), r.format && (s = r.format({ item: o, result: s, options: n })), s;
  }
  highlight(t, n) {
    var r = new RegExp("(" + n + ")", "gi");
    return t.replace(r, '<span class="txt-hl">$1</span>');
  }
  async getItems(t, n) {
    this.aborter && this.aborter.abort();
    let r = this.caches.get(t.search);
    if (r)
      return r;
    let o = this.settings.map, s = (c) => (typeof c == "string" && (c = { text: c }), c), i = (c) => o ? c.map((d) => ({ text: d[o] })) : c.map((d) => s(d)), u = (c) => (this.settings.max && this.settings.max > 0 && (c.length = this.settings.max), c);
    return this.aborter = new AbortController(), this.aborterSignal = this.aborter.signal, new Promise((c) => {
      let d = (l) => {
        l = this.sort(l, t), this.settings.cache !== false && this.caches.set(t.search, l), c(l);
      };
      if (fe(this.items)) {
        if (this.settings.minlength > 0 && (!t.search || t.search.length < this.settings.minlength)) {
          d([]);
          return;
        }
        let l = this.formatSearch(this.items, t);
        fetch(l).then((a) => {
          if (a.status === 200) {
            a.json().then((m) => {
              m = i(m), d(u(m.filter((h) => this.isMatch(t, h))));
            });
            return;
          }
          throw Error(`HTTP error ${a.status} - ${l}`);
        });
      } else if (Array.isArray(this.items)) {
        let l = true;
        this.items = this.items.map((a) => typeof a == "string" ? { text: a } : (l = false, a)), l && this.container.classList.add("simple"), d(u(i(this.items)));
      } else if (typeof this.items == "function")
        t.control = this.container, Promise.resolve(this.items(t, n)).then((a) => {
          a = a.map((m) => s(m)), a = i(a), d(a);
        });
      else
        return d(Promise.resolve(this.items.apply(this, t)));
    });
  }
  async items(t) {
    let n = [];
    t.results = [], t.signal = this.aborterSignal;
    for (var r in t.categories) {
      let o = t.categories[r];
      if (o.trigger = o.trigger ?? (() => true), t.results = n, o.trigger(t)) {
        let s = [];
        try {
          s = await o.getItems(t);
        } catch (i) {
          console.warn(`Error loading items for omniBox category '${r}'.`, i);
        }
        n = n.concat(s.map((i) => (i.category = r, i)));
      }
    }
    return n;
  }
  formatSearch(t, n) {
    return t.indexOf("%search%") ? t.replace("%search%", n.search || "") : t + "?" + this.createQueryParam(n);
  }
  createQueryParam(t) {
    let n = t.suggest ? "&suggest=true" : "";
    return `q=${t.text}${n}`;
  }
  isMatch(t, n) {
    return n.text?.indexOf("%search%") >= 0 ? true : t.search ? n.text?.toLowerCase().indexOf(t.search.toLowerCase()) >= 0 : t.suggest;
  }
  static textFilter(t, n) {
    return function(r) {
      if (!t.search)
        return true;
      if (r.hidden)
        return false;
      let s = (n ? r[n] : r).match(new RegExp(t.search, "gi"));
      if (s)
        return s;
      if (r.config?.tags)
        return r.config.tags.some((i) => i.match(new RegExp(t.search, "gi")));
    };
  }
};
var J = class {
  constructor() {
    this._mode = "static", this._staticPaths = { tokens: "/assets/pds/styles/pds-tokens.css.js", primitives: "/assets/pds/styles/pds-primitives.css.js", components: "/assets/pds/styles/pds-components.css.js", utilities: "/assets/pds/styles/pds-utilities.css.js", styles: "/assets/pds/styles/pds-styles.css.js" };
  }
  setLiveMode() {
    this._mode = "live";
  }
  setStaticMode(t = {}) {
    this._mode = "static", this._staticPaths = { ...this._staticPaths, ...t };
  }
  async getStylesheet(t) {
    if (this._mode === "live")
      return null;
    try {
      return (await import(this._staticPaths[t]))[t];
    } catch (n) {
      console.error(`[PDS Registry] Failed to load static ${t}:`, n), console.error(`[PDS Registry] Looking for: ${this._staticPaths[t]}`), console.error("[PDS Registry] Make sure you've run 'npm run pds:build' and configured PDS.start() with the correct static.root path");
      let r = new CSSStyleSheet();
      return r.replaceSync("/* Failed to load " + t + " */"), r;
    }
  }
  get mode() {
    return this._mode;
  }
  get isLive() {
    return this._mode === "live";
  }
};
var U = new J();
async function ye(e2, t = [], n = null) {
  try {
    let r = n?.primitivesStylesheet ? n.primitivesStylesheet : await U.getStylesheet("primitives");
    e2.adoptedStyleSheets = [r, ...t];
  } catch (r) {
    let o = e2.host?.tagName?.toLowerCase() || "unknown";
    console.error(`[PDS Adopter] <${o}> failed to adopt primitives:`, r), e2.adoptedStyleSheets = t;
  }
}
async function ge(e2, t = ["primitives"], n = [], r = null) {
  try {
    let s = (await Promise.all(t.map(async (i) => {
      if (r)
        switch (i) {
          case "tokens":
            return r.tokensStylesheet;
          case "primitives":
            return r.primitivesStylesheet;
          case "components":
            return r.componentsStylesheet;
          case "utilities":
            return r.utilitiesStylesheet;
          default:
            break;
        }
      return U.getStylesheet(i);
    }))).filter((i) => i !== null);
    e2.adoptedStyleSheets = [...s, ...n];
  } catch (o) {
    let s = e2.host?.tagName?.toLowerCase() || "unknown";
    console.error(`[PDS Adopter] <${s}> failed to adopt layers:`, o), e2.adoptedStyleSheets = n;
  }
}
function be(e2) {
  let t = new CSSStyleSheet();
  return t.replaceSync(e2), t;
}
var we = { FontWeights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 }, LineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 }, BorderWidths: { hairline: 0.5, thin: 1, medium: 2, thick: 3 }, RadiusSizes: { none: 0, small: 4, medium: 8, large: 16, xlarge: 24, xxlarge: 32 }, ShadowDepths: { none: "none", light: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", medium: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", deep: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", extreme: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }, TransitionSpeeds: { fast: 150, normal: 250, slow: 350 }, AnimationEasings: { linear: "linear", ease: "ease", "ease-in": "ease-in", "ease-out": "ease-out", "ease-in-out": "ease-in-out", bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)" }, TouchTargetSizes: { compact: 36, standard: 44, comfortable: 48, spacious: 56 }, LinkStyles: { inline: "inline", block: "block", button: "button" }, FocusStyles: { ring: "ring", outline: "outline", border: "border", glow: "glow" }, TabSizes: { compact: 2, standard: 4, wide: 8 }, SelectIcons: { chevron: "chevron", arrow: "arrow", caret: "caret", none: "none" }, IconSizes: { xs: 16, sm: 20, md: 24, lg: 32, xl: 48, "2xl": 64, "3xl": 96 } };
var ve = { mode: "live", preset: "default", autoDefine: { predefine: ["pds-icon", "pds-drawer", "pds-toaster"] }, log(e2, t, ...n) {
  console[e2](t, ...n);
} };
var ee = {};
ue(ee, { deepMerge: () => xe, fragmentFromTemplateLike: () => X, isObject: () => B, parseHTML: () => Y });
function B(e2) {
  return e2 && typeof e2 == "object" && !Array.isArray(e2);
}
function xe(e2, t) {
  let n = { ...e2 };
  return B(e2) && B(t) && Object.keys(t).forEach((r) => {
    B(t[r]) ? r in e2 ? n[r] = xe(e2[r], t[r]) : Object.assign(n, { [r]: t[r] }) : Object.assign(n, { [r]: t[r] });
  }), n;
}
function X(e2) {
  let t = Array.isArray(e2?.strings) ? e2.strings : [], n = Array.isArray(e2?.values) ? e2.values : [], r = /* @__PURE__ */ new Set(), o = [], s = /(\s)(\.[\w-]+)=\s*$/;
  for (let a = 0; a < t.length; a += 1) {
    let m = t[a] ?? "", h = m.match(s);
    if (h && a < n.length) {
      let v = h[2].slice(1), g = `pds-val-${a}`;
      m = m.replace(s, `$1data-pds-prop="${v}:${g}"`), r.add(a);
    }
    o.push(m), a < n.length && !r.has(a) && o.push(`<!--pds-val-${a}-->`);
  }
  let i = document.createElement("template");
  i.innerHTML = o.join("");
  let u = (a, m) => {
    let h = a.parentNode;
    if (!h)
      return;
    if (m == null) {
      h.removeChild(a);
      return;
    }
    let w = (v) => {
      if (v != null) {
        if (v instanceof Node) {
          h.insertBefore(v, a);
          return;
        }
        if (Array.isArray(v)) {
          v.forEach((g) => w(g));
          return;
        }
        h.insertBefore(document.createTextNode(String(v)), a);
      }
    };
    w(m), h.removeChild(a);
  }, c = document.createTreeWalker(i.content, NodeFilter.SHOW_COMMENT), d = [];
  for (; c.nextNode(); ) {
    let a = c.currentNode;
    a?.nodeValue?.startsWith("pds-val-") && d.push(a);
  }
  return d.forEach((a) => {
    let m = Number(a.nodeValue.replace("pds-val-", ""));
    u(a, n[m]);
  }), i.content.querySelectorAll("*").forEach((a) => {
    let m = a.getAttribute("data-pds-prop");
    if (!m)
      return;
    let [h, w] = m.split(":"), v = Number(String(w).replace("pds-val-", ""));
    h && Number.isInteger(v) && (a[h] = n[v]), a.removeAttribute("data-pds-prop");
  }), i.content;
}
function Y(e2) {
  return new DOMParser().parseFromString(e2, "text/html").body.childNodes;
}
function te(e2, t) {
  if (t == null)
    return;
  if (typeof t == "object" && Array.isArray(t.strings) && Array.isArray(t.values)) {
    e2.appendChild(X(t));
    return;
  }
  if (t instanceof Node) {
    e2.appendChild(t);
    return;
  }
  if (Array.isArray(t)) {
    t.forEach((r) => te(e2, r));
    return;
  }
  let n = typeof t == "string" ? t : String(t);
  e2.appendChild(document.createTextNode(n));
}
async function Se(e2, t = {}) {
  return t = { ...{ title: "Confirm", type: "confirm", buttons: { ok: { name: "OK", primary: true }, cancel: { name: "Cancel", cancel: true } } }, ...t }, new Promise((r) => {
    let o = document.createElement("dialog");
    ve.options?.liquidGlassEffects && o.classList.add("liquid-glass"), t.size && o.classList.add(`dialog-${t.size}`), t.type && o.classList.add(`dialog-${t.type}`), t.class && (Array.isArray(t.class) ? o.classList.add(...t.class) : o.classList.add(t.class)), t.maxHeight && o.style.setProperty("--dialog-max-height", t.maxHeight);
    let s = Object.entries(t.buttons).map(([u, c]) => {
      let d = c.primary ? "btn-primary btn-sm" : "btn-outline btn-sm";
      return `<button type="${c.cancel ? "button" : "submit"}" class="${d}" value="${u}">${c.name}</button>`;
    });
    if (t.useForm) {
      let u = document.createElement("div");
      te(u, e2);
      let c = u.querySelector("form");
      if (c) {
        o.innerHTML = `
          <header>
            <h2>${t.title}</h2>
          </header>
        `;
        let d = document.createElement("article");
        for (d.className = "dialog-body"; c.firstChild; )
          d.appendChild(c.firstChild);
        c.appendChild(d);
        let l = document.createElement("footer");
        l.innerHTML = s.join(""), c.appendChild(l), o.appendChild(c);
      } else
        o.innerHTML = `
          <header>
            <h2>${t.title}</h2>
          </header>
          <article id="msg-container"></article>
          <footer>
            ${s.join("")}
          </footer>
        `, o.querySelector("#msg-container").appendChild(u);
    } else {
      o.innerHTML = `
        <form method="dialog">
          <header>
            <h2>${t.title}</h2>
          </header>
          
          <article id="msg-container"></article>
          
          <footer>
            ${s.join("")}
          </footer>
        </form>
      `;
      let u = o.querySelector("#msg-container");
      te(u, e2);
    }
    o.addEventListener("click", (u) => {
      u.target.closest('button[value="cancel"]') && (o.close(), r(false));
    });
    let i = () => {
      let u = o.querySelector("form");
      u ? u.addEventListener("submit", (c) => {
        c.preventDefault();
        let d;
        t.useForm && c.submitter.value === "ok" ? (console.log("Found form:", u), console.log("Form elements:", u ? Array.from(u.elements) : "no form"), d = new FormData(u), console.log("FormData entries:", Array.from(d.entries()))) : d = c.submitter.value === "ok", o.close(), r(d);
      }) : requestAnimationFrame(i);
    };
    i(), o.addEventListener("close", () => {
      setTimeout(() => o.remove(), 200);
    }), document.body.appendChild(o), typeof t.rendered == "function" && t.rendered(o), o.showModal();
  });
}
async function qe() {
  let e2 = document.querySelector("pds-toaster");
  return e2 || (e2 = document.createElement("pds-toaster"), document.body.appendChild(e2), await customElements.whenDefined("pds-toaster")), e2;
}
async function D(e2, t = {}) {
  return (await qe()).toast(e2, t);
}
D.success = async function(e2, t = {}) {
  return D(e2, { ...t, type: "success" });
};
D.error = async function(e2, t = {}) {
  return D(e2, { ...t, type: "error" });
};
D.warning = async function(e2, t = {}) {
  return D(e2, { ...t, type: "warning" });
};
D.info = async function(e2, t = {}) {
  return D(e2, { ...t, type: "information" });
};
var Oe = [{ selector: ".accordion" }, { selector: "nav[data-dropdown]" }, { selector: "label[data-toggle]" }, { selector: 'input[type="range"]' }, { selector: "form[data-required]" }, { selector: "fieldset[role=group][data-open]" }, { selector: "[data-clip]" }, { selector: "button, a[class*='btn-']" }];
function Ne(e2) {
  e2.dataset.enhancedAccordion || (e2.dataset.enhancedAccordion = "true", e2.addEventListener("toggle", (t) => {
    t.target.open && t.target.parentElement === e2 && e2.querySelectorAll(":scope > details[open]").forEach((n) => {
      n !== t.target && (n.open = false);
    });
  }, true));
}
function je(e2) {
  if (e2.dataset.enhancedDropdown)
    return;
  e2.dataset.enhancedDropdown = "true";
  let t = e2.lastElementChild;
  if (!t)
    return;
  let n = e2.querySelector("[data-dropdown-toggle]") || e2.querySelector("button");
  n && !n.hasAttribute("type") && n.setAttribute("type", "button"), t.id || (t.id = `dropdown-${Math.random().toString(36).slice(2, 9)}`), t.tagName?.toLowerCase() === "menu" && !t.hasAttribute("role") && t.setAttribute("role", "menu"), t.hasAttribute("aria-hidden") || t.setAttribute("aria-hidden", "true"), n && (n.setAttribute("aria-haspopup", "true"), n.setAttribute("aria-controls", t.id), n.setAttribute("aria-expanded", "false"));
  let o = () => {
    let c = (e2.getAttribute("data-mode") || "auto").toLowerCase();
    if (c === "up" || c === "down")
      return c;
    let d = e2.getBoundingClientRect(), l = Math.max(0, window.innerHeight - d.bottom);
    return Math.max(0, d.top) > l ? "up" : "down";
  }, s = () => {
    e2.dataset.dropdownDirection = o(), t.setAttribute("aria-hidden", "false"), n?.setAttribute("aria-expanded", "true");
  }, i = () => {
    t.setAttribute("aria-hidden", "true"), n?.setAttribute("aria-expanded", "false");
  }, u = () => {
    t.getAttribute("aria-hidden") === "false" ? i() : s();
  };
  n?.addEventListener("click", (c) => {
    c.preventDefault(), c.stopPropagation(), u();
  }), document.addEventListener("click", (c) => {
    e2.contains(c.target) || i();
  }), e2.addEventListener("keydown", (c) => {
    c.key === "Escape" && (i(), n?.focus());
  }), e2.addEventListener("focusout", (c) => {
    (!c.relatedTarget || !e2.contains(c.relatedTarget)) && i();
  });
}
function He(e2) {
  if (e2.dataset.enhancedToggle)
    return;
  e2.dataset.enhancedToggle = "true";
  let t = e2.querySelector('input[type="checkbox"]');
  if (!t)
    return;
  e2.hasAttribute("tabindex") || e2.setAttribute("tabindex", "0"), e2.setAttribute("role", "switch"), e2.setAttribute("aria-checked", t.checked ? "true" : "false");
  let n = document.createElement("span");
  n.className = "toggle-switch", n.setAttribute("role", "presentation"), n.setAttribute("aria-hidden", "true");
  let r = document.createElement("span");
  r.className = "toggle-knob", n.appendChild(r), e2.insertBefore(n, t.nextSibling);
  let o = () => {
    e2.setAttribute("aria-checked", t.checked ? "true" : "false");
  }, s = () => {
    t.disabled || (t.checked = !t.checked, o(), t.dispatchEvent(new Event("change", { bubbles: true })));
  };
  e2.addEventListener("click", (i) => {
    i.preventDefault(), s();
  }), e2.addEventListener("keydown", (i) => {
    (i.key === " " || i.key === "Enter") && (i.preventDefault(), s());
  }), t.addEventListener("change", o);
}
function Fe(e2) {
  if (e2.dataset.enhancedRange)
    return;
  let t = e2.closest("label"), n = t?.classList.contains("range-output"), r = e2.id || `range-${Math.random().toString(36).substring(2, 11)}`, o = `${r}-output`;
  if (e2.id = r, n) {
    let s = t.querySelector("span");
    if (s && !s.classList.contains("range-output-wrapper")) {
      let i = document.createElement("span");
      i.className = "range-output-wrapper", i.style.display = "flex", i.style.justifyContent = "space-between", i.style.alignItems = "center";
      let u = document.createElement("span");
      u.textContent = s.textContent, i.appendChild(u);
      let c = document.createElement("output");
      c.id = o, c.setAttribute("for", r), c.style.color = "var(--surface-text-secondary, var(--color-text-secondary))", c.style.fontSize = "0.875rem", c.textContent = e2.value, i.appendChild(c), s.textContent = "", s.appendChild(i);
      let d = () => {
        c.textContent = e2.value;
      };
      e2.addEventListener("input", d);
    }
  } else {
    let s = e2.closest(".range-container");
    s || (s = document.createElement("div"), s.className = "range-container", e2.parentNode?.insertBefore(s, e2), s.appendChild(e2)), s.style.position = "relative";
    let i = document.createElement("output");
    i.id = o, i.setAttribute("for", r), i.className = "range-bubble", i.setAttribute("aria-live", "polite"), s.appendChild(i);
    let u = () => {
      let l = parseFloat(e2.min) || 0, a = parseFloat(e2.max) || 100, m = parseFloat(e2.value), h = (m - l) / (a - l);
      i.style.left = `calc(${h * 100}% )`, i.textContent = String(m);
    }, c = () => i.classList.add("visible"), d = () => i.classList.remove("visible");
    e2.addEventListener("input", u), e2.addEventListener("pointerdown", c), e2.addEventListener("pointerup", d), e2.addEventListener("pointerleave", d), e2.addEventListener("focus", c), e2.addEventListener("blur", d), u();
  }
  e2.dataset.enhancedRange = "1";
}
function We(e2) {
  if (e2.dataset.enhancedRequired)
    return;
  e2.dataset.enhancedRequired = "true";
  let t = (n) => {
    let r = n.closest("label");
    if (!r || r.querySelector(".required-asterisk"))
      return;
    let o = document.createElement("span");
    o.classList.add("required-asterisk"), o.textContent = "*", o.style.marginLeft = "4px", r.querySelector("span").appendChild(o);
    let s = n.closest("form");
    if (s && !s.querySelector(".required-legend")) {
      let i = document.createElement("small");
      i.classList.add("required-legend"), i.textContent = "* Required fields", s.insertBefore(i, s.querySelector(".form-actions") || s.lastElementChild);
    }
  };
  e2.querySelectorAll("[required]").forEach((n) => {
    t(n);
  });
}
function ze(e2) {
  if (e2.dataset.enhancedOpenGroup)
    return;
  e2.dataset.enhancedOpenGroup = "true", e2.classList.add("flex", "flex-wrap", "buttons");
  let t = document.createElement("input");
  t.type = "text", t.placeholder = "Add item...", t.classList.add("input-text", "input-sm"), t.style.width = "auto";
  let n = e2.querySelector('input[type="radio"], input[type="checkbox"]');
  e2.appendChild(t), t.addEventListener("keydown", (r) => {
    if (r.key === "Enter" || r.key === "Tab") {
      let o = t.value.trim();
      if (o) {
        r.preventDefault();
        let s = n.type === "radio" ? "radio" : "checkbox", i = `open-group-${Math.random().toString(36).substring(2, 11)}`, u = document.createElement("label"), c = document.createElement("span");
        c.setAttribute("data-label", ""), c.textContent = o;
        let d = document.createElement("input");
        d.type = s, d.name = n.name || e2.getAttribute("data-name") || "open-group", d.value = o, d.id = i, u.appendChild(c), u.appendChild(d), e2.insertBefore(u, t), t.value = "";
      }
    } else if (r.key === "Backspace" && t.value === "") {
      r.preventDefault();
      let o = e2.querySelectorAll("label");
      o.length > 0 && o[o.length - 1].remove();
    }
  });
}
function Be(e2) {
  if (e2.dataset.enhancedClip)
    return;
  e2.dataset.enhancedClip = "true", e2.hasAttribute("tabindex") || e2.setAttribute("tabindex", "0"), e2.hasAttribute("role") || e2.setAttribute("role", "button");
  let t = () => {
    let r = e2.getAttribute("data-clip-open") === "true";
    e2.setAttribute("aria-expanded", r ? "true" : "false");
  }, n = () => {
    let r = e2.getAttribute("data-clip-open") === "true";
    e2.setAttribute("data-clip-open", r ? "false" : "true"), t();
  };
  e2.addEventListener("click", (r) => {
    r.defaultPrevented || n();
  }), e2.addEventListener("keydown", (r) => {
    (r.key === " " || r.key === "Enter") && (r.preventDefault(), n());
  }), t();
}
function Ve(e2) {
  if (e2.dataset.enhancedBtnWorking)
    return;
  e2.dataset.enhancedBtnWorking = "true";
  let t = null, n = false;
  new MutationObserver((o) => {
    o.forEach((s) => {
      if (s.attributeName === "class") {
        let i = e2.classList.contains("btn-working"), u = e2.querySelector("pds-icon");
        if (i)
          if (u)
            t || (t = u.getAttribute("icon")), u.setAttribute("icon", "circle-notch");
          else {
            let c = document.createElement("pds-icon");
            c.setAttribute("icon", "circle-notch"), c.setAttribute("size", "sm"), e2.insertBefore(c, e2.firstChild), n = true;
          }
        else
          s.oldValue?.includes("btn-working") && u && (n ? (u.remove(), n = false) : t && (u.setAttribute("icon", t), t = null));
      }
    });
  }).observe(e2, { attributes: true, attributeFilter: ["class"], attributeOldValue: true });
}
var Ge = /* @__PURE__ */ new Map([[".accordion", Ne], ["nav[data-dropdown]", je], ["label[data-toggle]", He], ['input[type="range"]', Fe], ["form[data-required]", We], ["fieldset[role=group][data-open]", ze], ["[data-clip]", Be], ["button, a[class*='btn-']", Ve]]);
var ne = Oe.map((e2) => ({ ...e2, run: Ge.get(e2.selector) || (() => {
}) }));
var Le = "pds";
var Ke = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
var Ee = /^[a-z]:/i;
function N(e2 = "") {
  return e2.endsWith("/") ? e2 : `${e2}/`;
}
function Qe(e2 = "", t = Le) {
  let n = e2.replace(/\/+$/, "");
  return new RegExp(`(?:^|/)${t}$`, "i").test(n) ? n : `${n}/${t}`;
}
function Ze(e2) {
  return e2.replace(/^\.\/+/, "");
}
function Je(e2) {
  return Ee.test(e2) ? e2.replace(Ee, "").replace(/^\/+/, "") : e2;
}
function Xe(e2) {
  return e2.startsWith("public/") ? e2.substring(7) : e2;
}
function re(e2, t = {}) {
  let n = t.segment || Le, r = t.defaultRoot || `/assets/${n}/`, o = e2?.public && e2.public?.root || e2?.static && e2.static?.root || null;
  if (!o || typeof o != "string")
    return N(r);
  let s = o.trim();
  return s ? (s = s.replace(/\\/g, "/"), s = Qe(s, n), s = N(s), Ke.test(s) ? s : (s = Ze(s), s = Je(s), s.startsWith("/") || (s = Xe(s), s.startsWith("/") || (s = `/${s}`), s = s.replace(/\/+/g, (i, u) => u === 0 ? i : "/")), N(s))) : N(r);
}
var et = /^[a-z][a-z0-9+\-.]*:\/\//i;
var j = (() => {
  try {
    return import.meta.url;
  } catch {
    return;
  }
})();
var V = (e2) => typeof e2 == "string" && e2.length && !e2.endsWith("/") ? `${e2}/` : e2;
function G(e2, t = {}) {
  if (!e2 || et.test(e2))
    return e2;
  let { preferModule: n = true } = t, r = () => {
    if (!j)
      return null;
    try {
      return new URL(e2, j).href;
    } catch {
      return null;
    }
  }, o = () => {
    if (typeof window > "u" || !window.location?.origin)
      return null;
    try {
      return new URL(e2, window.location.origin).href;
    } catch {
      return null;
    }
  };
  return (n ? r() || o() : o() || r()) || e2;
}
var De = (() => {
  if (j)
    try {
      let e2 = new URL(j);
      if (/\/public\/assets\/js\//.test(e2.pathname))
        return new URL("../pds/", j).href;
    } catch {
      return;
    }
})();
var ke = false;
function Re(e2) {
  ke || typeof document > "u" || (ke = true, e2.addEventListener("pds:ready", (t) => {
    let n = t.detail?.mode;
    n && document.documentElement.classList.add(`pds-${n}`, "pds-ready");
  }));
}
function ie(e2 = {}, t = {}) {
  if (!t || typeof t != "object")
    return e2;
  let n = Array.isArray(e2) ? [...e2] : { ...e2 };
  for (let [r, o] of Object.entries(t))
    o && typeof o == "object" && !Array.isArray(o) ? n[r] = ie(n[r] && typeof n[r] == "object" ? n[r] : {}, o) : n[r] = o;
  return n;
}
function oe(e2 = "") {
  return String(e2).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function $(e2) {
  if (e2 == null)
    return e2;
  if (typeof e2 == "function")
    return;
  if (typeof e2 != "object")
    return e2;
  if (Array.isArray(e2))
    return e2.map((n) => $(n)).filter((n) => n !== void 0);
  let t = {};
  for (let n in e2)
    if (e2.hasOwnProperty(n)) {
      let r = e2[n];
      if (typeof r != "function") {
        let o = $(r);
        o !== void 0 && (t[n] = o);
      }
    }
  return t;
}
function $e(e2 = {}, t = {}, { presets: n, defaultLog: r }) {
  let o = typeof e2 == "object" && ("colors" in e2 || "typography" in e2 || "spatialRhythm" in e2 || "shape" in e2 || "behavior" in e2 || "layout" in e2 || "advanced" in e2 || "a11y" in e2 || "components" in e2 || "icons" in e2), s = e2 && e2.enhancers;
  s && !Array.isArray(s) && (s = Object.values(s));
  let i = s ?? t.enhancers ?? [], u = e2 && e2.preset, c = e2 && e2.design, d = e2 && e2.icons && typeof e2.icons == "object" ? e2.icons : null, l = "preset" in (e2 || {}) || "design" in (e2 || {}) || "enhancers" in (e2 || {}), a, m = null;
  if (l) {
    let h = String(u || "default").toLowerCase(), w = n?.[h] || Object.values(n || {}).find((p) => oe(p.name) === h || String(p.name || "").toLowerCase() === h);
    if (!w)
      throw new Error(`PDS preset not found: "${u || "default"}"`);
    m = { id: w.id || oe(w.name), name: w.name || w.id || String(h) };
    let v = structuredClone(w);
    if (c && typeof c == "object" || d) {
      let p = c ? $(c) : {}, y = d ? $(d) : null, f = y ? ie(p, { icons: y }) : p;
      v = ie(v, structuredClone(f));
    }
    let { mode: g, autoDefine: x, applyGlobalStyles: M, manageTheme: E, themeStorageKey: k, preloadStyles: C, criticalLayers: q, managerURL: I, manager: F, preset: L, design: R, enhancers: O, log: S, ...P } = e2;
    a = { ...P, design: v, preset: m.name, log: S || r };
  } else if (o) {
    let { log: h, ...w } = e2;
    a = { design: structuredClone(w), log: h || r };
  } else {
    let h = n?.default || Object.values(n || {}).find((w) => oe(w.name) === "default");
    if (!h)
      throw new Error("PDS default preset not available");
    m = { id: h.id || "default", name: h.name || "Default" }, a = { design: structuredClone(h), preset: m.name, log: r };
  }
  return { generatorConfig: a, enhancers: i, presetInfo: m };
}
function Te({ manageTheme: e2, themeStorageKey: t, applyResolvedTheme: n, setupSystemListenerIfNeeded: r }) {
  let o = "light", s = null;
  if (e2 && typeof window < "u") {
    try {
      s = localStorage.getItem(t) || null;
    } catch {
      s = null;
    }
    try {
      n?.(s), r?.(s);
    } catch {
    }
    s ? s === "system" ? o = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : o = s : o = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return { resolvedTheme: o, storedTheme: s };
}
function ae(e2, { resolvePublicAssetURL: t }) {
  let n = !!(e2?.public?.root || e2?.static?.root), r = t(e2);
  return !n && De && (r = De), V(G(r));
}
async function Me(e2, { baseEnhancers: t = [] } = {}) {
  let { autoDefineBaseURL: n = "/auto-define/", autoDefinePreload: r = [], autoDefineMapper: o = null, enhancers: s = [], autoDefineOverrides: i = null, autoDefinePreferModule: u = true } = e2, c = (() => {
    let l = /* @__PURE__ */ new Map();
    return (t || []).forEach((a) => l.set(a.selector, a)), (s || []).forEach((a) => l.set(a.selector, a)), Array.from(l.values());
  })(), d = null;
  if (typeof window < "u" && typeof document < "u") {
    let l = null;
    try {
      let g = await Promise.resolve().then(() => (Ce(), Ae));
      l = g?.AutoDefiner || g?.default?.AutoDefiner || g?.default || null;
    } catch (g) {
      console.warn("AutoDefiner not available:", g?.message || g);
    }
    let a = (g) => {
      switch (g) {
        case "pds-tabpanel":
          return "pds-tabstrip.js";
        default:
          return `${g}.js`;
      }
    }, { mapper: m, ...h } = i && typeof i == "object" ? i : {}, v = { baseURL: n && V(G(n, { preferModule: u })), predefine: r, scanExisting: true, observeShadows: true, patchAttachShadow: true, debounceMs: 16, enhancers: c, onError: (g, x) => {
      if (typeof g == "string" && g.startsWith("pds-")) {
        let E = ["pds-form", "pds-drawer"].includes(g), k = x?.message?.includes("#pds/lit") || x?.message?.includes("Failed to resolve module specifier");
        E && k ? console.error(`\u274C PDS component <${g}> requires Lit but #pds/lit is not in import map.
              See: https://github.com/Pure-Web-Foundation/pure-ds/blob/main/readme.md#lit-components-not-working`) : console.warn(`\u26A0\uFE0F PDS component <${g}> not found. Assets may not be installed.`);
      } else
        console.error(`\u274C Auto-define error for <${g}>:`, x);
    }, ...h, mapper: (g) => {
      if (customElements.get(g))
        return null;
      if (typeof o == "function")
        try {
          let x = o(g);
          return x === void 0 ? a(g) : x;
        } catch (x) {
          return console.warn("Custom autoDefine.mapper error; falling back to default:", x?.message || x), a(g);
        }
      return a(g);
    } };
    l && (d = new l(v), r.length > 0 && typeof l.define == "function" && await l.define(...r, { baseURL: n, mapper: v.mapper, onError: v.onError }));
  }
  return { autoDefiner: d, mergedEnhancers: c };
}
var de = class extends EventTarget {
};
var b = new de();
b.initializing = false;
b.currentPreset = null;
b.debug = false;
var Ie = (e2 = "") => String(e2).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
var ce = function(e2 = "log", t, ...n) {
  let r = !!(b.registry && !b.registry.isLive), o = (this?.debug || this?.design?.debug || b.debug || false) === true;
  if (r) {
    if (!b.debug)
      return;
  } else if (!o && e2 !== "error" && e2 !== "warn")
    return;
  let s = console[e2] || console.log;
  n.length > 0 ? s(t, ...n) : s(t);
};
async function tt(e2, t = {}) {
  if (t?.runtimeConfig === false || typeof fetch != "function")
    return null;
  let n = t?.runtimeConfigURL || `${e2}pds-runtime-config.json`;
  try {
    let r = await fetch(n, { cache: "no-store" });
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
}
b.registry = U;
b.enums = we;
b.adoptLayers = ge;
b.adoptPrimitives = ye;
b.parse = Y;
b.createStylesheet = be;
b.isLiveMode = () => U.isLive;
b.ask = Se;
b.toast = D;
b.common = ee;
b.AutoComplete = z;
function Pe(e2) {
  let t = typeof CustomEvent == "function";
  try {
    let n = t ? new CustomEvent("pds:ready", { detail: e2 }) : new Event("pds:ready");
    b.dispatchEvent(n);
  } catch {
  }
  if (typeof document < "u")
    if (t) {
      let n = { detail: e2, bubbles: true, composed: true };
      try {
        document.dispatchEvent(new CustomEvent("pds:ready", n));
      } catch {
      }
      try {
        document.dispatchEvent(new CustomEvent("pds-ready", n));
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
var le = "pure-ds-theme";
var T = null;
var H = null;
function K(e2) {
  try {
    if (typeof document > "u")
      return;
    let t = "light";
    e2 ? e2 === "system" ? t = typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : t = e2 : t = typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", document.documentElement.setAttribute("data-theme", t);
  } catch {
  }
}
function Q(e2) {
  try {
    if (T && H) {
      try {
        typeof T.removeEventListener == "function" ? T.removeEventListener("change", H) : typeof T.removeListener == "function" && T.removeListener(H);
      } catch {
      }
      T = null, H = null;
    }
    if (e2 === "system" && typeof window < "u" && window.matchMedia) {
      let t = window.matchMedia("(prefers-color-scheme: dark)"), n = (r) => {
        let o = r?.matches === void 0 ? t.matches : r.matches;
        try {
          let s = o ? "dark" : "light";
          document.documentElement.setAttribute("data-theme", s), b.dispatchEvent(new CustomEvent("pds:theme:changed", { detail: { theme: s, source: "system" } }));
        } catch {
        }
      };
      T = t, H = n, typeof t.addEventListener == "function" ? t.addEventListener("change", n) : typeof t.addListener == "function" && t.addListener(n);
    }
  } catch {
  }
}
Object.defineProperty(b, "theme", { get() {
  try {
    return typeof window > "u" ? null : localStorage.getItem(le) || null;
  } catch {
    return null;
  }
}, set(e2) {
  try {
    if (typeof window > "u")
      return;
    e2 == null ? localStorage.removeItem(le) : localStorage.setItem(le, e2), K(e2), Q(e2), b.dispatchEvent(new CustomEvent("pds:theme:changed", { detail: { theme: e2, source: "api" } }));
  } catch {
  }
} });
b.defaultEnhancers = ne;
async function nt(e2) {
  let t = e2 && e2.mode || "live", { mode: n, ...r } = e2 || {};
  if (t === "static")
    return rt(r);
  let o = ae(r, { resolvePublicAssetURL: re }), s = r?.managerURL || r?.public?.managerURL || r?.manager?.url || new URL("core/pds-manager.js", o).href || new URL("./pds-manager.js", import.meta.url).href, { startLive: i } = await import(s);
  return i(b, r, { emitReady: Pe, applyResolvedTheme: K, setupSystemListenerIfNeeded: Q });
}
b.start = nt;
async function rt(e2) {
  if (!e2 || typeof e2 != "object")
    throw new Error("PDS.start({ mode: 'static', ... }) requires a valid configuration object");
  let t = e2.applyGlobalStyles ?? true, n = e2.manageTheme ?? true, r = e2.themeStorageKey ?? "pure-ds-theme", o = e2.staticPaths ?? {}, s = ae(e2, { resolvePublicAssetURL: re }), i = e2 && e2.autoDefine || null, u;
  i && i.baseURL ? u = V(G(i.baseURL, { preferModule: false })) : u = `${s}components/`;
  let c = i && Array.isArray(i.predefine) && i.predefine || [], d = i && typeof i.mapper == "function" && i.mapper || null;
  try {
    Re(b);
    let { resolvedTheme: l } = Te({ manageTheme: n, themeStorageKey: r, applyResolvedTheme: K, setupSystemListenerIfNeeded: Q }), a = await tt(s, e2), m = a?.config?.design || a?.design || null, h = a?.config?.preset || a?.preset || "default", w = a?.presetId || Ie(h) || "default", v = m ? { [String(w).toLowerCase()]: m, ...String(w).toLowerCase() !== "default" ? { default: m } : {} } : null, g = e2?.design && typeof e2.design == "object" ? $(e2.design) : null, x = Ie(e2?.preset || "default") || "default", M = g ? { [String(x).toLowerCase()]: g, ...String(x).toLowerCase() !== "default" ? { default: g } : {} } : null, E = v || e2?.presets || M || {};
    if (!Object.keys(E || {}).length)
      throw new Error("PDS static mode requires preset data. Run pds:build or provide config.presets/config.design.");
    let k = a?.config ? { ...a.config, ...e2, preset: e2?.preset || w, design: g || m || a?.config?.design } : e2, C = $e(k, {}, { presets: E, defaultLog: ce }), q = C.enhancers, I = { tokens: `${s}styles/pds-tokens.css.js`, primitives: `${s}styles/pds-primitives.css.js`, components: `${s}styles/pds-components.css.js`, utilities: `${s}styles/pds-utilities.css.js`, styles: `${s}styles/pds-styles.css.js` }, F = a?.paths || {};
    if (o = { ...I, ...F, ...o }, b.registry.setStaticMode(o), t && typeof document < "u")
      try {
        let S = await b.registry.getStylesheet("styles");
        if (S) {
          S._pds = true;
          let P = (document.adoptedStyleSheets || []).filter((p) => p._pds !== true);
          document.adoptedStyleSheets = [...P, S];
        }
      } catch (S) {
        ce.call(b, "warn", "Failed to apply static styles:", S);
      }
    let L = null, R = [];
    try {
      let S = await Me({ autoDefineBaseURL: u, autoDefinePreload: c, autoDefineMapper: d, enhancers: q, autoDefineOverrides: i || null, autoDefinePreferModule: !(i && i.baseURL) }, { baseEnhancers: ne });
      L = S.autoDefiner, R = S.mergedEnhancers || [];
    } catch (S) {
      ce.call(b, "error", "\u274C Failed to initialize AutoDefiner/Enhancers (static):", S);
    }
    let O = $(e2);
    return b.currentConfig = Object.freeze({ mode: "static", ...structuredClone(O), design: structuredClone(C.generatorConfig.design), preset: C.generatorConfig.preset, theme: l, enhancers: R }), Pe({ mode: "static", config: C.generatorConfig, theme: l, autoDefiner: L }), { config: C.generatorConfig, theme: l, autoDefiner: L };
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
    predefine: ["pds-icon", "pds-drawer", "pds-toaster", "pds-tabstrip"],
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

// src/js/router.js
var HASH_PREFIX = "#/";
function getPathFromHash() {
  const hash = location.hash.slice(1) || "/";
  return hash.startsWith("/") ? hash.slice(1) : hash;
}
function getPathFromUrl(url) {
  try {
    const u = typeof url === "string" ? new URL(url, location.origin) : url;
    const hash = u.hash.slice(1) || "/";
    return hash.startsWith("/") ? hash.slice(1) : hash;
  } catch {
    return getPathFromHash();
  }
}
var routeHandlers = /* @__PURE__ */ new Map();
var onNavigateCallback = null;
var lastAppliedPath = null;
function route(path, handler) {
  const key = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  routeHandlers.set(key, handler);
  const noSlash = path.replace(/^\/+/, "") || "/";
  if (noSlash !== key)
    routeHandlers.set(noSlash, handler);
}
function navigateTo(path) {
  const normalized = path ? path.startsWith("/") ? path.slice(1) : path : "";
  const hash = normalized ? `${HASH_PREFIX}${normalized}` : HASH_PREFIX;
  if (typeof globalThis.navigation !== "undefined" && globalThis.navigation.navigate) {
    globalThis.navigation.navigate(location.pathname + location.search + hash, {
      history: "push"
    });
  } else {
    location.hash = hash;
  }
}
function getCurrentPath() {
  return getPathFromHash();
}
function resolveHandler(path) {
  const normalized = path ? `/${path}` : "/";
  if (routeHandlers.has(normalized))
    return routeHandlers.get(normalized);
  const parts = path.split("/").filter(Boolean);
  for (let i = parts.length; i >= 0; i--) {
    const tryPath = i === 0 ? "/" : `/${parts.slice(0, i).join("/")}`;
    if (routeHandlers.has(tryPath))
      return routeHandlers.get(tryPath);
  }
  return routeHandlers.get("/") || null;
}
function onNavigate(cb) {
  onNavigateCallback = cb;
}
async function handleNavigation(path) {
  const handler = resolveHandler(path);
  if (onNavigateCallback)
    onNavigateCallback(path);
  if (handler) {
    const out = handler();
    return out instanceof Promise ? out : Promise.resolve(out);
  }
  return null;
}
function initRouter(render) {
  async function apply(path) {
    const pathNorm = (path || "").replace(/^\/+/, "").trim();
    if (lastAppliedPath === pathNorm)
      return null;
    lastAppliedPath = pathNorm;
    const el = await handleNavigation(pathNorm);
    const root = typeof render === "function" ? await render(pathNorm, el) : null;
    return root !== void 0 ? root : el;
  }
  if (typeof globalThis.navigation !== "undefined" && globalThis.navigation.addEventListener) {
    globalThis.navigation.addEventListener("navigate", (event) => {
      if (!event.canIntercept)
        return;
      const path = getPathFromUrl(event.destination.url);
      event.intercept({
        handler: () => apply(path)
      });
    });
  }
  window.addEventListener("hashchange", () => {
    apply(getPathFromHash());
  });
  return apply(getPathFromHash());
}

// src/js/layout.js
var SETTINGS_EXPANDED_KEY = "dashboard-settings-expanded";
var NAV_ITEMS = [
  { path: "", label: "Home", icon: "house" },
  { path: "inbox", label: "Inbox", icon: "envelope" },
  { path: "customers", label: "Customers", icon: "users" },
  { path: "board", label: "Board", icon: "grid-four" },
  {
    path: "settings",
    label: "Settings",
    icon: "gear",
    children: [
      { path: "settings", label: "General" },
      { path: "settings/members", label: "Members" },
      { path: "settings/notifications", label: "Notifications" },
      { path: "settings/security", label: "Security" }
    ]
  }
];
function navClass(path, current) {
  const c = (current || "").replace(/\/$/, "");
  const t = (path || "").replace(/\/$/, "");
  if (c === t)
    return "surface-subtle";
  if (t && !t.includes("/") && (c === t || c.startsWith(t + "/")))
    return "surface-subtle";
  return "";
}
function getSettingsExpanded(currentPath, toggle) {
  const key = SETTINGS_EXPANDED_KEY;
  const defaultExpanded = (currentPath || "").startsWith("settings");
  if (toggle) {
    try {
      const cur = sessionStorage.getItem(key);
      const next = cur === "0" || cur === "false" ? "1" : "0";
      sessionStorage.setItem(key, next);
      return next === "1";
    } catch {
      return defaultExpanded;
    }
  }
  try {
    const stored = sessionStorage.getItem(key);
    if (stored === null)
      return defaultExpanded;
    return stored !== "0" && stored !== "false";
  } catch {
    return defaultExpanded;
  }
}
function buildSidebar(currentPath) {
  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "Main");
  nav.className = "stack-sm flex flex-col gap-sm surface-elevated dashboard-sidebar";
  const list = document.createElement("ul");
  list.className = "stack-xs list-unstyled";
  const settingsExpanded = getSettingsExpanded(currentPath);
  for (const item of NAV_ITEMS) {
    const li = document.createElement("li");
    if (item.children) {
      const wrapper = document.createElement("div");
      wrapper.className = "dashboard-nav-parent";
      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "flex gap-sm items-center p-sm radius-base w-full text-left dashboard-nav-toggle";
      toggleBtn.setAttribute("aria-expanded", String(settingsExpanded));
      toggleBtn.setAttribute("aria-controls", "dashboard-settings-sublist");
      toggleBtn.id = "dashboard-settings-toggle";
      toggleBtn.innerHTML = `<pds-icon icon="${item.icon}" size="sm"></pds-icon><span>${item.label}</span><pds-icon icon="caret-down" size="sm" class="dashboard-nav-chevron"></pds-icon>`;
      toggleBtn.addEventListener("click", () => {
        getSettingsExpanded(currentPath, true);
        const next = buildSidebar(currentPath);
        nav.closest("aside")?.replaceChildren(next);
      });
      wrapper.appendChild(toggleBtn);
      const subList = document.createElement("ul");
      subList.id = "dashboard-settings-sublist";
      subList.className = "stack-xs list-unstyled dashboard-nav-sublist";
      subList.setAttribute("data-expanded", settingsExpanded ? "true" : "false");
      for (const child of item.children) {
        const subLi = document.createElement("li");
        const subA = document.createElement("a");
        subA.href = `#/${child.path}`;
        subA.className = `flex gap-sm items-center p-xs radius-base text-sm ${navClass(child.path, currentPath)}`;
        subA.textContent = child.label;
        subA.addEventListener("click", (e2) => {
          e2.preventDefault();
          navigateTo(child.path);
        });
        subLi.appendChild(subA);
        subList.appendChild(subLi);
      }
      wrapper.appendChild(subList);
      li.appendChild(wrapper);
    } else {
      const a = document.createElement("a");
      a.href = `#/${item.path}`;
      a.className = `dashboard-nav-link flex gap-sm items-center p-sm radius-base ${navClass(item.path, currentPath)}`;
      a.setAttribute("data-nav", item.path);
      a.innerHTML = `<pds-icon icon="${item.icon}" size="sm"></pds-icon><span>${item.label}</span>`;
      a.addEventListener("click", (e2) => {
        e2.preventDefault();
        navigateTo(item.path);
      });
      li.appendChild(a);
    }
    list.appendChild(li);
  }
  nav.appendChild(list);
  return nav;
}
function buildToolbar({ title, onSearch, onNotifications, onTheme }) {
  const header = document.createElement("header");
  header.className = "flex justify-between items-center gap-md p-md surface-subtle";
  const h1 = document.createElement("h1");
  h1.className = "text-lg";
  h1.textContent = title;
  header.appendChild(h1);
  const actions = document.createElement("div");
  actions.className = "dashboard-toolbar-actions";
  const searchBtn = document.createElement("button");
  searchBtn.type = "button";
  searchBtn.className = "btn-outline icon-only dashboard-toolbar-btn";
  searchBtn.setAttribute("aria-label", "Search");
  searchBtn.innerHTML = '<pds-icon icon="magnifying-glass" size="xs"></pds-icon>';
  searchBtn.addEventListener("click", () => onSearch?.());
  const notifBtn = document.createElement("button");
  notifBtn.type = "button";
  notifBtn.className = "btn-outline icon-only dashboard-toolbar-btn";
  notifBtn.setAttribute("aria-label", "Notifications");
  notifBtn.innerHTML = '<pds-icon icon="bell" size="xs"></pds-icon>';
  notifBtn.addEventListener("click", () => onNotifications?.());
  const themeBtn = document.createElement("button");
  themeBtn.type = "button";
  themeBtn.className = "btn-outline icon-only dashboard-toolbar-btn";
  themeBtn.setAttribute("aria-label", "Theme");
  themeBtn.innerHTML = '<pds-icon icon="palette" size="xs"></pds-icon>';
  themeBtn.addEventListener("click", () => onTheme?.());
  actions.append(searchBtn, notifBtn, themeBtn);
  header.appendChild(actions);
  return header;
}
function createLayout() {
  const layoutRoot2 = document.createElement("div");
  layoutRoot2.className = "flex gap-0 dashboard-layout";
  const sidebar = document.createElement("aside");
  sidebar.className = "surface-elevated";
  sidebar.setAttribute("aria-label", "Sidebar");
  const sidebarContent = buildSidebar("");
  sidebar.appendChild(sidebarContent);
  const content = document.createElement("div");
  content.className = "grow flex flex-col dashboard-content";
  let themeDrawerRef = null;
  function openTheme() {
    if (!themeDrawerRef)
      return;
    themeDrawerRef.open = true;
    themeDrawerRef.setAttribute("open", "");
  }
  let commandPaletteDrawer = null;
  let notificationsDrawer = null;
  function openCommandPalette2() {
    const drawer = commandPaletteDrawer;
    if (!drawer)
      return;
    if (typeof drawer.openDrawer === "function")
      drawer.openDrawer();
    else {
      drawer.open = true;
      drawer.setAttribute("open", "");
    }
  }
  function openNotifications2() {
    const drawer = notificationsDrawer;
    if (!drawer)
      return;
    if (typeof drawer.openDrawer === "function")
      drawer.openDrawer();
    else {
      drawer.open = true;
      drawer.setAttribute("open", "");
    }
  }
  const toolbar = buildToolbar({
    title: "Home",
    onSearch: openCommandPalette2,
    onNotifications: openNotifications2,
    onTheme: openTheme
  });
  content.appendChild(toolbar);
  const mainOutlet2 = document.createElement("main");
  mainOutlet2.className = "grow p-md";
  mainOutlet2.setAttribute("role", "main");
  content.appendChild(mainOutlet2);
  layoutRoot2.appendChild(sidebar);
  layoutRoot2.appendChild(content);
  function updateToolbarTitle(title) {
    const t = layoutRoot2.querySelector("header h1");
    if (t)
      t.textContent = title;
  }
  function updateSidebar2(path) {
    const next = buildSidebar(path);
    sidebar.replaceChildren(next);
    const labels = { "": "Home", inbox: "Inbox", customers: "Customers", board: "Board", settings: "Settings" };
    const first = (path || "").split("/")[0];
    updateToolbarTitle(labels[first] || first || "Home");
  }
  return {
    layoutRoot: layoutRoot2,
    mainOutlet: mainOutlet2,
    sidebar,
    updateSidebar: updateSidebar2,
    updateToolbarTitle,
    setCommandPaletteDrawer(drawer) {
      commandPaletteDrawer = drawer;
    },
    setNotificationsDrawer(drawer) {
      notificationsDrawer = drawer;
    },
    setThemeDrawer(drawer) {
      themeDrawerRef = drawer;
    },
    openCommandPalette: openCommandPalette2,
    openNotifications: openNotifications2
  };
}

// src/js/components/command-palette.js
var COMMANDS = [
  { path: "", label: "Home", icon: "house" },
  { path: "inbox", label: "Inbox", icon: "envelope" },
  { path: "customers", label: "Customers", icon: "users" },
  { path: "board", label: "Board", icon: "grid-four" },
  { path: "settings", label: "Settings", icon: "gear" }
];
function createCommandPalette() {
  const drawer = document.createElement("pds-drawer");
  drawer.setAttribute("position", "right");
  const header = document.createElement("div");
  header.setAttribute("slot", "drawer-header");
  header.className = "flex items-center gap-sm";
  const input = document.createElement("input");
  input.type = "search";
  input.placeholder = "Search or jump to\u2026";
  input.className = "grow";
  input.setAttribute("aria-label", "Search");
  header.appendChild(input);
  const list = document.createElement("ul");
  list.className = "stack-xs";
  list.style.listStyle = "none";
  list.style.padding = "0";
  list.style.margin = "0";
  function renderItems(filter = "") {
    const q = filter.toLowerCase();
    const items = q ? COMMANDS.filter((c) => c.label.toLowerCase().includes(q) || c.path.toLowerCase().includes(q)) : COMMANDS;
    list.innerHTML = "";
    for (const cmd of items) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#/${cmd.path}`;
      a.className = "flex gap-sm items-center p-sm radius-base surface-subtle";
      a.innerHTML = `<pds-icon icon="${cmd.icon}" size="sm"></pds-icon><span>${cmd.label}</span>`;
      a.addEventListener("click", (e2) => {
        e2.preventDefault();
        navigateTo(cmd.path);
        drawer.open = false;
      });
      li.appendChild(a);
      list.appendChild(li);
    }
  }
  renderItems();
  input.addEventListener("input", () => renderItems(input.value));
  input.addEventListener("keydown", (e2) => {
    if (e2.key === "Escape")
      drawer.open = false;
  });
  const content = document.createElement("div");
  content.setAttribute("slot", "drawer-content");
  content.className = "stack-md";
  content.appendChild(list);
  drawer.appendChild(header);
  drawer.appendChild(content);
  drawer.addEventListener("pds-drawer:opened", () => {
    input.value = "";
    renderItems();
    setTimeout(() => input.focus(), 100);
  });
  return drawer;
}
function registerCommandPaletteShortcut(open) {
  document.addEventListener("keydown", (e2) => {
    if ((e2.metaKey || e2.ctrlKey) && e2.key === "k") {
      e2.preventDefault();
      open();
    }
  });
}

// src/js/lib/fetch-cache.js
var DEFAULT_TTL_MS = 5 * 60 * 1e3;
var CACHE_NAME = "pds-dashboard-api-v1";
var memoryCacheBackend = /* @__PURE__ */ new Map();
var memoryCacheStats = { hits: 0, misses: 0 };
var MEMORY_CACHE = new Proxy(memoryCacheBackend, {
  get(target, prop) {
    if (prop === "__stats__")
      return memoryCacheStats;
    if (prop === "get") {
      return function(key) {
        const entry = target.get(key);
        if (entry && typeof entry === "object" && entry.expires > Date.now())
          memoryCacheStats.hits++;
        return entry;
      };
    }
    return Reflect.get(target, prop);
  }
});
async function cachedFetch(url, options = {}, opts = {}) {
  const method = (options.method || "GET").toUpperCase();
  const skipCache = opts.cache === false || method !== "GET";
  const ttl = opts.ttl ?? DEFAULT_TTL_MS;
  if (skipCache)
    return fetch(url, options);
  const cacheKey = url;
  if (typeof caches !== "undefined") {
    try {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(url);
      if (cached) {
        const date = cached.headers.get("x-cached-at");
        if (date && ttl > 0 && Date.now() - parseInt(date, 10) < ttl)
          return cached;
      }
      const res = await fetch(url, options);
      if (res.ok) {
        const clone = res.clone();
        const headers = new Headers(clone.headers);
        headers.set("x-cached-at", String(Date.now()));
        const body2 = await clone.blob();
        await cache.put(url, new Response(body2, { status: clone.status, statusText: clone.statusText, headers }));
      }
      return res;
    } catch {
      return fetch(url, options);
    }
  }
  const entry = MEMORY_CACHE.get(cacheKey);
  if (entry && entry.expires > Date.now())
    return entry.response.clone();
  memoryCacheStats.misses++;
  const response = await fetch(url, options);
  if (response.ok) {
    MEMORY_CACHE.set(cacheKey, {
      response: response.clone(),
      expires: Date.now() + ttl
    });
  }
  return response;
}

// src/js/components/notifications-slideover.js
function createNotificationsSlideover(onClose) {
  const drawer = document.createElement("pds-drawer");
  drawer.setAttribute("position", "right");
  const header = document.createElement("div");
  header.setAttribute("slot", "drawer-header");
  header.className = "flex justify-between items-center";
  header.innerHTML = '<h2 class="text-base">Notifications</h2>';
  const list = document.createElement("ul");
  list.className = "stack-xs list-unstyled";
  const content = document.createElement("div");
  content.setAttribute("slot", "drawer-content");
  content.className = "stack-sm";
  function renderNotifications(items) {
    list.innerHTML = "";
    if (!items || items.length === 0) {
      const li = document.createElement("li");
      li.className = "text-muted text-sm p-md";
      li.textContent = "No notifications";
      list.appendChild(li);
      return;
    }
    for (const n of items) {
      const li = document.createElement("li");
      li.className = "card surface-subtle p-md";
      const name = n.sender?.name ?? "Someone";
      const body2 = n.body ?? "";
      const date = n.date ? new Date(n.date).toLocaleDateString(void 0, { dateStyle: "short" }) : "";
      li.innerHTML = `
        <div class="flex justify-between items-start gap-sm">
          <strong class="text-sm">${escapeHtml(name)}</strong>
          <span class="text-muted text-xs">${escapeHtml(date)}</span>
        </div>
        <p class="text-sm text-muted mt-xs">${escapeHtml(body2)}</p>
      `;
      list.appendChild(li);
    }
  }
  content.appendChild(list);
  drawer.appendChild(header);
  drawer.appendChild(content);
  cachedFetch("/api/notifications.json").then((r) => r.ok ? r.json() : []).then(renderNotifications).catch(() => renderNotifications([]));
  if (typeof onClose === "function") {
    drawer.addEventListener("pds-drawer:closed", onClose);
  }
  return drawer;
}
function escapeHtml(s) {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

// src/js/lib/chart.js
var DEFAULT_CHART_WIDTH = 600;
var DEFAULT_CHART_HEIGHT = 240;
var PADDING = { top: 16, right: 16, bottom: 24, left: 40 };
function resolveColor(canvas, token, fallback) {
  try {
    const root = canvas.ownerDocument?.documentElement || document.documentElement;
    const value = getComputedStyle(root).getPropertyValue(token.replace("var(", "").replace(")", "").trim());
    if (value)
      return value.trim();
  } catch {
  }
  return fallback;
}
function drawLineChart(canvas, options) {
  const { values = [], labels = [], color, fill = true } = options;
  if (values.length === 0)
    return;
  const ctx = canvas.getContext("2d");
  if (!ctx)
    return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width > 0 ? rect.width : DEFAULT_CHART_WIDTH;
  const height = rect.height > 0 ? rect.height : DEFAULT_CHART_HEIGHT;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.scale(dpr, dpr);
  const chartW = width - PADDING.left - PADDING.right;
  const chartH = height - PADDING.top - PADDING.bottom;
  if (chartW <= 0 || chartH <= 0)
    return;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = chartW / Math.max(values.length - 1, 1);
  const primary = color || resolveColor(canvas, "--color-primary-500", "#0e7490");
  const primaryLight = resolveColor(canvas, "--color-primary-200", "#a5f3fc");
  ctx.save();
  ctx.translate(PADDING.left, PADDING.top);
  const points = values.map((v, i) => ({
    x: i * stepX,
    y: chartH - (v - min) / range * chartH
  }));
  if (fill) {
    ctx.beginPath();
    ctx.moveTo(0, chartH);
    points.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.lineTo(chartW, chartH);
    ctx.closePath();
    ctx.fillStyle = primaryLight;
    ctx.globalAlpha = 0.4;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = primary;
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.restore();
}
function setupLineChartHover(canvas, values, opts = {}) {
  if (!values.length)
    return;
  const formatValue = opts.formatValue ?? ((v) => String(v));
  const rect = canvas.getBoundingClientRect();
  const chartW = rect.width - PADDING.left - PADDING.right;
  const stepX = chartW / Math.max(values.length - 1, 1);
  let tooltip = canvas.parentElement?.querySelector(".chart-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.className = "chart-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.style.cssText = "position:absolute;pointer-events:none;z-index:2;padding:6px 10px;border-radius:6px;font-size:12px;font-weight:600;white-space:nowrap;opacity:0;transition:opacity 0.15s ease;";
    canvas.parentElement?.appendChild(tooltip);
  }
  const parent = canvas.parentElement;
  const show = (clientX, clientY, text) => {
    tooltip.textContent = text;
    tooltip.style.background = "var(--color-surface-overlay, #1e293b)";
    tooltip.style.color = "var(--color-text-inverse, #f8fafc)";
    if (parent) {
      const pr = parent.getBoundingClientRect();
      tooltip.style.left = `${clientX - pr.left + 12}px`;
      tooltip.style.top = `${clientY - pr.top + 10}px`;
    } else {
      tooltip.style.left = `${clientX + 12}px`;
      tooltip.style.top = `${clientY + 10}px`;
    }
    tooltip.style.opacity = "1";
    tooltip.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150, fill: "forwards" });
  };
  const hide = () => {
    tooltip.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 100, fill: "forwards" });
    tooltip.style.opacity = "0";
  };
  canvas.addEventListener("mousemove", (e2) => {
    const r = canvas.getBoundingClientRect();
    const x = e2.clientX - r.left - PADDING.left;
    const i = Math.round(x / stepX);
    const idx = Math.max(0, Math.min(i, values.length - 1));
    const v = values[idx];
    show(e2.clientX, e2.clientY, formatValue(v));
  });
  canvas.addEventListener("mouseleave", hide);
}

// src/js/lib/animations.js
var defaultDuration = 200;
var defaultEasing = "ease-out";
function fadeIn(el, options = {}) {
  return el.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    {
      duration: options.duration ?? defaultDuration,
      easing: options.easing ?? defaultEasing,
      fill: "forwards",
      ...options
    }
  );
}

// src/js/pages/home.js
function renderHome() {
  const wrap = document.createElement("div");
  wrap.className = "stack-lg";
  const stats = document.createElement("div");
  stats.className = "grid grid-cols-1 md:grid-cols-3 gap-md";
  stats.innerHTML = `
    <article class="card surface-elevated p-md">
      <p class="text-muted text-sm">Revenue</p>
      <p class="text-xl" data-stat="revenue">\u2014</p>
    </article>
    <article class="card surface-elevated p-md">
      <p class="text-muted text-sm">Orders</p>
      <p class="text-xl" data-stat="orders">\u2014</p>
    </article>
    <article class="card surface-elevated p-md">
      <p class="text-muted text-sm">Conversion</p>
      <p class="text-xl" data-stat="conversion">\u2014</p>
    </article>
  `;
  wrap.appendChild(stats);
  const chartCard = document.createElement("article");
  chartCard.className = "card surface-elevated p-md chart-card";
  const chartTitle = document.createElement("h2");
  chartTitle.className = "text-base mb-md";
  chartTitle.textContent = "Sales (last 14 days)";
  chartCard.appendChild(chartTitle);
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", "600");
  canvas.setAttribute("height", "240");
  canvas.style.width = "100%";
  canvas.style.height = "240px";
  canvas.style.maxWidth = "100%";
  canvas.style.display = "block";
  chartCard.appendChild(canvas);
  wrap.appendChild(chartCard);
  const root = document.documentElement;
  const shadowHover = getComputedStyle(root).getPropertyValue("--shadow-md").trim() || "0 4px 6px rgba(0,0,0,0.1)";
  chartCard.addEventListener("mouseenter", () => {
    chartCard.animate(
      [{ boxShadow: "none" }, { boxShadow: shadowHover }],
      { duration: 200, fill: "forwards" }
    );
  });
  chartCard.addEventListener("mouseleave", () => {
    chartCard.animate(
      [{ boxShadow: shadowHover }, { boxShadow: "none" }],
      { duration: 200, fill: "forwards" }
    );
  });
  function drawChart() {
    cachedFetch("/api/stats.json").then((r) => r.json()).then((data) => {
      const tot = data.totals || {};
      const rev = wrap.querySelector('[data-stat="revenue"]');
      const ord = wrap.querySelector('[data-stat="orders"]');
      const conv = wrap.querySelector('[data-stat="conversion"]');
      if (rev)
        rev.textContent = tot.revenue != null ? `$${Number(tot.revenue).toLocaleString()}` : "\u2014";
      if (ord)
        ord.textContent = tot.orders != null ? String(tot.orders) : "\u2014";
      if (conv)
        conv.textContent = tot.conversion != null ? `${tot.conversion}%` : "\u2014";
      const sales = data.sales || [];
      const values = sales.map((s) => s.amount ?? 0);
      if (values.length) {
        requestAnimationFrame(() => {
          drawLineChart(canvas, { values, fill: true });
          setupLineChartHover(canvas, values, {
            formatValue: (v) => `$${Number(v).toLocaleString()}`
          });
        });
      }
    }).catch(() => {
    });
  }
  drawChart();
  fadeIn(wrap, { duration: 150 });
  return wrap;
}

// src/js/pages/inbox.js
function renderInbox() {
  const wrap = document.createElement("div");
  wrap.className = "stack-md";
  const list = document.createElement("ul");
  list.className = "stack-sm";
  list.style.listStyle = "none";
  list.style.padding = "0";
  list.style.margin = "0";
  const loading = document.createElement("p");
  loading.className = "text-muted";
  loading.textContent = "Loading\u2026";
  wrap.appendChild(loading);
  wrap.appendChild(list);
  cachedFetch("/api/mails.json").then((r) => r.json()).then((items) => {
    loading.remove();
    for (const m of items) {
      const li = document.createElement("li");
      li.className = "card surface-elevated p-md";
      const from = m.from?.name ?? "Unknown";
      const subj = m.subject ?? "";
      const date = m.date ? new Date(m.date).toLocaleDateString(void 0, { dateStyle: "short" }) : "";
      li.innerHTML = `
          <div class="flex justify-between items-start gap-sm">
            <strong class="text-sm">${escapeHtml2(from)}</strong>
            <span class="text-muted text-xs">${escapeHtml2(date)}</span>
          </div>
          <p class="text-sm mt-xs ${m.unread ? "" : "text-muted"}">${escapeHtml2(subj)}</p>
        `;
      list.appendChild(li);
    }
  }).catch(() => {
    loading.textContent = "Failed to load mails.";
  });
  fadeIn(wrap, { duration: 150 });
  return wrap;
}
function escapeHtml2(s) {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

// src/js/lib/african-names.js
var FIRST_NAMES = [
  "Amadou",
  "Fatou",
  "Moussa",
  "Aminata",
  "Ibrahima",
  "Mariama",
  "Ousmane",
  "Awa",
  "Mamadou",
  "Khadija",
  "Souleymane",
  "Ndeye",
  "Abdoulaye",
  "A\xEFssatou",
  "Cheikh",
  "Adama",
  "Oumar",
  "Fatima",
  "Sidy",
  "Maimouna",
  "Thierno",
  "Sokhna",
  "Samba",
  "Kofi",
  "Abena",
  "Kwame",
  "Ama",
  "Chinedu",
  "Ngozi",
  "Adebayo",
  "Oluwaseun",
  "Tendai",
  "Zanele",
  "Thabo",
  "Lerato",
  "Amara",
  "Yaa"
];
var LAST_NAMES = [
  "Diallo",
  "Ndiaye",
  "Sow",
  "Fall",
  "Ba",
  "Kane",
  "Traor\xE9",
  "Sarr",
  "Sene",
  "Diop",
  "Mbaye",
  "Gueye",
  "Barry",
  "Okafor",
  "Nwosu",
  "Okonkwo",
  "Mensah",
  "Asante",
  "Boateng",
  "Dlamini",
  "Mbeki",
  "Osei",
  "Kamara",
  "Toure"
];
var CITIES = [
  "Dakar",
  "Lagos",
  "Nairobi",
  "Johannesburg",
  "Cairo",
  "Abidjan",
  "Accra",
  "Douala",
  "Kinshasa",
  "Addis Ababa",
  "Dar es Salaam",
  "Kampala",
  "Durban",
  "Cape Town",
  "Bamako",
  "Ouagadougou",
  "Lom\xE9",
  "Cotonou"
];
var EMAIL_DOMAINS = ["mail.sn", "mail.ng", "mail.za", "example.co.ke", "example.eg", "mail.ci"];
function slug(str) {
  if (!str || typeof str !== "string")
    return "";
  return str.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/\s+/g, ".").replace(/[^a-z0-9.-]/g, "");
}
function pick(arr, seed) {
  const i = seed != null ? Math.abs(seed) % arr.length : Math.floor(Math.random() * arr.length);
  return arr[i];
}
function generatePerson(id = 0) {
  const first = pick(FIRST_NAMES, id);
  const last = pick(LAST_NAMES, id + 1);
  const name = `${first} ${last}`;
  const local = `${slug(first)}.${slug(last)}`;
  const domain = pick(EMAIL_DOMAINS, id + 2);
  const email = `${local}@${domain}`;
  const city = pick(CITIES, id + 3);
  const location2 = city;
  return { name, email, location: location2 };
}
function generatePeople(count) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const p = generatePerson(i + 1);
    out.push({ id: i + 1, ...p });
  }
  return out;
}

// src/js/lib/countries-data.js
var STATUSES = ["subscribed", "subscribed", "subscribed", "unsubscribed", "bounced"];
var ROLES = ["member", "member", "owner"];
async function loadPeopleFromCountries(count = 16) {
  return Promise.resolve(generatePeople(count));
}
async function loadCustomersFromCountries(max = 8) {
  const people = await loadPeopleFromCountries(max);
  return people.map((p, i) => ({
    id: p.id,
    name: p.name,
    email: p.email,
    avatar: { src: `https://i.pravatar.cc/128?u=${p.id}` },
    status: STATUSES[i % STATUSES.length],
    location: p.location
  }));
}
async function loadMembersFromCountries(max = 12) {
  const people = await loadPeopleFromCountries(max);
  return people.slice(0, max).map((p, i) => ({
    name: p.name,
    role: ROLES[i % ROLES.length]
  }));
}

// src/js/pages/customers.js
function renderCustomers() {
  const wrap = document.createElement("div");
  wrap.className = "stack-md";
  const loading = document.createElement("p");
  loading.className = "text-muted";
  loading.textContent = "Loading\u2026";
  wrap.appendChild(loading);
  const tableWrap = document.createElement("div");
  tableWrap.className = "overflow-auto";
  const table = document.createElement("table");
  table.className = "table-responsive";
  table.innerHTML = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Status</th>
        <th>Location</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  tableWrap.appendChild(table);
  wrap.appendChild(tableWrap);
  loadCustomersFromCountries(4).then((items) => {
    loading.remove();
    const tbody = table.querySelector("tbody");
    for (const c of items) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
          <td>${escapeHtml3(c.name ?? "")}</td>
          <td>${escapeHtml3(c.email ?? "")}</td>
          <td><span class="badge badge-${statusClass(c.status)}">${escapeHtml3(c.status ?? "")}</span></td>
          <td>${escapeHtml3(c.location ?? "")}</td>
        `;
      tbody.appendChild(tr);
    }
  }).catch(() => {
    loading.textContent = "Failed to load customers.";
  });
  fadeIn(wrap, { duration: 150 });
  return wrap;
}
function statusClass(s) {
  if (s === "subscribed")
    return "success";
  if (s === "unsubscribed")
    return "secondary";
  if (s === "bounced")
    return "danger";
  return "secondary";
}
function escapeHtml3(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// src/js/pages/settings.js
var TAB_PANEL_IDS = ["/settings", "/settings/members", "/settings/notifications", "/settings/security"];
var TAB_PATHS = ["settings", "settings/members", "settings/notifications", "settings/security"];
function pathToPanelId(path) {
  const p = (path || "settings").replace(/^\/+/, "");
  const idx = TAB_PATHS.indexOf(p);
  return idx >= 0 ? TAB_PANEL_IDS[idx] : TAB_PANEL_IDS[0];
}
function renderSettings(currentPath) {
  const wrap = document.createElement("div");
  wrap.className = "stack-md";
  const tabstrip = document.createElement("pds-tabstrip");
  const general = document.createElement("pds-tabpanel");
  general.id = "/settings";
  general.setAttribute("label", "General");
  general.innerHTML = `
    <div class="stack-sm p-md">
      <h3 class="text-base">General settings</h3>
      <p class="text-muted text-sm">Configure app preferences here.</p>
    </div>
  `;
  const membersPanel = document.createElement("pds-tabpanel");
  membersPanel.id = "/settings/members";
  membersPanel.setAttribute("label", "Members");
  membersPanel.innerHTML = `<div class="p-md"><p class="text-muted">Loading members\u2026</p><ul class="stack-xs list-unstyled" data-members></ul></div>`;
  const notifPanel = document.createElement("pds-tabpanel");
  notifPanel.id = "/settings/notifications";
  notifPanel.setAttribute("label", "Notifications");
  notifPanel.innerHTML = `
    <div class="stack-sm p-md">
      <h3 class="text-base">Notification preferences</h3>
      <p class="text-muted text-sm">Choose how you receive notifications.</p>
    </div>
  `;
  const securityPanel = document.createElement("pds-tabpanel");
  securityPanel.id = "/settings/security";
  securityPanel.setAttribute("label", "Security");
  securityPanel.innerHTML = `
    <div class="stack-sm p-md">
      <h3 class="text-base">Security</h3>
      <p class="text-muted text-sm">Password, 2FA, and session settings.</p>
    </div>
  `;
  tabstrip.appendChild(general);
  tabstrip.appendChild(membersPanel);
  tabstrip.appendChild(notifPanel);
  tabstrip.appendChild(securityPanel);
  wrap.appendChild(tabstrip);
  const path = (currentPath || "").replace(/^\/+/, "");
  const selectedId = pathToPanelId(path);
  tabstrip.selected = selectedId;
  tabstrip.addEventListener("tabchange", (e2) => {
    const panelId = e2.detail?.newTab;
    if (!panelId || typeof panelId !== "string")
      return;
    const newPath = panelId.startsWith("/") ? panelId.slice(1) : panelId;
    if (newPath && getCurrentPath() !== newPath)
      navigateTo(newPath);
  });
  loadMembersFromCountries(12).then((items) => {
    const ul = membersPanel.querySelector("[data-members]");
    if (!ul)
      return;
    membersPanel.querySelector(".text-muted")?.remove?.();
    for (const m of items) {
      const li = document.createElement("li");
      li.className = "flex gap-sm items-center p-sm surface-subtle radius-base";
      li.innerHTML = `
          <span class="text-sm">${escapeHtml4(m.name ?? "")}</span>
          <span class="badge badge-secondary text-xs">${escapeHtml4(m.role ?? "")}</span>
        `;
      ul.appendChild(li);
    }
  }).catch(() => {
  });
  fadeIn(wrap, { duration: 150 });
  return wrap;
}
function escapeHtml4(s) {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

// src/js/lib/speech.js
var synthesis = null;
function getSynthesis() {
  if (typeof window === "undefined")
    return null;
  if (!synthesis && window.speechSynthesis)
    synthesis = window.speechSynthesis;
  return synthesis;
}
function ensureReady(timeoutMs = 800) {
  const syn = getSynthesis();
  if (!syn)
    return Promise.resolve();
  const voices = syn.getVoices();
  if (voices.length > 0)
    return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => {
      syn.removeEventListener("voiceschanged", done);
      resolve();
    };
    syn.addEventListener("voiceschanged", done);
    setTimeout(done, timeoutMs);
  });
}
function primeSynthesis() {
  const syn = getSynthesis();
  if (!syn)
    return Promise.resolve();
  return new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance("\u200B");
    u.volume = 0;
    u.rate = 10;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    syn.speak(u);
  });
}
function selectVoice(voices, lang) {
  if (!voices.length)
    return null;
  const langPrefix = lang.slice(0, 2);
  const forLang = (v) => v.lang.startsWith(langPrefix) || v.lang.startsWith(lang);
  const defaultForLang = voices.find((v) => forLang(v) && v.default);
  if (defaultForLang)
    return defaultForLang;
  const anyForLang = voices.find(forLang);
  if (anyForLang)
    return anyForLang;
  const systemDefault = voices.find((v) => v.default);
  return systemDefault || voices[0];
}
function speak(text, options = {}) {
  const syn = getSynthesis();
  if (!syn || !text)
    return Promise.resolve();
  const lang = options.lang ?? (document.documentElement.lang || "en-US");
  return ensureReady().then(() => primeSynthesis()).then(() => {
    return new Promise((resolve, reject) => {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = options.rate ?? 1.2;
      u.pitch = options.pitch ?? 1;
      u.volume = options.volume ?? 1;
      u.lang = lang;
      const voices = syn.getVoices();
      const chosen = selectVoice(voices, lang);
      if (chosen)
        u.voice = chosen;
      u.onend = () => resolve();
      u.onerror = (e2) => reject(e2);
      syn.speak(u);
    });
  });
}
function isSpeechSupported() {
  return Boolean(getSynthesis());
}

// src/js/pages/board.js
var COLUMNS = [
  { id: "todo", title: "To do", items: ["Review PR", "Update docs", "Fix bug #42"] },
  { id: "doing", title: "In progress", items: ["Implement feature"] },
  { id: "done", title: "Done", items: ["Setup project", "Design mockups"] }
];
function withViewTransition(update) {
  if (typeof document.startViewTransition === "function") {
    return document.startViewTransition(update).finished;
  }
  update();
  return Promise.resolve();
}
function renderBoard() {
  const wrap = document.createElement("div");
  wrap.className = "stack-lg";
  const header = document.createElement("header");
  header.className = "flex justify-between items-center gap-md";
  header.innerHTML = `
    <h2 class="text-lg">Board</h2>
    <div class="flex gap-sm items-center">
      <button type="button" class="btn-outline btn-sm" id="board-speak-btn" aria-label="Read board aloud">
        <pds-icon icon="microphone" size="sm"></pds-icon>
        <span>Read aloud</span>
      </button>
      <button type="button" class="btn-primary btn-sm" id="board-webauthn-btn">
        Sign in with passkey
      </button>
    </div>
  `;
  wrap.appendChild(header);
  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 md:grid-cols-3 gap-lg";
  grid.setAttribute("data-board", "");
  const state = COLUMNS.map((col) => ({ ...col, items: [...col.items] }));
  function renderColumns() {
    grid.innerHTML = "";
    for (const col of state) {
      const colEl = document.createElement("div");
      colEl.className = "card surface-elevated p-md stack-md";
      colEl.setAttribute("data-column", col.id);
      colEl.setAttribute("droppable", "true");
      const title = document.createElement("h3");
      title.className = "text-base";
      title.textContent = col.title;
      colEl.appendChild(title);
      const list = document.createElement("ul");
      list.className = "stack-sm min-h-[80px]";
      list.style.listStyle = "none";
      list.style.padding = "0";
      list.style.margin = "0";
      for (const text of col.items) {
        const li = document.createElement("li");
        li.className = "card surface-subtle p-sm cursor-grab";
        li.setAttribute("draggable", "true");
        li.setAttribute("data-item", text);
        li.textContent = text;
        list.appendChild(li);
      }
      colEl.appendChild(list);
      grid.appendChild(colEl);
    }
  }
  function wireDragDrop() {
    let dragged = null;
    let sourceColumnId = null;
    grid.querySelectorAll('[draggable="true"]').forEach((el) => {
      el.addEventListener("dragstart", (e2) => {
        dragged = e2.target;
        sourceColumnId = e2.target.closest("[data-column]")?.getAttribute("data-column") ?? null;
        e2.dataTransfer.setData("text/plain", e2.target.getAttribute("data-item") ?? "");
        e2.dataTransfer.effectAllowed = "move";
      });
      el.addEventListener("dragend", () => {
        dragged = null;
        sourceColumnId = null;
      });
    });
    grid.querySelectorAll('[droppable="true"]').forEach((colEl) => {
      colEl.addEventListener("dragover", (e2) => {
        e2.preventDefault();
        e2.dataTransfer.dropEffect = "move";
      });
      colEl.addEventListener("drop", (e2) => {
        e2.preventDefault();
        const text = e2.dataTransfer.getData("text/plain");
        const targetColId = colEl.getAttribute("data-column");
        if (!text || !sourceColumnId || !targetColId)
          return;
        const srcCol = state.find((c) => c.id === sourceColumnId);
        const tgtCol = state.find((c) => c.id === targetColId);
        if (!srcCol || !tgtCol || srcCol.id === tgtCol.id)
          return;
        const idx = srcCol.items.indexOf(text);
        if (idx === -1)
          return;
        withViewTransition(() => {
          srcCol.items.splice(idx, 1);
          tgtCol.items.push(text);
          renderColumns();
          wireDragDrop();
        });
      });
    });
  }
  renderColumns();
  wireDragDrop();
  wrap.appendChild(grid);
  const speakBtn = wrap.querySelector("#board-speak-btn");
  if (speakBtn && isSpeechSupported()) {
    speakBtn.addEventListener("click", async () => {
      const lines = state.map((c) => `${c.title}: ${c.items.join(", ") || "empty"}`);
      const text = lines.join(". ");
      if (!text.trim())
        return;
      speakBtn.classList.add("btn-working");
      try {
        await speak(text);
      } catch (err) {
        if (typeof window.PDS?.toast === "function") {
          window.PDS.toast("Read aloud failed. Check system speech or try again.", { type: "warning" });
        }
      } finally {
        speakBtn.classList.remove("btn-working");
      }
    });
  } else if (speakBtn) {
    speakBtn.disabled = true;
    speakBtn.title = "Speech synthesis not supported";
  }
  const webauthnBtn = wrap.querySelector("#board-webauthn-btn");
  if (webauthnBtn) {
    webauthnBtn.addEventListener("click", () => runWebAuthnDemo(webauthnBtn));
  }
  fadeIn(wrap, { duration: 150 });
  return wrap;
}
async function runWebAuthnDemo(btn) {
  if (!window.PublicKeyCredential) {
    if (typeof window.PDS?.toast === "function") {
      window.PDS.toast("Web Authentication API is not supported in this browser.", { type: "warning" });
    } else {
      alert("Web Authentication API is not supported in this browser.");
    }
    return;
  }
  const orig = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Checking\u2026";
  try {
    const opts = {
      challenge: new Uint8Array(32),
      rp: { name: "PDS Dashboard Demo" },
      user: {
        id: new Uint8Array(16),
        name: "demo@example.com",
        displayName: "Demo User"
      },
      /* ES256 (-7) and RS256 (-257) per Chrome / WebAuthn recommendations */
      pubKeyCredParams: [
        { alg: -7, type: "public-key" },
        { alg: -257, type: "public-key" }
      ],
      timeout: 6e4
    };
    const cred = await navigator.credentials.create({ publicKey: opts });
    if (cred && typeof window.PDS?.toast === "function") {
      window.PDS.toast("Passkey created (demo). In production, verify with your backend.", { type: "success" });
    }
  } catch (err) {
    if (err.name === "NotAllowedError") {
      if (typeof window.PDS?.toast === "function") {
        window.PDS.toast("Passkey creation was cancelled.", { type: "information" });
      }
    } else if (typeof window.PDS?.toast === "function") {
      const msg = err.message || "";
      const isInvalidDomain = /invalid domain|secure context|not a valid/i.test(msg);
      if (isInvalidDomain) {
        window.PDS.toast("Passkeys require a secure context. Use https://localhost:4173 instead of 127.0.0.1.", { type: "warning", duration: 6e3 });
      } else {
        window.PDS.toast("Passkey demo: " + (msg || "unsupported"), { type: "warning" });
      }
    }
  } finally {
    btn.disabled = false;
    btn.textContent = orig;
  }
}

// src/js/pages/login.js
function renderLogin() {
  const wrap = document.createElement("div");
  wrap.className = "login-page";
  wrap.setAttribute("role", "main");
  const section = document.createElement("section");
  section.className = "login-section";
  section.innerHTML = `
    <div class="login-card-wrapper">
      <article class="card surface-elevated p-lg stack-lg login-card">
        <header class="stack-sm">
          <h1 class="text-xl login-title">Sign in</h1>
          <p class="text-muted text-sm">Enter your email and password to continue.</p>
        </header>
        <form class="login-form stack-md" data-required>
          <label class="stack-xs">
            <span class="text-sm">Email</span>
            <input type="email" name="email" required autocomplete="email" placeholder="you@example.com"
              class="w-full p-sm radius-md surface-fieldset-base" />
          </label>
          <label class="stack-xs">
            <span class="text-sm">Password</span>
            <input type="password" name="password" required autocomplete="current-password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              class="w-full p-sm radius-md surface-fieldset-base" />
          </label>
          <div class="flex gap-sm items-center justify-between">
            <a href="#/" class="text-sm link-primary" data-nav-home>Back to dashboard</a>
            <button type="submit" class="btn-primary">Sign in</button>
          </div>
        </form>
        <footer class="text-center text-sm text-muted">
          Don't have an account? <a href="#/login" class="link-primary">Sign up</a>
        </footer>
      </article>
    </div>
  `;
  const form = section.querySelector(".login-form");
  const linkHome = section.querySelector("[data-nav-home]");
  if (form) {
    form.addEventListener("submit", (e2) => {
      e2.preventDefault();
      const fd = new FormData(form);
      const email = fd.get("email");
      const password = fd.get("password");
      if (typeof window.PDS?.toast === "function") {
        window.PDS.toast("Sign in (demo) \u2013 use any email/password.", { type: "information", duration: 3e3 });
      }
      navigateTo("");
    });
  }
  if (linkHome) {
    linkHome.addEventListener("click", (e2) => {
      e2.preventDefault();
      navigateTo("");
    });
  }
  wrap.appendChild(section);
  fadeIn(wrap, { duration: 150 });
  return wrap;
}

// src/js/app.js
document.addEventListener(
  "pds:ready",
  () => {
    if (typeof document.adoptedStyleSheets !== "undefined") {
      fetch("/assets/css/theme-override.css").then((r) => r.text()).then((css) => {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(css);
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
      }).catch(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/assets/css/theme-override.css";
        document.head.appendChild(link);
      });
    } else {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/assets/css/theme-override.css";
      document.head.appendChild(link);
    }
  },
  { once: true }
);
await b.start(config);
var body = document.body;
var { layoutRoot, mainOutlet, updateSidebar, setCommandPaletteDrawer, setNotificationsDrawer, setThemeDrawer, openCommandPalette, openNotifications } = createLayout();
var commandPalette = createCommandPalette();
var notificationsSlideover = createNotificationsSlideover();
setCommandPaletteDrawer(commandPalette);
setNotificationsDrawer(notificationsSlideover);
registerCommandPaletteShortcut(openCommandPalette);
document.addEventListener("keydown", (e2) => {
  if (e2.key === "n" && (e2.metaKey || e2.ctrlKey)) {
    e2.preventDefault();
    openNotifications();
  }
});
body.innerHTML = "";
body.classList.remove("container");
body.classList.add("flex", "flex-col");
var appWrapper = document.createElement("div");
appWrapper.className = "flex flex-col app-wrapper";
body.appendChild(appWrapper);
body.appendChild(commandPalette);
body.appendChild(notificationsSlideover);
var themeDrawer = document.createElement("pds-drawer");
themeDrawer.setAttribute("position", "right");
themeDrawer.innerHTML = `
  <div slot="drawer-header">Theme</div>
  <div slot="drawer-content"><pds-theme></pds-theme></div>
`;
body.appendChild(themeDrawer);
setThemeDrawer(themeDrawer);
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
  void b.toast(`Theme: ${label}`, { type: "information", duration: 2e3 });
});
route("/", () => renderHome());
route("inbox", () => renderInbox());
route("customers", () => renderCustomers());
route("settings", () => renderSettings(getCurrentPath()));
route("settings/members", () => renderSettings(getCurrentPath()));
route("settings/notifications", () => renderSettings(getCurrentPath()));
route("settings/security", () => renderSettings(getCurrentPath()));
route("board", () => renderBoard());
route("login", () => renderLogin());
onNavigate((path) => {
  if (path !== "login")
    updateSidebar(path);
});
function useViewTransition(cb) {
  if (typeof document.startViewTransition === "function") {
    return document.startViewTransition(cb).finished;
  }
  cb();
  return Promise.resolve();
}
initRouter(async (path, pageEl) => {
  const pathNorm = path || "/";
  if (pathNorm === "login") {
    await useViewTransition(() => {
      appWrapper.innerHTML = "";
      appWrapper.appendChild(pageEl);
    });
    return pageEl;
  }
  if (!appWrapper.contains(layoutRoot)) {
    appWrapper.innerHTML = "";
    appWrapper.appendChild(layoutRoot);
  }
  updateSidebar(pathNorm);
  if (!pageEl)
    return null;
  await useViewTransition(() => {
    mainOutlet.innerHTML = "";
    mainOutlet.appendChild(pageEl);
  });
  return pageEl;
});
//# sourceMappingURL=/assets/js/app.js.map
