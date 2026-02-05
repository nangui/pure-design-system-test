/**
 * Client router using Navigation API (with hash fallback).
 * Routes are hash-based: #/, #/inbox, #/customers, #/settings, #/board, etc.
 */

const HASH_PREFIX = "#/";

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

/** @type {Map<string, () => Promise<HTMLElement> | HTMLElement>} */
const routeHandlers = new Map();

/** @type {(path: string) => void} */
let onNavigateCallback = null;

/** Last path we applied; avoids re-running apply for same path (prevents loops). */
let lastAppliedPath = null;

/**
 * @param {string} path - Route path (e.g. '', 'inbox', 'settings/members')
 * @param {() => Promise<HTMLElement> | HTMLElement} handler - Returns the page root element
 */
export function route(path, handler) {
  const key = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  routeHandlers.set(key, handler);
  const noSlash = path.replace(/^\/+/, "") || "/";
  if (noSlash !== key) routeHandlers.set(noSlash, handler);
}

/**
 * Navigate to path. Uses Navigation API if available, else hash.
 * @param {string} path - Path without leading slash (e.g. 'inbox', 'board')
 */
export function navigateTo(path) {
  const normalized = path ? (path.startsWith("/") ? path.slice(1) : path) : "";
  const hash = normalized ? `${HASH_PREFIX}${normalized}` : HASH_PREFIX;
  if (typeof globalThis.navigation !== "undefined" && globalThis.navigation.navigate) {
    globalThis.navigation.navigate(location.pathname + location.search + hash, {
      history: "push",
    });
  } else {
    location.hash = hash;
  }
}

/**
 * @returns {string} Current route path (e.g. 'inbox', 'settings/members')
 */
export function getCurrentPath() {
  return getPathFromHash();
}

/**
 * Resolve handler for path. Supports one segment (e.g. 'settings') and sub-paths (e.g. 'settings/members').
 * @param {string} path
 * @returns {(() => Promise<HTMLElement> | HTMLElement) | null}
 */
function resolveHandler(path) {
  const normalized = path ? `/${path}` : "/";
  if (routeHandlers.has(normalized)) return routeHandlers.get(normalized);
  const parts = path.split("/").filter(Boolean);
  for (let i = parts.length; i >= 0; i--) {
    const tryPath = i === 0 ? "/" : `/${parts.slice(0, i).join("/")}`;
    if (routeHandlers.has(tryPath)) return routeHandlers.get(tryPath);
  }
  return routeHandlers.get("/") || null;
}

/**
 * @param {(path: string) => void} cb - Called on each navigation with the new path
 */
export function onNavigate(cb) {
  onNavigateCallback = cb;
}

async function handleNavigation(path) {
  const handler = resolveHandler(path);
  if (onNavigateCallback) onNavigateCallback(path);
  if (handler) {
    const out = handler();
    return out instanceof Promise ? out : Promise.resolve(out);
  }
  return null;
}

/**
 * Initialize router: listen to Navigation API or hashchange and call handler.
 * Skips apply when the path is unchanged to avoid re-render loops (e.g. replaceState from tabstrip).
 * @param {(path: string) => Promise<HTMLElement | null>} render - Receives path, returns page element to render
 */
export function initRouter(render) {
  async function apply(path) {
    const pathNorm = (path || "").replace(/^\/+/, "").trim();
    if (lastAppliedPath === pathNorm) return null;
    lastAppliedPath = pathNorm;

    const el = await handleNavigation(pathNorm);
    const root = typeof render === "function" ? await render(pathNorm, el) : null;
    return root !== undefined ? root : el;
  }

  if (typeof globalThis.navigation !== "undefined" && globalThis.navigation.addEventListener) {
    globalThis.navigation.addEventListener("navigate", (event) => {
      if (!event.canIntercept) return;
      const path = getPathFromUrl(event.destination.url);
      event.intercept({
        handler: () => apply(path),
      });
    });
  }

  window.addEventListener("hashchange", () => {
    apply(getPathFromHash());
  });

  return apply(getPathFromHash());
}
