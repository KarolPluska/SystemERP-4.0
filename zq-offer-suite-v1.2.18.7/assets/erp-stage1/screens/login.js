import { renderVariantState, variantSwitcher, escapeHtml } from "../ui/components.js";

export function renderLogin(ctx) {
  const variant = ctx.state.ui.routeVariants[ctx.route.key] || "default";
  const isDisabled = variant === "disabled";
  const isLoading = variant === "loading";

  const stateBlock = renderVariantState(variant, {
    loadingDesc: "Weryfikacja sesji i przygotowanie kontekstu konta.",
    emptyDesc: "Brak aktywnych kont. Skontaktuj się z administratorem systemu.",
    errorDesc: "Nie udało się zweryfikować loginu lub hasła.",
    disabledDesc: "Logowanie jest czasowo wyłączone dla tego środowiska.",
  });

  return `
    <section class="zgs-auth" aria-labelledby="zgs-login-title">
      <div class="zgs-auth-panel">
        <header class="zgs-auth-head">
          <p class="zgs-auth-kicker">System ERP - etap 1</p>
          <h1 id="zgs-login-title">Panel operacyjno-ofertowy</h1>
          <p>Wersja prototypowa premium B2B - flow desktop i mobile, role, blokady, snapshoty cen.</p>
          <div class="zgs-auth-variant">${variantSwitcher(ctx.route.key, variant)}</div>
        </header>

        ${stateBlock || `
          <form class="zgs-form" id="zgs-login-form" novalidate>
            <label class="zgs-field" for="zgs-login-name">
              <span>Login</span>
              <input id="zgs-login-name" name="login" type="text" autocomplete="username" value="handlowiec.north" ${isDisabled || isLoading ? "disabled" : ""}>
            </label>
            <label class="zgs-field" for="zgs-login-password">
              <span>Hasło</span>
              <div class="zgs-password-row">
                <input id="zgs-login-password" name="password" type="password" autocomplete="current-password" value="demo123" ${isDisabled || isLoading ? "disabled" : ""}>
                <button type="button" class="zgs-btn zgs-btn--ghost" data-action="toggle-password" ${isDisabled || isLoading ? "disabled" : ""}>Pokaż</button>
              </div>
            </label>
            <div class="zgs-form-footer">
              <button type="submit" class="zgs-btn zgs-btn--primary" ${isDisabled || isLoading ? "disabled" : ""}>
                ${isLoading ? "Logowanie..." : "Zaloguj"}
              </button>
              <button type="button" class="zgs-btn zgs-btn--secondary" data-action="quick-login" ${isDisabled || isLoading ? "disabled" : ""}>Wejście demo</button>
            </div>
            ${ctx.state.session.loginError ? `<p class="zgs-inline-error">${escapeHtml(ctx.state.session.loginError)}</p>` : ""}
          </form>
        `}
      </div>

      <aside class="zgs-auth-side" aria-label="Kontekst produktu">
        <article class="zgs-auth-card">
          <h2>Co zawiera prototyp</h2>
          <ul>
            <li>Komplet ekranów: logowanie, dashboard, oferty, klienci, katalog, uprawnienia.</li>
            <li>Reguły: statusy, blokady, snapshot cen, alerty zmian.</li>
            <li>Wersje desktop i mobile z wymuszanym podglądem.</li>
            <li>Architektura modułowa gotowa pod plugin WordPress.</li>
          </ul>
        </article>
      </aside>
    </section>
  `;
}
