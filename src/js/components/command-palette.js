/**
 * Command palette: pds-drawer with search input and list of navigation links.
 * Opens with Ctrl+K / Cmd+K.
 */

import { navigateTo } from "../router.js";

const COMMANDS = [
  { path: "", label: "Home", icon: "house" },
  { path: "inbox", label: "Inbox", icon: "envelope" },
  { path: "customers", label: "Customers", icon: "users" },
  { path: "board", label: "Board", icon: "grid-four" },
  { path: "settings", label: "Settings", icon: "gear" },
];

/**
 * @returns {Promise<HTMLElement>} The pds-drawer element (caller appends to body and wires open)
 */
export function createCommandPalette() {
  const drawer = document.createElement("pds-drawer");
  drawer.setAttribute("position", "right");

  const header = document.createElement("div");
  header.setAttribute("slot", "drawer-header");
  header.className = "flex items-center gap-sm";
  const input = document.createElement("input");
  input.type = "search";
  input.placeholder = "Search or jump to…";
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
    const items = q
      ? COMMANDS.filter((c) => c.label.toLowerCase().includes(q) || c.path.toLowerCase().includes(q))
      : COMMANDS;
    list.innerHTML = "";
    for (const cmd of items) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#/${cmd.path}`;
      a.className = "flex gap-sm items-center p-sm radius-base surface-subtle";
      a.innerHTML = `<pds-icon icon="${cmd.icon}" size="sm"></pds-icon><span>${cmd.label}</span>`;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo(cmd.path);
        drawer.open = false;
      });
      li.appendChild(a);
      list.appendChild(li);
    }
  }

  renderItems();

  input.addEventListener("input", () => renderItems(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") drawer.open = false;
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

/**
 * Register Ctrl+K / Cmd+K to open command palette.
 * @param {() => void} open - Callback to open the palette
 */
export function registerCommandPaletteShortcut(open) {
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      open();
    }
  });
}
