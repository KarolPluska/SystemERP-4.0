# Product Vision and Goals

## Wizja produktu

System ERP ma być centralnym środowiskiem pracy handlowej i ofertowej. Użytkownik ma mieć poczucie pracy w profesjonalnym systemie operacyjnym, a nie w panelu zlepionym z modali i przypadkowych formularzy.

System ma być:
- szybki,
- czytelny,
- nowoczesny,
- bezpieczny,
- modularny,
- przewidywalny.

## Główne cele biznesowe

### 1. Skrócenie czasu tworzenia oferty
Handlowiec ma przechodzić od zalogowania do gotowej oferty możliwie szybko, bez chaosu i bez ręcznego sklejania danych.

### 2. Ograniczenie błędów operacyjnych
System ma narzucać poprawny workflow i walidować dane:
- dane klienta,
- pozycje,
- ceny,
- rabaty,
- statusy,
- blokady,
- uprawnienia.

### 3. Zachowanie pełnej historii i kontroli nad ofertą
Każda oferta ma mieć historię:
- kto utworzył,
- kto zmienił,
- jaki miała status,
- kiedy była blokowana/odblokowywana,
- czy dane cenowe uległy zmianie względem snapshotu.

### 4. Jedna spójna przestrzeń robocza
Użytkownik nie może być zmuszany do skakania po dziesiątkach niespójnych ekranów. Nawet jeśli modułów jest dużo, całość ma sprawiać wrażenie jednego ekosystemu.

### 5. Baza pod dalszy rozwój ERP
Oferta jest początkiem. Docelowo ten system ma móc rozszerzać się o:
- kolejne moduły klientów,
- większy workflow sprzedażowy,
- raporty,
- synchronizacje z zewnętrznymi systemami,
- dodatkowe operacje handlowe i administracyjne.

## Typy użytkowników

- handlowiec
- menedżer
- administrator kont
- super admin
- użytkownicy z ograniczonym zakresem widoczności

## Główne zasady UX produktu

- ma wyglądać jak aplikacja premium B2B
- ma być intuicyjny przy dużej złożoności
- ma redukować obciążenie poznawcze
- ma eksponować rzeczy ważne, ale bez przesadnej agresji wizualnej
- ma być bardzo czytelny w danych liczbowych
- ma dobrze działać na desktop i mobile

## Główne zasady techniczne

- brak zgadywania istniejącej struktury backendu
- architektura komponentowa
- czytelny state management
- bezpieczna obsługa danych
- pełna kontrola uprawnień
- brak losowych efektów ubocznych po zmianach

## Co użytkownik ma poczuć po wejściu

- "To jest profesjonalny system do pracy"
- "Wiem, gdzie jestem i co mam zrobić dalej"
- "Wszystko ma sens i logiczne miejsce"
- "Nie boję się, że kliknięcie czegoś rozwali ofertę"
- "System prowadzi mnie przez proces"

## Co ma być wynikiem sukcesu

Sukcesem nie jest tylko to, że:
- da się zapisać ofertę,
- da się coś kliknąć,
- PDF się pobiera.

Sukcesem jest to, że:
- cały workflow jest spójny,
- UI wspiera pracę,
- dane są przewidywalne,
- rozbudowa systemu jest możliwa bez przebudowy wszystkiego od nowa,
- kolejne iteracje nie degenerują jakości produktu.
