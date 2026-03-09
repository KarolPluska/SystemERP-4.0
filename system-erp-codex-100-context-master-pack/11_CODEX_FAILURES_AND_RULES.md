# Codex Failures and Rules

## Najczęstsze błędy, które były popełniane

### 1. Zgadywanie zamiast analizy
Codex potrafił:
- zgadywać nazwy plików,
- zgadywać endpointy,
- zgadywać hooki,
- zgadywać selektory,
- zgadywać strukturę pluginu.

To jest zabronione.

### 2. Łatanie objawu zamiast modelu
Zamiast rozumieć cały moduł, wprowadzane były lokalne poprawki:
- jedna linijka tu,
- jeden if tam,
- jeden styl gdzieś indziej,
co kończyło się kolejnymi regresjami.

### 3. Brak rozumienia produktu jako całości
Powstawały poprawki punktowe bez zrozumienia:
- po co istnieje dany ekran,
- jak wpływa na inne flow,
- jaki jest realny cel biznesowy.

### 4. Słabe podejście do mobile
Mobile bywał traktowany jako późniejszy dodatek albo miniaturka desktopu.

### 5. Rozjazdy w UI
- niespójne modale
- niespójne przyciski
- różne wzorce dla podobnych akcji
- brak jednego design systemu

### 6. Ignorowanie uprawnień i stanów blokady
System z uprawnieniami nie może być budowany jak prosty CRUD bez warunków.

### 7. Brak kontroli regresji
Nowa poprawka psuła:
- historię,
- PDF,
- statusy,
- mobile,
- focus,
- wydajność.

### 8. Złe wzorce potwierdzeń
Używanie `confirm()` w sandboxie lub opieranie UX na rozwiązaniach, które nie działają poprawnie.

### 9. Brak odświeżania lub błędne odświeżanie UI po akcjach
Użytkownik wykonywał akcję, ale lista nie aktualizowała się bez ręcznego refreshu.

### 10. Błędne podejście do PDF
Zmiany robione w pluginie nie wpływały na generator tam, gdzie realnie generował dokument np. w kalkulatorze / innym źródle.

## Twarde zasady dla Codex

### MUST

- Zrozum produkt przed zmianą kodu
- Analizuj zależności
- Traktuj Etap 1 jako produktowy blueprint
- Projektuj desktop i mobile równolegle
- Używaj jednego design systemu
- Uwzględniaj uprawnienia od początku
- Uwzględniaj blokady od początku
- Uwzględniaj snapshot cen od początku
- Uwzględniaj historię zmian od początku
- Buduj kod modułowo
- Po każdej zmianie myśl o regresji

### MUST NOT

- nie zgaduj
- nie wprowadzaj ukrytych założeń
- nie doklejaj globalnego CSS
- nie psuj istniejących flow
- nie rób patchy bez rozumienia miejsca generacji efektu
- nie ignoruj wersji mobile
- nie upraszczaj systemu kosztem wymagań biznesowych
- nie rozdzielaj UI i logiki tak, żeby później trzeba było wszystko wyrzucić

### STOP CONDITIONS

Przerwij i wróć do analizy, jeśli:
- nie wiesz gdzie realnie generuje się dana funkcja
- nie wiesz skąd pochodzi źródło danych
- nie wiesz jakie są zależności uprawnień
- nie masz pewności, czy zmiana dotyczy prototypu czy finalnej ścieżki produkcyjnej
- zmiana zaczyna wymagać zgadywania

### REVIEW GATE

Zanim uznasz etap za zamknięty, sprawdź:
- czy UI jest spójny
- czy mobile działa
- czy nie naruszono uprawnień
- czy blokady działają
- czy statusy są spójne
- czy lista odświeża się poprawnie
- czy modale są bezpieczne
- czy nie ma regresji w PDF, jeśli zmiana dotyczy dokumentów
