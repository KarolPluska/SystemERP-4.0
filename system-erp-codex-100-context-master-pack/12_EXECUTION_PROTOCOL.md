# Execution Protocol

## Zasada pracy

Każde zadanie realizuj w tym porządku:

### 1. Context parse
- zidentyfikuj moduł
- zidentyfikuj encje
- zidentyfikuj zależności
- zidentyfikuj ryzyko regresji
- zidentyfikuj czy dotyczy to prototypu, pluginu, PDF czy danych

### 2. State map
- określ obecny stan
- określ oczekiwany stan
- wypisz scenariusze bazowe
- wypisz edge-case

### 3. UI/UX alignment
- sprawdź zgodność z kierunkiem wizualnym
- sprawdź zgodność z design systemem
- sprawdź desktop
- sprawdź mobile

### 4. Technical plan
- zaproponuj zmianę architektury lub patch
- wskaż miejsce wdrożenia
- określ wpływ na inne moduły
- uwzględnij bezpieczeństwo i uprawnienia

### 5. Implement
- wykonaj zmianę modułowo
- bez globalnych skutków ubocznych
- z zachowaniem namespacingu i scope CSS
- z poprawną walidacją i kontrolą stanów

### 6. Verify
- sprawdź scenariusz główny
- sprawdź scenariusze poboczne
- sprawdź loading/error/empty
- sprawdź mobile
- sprawdź role/uprawnienia
- sprawdź wydajność

### 7. Regression pass
- historia ofert
- tworzenie oferty
- edycja
- statusy
- blokady
- klienci
- PDF
- mobile
- modale/focus

## Zasada odpowiedzi / raportowania

Przy każdym większym etapie raport ma zawierać:
- co zostało zmienione
- dlaczego
- na jakie moduły to wpływa
- jakie są ryzyka
- jak testować
- co zostało świadomie nietknięte

## Zasada planowania UI

Zanim zaczniesz kod, zrób:
- mapę ekranów
- mapę komponentów
- mapę flow
- mapę stanów
- mapę ról/uprawnień

## Zasada planowania wdrożenia

Nie zaczynaj wdrożenia produkcyjnego, dopóki:
- prototyp nie pokrywa wszystkich krytycznych ekranów
- mobile nie jest opracowane
- uprawnienia nie są zamodelowane
- design system nie jest spójny
