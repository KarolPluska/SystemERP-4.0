export const STATUS_META = {
  unset: { label: "Brak statusu", tone: "muted" },
  new: { label: "Nowa", tone: "info" },
  in_progress: { label: "W trakcie", tone: "warning" },
  sent: { label: "Wysłana", tone: "accent" },
  won: { label: "Sukces", tone: "success" },
  lost: { label: "Przegrana", tone: "danger" },
  canceled: { label: "Anulowana", tone: "muted" },
  needs_update: { label: "Wymaga aktualizacji", tone: "danger" },
};

export const ROLE_META = {
  super_admin: { label: "Super Admin", scope: "Pełny dostęp" },
  manager: { label: "Menedżer", scope: "Rozszerzony dostęp" },
  sales: { label: "Handlowiec", scope: "Własne i przypisane dane" },
  restricted: { label: "Handlowiec ograniczony", scope: "Tylko przypisani klienci" },
};

export const SCREEN_VARIANTS = [
  { key: "default", label: "Domyślny" },
  { key: "loading", label: "Loading" },
  { key: "empty", label: "Empty" },
  { key: "error", label: "Error" },
  { key: "disabled", label: "Disabled" },
];

export const NAV_SECTIONS = [
  {
    id: "main",
    label: "Operacje",
    links: [
      { path: "/dashboard", label: "Dashboard" },
      { path: "/accounts", label: "Przełączanie kont" },
      { path: "/offers/new", label: "Tworzenie oferty" },
      { path: "/offers/history", label: "Historia ofert" },
      { path: "/clients", label: "Klienci" },
      { path: "/catalog", label: "Katalog produktów" },
      { path: "/custom-item", label: "Pozycja niestandardowa" },
      { path: "/transport", label: "Usługi transportowe" },
      { path: "/summary", label: "Podsumowanie" },
      { path: "/price-alerts", label: "Alert zmian cen" },
    ],
  },
  {
    id: "admin",
    label: "Ustawienia",
    links: [
      { path: "/permissions", label: "Uprawnienia" },
      { path: "/profile", label: "Profil i konto" },
      { path: "/states", label: "Stany systemowe" },
      { path: "/blueprint", label: "Blueprint produktu" },
    ],
  },
];

export const OFFER_VALIDITY_OPTIONS = [7, 14, 21, 30, 45, 60];

export const PRICE_MODES = [
  { key: "unit", label: "Cena standard" },
  { key: "palette", label: "Cena paleta" },
  { key: "tir", label: "Cena TIR" },
];
