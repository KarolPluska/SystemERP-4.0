import { USER_STATUSES } from "../core/calculations.js";
import { canUseSpecialOffer, maxDiscount } from "../core/permissions.js";
import { money } from "../ui/format.js";
import { statusBadge, lockBadge } from "../ui/components.js";
import { withVariantShell } from "./helpers.js";

function renderLineRows(draft) {
  if (!draft.lines?.length) {
    return `<tr><td colspan="9"><div class="zgs-empty-inline">Brak pozycji. Dodaj z katalogu lub jako pozycję niestandardową.</div></td></tr>`;
  }

  return draft.lines
    .map(
      (line) => `
      <tr>
        <td>
          <strong>${line.name}</strong>
          <div class="zgs-cell-meta">${line.sku} - ${line.variant} - ${line.ral}</div>
        </td>
        <td>${line.qty}</td>
        <td>${money(line.amounts?.unitNet || 0)}</td>
        <td>${line.discount}%</td>
        <td>${money(line.amounts?.netBefore || 0)}</td>
        <td>${money(line.amounts?.netAfter || 0)}</td>
        <td>${money(line.amounts?.grossBefore || 0)}</td>
        <td>${money(line.amounts?.grossAfter || 0)}</td>
        <td><button type="button" class="zgs-btn zgs-btn--danger" data-action="remove-line" data-line-id="${line.id}">Usuń</button></td>
      </tr>
    `
    )
    .join("");
}

function renderClientOptions(clients, selectedId) {
  const options = clients.map((client) => {
    const selected = Number(client.id) === Number(selectedId) ? "selected" : "";
    return `<option value="${client.id}" ${selected}>${client.company}</option>`;
  });

  return [`<option value="">Wybierz klienta</option>`, ...options].join("");
}

export function renderOfferForm(ctx) {
  const isEditMode = Boolean(ctx.route.params.id);
  const sourceOffer = isEditMode ? ctx.actions.getOfferById(Number(ctx.route.params.id)) : null;
  const draft = ctx.actions.getDraftOffer();
  const clients = ctx.actions.getVisibleClients();
  const activeAccount = ctx.actions.getActiveAccount();
  const canSpecial = canUseSpecialOffer(activeAccount);
  const maxDisc = maxDiscount(activeAccount);

  if (isEditMode && !sourceOffer) {
    return withVariantShell(
      ctx,
      "Edycja oferty",
      "Nie znaleziono oferty w aktywnym kontekście",
      `<section class="zgs-card"><p class="zgs-inline-error">Nie znaleziono oferty #${ctx.route.params.id}.</p></section>`
    );
  }

  const content = `
    <section class="zgs-grid zgs-grid--2cols-wide">
      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>${isEditMode ? "Edycja oferty" : "Tworzenie oferty"}</h3>
          ${isEditMode ? lockBadge(Boolean(sourceOffer?.locked), sourceOffer?.lockReason) : statusBadge(draft.status)}
        </header>

        <form class="zgs-form zgs-form--stack" id="zgs-offer-meta-form" novalidate>
          <label class="zgs-field">
            <span>Tytuł oferty</span>
            <input name="title" value="${draft.title || ""}" data-action="offer-field" data-field="title">
          </label>

          <div class="zgs-grid zgs-grid--2cols">
            <label class="zgs-field">
              <span>Klient</span>
              <select data-action="offer-field" data-field="customerId">
                ${renderClientOptions(clients, draft.customerId)}
              </select>
            </label>
            <label class="zgs-field">
              <span>Status</span>
              <select data-action="offer-field" data-field="status">
                ${USER_STATUSES.map((status) => `<option value="${status}" ${draft.status === status ? "selected" : ""}>${status}</option>`).join("")}
              </select>
            </label>
          </div>

          <div class="zgs-grid zgs-grid--3cols">
            <label class="zgs-field">
              <span>Ważność (dni)</span>
              <input type="number" min="1" max="90" value="${draft.validityDays}" data-action="offer-field" data-field="validityDays">
            </label>
            <label class="zgs-field">
              <span>Tryb specjalny</span>
              <select data-action="offer-field" data-field="specialOffer" ${canSpecial ? "" : "disabled"}>
                <option value="0" ${draft.specialOffer ? "" : "selected"}>Standard</option>
                <option value="1" ${draft.specialOffer ? "selected" : ""}>Oferta specjalna</option>
              </select>
            </label>
            <label class="zgs-field">
              <span>Limit rabatu konta</span>
              <input type="text" value="${maxDisc}%" disabled>
            </label>
          </div>

          <label class="zgs-field">
            <span>Komentarz operacyjny</span>
            <textarea rows="3" data-action="offer-field" data-field="comment">${draft.comment || ""}</textarea>
          </label>

          <div class="zgs-row zgs-row--wrap">
            <button type="button" class="zgs-btn zgs-btn--secondary" data-nav="/catalog">Dodaj z katalogu</button>
            <button type="button" class="zgs-btn zgs-btn--secondary" data-nav="/custom-item">Dodaj pozycję niestandardową</button>
            <button type="button" class="zgs-btn zgs-btn--secondary" data-nav="/transport">Dodaj transport/usługi</button>
          </div>
        </form>
      </article>

      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Podsumowanie oferty</h3>
          <span class="zgs-badge zgs-badge--info">Snapshot: ${draft.snapshot?.priceVersion || "-"}</span>
        </header>
        <dl class="zgs-kv">
          <div><dt>Netto</dt><dd>${money(draft.totals?.netBefore || 0)}</dd></div>
          <div><dt>Netto po rabacie</dt><dd>${money(draft.totals?.netAfter || 0)}</dd></div>
          <div><dt>Brutto</dt><dd>${money(draft.totals?.grossBefore || 0)}</dd></div>
          <div><dt>Brutto po rabacie</dt><dd>${money(draft.totals?.grossAfter || 0)}</dd></div>
          <div><dt>Pozycje</dt><dd>${draft.lines?.length || 0}</dd></div>
          <div><dt>Ważność</dt><dd>${draft.validityDays} dni</dd></div>
        </dl>

        <div class="zgs-row zgs-row--wrap">
          <button type="button" class="zgs-btn zgs-btn--primary" data-action="save-offer" data-mode="${isEditMode ? "overwrite" : "create"}">
            ${isEditMode ? "Zapisz zmiany" : "Zapisz ofertę"}
          </button>
          <button type="button" class="zgs-btn zgs-btn--secondary" data-action="export-offer">Eksport PDF</button>
          <button type="button" class="zgs-btn zgs-btn--ghost" data-nav="/summary">Pełne podsumowanie</button>
        </div>
      </article>
    </section>

    <section class="zgs-card">
      <header class="zgs-card-head">
        <h3>Pozycje oferty</h3>
      </header>
      <div class="zgs-table-wrap">
        <table class="zgs-table">
          <thead>
            <tr>
              <th>Pozycja</th>
              <th>Ilość</th>
              <th>Cena jedn. netto</th>
              <th>Rabat</th>
              <th>Netto</th>
              <th>Netto po rabacie</th>
              <th>Brutto</th>
              <th>Brutto po rabacie</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>${renderLineRows(draft)}</tbody>
        </table>
      </div>
    </section>
  `;

  return withVariantShell(
    ctx,
    isEditMode ? "Edycja oferty" : "Tworzenie oferty",
    "Formularz oferty z klientem, statusem, pozycjami i podsumowaniem",
    content,
    {
      loadingDesc: "Ładowanie danych oferty i pozycji.",
      emptyDesc: "Oferta nie zawiera jeszcze żadnych pozycji.",
      errorDesc: "Nie udało się zapisać lub pobrać oferty.",
      disabledDesc: "Edycja jest zablokowana przez status lub uprawnienia.",
    }
  );
}
