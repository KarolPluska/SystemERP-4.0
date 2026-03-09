# Data Flow and State Rules

## Główny przepływ danych

1. Użytkownik loguje się
2. System rozpoznaje konto i uprawnienia
3. Użytkownik wybiera lub ma aktywne konto robocze
4. Użytkownik przechodzi do:
   - nowej oferty,
   - historii,
   - klientów,
   - dashboardu
5. W trakcie tworzenia oferty system ładuje:
   - dane klienta,
   - dane produktów,
   - ceny,
   - warianty,
   - uprawnienia rabatowe,
   - stan oferty
6. Zapis oferty generuje:
   - stan oferty,
   - snapshot cen,
   - historię zmian,
   - odświeżenie widoków zależnych

## Krytyczne reguły stanu

### Oferta
Oferta może być:
- nowa,
- edytowana,
- zablokowana,
- zduplikowana,
- zapisania jako PDF,
- nieaktualna względem bieżącego cennika,
- nadal ważna mimo zmian globalnych.

### Pozycje
Pozycje muszą:
- natychmiast aktualizować podsumowania,
- respektować tryb ceny,
- respektować walidacje rabatowe,
- zachowywać komentarze i metadane,
- rozróżniać pozycje katalogowe i niestandardowe.

### Historia list
Lista historii ofert po zmianach:
- nie może wymagać ręcznego "odśwież" do zobaczenia skutku operacji
- musi się aktualizować po akcji usunięcia / zapisu / zmianie statusu
- musi zachować filtry, jeśli to możliwe

## Reguły dla snapshotów cen

- snapshot zapisuje stan cen na moment zapisu oferty
- ważność oferty oznacza zamrożenie cen w tym okresie
- jeśli cennik źródłowy się zmieni, system pokazuje różnicę informacyjnie
- oferta historyczna nadal odnosi się do snapshotu, nie do live price jako źródła prawdy

## Reguły dla blokad

- określone statusy automatycznie blokują edycję
- super admin lub konto z uprawnieniem może odblokować
- zablokowana oferta powinna eksponować akcję "duplikuj jako nowy"
- UI i backend muszą mieć zgodne reguły blokady

## Reguły dla mobile

- stan aplikacji musi być zachowany przy przechodzeniu między panelami
- modale i drawery muszą działać bez łamania scrolla
- długie listy i tabele muszą mieć alternatywny układ
- priorytet informacji musi być zachowany

## Reguły błędów

- każda akcja async potrzebuje stanu pending
- każdy błąd ma mieć komunikat dla użytkownika
- komunikat ma być zrozumiały, bez technicznego bełkotu
- logika po błędzie ma przywrócić UI do poprawnego stanu

## Reguły wydajności

- nie renderować ciężkich sekcji bez potrzeby
- ograniczać wielokrotne recalculations
- kontrolować wielkość payloadów i list
- duże oferty nie mogą zabijać UI
- duże modale nie mogą generować chaosu pamięciowego
