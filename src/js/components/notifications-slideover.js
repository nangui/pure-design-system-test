/**
 * Notifications slideover: pds-drawer with list from /api/notifications.json.
 */

import { cachedFetch } from "../lib/fetch-cache.js";

/**
 * @param {() => void} onClose - Called when drawer is closed (e.g. to update badge)
 * @returns {Promise<HTMLElement>} The pds-drawer element
 */
export function createNotificationsSlideover(onClose) {
  const drawer = document.createElement("pds-drawer");
  drawer.setAttribute("position", "right");

  const header = document.createElement("div");
  header.setAttribute("slot", "drawer-header");
  header.className = "flex justify-between items-center";
  header.innerHTML = "<h2 class=\"text-base\">Notifications</h2>";

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
      const body = n.body ?? "";
      const date = n.date ? new Date(n.date).toLocaleDateString(undefined, { dateStyle: "short" }) : "";
      li.innerHTML = `
        <div class="flex justify-between items-start gap-sm">
          <strong class="text-sm">${escapeHtml(name)}</strong>
          <span class="text-muted text-xs">${escapeHtml(date)}</span>
        </div>
        <p class="text-sm text-muted mt-xs">${escapeHtml(body)}</p>
      `;
      list.appendChild(li);
    }
  }

  content.appendChild(list);
  drawer.appendChild(header);
  drawer.appendChild(content);

  cachedFetch("/api/notifications.json")
    .then((r) => r.ok ? r.json() : [])
    .then(renderNotifications)
    .catch(() => renderNotifications([]));

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
