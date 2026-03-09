# Definition of Done

## Poziom ekranu

Ekran jest gotowy, gdy:
- ma finalny layout, nie szkic,
- ma wersję desktop,
- ma wersję mobile,
- ma stany loading/empty/error/disabled jeśli dotyczy,
- używa właściwych komponentów systemowych,
- jest spójny z resztą produktu,
- ma logiczne CTA i przepływ.

## Poziom funkcji

Funkcja jest gotowa, gdy:
- działa scenariusz główny,
- działa w granicach uprawnień,
- jest zwalidowana,
- nie powoduje regresji,
- ma sensowny feedback UI,
- działa na mobile jeśli jest używana na mobile.

## Poziom modułu

Moduł jest gotowy, gdy:
- wspiera wszystkie kluczowe flow,
- jest zgodny z modelem domenowym,
- ma czytelny stan,
- ma kontrolę błędów,
- integruje się poprawnie z sąsiednimi modułami,
- nie wymaga manualnych obejść użytkownika.

## Poziom Etapu 1

Etap 1 jest gotowy, gdy:
- wszystkie główne ekrany istnieją,
- wszystkie główne ekrany mają desktop + mobile,
- prototyp jest klikalny i logiczny,
- design system jest spójny,
- role i uprawnienia są uwzględnione,
- statusy i blokady są pokazane,
- oferta, klient, historia, pozycje i ustawienia są pokryte,
- prototyp nadaje się jako baza pod finalny plugin.

## Poziom wdrożenia pluginu

Wdrożenie jest gotowe, gdy:
- architektura jest modularna,
- nie ma zgadywanych integracji,
- bezpieczeństwo jest zachowane,
- style są scoped,
- assety są ładowane warunkowo,
- UI jest spójny z blueprintem,
- krytyczne scenariusze przeszły QA,
- rollback jest możliwy,
- dokumentacja zmian istnieje.
