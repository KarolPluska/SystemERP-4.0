# Mapa Ekranów i Flow

## Mapa ekranów
- `Login`: `#/login`
- `Dashboard`: `#/dashboard`
- `Przełączanie kont`: `#/accounts`
- `Nowa oferta`: `#/offers/new`
- `Edycja oferty`: `#/offers/:id/edit`
- `Historia ofert`: `#/offers/history`
- `Szczegóły oferty`: `#/offers/:id`
- `Klienci`: `#/clients`
- `Dodaj klienta`: `#/clients/new`
- `Edytuj klienta`: `#/clients/:id/edit`
- `Katalog`: `#/catalog`
- `Pozycja niestandardowa`: `#/custom-item`
- `Transport`: `#/transport`
- `Podsumowanie`: `#/summary`
- `Alert zmian cen`: `#/price-alerts`
- `Uprawnienia`: `#/permissions`
- `Profil`: `#/profile`
- `Stany systemowe`: `#/states`
- `Blueprint`: `#/blueprint`

## Flow kluczowe

### 1. Od logowania do gotowej oferty
1. `Login`
2. `Dashboard`
3. `Nowa oferta`
4. `Katalog` / `Pozycja niestandardowa` / `Transport`
5. powrót do `Nowa oferta`
6. `Podsumowanie`
7. `Zapis` lub `Eksport PDF`
8. `Szczegóły oferty`

### 2. Edycja oferty z historii
1. `Historia ofert`
2. `Szczegóły oferty`
3. `Edycja oferty`
4. `Zapis zmian`
5. `Szczegóły oferty`

### 3. Blokada i duplikacja
1. `Historia ofert`
2. oferta ze statusem końcowym (lock)
3. `Duplikuj`
4. `Nowa oferta` (kopiowana robocza)

### 4. Alert zmian cen
1. `Alert zmian cen`
2. analiza różnicy snapshot/live
3. decyzja:
   - `Pomiń`
   - `Aktualizuj snapshot`
4. aktualizacja kontekstu oferty

### 5. Klienci
1. `Klienci`
2. `Dodaj klienta` lub `Edytuj klienta`
3. zapis
4. powrót do listy / wybór klienta do oferty

## Desktop vs mobile
- Każdy flow działa w dwóch trybach:
  - automatycznie z breakpointów,
  - wymuszenie `Desktop/Mobile` z topbara.
