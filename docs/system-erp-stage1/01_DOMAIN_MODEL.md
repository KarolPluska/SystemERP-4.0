# Model Domenowy

## Encje rdzeniowe

### Konto
- `id`, `login`, `role`, `profile`
- `perms`:
  - `super_admin`
  - `can_view_all_clients`
  - `can_delete_offers_own`
  - `can_delete_offers_any`
  - `can_lock_offers`
  - `can_edit_locked_offers`
  - `can_select_client`
  - `can_add_client`
  - `can_edit_client`
  - `allow_special_offer`
  - `max_discount_percent`
  - `allowed_tabs`
  - `can_manage_permissions`

### Klient
- `id`, `company`, `fullName`, `nip`, `phone`, `email`, `address`
- `groupId`
- `assignedAccountIds`
- `notes`, `facilities`

### Oferta
- `id`, `accountId`, `customerId`, `title`
- `status` (`unset`, `new`, `in_progress`, `sent`, `won`, `lost`, `canceled`, `needs_update`)
- `validityDays`
- `locked`, `lockReason`
- `snapshot` (`capturedAt`, `priceVersion`)
- `lines[]`
- `totals` (`netBefore`, `netAfter`, `grossBefore`, `grossAfter`)
- `statusChanges`, `comment`, `salesNote`

### Pozycja oferty
- `type`: `catalog` | `custom` | `transport`
- `productId` (dla katalogu)
- `name`, `sku`, `variant`, `ral`
- `qty`, `priceMode`, `unitNet`, `snapshotUnitNet`, `discount`
- `transport.extras[]` (dla transportu)
- `amounts`:
  - `netBefore`, `netAfter`
  - `grossBefore`, `grossAfter`

### Produkt
- `id`, `sheet`, `category`, `subcategory`, `name`, `sku`
- `variant`, `rals[]`
- `prices` (`unit`, `palette`, `tir`)
- `logistics`

## Relacje
- Konto `1..n` Oferta
- Klient `1..n` Oferta
- Oferta `1..n` Pozycja
- Produkt `1..n` Pozycja katalogowa
- Konto `n..n` Klient (przez przypisania)

## Reguły biznesowe
- Status końcowy (`won`, `lost`) wymusza blokadę.
- Snapshot cen pozostaje punktem odniesienia historycznego.
- Alerty cen pokazują różnicę snapshot vs live.
- Edycja zablokowanej oferty wymaga uprawnienia.
- Limity rabatów są zależne od aktywnego konta.
- Widoczność klientów i ofert jest kontekstowa dla konta.
