import { canEditOffer, canToggleLock } from "../core/permissions.js";
import { lockBadge, statusBadge } from "../ui/components.js";
import { money, shortDate } from "../ui/format.js";
import { withVariantShell } from "./helpers.js";

function renderLines(offer) {
  if (!offer.lines?.length) {
    return `<p class="zgs-muted">Brak pozycji w ofercie.</p>`;
  }

  return `
    <div class="zgs-table-wrap">
      <table class="zgs-table">
        <thead>
          <tr>
            <th>Pozycja</th>
            <th>Ilość</th>
            <th>Rabat</th>
            <th>Netto po rabacie</th>
            <th>Brutto po rabacie</th>
          </tr>
        </thead>
        <tbody>
          ${offer.lines
            .map(
              (line) => `
              <tr>
                <td>
                  <strong>${line.name}</strong>
                  <div class="zgs-cell-meta">${line.sku} - ${line.variant} - ${line.ral}</div>
                </td>
                <td>${line.qty}</td>
                <td>${line.discount}%</td>
                <td>${money(line.amounts?.netAfter || 0)}</td>
                <td>${money(line.amounts?.grossAfter || 0)}</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderHistory(events) {
  if (!events?.length) {
    return `<p class="zgs-muted">Brak zdarzeń historycznych.</p>`;
  }

  return `
    <ol class="zgs-timeline">
      ${events
        .map(
          (event) => `
          <li>
            <div>
              <strong>${event.event}</strong>
              <p>${event.meta}</p>
            </div>
            <div class="zgs-cell-meta">
              <span>${shortDate(event.at)}</span>
              <span>${event.actor}</span>
            </div>
          </li>
        `
        )
        .join("")}
    </ol>
  `;
}

export function renderOfferDetails(ctx) {
  const offerId = Number(ctx.route.params.id);
  const offer = ctx.actions.getOfferById(offerId);
  const account = ctx.actions.getActiveAccount();

  if (!offer) {
    return withVariantShell(
      ctx,
      "Szczegóły oferty",
      "Brak danych",
      `<section class="zgs-card"><p class="zgs-inline-error">Nie znaleziono oferty #${offerId}.</p></section>`
    );
  }

  const client = ctx.state.data.clients.find((item) => Number(item.id) === Number(offer.customerId));
  const events = ctx.state.data.offerEvents[offer.id] || [];
  const editable = canEditOffer(account, offer);
  const lockable = canToggleLock(account);

  const content = `
    <section class="zgs-grid zgs-grid--2cols-wide">
      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>${offer.title}</h3>
          <div class="zgs-row zgs-row--wrap">
            ${statusBadge(offer.status)}
            ${lockBadge(offer.locked, offer.lockReason)}
          </div>
        </header>
        <dl class="zgs-kv">
          <div><dt>Klient</dt><dd>${client ? client.company : "Brak"}</dd></div>
          <div><dt>Handlowiec</dt><dd>${ctx.actions.getAccountById(offer.accountId)?.profile?.name || "-"}</dd></div>
          <div><dt>Ważność</dt><dd>${offer.validityDays} dni</dd></div>
          <div><dt>Snapshot</dt><dd>${offer.snapshot?.capturedAt || "-"} (${offer.snapshot?.priceVersion || "-"})</dd></div>
          <div><dt>Utworzono</dt><dd>${shortDate(offer.createdAt)}</dd></div>
          <div><dt>Aktualizacja</dt><dd>${shortDate(offer.updatedAt)}</dd></div>
        </dl>
        <p class="zgs-note-box">${offer.comment || "Brak komentarza operacyjnego."}</p>
        <div class="zgs-row zgs-row--wrap">
          <button type="button" class="zgs-btn zgs-btn--secondary" data-nav="/offers/${offer.id}/edit" ${editable ? "" : "disabled"}>Edytuj</button>
          <button type="button" class="zgs-btn zgs-btn--ghost" data-action="duplicate-offer" data-offer-id="${offer.id}">Duplikuj jako nową</button>
          <button type="button" class="zgs-btn zgs-btn--ghost" data-action="toggle-lock" data-offer-id="${offer.id}" ${lockable ? "" : "disabled"}>${offer.locked ? "Odblokuj" : "Blokuj"}</button>
          <button type="button" class="zgs-btn zgs-btn--primary" data-action="export-offer" data-offer-id="${offer.id}">Eksport PDF</button>
        </div>
      </article>

      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Podsumowanie finansowe</h3>
        </header>
        <dl class="zgs-kv">
          <div><dt>Netto</dt><dd>${money(offer.totals?.netBefore || 0)}</dd></div>
          <div><dt>Netto po rabacie</dt><dd>${money(offer.totals?.netAfter || 0)}</dd></div>
          <div><dt>Brutto</dt><dd>${money(offer.totals?.grossBefore || 0)}</dd></div>
          <div><dt>Brutto po rabacie</dt><dd>${money(offer.totals?.grossAfter || 0)}</dd></div>
          <div><dt>Liczba pozycji</dt><dd>${offer.lines?.length || 0}</dd></div>
          <div><dt>Liczba zmian statusu</dt><dd>${offer.statusChanges || 0}</dd></div>
        </dl>
      </article>
    </section>

    <section class="zgs-grid zgs-grid--2cols">
      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Pozycje oferty</h3>
        </header>
        ${renderLines(offer)}
      </article>

      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Historia zmian</h3>
        </header>
        ${renderHistory(events)}
      </article>
    </section>
  `;

  return withVariantShell(
    ctx,
    "Szczegóły oferty",
    "Podgląd klienta, pozycji, blokad i historii zdarzeń",
    content,
    {
      loadingDesc: "Ładowanie pełnego podglądu oferty.",
      emptyDesc: "Oferta nie zawiera danych do podglądu.",
      errorDesc: "Błąd pobrania szczegółów oferty.",
      disabledDesc: "Oferta jest niedostępna w aktualnym kontekście.",
    }
  );
}
