import { SCREEN_VARIANTS, STATUS_META } from "../data/domain.js";

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function statusBadge(status) {
  const meta = STATUS_META[status] || STATUS_META.unset;
  return `<span class="zgs-badge zgs-badge--${meta.tone}">${escapeHtml(meta.label)}</span>`;
}

export function lockBadge(locked, reason = "") {
  if (!locked) return "<span class=\"zgs-badge zgs-badge--success\">Odblokowana</span>";
  const label = reason === "final_status" ? "Zablokowana - status końcowy" : "Zablokowana ręcznie";
  return `<span class="zgs-badge zgs-badge--danger">${escapeHtml(label)}</span>`;
}

export function variantSwitcher(routeKey, currentVariant = "default") {
  const options = SCREEN_VARIANTS.map((variant) => {
    const selected = variant.key === currentVariant ? "selected" : "";
    return `<option value="${variant.key}" ${selected}>${variant.label}</option>`;
  }).join("");

  return `
    <label class="zgs-field zgs-field--inline" for="zgs-variant-${routeKey}">
      <span>Stan widoku</span>
      <select id="zgs-variant-${routeKey}" data-action="set-variant" data-route-key="${routeKey}">
        ${options}
      </select>
    </label>
  `;
}

export function renderVariantState(variant, config = {}) {
  const states = {
    loading: {
      title: "Ładowanie danych",
      desc: config.loadingDesc || "System pobiera dane i przygotowuje widok.",
      icon: "LD",
    },
    empty: {
      title: "Brak danych",
      desc: config.emptyDesc || "Nie znaleziono rekordów spełniających kryteria.",
      icon: "EM",
    },
    error: {
      title: "Błąd operacji",
      desc: config.errorDesc || "Wystąpił błąd i widok wymaga ponowienia operacji.",
      icon: "ER",
    },
    disabled: {
      title: "Akcja zablokowana",
      desc: config.disabledDesc || "Twoja rola lub stan obiektu blokuje edycję tego modułu.",
      icon: "DS",
    },
  };

  if (!states[variant]) return "";
  const state = states[variant];

  return `
    <section class="zgs-variant-state zgs-variant-state--${variant}" role="status" aria-live="polite">
      <div class="zgs-variant-icon" aria-hidden="true">${state.icon}</div>
      <div>
        <h3>${escapeHtml(state.title)}</h3>
        <p>${escapeHtml(state.desc)}</p>
      </div>
    </section>
  `;
}

export function metricCard(label, value, hint = "") {
  return `
    <article class="zgs-metric">
      <p class="zgs-metric__label">${escapeHtml(label)}</p>
      <p class="zgs-metric__value">${escapeHtml(value)}</p>
      ${hint ? `<p class="zgs-metric__hint">${escapeHtml(hint)}</p>` : ""}
    </article>
  `;
}

export function emptyBlock(title, message, actionLabel = "", actionPath = "") {
  return `
    <section class="zgs-empty">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(message)}</p>
      ${
        actionLabel && actionPath
          ? `<button type="button" class="zgs-btn zgs-btn--secondary" data-nav="${actionPath}">${escapeHtml(actionLabel)}</button>`
          : ""
      }
    </section>
  `;
}

export function tableCell(content) {
  return `<td>${content}</td>`;
}

export function sectionTitle(title, subtitle = "") {
  return `
    <header class="zgs-section-title">
      <h2>${escapeHtml(title)}</h2>
      ${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ""}
    </header>
  `;
}
