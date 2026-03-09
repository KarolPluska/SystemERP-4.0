# WordPress Plugin Target Architecture

## Cel architektury

Finalny system ma działać jako plugin WordPress, ale architektura nie może mieć jakości typowego chaotycznego pluginu. Trzeba rozdzielić:
- domenę,
- UI,
- integracje,
- endpointy,
- uprawnienia,
- storage,
- eksport dokumentów.

## Warstwy docelowe

### 1. Warstwa domeny
- oferta
- pozycja
- klient
- konto
- uprawnienia
- status
- snapshot
- historia zmian

### 2. Warstwa aplikacyjna
- use cases / actions
- tworzenie oferty
- zmiana statusu
- blokada / odblokowanie
- eksport PDF
- duplikacja
- porównanie snapshot vs live price

### 3. Warstwa integracji WordPress
- REST endpoints / AJAX - zależnie od przyjętej architektury
- capabilities
- nonce
- storage / tabele / post meta / custom tables - tylko po świadomej decyzji
- admin pages / shortcode / embed

### 4. Warstwa UI
- komponenty
- formularze
- modale
- listy
- layouty
- design system

### 5. Warstwa dokumentów
- generowanie PDF
- snapshot danych
- archiwizacja
- nazewnictwo

## Zasady implementacyjne

- nie mieszać SQL, HTML, logiki domenowej i renderowania w jednym miejscu
- nie wrzucać całej aplikacji do jednego pliku
- nie robić globalnych helperów bez struktury
- stosować namespacing / prefiksy
- warunkowo ładować assety
- wersjonować enqueue
- pilnować zależności skryptów
- izolować style do zakresu projektu

## Zasady CSS

- scope klas, np. `.zgs` / `.zegger-*`
- mobile-first
- brak globalnych override'ów motywu
- brak overflow-x
- brak agresywnego resetowania elementów poza zakresem
- komponenty mają własne odpowiedzialności

## Zasady JS

- namespacing / IIFE / moduły
- brak globalnego śmiecia
- jawne API komponentów
- czytelne eventy i lifecycle
- kontrola wydajności i pamięci
- brak ciężkich re-renderów bez potrzeby

## Zasady PHP

- sanitize input
- escape output
- nonce
- current_user_can
- walidacja ownership
- brak wycieków informacji
- czytelny podział klas i funkcji
- żadnych zmyślonych hooków i klas

## Potencjalne moduły pluginu

- auth / session bridge
- accounts
- customers
- offers
- offer items
- statuses
- permissions
- products
- pricing snapshot
- pdf export
- analytics
- settings
- logs / audit

## Zasada krytyczna

Etap 1 ma już powstawać tak, aby jego struktura mogła zostać przeniesiona do powyższej architektury bez totalnej przebudowy.
