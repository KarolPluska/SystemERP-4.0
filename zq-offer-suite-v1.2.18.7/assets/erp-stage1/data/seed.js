import { computeOfferTotals, withComputedLine, VAT_RATE } from "../core/calculations.js";

const timestamp = {
  now: "2026-03-09 09:30",
  yesterday: "2026-03-08 15:14",
  weekAgo: "2026-03-02 10:05",
  monthAgo: "2026-02-11 12:48",
};

const accounts = [
  {
    id: 1,
    login: "admin",
    role: "super_admin",
    profile: {
      name: "Aleksandra Pawlak",
      branch: "Centrala ZEGGER",
      phone: "+48 501 200 300",
      email: "aleksandra.pawlak@zegger.pl",
      avatarInitials: "AP",
    },
    perms: {
      super_admin: true,
      can_switch_accounts: true,
      can_view_all_clients: true,
      can_delete_offers_any: true,
      can_delete_offers_own: true,
      can_lock_offers: true,
      can_edit_locked_offers: true,
      can_select_client: true,
      can_add_client: true,
      can_edit_client: true,
      can_force_sync: true,
      allow_special_offer: true,
      max_discount_percent: 100,
      allowed_tabs: [],
      can_manage_permissions: true,
      can_export_pdf: true,
    },
  },
  {
    id: 2,
    login: "handlowiec.north",
    role: "sales",
    profile: {
      name: "Kamil Rybak",
      branch: "Oddział Północ",
      phone: "+48 507 880 214",
      email: "kamil.rybak@zegger.pl",
      avatarInitials: "KR",
    },
    perms: {
      super_admin: false,
      can_switch_accounts: false,
      can_view_all_clients: false,
      visible_client_ids: [501, 502, 504],
      can_delete_offers_any: false,
      can_delete_offers_own: true,
      can_lock_offers: false,
      can_edit_locked_offers: false,
      can_select_client: true,
      can_add_client: true,
      can_edit_client: false,
      can_force_sync: false,
      allow_special_offer: true,
      max_discount_percent: 18,
      allowed_tabs: ["Ogrodzenia Panelowe", "Akcesoria", "Słupki"],
      can_manage_permissions: false,
      can_export_pdf: true,
    },
  },
  {
    id: 3,
    login: "manager.south",
    role: "manager",
    profile: {
      name: "Marta Krawiec",
      branch: "Oddział Południe",
      phone: "+48 600 342 111",
      email: "marta.krawiec@zegger.pl",
      avatarInitials: "MK",
    },
    perms: {
      super_admin: false,
      can_switch_accounts: false,
      can_view_all_clients: true,
      can_delete_offers_any: true,
      can_delete_offers_own: true,
      can_lock_offers: true,
      can_edit_locked_offers: true,
      can_select_client: true,
      can_add_client: true,
      can_edit_client: true,
      can_force_sync: true,
      allow_special_offer: true,
      max_discount_percent: 30,
      allowed_tabs: [],
      can_manage_permissions: true,
      can_export_pdf: true,
    },
  },
  {
    id: 4,
    login: "junior.center",
    role: "restricted",
    profile: {
      name: "Olga Maj",
      branch: "Centrum",
      phone: "+48 535 100 400",
      email: "olga.maj@zegger.pl",
      avatarInitials: "OM",
    },
    perms: {
      super_admin: false,
      can_switch_accounts: false,
      can_view_all_clients: false,
      visible_client_ids: [504],
      can_delete_offers_any: false,
      can_delete_offers_own: false,
      can_lock_offers: false,
      can_edit_locked_offers: false,
      can_select_client: false,
      can_add_client: false,
      can_edit_client: false,
      can_force_sync: false,
      allow_special_offer: false,
      max_discount_percent: 8,
      allowed_tabs: ["Akcesoria"],
      can_manage_permissions: false,
      can_export_pdf: false,
    },
  },
];

const clientGroups = [
  { id: 301, name: "Deweloperzy mieszkaniowi" },
  { id: 302, name: "Dystrybutorzy regionalni" },
  { id: 303, name: "Klienci inwestycyjni" },
  { id: 304, name: "Sektor publiczny" },
];

const clients = [
  {
    id: 501,
    groupId: 301,
    company: "Invest-Bud Development",
    fullName: "Piotr Wojciechowski",
    nip: "5251022033",
    phone: "+48 502 100 210",
    email: "biuro@invest-bud.pl",
    address: "ul. Miedziana 12, Gdynia",
    assignedAccountIds: [1, 2, 3],
    facilities: [
      { name: "Plac Gdynia", city: "Gdynia" },
      { name: "Plac Rumia", city: "Rumia" },
    ],
    notes: "Priorytetowe terminy dostaw - wtorek/czwartek.",
  },
  {
    id: 502,
    groupId: 302,
    company: "Fence Trade Polska",
    fullName: "Anna Sobczak",
    nip: "6482819920",
    phone: "+48 603 112 450",
    email: "zamowienia@fencetrade.pl",
    address: "ul. Polna 44, Elblag",
    assignedAccountIds: [1, 2],
    facilities: [{ name: "Magazyn Elblag", city: "Elblag" }],
    notes: "Wymagany osobny dokument WZ dla kazdego transportu.",
  },
  {
    id: 503,
    groupId: 304,
    company: "Gmina Zielona",
    fullName: "Wydzial Inwestycji",
    nip: "5830002210",
    phone: "+48 58 321 11 55",
    email: "inwestycje@gmina-zielona.pl",
    address: "ul. Urzedowa 1, Zielona",
    assignedAccountIds: [1, 3],
    facilities: [{ name: "Szkola nr 3", city: "Zielona" }],
    notes: "Wymagane terminy gwarancji i certyfikaty RAL w PDF.",
  },
  {
    id: 504,
    groupId: 303,
    company: "Nord Logistic Hub",
    fullName: "Katarzyna Cieslak",
    nip: "9571112099",
    phone: "+48 664 343 990",
    email: "procurement@nordhub.eu",
    address: "ul. Portowa 9, Gdansk",
    assignedAccountIds: [1, 2, 4],
    facilities: [
      { name: "Terminal A", city: "Gdansk" },
      { name: "Terminal B", city: "Gdansk" },
    ],
    notes: "Czesciowe dostawy wg harmonogramu tygodniowego.",
  },
];

const products = [
  {
    id: 1001,
    sheet: "Ogrodzenia Panelowe",
    category: "Panele 2D",
    subcategory: "Premium",
    name: "Panel 2D 6/5/6",
    sku: "PNL-2D-656",
    variant: "2500x1530",
    rals: ["RAL 7016", "RAL 6005", "RAL 9005"],
    prices: { unit: 319.0, palette: 295.0, tir: 284.0 },
    logistics: { paletteQty: 42, tirQty: 756 },
  },
  {
    id: 1002,
    sheet: "Ogrodzenia Panelowe",
    category: "Panele 3D",
    subcategory: "Standard",
    name: "Panel 3D 4V",
    sku: "PNL-3D-4V",
    variant: "2500x1230",
    rals: ["RAL 7016", "RAL 6005"],
    prices: { unit: 214.0, palette: 198.0, tir: 189.0 },
    logistics: { paletteQty: 56, tirQty: 1120 },
  },
  {
    id: 1003,
    sheet: "Slupki",
    category: "Slupki",
    subcategory: "Systemowe",
    name: "Slupek 60x40",
    sku: "SLP-6040",
    variant: "2400 mm",
    rals: ["RAL 7016", "RAL 9005"],
    prices: { unit: 84.0, palette: 77.0, tir: 72.0 },
    logistics: { paletteQty: 120, tirQty: 2500 },
  },
  {
    id: 1004,
    sheet: "Akcesoria",
    category: "Akcesoria",
    subcategory: "Mocowania",
    name: "Obejma koncowa",
    sku: "AKC-OBK-01",
    variant: "M8",
    rals: ["RAL 7016", "Ocynk"],
    prices: { unit: 4.8, palette: 4.3, tir: 4.1 },
    logistics: { paletteQty: 3200, tirQty: 64000 },
  },
  {
    id: 1005,
    sheet: "Ogrodzenia Palisadowe",
    category: "Palisada",
    subcategory: "Premium",
    name: "Segment palisadowy P120",
    sku: "PAL-P120",
    variant: "2500x1200",
    rals: ["RAL 7016", "RAL 9005", "RAL 8019"],
    prices: { unit: 879.0, palette: 828.0, tir: 799.0 },
    logistics: { paletteQty: 18, tirQty: 240 },
  },
  {
    id: 1006,
    sheet: "Akcesoria",
    category: "Bramy",
    subcategory: "Automatyka",
    name: "Napęd suwakowy Pro600",
    sku: "AUT-PRO600",
    variant: "600 kg",
    rals: ["RAL 7016"],
    prices: { unit: 1599.0, palette: 1510.0, tir: 1440.0 },
    logistics: { paletteQty: 20, tirQty: 300 },
  },
];

function lineId(seed) {
  return `ln-${seed}`;
}

function createCatalogLine(seed, product, options = {}) {
  const priceMode = options.priceMode || "unit";
  const unitNet = Number(product.prices[priceMode] || product.prices.unit || 0);

  return withComputedLine({
    id: lineId(seed),
    type: "catalog",
    productId: product.id,
    sheet: product.sheet,
    category: product.category,
    subcategory: product.subcategory,
    name: product.name,
    sku: product.sku,
    variant: options.variant || product.variant,
    ral: options.ral || product.rals[0],
    qty: options.qty || 1,
    priceMode,
    unitNet,
    snapshotUnitNet: options.snapshotUnitNet ?? unitNet,
    discount: options.discount || 0,
    comment: options.comment || "",
  });
}

function createCustomLine(seed, options = {}) {
  return withComputedLine({
    id: lineId(seed),
    type: "custom",
    sheet: "__CUSTOM__",
    category: "Pozycja niestandardowa",
    subcategory: "Ręczna",
    name: options.name || "Pozycja niestandardowa",
    sku: options.sku || "CUSTOM",
    variant: options.variant || "-",
    ral: options.ral || "-",
    qty: options.qty || 1,
    priceMode: "unit",
    unitNet: options.unitNet || 0,
    snapshotUnitNet: options.snapshotUnitNet ?? options.unitNet ?? 0,
    discount: options.discount || 0,
    comment: options.comment || "",
  });
}

function createTransportLine(seed, options = {}) {
  return withComputedLine({
    id: lineId(seed),
    type: "transport",
    sheet: "__TRANSPORT__",
    category: "Usluga",
    subcategory: "Transport",
    name: options.name || "Transport krajowy",
    sku: "TRN-001",
    variant: options.variant || `${options.distanceKm || 120} km`,
    ral: "-",
    qty: 1,
    priceMode: "unit",
    unitNet: options.baseNet || 0,
    snapshotUnitNet: options.baseNet || 0,
    discount: options.discount || 0,
    comment: options.comment || "",
    transport: {
      distanceKm: options.distanceKm || 120,
      baseNet: options.baseNet || 0,
      extras: options.extras || [],
    },
  });
}

function materializeOffer(offer) {
  const computed = computeOfferTotals(offer.lines, VAT_RATE);
  return {
    ...offer,
    lines: computed.lines,
    totals: computed.totals,
  };
}

const offers = [
  materializeOffer({
    id: 3201,
    accountId: 2,
    customerId: 501,
    title: "Osiedle Portowe - etap B",
    status: "in_progress",
    validityDays: 21,
    lockReason: null,
    locked: false,
    statusChanges: 3,
    snapshot: {
      capturedAt: "2026-03-01 08:15",
      priceVersion: "Cennik Q1/2026",
      validUntil: "2026-03-22",
    },
    comment: "Klient oczekuje dostawy etapami.",
    salesNote: "Uzgodniona zaliczka 25%.",
    createdAt: "2026-03-01 08:15",
    updatedAt: timestamp.yesterday,
    lines: [
      createCatalogLine(1, products[0], { qty: 42, discount: 8, snapshotUnitNet: 309 }),
      createCatalogLine(2, products[2], { qty: 48, discount: 6, snapshotUnitNet: 82 }),
      createCatalogLine(3, products[3], { qty: 160, discount: 4, snapshotUnitNet: 4.4 }),
      createTransportLine(4, {
        distanceKm: 260,
        baseNet: 1890,
        extras: [
          { name: "Rozladunek HDS", net: 480 },
          { name: "Dostawa ekspresowa", net: 320 },
        ],
        discount: 2,
      }),
    ],
  }),
  materializeOffer({
    id: 3202,
    accountId: 2,
    customerId: 502,
    title: "Fence Trade - kontrakt kwartalny",
    status: "won",
    validityDays: 30,
    lockReason: "final_status",
    locked: true,
    statusChanges: 5,
    snapshot: {
      capturedAt: "2026-02-10 13:22",
      priceVersion: "Cennik Q1/2026",
      validUntil: "2026-03-11",
    },
    comment: "Wygrana po korekcie ceny transportu.",
    salesNote: "Zamowienie podpisane 2026-02-15.",
    createdAt: "2026-02-10 13:22",
    updatedAt: "2026-02-15 16:10",
    lines: [
      createCatalogLine(5, products[1], { qty: 220, priceMode: "palette", discount: 10, snapshotUnitNet: 196 }),
      createCatalogLine(6, products[3], { qty: 420, discount: 5, snapshotUnitNet: 4.2 }),
      createCatalogLine(7, products[5], { qty: 4, discount: 12, snapshotUnitNet: 1490 }),
    ],
  }),
  materializeOffer({
    id: 3203,
    accountId: 3,
    customerId: 503,
    title: "Gmina Zielona - ogrodzenie szkoly",
    status: "sent",
    validityDays: 45,
    lockReason: null,
    locked: false,
    statusChanges: 2,
    snapshot: {
      capturedAt: "2026-03-05 10:01",
      priceVersion: "Cennik Q1/2026",
      validUntil: "2026-04-19",
    },
    comment: "Wymagane certyfikaty i karta techniczna.",
    salesNote: "Do potwierdzenia harmonogram montazu.",
    createdAt: "2026-03-05 10:01",
    updatedAt: "2026-03-06 09:40",
    lines: [
      createCatalogLine(8, products[4], { qty: 18, discount: 7, snapshotUnitNet: 865 }),
      createCatalogLine(9, products[2], { qty: 36, discount: 5, snapshotUnitNet: 82 }),
      createCustomLine(10, {
        name: "Montaż segmentow specjalnych",
        qty: 1,
        unitNet: 4200,
        discount: 0,
        comment: "Pozycja uslugowa poza katalogiem.",
      }),
    ],
  }),
];

const offerEvents = {
  3201: [
    { id: 9001, event: "offer_saved", at: "2026-03-01 08:15", actor: "handlowiec.north", meta: "Utworzenie oferty" },
    { id: 9002, event: "offer_status_changed", at: "2026-03-01 08:15", actor: "handlowiec.north", meta: "Status: nowa" },
    { id: 9003, event: "offer_status_changed", at: "2026-03-03 11:02", actor: "handlowiec.north", meta: "Status: w trakcie" },
    { id: 9004, event: "offer_line_updated", at: timestamp.yesterday, actor: "handlowiec.north", meta: "Aktualizacja rabatow i transportu" },
  ],
  3202: [
    { id: 9010, event: "offer_saved", at: "2026-02-10 13:22", actor: "handlowiec.north", meta: "Utworzenie oferty" },
    { id: 9011, event: "offer_status_changed", at: "2026-02-12 09:00", actor: "manager.south", meta: "Status: wyslana" },
    { id: 9012, event: "offer_status_changed", at: "2026-02-15 16:10", actor: "manager.south", meta: "Status: sukces" },
    { id: 9013, event: "offer_lock_toggled", at: "2026-02-15 16:10", actor: "manager.south", meta: "Auto-lock final_status" },
  ],
  3203: [
    { id: 9020, event: "offer_saved", at: "2026-03-05 10:01", actor: "manager.south", meta: "Utworzenie oferty" },
    { id: 9021, event: "offer_status_changed", at: "2026-03-06 09:40", actor: "manager.south", meta: "Status: wyslana" },
  ],
};

function offerDraftTemplate(accountId) {
  return materializeOffer({
    id: 0,
    accountId,
    customerId: null,
    title: "",
    status: "new",
    validityDays: 21,
    lockReason: null,
    locked: false,
    statusChanges: 0,
    snapshot: {
      capturedAt: timestamp.now,
      priceVersion: "Cennik Q1/2026",
      validUntil: "2026-03-30",
    },
    comment: "",
    salesNote: "",
    createdAt: timestamp.now,
    updatedAt: timestamp.now,
    lines: [],
  });
}

export function createInitialState() {
  return {
    meta: {
      nextOfferId: 4001,
      nextClientId: 700,
      nextEventId: 9900,
      nextLineSeed: 500,
      priceCatalogVersion: "Cennik Q1/2026",
    },
    ui: {
      viewMode: "auto",
      sidebarOpen: true,
      routeVariants: {},
      toasts: [],
      confirm: null,
      lastRoute: "/login",
    },
    session: {
      authenticated: false,
      actorAccountId: 1,
      activeAccountId: 2,
      loginError: "",
      selectedOfferId: 3201,
      selectedCustomerId: 501,
      draftOffer: offerDraftTemplate(2),
    },
    data: {
      vatRate: VAT_RATE,
      accounts,
      clientGroups,
      clients,
      products,
      offers,
      offerEvents,
      alertsMuted: {},
    },
  };
}

export function createDraftFromOffer(offer, activeAccountId) {
  if (!offer) return offerDraftTemplate(activeAccountId);
  const copied = JSON.parse(JSON.stringify(offer));
  copied.id = 0;
  copied.status = "new";
  copied.locked = false;
  copied.lockReason = null;
  copied.statusChanges = 0;
  copied.title = `${offer.title} (kopia robocza)`;
  copied.createdAt = timestamp.now;
  copied.updatedAt = timestamp.now;
  copied.accountId = activeAccountId;
  return materializeOffer(copied);
}

export function createLineFromProduct(seed, product, payload = {}) {
  return createCatalogLine(seed, product, payload);
}

export function createManualLine(seed, payload = {}) {
  return createCustomLine(seed, payload);
}

export function createTransportServiceLine(seed, payload = {}) {
  return createTransportLine(seed, payload);
}
