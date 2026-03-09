# QA and Anti-Regression

## Zakres testów obowiązkowych

### Desktop
- Chrome
- Safari
- Edge

### Systemy
- Windows
- macOS

### Mobile
- małe telefony
- standardowe telefony
- większe viewporty mobilne

## Scenariusze testowe bazowe

### Logowanie
- poprawne dane
- błędne dane
- pokaż/ukryj hasło
- focus i klawiatura
- brak błędów overlay/focus

### Przełączanie kont
- zwykłe konto
- konto z ograniczeniami
- super admin
- brak dostępu do wybranych kont
- poprawne odświeżenie kontekstu po zmianie

### Klienci
- wyszukiwanie
- filtrowanie
- dodanie
- edycja
- grupy klientów
- ograniczona widoczność wg uprawnień

### Oferta
- nowa oferta
- edycja oferty
- zapis
- duplikacja
- blokada
- odblokowanie
- statusy
- ważność
- snapshot cen

### Pozycje
- dodanie z katalogu
- dodanie niestandardowej
- edycja ręcznej pozycji
- rabaty
- wartości netto/brutto
- paleta / TIR
- transport
- komentarze

### Historia
- wyszukiwanie
- filtry
- kasowanie jeśli dozwolone
- zmiana statusu
- odświeżenie listy po akcji
- licznik zmian statusu
- kłódka blokady

### PDF
- eksport
- eksport i zapis
- brak duplikacji po wielokliku
- poprawne podsumowania
- poprawna typografia
- poprawny padding
- poprawne dane klienta/handlowca
- spójność z ofertą

### Mobile
- brak overflow-x
- poprawne modale
- poprawny scroll
- czytelność formularzy
- działanie tabel/list w wersji mobilnej
- zachowanie najważniejszych CTA

## Lista regresji do sprawdzania po każdej większej zmianie

- logowanie
- modale
- focus management
- historia
- statusy
- blokady
- uprawnienia
- przeliczenia pozycji
- podsumowanie
- eksport PDF
- responsywność
- wydajność

## Lista błędów, które szczególnie trzeba wyłapywać

- akcja działa, ale UI się nie odświeża
- UI pokazuje możliwość akcji, ale backend jej nie pozwala
- backend pozwala, mimo że UI powinien blokować
- status zmienia się niepoprawnie
- zablokowana oferta daje się jednak edytować
- ręczna cena przechodzi tam, gdzie nie powinna
- snapshot cen nie pokrywa się z aktualną ofertą
- PDF pokazuje inne dane niż panel
- mobile łamie layout
- focus trafia w ukryty element
- sandbox blokuje wzorzec modala/potwierdzenia

## Kryterium jakości

Zmiana jest zaakceptowana dopiero wtedy, gdy:
- działa scenariusz główny,
- nie ma oczywistej regresji w modułach powiązanych,
- desktop i mobile są poprawne,
- UI jest spójny,
- logika uprawnień jest zachowana.
