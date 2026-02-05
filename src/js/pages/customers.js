/**
 * Customers page: table built from countries-data (African names).
 */

import { fadeIn } from "../lib/animations.js";
import { loadCustomersFromCountries } from "../lib/countries-data.js";

export function renderCustomers() {
  const wrap = document.createElement("div");
  wrap.className = "stack-md";

  const loading = document.createElement("p");
  loading.className = "text-muted";
  loading.textContent = "Loading…";
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

  loadCustomersFromCountries(4)
    .then((items) => {
      loading.remove();
      const tbody = table.querySelector("tbody");
      for (const c of items) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${escapeHtml(c.name ?? "")}</td>
          <td>${escapeHtml(c.email ?? "")}</td>
          <td><span class="badge badge-${statusClass(c.status)}">${escapeHtml(c.status ?? "")}</span></td>
          <td>${escapeHtml(c.location ?? "")}</td>
        `;
        tbody.appendChild(tr);
      }
    })
    .catch(() => {
      loading.textContent = "Failed to load customers.";
    });

  fadeIn(wrap, { duration: 150 });
  return wrap;
}

function statusClass(s) {
  if (s === "subscribed") return "success";
  if (s === "unsubscribed") return "secondary";
  if (s === "bounced") return "danger";
  return "secondary";
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
