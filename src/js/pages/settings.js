/**
 * Settings page: pds-tabstrip with General, Members, Notifications, Security.
 * Members are built from countries-data (African names).
 * Panel ids match router hash (#/settings, #/settings/members) so tabstrip does not overwrite URL.
 */

import { fadeIn } from "../lib/animations.js";
import { loadMembersFromCountries } from "../lib/countries-data.js";
import { navigateTo, getCurrentPath } from "../router.js";

/** Panel ids must equal location.hash.slice(1) so pds-tabstrip sync does not replace URL. */
const TAB_PANEL_IDS = ["/settings", "/settings/members", "/settings/notifications", "/settings/security"];
const TAB_PATHS = ["settings", "settings/members", "settings/notifications", "settings/security"];

function pathToPanelId(path) {
  const p = (path || "settings").replace(/^\/+/, "");
  const idx = TAB_PATHS.indexOf(p);
  return idx >= 0 ? TAB_PANEL_IDS[idx] : TAB_PANEL_IDS[0];
}

export function renderSettings(currentPath) {
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
  membersPanel.innerHTML = `<div class="p-md"><p class="text-muted">Loading members…</p><ul class="stack-xs list-unstyled" data-members></ul></div>`;

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

  tabstrip.addEventListener("tabchange", (e) => {
    const panelId = e.detail?.newTab;
    if (!panelId || typeof panelId !== "string") return;
    const newPath = panelId.startsWith("/") ? panelId.slice(1) : panelId;
    if (newPath && getCurrentPath() !== newPath) navigateTo(newPath);
  });

  loadMembersFromCountries(12)
    .then((items) => {
      const ul = membersPanel.querySelector("[data-members]");
      if (!ul) return;
      membersPanel.querySelector(".text-muted")?.remove?.();
      for (const m of items) {
        const li = document.createElement("li");
        li.className = "flex gap-sm items-center p-sm surface-subtle radius-base";
        li.innerHTML = `
          <span class="text-sm">${escapeHtml(m.name ?? "")}</span>
          <span class="badge badge-secondary text-xs">${escapeHtml(m.role ?? "")}</span>
        `;
        ul.appendChild(li);
      }
    })
    .catch(() => {});

  fadeIn(wrap, { duration: 150 });
  return wrap;
}

function escapeHtml(s) {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}
