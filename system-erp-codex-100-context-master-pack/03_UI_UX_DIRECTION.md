# UI / UX Direction

## Ogólny kierunek wizualny

System ma wyglądać jak nowoczesna aplikacja premium B2B:
- minimalistyczna,
- elegancka,
- spokojna,
- techniczna,
- uporządkowana,
- bez przesadnej dekoracyjności.

To ma być estetyka:
- czysta,
- profesjonalna,
- dojrzała,
- z naciskiem na czytelność danych i workflow.

## Klimat wizualny

- jasne/szare tła albo ciemniejsze, ale kontrolowane powierzchnie robocze
- miękkie radiusy
- dobrze uporządkowana siatka
- wyraźna hierarchia nagłówków
- subtelne cienie
- rozmycia tylko tam, gdzie mają sens
- akcent koloru wyłącznie do ważnych stanów i CTA
- statusy i komunikaty muszą być czytelne, ale nie agresywne

## Czego unikać

- wrażenia "WordPress admin plugin"
- zbyt ciasnego UI
- zbyt dużej liczby ostrych obramowań
- losowych kolorów
- przeładowania przyciskami
- zbyt ciężkich tabel bez hierarchii
- zbyt małej ilości oddechu w interfejsie
- rozjeżdżających się modali i breakpointów
- zduplikowanych wzorców komponentów

## Zasady układu

### Desktop
- lewy panel nawigacyjny albo stabilna top-nawigacja z wyraźnym układem sekcji
- główny obszar roboczy z czytelną strukturą
- sekcje kartowe tam, gdzie dane trzeba logicznie grupować
- sticky elementy tam, gdzie ułatwiają pracę
- wyraźny podział na:
  - kontekst użytkownika / konta,
  - obszar list,
  - obszar edycji,
  - obszar podsumowania.

### Mobile
- nie może być miniaturą desktopu
- pełne przeprojektowanie gęstości treści
- priorytetyzacja akcji
- stack pionowy
- kontrola wysokości i scrolla
- bez overflow-x
- formularze, tabele i sekcje muszą mieć wersję mobilną z zachowaniem używalności

## Zasady komponentów

### Przyciski
- rozróżnienie primary / secondary / tertiary / destructive
- czytelne stany hover/focus/disabled/loading
- brak przypadkowych stylów per ekran

### Inputy
- konsekwentny styl
- poprawne etykiety
- poprawne stany błędu
- wsparcie dla disabled / readonly / invalid / pending

### Tabele i listy
- czytelna typografia
- sensowne spacingi
- logiczne grupowanie
- sticky kolumny/sekcje tylko tam, gdzie potrzebne
- na mobile alternatywny układ kart/list

### Modale
- spójny wzorzec
- poprawne focus management
- brak problemów typu aria-hidden na focusem elemencie
- zamykanie kontrolowane
- brak przypadkowego zamykania w krytycznych flow jeśli to niepożądane
- w sandboxie nie używać rozwiązań typu native confirm/alert jako podstawy UX

### Statusy
- zawsze ten sam system kolorów i etykiet
- status musi mieć warstwę wizualną i logiczną
- licznik zmian statusu też ma być obecny, jeśli funkcja tego wymaga

## Hierarchia informacji

Na ekranie użytkownik ma najpierw widzieć:
1. gdzie jest
2. nad czym pracuje
3. co jest najważniejsze teraz
4. jakie ma dostępne akcje
5. co jest skutkiem jego działania

## Wymagania dot. stylu prototypu

W Etapie 1 prototyp ma już wyglądać docelowo, a nie "tymczasowo":
- gotowa typografia
- gotowe spacingi
- gotowe wzorce komponentów
- gotowe stany formularzy
- gotowa siatka layoutowa
- gotowe statusy
- gotowy system modali / drawerów / overlayów

## Priorytety UX

1. Czytelność
2. Przewidywalność
3. Spójność
4. Szybkość obsługi
5. Ograniczenie błędów użytkownika
6. Dobra obsługa mobile
7. Gotowość na rozbudowę

## Wniosek

UI ma być na tyle dopracowane, żeby klient po zobaczeniu Etapu 1 miał wrażenie:
- "to już jest prawie gotowy produkt",
a nie:
- "to jest szkic, który kiedyś może będzie wyglądał dobrze".
