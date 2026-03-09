# Design System - Etap 1

## Kierunek
- premium B2B
- minimalistyczny, techniczny, spokojny
- bez estetyki WordPress admin plugin

## Tokeny
Plik: `assets/erp-stage1/index.css`
- kolory: `--zgs-bg`, `--zgs-surface`, `--zgs-accent`, `--zgs-danger`, `--zgs-success`, `--zgs-warning`
- spacing: `--zgs-space-1..8`
- radius: `--zgs-radius-xs..lg`
- cienie: `--zgs-shadow-soft`, `--zgs-shadow-strong`

## Komponenty bazowe
- `zgs-btn` + warianty:
  - `--primary`
  - `--secondary`
  - `--ghost`
  - `--danger`
- `zgs-badge` + warianty statusowe
- `zgs-card` (bazowa jednostka layoutu)
- `zgs-field` (input/select/textarea)
- `zgs-table` + `zgs-table-wrap`
- `zgs-variant-state` (loading/empty/error/disabled)
- `zgs-modal` (potwierdzenia krytycznych akcji)
- `zgs-toast` (feedback po akcjach)

## Stany UI
- loading
- empty
- error
- disabled
- domyślny

Każdy ekran ma przełącznik `Stan widoku` do demonstracji stanów.

## Responsywność
- mobile-first
- wymuszany podgląd `Auto/Desktop/Mobile`
- brak globalnego `overflow-x`
- responsywne siatki i alternatywa dla tabel na małych viewportach

## Scope i bezpieczeństwo styli
- wszystkie klasy prefiksowane `zgs-`
- brak globalnych override poza `body.zgs`
- brak resetów ingerujących w motyw poza modułem prototypu
