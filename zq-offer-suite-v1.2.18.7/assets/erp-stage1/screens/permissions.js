import { withVariantShell } from "./helpers.js";
import { ROLE_META } from "../data/domain.js";

const FLAG_KEYS = [
  "can_view_all_clients",
  "can_delete_offers_own",
  "can_delete_offers_any",
  "can_lock_offers",
  "can_edit_locked_offers",
  "can_select_client",
  "can_add_client",
  "can_edit_client",
  "allow_special_offer",
  "can_export_pdf",
  "can_manage_permissions",
];

export function renderPermissions(ctx) {
  const activeAccount = ctx.actions.getActiveAccount();
  const managerMode = Boolean(activeAccount?.perms?.can_manage_permissions || activeAccount?.perms?.super_admin);

  const targetId = Number(ctx.state.ui.permissionsTargetAccountId || activeAccount?.id || 0);
  const target = ctx.actions.getAccountById(targetId) || activeAccount;

  const flags = FLAG_KEYS.map((key) => {
    const value = Boolean(target?.perms?.[key]);
    return `
      <label class="zgs-toggle">
        <input type="checkbox" ${value ? "checked" : ""} data-action="toggle-permission" data-target-id="${target?.id}" data-permission="${key}" ${managerMode ? "" : "disabled"}>
        <span>${key}</span>
      </label>
    `;
  });

  const content = `
    <section class="zgs-grid zgs-grid--2cols-wide">
      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Ustawienia uprawnień</h3>
          <span class="zgs-badge zgs-badge--${managerMode ? "success" : "warning"}">${managerMode ? "Tryb administracyjny" : "Tylko podgląd"}</span>
        </header>

        <label class="zgs-field">
          <span>Konto docelowe</span>
          <select data-action="permissions-target" ${managerMode ? "" : "disabled"}>
            ${ctx.state.data.accounts
              .map(
                (account) =>
                  `<option value="${account.id}" ${Number(account.id) === Number(target?.id) ? "selected" : ""}>${account.login} (${ROLE_META[account.role]?.label || account.role})</option>`
              )
              .join("")}
          </select>
        </label>

        <div class="zgs-toggle-grid">
          ${flags.join("")}
        </div>
      </article>

      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Limity i widoczność</h3>
        </header>
        <dl class="zgs-kv">
          <div><dt>Rola</dt><dd>${ROLE_META[target?.role]?.label || "-"}</dd></div>
          <div><dt>Limit rabatu</dt><dd>${target?.perms?.max_discount_percent ?? "-"}%</dd></div>
          <div><dt>Zakres klientów</dt><dd>${target?.perms?.can_view_all_clients ? "Wszyscy" : "Przypisani"}</dd></div>
          <div><dt>Zakres kategorii</dt><dd>${Array.isArray(target?.perms?.allowed_tabs) && target.perms.allowed_tabs.length ? target.perms.allowed_tabs.join(", ") : "Brak ograniczeń"}</dd></div>
          <div><dt>Kasowanie ofert</dt><dd>${target?.perms?.can_delete_offers_any ? "Wszystkie" : target?.perms?.can_delete_offers_own ? "Własne" : "Brak"}</dd></div>
        </dl>
        <p class="zgs-note-box">W prototypie zmiany uprawnień aktualizują widoki natychmiast, bez odświeżenia aplikacji.</p>
      </article>
    </section>
  `;

  return withVariantShell(
    ctx,
    "Ustawienia uprawnień",
    "Role, capability flags i limity rabatowe per konto",
    content,
    {
      loadingDesc: "Ładowanie konfiguracji kont i capability flags.",
      emptyDesc: "Brak kont do konfiguracji uprawnień.",
      errorDesc: "Nie udało się pobrać konfiguracji uprawnień.",
      disabledDesc: "Użytkownik nie ma prawa edytować uprawnień.",
    }
  );
}
