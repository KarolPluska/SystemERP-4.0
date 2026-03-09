import { compactNumber, money, shortDate } from "../ui/format.js";
import { metricCard, statusBadge } from "../ui/components.js";
import { withVariantShell, routeVariant } from "./helpers.js";

function statusesMap(offers) {
  return offers.reduce(
    (acc, offer) => {
      acc[offer.status] = (acc[offer.status] || 0) + 1;
      return acc;
    },
    { unset: 0, new: 0, in_progress: 0, sent: 0, won: 0, lost: 0, canceled: 0, needs_update: 0 }
  );
}

export function renderDashboard(ctx) {
  const activeAccount = ctx.actions.getActiveAccount();
  const offers = ctx.actions.getVisibleOffers();
  const clients = ctx.actions.getVisibleClients();

  const statusCounts = statusesMap(offers);
  const won = statusCounts.won || 0;
  const total = offers.length || 1;
  const effectiveness = ((won / total) * 100).toFixed(1);

  const totalNet = offers.reduce((sum, offer) => sum + Number(offer.totals?.netAfter || 0), 0);
  const alerts = ctx.actions.getPriceAlerts();
  const recentOffers = [...offers].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)).slice(0, 4);

  const content = `
    <section class="zgs-grid zgs-grid--kpi">
      ${metricCard("Aktywne oferty", compactNumber(offers.length), `Konto: ${activeAccount?.login || "-"}`)}
      ${metricCard("Wartosc netto", money(totalNet), "Suma netto po rabatach")}
      ${metricCard("Skutecznosc", `${effectiveness}%`, `${won} sukces / ${offers.length} ofert`) }
      ${metricCard("Alerty cen", compactNumber(alerts.length), alerts.length ? "Wymagaja decyzji" : "Brak odchylek")}
      ${metricCard("Klienci w kontekscie", compactNumber(clients.length), "Widocznosc zgodna z uprawnieniami")}
    </section>

    <section class="zgs-grid zgs-grid--2cols">
      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Ostatnie oferty</h3>
          <button class="zgs-btn zgs-btn--ghost" type="button" data-nav="/offers/history">Pełna historia</button>
        </header>
        <div class="zgs-list">
          ${
            recentOffers.length
              ? recentOffers
                  .map(
                    (offer) => `
                    <button class="zgs-list-row" type="button" data-nav="/offers/${offer.id}">
                      <div>
                        <p class="zgs-row-title">${offer.title}</p>
                        <p class="zgs-row-meta">Aktualizacja: ${shortDate(offer.updatedAt)}</p>
                      </div>
                      <div class="zgs-row-side">
                        ${statusBadge(offer.status)}
                        <strong>${money(offer.totals?.netAfter || 0)}</strong>
                      </div>
                    </button>
                  `
                  )
                  .join("")
              : `<p class="zgs-muted">Brak ofert w aktualnym kontekście.</p>`
          }
        </div>
      </article>

      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Szybkie akcje</h3>
        </header>
        <div class="zgs-action-grid">
          <button class="zgs-action" type="button" data-nav="/offers/new">
            <h4>Nowa oferta</h4>
            <p>Start kompletnego flow ofertowego z klientem, pozycjami i podsumowaniem.</p>
          </button>
          <button class="zgs-action" type="button" data-nav="/clients/new">
            <h4>Dodaj klienta</h4>
            <p>Formularz klienta z grupą, walidacją i przypisaniem do kont.</p>
          </button>
          <button class="zgs-action" type="button" data-nav="/catalog">
            <h4>Katalog produktów</h4>
            <p>Kategorie, podkategorie, warianty i cenniki unit/paleta/TIR.</p>
          </button>
          <button class="zgs-action" type="button" data-nav="/price-alerts">
            <h4>Alert zmian cen</h4>
            <p>Porównanie snapshotów z aktualnym cennikiem i decyzje użytkownika.</p>
          </button>
        </div>
      </article>
    </section>

    <section class="zgs-grid zgs-grid--2cols">
      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Rozkład statusów</h3>
        </header>
        <div class="zgs-status-bars">
          ${Object.entries(statusCounts)
            .filter(([, count]) => count > 0)
            .map(([status, count]) => {
              const pct = offers.length ? ((count / offers.length) * 100).toFixed(0) : 0;
              return `
                <div class="zgs-status-row">
                  <div>${statusBadge(status)}</div>
                  <div class="zgs-status-track"><span style="width:${pct}%"></span></div>
                  <strong>${count}</strong>
                </div>
              `;
            })
            .join("")}
        </div>
      </article>

      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Alerty i ryzyka</h3>
        </header>
        <div class="zgs-list">
          ${
            alerts.length
              ? alerts
                  .slice(0, 4)
                  .map(
                    (alert) => `
                    <button class="zgs-list-row" type="button" data-nav="/offers/${alert.offerId}">
                      <div>
                        <p class="zgs-row-title">${alert.offerTitle}</p>
                        <p class="zgs-row-meta">${alert.productName}</p>
                      </div>
                      <div class="zgs-row-side">
                        <span class="zgs-delta ${alert.diff > 0 ? "is-up" : "is-down"}">${money(alert.diff)}</span>
                        <small>${alert.diffPercent.toFixed(1)}%</small>
                      </div>
                    </button>
                  `
                  )
                  .join("")
              : `<p class="zgs-muted">Brak aktywnych alertów zmian cen.</p>`
          }
        </div>
      </article>
    </section>
  `;

  const variant = routeVariant(ctx);
  return withVariantShell(
    ctx,
    "Dashboard",
    "KPI, alerty i szybkie wejścia do kluczowych flow",
    content,
    {
      loadingDesc: "Ładowanie danych KPI i ostatnich aktywności.",
      emptyDesc: "Brak ofert w aktywnym kontekście konta.",
      errorDesc: "Nie udało się pobrać danych dashboardu.",
      disabledDesc: "Widok dashboardu został czasowo wyłączony dla tej roli.",
    }
  );
}
