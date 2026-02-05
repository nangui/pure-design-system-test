/**
 * Board page: kanban-style columns with HTML Drag and Drop API,
 * View Transitions API for smooth moves, and Web Authn (passkey) demo.
 */

import { fadeIn } from "../lib/animations.js";
import { speak, isSpeechSupported } from "../lib/speech.js";

const COLUMNS = [
  { id: "todo", title: "To do", items: ["Review PR", "Update docs", "Fix bug #42"] },
  { id: "doing", title: "In progress", items: ["Implement feature"] },
  { id: "done", title: "Done", items: ["Setup project", "Design mockups"] },
];

/**
 * Start a view transition if supported.
 * @param {() => void} update - Sync callback that updates DOM
 * @returns {Promise<void>}
 */
function withViewTransition(update) {
  if (typeof document.startViewTransition === "function") {
    return document.startViewTransition(update).finished;
  }
  update();
  return Promise.resolve();
}

export function renderBoard() {
  const wrap = document.createElement("div");
  wrap.className = "stack-lg";

  const header = document.createElement("header");
  header.className = "flex justify-between items-center gap-md";
  header.innerHTML = `
    <h2 class="text-lg">Board</h2>
    <div class="flex gap-sm items-center">
      <button type="button" class="btn-outline btn-sm" id="board-speak-btn" aria-label="Read board aloud">
        <pds-icon icon="microphone" size="sm"></pds-icon>
        <span>Read aloud</span>
      </button>
      <button type="button" class="btn-primary btn-sm" id="board-webauthn-btn">
        Sign in with passkey
      </button>
    </div>
  `;
  wrap.appendChild(header);

  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 md:grid-cols-3 gap-lg";
  grid.setAttribute("data-board", "");

  const state = COLUMNS.map((col) => ({ ...col, items: [...col.items] }));

  function renderColumns() {
    grid.innerHTML = "";
    for (const col of state) {
      const colEl = document.createElement("div");
      colEl.className = "card surface-elevated p-md stack-md";
      colEl.setAttribute("data-column", col.id);
      colEl.setAttribute("droppable", "true");

      const title = document.createElement("h3");
      title.className = "text-base";
      title.textContent = col.title;
      colEl.appendChild(title);

      const list = document.createElement("ul");
      list.className = "stack-sm min-h-[80px]";
      list.style.listStyle = "none";
      list.style.padding = "0";
      list.style.margin = "0";

      for (const text of col.items) {
        const li = document.createElement("li");
        li.className = "card surface-subtle p-sm cursor-grab";
        li.setAttribute("draggable", "true");
        li.setAttribute("data-item", text);
        li.textContent = text;
        list.appendChild(li);
      }

      colEl.appendChild(list);
      grid.appendChild(colEl);
    }
  }

  function wireDragDrop() {
    let dragged = null;
    let sourceColumnId = null;

    grid.querySelectorAll("[draggable=\"true\"]").forEach((el) => {
      el.addEventListener("dragstart", (e) => {
        dragged = e.target;
        sourceColumnId = e.target.closest("[data-column]")?.getAttribute("data-column") ?? null;
        e.dataTransfer.setData("text/plain", e.target.getAttribute("data-item") ?? "");
        e.dataTransfer.effectAllowed = "move";
      });
      el.addEventListener("dragend", () => {
        dragged = null;
        sourceColumnId = null;
      });
    });

    grid.querySelectorAll("[droppable=\"true\"]").forEach((colEl) => {
      colEl.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      });
      colEl.addEventListener("drop", (e) => {
        e.preventDefault();
        const text = e.dataTransfer.getData("text/plain");
        const targetColId = colEl.getAttribute("data-column");
        if (!text || !sourceColumnId || !targetColId) return;

        const srcCol = state.find((c) => c.id === sourceColumnId);
        const tgtCol = state.find((c) => c.id === targetColId);
        if (!srcCol || !tgtCol || srcCol.id === tgtCol.id) return;

        const idx = srcCol.items.indexOf(text);
        if (idx === -1) return;

        withViewTransition(() => {
          srcCol.items.splice(idx, 1);
          tgtCol.items.push(text);
          renderColumns();
          wireDragDrop();
        });
      });
    });
  }

  renderColumns();
  wireDragDrop();

  wrap.appendChild(grid);

  const speakBtn = wrap.querySelector("#board-speak-btn");
  if (speakBtn && isSpeechSupported()) {
    speakBtn.addEventListener("click", async () => {
      const lines = state.map((c) => `${c.title}: ${c.items.join(", ") || "empty"}`);
      const text = lines.join(". ");
      if (!text.trim()) return;
      speakBtn.classList.add("btn-working");
      try {
        await speak(text);
      } catch (err) {
        if (typeof window.PDS?.toast === "function") {
          window.PDS.toast("Read aloud failed. Check system speech or try again.", { type: "warning" });
        }
      } finally {
        speakBtn.classList.remove("btn-working");
      }
    });
  } else if (speakBtn) {
    speakBtn.disabled = true;
    speakBtn.title = "Speech synthesis not supported";
  }

  const webauthnBtn = wrap.querySelector("#board-webauthn-btn");
  if (webauthnBtn) {
    webauthnBtn.addEventListener("click", () => runWebAuthnDemo(webauthnBtn));
  }

  fadeIn(wrap, { duration: 150 });
  return wrap;
}

/**
 * Web Authentication API demo: conditional UI / getCredential.
 * @param {HTMLButtonElement} btn
 */
async function runWebAuthnDemo(btn) {
  if (!window.PublicKeyCredential) {
    if (typeof window.PDS?.toast === "function") {
      window.PDS.toast("Web Authentication API is not supported in this browser.", { type: "warning" });
    } else {
      alert("Web Authentication API is not supported in this browser.");
    }
    return;
  }

  const orig = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Checking…";

  try {
    const opts = {
      challenge: new Uint8Array(32),
      rp: { name: "PDS Dashboard Demo" },
      user: {
        id: new Uint8Array(16),
        name: "demo@example.com",
        displayName: "Demo User",
      },
      /* ES256 (-7) and RS256 (-257) per Chrome / WebAuthn recommendations */
      pubKeyCredParams: [
        { alg: -7, type: "public-key" },
        { alg: -257, type: "public-key" },
      ],
      timeout: 60000,
    };

    const cred = await navigator.credentials.create({ publicKey: opts });
    if (cred && typeof window.PDS?.toast === "function") {
      window.PDS.toast("Passkey created (demo). In production, verify with your backend.", { type: "success" });
    }
  } catch (err) {
    if (err.name === "NotAllowedError") {
      if (typeof window.PDS?.toast === "function") {
        window.PDS.toast("Passkey creation was cancelled.", { type: "information" });
      }
    } else if (typeof window.PDS?.toast === "function") {
      const msg = err.message || "";
      const isInvalidDomain = /invalid domain|secure context|not a valid/i.test(msg);
      if (isInvalidDomain) {
        window.PDS.toast("Passkeys require a secure context. Use https://localhost:4173 instead of 127.0.0.1.", { type: "warning", duration: 6000 });
      } else {
        window.PDS.toast("Passkey demo: " + (msg || "unsupported"), { type: "warning" });
      }
    }
  } finally {
    btn.disabled = false;
    btn.textContent = orig;
  }
}
