import { maxDiscount } from "../core/permissions.js";
import { withVariantShell } from "./helpers.js";

export function renderCustomItem(ctx) {
  const draft = ctx.state.ui.customItemDraft || {
    name: "",
    sku: "CUSTOM",
    variant: "niestandard",
    qty: 1,
    unitNet: 0,
    discount: 0,
    comment: "",
  };

  const maxDisc = maxDiscount(ctx.actions.getActiveAccount());

  const content = `
    <section class="zgs-grid zgs-grid--2cols-wide">
      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Dodaj pozycję niestandardową</h3>
          <button type="button" class="zgs-btn zgs-btn--secondary" data-nav="/offers/new">Wróć do oferty</button>
        </header>
        <form class="zgs-form zgs-form--stack" id="zgs-custom-line-form">
          <label class="zgs-field">
            <span>Nazwa pozycji</span>
            <input name="name" value="${draft.name || ""}" required>
          </label>
          <div class="zgs-grid zgs-grid--3cols">
            <label class="zgs-field">
              <span>SKU</span>
              <input name="sku" value="${draft.sku || "CUSTOM"}">
            </label>
            <label class="zgs-field">
              <span>Wariant</span>
              <input name="variant" value="${draft.variant || "niestandard"}">
            </label>
            <label class="zgs-field">
              <span>Ilość</span>
              <input name="qty" type="number" min="1" step="1" value="${draft.qty || 1}">
            </label>
          </div>
          <div class="zgs-grid zgs-grid--2cols">
            <label class="zgs-field">
              <span>Cena jednostkowa netto</span>
              <input name="unitNet" type="number" min="0" step="0.01" value="${draft.unitNet || 0}">
            </label>
            <label class="zgs-field">
              <span>Rabat %</span>
              <input name="discount" type="number" min="0" max="${maxDisc}" step="0.1" value="${draft.discount || 0}">
            </label>
          </div>
          <label class="zgs-field">
            <span>Komentarz</span>
            <textarea name="comment" rows="3">${draft.comment || ""}</textarea>
          </label>
          <div class="zgs-row zgs-row--wrap">
            <button type="submit" class="zgs-btn zgs-btn--primary">Dodaj pozycję</button>
            <button type="button" class="zgs-btn zgs-btn--ghost" data-action="reset-custom-item">Wyczyść</button>
          </div>
        </form>
      </article>

      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Walidacja pozycji ręcznej</h3>
        </header>
        <ul class="zgs-bullets">
          <li>Pozycja niestandardowa ma osobny typ i źródło <code>__CUSTOM__</code>.</li>
          <li>Rabat nie może przekroczyć limitu konta.</li>
          <li>Wartości netto/brutto liczone są spójnie z pozycjami katalogowymi.</li>
          <li>Komentarz pozycji jest częścią historii i snapshotu dokumentu.</li>
        </ul>
      </article>
    </section>
  `;

  return withVariantShell(
    ctx,
    "Pozycja niestandardowa",
    "Ręczne pozycje ofertowe z walidacją i kontrolą rabatu",
    content,
    {
      loadingDesc: "Ładowanie formularza pozycji niestandardowej.",
      emptyDesc: "Brak danych wejściowych dla pozycji niestandardowej.",
      errorDesc: "Nie udało się dodać pozycji niestandardowej.",
      disabledDesc: "Rola nie ma prawa dodawać pozycji niestandardowych.",
    }
  );
}
