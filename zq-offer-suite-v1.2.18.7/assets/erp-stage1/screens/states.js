import { renderVariantState } from "../ui/components.js";
import { withVariantShell } from "./helpers.js";

const modules = [
  { key: "login", label: "Logowanie" },
  { key: "dashboard", label: "Dashboard" },
  { key: "offers-history", label: "Historia ofert" },
  { key: "offer-form", label: "Tworzenie/edycja oferty" },
  { key: "clients", label: "Klienci" },
  { key: "catalog", label: "Katalog produktów" },
  { key: "summary", label: "Podsumowanie" },
  { key: "price-alerts", label: "Alerty cenowe" },
  { key: "permissions", label: "Uprawnienia" },
  { key: "profile", label: "Profil" },
];

export function renderStates(ctx) {
  const variants = ["loading", "empty", "error", "disabled"];

  const cards = modules
    .map((module) => {
      const blocks = variants
        .map(
          (variant) => `
            <article class="zgs-state-card">
              <h4>${module.label} - ${variant.toUpperCase()}</h4>
              ${renderVariantState(variant)}
            </article>
          `
        )
        .join("");

      return `
        <section class="zgs-card">
          <header class="zgs-card-head">
            <h3>${module.label}</h3>
          </header>
          <div class="zgs-state-grid">${blocks}</div>
        </section>
      `;
    })
    .join("");

  const content = `
    <section class="zgs-card">
      <header class="zgs-card-head">
        <h3>Kluczowe stany systemu</h3>
      </header>
      <p class="zgs-note-box">To ekran referencyjny - pokazuje docelowe wzorce loading/empty/error/disabled wymagane dla wszystkich krytycznych paneli systemu.</p>
    </section>
    ${cards}
  `;

  return withVariantShell(
    ctx,
    "Stany loading / empty / error / disabled",
    "Biblioteka stanów systemowych do użycia w każdym module",
    content,
    {
      loadingDesc: "Ładowanie biblioteki stanów.",
      emptyDesc: "Brak zdefiniowanych stanów modułów.",
      errorDesc: "Błąd renderowania biblioteki stanów.",
      disabledDesc: "Biblioteka stanów jest niedostępna.",
    }
  );
}
