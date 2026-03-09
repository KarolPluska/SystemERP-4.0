import { money } from "../ui/format.js";
import { statusBadge } from "../ui/components.js";
import { withVariantShell } from "./helpers.js";

function currentOfferContext(ctx) {
  const draft = ctx.actions.getDraftOffer();
  if (draft?.lines?.length || draft?.title) {
    return { offer: draft, source: "draft" };
  }
  const selected = ctx.actions.getSelectedOffer();
  return { offer: selected, source: "saved" };
}

export function renderSummary(ctx) {
  const { offer, source } = currentOfferContext(ctx);

  if (!offer) {
    return withVariantShell(
      ctx,
      "Podsumowanie oferty",
      "Brak aktywnej oferty",
      `<section class="zgs-card"><p class="zgs-empty-inline">Brak danych do podsumowania. Utwórz ofertę lub wybierz rekord z historii.</p></section>`
    );
  }

  const client = ctx.actions.getClientById(offer.customerId);
  const account = ctx.actions.getAccountById(offer.accountId);

  const content = `
    <section class="zgs-grid zgs-grid--2cols-wide">
      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>${offer.title || "Nowa oferta bez tytułu"}</h3>
          <div class="zgs-row zgs-row--wrap">
            ${statusBadge(offer.status)}
            <span class="zgs-badge zgs-badge--info">Źródło: ${source === "draft" ? "Robocza" : "Zapisana"}</span>
          </div>
        </header>

        <dl class="zgs-kv">
          <div><dt>Klient</dt><dd>${client?.company || "Nie wybrano"}</dd></div>
          <div><dt>Handlowiec</dt><dd>${account?.profile?.name || "-"}</dd></div>
          <div><dt>Ważność</dt><dd>${offer.validityDays || "-"} dni</dd></div>
          <div><dt>Snapshot</dt><dd>${offer.snapshot?.capturedAt || "-"}</dd></div>
          <div><dt>Wersja cennika</dt><dd>${offer.snapshot?.priceVersion || "-"}</dd></div>
          <div><dt>Pozycje</dt><dd>${offer.lines?.length || 0}</dd></div>
        </dl>
      </article>

      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Kwoty końcowe</h3>
        </header>
        <dl class="zgs-kv">
          <div><dt>Razem netto</dt><dd>${money(offer.totals?.netBefore || 0)}</dd></div>
          <div><dt>Razem netto po rabacie</dt><dd>${money(offer.totals?.netAfter || 0)}</dd></div>
          <div><dt>Razem brutto</dt><dd>${money(offer.totals?.grossBefore || 0)}</dd></div>
          <div><dt>Razem brutto po rabacie</dt><dd>${money(offer.totals?.grossAfter || 0)}</dd></div>
        </dl>
        <div class="zgs-row zgs-row--wrap">
          <button type="button" class="zgs-btn zgs-btn--primary" data-action="save-offer" data-mode="create">Zapisz jako nową ofertę</button>
          <button type="button" class="zgs-btn zgs-btn--secondary" data-action="export-offer">Eksport PDF</button>
        </div>
      </article>
    </section>

    <section class="zgs-card">
      <header class="zgs-card-head">
        <h3>Lista pozycji podsumowania</h3>
      </header>
      <div class="zgs-table-wrap">
        <table class="zgs-table">
          <thead>
            <tr>
              <th>Pozycja</th>
              <th>Typ</th>
              <th>Ilość</th>
              <th>Netto po rabacie</th>
              <th>Snapshot</th>
              <th>Uwagi</th>
            </tr>
          </thead>
          <tbody>
            ${(offer.lines || [])
              .map(
                (line) => `
                <tr>
                  <td>${line.name}</td>
                  <td>${line.type}</td>
                  <td>${line.qty}</td>
                  <td>${money(line.amounts?.netAfter || 0)}</td>
                  <td>${money(line.snapshotUnitNet || line.unitNet || 0)}</td>
                  <td>${line.comment || "-"}</td>
                </tr>
              `
              )
              .join("") || `<tr><td colspan="6">Brak pozycji</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;

  return withVariantShell(
    ctx,
    "Podsumowanie oferty",
    "Kontrola końcowych kwot, snapshotu i gotowości do eksportu",
    content,
    {
      loadingDesc: "Przeliczanie podsumowania oferty.",
      emptyDesc: "Oferta nie posiada pozycji do podsumowania.",
      errorDesc: "Błąd podczas generowania podsumowania.",
      disabledDesc: "Podsumowanie jest niedostępne dla tej roli.",
    }
  );
}
