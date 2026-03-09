import { USER_STATUSES } from "../core/calculations.js";
import { canDeleteOffer, canEditOffer, canToggleLock } from "../core/permissions.js";
import { money, shortDate } from "../ui/format.js";
import { lockBadge, statusBadge } from "../ui/components.js";
import { withVariantShell } from "./helpers.js";

function filterOffers(offers, filters) {
  const query = String(filters.query || "").trim().toLowerCase();
  const status = String(filters.status || "all");

  return offers.filter((offer) => {
    const statusOk = status === "all" ? true : offer.status === status;
    if (!statusOk) return false;

    if (!query) return true;
    return [offer.title, offer.comment, offer.salesNote]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });
}

export function renderOffersHistory(ctx) {
  const activeAccount = ctx.actions.getActiveAccount();
  const filters = ctx.state.ui.historyFilters || { query: "", status: "all" };
  const visibleOffers = ctx.actions.getVisibleOffers();
  const filtered = filterOffers(visibleOffers, filters);

  const rows = filtered
    .map((offer) => {
      const editable = canEditOffer(activeAccount, offer);
      const deletable = canDeleteOffer(activeAccount, offer);
      const lockable = canToggleLock(activeAccount);

      return `
        <tr>
          <td>
            <button type="button" class="zgs-link-btn" data-nav="/offers/${offer.id}">${offer.title}</button>
            <div class="zgs-cell-meta">Aktualizacja: ${shortDate(offer.updatedAt)}</div>
          </td>
          <td>${statusBadge(offer.status)}</td>
          <td>${lockBadge(offer.locked, offer.lockReason)}</td>
          <td>${offer.statusChanges || 0}</td>
          <td>${money(offer.totals?.netAfter || 0)}</td>
          <td>
            <div class="zgs-table-actions">
              <button type="button" class="zgs-btn zgs-btn--ghost" data-nav="/offers/${offer.id}" title="Szczegóły">Szczegóły</button>
              <button type="button" class="zgs-btn zgs-btn--ghost" data-nav="/offers/${offer.id}/edit" ${editable ? "" : "disabled"} title="Edycja">Edytuj</button>
              <button type="button" class="zgs-btn zgs-btn--ghost" data-action="duplicate-offer" data-offer-id="${offer.id}">Duplikuj</button>
              <button type="button" class="zgs-btn zgs-btn--ghost" data-action="toggle-lock" data-offer-id="${offer.id}" ${lockable ? "" : "disabled"}>${offer.locked ? "Odblokuj" : "Blokuj"}</button>
              <button type="button" class="zgs-btn zgs-btn--danger" data-action="delete-offer" data-offer-id="${offer.id}" ${deletable ? "" : "disabled"}>Usuń</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  const content = `
    <section class="zgs-card">
      <header class="zgs-card-head">
        <h3>Filtry historii</h3>
      </header>
      <div class="zgs-row zgs-row--filters">
        <label class="zgs-field">
          <span>Szukaj</span>
          <input
            type="search"
            value="${filters.query || ""}"
            data-action="history-query"
            placeholder="Tytuł, komentarz, notatka"
          >
        </label>
        <label class="zgs-field">
          <span>Status</span>
          <select data-action="history-status">
            <option value="all" ${filters.status === "all" ? "selected" : ""}>Wszystkie</option>
            ${USER_STATUSES.map((status) => `<option value="${status}" ${filters.status === status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
        </label>
        <div class="zgs-field zgs-field--inline">
          <span>&nbsp;</span>
          <button class="zgs-btn zgs-btn--secondary" type="button" data-nav="/offers/new">Nowa oferta</button>
        </div>
      </div>
    </section>

    <section class="zgs-card">
      <header class="zgs-card-head">
        <h3>Historia ofert</h3>
        <p class="zgs-muted">Wynik: ${filtered.length} / ${visibleOffers.length}</p>
      </header>
      <div class="zgs-table-wrap">
        <table class="zgs-table">
          <thead>
            <tr>
              <th>Oferta</th>
              <th>Status</th>
              <th>Blokada</th>
              <th>Zmiany</th>
              <th>Netto po rabacie</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            ${rows || `<tr><td colspan="6"><div class="zgs-empty-inline">Brak ofert dla filtra.</div></td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;

  return withVariantShell(
    ctx,
    "Historia ofert",
    "Filtrowanie, statusy, blokady, duplikacja i usuwanie zgodnie z rolą",
    content,
    {
      loadingDesc: "Ładowanie historii ofert i liczników statusów.",
      emptyDesc: "Brak ofert w aktywnym kontekście lub dla wybranego filtra.",
      errorDesc: "Nie udało się pobrać historii ofert.",
      disabledDesc: "Ten użytkownik ma tryb tylko do odczytu historii.",
    }
  );
}
