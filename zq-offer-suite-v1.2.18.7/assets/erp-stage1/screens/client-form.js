import { canAddClient, canEditClient } from "../core/permissions.js";
import { withVariantShell } from "./helpers.js";

export function renderClientForm(ctx) {
  const activeAccount = ctx.actions.getActiveAccount();
  const canCreate = canAddClient(activeAccount);
  const canUpdate = canEditClient(activeAccount);

  const isEditMode = Boolean(ctx.route.params.id);
  const clientId = Number(ctx.route.params.id || 0);
  const sourceClient = isEditMode ? ctx.actions.getClientById(clientId) : null;
  const draft = ctx.actions.getClientDraft(clientId);

  if (isEditMode && !sourceClient) {
    return withVariantShell(
      ctx,
      "Edycja klienta",
      "Brak rekordu",
      `<section class="zgs-card"><p class="zgs-inline-error">Nie znaleziono klienta #${clientId}.</p></section>`
    );
  }

  const disabled = isEditMode ? !canUpdate : !canCreate;

  const content = `
    <section class="zgs-grid zgs-grid--2cols-wide">
      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>${isEditMode ? "Edycja klienta" : "Dodawanie klienta"}</h3>
          <button type="button" class="zgs-btn zgs-btn--ghost" data-nav="/clients">Powrót do listy</button>
        </header>
        <form class="zgs-form zgs-form--stack" id="zgs-client-form" data-mode="${isEditMode ? "edit" : "create"}" data-client-id="${clientId || ""}">
          <div class="zgs-grid zgs-grid--2cols">
            <label class="zgs-field">
              <span>Nazwa firmy</span>
              <input name="company" value="${draft.company || ""}" ${disabled ? "disabled" : ""}>
            </label>
            <label class="zgs-field">
              <span>Osoba kontaktowa</span>
              <input name="fullName" value="${draft.fullName || ""}" ${disabled ? "disabled" : ""}>
            </label>
          </div>

          <div class="zgs-grid zgs-grid--3cols">
            <label class="zgs-field">
              <span>NIP</span>
              <input name="nip" value="${draft.nip || ""}" ${disabled ? "disabled" : ""}>
            </label>
            <label class="zgs-field">
              <span>Email</span>
              <input name="email" type="email" value="${draft.email || ""}" ${disabled ? "disabled" : ""}>
            </label>
            <label class="zgs-field">
              <span>Telefon</span>
              <input name="phone" value="${draft.phone || ""}" ${disabled ? "disabled" : ""}>
            </label>
          </div>

          <label class="zgs-field">
            <span>Adres</span>
            <input name="address" value="${draft.address || ""}" ${disabled ? "disabled" : ""}>
          </label>

          <label class="zgs-field">
            <span>Grupa klienta</span>
            <select name="groupId" ${disabled ? "disabled" : ""}>
              ${ctx.state.data.clientGroups
                .map(
                  (group) =>
                    `<option value="${group.id}" ${Number(group.id) === Number(draft.groupId) ? "selected" : ""}>${group.name}</option>`
                )
                .join("")}
            </select>
          </label>

          <label class="zgs-field">
            <span>Notatka</span>
            <textarea name="notes" rows="3" ${disabled ? "disabled" : ""}>${draft.notes || ""}</textarea>
          </label>

          <div class="zgs-row zgs-row--wrap">
            <button type="submit" class="zgs-btn zgs-btn--primary" ${disabled ? "disabled" : ""}>${isEditMode ? "Zapisz zmiany" : "Dodaj klienta"}</button>
            <button type="button" class="zgs-btn zgs-btn--secondary" data-nav="/clients">Anuluj</button>
          </div>
        </form>
      </article>

      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Reguły walidacji</h3>
        </header>
        <ul class="zgs-bullets">
          <li>Wymagane: nazwa firmy lub osoba kontaktowa.</li>
          <li>Email i NIP są walidowane przed zapisem.</li>
          <li>Widoczność klienta zależy od konta i mapowania uprawnień.</li>
          <li>Tryb edycji może być zablokowany dla roli handlowca ograniczonego.</li>
        </ul>
      </article>
    </section>
  `;

  return withVariantShell(
    ctx,
    isEditMode ? "Edycja klienta" : "Dodawanie klienta",
    "Formularz klienta z grupą, walidacją i przypisaniami",
    content,
    {
      loadingDesc: "Ładowanie formularza klienta.",
      emptyDesc: "Brak danych klienta do edycji.",
      errorDesc: "Walidacja formularza zakończyła się błędem.",
      disabledDesc: "Ta rola nie ma uprawnień do zapisu klienta.",
    }
  );
}
