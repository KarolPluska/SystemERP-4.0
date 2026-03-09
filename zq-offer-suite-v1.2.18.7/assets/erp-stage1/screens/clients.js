import { canAddClient, canEditClient } from "../core/permissions.js";
import { withVariantShell } from "./helpers.js";

function applyFilters(clients, filters) {
  const query = String(filters.query || "").toLowerCase().trim();
  const groupId = Number(filters.groupId || 0);

  return clients.filter((client) => {
    const queryOk = query
      ? [client.company, client.fullName, client.email, client.nip].join(" ").toLowerCase().includes(query)
      : true;
    const groupOk = groupId ? Number(client.groupId) === groupId : true;
    return queryOk && groupOk;
  });
}

export function renderClients(ctx) {
  const activeAccount = ctx.actions.getActiveAccount();
  const canCreate = canAddClient(activeAccount);
  const canEdit = canEditClient(activeAccount);

  const filters = ctx.state.ui.clientFilters || { query: "", groupId: 0 };
  const clients = ctx.actions.getVisibleClients();
  const groups = ctx.state.data.clientGroups;
  const filtered = applyFilters(clients, filters);

  const cards = filtered
    .map((client) => {
      const group = groups.find((item) => Number(item.id) === Number(client.groupId));
      return `
        <article class="zgs-client-card">
          <header>
            <h3>${client.company}</h3>
            <p>${client.fullName}</p>
          </header>
          <dl>
            <div><dt>Grupa</dt><dd>${group?.name || "Brak"}</dd></div>
            <div><dt>NIP</dt><dd>${client.nip || "-"}</dd></div>
            <div><dt>Email</dt><dd>${client.email || "-"}</dd></div>
            <div><dt>Telefon</dt><dd>${client.phone || "-"}</dd></div>
          </dl>
          <div class="zgs-row zgs-row--wrap">
            <button type="button" class="zgs-btn zgs-btn--ghost" data-action="set-selected-client" data-client-id="${client.id}">Wybierz</button>
            <button type="button" class="zgs-btn zgs-btn--secondary" data-nav="/clients/${client.id}/edit" ${canEdit ? "" : "disabled"}>Edytuj</button>
          </div>
        </article>
      `;
    })
    .join("");

  const content = `
    <section class="zgs-card">
      <header class="zgs-card-head">
        <h3>Zarządzanie klientami</h3>
        <button type="button" class="zgs-btn zgs-btn--primary" data-nav="/clients/new" ${canCreate ? "" : "disabled"}>Dodaj klienta</button>
      </header>
      <div class="zgs-row zgs-row--filters">
        <label class="zgs-field">
          <span>Szukaj klienta</span>
          <input type="search" value="${filters.query || ""}" data-action="client-query" placeholder="Nazwa, email, NIP">
        </label>
        <label class="zgs-field">
          <span>Grupa klienta</span>
          <select data-action="client-group">
            <option value="0" ${Number(filters.groupId || 0) === 0 ? "selected" : ""}>Wszystkie</option>
            ${groups
              .map(
                (group) =>
                  `<option value="${group.id}" ${Number(filters.groupId) === Number(group.id) ? "selected" : ""}>${group.name}</option>`
              )
              .join("")}
          </select>
        </label>
      </div>
    </section>

    <section class="zgs-client-grid">
      ${cards || `<div class="zgs-empty">Brak klientów spełniających filtr. Sprawdź uprawnienia lub ustawienia wyszukiwania.</div>`}
    </section>
  `;

  return withVariantShell(
    ctx,
    "Klienci",
    "Lista, filtrowanie, grupy i szybkie przejście do formularza klienta",
    content,
    {
      loadingDesc: "Pobieranie klientów i ich przypisań do kont.",
      emptyDesc: "Brak klientów w aktualnym zakresie widoczności.",
      errorDesc: "Błąd pobierania listy klientów.",
      disabledDesc: "Twoja rola nie ma dostępu do zarządzania klientami.",
    }
  );
}
