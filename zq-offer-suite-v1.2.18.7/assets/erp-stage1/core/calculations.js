export const VAT_RATE = 0.23;

export const OFFER_STATUSES = [
  "unset",
  "new",
  "in_progress",
  "sent",
  "won",
  "lost",
  "canceled",
  "needs_update",
];

export const USER_STATUSES = OFFER_STATUSES.filter((status) => status !== "needs_update");

export const FINAL_STATUSES = ["won", "lost"];

export function roundMoney(value) {
  const num = Number.isFinite(Number(value)) ? Number(value) : 0;
  return Math.round(num * 100) / 100;
}

export function clamp(value, min, max) {
  if (!Number.isFinite(Number(value))) {
    return min;
  }
  return Math.min(max, Math.max(min, Number(value)));
}

export function normalizeDiscount(value) {
  return clamp(value, 0, 100);
}

export function normalizeQuantity(value) {
  const raw = Number(value);
  if (!Number.isFinite(raw) || raw <= 0) {
    return 1;
  }
  return raw;
}

export function computeCatalogLineAmounts(line, vatRate = VAT_RATE) {
  const qty = normalizeQuantity(line.qty);
  const unitNet = roundMoney(line.unitNet);
  const discount = normalizeDiscount(line.discount);

  const netBefore = roundMoney(unitNet * qty);
  const netAfter = roundMoney(netBefore * (1 - discount / 100));

  const grossBefore = roundMoney(netBefore * (1 + vatRate));
  const grossAfter = roundMoney(netAfter * (1 + vatRate));

  return {
    qty,
    unitNet,
    discount,
    netBefore,
    netAfter,
    grossBefore,
    grossAfter,
    hasDiscount: discount > 0,
  };
}

export function computeCustomLineAmounts(line, vatRate = VAT_RATE) {
  return computeCatalogLineAmounts(line, vatRate);
}

export function computeTransportLineAmounts(line, vatRate = VAT_RATE) {
  const baseNet = roundMoney(line.transport?.baseNet ?? line.unitNet ?? 0);
  const extras = Array.isArray(line.transport?.extras) ? line.transport.extras : [];
  const extrasTotal = roundMoney(
    extras.reduce((sum, extra) => sum + roundMoney(extra.net), 0)
  );
  const discount = normalizeDiscount(line.discount);

  const netBefore = roundMoney(baseNet + extrasTotal);
  const netAfter = roundMoney(netBefore * (1 - discount / 100));

  const grossBefore = roundMoney(netBefore * (1 + vatRate));
  const grossAfter = roundMoney(netAfter * (1 + vatRate));

  return {
    qty: 1,
    unitNet: netBefore,
    discount,
    netBefore,
    netAfter,
    grossBefore,
    grossAfter,
    hasDiscount: discount > 0,
    transport: {
      baseNet,
      extrasTotal,
    },
  };
}

export function computeLineAmounts(line, vatRate = VAT_RATE) {
  if (!line || typeof line !== "object") {
    return computeCatalogLineAmounts({}, vatRate);
  }

  if (line.type === "transport") {
    return computeTransportLineAmounts(line, vatRate);
  }

  if (line.type === "custom") {
    return computeCustomLineAmounts(line, vatRate);
  }

  return computeCatalogLineAmounts(line, vatRate);
}

export function withComputedLine(line, vatRate = VAT_RATE) {
  const amounts = computeLineAmounts(line, vatRate);
  return {
    ...line,
    amounts,
    qty: amounts.qty,
    discount: amounts.discount,
  };
}

export function computeOfferTotals(lines, vatRate = VAT_RATE) {
  const normalized = Array.isArray(lines)
    ? lines.map((line) => withComputedLine(line, vatRate))
    : [];

  const totals = normalized.reduce(
    (acc, line) => {
      const amounts = line.amounts;
      acc.netBefore += amounts.netBefore;
      acc.netAfter += amounts.netAfter;
      acc.grossBefore += amounts.grossBefore;
      acc.grossAfter += amounts.grossAfter;
      if (amounts.hasDiscount) {
        acc.hasDiscount = true;
      }
      return acc;
    },
    {
      netBefore: 0,
      netAfter: 0,
      grossBefore: 0,
      grossAfter: 0,
      hasDiscount: false,
    }
  );

  return {
    lines: normalized,
    totals: {
      netBefore: roundMoney(totals.netBefore),
      netAfter: roundMoney(totals.netAfter),
      grossBefore: roundMoney(totals.grossBefore),
      grossAfter: roundMoney(totals.grossAfter),
      hasDiscount: totals.hasDiscount,
    },
  };
}

export function isFinalStatus(status) {
  return FINAL_STATUSES.includes(String(status || ""));
}

export function normalizeStatus(status) {
  const candidate = String(status || "").trim().toLowerCase();
  if (!OFFER_STATUSES.includes(candidate)) {
    return "unset";
  }
  return candidate;
}

export function calculatePriceDelta(snapshotUnitNet, liveUnitNet) {
  const snapshot = roundMoney(snapshotUnitNet);
  const live = roundMoney(liveUnitNet);
  const diff = roundMoney(live - snapshot);
  const diffPercent = snapshot === 0 ? 0 : roundMoney((diff / snapshot) * 100);
  return {
    snapshot,
    live,
    diff,
    diffPercent,
    increased: diff > 0,
    decreased: diff < 0,
  };
}
