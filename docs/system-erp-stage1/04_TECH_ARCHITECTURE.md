# Architektura Techniczna

## Integracja z pluginem

### Nowa klasa renderująca
- `includes/class-zqos-stage1.php`
- rejestruje query var: `zq_erp_stage1`
- renderuje aplikację z assetów modułu Stage 1
- dostęp zabezpieczony przez:
  - `is_user_logged_in()`
  - `current_user_can('manage_options')`

### Bootstrap pluginu
- `zq-offer-suite.php`:
  - `require_once includes/class-zqos-stage1.php`
  - `ZQOS_Stage1::init()`

## Struktura frontendu prototypu

`assets/erp-stage1/`
- `app.js` - orkiestracja, routing, store, akcje domenowe
- `index.css` - design system + responsywność
- `core/`
  - `router.js` - hash routing z parametrami
  - `store.js` - centralny stan aplikacji
  - `calculations.js` - przeliczenia linii/ofert/statusów
  - `permissions.js` - capability checks
- `data/`
  - `seed.js` - realistyczne dane demo + fabryki draftów
  - `domain.js` - meta statusów, nawigacja, warianty
- `ui/`
  - `shell.js` - app shell (sidebar/topbar/toasty)
  - `components.js` - wspólne komponenty UI
  - `format.js` - formatowanie walut/dat/liczb
- `screens/`
  - komplet ekranów wymaganych przez Etap 1

## Mapa odpowiedzialności
- UI nie trzyma logiki domenowej per ekran - używa akcji centralnych z `app.js`.
- Reguły uprawnień i locków są izolowane w `core/permissions.js`.
- Przeliczenia netto/brutto i statusy są izolowane w `core/calculations.js`.
- Dane demo i model encji są izolowane w `data/seed.js`.

## Gotowość do migracji produkcyjnej
- ekranowy podział modułów odpowiada docelowej mapie ERP,
- możliwość podmiany seed danych na realny adapter REST,
- zachowana separacja: domena / aplikacja / UI / shell,
- brak jednego monolitycznego pliku JS/CSS.

## Bezpieczeństwo WP
- brak mutacji DB po stronie Stage 1,
- brak ujawniania endpointów wrażliwych,
- capability check przy wejściu do prototypu,
- brak `confirm()` - własny modal potwierdzeń.
