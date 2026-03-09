# QA, Anti-regression i Rollback

## Smoke test (manual)
1. Wejście: `/?zq_erp_stage1=1`
2. Logowanie:
   - poprawne demo (`handlowiec.north` / `demo123`)
   - błędne dane
   - toggle hasła
3. Dashboard:
   - KPI
   - alerty
   - szybkie akcje
4. Przełączanie kont:
   - super admin przełącza
   - handlowiec bez uprawnienia ma disabled
5. Oferta:
   - nowa oferta
   - dodanie pozycji katalogowej
   - dodanie pozycji niestandardowej
   - dodanie transportu
   - zapis i szczegóły
6. Historia:
   - filtry
   - duplikacja
   - blokada/odblokowanie
   - usuwanie z modalem potwierdzenia
7. Klienci:
   - filtrowanie
   - dodanie
   - edycja
8. Alert zmian cen:
   - pominięcie alertu
   - aktualizacja snapshotu
9. Uprawnienia:
   - przełączanie konta docelowego
   - toggle capability
10. Profil / aktywne konto
11. Stany loading/empty/error/disabled
12. Widok mobile + desktop (przełącznik topbar)

## Anty-regresja
Po każdej zmianie sprawdzić:
- logowanie,
- przełączanie kont,
- flow oferty (new/edit/history/details),
- klienta,
- blokady/statusy,
- alerty cenowe,
- modal potwierdzenia,
- responsive shell.

## Rollback
Zakres Stage 1 jest odseparowany, więc rollback jest prosty:
1. usunąć `require_once` i `ZQOS_Stage1::init()` z `zq-offer-suite.php`,
2. usunąć `includes/class-zqos-stage1.php`,
3. usunąć `assets/erp-stage1/`,
4. usunąć `docs/system-erp-stage1/`.

Stary panel (`ZQOS_Panel`) pozostaje bez zmian funkcjonalnych.
