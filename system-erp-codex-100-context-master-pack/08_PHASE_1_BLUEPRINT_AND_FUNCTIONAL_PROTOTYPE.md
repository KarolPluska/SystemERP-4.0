# Phase 1 - Blueprint and Functional Prototype

## Cel Etapu 1

Etap 1 ma stworzyć jednocześnie:
- pełny blueprint produktu,
- komplet głównych ekranów,
- funkcjonalny prototyp,
- bazę pod finalny plugin.

To nie są "same makiety".
To nie jest "sam design".
To nie jest "sam front bez myślenia o wdrożeniu".

To ma być prototyp wyglądający jak prawie gotowy produkt i posiadający realny szkielet aplikacji.

## Co dokładnie ma powstać

### A. Warstwa wizualna
Każdy kluczowy ekran ma być pokazany w wersji:
- desktop
- mobile

### B. Warstwa funkcjonalna
Prototyp ma mieć:
- routing lub logiczne przejścia między ekranami,
- działające modale / drawery / panele,
- formularze z walidacją UI,
- przykładowe dane realistyczne,
- statusy,
- loadingi,
- puste stany,
- warianty uprawnień.

### C. Warstwa architektoniczna
Kod prototypu ma być:
- modułowy,
- czytelny,
- gotowy do przekształcenia w finalny plugin,
- bez potrzeby przepisywania od zera po akceptacji.

## Lista obowiązkowych paneli w Etapie 1

1. Logowanie
2. Dashboard
3. Wybór i przełączanie kont
4. Tworzenie oferty
5. Edycja oferty
6. Historia ofert
7. Szczegóły oferty
8. Zarządzanie klientami
9. Dodaj/edytuj klienta
10. Wybór produktów / katalog
11. Dodaj pozycję niestandardową
12. Usługi transportowe / pozycje dodatkowe
13. Podsumowanie oferty
14. Alert zmian cen
15. Ustawienia kont i uprawnień
16. Profil użytkownika / menu konta
17. Empty / loading / error states

## Jak mają wyglądać grafiki

Grafiki nie mogą być luźnymi screenami bez kontekstu.
Każda plansza ma pokazywać:
- tytuł ekranu,
- stan,
- wariant desktop/mobile,
- najważniejsze interakcje,
- strukturę informacji.

Najlepiej:
- osobne plansze per ekran,
- oraz plansze "user flow" łączące ekrany w proces.

## Jak ma wyglądać funkcjonalny prototyp

- klikalne przejścia
- realna struktura komponentów
- gotowe style
- spójny design system
- dane demonstracyjne odzwierciedlające realne przypadki biznesowe
- przynajmniej podstawowa logika przełączania stanów

## Czego nie wolno zrobić

- nie robić samych screenshotów bez logiki
- nie budować wszystkiego jako jednego ogromnego pliku
- nie odkładać mobile "na później"
- nie udawać finalnej architektury, gdy kod jest tylko jednorazowym mockiem
- nie powielać błędów z poprzednich iteracji:
  - zgadywania,
  - niespójnych modali,
  - złej responsywności,
  - losowych akcji,
  - braku spójnych statusów,
  - braków w uprawnieniach.

## Definition of Ready dla końca Etapu 1

Etap 1 jest gotowy dopiero wtedy, gdy:
- wszystkie główne ekrany istnieją,
- desktop i mobile są pokazane,
- główne flow są klikalne,
- kluczowe stany systemu są odwzorowane,
- architektura komponentów jest sensowna,
- design system jest spójny,
- prototyp można zaakceptować jako bazę do wdrożenia produkcyjnego.

## Przejście do Etapu 2

Po zatwierdzeniu Etapu 1:
- nie wyrzucaj prototypu,
- nie buduj wszystkiego od zera,
- użyj przygotowanego podziału komponentów, ekranów i logiki jako bazy pod finalny plugin WordPress.
