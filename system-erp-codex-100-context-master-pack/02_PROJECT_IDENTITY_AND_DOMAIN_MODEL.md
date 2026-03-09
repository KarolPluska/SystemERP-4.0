# Project Identity and Domain Model

## Tożsamość projektu

System ERP to aplikacja domenowa dla procesów handlowych. Jego rdzeń to "oferta", ale oferta jest osadzona w szerszym modelu biznesowym.

## Główne encje domenowe

### Konto / użytkownik
Reprezentuje osobę pracującą w systemie albo kontekst konta sprzedażowego.
Atrybuty przykładowe:
- id konta
- nazwa
- rola
- zestaw uprawnień
- powiązane konta podrzędne
- widoczność klientów/ofert/kategorii
- limity rabatowe
- status aktywności

### Klient
Reprezentuje firmę, osobę lub grupę klientów.
Atrybuty:
- nazwa
- dane kontaktowe
- grupa klientów
- placówki / przedstawiciele
- przypisanie do kont handlowych
- historia ofert
- notatki

### Grupa klienta
Pozwala logicznie łączyć wielu przedstawicieli/placówek w jedną strukturę biznesową.

### Oferta
Najważniejsza encja procesowa.
Atrybuty:
- numer / kod / identyfikator
- tytuł
- status
- ważność
- blokada
- snapshot cen
- lista pozycji
- klient
- handlowiec
- komentarze
- daty utworzenia/edycji
- historia zmian
- eksport PDF

### Pozycja oferty
Atrybuty:
- nazwa
- SKU
- wariant
- ilość
- cena jednostkowa netto
- rabat
- wartości netto/brutto
- wartości po rabacie
- komentarz
- źródło danych
- tryb specjalny / niestandardowy

### Produkt / katalog
Atrybuty:
- kategoria
- podkategoria
- warianty
- kolory / RAL
- ceny bazowe
- ceny paleta / TIR
- jednostki logistyczne
- dostępność
- metadane

### Status oferty
Stany biznesowe, np.:
- nowa
- w trakcie
- wysłana
- sukces
- odrzucona
- brak statusu
- zrealizowana
Status wpływa na workflow, blokady i analitykę.

### Snapshot cen
Zamrożony stan danych cenowych na dzień oferty.
Pozwala porównać aktualny cennik z historycznym stanem oferty.

### Historia zmian
Rejestr zmian istotnych biznesowo:
- zmiany statusu,
- zmiany pozycji,
- blokada/odblokowanie,
- zmiana klienta,
- różnice cenowe,
- duplikacje.

## Relacje kluczowe

- konto ma wiele ofert
- klient może mieć wiele ofert
- grupa klienta może mieć wielu klientów/punktów kontaktowych
- oferta ma wiele pozycji
- pozycja może pochodzić z katalogu lub być niestandardowa
- oferta ma snapshot cen
- oferta ma historię zmian
- konto ma określony zakres widoczności danych

## Zasady modelowania

- oferta jest centralnym obiektem procesu
- UI ma być budowane wokół realnych obiektów domenowych, nie wokół przypadkowych modali
- wszystkie ważne interakcje muszą mieć uzasadnienie w modelu danych
- status, blokada i uprawnienia nie mogą być "dopisane na końcu" - muszą być w rdzeniu projektu

## Skutek dla UX

Każdy ekran ma odpowiadać na jedno z pytań:
- kim jestem w systemie?
- na jakim koncie pracuję?
- na jakim kliencie pracuję?
- jaką ofertę tworzę/edytuję?
- jakie pozycje są w ofercie?
- jaki jest status i stan dokumentu?
- co mogę zrobić zgodnie z moimi uprawnieniami?
