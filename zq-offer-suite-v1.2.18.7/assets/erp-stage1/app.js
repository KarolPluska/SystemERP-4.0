import { createRouter } from "./core/router.js";
import { createStore } from "./core/store.js";
import {
  computeOfferTotals,
  isFinalStatus,
  normalizeDiscount,
  normalizeStatus,
} from "./core/calculations.js";
import {
  canDeleteOffer,
  canEditOffer,
  canSeeClient,
  canSwitchAccounts,
  canToggleLock,
  maxDiscount,
} from "./core/permissions.js";
import {
  createDraftFromOffer,
  createInitialState,
  createLineFromProduct,
  createManualLine,
  createTransportServiceLine,
} from "./data/seed.js";
import { renderShell } from "./ui/shell.js";
import { renderLogin } from "./screens/login.js";
import { renderDashboard } from "./screens/dashboard.js";
import { renderAccounts } from "./screens/accounts.js";
import { renderOffersHistory } from "./screens/offers-history.js";
import { renderOfferForm } from "./screens/offer-form.js";
import { renderOfferDetails } from "./screens/offer-details.js";
import { renderClients } from "./screens/clients.js";
import { renderClientForm } from "./screens/client-form.js";
import { renderCatalog } from "./screens/catalog.js";
import { renderCustomItem } from "./screens/custom-item.js";
import { renderTransport } from "./screens/transport.js";
import { renderSummary } from "./screens/summary.js";
import { renderPriceAlerts } from "./screens/price-alerts.js";
import { renderPermissions } from "./screens/permissions.js";
import { renderProfile } from "./screens/profile.js";
import { renderStates } from "./screens/states.js";
import { renderBlueprint } from "./screens/blueprint.js";
import { renderNotFound } from "./screens/not-found.js";

const root = document.getElementById("zgs-app");

if (!root) {
  throw new Error("Brak elementu #zgs-app");
}

const routes = [
  { path: "/login", key: "login", layout: "auth", public: true, render: renderLogin },
  { path: "/dashboard", key: "dashboard", render: renderDashboard },
  { path: "/accounts", key: "accounts", render: renderAccounts },
  { path: "/offers/new", key: "offer-form", render: renderOfferForm },
  { path: "/offers/history", key: "offers-history", render: renderOffersHistory },
  { path: "/offers/:id/edit", key: "offer-form", render: renderOfferForm },
  { path: "/offers/:id", key: "offer-details", render: renderOfferDetails },
  { path: "/clients", key: "clients", render: renderClients },
  { path: "/clients/new", key: "client-form", render: renderClientForm },
  { path: "/clients/:id/edit", key: "client-form", render: renderClientForm },
  { path: "/catalog", key: "catalog", render: renderCatalog },
  { path: "/custom-item", key: "custom-item", render: renderCustomItem },
  { path: "/transport", key: "transport", render: renderTransport },
  { path: "/summary", key: "summary", render: renderSummary },
  { path: "/price-alerts", key: "price-alerts", render: renderPriceAlerts },
  { path: "/permissions", key: "permissions", render: renderPermissions },
  { path: "/profile", key: "profile", render: renderProfile },
  { path: "/states", key: "states", render: renderStates },
  { path: "/blueprint", key: "blueprint", render: renderBlueprint },
  { path: "/not-found", key: "not-found", render: renderNotFound },
];

const store = createStore(createInitialState());
let currentRoute = routes[0];
let unsubscribeStore = null;
let cleanupHandlers = null;

function nowStamp() {
  return new Date().toISOString().slice(0, 16).replace("T", " ");
}

function normalizeOffer(offer) {
  const computed = computeOfferTotals(offer.lines || []);
  return {
    ...offer,
    ...computed,
    status: normalizeStatus(offer.status),
  };
}

function getState() {
  return store.getState();
}

function updateState(mutator) {
  store.update(mutator);
}

function pushToast(message, tone = "info") {
  updateState((state) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    state.ui.toasts.unshift({ id, message, tone });
    state.ui.toasts = state.ui.toasts.slice(0, 4);
  });

  window.setTimeout(() => {
    updateState((state) => {
      state.ui.toasts = state.ui.toasts.filter((toast) => toast.message !== message);
    });
  }, 2600);
}

function getAccountById(id) {
  const state = getState();
  return state.data.accounts.find((account) => Number(account.id) === Number(id)) || null;
}

function getActiveAccount() {
  const state = getState();
  return getAccountById(state.session.activeAccountId);
}

function getActorAccount() {
  const state = getState();
  return getAccountById(state.session.actorAccountId);
}

function canSwitchFromActive() {
  return canSwitchAccounts(getActiveAccount());
}

function getVisibleClients() {
  const state = getState();
  const active = getActiveAccount();
  if (!active) return [];

  return state.data.clients.filter((client) => {
    if (active.perms?.can_view_all_clients) {
      return true;
    }
    if (Array.isArray(client.assignedAccountIds) && client.assignedAccountIds.includes(active.id)) {
      return true;
    }
    return canSeeClient(active, client.id);
  });
}

function getVisibleOffers() {
  const state = getState();
  const active = getActiveAccount();
  if (!active) return [];
  return state.data.offers
    .filter((offer) => Number(offer.accountId) === Number(active.id))
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

function getOfferById(id) {
  const state = getState();
  return state.data.offers.find((offer) => Number(offer.id) === Number(id)) || null;
}

function getSelectedOffer() {
  const state = getState();
  if (!state.session.selectedOfferId) return null;
  return getOfferById(state.session.selectedOfferId);
}

function getDraftOffer() {
  return getState().session.draftOffer;
}

function getClientById(id) {
  const state = getState();
  return state.data.clients.find((client) => Number(client.id) === Number(id)) || null;
}

function getClientDraft(clientId = 0) {
  const state = getState();
  if (clientId > 0) {
    const source = getClientById(clientId);
    if (!source) return null;
    return {
      id: source.id,
      company: source.company,
      fullName: source.fullName,
      nip: source.nip,
      email: source.email,
      phone: source.phone,
      address: source.address,
      groupId: source.groupId,
      notes: source.notes,
    };
  }

  if (state.ui.clientDraft) return state.ui.clientDraft;
  return {
    company: "",
    fullName: "",
    nip: "",
    email: "",
    phone: "",
    address: "",
    groupId: state.data.clientGroups[0]?.id || null,
    notes: "",
  };
}

function recalcDraft(state) {
  const computed = computeOfferTotals(state.session.draftOffer.lines || []);
  state.session.draftOffer.lines = computed.lines;
  state.session.draftOffer.totals = computed.totals;
}

function resetDraftForAccount(accountId) {
  updateState((state) => {
    state.session.draftOffer = createDraftFromOffer(null, accountId);
    state.session.draftOffer.accountId = accountId;
    recalcDraft(state);
  });
}

function setVariant(routeKey, variant) {
  updateState((state) => {
    state.ui.routeVariants[routeKey] = variant;
  });
}

function setViewMode(mode) {
  updateState((state) => {
    state.ui.viewMode = mode;
  });
}

function navigate(path, query = null) {
  router.navigate(path, query);
}

function updateDraftField(field, value) {
  updateState((state) => {
    const draft = state.session.draftOffer;
    if (!draft) return;

    if (field === "title") draft.title = String(value || "");
    if (field === "customerId") draft.customerId = value ? Number(value) : null;
    if (field === "status") draft.status = normalizeStatus(value);
    if (field === "validityDays") draft.validityDays = Math.max(1, Number(value) || 1);
    if (field === "comment") draft.comment = String(value || "");
    if (field === "specialOffer") draft.specialOffer = String(value) === "1";

    draft.updatedAt = nowStamp();
    recalcDraft(state);
  });
}

function removeLine(lineId) {
  updateState((state) => {
    state.session.draftOffer.lines = state.session.draftOffer.lines.filter((line) => line.id !== lineId);
    state.session.draftOffer.updatedAt = nowStamp();
    recalcDraft(state);
  });
}

function syncDraftFromOffer(offerId) {
  updateState((state) => {
    const source = state.data.offers.find((offer) => Number(offer.id) === Number(offerId));
    if (!source) return;
    state.session.draftOffer = createDraftFromOffer(source, source.accountId);
    state.session.draftOffer.id = source.id;
    state.session.editingOfferId = source.id;
  });
}

function addProductLine(productId) {
  const state = getState();
  const product = state.data.products.find((item) => Number(item.id) === Number(productId));
  if (!product) {
    pushToast("Nie znaleziono produktu.", "danger");
    return;
  }

  const activeAccount = getActiveAccount();
  const selection = state.ui.catalogSelection || {};
  const discount = Math.min(normalizeDiscount(selection.discount || 0), maxDiscount(activeAccount));

  updateState((draftState) => {
    const line = createLineFromProduct(draftState.meta.nextLineSeed++, product, {
      qty: Number(selection.qty || 1),
      discount,
      priceMode: selection.priceMode || "unit",
      snapshotUnitNet: product.prices[selection.priceMode || "unit"],
    });

    draftState.session.draftOffer.lines.push(line);
    draftState.session.draftOffer.updatedAt = nowStamp();
    recalcDraft(draftState);
  });

  pushToast(`Dodano pozycję: ${product.name}`, "success");
  navigate("/offers/new");
}

function addCustomLine(payload) {
  const active = getActiveAccount();
  const limit = maxDiscount(active);
  const discount = Math.min(normalizeDiscount(payload.discount || 0), limit);

  updateState((state) => {
    const line = createManualLine(state.meta.nextLineSeed++, {
      name: payload.name,
      sku: payload.sku,
      variant: payload.variant,
      qty: Number(payload.qty || 1),
      unitNet: Number(payload.unitNet || 0),
      discount,
      comment: payload.comment,
      snapshotUnitNet: Number(payload.unitNet || 0),
    });

    state.session.draftOffer.lines.push(line);
    state.ui.customItemDraft = payload;
    state.session.draftOffer.updatedAt = nowStamp();
    recalcDraft(state);
  });

  pushToast("Dodano pozycję niestandardową.", "success");
  navigate("/offers/new");
}

function addTransportLine(payload) {
  updateState((state) => {
    const line = createTransportServiceLine(state.meta.nextLineSeed++, {
      name: payload.name,
      distanceKm: Number(payload.distanceKm || 0),
      baseNet: Number(payload.baseNet || 0),
      discount: Number(payload.discount || 0),
      comment: payload.comment,
      extras: [
        { name: payload.extraName, net: Number(payload.extraNet || 0) },
        { name: payload.secondExtraName, net: Number(payload.secondExtraNet || 0) },
      ].filter((extra) => extra.name && Number(extra.net) > 0),
    });

    state.session.draftOffer.lines.push(line);
    state.ui.transportDraft = payload;
    state.session.draftOffer.updatedAt = nowStamp();
    recalcDraft(state);
  });

  pushToast("Dodano usługę transportową.", "success");
  navigate("/offers/new");
}

function addHistoryEvent(state, offerId, event, meta) {
  const id = state.meta.nextEventId++;
  const bucket = state.data.offerEvents[offerId] || [];
  bucket.push({
    id,
    event,
    at: nowStamp(),
    actor: getActiveAccount()?.login || "system",
    meta,
  });
  state.data.offerEvents[offerId] = bucket;
}

function saveOffer(mode = "create") {
  const state = getState();
  const draft = state.session.draftOffer;
  if (!draft?.title?.trim()) {
    pushToast("Tytuł oferty jest wymagany.", "danger");
    return;
  }
  if (!draft.customerId) {
    pushToast("Wybierz klienta przed zapisem.", "danger");
    return;
  }

  const active = getActiveAccount();
  const lockByStatus = isFinalStatus(draft.status);

  if (mode === "overwrite" && state.session.editingOfferId) {
    const offerId = Number(state.session.editingOfferId);
    const existing = getOfferById(offerId);
    if (!existing) {
      pushToast("Nie znaleziono oferty do nadpisania.", "danger");
      return;
    }
    if (!canEditOffer(active, existing)) {
      pushToast("Oferta jest zablokowana i nie możesz jej edytować.", "danger");
      return;
    }

    updateState((next) => {
      const index = next.data.offers.findIndex((offer) => Number(offer.id) === offerId);
      if (index < 0) return;

      const merged = normalizeOffer({
        ...next.data.offers[index],
        ...draft,
        id: offerId,
        accountId: existing.accountId,
        updatedAt: nowStamp(),
        locked: lockByStatus ? true : existing.locked,
        lockReason: lockByStatus ? "final_status" : existing.lockReason,
        statusChanges: existing.status !== draft.status ? (existing.statusChanges || 0) + 1 : existing.statusChanges,
      });

      next.data.offers[index] = merged;
      next.session.selectedOfferId = offerId;
      next.session.editingOfferId = null;
      next.session.draftOffer = createDraftFromOffer(null, next.session.activeAccountId);
      addHistoryEvent(next, offerId, "offer_overwritten", `Nadpisanie oferty: ${merged.title}`);
    });

    pushToast("Zapisano zmiany oferty.", "success");
    navigate(`/offers/${offerId}`);
    return;
  }

  updateState((next) => {
    const newId = next.meta.nextOfferId++;
    const createdAt = nowStamp();
    const offer = normalizeOffer({
      ...draft,
      id: newId,
      accountId: next.session.activeAccountId,
      createdAt,
      updatedAt: createdAt,
      locked: lockByStatus,
      lockReason: lockByStatus ? "final_status" : null,
      statusChanges: 1,
      snapshot: {
        ...draft.snapshot,
        capturedAt: createdAt,
        priceVersion: next.meta.priceCatalogVersion,
      },
    });

    next.data.offers.unshift(offer);
    next.session.selectedOfferId = newId;
    next.session.editingOfferId = null;
    addHistoryEvent(next, newId, "offer_saved", `Zapisano ofertę: ${offer.title}`);
    next.session.draftOffer = createDraftFromOffer(null, next.session.activeAccountId);
  });

  const created = getState().session.selectedOfferId;
  pushToast("Oferta zapisana.", "success");
  navigate(`/offers/${created}`);
}

function exportOffer(offerId = null) {
  const targetOffer = offerId ? getOfferById(Number(offerId)) : getDraftOffer();
  if (!targetOffer) {
    pushToast("Brak danych do eksportu.", "danger");
    return;
  }
  pushToast("Eksport PDF zakończony (symulacja prototypu).", "success");
}

function duplicateOffer(offerId) {
  const source = getOfferById(Number(offerId));
  if (!source) {
    pushToast("Nie znaleziono oferty do duplikacji.", "danger");
    return;
  }

  updateState((state) => {
    state.session.draftOffer = createDraftFromOffer(source, state.session.activeAccountId);
    state.session.editingOfferId = null;
  });

  pushToast("Utworzono roboczą kopię oferty.", "success");
  navigate("/offers/new");
}

function toggleLock(offerId) {
  const active = getActiveAccount();
  const source = getOfferById(Number(offerId));
  if (!source) return;
  if (!canToggleLock(active)) {
    pushToast("Brak uprawnień do blokowania ofert.", "danger");
    return;
  }

  updateState((state) => {
    const offer = state.data.offers.find((item) => Number(item.id) === Number(offerId));
    if (!offer) return;

    offer.locked = !offer.locked;
    offer.lockReason = offer.locked ? (isFinalStatus(offer.status) ? "final_status" : "manual") : null;
    offer.updatedAt = nowStamp();
    addHistoryEvent(state, offer.id, "offer_lock_toggled", offer.locked ? "Oferta zablokowana" : "Oferta odblokowana");
  });

  pushToast("Zmieniono stan blokady oferty.", "info");
}

function requestDeleteOffer(offerId) {
  updateState((state) => {
    state.ui.confirm = {
      type: "delete-offer",
      payload: { offerId: Number(offerId) },
      title: "Usunąć ofertę?",
      message: "Ta operacja usunie ofertę z historii bieżącego konta.",
      confirmLabel: "Usuń ofertę",
    };
  });
}

function closeConfirm() {
  updateState((state) => {
    state.ui.confirm = null;
  });
}

function confirmCurrentAction() {
  const state = getState();
  const confirm = state.ui.confirm;
  if (!confirm) return;

  if (confirm.type === "delete-offer") {
    const offerId = Number(confirm.payload.offerId);
    const offer = getOfferById(offerId);
    const active = getActiveAccount();
    if (!offer) {
      closeConfirm();
      return;
    }
    if (!canDeleteOffer(active, offer)) {
      pushToast("Brak uprawnień do usunięcia oferty.", "danger");
      closeConfirm();
      return;
    }

    updateState((next) => {
      next.data.offers = next.data.offers.filter((item) => Number(item.id) !== offerId);
      delete next.data.offerEvents[offerId];
      if (Number(next.session.selectedOfferId) === offerId) {
        next.session.selectedOfferId = null;
      }
      next.ui.confirm = null;
    });

    pushToast("Oferta została usunięta.", "success");
    navigate("/offers/history");
  }
}

function switchAccount(accountId) {
  const target = getAccountById(accountId);
  if (!target) {
    pushToast("Konto nie istnieje.", "danger");
    return;
  }

  const active = getActiveAccount();
  if (!canSwitchFromActive() && Number(active?.id) !== Number(accountId)) {
    pushToast("Brak uprawnień do przełączania kont.", "danger");
    return;
  }

  updateState((state) => {
    state.session.activeAccountId = Number(accountId);
    state.session.selectedOfferId = null;
    state.session.selectedCustomerId = null;
    state.session.editingOfferId = null;
    state.ui.permissionsTargetAccountId = Number(accountId);
    state.session.draftOffer = createDraftFromOffer(null, Number(accountId));
  });

  pushToast(`Przełączono kontekst na konto ${target.login}.`, "info");
  navigate("/dashboard");
}

function loginByCredentials(login, password) {
  const state = getState();
  const account = state.data.accounts.find((item) => item.login === login);
  if (!account || password !== "demo123") {
    updateState((draft) => {
      draft.session.loginError = "Błędny login lub hasło demo. Użyj hasła demo123.";
    });
    return;
  }

  updateState((draft) => {
    draft.session.authenticated = true;
    draft.session.loginError = "";
    draft.session.actorAccountId = account.id;
    draft.session.activeAccountId = account.perms.super_admin ? 2 : account.id;
    draft.session.editingOfferId = null;
    draft.ui.permissionsTargetAccountId = draft.session.activeAccountId;
    draft.session.draftOffer = createDraftFromOffer(null, draft.session.activeAccountId);
  });

  navigate("/dashboard");
}

function logout() {
  updateState((state) => {
    state.session.authenticated = false;
    state.session.loginError = "";
    state.session.selectedOfferId = null;
    state.session.editingOfferId = null;
    state.ui.confirm = null;
  });
  navigate("/login");
}

function updateHistoryFilter(key, value) {
  updateState((state) => {
    const next = state.ui.historyFilters || { query: "", status: "all" };
    next[key] = value;
    state.ui.historyFilters = next;
  });
}

function updateClientFilter(key, value) {
  updateState((state) => {
    const next = state.ui.clientFilters || { query: "", groupId: 0 };
    next[key] = value;
    state.ui.clientFilters = next;
  });
}

function setSelectedClient(clientId) {
  const client = getClientById(Number(clientId));
  if (!client) return;

  updateState((state) => {
    state.session.selectedCustomerId = client.id;
    state.session.draftOffer.customerId = client.id;
  });

  pushToast(`Wybrano klienta: ${client.company}.`, "success");
}

function updateCatalogSelection(field, value) {
  updateState((state) => {
    const selection = state.ui.catalogSelection || {
      search: "",
      category: "all",
      subcategory: "all",
      qty: 1,
      discount: 0,
      priceMode: "unit",
    };

    if (field === "qty") selection.qty = Math.max(1, Number(value) || 1);
    else if (field === "discount") selection.discount = Math.max(0, Number(value) || 0);
    else selection[field] = value;

    if (field === "category") selection.subcategory = "all";

    state.ui.catalogSelection = selection;
  });
}

function saveClient(formPayload, mode, clientId = 0) {
  const company = String(formPayload.company || "").trim();
  const fullName = String(formPayload.fullName || "").trim();

  if (!company && !fullName) {
    pushToast("Podaj nazwę firmy lub osobę kontaktową.", "danger");
    return;
  }

  updateState((state) => {
    if (mode === "edit" && clientId > 0) {
      const client = state.data.clients.find((item) => Number(item.id) === Number(clientId));
      if (!client) return;
      Object.assign(client, {
        company,
        fullName,
        nip: String(formPayload.nip || "").replace(/[^0-9]/g, ""),
        email: String(formPayload.email || "").trim(),
        phone: String(formPayload.phone || "").trim(),
        address: String(formPayload.address || "").trim(),
        groupId: Number(formPayload.groupId || client.groupId),
        notes: String(formPayload.notes || "").trim(),
      });
      state.ui.clientDraft = null;
      return;
    }

    const newClient = {
      id: state.meta.nextClientId++,
      company,
      fullName,
      nip: String(formPayload.nip || "").replace(/[^0-9]/g, ""),
      email: String(formPayload.email || "").trim(),
      phone: String(formPayload.phone || "").trim(),
      address: String(formPayload.address || "").trim(),
      groupId: Number(formPayload.groupId || state.data.clientGroups[0]?.id || 0),
      notes: String(formPayload.notes || "").trim(),
      facilities: [],
      assignedAccountIds: [state.session.activeAccountId],
    };

    state.data.clients.push(newClient);
    state.ui.clientDraft = null;
  });

  pushToast(mode === "edit" ? "Zapisano zmiany klienta." : "Dodano nowego klienta.", "success");
  navigate("/clients");
}

function togglePermission(targetId, permissionKey) {
  const active = getActiveAccount();
  if (!active?.perms?.can_manage_permissions && !active?.perms?.super_admin) {
    pushToast("Brak uprawnień do edycji capability flags.", "danger");
    return;
  }

  updateState((state) => {
    const account = state.data.accounts.find((item) => Number(item.id) === Number(targetId));
    if (!account) return;
    account.perms[permissionKey] = !account.perms[permissionKey];
  });

  pushToast(`Zmieniono uprawnienie: ${permissionKey}.`, "info");
}

function setPermissionsTarget(targetId) {
  updateState((state) => {
    state.ui.permissionsTargetAccountId = Number(targetId);
  });
}

function muteAlert(alertKey) {
  updateState((state) => {
    state.data.alertsMuted[alertKey] = true;
  });
  pushToast("Alert został oznaczony jako pominięty.", "info");
}

function refreshSnapshot(offerId) {
  updateState((state) => {
    const offer = state.data.offers.find((item) => Number(item.id) === Number(offerId));
    if (!offer) return;
    offer.lines = offer.lines.map((line) => {
      if (!line.productId) return line;
      const product = state.data.products.find((item) => Number(item.id) === Number(line.productId));
      if (!product) return line;
      const mode = line.priceMode || "unit";
      const live = Number(product.prices[mode] || product.prices.unit || line.unitNet);
      return {
        ...line,
        unitNet: live,
        snapshotUnitNet: live,
      };
    });
    const computed = computeOfferTotals(offer.lines);
    offer.lines = computed.lines;
    offer.totals = computed.totals;
    offer.snapshot = {
      ...offer.snapshot,
      capturedAt: nowStamp(),
    };
  });

  pushToast("Zaktualizowano snapshot cen oferty.", "success");
}

function getPriceAlerts() {
  const state = getState();
  const activeProducts = state.data.products;
  const muted = state.data.alertsMuted || {};

  const alerts = [];

  getVisibleOffers().forEach((offer) => {
    (offer.lines || []).forEach((line) => {
      if (!line.productId) return;
      const product = activeProducts.find((item) => Number(item.id) === Number(line.productId));
      if (!product) return;

      const mode = line.priceMode || "unit";
      const live = Number(product.prices[mode] || product.prices.unit || 0);
      const snapshot = Number(line.snapshotUnitNet || line.unitNet || 0);
      const diff = Math.round((live - snapshot) * 100) / 100;
      if (Math.abs(diff) < 0.01) return;

      const diffPercent = snapshot === 0 ? 0 : Math.round(((diff / snapshot) * 100) * 100) / 100;
      const key = `${offer.id}:${line.id}`;
      if (muted[key]) return;

      alerts.push({
        key,
        offerId: offer.id,
        offerTitle: offer.title,
        productName: line.name,
        snapshot,
        live,
        diff,
        diffPercent,
      });
    });
  });

  return alerts;
}

function ensureRouteContext(route) {
  const state = getState();

  if (!state.session.authenticated && !route.public) {
    navigate("/login");
    return false;
  }

  if (route.key === "offer-form" && route.params.id) {
    const offerId = Number(route.params.id);
    if (Number(state.session.editingOfferId) !== offerId) {
      syncDraftFromOffer(offerId);
    }
  }

  if (route.key === "offer-form" && !route.params.id && !state.session.draftOffer) {
    resetDraftForAccount(state.session.activeAccountId);
  }

  return true;
}

function renderConfirmModal(confirm) {
  if (!confirm) return "";
  return `
    <div class="zgs-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="zgs-confirm-title">
      <div class="zgs-modal">
        <h3 id="zgs-confirm-title">${confirm.title}</h3>
        <p>${confirm.message}</p>
        <div class="zgs-row zgs-row--wrap">
          <button type="button" class="zgs-btn zgs-btn--danger" data-action="confirm-accept">${confirm.confirmLabel || "Potwierdź"}</button>
          <button type="button" class="zgs-btn zgs-btn--secondary" data-action="confirm-cancel">Anuluj</button>
        </div>
      </div>
    </div>
  `;
}

const actions = {
  navigate,
  getActiveAccount,
  getActorAccount,
  getVisibleClients,
  getVisibleOffers,
  getOfferById,
  getSelectedOffer,
  getDraftOffer,
  getClientById,
  getClientDraft,
  getAccountById,
  canSwitchAccounts: canSwitchFromActive,
  getPriceAlerts,
};

function renderApp() {
  const state = getState();
  const route = currentRoute;

  if (!ensureRouteContext(route)) {
    return;
  }

  const context = {
    state,
    route,
    actions,
  };

  const content = route.render(context);
  const viewMode = state.ui.viewMode || "auto";

  if (route.layout === "auth") {
    root.innerHTML = `
      <div class="zgs-auth-wrap">
        ${content}
      </div>
      ${renderConfirmModal(state.ui.confirm)}
    `;
  } else {
    root.innerHTML = `
      ${renderShell({ state, route, content })}
      ${renderConfirmModal(state.ui.confirm)}
    `;
  }

  root.dataset.viewMode = viewMode;
  root.dataset.sidebar = state.ui.sidebarOpen ? "open" : "closed";

  if (cleanupHandlers) {
    cleanupHandlers();
  }
  cleanupHandlers = bindHandlers();
}

function onAction(actionName, el, event) {
  if (actionName === "set-view-mode") {
    setViewMode(el.dataset.mode);
    return;
  }

  if (actionName === "toggle-sidebar") {
    updateState((state) => {
      state.ui.sidebarOpen = !state.ui.sidebarOpen;
    });
    return;
  }

  if (actionName === "set-variant") {
    setVariant(el.dataset.routeKey, el.value);
    return;
  }

  if (actionName === "logout") {
    logout();
    return;
  }

  if (actionName === "quick-login") {
    loginByCredentials("handlowiec.north", "demo123");
    return;
  }

  if (actionName === "toggle-password") {
    const input = document.getElementById("zgs-login-password");
    if (input) {
      const nextType = input.type === "password" ? "text" : "password";
      input.type = nextType;
      el.textContent = nextType === "password" ? "Pokaż" : "Ukryj";
    }
    return;
  }

  if (actionName === "switch-account") {
    switchAccount(Number(el.dataset.accountId));
    return;
  }

  if (actionName === "history-query") {
    updateHistoryFilter("query", el.value);
    return;
  }

  if (actionName === "history-status") {
    updateHistoryFilter("status", el.value);
    return;
  }

  if (actionName === "offer-field") {
    updateDraftField(el.dataset.field, el.value);
    return;
  }

  if (actionName === "remove-line") {
    removeLine(el.dataset.lineId);
    return;
  }

  if (actionName === "save-offer") {
    saveOffer(el.dataset.mode || "create");
    return;
  }

  if (actionName === "export-offer") {
    exportOffer(el.dataset.offerId ? Number(el.dataset.offerId) : null);
    return;
  }

  if (actionName === "duplicate-offer") {
    duplicateOffer(el.dataset.offerId);
    return;
  }

  if (actionName === "toggle-lock") {
    toggleLock(el.dataset.offerId);
    return;
  }

  if (actionName === "delete-offer") {
    requestDeleteOffer(el.dataset.offerId);
    return;
  }

  if (actionName === "confirm-accept") {
    confirmCurrentAction();
    return;
  }

  if (actionName === "confirm-cancel") {
    closeConfirm();
    return;
  }

  if (actionName === "client-query") {
    updateClientFilter("query", el.value);
    return;
  }

  if (actionName === "client-group") {
    updateClientFilter("groupId", Number(el.value));
    return;
  }

  if (actionName === "set-selected-client") {
    setSelectedClient(Number(el.dataset.clientId));
    return;
  }

  if (actionName === "catalog-field") {
    updateCatalogSelection(el.dataset.field, el.value);
    return;
  }

  if (actionName === "add-product-line") {
    addProductLine(Number(el.dataset.productId));
    return;
  }

  if (actionName === "reset-custom-item") {
    updateState((state) => {
      state.ui.customItemDraft = {
        name: "",
        sku: "CUSTOM",
        variant: "niestandard",
        qty: 1,
        unitNet: 0,
        discount: 0,
        comment: "",
      };
    });
    return;
  }

  if (actionName === "reset-transport") {
    updateState((state) => {
      state.ui.transportDraft = {
        name: "Transport krajowy",
        distanceKm: 120,
        baseNet: 1200,
        extraName: "Rozladunek HDS",
        extraNet: 250,
        secondExtraName: "Okno czasowe",
        secondExtraNet: 180,
        discount: 0,
        comment: "",
      };
    });
    return;
  }

  if (actionName === "permissions-target") {
    setPermissionsTarget(Number(el.value));
    return;
  }

  if (actionName === "toggle-permission") {
    togglePermission(Number(el.dataset.targetId), el.dataset.permission);
    return;
  }

  if (actionName === "mute-alert") {
    muteAlert(el.dataset.alertKey);
    return;
  }

  if (actionName === "refresh-snapshot") {
    refreshSnapshot(Number(el.dataset.offerId));
    return;
  }
}

function bindHandlers() {
  const onClick = (event) => {
    const navTarget = event.target.closest("[data-nav]");
    if (navTarget) {
      event.preventDefault();
      navigate(navTarget.dataset.nav);
      return;
    }

    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;
    event.preventDefault();
    onAction(actionTarget.dataset.action, actionTarget, event);
  };

  const onChange = (event) => {
    const el = event.target.closest("[data-action]");
    if (!el) return;

    const action = el.dataset.action;
    const changeActions = new Set([
      "set-variant",
      "history-status",
      "history-query",
      "offer-field",
      "client-query",
      "client-group",
      "catalog-field",
      "permissions-target",
    ]);

    if (!changeActions.has(action)) return;
    onAction(action, el, event);
  };

  const onInput = (event) => {
    const el = event.target.closest("[data-action]");
    if (!el) return;

    const inputActions = new Set(["history-query", "client-query", "offer-field", "catalog-field"]);
    if (!inputActions.has(el.dataset.action)) return;
    onAction(el.dataset.action, el, event);
  };

  const onSubmit = (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;

    if (form.id === "zgs-login-form") {
      event.preventDefault();
      const data = new FormData(form);
      loginByCredentials(String(data.get("login") || ""), String(data.get("password") || ""));
      return;
    }

    if (form.id === "zgs-custom-line-form") {
      event.preventDefault();
      const data = new FormData(form);
      addCustomLine({
        name: String(data.get("name") || "").trim(),
        sku: String(data.get("sku") || "CUSTOM").trim(),
        variant: String(data.get("variant") || "niestandard").trim(),
        qty: Number(data.get("qty") || 1),
        unitNet: Number(data.get("unitNet") || 0),
        discount: Number(data.get("discount") || 0),
        comment: String(data.get("comment") || ""),
      });
      return;
    }

    if (form.id === "zgs-transport-form") {
      event.preventDefault();
      const data = new FormData(form);
      addTransportLine({
        name: String(data.get("name") || "Transport krajowy").trim(),
        distanceKm: Number(data.get("distanceKm") || 0),
        baseNet: Number(data.get("baseNet") || 0),
        discount: Number(data.get("discount") || 0),
        extraName: String(data.get("extraName") || "").trim(),
        extraNet: Number(data.get("extraNet") || 0),
        secondExtraName: String(data.get("secondExtraName") || "").trim(),
        secondExtraNet: Number(data.get("secondExtraNet") || 0),
        comment: String(data.get("comment") || ""),
      });
      return;
    }

    if (form.id === "zgs-client-form") {
      event.preventDefault();
      const data = new FormData(form);
      saveClient(
        {
          company: data.get("company"),
          fullName: data.get("fullName"),
          nip: data.get("nip"),
          email: data.get("email"),
          phone: data.get("phone"),
          address: data.get("address"),
          groupId: data.get("groupId"),
          notes: data.get("notes"),
        },
        form.dataset.mode || "create",
        Number(form.dataset.clientId || 0)
      );
    }
  };

  root.addEventListener("click", onClick);
  root.addEventListener("change", onChange);
  root.addEventListener("input", onInput);
  root.addEventListener("submit", onSubmit);

  return () => {
    root.removeEventListener("click", onClick);
    root.removeEventListener("change", onChange);
    root.removeEventListener("input", onInput);
    root.removeEventListener("submit", onSubmit);
  };
}

const router = createRouter(routes, (route) => {
  currentRoute = route;
  updateState((state) => {
    state.ui.lastRoute = route.path;
  });
});

unsubscribeStore = store.subscribe(() => {
  renderApp();
});

router.start("/login");
renderApp();

window.addEventListener("beforeunload", () => {
  if (cleanupHandlers) cleanupHandlers();
  if (unsubscribeStore) unsubscribeStore();
  router.destroy();
});
