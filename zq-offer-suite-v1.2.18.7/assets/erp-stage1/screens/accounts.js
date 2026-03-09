import { ROLE_META } from "../data/domain.js";
import { escapeHtml } from "../ui/components.js";
import { withVariantShell } from "./helpers.js";

export function renderAccounts(ctx) {
  const active = ctx.actions.getActiveAccount();
  const actor = ctx.actions.getActorAccount();
  const canSwitch = ctx.actions.canSwitchAccounts();

  const rows = ctx.state.data.accounts
    .map((account) => {
      const role = ROLE_META[account.role]?.label || account.role;
      const isActive = Number(account.id) === Number(active?.id);
      const disabled = !canSwitch && !isActive;
      return `
        <article class="zgs-account-card ${isActive ? "is-active" : ""}">
          <div>
            <p class="zgs-row-title">${escapeHtml(account.login)}</p>
            <p class="zgs-row-meta">${escapeHtml(role)} - ${escapeHtml(account.profile?.name || "Brak profilu")}</p>
          </div>
          <div class="zgs-account-actions">
            <span class="zgs-badge ${isActive ? "zgs-badge--accent" : "zgs-badge--muted"}">${isActive ? "Aktywne" : "Dostępne"}</span>
            <button
              type="button"
              class="zgs-btn zgs-btn--secondary"
              data-action="switch-account"
              data-account-id="${account.id}"
              ${disabled ? "disabled" : ""}
            >
              ${isActive ? "W tym kontekście" : "Przełącz"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  const content = `
    <section class="zgs-grid zgs-grid--2cols">
      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Aktywne konto</h3>
        </header>
        <dl class="zgs-kv">
          <div><dt>Login</dt><dd>${escapeHtml(active?.login || "-")}</dd></div>
          <div><dt>Rola</dt><dd>${escapeHtml(ROLE_META[active?.role]?.label || "-")}</dd></div>
          <div><dt>Aktor sesji</dt><dd>${escapeHtml(actor?.login || "-")}</dd></div>
          <div><dt>Zakres</dt><dd>${escapeHtml(ROLE_META[active?.role]?.scope || "-")}</dd></div>
        </dl>
      </article>

      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Reguły przełączania</h3>
        </header>
        <ul class="zgs-bullets">
          <li>Przełączenie zmienia kontekst klientów, ofert i limit rabatu.</li>
          <li>Super Admin może działać ponad ograniczeniami konta docelowego.</li>
          <li>Role bez uprawnienia `super_admin` widzą tylko własny kontekst.</li>
          <li>Po zmianie konta dashboard i historia odświeżają się bez reloadu.</li>
        </ul>
      </article>
    </section>

    <section class="zgs-card">
      <header class="zgs-card-head">
        <h3>Lista kont</h3>
      </header>
      <div class="zgs-stack">${rows}</div>
    </section>
  `;

  return withVariantShell(
    ctx,
    "Przełączanie kont",
    "Kontekst pracy i impersonacja zgodna z rolami",
    content,
    {
      loadingDesc: "Pobieranie listy kont i przypisanych ról.",
      emptyDesc: "Brak kont dostępnych do przełączenia.",
      errorDesc: "Nie udało się pobrać danych kont.",
      disabledDesc: "Ta rola nie ma prawa przełączać kont.",
    }
  );
}
