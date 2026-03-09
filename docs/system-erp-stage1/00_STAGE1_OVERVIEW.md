# System ERP - Etap 1 Overview

## Cel
Etap 1 dostarcza funkcjonalny prototyp premium B2B z pełnym szkieletem produktu:
- komplet obowiązkowych ekranów,
- wersje desktop i mobile,
- klikalne flow,
- stany loading/empty/error/disabled,
- model domenowy i reguły uprawnień,
- strukturę kodu gotową do migracji do finalnego pluginu WordPress.

## Dostęp do prototypu
- URL: `/?zq_erp_stage1=1`
- Warunek: zalogowany użytkownik WordPress z `current_user_can('manage_options')`.

## Zakres ekranów
1. Logowanie
2. Dashboard
3. Przełączanie kont
4. Tworzenie oferty
5. Edycja oferty
6. Historia ofert
7. Szczegóły oferty
8. Klienci
9. Dodawanie/edycja klienta
10. Katalog produktów
11. Pozycja niestandardowa
12. Usługi transportowe / pozycje dodatkowe
13. Podsumowanie oferty
14. Alert zmian cen
15. Ustawienia uprawnień
16. Profil użytkownika / aktywne konto
17. Ekran stanów systemowych
18. Ekran blueprintu produktu

## Wersje desktop/mobile
- Mobile-first CSS.
- Tryb podglądu `Auto/Desktop/Mobile` wymuszany z topbara.
- Brak `overflow-x` w shellu, responsywne layouty kart/list/tabel.

## Nadrzędne reguły domenowe odwzorowane w prototypie
- statusy ofert + status końcowy,
- blokady i odblokowanie wg roli,
- snapshot cen i alerty delta snapshot vs live,
- role i capability flags,
- kontekst aktywnego konta,
- ograniczenie widoczności klientów,
- podział pozycji: katalogowe/niestandardowe/transport.
