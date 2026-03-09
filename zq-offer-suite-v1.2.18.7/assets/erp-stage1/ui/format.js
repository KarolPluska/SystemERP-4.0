export function money(value) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function percent(value) {
  const amount = Number(value || 0);
  return `${amount.toFixed(1)}%`;
}

export function shortDate(value) {
  if (!value) return "-";
  const normalized = String(value).replace(" ", "T");
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function compactNumber(value) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("pl-PL", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
}

export function uid(prefix = "id") {
  const chunk = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${chunk}`;
}
