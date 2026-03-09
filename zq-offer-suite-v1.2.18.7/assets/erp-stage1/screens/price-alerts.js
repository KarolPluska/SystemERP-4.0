import { money } from "../ui/format.js";
import { withVariantShell } from "./helpers.js";

export function renderPriceAlerts(ctx) {
  const alerts = ctx.actions.getPriceAlerts();

  const rows = alerts
    .map(
      (alert) => `
      <tr>
        <td>
          <button type="button" class="zgs-link-btn" data-nav="/offers/${alert.offerId}">${alert.offerTitle}</button>
          <div class="zgs-cell-meta">${alert.productName}</div>
        </td>
        <td>${money(alert.snapshot)}</td>
        <td>${money(alert.live)}</td>
        <td><span class="zgs-delta ${alert.diff > 0 ? "is-up" : "is-down"}">${money(alert.diff)}</span></td>
        <td>${alert.diffPercent.toFixed(2)}%</td>
        <td>
          <div class="zgs-table-actions">
            <button type="button" class="zgs-btn zgs-btn--ghost" data-action="mute-alert" data-alert-key="${alert.key}">Pomiń</button>
            <button type="button" class="zgs-btn zgs-btn--secondary" data-action="refresh-snapshot" data-offer-id="${alert.offerId}">Aktualizuj snapshot</button>
          </div>
        </td>
      </tr>
    `
    )
    .join("");

  const content = `
    <section class="zgs-card">
      <header class="zgs-card-head">
        <h3>Alert zmian cen</h3>
        <p class="zgs-muted">Porównanie snapshotu oferty z aktualnym cennikiem katalogowym.</p>
      </header>

      <div class="zgs-note-box">
        Oferta pozostaje historycznie poprawna względem snapshotu, ale użytkownik powinien zdecydować o aktualizacji przed kolejnym eksportem.
      </div>

      <div class="zgs-table-wrap">
        <table class="zgs-table">
          <thead>
            <tr>
              <th>Oferta / pozycja</th>
              <th>Snapshot</th>
              <th>Aktualna cena</th>
              <th>Różnica</th>
              <th>Zmiana %</th>
              <th>Decyzja</th>
            </tr>
          </thead>
          <tbody>
            ${rows || `<tr><td colspan="6"><div class="zgs-empty-inline">Brak aktywnych alertów zmian cen.</div></td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;

  return withVariantShell(
    ctx,
    "Alert zmian cen",
    "Porównanie snapshot vs live price i decyzje użytkownika",
    content,
    {
      loadingDesc: "Sprawdzanie odchylek cenowych względem snapshotów.",
      emptyDesc: "Brak alertów - wszystkie oferty są zgodne z aktualnym cennikiem.",
      errorDesc: "Nie udało się wyliczyć alertów cenowych.",
      disabledDesc: "Ta rola nie ma dostępu do alertów cenowych.",
    }
  );
}
