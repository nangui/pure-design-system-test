/**
 * Login page: NuxtUI-style layout with PDS components.
 * Centered card, email/password form, primary submit, sign-up link.
 */

import { navigateTo } from "../router.js";
import { fadeIn } from "../lib/animations.js";

export function renderLogin() {
  const wrap = document.createElement("div");
  wrap.className = "login-page";
  wrap.setAttribute("role", "main");

  const section = document.createElement("section");
  section.className = "login-section";
  section.innerHTML = `
    <div class="login-card-wrapper">
      <article class="card surface-elevated p-lg stack-lg login-card">
        <header class="stack-sm">
          <h1 class="text-xl login-title">Sign in</h1>
          <p class="text-muted text-sm">Enter your email and password to continue.</p>
        </header>
        <form class="login-form stack-md" data-required>
          <label class="stack-xs">
            <span class="text-sm">Email</span>
            <input type="email" name="email" required autocomplete="email" placeholder="you@example.com"
              class="w-full p-sm radius-md surface-fieldset-base" />
          </label>
          <label class="stack-xs">
            <span class="text-sm">Password</span>
            <input type="password" name="password" required autocomplete="current-password" placeholder="••••••••"
              class="w-full p-sm radius-md surface-fieldset-base" />
          </label>
          <div class="flex gap-sm items-center justify-between">
            <a href="#/" class="text-sm link-primary" data-nav-home>Back to dashboard</a>
            <button type="submit" class="btn-primary">Sign in</button>
          </div>
        </form>
        <footer class="text-center text-sm text-muted">
          Don't have an account? <a href="#/login" class="link-primary">Sign up</a>
        </footer>
      </article>
    </div>
  `;

  const form = section.querySelector(".login-form");
  const linkHome = section.querySelector("[data-nav-home]");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const email = fd.get("email");
      const password = fd.get("password");
      if (typeof window.PDS?.toast === "function") {
        window.PDS.toast("Sign in (demo) – use any email/password.", { type: "information", duration: 3000 });
      }
      navigateTo("");
    });
  }

  if (linkHome) {
    linkHome.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("");
    });
  }

  wrap.appendChild(section);
  fadeIn(wrap, { duration: 150 });
  return wrap;
}
