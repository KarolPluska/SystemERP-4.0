import { ROLE_META } from "../data/domain.js";
import { withVariantShell } from "./helpers.js";

export function renderProfile(ctx) {
  const active = ctx.actions.getActiveAccount();
  const actor = ctx.actions.getActorAccount();
  const offers = ctx.actions.getVisibleOffers();
  const clients = ctx.actions.getVisibleClients();

  const content = `
    <section class="zgs-grid zgs-grid--2cols-wide">
      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Profil użytkownika</h3>
          <span class="zgs-badge zgs-badge--info">${ROLE_META[active?.role]?.label || "-"}</span>
        </header>

        <div class="zgs-profile-head">
          <div class="zgs-avatar">${active?.profile?.avatarInitials || "--"}</div>
          <div>
            <p class="zgs-row-title">${active?.profile?.name || "Brak nazwy"}</p>
            <p class="zgs-row-meta">${active?.login || "-"} - ${active?.profile?.branch || "-"}</p>
          </div>
        </div>

        <dl class="zgs-kv">
          <div><dt>Telefon</dt><dd>${active?.profile?.phone || "-"}</dd></div>
          <div><dt>Email</dt><dd>${active?.profile?.email || "-"}</dd></div>
          <div><dt>Aktor sesji</dt><dd>${actor?.login || "-"}</dd></div>
          <div><dt>Aktywne konto</dt><dd>${active?.login || "-"}</dd></div>
        </dl>
      </article>

      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Kontekst aktywnego konta</h3>
        </header>
        <dl class="zgs-kv">
          <div><dt>Oferty w zasięgu</dt><dd>${offers.length}</dd></div>
          <div><dt>Klienci w zasięgu</dt><dd>${clients.length}</dd></div>
          <div><dt>Limit rabatu</dt><dd>${active?.perms?.max_discount_percent ?? 0}%</dd></div>
          <div><dt>Dostęp do wszystkich klientów</dt><dd>${active?.perms?.can_view_all_clients ? "Tak" : "Nie"}</dd></div>
          <div><dt>Kasowanie ofert</dt><dd>${active?.perms?.can_delete_offers_any ? "Wszystkie" : active?.perms?.can_delete_offers_own ? "Własne" : "Brak"}</dd></div>
        </dl>
        <div class="zgs-row zgs-row--wrap">
          <button type="button" class="zgs-btn zgs-btn--secondary" data-nav="/accounts">Przełącz konto</button>
          <button type="button" class="zgs-btn zgs-btn--ghost" data-nav="/permissions">Uprawnienia</button>
        </div>
      </article>
    </section>
  `;

  return withVariantShell(
    ctx,
    "Profil użytkownika / aktywne konto",
    "Tożsamość aktora, kontekst konta i zakres pracy",
    content,
    {
      loadingDesc: "Pobieranie profilu i statystyk użytkownika.",
      emptyDesc: "Brak danych profilowych dla aktywnego konta.",
      errorDesc: "Nie udało się pobrać profilu użytkownika.",
      disabledDesc: "Widok profilu został wyłączony dla tej roli.",
    }
  );
}
