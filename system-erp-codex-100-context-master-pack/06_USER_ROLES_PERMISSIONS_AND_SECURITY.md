# User Roles, Permissions and Security

## Role systemowe

### 1. Zwykłe konto handlowe
Zakres:
- tworzenie ofert
- edycja własnych ofert, jeśli nie są zablokowane
- dostęp do przypisanych klientów
- ograniczone rabaty
- ograniczona widoczność danych

### 2. Konto menedżerskie / administracyjne
Zakres:
- szerszy wgląd w oferty
- możliwość zarządzania wybranymi kontami
- rozszerzone raporty
- możliwość ingerencji w statusy

### 3. Super admin
Zakres:
- przełączanie pomiędzy kontami
- pełny podgląd danych
- możliwość odblokowywania ofert
- możliwość kasowania wszystkich ofert
- możliwość pracy ponad ograniczeniami zwykłego konta

## Uprawnienia, które muszą być osobno modelowane

- może kasować swoje
- może kasować wszystkie
- może blokować / odblokowywać
- widzi wszystkich klientów
- widzi tylko przypisanych klientów
- może szukać klientów
- może edytować pozycje niestandardowe
- może ustawiać rabat powyżej limitu
- może zmieniać statusy
- może eksportować PDF
- może edytować zablokowane oferty
- może przełączać konta
- może zarządzać kontami
- może widzieć pełną historię

## Zasady bezpieczeństwa WordPress

- wszystkie akcje mutujące muszą przechodzić przez walidację uprawnień
- używaj nonce dla operacji zapisu/edycji/usuwania
- sprawdzaj uprawnienia serwerowo, nie tylko po stronie UI
- sanityzuj input
- escapuj output
- nie pokazuj w błędach danych wrażliwych ani informacji implementacyjnych
- nie zakładaj, że ukrycie przycisku = zabezpieczenie
- waliduj ownership oferty/klienta/konta

## Zasady bezpieczeństwa UI

- użytkownik nie może mieć złudzenia, że wykonał akcję, która została odrzucona
- disabled state ma być jednoznaczny
- akcje krytyczne mają mieć potwierdzenie
- po odrzuceniu akcji system ma czytelnie pokazać dlaczego

## Zasady bezpieczeństwa danych biznesowych

- oferta zablokowana nie może być edytowalna przez nieuprawnione konto
- status wysłana / zrealizowana / odrzucona może powodować blokadę
- snapshot cen musi być niezmienny dla kontekstu historycznego
- porównania cen muszą być czytelne i oparte na rzeczywistych danych
- dane klienta muszą być widoczne tylko zgodnie z uprawnieniami

## Zasady projektowe dla Codex

- nie implementuj "na skróty" żadnej akcji krytycznej
- jeśli nie znasz istniejącej struktury capabilities - nie wymyślaj jej
- najpierw zidentyfikuj realny model uprawnień albo zaprojektuj nowy w sposób jawny i spójny
- nie mieszaj logiki bezpieczeństwa po różnych warstwach bez planu
