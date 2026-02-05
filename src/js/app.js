/**
 * Dashboard app entry: Pure Design System + native browser APIs, no external UI deps.
 * Init order: PDS.start → layout + drawers → register routes → onNavigate → initRouter (single initial apply).
 * Pages are statically imported so the single esbuild bundle works without separate chunk requests.
 */

import { PDS } from "@pure-ds/core";
import { config } from "../../pds.config.js";
import { initRouter, route, onNavigate, getCurrentPath } from "./router.js";
import { createLayout } from "./layout.js";
import { createCommandPalette, registerCommandPaletteShortcut } from "./components/command-palette.js";
import { createNotificationsSlideover } from "./components/notifications-slideover.js";
import { renderHome } from "./pages/home.js";
import { renderInbox } from "./pages/inbox.js";
import { renderCustomers } from "./pages/customers.js";
import { renderSettings } from "./pages/settings.js";
import { renderBoard } from "./pages/board.js";
import { renderLogin } from "./pages/login.js";

// Theme override after PDS: PDS uses @layer (tokens, primitives, components, utilities) and
// constructed stylesheets (adoptedStyleSheets). Unlayered styles override layered ones (MDN).
// We inject on pds:ready (https://puredesignsystem.z6.web.core.windows.net/storybook/?path=/docs/pds-pds-object--docs)
// and use adoptedStyleSheets so our override comes last and wins over PDS layers.
document.addEventListener(
  "pds:ready",
  () => {
    if (typeof document.adoptedStyleSheets !== "undefined") {
      fetch("/assets/css/theme-override.css")
        .then((r) => r.text())
        .then((css) => {
          const sheet = new CSSStyleSheet();
          sheet.replaceSync(css);
          document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
        })
        .catch(() => {
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

await PDS.start(config);

const body = document.body;

const { layoutRoot, mainOutlet, updateSidebar, setCommandPaletteDrawer, setNotificationsDrawer, setThemeDrawer, openCommandPalette, openNotifications } = createLayout();

const commandPalette = createCommandPalette();
const notificationsSlideover = createNotificationsSlideover();
setCommandPaletteDrawer(commandPalette);
setNotificationsDrawer(notificationsSlideover);

registerCommandPaletteShortcut(openCommandPalette);

document.addEventListener("keydown", (e) => {
  if (e.key === "n" && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    openNotifications();
  }
});

body.innerHTML = "";
body.classList.remove("container");
body.classList.add("flex", "flex-col");

const appWrapper = document.createElement("div");
appWrapper.className = "flex flex-col app-wrapper";
body.appendChild(appWrapper);
body.appendChild(commandPalette);
body.appendChild(notificationsSlideover);

const themeDrawer = document.createElement("pds-drawer");
themeDrawer.setAttribute("position", "right");
themeDrawer.innerHTML = `
  <div slot="drawer-header">Theme</div>
  <div slot="drawer-content"><pds-theme></pds-theme></div>
`;
body.appendChild(themeDrawer);
setThemeDrawer(themeDrawer);

const THEME_LABELS = new Map([
  ["system", "System"],
  ["light", "Light"],
  ["dark", "Dark"],
]);

PDS.addEventListener("pds:theme:changed", (event) => {
  const { detail } = event ?? {};
  if (detail?.source !== "api") return;
  const theme = detail?.theme;
  if (!theme || typeof PDS.toast !== "function") return;
  const label = THEME_LABELS.get(theme) ?? theme.charAt(0).toUpperCase() + theme.slice(1);
  void PDS.toast(`Theme: ${label}`, { type: "information", duration: 2000 });
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
  if (path !== "login") updateSidebar(path);
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

  if (!pageEl) return null;
  await useViewTransition(() => {
    mainOutlet.innerHTML = "";
    mainOutlet.appendChild(pageEl);
  });
  return pageEl;
});
