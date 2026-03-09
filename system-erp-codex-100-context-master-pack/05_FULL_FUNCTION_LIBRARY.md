# Full Function Library

## Funkcje bazowe systemu

1. Logowanie użytkownika
2. Obsługa błędnego logowania
3. Pokaż / ukryj hasło
4. Bezpieczne zamknięcie i otwarcie modala logowania
5. Utrzymanie sesji
6. Wylogowanie

## Funkcje kont i ról

7. Rozpoznanie aktywnego konta
8. Przełączanie pomiędzy kontami
9. Obsługa super admina
10. Widoczność danych zależna od konta
11. Widoczność klientów zależna od uprawnień
12. Widoczność ofert zależna od uprawnień
13. Uprawnienie kasowania swoich ofert
14. Uprawnienie kasowania wszystkich ofert
15. Uprawnienie blokowania / odblokowywania ofert
16. Uprawnienie do wyszukiwania klientów
17. Uprawnienie do pracy na wszystkich klientach
18. Uprawnienie do edycji zamrożonych / zablokowanych ofert
19. Limity rabatów per konto
20. Ograniczenie widoczności kategorii / produktów

## Funkcje klienta

21. Dodanie klienta
22. Edycja klienta
23. Wyszukiwanie klienta
24. Sortowanie klientów
25. Grupowanie klientów
26. Obsługa wielu przedstawicieli / placówek
27. Przypisanie klienta do grupy
28. Kontekstowa wyszukiwarka klientów
29. Ograniczenie widoczności klientów wg konta
30. Historia ofert klienta
31. Notatki klienta

## Funkcje oferty

32. Utworzenie nowej oferty
33. Edycja istniejącej oferty
34. Przywracanie oferty z historii do edycji
35. Nadpisanie / zapis oferty
36. Duplikowanie oferty jako nowa
37. Blokowanie oferty
38. Odblokowanie oferty
39. Automatyczne blokowanie po wybranych statusach
40. Obsługa statusów oferty
41. Zmiana statusu z historii ofert
42. Licznik zmian statusu
43. Ważność oferty
44. Zamrażanie cen przez okres ważności
45. Snapshot cenowy oferty
46. Wykrywanie zmian cen po zapisaniu oferty
47. Popup z listą produktów o zmienionej cenie
48. Historia zmian oferty
49. Komentarz / notatka do oferty
50. Obsługa wersji roboczej

## Funkcje pozycji

51. Dodawanie pozycji z katalogu
52. Dodawanie pozycji niestandardowej
53. Edycja pozycji niestandardowej
54. Usuwanie pozycji
55. Obsługa komentarza przy pozycji
56. Obsługa SKU
57. Obsługa wariantów
58. Obsługa ilości
59. Obsługa ceny jednostkowej netto
60. Obsługa rabatu %
61. Wartość netto
62. Wartość netto po rabacie
63. Wartość brutto
64. Wartość brutto po rabacie
65. Walidacja ręcznej ceny tylko dla dozwolonych trybów
66. Obsługa oferty specjalnej
67. Usługi transportowe
68. Dodatkowe pozycje usługowe
69. Pozycje logistyczne paleta / TIR
70. Odczyt cen z różnych kolumn źródłowych
71. Przeliczenia ilości logistycznych
72. Dodawanie komentarzy do pozycji

## Funkcje katalogu produktów

73. Kategorie
74. Podkategorie
75. Wyszukiwanie produktów
76. Filtry produktów
77. Obsługa kolorów / RAL
78. Obsługa wariantów
79. Obsługa cen standardowych
80. Obsługa cen paletowych
81. Obsługa cen TIR
82. Obsługa jednostek logistycznych
83. Obsługa źródła danych produktowych
84. Walidacja niepełnych danych produktu

## Funkcje list i historii

85. Historia ofert
86. Filtrowanie po statusie
87. Filtrowanie po koncie
88. Filtrowanie po dacie
89. Wyszukiwanie po nazwie / kliencie
90. Sortowanie
91. Odświeżanie listy po usunięciu bez ręcznego reloadu
92. Wyraźny kolor przycisku usuń
93. Pokazanie stanu blokady ikoną
94. Pokazanie statusu i licznika zmian
95. Otwieranie szczegółów oferty
96. Szybka zmiana statusu z listy - jeśli dopuszczalne

## Funkcje PDF i dokumentów

97. Eksport PDF
98. Eksport PDF i zapis oferty
99. Ochrona anty-duplikacyjna eksportu
100. Blokada podwójnego kliknięcia
101. Snapshot danych dokumentu
102. Prawidłowe podsumowanie netto/brutto po rabacie
103. Spójność układu PDF z panelem
104. Kontrola typografii PDF
105. Kontrola paddingów PDF
106. Podsumowanie w ramce / sekcji
107. Obsługa danych klienta i handlowca w PDF
108. Wersjonowanie dokumentu
109. Archiwizacja PDF
110. Unikalne nazewnictwo plików

## Funkcje analityczne i KPI

111. Licznik ofert per status
112. Skuteczność
113. Ostatnie aktywności
114. KPI per użytkownik / konto
115. Trend zmian statusów
116. Statystyki użycia systemu
117. Logi operacji kluczowych

## Funkcje UX / systemowe

118. Stany loading
119. Stany błędu
120. Stany puste
121. Stany sukcesu
122. Toasty / powiadomienia
123. Potwierdzenia dla operacji krytycznych
124. Bezpieczne modale bez sandboxowych confirm()
125. Poprawny focus management
126. Brak aria-hidden na aktywnym focusie
127. Obsługa klawiatury
128. Czytelne disabled states
129. Responsywność desktop / tablet / mobile
130. Brak overflow-x
131. Wydajność przy dużych listach i dużych ofertach
132. Ograniczanie ciężkich renderów
133. Bezpieczne odświeżanie danych po akcjach
134. Zachowanie stanu formularza przy przejściach
135. Ochrona przed utratą zmian

## Funkcje bezpieczeństwa

136. Walidacja danych wejściowych
137. Sanityzacja danych
138. Escape outputu
139. Obsługa nonce
140. current_user_can / capability checks
141. Brak wycieku danych w komunikatach błędów
142. Ograniczenie dostępu do cudzych danych
143. Bezpieczne endpointy
144. Bezpieczne zapisy i odczyty historii
145. Audyt operacji krytycznych

## Funkcje rozwojowe

146. Modularna architektura komponentów
147. Łatwa rozbudowa modułów
148. Czytelne mapowanie warstwy UI do domeny
149. Przewidywalne API wewnętrzne
150. Gotowość do kolejnych etapów ERP
