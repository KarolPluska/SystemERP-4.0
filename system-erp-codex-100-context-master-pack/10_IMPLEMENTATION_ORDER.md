# Implementation Order

## Faza 0 - Analiza i mapa produktu

1. Przeczytaj cały pakiet
2. Wypisz moduły i ekrany
3. Wypisz encje i relacje
4. Wypisz stany systemowe
5. Wypisz ryzyka regresji
6. Zdefiniuj spójny design system

## Faza 1 - Blueprint + funkcjonalny prototyp

7. Zbuduj layout aplikacji
8. Zbuduj design system
9. Zbuduj ekran logowania
10. Zbuduj przełączanie kont
11. Zbuduj dashboard
12. Zbuduj historię ofert
13. Zbuduj ekran oferty
14. Zbuduj klienta i grupy klientów
15. Zbuduj katalog pozycji
16. Zbuduj pozycje niestandardowe
17. Zbuduj podsumowania
18. Zbuduj ustawienia i uprawnienia
19. Zbuduj stany empty/loading/error
20. Zbuduj mobile warianty wszystkich kluczowych ekranów

## Faza 2 - Walidacja blueprintu

21. Sprawdź spójność ekranów
22. Sprawdź flow użytkownika
23. Sprawdź spójność statusów
24. Sprawdź spójność komponentów
25. Sprawdź mobile
26. Sprawdź dostępność
27. Sprawdź czy prototyp nadaje się jako baza do wdrożenia

## Faza 3 - Finalna architektura pluginu

28. Podziel kod na moduły
29. Zaprojektuj storage i integracje
30. Zaprojektuj endpointy / akcje
31. Zaprojektuj model uprawnień
32. Zaprojektuj mechanikę snapshotów
33. Zaprojektuj historię zmian
34. Zaprojektuj eksport PDF

## Faza 4 - Implementacja produkcyjna

35. Zaimplementuj auth/konta
36. Zaimplementuj klientów
37. Zaimplementuj oferty
38. Zaimplementuj pozycje
39. Zaimplementuj statusy i blokady
40. Zaimplementuj snapshot cen
41. Zaimplementuj historię zmian
42. Zaimplementuj PDF
43. Zaimplementuj analitykę
44. Zaimplementuj ustawienia i uprawnienia

## Faza 5 - QA i anty-regresja

45. Testy manualne desktop
46. Testy manualne mobile
47. Testy uprawnień
48. Testy blokad
49. Testy snapshotów
50. Testy eksportu PDF
51. Testy wydajności
52. Testy scenariuszy skrajnych

## Zasada kolejności

Nie wolno:
- zaczynać od przypadkowych patchy bez mapy systemu
- budować PDF zanim model oferty nie jest stabilny
- odkładać mobile na sam koniec
- odkładać uprawnień "bo później"
- mieszać prototypu i wdrożenia bez planu migracji
