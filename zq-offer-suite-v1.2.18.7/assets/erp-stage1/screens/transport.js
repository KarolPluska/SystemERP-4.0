import { withVariantShell } from "./helpers.js";

export function renderTransport(ctx) {
  const draft = ctx.state.ui.transportDraft || {
    name: "Transport krajowy",
    distanceKm: 120,
    baseNet: 1200,
    extraName: "Rozladunek HDS",
    extraNet: 250,
    secondExtraName: "Okno czasowe",
    secondExtraNet: 180,
    discount: 0,
    comment: "",
  };

  const content = `
    <section class="zgs-grid zgs-grid--2cols-wide">
      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Usługi transportowe i pozycje dodatkowe</h3>
          <button type="button" class="zgs-btn zgs-btn--secondary" data-nav="/offers/new">Wróć do oferty</button>
        </header>

        <form class="zgs-form zgs-form--stack" id="zgs-transport-form">
          <label class="zgs-field">
            <span>Nazwa usługi</span>
            <input name="name" value="${draft.name}">
          </label>

          <div class="zgs-grid zgs-grid--3cols">
            <label class="zgs-field">
              <span>Dystans (km)</span>
              <input name="distanceKm" type="number" min="1" step="1" value="${draft.distanceKm}">
            </label>
            <label class="zgs-field">
              <span>Cena bazowa netto</span>
              <input name="baseNet" type="number" min="0" step="0.01" value="${draft.baseNet}">
            </label>
            <label class="zgs-field">
              <span>Rabat %</span>
              <input name="discount" type="number" min="0" max="100" step="0.1" value="${draft.discount}">
            </label>
          </div>

          <div class="zgs-grid zgs-grid--2cols">
            <label class="zgs-field">
              <span>Dopłata 1 - nazwa</span>
              <input name="extraName" value="${draft.extraName}">
            </label>
            <label class="zgs-field">
              <span>Dopłata 1 - netto</span>
              <input name="extraNet" type="number" min="0" step="0.01" value="${draft.extraNet}">
            </label>
          </div>

          <div class="zgs-grid zgs-grid--2cols">
            <label class="zgs-field">
              <span>Dopłata 2 - nazwa</span>
              <input name="secondExtraName" value="${draft.secondExtraName}">
            </label>
            <label class="zgs-field">
              <span>Dopłata 2 - netto</span>
              <input name="secondExtraNet" type="number" min="0" step="0.01" value="${draft.secondExtraNet}">
            </label>
          </div>

          <label class="zgs-field">
            <span>Komentarz</span>
            <textarea name="comment" rows="3">${draft.comment || ""}</textarea>
          </label>

          <div class="zgs-row zgs-row--wrap">
            <button type="submit" class="zgs-btn zgs-btn--primary">Dodaj usługę transportową</button>
            <button type="button" class="zgs-btn zgs-btn--ghost" data-action="reset-transport">Wyczyść</button>
          </div>
        </form>
      </article>

      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Zasady modułu transportu</h3>
        </header>
        <ul class="zgs-bullets">
          <li>Transport ma osobny typ pozycji i jest uwzględniany w snapshotach cen.</li>
          <li>Dopłaty dodatkowe tworzą sumę netto przed rabatem.</li>
          <li>Pozycja trafia do podsumowania oferty tak jak produkty katalogowe.</li>
          <li>W historii oferty widoczna jest modyfikacja ceny bazowej i dopłat.</li>
        </ul>
      </article>
    </section>
  `;

  return withVariantShell(
    ctx,
    "Usługi transportowe / pozycje dodatkowe",
    "Moduł logistyczny z bazą netto i dopłatami",
    content,
    {
      loadingDesc: "Ładowanie konfiguracji transportu.",
      emptyDesc: "Brak zdefiniowanych usług dodatkowych.",
      errorDesc: "Błąd walidacji pozycji transportowej.",
      disabledDesc: "Aktualne konto nie może dodawać pozycji usługowych.",
    }
  );
}
