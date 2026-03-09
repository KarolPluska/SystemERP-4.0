# Anti-Regression Protocol

## Przed każdą zmianą

- zidentyfikuj moduł główny
- zidentyfikuj moduły zależne
- wypisz możliwe regresje
- sprawdź gdzie jest prawdziwe źródło logiki

## Po każdej zmianie

### Minimalny smoke test
- logowanie
- dashboard
- nowa oferta
- historia ofert
- klient
- modale
- mobile shell

### Jeśli zmiana dotyczy oferty
- przeliczenia pozycji
- podsumowania
- status
- blokada
- duplikacja
- zapis
- historia

### Jeśli zmiana dotyczy klienta
- wybór klienta
- dodanie
- edycja
- grupy
- widoczność wg uprawnień

### Jeśli zmiana dotyczy uprawnień
- zwykłe konto
- konto ograniczone
- super admin
- własne/cudze oferty
- blokada i odblokowanie

### Jeśli zmiana dotyczy PDF
- źródło danych
- układ
- podsumowanie
- wersja po rabacie
- dane klienta i handlowca
- anti-double-click

### Jeśli zmiana dotyczy modali / overlayów
- focus
- aria
- ESC
- click outside
- sandbox restrictions
- mobile scroll lock

## Regresja krytyczna = blocker

Za blocker uznaj:
- utratę możliwości pracy na ofercie
- błąd uprawnień
- błędne wartości cenowe
- rozjechany mobile w kluczowym flow
- niespójny PDF
- uszkodzone przełączanie kont
- wycieki danych lub błędy bezpieczeństwa
