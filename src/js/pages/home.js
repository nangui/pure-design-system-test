/**
 * Home page: stats cards + vanilla line chart (sales).
 */

import { drawLineChart, setupLineChartHover } from "../lib/chart.js";
import { fadeIn } from "../lib/animations.js";
import { cachedFetch } from "../lib/fetch-cache.js";

export function renderHome() {
  const wrap = document.createElement("div");
  wrap.className = "stack-lg";

  const stats = document.createElement("div");
  stats.className = "grid grid-cols-1 md:grid-cols-3 gap-md";
  stats.innerHTML = `
    <article class="card surface-elevated p-md">
      <p class="text-muted text-sm">Revenue</p>
      <p class="text-xl" data-stat="revenue">—</p>
    </article>
    <article class="card surface-elevated p-md">
      <p class="text-muted text-sm">Orders</p>
      <p class="text-xl" data-stat="orders">—</p>
    </article>
    <article class="card surface-elevated p-md">
      <p class="text-muted text-sm">Conversion</p>
      <p class="text-xl" data-stat="conversion">—</p>
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
    cachedFetch("/api/stats.json")
      .then((r) => r.json())
      .then((data) => {
        const tot = data.totals || {};
        const rev = wrap.querySelector("[data-stat=\"revenue\"]");
        const ord = wrap.querySelector("[data-stat=\"orders\"]");
        const conv = wrap.querySelector("[data-stat=\"conversion\"]");
        if (rev) rev.textContent = tot.revenue != null ? `$${Number(tot.revenue).toLocaleString()}` : "—";
        if (ord) ord.textContent = tot.orders != null ? String(tot.orders) : "—";
        if (conv) conv.textContent = tot.conversion != null ? `${tot.conversion}%` : "—";

        const sales = data.sales || [];
        const values = sales.map((s) => s.amount ?? 0);
        if (values.length) {
          requestAnimationFrame(() => {
            drawLineChart(canvas, { values, fill: true });
            setupLineChartHover(canvas, values, {
              formatValue: (v) => `$${Number(v).toLocaleString()}`,
            });
          });
        }
      })
      .catch(() => {});
  }
  drawChart();

  fadeIn(wrap, { duration: 150 });
  return wrap;
}
