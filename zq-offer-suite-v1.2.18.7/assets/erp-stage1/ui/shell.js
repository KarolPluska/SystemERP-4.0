import { NAV_SECTIONS, ROLE_META } from "../data/domain.js";
import { escapeHtml } from "./components.js";

function renderNav(activePath) {
  return NAV_SECTIONS.map((section) => {
    const links = section.links
      .map((link) => {
        const isActive = activePath === link.path || (activePath.startsWith(`${link.path}/`) && link.path !== "/dashboard");
        const activeClass = isActive ? "is-active" : "";
        return `
          <button class="zgs-nav-link ${activeClass}" type="button" data-nav="${link.path}">
            <span>${escapeHtml(link.label)}</span>
          </button>
        `;
      })
      .join("");

    return `
      <section class="zgs-nav-group">
        <h3>${escapeHtml(section.label)}</h3>
        <div class="zgs-nav-list">${links}</div>
      </section>
    `;
  }).join("");
}

function renderViewMode(mode) {
  const options = [
    { key: "auto", label: "Auto" },
    { key: "desktop", label: "Desktop" },
    { key: "mobile", label: "Mobile" },
  ];

  return options
    .map((item) => {
      const selected = item.key === mode ? "is-selected" : "";
      return `
        <button
          type="button"
          class="zgs-chip ${selected}"
          data-action="set-view-mode"
          data-mode="${item.key}"
          aria-pressed="${item.key === mode ? "true" : "false"}"
        >
          ${escapeHtml(item.label)}
        </button>
      `;
    })
    .join("");
}

function renderToasts(toasts) {
  if (!Array.isArray(toasts) || !toasts.length) {
    return "";
  }
  return `
    <aside class="zgs-toasts" aria-live="polite">
      ${toasts
        .map(
          (toast) => `
            <article class="zgs-toast zgs-toast--${escapeHtml(toast.tone || "info")}">
              <p>${escapeHtml(toast.message || "")}</p>
            </article>
          `
        )
        .join("")}
    </aside>
  `;
}

export function renderShell({ state, route, content }) {
  const activeAccount = state.data.accounts.find((account) => account.id === state.session.activeAccountId) || null;
  const actor = state.data.accounts.find((account) => account.id === state.session.actorAccountId) || null;
  const roleMeta = activeAccount ? ROLE_META[activeAccount.role] : null;

  return `
    <div class="zgs-shell">
      <aside class="zgs-sidebar" aria-label="Nawigacja główna">
        <div class="zgs-logo-block">
          <p class="zgs-logo-kicker">System ERP</p>
          <h1>ZEGGER Ops</h1>
          <p>Blueprint Stage 1</p>
        </div>
        ${renderNav(route.path)}
      </aside>

      <div class="zgs-main-wrap">
        <header class="zgs-topbar">
          <div class="zgs-topbar-left">
            <button type="button" class="zgs-chip zgs-chip--ghost" data-action="toggle-sidebar">Menu</button>
            <div>
              <p class="zgs-context-label">Aktywne konto</p>
              <p class="zgs-context-value">${escapeHtml(activeAccount?.login || "-")}</p>
            </div>
            <div>
              <p class="zgs-context-label">Rola</p>
              <p class="zgs-context-value">${escapeHtml(roleMeta?.label || "-")}</p>
            </div>
            <div>
              <p class="zgs-context-label">Aktor</p>
              <p class="zgs-context-value">${escapeHtml(actor?.login || "-")}</p>
            </div>
          </div>
          <div class="zgs-topbar-right">
            <div class="zgs-chip-group" role="group" aria-label="Tryb podglądu">
              ${renderViewMode(state.ui.viewMode)}
            </div>
            <button type="button" class="zgs-btn zgs-btn--secondary" data-nav="/accounts">Przełącz konto</button>
            <button type="button" class="zgs-btn zgs-btn--ghost" data-nav="/profile">Profil</button>
            <button type="button" class="zgs-btn zgs-btn--danger" data-action="logout">Wyloguj</button>
          </div>
        </header>

        <main class="zgs-main" id="zgs-main-content">
          ${content}
        </main>
      </div>
      ${renderToasts(state.ui.toasts)}
    </div>
  `;
}
