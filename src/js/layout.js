/**
 * Dashboard layout: sidebar nav + main outlet.
 * Uses PDS primitives and pds-drawer for command palette and notifications.
 */

import { navigateTo } from "./router.js";

const SETTINGS_EXPANDED_KEY = "dashboard-settings-expanded";

const NAV_ITEMS = [
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
      { path: "settings/security", label: "Security" },
    ],
  },
];

/**
 * @param {string} path - Route path (e.g. 'settings', 'settings/members')
 * @param {string} current - Current path
 * @returns {string} 'surface-subtle' when active, else ''
 */
function navClass(path, current) {
  const c = (current || "").replace(/\/$/, "");
  const t = (path || "").replace(/\/$/, "");
  if (c === t) return "surface-subtle";
  if (t && !t.includes("/") && (c === t || c.startsWith(t + "/"))) return "surface-subtle";
  return "";
}

/**
 * Get or set Settings submenu expanded state (persisted in sessionStorage).
 * @param {string} currentPath - Current route; if under settings, default expanded to true.
 * @param {boolean} [toggle] - If set, flip the stored value and return it.
 * @returns {boolean}
 */
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
    if (stored === null) return defaultExpanded;
    return stored !== "0" && stored !== "false";
  } catch {
    return defaultExpanded;
  }
}

/**
 * Build sidebar nav (semantic nav + PDS classes). Settings has collapsible submenu.
 * @param {string} currentPath
 * @returns {HTMLElement}
 */
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
        subA.addEventListener("click", (e) => {
          e.preventDefault();
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
      a.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo(item.path);
      });
      li.appendChild(a);
    }
    list.appendChild(li);
  }

  nav.appendChild(list);
  return nav;
}

/**
 * Build toolbar (title + actions: search, notifications, theme).
 * @param {{ title: string, onSearch: () => void, onNotifications: () => void, onTheme: () => void }}
 * @returns {HTMLElement}
 */
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
  searchBtn.innerHTML = "<pds-icon icon=\"magnifying-glass\" size=\"xs\"></pds-icon>";
  searchBtn.addEventListener("click", () => onSearch?.());

  const notifBtn = document.createElement("button");
  notifBtn.type = "button";
  notifBtn.className = "btn-outline icon-only dashboard-toolbar-btn";
  notifBtn.setAttribute("aria-label", "Notifications");
  notifBtn.innerHTML = "<pds-icon icon=\"bell\" size=\"xs\"></pds-icon>";
  notifBtn.addEventListener("click", () => onNotifications?.());

  const themeBtn = document.createElement("button");
  themeBtn.type = "button";
  themeBtn.className = "btn-outline icon-only dashboard-toolbar-btn";
  themeBtn.setAttribute("aria-label", "Theme");
  themeBtn.innerHTML = "<pds-icon icon=\"palette\" size=\"xs\"></pds-icon>";
  themeBtn.addEventListener("click", () => onTheme?.());

  actions.append(searchBtn, notifBtn, themeBtn);
  header.appendChild(actions);
  return header;
}

/**
 * Create and return the full layout and outlet refs.
 * @returns {{ layoutRoot: HTMLElement, mainOutlet: HTMLElement, updateSidebar: (path: string) => void, openCommandPalette: () => void, openNotifications: () => void }}
 */
export function createLayout() {
  const layoutRoot = document.createElement("div");
  layoutRoot.className = "flex gap-0 dashboard-layout";

  const sidebar = document.createElement("aside");
  sidebar.className = "surface-elevated";
  sidebar.setAttribute("aria-label", "Sidebar");
  const sidebarContent = buildSidebar("");
  sidebar.appendChild(sidebarContent);

  const content = document.createElement("div");
  content.className = "grow flex flex-col dashboard-content";

  let themeDrawerRef = null;
  function openTheme() {
    if (!themeDrawerRef) return;
    themeDrawerRef.open = true;
    themeDrawerRef.setAttribute("open", "");
  }

  let commandPaletteDrawer = null;
  let notificationsDrawer = null;
  function openCommandPalette() {
    const drawer = commandPaletteDrawer;
    if (!drawer) return;
    if (typeof drawer.openDrawer === "function") drawer.openDrawer();
    else { drawer.open = true; drawer.setAttribute("open", ""); }
  }
  function openNotifications() {
    const drawer = notificationsDrawer;
    if (!drawer) return;
    if (typeof drawer.openDrawer === "function") drawer.openDrawer();
    else { drawer.open = true; drawer.setAttribute("open", ""); }
  }

  const toolbar = buildToolbar({
    title: "Home",
    onSearch: openCommandPalette,
    onNotifications: openNotifications,
    onTheme: openTheme,
  });
  content.appendChild(toolbar);

  const mainOutlet = document.createElement("main");
  mainOutlet.className = "grow p-md";
  mainOutlet.setAttribute("role", "main");
  content.appendChild(mainOutlet);

  layoutRoot.appendChild(sidebar);
  layoutRoot.appendChild(content);

  function updateToolbarTitle(title) {
    const t = layoutRoot.querySelector("header h1");
    if (t) t.textContent = title;
  }

  function updateSidebar(path) {
    const next = buildSidebar(path);
    sidebar.replaceChildren(next);
    const labels = { "": "Home", inbox: "Inbox", customers: "Customers", board: "Board", settings: "Settings" };
    const first = (path || "").split("/")[0];
    updateToolbarTitle(labels[first] || first || "Home");
  }

  return {
    layoutRoot,
    mainOutlet,
    sidebar,
    updateSidebar,
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
    openCommandPalette,
    openNotifications,
  };
}
