import { isFinalStatus } from "./calculations.js";

export function hasPermission(account, key, fallback = false) {
  if (!account || typeof account !== "object") {
    return false;
  }
  const perms = account.perms || {};
  if (!Object.prototype.hasOwnProperty.call(perms, key)) {
    return fallback;
  }
  return Boolean(perms[key]);
}

export function permissionNumber(account, key, fallback = 0) {
  if (!account || typeof account !== "object") {
    return fallback;
  }
  const perms = account.perms || {};
  if (!Object.prototype.hasOwnProperty.call(perms, key)) {
    return fallback;
  }
  const value = Number(perms[key]);
  if (!Number.isFinite(value)) {
    return fallback;
  }
  return value;
}

export function canEditLockedOffer(account) {
  return hasPermission(account, "super_admin") || hasPermission(account, "can_edit_locked_offers");
}

export function canToggleLock(account) {
  return hasPermission(account, "super_admin") || hasPermission(account, "can_lock_offers");
}

export function canDeleteOffer(account, offer) {
  if (!account) return false;
  if (hasPermission(account, "can_delete_offers_any")) return true;
  if (!offer) return false;
  return hasPermission(account, "can_delete_offers_own") && Number(offer.accountId) === Number(account.id);
}

export function canEditOffer(account, offer) {
  if (!account || !offer) return false;
  if (Number(offer.accountId) !== Number(account.id) && !hasPermission(account, "super_admin")) {
    return false;
  }
  if (offer.locked) {
    return canEditLockedOffer(account);
  }
  if (isFinalStatus(offer.status)) {
    return hasPermission(account, "super_admin");
  }
  return true;
}

export function canSelectClient(account) {
  return hasPermission(account, "can_select_client", true);
}

export function canAddClient(account) {
  return hasPermission(account, "can_add_client", true);
}

export function canEditClient(account) {
  if (hasPermission(account, "can_edit_client", false)) {
    return true;
  }
  return hasPermission(account, "can_view_all_clients", false);
}

export function maxDiscount(account) {
  return permissionNumber(account, "max_discount_percent", 100);
}

export function visibleClientIds(account) {
  const ids = account?.perms?.visible_client_ids;
  if (!Array.isArray(ids)) {
    return [];
  }
  return ids.map((id) => Number(id)).filter((id) => Number.isFinite(id) && id > 0);
}

export function canSeeClient(account, clientId) {
  if (!account) return false;
  if (hasPermission(account, "can_view_all_clients")) return true;
  const visible = visibleClientIds(account);
  if (!visible.length) return false;
  return visible.includes(Number(clientId));
}

export function visibleCategories(account) {
  const tabs = account?.perms?.allowed_tabs;
  if (!Array.isArray(tabs) || tabs.length === 0) {
    return null;
  }
  return tabs.map((tab) => String(tab));
}

export function canUseSpecialOffer(account) {
  return hasPermission(account, "allow_special_offer", false);
}

export function canSwitchAccounts(account) {
  return hasPermission(account, "super_admin", false) || hasPermission(account, "can_switch_accounts", false);
}
