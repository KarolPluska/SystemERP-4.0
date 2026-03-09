# Information Architecture and Screens

## Mapa główna systemu

1. Logowanie
2. Wybór / przełączanie konta
3. Dashboard / landing po wejściu
4. Tworzenie nowej oferty
5. Edycja oferty
6. Historia ofert
7. Szczegóły / podgląd oferty
8. Zarządzanie klientami
9. Dodawanie / edycja klienta
10. Grupy klientów
11. Katalog produktów / wybór pozycji
12. Dodawanie pozycji niestandardowej
13. Usługi transportowe / dodatkowe pozycje
14. Ustawienia kont / uprawnień
15. Profil użytkownika / aktywne konto
16. Moduł zmian statusów i blokad
17. Warstwa eksportu PDF / dokumentów
18. Powiadomienia / alerty zmian cen
19. Statystyki / KPI
20. Ekrany błędów / pustych stanów / ładowania

## Ekrany obowiązkowe do pokazania w Etapie 1

### 1. Ekran logowania
Musi pokazać:
- pole login
- pole hasło
- toggle pokaż/ukryj hasło
- poprawne stany błędu
- loading
- zamknięcie / wejście do systemu
- wersję desktop i mobile

### 2. Ekran wyboru konta / przełączania konta
Musi pokazać:
- aktywne konto
- listę kont dostępnych do przełączenia
- stany uprawnień
- rozróżnienie super admin / zwykłe konto
- stany disabled
- wersję desktop i mobile

### 3. Dashboard / ekran startowy
Musi pokazać:
- podstawowe KPI
- ostatnie oferty
- szybkie akcje
- alerty
- kontekst aktywnego konta
- stan użytkownika
- wersję desktop i mobile

### 4. Ekran tworzenia oferty
Musi pokazać:
- wybór klienta
- handlowca / konta
- tytuł oferty
- status
- ważność
- sekcję pozycji
- sekcję podsumowania
- CTA zapisu / eksportu
- wersję desktop i mobile

### 5. Ekran / modal wyboru klienta
- wyszukiwarka
- filtrowanie
- grupy klientów
- szybki podgląd
- stan pusty
- uprawnienia widoczności

### 6. Ekran dodawania nowego klienta
- formularz
- grupa klienta
- dane kontaktowe
- powiązania
- walidacje
- akcje zapisu/anulowania

### 7. Ekran katalogu produktów / dodawania pozycji
- kategorie
- podkategorie
- wyszukiwarka
- warianty
- kolory / RAL
- ilość
- ceny zwykłe / paleta / TIR
- komentarz
- akcja dodania do oferty

### 8. Ekran dodawania niestandardowej pozycji
- nazwa
- ilość
- cena jednostkowa netto
- rabat
- komentarz
- stany walidacji
- edycja istniejącej pozycji ręcznej

### 9. Podgląd pozycji oferty
Tabela / lista pokazująca:
- pozycja
- ilość
- cena jedn. netto
- rabat %
- wartość netto
- wartość netto po rabacie
- wartość brutto
- wartość brutto po rabacie
- akcje

### 10. Sekcja podsumowania oferty
- razem netto
- razem netto po rabacie
- razem brutto
- razem brutto po rabacie
- ważność
- snapshot danych
- ostrzeżenia

### 11. Historia ofert
- wyszukiwarka
- filtry
- statusy
- licznik zmian statusu
- blokada / odblokowanie
- duplikowanie
- edycja
- usuwanie jeśli uprawnione
- stany empty/loading/error

### 12. Ekran szczegółów oferty
- dane klienta
- dane handlowca
- lista pozycji
- historia zmian
- stan blokady
- status
- akcje eksportu / duplikacji / edycji

### 13. Ekran ustawień kont i uprawnień
- lista kont
- role
- przełączniki uprawnień
- zakres widoczności
- limity rabatów
- kasowanie swoich / wszystkich ofert
- wszyscy klienci / przypisani klienci
- super admin behaviors

### 14. Ekran profilu / menu użytkownika
- aktywne konto
- możliwość przełączania
- podstawowe informacje
- wylogowanie
- skróty

### 15. Moduł alertów o zmianie cen
- popup / panel
- lista produktów ze zmianą
- porównanie cena snapshot vs bieżąca
- czy oferta nadal ważna
- decyzja użytkownika

### 16. Eksport / preview PDF
- przycisk eksportu
- stany loading / disabled
- potwierdzenie zapisu
- uwagi dot. snapshotu i wersji dokumentu

## Stany systemowe do pokazania

Każdy ekran ma mieć pokazane lub przynajmniej zaprojektowane:
- stan domyślny
- stan loading
- stan pusty
- stan błędu
- stan disabled
- stan mobile
- stan z ograniczonymi uprawnieniami

## Zasada krytyczna

Etap 1 nie kończy się na ładnym dashboardzie. Musi pokazać cały produktowy kręgosłup systemu.
