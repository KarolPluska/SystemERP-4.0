# System ERP - START HERE

## Cel tego pakietu

Ten pakiet ma ustawić Codex od pierwszej minuty pracy tak, aby:
- rozumiał **czym jest System ERP**,
- rozumiał **dla kogo powstaje** i jaki problem biznesowy rozwiązuje,
- wiedział **jak ma wyglądać UI/UX**,
- znał **architekturę funkcjonalną** i zależności pomiędzy modułami,
- nie powielał błędów z poprzednich iteracji,
- wykonał **Etap 1** jako:
  - komplet ekranów desktop + mobile,
  - funkcjonalny prototyp o realnej strukturze aplikacji,
  - baza pod finalny plugin WordPress,
- po akceptacji przejść do budowy gotowego rozwiązania bez przepisywania wszystkiego od zera.

## Czym jest System ERP

System ERP to rozbudowany, własny panel operacyjno-ofertowy dla organizacji handlowo-produkcyjnej. To nie jest zwykły formularz ani prosty CRM. To hybryda:
- panelu ofertowego,
- panelu klientów,
- panelu produktów i wariantów,
- systemu uprawnień i kont,
- historii ofert,
- modułu statusów i workflow,
- generatora dokumentów/PDF,
- warstwy analitycznej,
- docelowo szerszego środowiska ERP dla procesów handlowych.

Produkt ma działać jako **premium, wewnętrzny system B2B**, osadzony finalnie w WordPress jako plugin/moduł aplikacyjny, ale z UX zbliżonym bardziej do nowoczesnej aplikacji SaaS niż do typowego panelu WP.

## Zasada nadrzędna

Codex nie może traktować tego projektu jak:
- zwykłego pluginu z formularzem,
- luźnego zlepku modali,
- szybkiego proof-of-concept,
- "jakoś działającego" MVP.

To ma być system, który:
- jest modularny,
- ma przewidywalne flow,
- jest spójny wizualnie,
- jest gotowy do rozbudowy,
- nie psuje istniejących funkcji przy każdej zmianie,
- ma architekturę nadającą się do dalszego rozwoju.

## Co jest obowiązkowe od początku

1. Zrozumienie produktu
2. Zrozumienie użytkowników i ról
3. Zrozumienie wszystkich kluczowych ekranów
4. Zrozumienie zależności danych
5. Zrozumienie kierunku wizualnego
6. Zrozumienie wcześniejszych błędów i regresji
7. Zbudowanie Etapu 1 jako funkcjonalnego blueprintu, nie jako statycznych makiet

## Co robić najpierw

Przeczytaj w tej kolejności:
1. `01_PRODUCT_VISION_AND_GOALS.md`
2. `02_PROJECT_IDENTITY_AND_DOMAIN_MODEL.md`
3. `03_UI_UX_DIRECTION.md`
4. `04_INFORMATION_ARCHITECTURE_AND_SCREENS.md`
5. `05_FULL_FUNCTION_LIBRARY.md`
6. `06_USER_ROLES_PERMISSIONS_AND_SECURITY.md`
7. `07_DATA_FLOW_AND_STATE_RULES.md`
8. `08_PHASE_1_BLUEPRINT_AND_FUNCTIONAL_PROTOTYPE.md`
9. `09_WORDPRESS_PLUGIN_TARGET_ARCHITECTURE.md`
10. `10_IMPLEMENTATION_ORDER.md`
11. `11_CODEX_FAILURES_AND_RULES.md`
12. `12_EXECUTION_PROTOCOL.md`
13. `13_QA_AND_ANTI_REGRESSION.md`
14. `14_DEFINITION_OF_DONE.md`
15. `15_VISUAL_REFERENCE_CHECKLIST.md`
16. `16_PROMPT_FOR_CODEX.md`

## Co ma powstać w Etapie 1

Etap 1 ma dać:
- kompletną wizualizację wszystkich głównych paneli,
- wersję desktop,
- wersję mobile,
- realne flow między ekranami,
- działające przejścia pomiędzy kluczowymi stanami,
- modularny kod prototypu,
- strukturę gotową do późniejszego osadzenia jako plugin.

To nie mogą być same obrazki. To musi być **funkcjonalny prototyp aplikacji** z poprawnym układem, logiką stanów i komponentami.

## Najważniejsze ograniczenia

- Nie zgaduj nazw istniejących plików, endpointów, hooków, tabel i klas.
- Nie twórz fałszywych integracji.
- Nie rozlewaj CSS globalnie.
- Nie psuj mobile.
- Nie ignoruj uprawnień.
- Nie zmieniaj zachowania istniejących modułów bez jasnego powodu.
- Nie wprowadzaj zmian "na oko" bez analizy zależności.

## Oczekiwany styl pracy

- najpierw analiza,
- potem mapa ekranów i stanów,
- potem prototyp,
- potem review,
- potem wdrożenie do finalnej architektury pluginu,
- na każdym kroku kontrola regresji.

## Priorytet projektu

Priorytetem jest:
- jakość architektury,
- spójność UX,
- wydajność,
- bezpieczeństwo,
- możliwość dalszej rozbudowy,
- brak regresji.

Nie wolno optymalizować pod szybkość kosztem jakości architektury i stabilności.
