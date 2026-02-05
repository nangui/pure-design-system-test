/**
 * Vanilla canvas line/bar chart for dashboard stats.
 * Uses only Canvas 2D API; follows MDN pattern for high-DPI and correct sizing.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
 */

const DEFAULT_CHART_WIDTH = 600;
const DEFAULT_CHART_HEIGHT = 240;
const PADDING = { top: 16, right: 16, bottom: 24, left: 40 };

/** Resolve a CSS variable to a usable color for canvas (canvas does not resolve var()). */
function resolveColor(canvas, token, fallback) {
  try {
    const root = canvas.ownerDocument?.documentElement || document.documentElement;
    const value = getComputedStyle(root).getPropertyValue(token.replace("var(", "").replace(")", "").trim());
    if (value) return value.trim();
  } catch {}
  return fallback;
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ values: number[], labels?: string[], color?: string, fill?: boolean }} options
 */
export function drawLineChart(canvas, options) {
  const { values = [], labels = [], color, fill = true } = options;
  if (values.length === 0) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width > 0 ? rect.width : DEFAULT_CHART_WIDTH;
  const height = rect.height > 0 ? rect.height : DEFAULT_CHART_HEIGHT;

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.scale(dpr, dpr);

  const chartW = width - PADDING.left - PADDING.right;
  const chartH = height - PADDING.top - PADDING.bottom;
  if (chartW <= 0 || chartH <= 0) return;

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
    y: chartH - ((v - min) / range) * chartH,
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

/**
 * Setup hover on a line chart: tooltip with value + optional Web Animations on container.
 * Call after drawLineChart. Tooltip is created as sibling after canvas.
 * @param {HTMLCanvasElement} canvas
 * @param {number[]} values
 * @param {{ formatValue?: (v: number) => string }} [opts]
 */
export function setupLineChartHover(canvas, values, opts = {}) {
  if (!values.length) return;
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

  canvas.addEventListener("mousemove", (e) => {
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left - PADDING.left;
    const i = Math.round(x / stepX);
    const idx = Math.max(0, Math.min(i, values.length - 1));
    const v = values[idx];
    show(e.clientX, e.clientY, formatValue(v));
  });
  canvas.addEventListener("mouseleave", hide);
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ values: number[], labels?: string[], color?: string }} options
 */
export function drawBarChart(canvas, options) {
  const { values = [], labels = [], color } = options;
  if (values.length === 0) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width > 0 ? rect.width : DEFAULT_CHART_WIDTH;
  const height = rect.height > 0 ? rect.height : DEFAULT_CHART_HEIGHT;

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.scale(dpr, dpr);

  const barPadding = { top: 16, right: 16, bottom: 28, left: 32 };
  const chartW = width - barPadding.left - barPadding.right;
  const chartH = height - barPadding.top - barPadding.bottom;
  if (chartW <= 0 || chartH <= 0) return;

  const max = Math.max(...values, 1);
  const barW = (chartW / values.length) * 0.7;
  const gap = (chartW / values.length) * 0.3;
  const primary = color || resolveColor(canvas, "--color-primary-500", "#0e7490");

  ctx.save();
  ctx.translate(barPadding.left, barPadding.top);

  values.forEach((v, i) => {
    const x = i * (barW + gap) + gap / 2;
    const barH = (v / max) * chartH;
    const y = chartH - barH;
    ctx.fillStyle = primary;
    ctx.fillRect(x, y, barW, barH);
  });

  ctx.restore();
}
