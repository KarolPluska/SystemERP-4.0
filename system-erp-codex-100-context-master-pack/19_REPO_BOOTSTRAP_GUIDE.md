# Repo Bootstrap Guide

## Cel

Ten plik opisuje, jak powinno wyglądać rozpoczęcie pracy nad repo, aby uniknąć chaosu.

## Kolejność tworzenia struktury

1. dokumentacja i mapa modułów
2. design system
3. app shell
4. routing / mapa ekranów
5. ekrany prototypu
6. stany i dane demonstracyjne
7. test przejść użytkownika
8. przygotowanie pod integrację pluginową

## Zalecana struktura logiczna

- docs/
- design-system/
- app-shell/
- modules/
  - auth/
  - accounts/
  - dashboard/
  - customers/
  - offers/
  - offer-items/
  - products/
  - permissions/
  - history/
  - pdf/
  - analytics/
- shared/
- adapters/
- wp-bridge/

## Czego nie robić

- nie wrzucać wszystkiego do jednego pliku
- nie mieszać design systemu z logiką biznesową
- nie zaczynać od randomowych bugfixów bez struktury
- nie budować repo wokół pojedynczego modala lub jednej listy
