import { withVariantShell } from "./helpers.js";

const screenMap = [
  "Logowanie",
  "Dashboard",
  "Przełączanie kont",
  "Tworzenie oferty",
  "Edycja oferty",
  "Historia ofert",
  "Szczegóły oferty",
  "Klienci",
  "Dodawanie/edycja klienta",
  "Katalog produktów",
  "Pozycja niestandardowa",
  "Transport i pozycje dodatkowe",
  "Podsumowanie oferty",
  "Alert zmian cen",
  "Ustawienia uprawnień",
  "Profil / aktywne konto",
  "Stany loading/empty/error/disabled",
];

const flowMap = [
  "Login -> Account Context -> Dashboard",
  "Dashboard -> Nowa oferta -> Katalog/Custom/Transport -> Podsumowanie -> Zapis/Export",
  "Historia -> Szczegóły -> Edycja lub Duplikacja",
  "Klienci -> Formularz klienta -> Powrót do oferty",
  "Zmiana statusu -> Blokada finalna -> Duplikacja jako nowa",
  "Snapshot cen -> Alert zmian -> Decyzja (aktualizacja/pominięcie)",
];

const architectureBlocks = [
  {
    title: "Warstwa domeny",
    items: ["Konto", "Klient", "Oferta", "Pozycja", "Status", "Snapshot", "Historia"],
  },
  {
    title: "Warstwa aplikacyjna",
    items: ["Use cases", "Walidacje", "Reguły uprawnień", "Workflow blokad"],
  },
  {
    title: "Warstwa UI",
    items: ["App shell", "Design system", "Ekrany", "Stany systemowe"],
  },
  {
    title: "Warstwa WP",
    items: ["REST/AJAX", "Nonce/capabilities", "Storage", "Bridge pluginu"],
  },
];

export function renderBlueprint(ctx) {
  const content = `
    <section class="zgs-grid zgs-grid--2cols">
      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Mapa ekranów Etapu 1</h3>
        </header>
        <ol class="zgs-ordered">
          ${screenMap.map((item) => `<li>${item}</li>`).join("")}
        </ol>
      </article>

      <article class="zgs-card">
        <header class="zgs-card-head">
          <h3>Mapa flow użytkownika</h3>
        </header>
        <ol class="zgs-ordered">
          ${flowMap.map((item) => `<li>${item}</li>`).join("")}
        </ol>
      </article>
    </section>

    <section class="zgs-card">
      <header class="zgs-card-head">
        <h3>Blueprint architektury docelowej (WP-ready)</h3>
      </header>
      <div class="zgs-architecture-grid">
        ${architectureBlocks
          .map(
            (block) => `
            <article>
              <h4>${block.title}</h4>
              <ul>
                ${block.items.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </article>
          `
          )
          .join("")}
      </div>
    </section>

    <section class="zgs-card">
      <header class="zgs-card-head">
        <h3>Zasady jakości i anty-regresja</h3>
      </header>
      <ul class="zgs-bullets">
        <li>Brak zgadywania nazw hooków/API - tylko realne mapowanie domeny i integracji.</li>
        <li>Mobile-first i brak overflow-x dla wszystkich kluczowych paneli.</li>
        <li>Spójne modale, CTA, statusy i feedbacki UI.</li>
        <li>Uprawnienia, blokady i snapshoty cen odzwierciedlone w każdym kluczowym flow.</li>
        <li>Kod prototypu jest modułowy i przygotowany pod migrację do pluginu produkcyjnego.</li>
      </ul>
    </section>
  `;

  return withVariantShell(
    ctx,
    "Blueprint produktu",
    "Mapa domeny, ekranów, flow i architektury pod wdrożenie pluginowe",
    content,
    {
      loadingDesc: "Ładowanie blueprintu i map architektury.",
      emptyDesc: "Brak danych blueprintu.",
      errorDesc: "Nie udało się wyrenderować blueprintu.",
      disabledDesc: "Widok blueprintu niedostępny.",
    }
  );
}
