/**
 * Inbox page: list of mails from /api/mails.json.
 */

import { fadeIn } from "../lib/animations.js";
import { cachedFetch } from "../lib/fetch-cache.js";

export function renderInbox() {
  const wrap = document.createElement("div");
  wrap.className = "stack-md";

  const list = document.createElement("ul");
  list.className = "stack-sm";
  list.style.listStyle = "none";
  list.style.padding = "0";
  list.style.margin = "0";

  const loading = document.createElement("p");
  loading.className = "text-muted";
  loading.textContent = "Loading…";
  wrap.appendChild(loading);
  wrap.appendChild(list);

  cachedFetch("/api/mails.json")
    .then((r) => r.json())
    .then((items) => {
      loading.remove();
      for (const m of items) {
        const li = document.createElement("li");
        li.className = "card surface-elevated p-md";
        const from = m.from?.name ?? "Unknown";
        const subj = m.subject ?? "";
        const date = m.date ? new Date(m.date).toLocaleDateString(undefined, { dateStyle: "short" }) : "";
        li.innerHTML = `
          <div class="flex justify-between items-start gap-sm">
            <strong class="text-sm">${escapeHtml(from)}</strong>
            <span class="text-muted text-xs">${escapeHtml(date)}</span>
          </div>
          <p class="text-sm mt-xs ${m.unread ? "" : "text-muted"}">${escapeHtml(subj)}</p>
        `;
        list.appendChild(li);
      }
    })
    .catch(() => {
      loading.textContent = "Failed to load mails.";
    });

  fadeIn(wrap, { duration: 150 });
  return wrap;
}

function escapeHtml(s) {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}
