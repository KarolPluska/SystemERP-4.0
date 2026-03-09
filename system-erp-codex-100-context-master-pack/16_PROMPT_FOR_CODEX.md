# Prompt for Codex

Masz zbudować System ERP jako nowoczesny, premium panel operacyjno-ofertowy osadzony finalnie w WordPress, ale jakościowo bliższy aplikacji SaaS niż typowemu pluginowi WP.

Twoim pierwszym zadaniem nie jest robienie przypadkowych patchy. Najpierw masz zrozumieć produkt jako całość.

## Co musisz rozumieć

- czym jest System ERP
- jaki jest jego cel biznesowy
- jakie encje domenowe obsługuje
- jakie są role użytkowników
- jakie są zależności między ofertą, klientem, kontem, pozycjami, statusami i snapshotami cen
- jaki ma być kierunek UI/UX
- jakie błędy były wcześniej popełniane i czego nie wolno powielać

## Co masz zrobić w Etapie 1

Masz przygotować:
- komplet głównych ekranów systemu,
- wersję desktop i mobile dla każdego kluczowego panelu,
- wizualny blueprint całego produktu,
- funkcjonalny prototyp z realną strukturą komponentów i przepływami,
- architekturę kodu, która po akceptacji stanie się bazą pod gotowy plugin WordPress.

To nie mogą być same obrazki. To ma być funkcjonalny prototyp.

## Obowiązkowe ekrany

- logowanie
- dashboard
- przełączanie kont
- tworzenie oferty
- edycja oferty
- historia ofert
- szczegóły oferty
- klienci
- dodawanie/edycja klienta
- katalog produktów
- dodanie pozycji niestandardowej
- usługi transportowe / pozycje dodatkowe
- podsumowanie oferty
- alert zmian cen
- ustawienia uprawnień
- profil użytkownika / aktywne konto
- wszystkie kluczowe stany loading/empty/error/disabled

## Najważniejsze zasady

1. Nie zgaduj nazw plików, hooków, endpointów, selektorów, klas, tabel i API.
2. Nie buduj niczego bez rozumienia modelu produktu.
3. Nie traktuj mobile jako dodatku.
4. Nie projektuj niespójnych modali i przycisków.
5. Nie ignoruj uprawnień, blokad i snapshotów cen.
6. Nie rób lokalnych patchy bez analizy wpływu na system.
7. Nie opieraj UX krytycznych akcji na wzorcach typu native confirm w sandboxie.
8. Nie psuj istniejących flow.
9. Nie projektuj "tymczasowego" UI - prototyp ma wyglądać docelowo.
10. Kod ma nadawać się do dalszej rozbudowy, a nie do wyrzucenia po akceptacji.

## Kierunek wizualny

- premium B2B
- minimalistyczny
- spójny
- czytelny
- techniczny
- spokojny
- nowoczesny
- bez efektu "WordPress admin plugin"

## Architektura pracy

Najpierw:
- analiza
- model domenowy
- mapa ekranów
- mapa flow
- design system
- blueprint

Następnie:
- funkcjonalny prototyp desktop + mobile

Dopiero potem:
- przygotowanie do wdrożenia jako finalny plugin

## Kryterium sukcesu

Sukcesem nie jest samo "działa".
Sukcesem jest:
- spójny produkt,
- pełne zrozumienie celu,
- dobry UX,
- dobra architektura,
- brak powielania wcześniejszych błędów,
- prototyp gotowy do przejścia w produkcję.

Przed pracą przeczytaj wszystkie pliki z tego pakietu i traktuj je jako nadrzędny brief projektu.
