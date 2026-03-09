import { maxDiscount } from "../core/permissions.js";
import { money } from "../ui/format.js";
import { withVariantShell } from "./helpers.js";

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function applyFilter(products, selection, allowedTabs) {
  const search = String(selection.search || "").toLowerCase().trim();
  const category = selection.category || "all";
  const subcategory = selection.subcategory || "all";

  return products.filter((product) => {
    if (Array.isArray(allowedTabs) && allowedTabs.length && !allowedTabs.includes(product.sheet)) {
      return false;
    }
    if (category !== "all" && product.category !== category) return false;
    if (subcategory !== "all" && product.subcategory !== subcategory) return false;
    if (!search) return true;

    return [product.name, product.sku, product.variant, product.sheet, product.category, product.subcategory]
      .join(" ")
      .toLowerCase()
      .includes(search);
  });
}

export function renderCatalog(ctx) {
  const selection = ctx.state.ui.catalogSelection || {
    search: "",
    category: "all",
    subcategory: "all",
    qty: 1,
    discount: 0,
    priceMode: "unit",
  };

  const activeAccount = ctx.actions.getActiveAccount();
  const allowedTabs = activeAccount?.perms?.allowed_tabs;
  const products = applyFilter(ctx.state.data.products, selection, allowedTabs);
  const categories = unique(ctx.state.data.products.map((item) => item.category));
  const subcategories = unique(
    ctx.state.data.products
      .filter((item) => selection.category === "all" || item.category === selection.category)
      .map((item) => item.subcategory)
  );

  const maxDisc = maxDiscount(activeAccount);
  const cards = products
    .map(
      (product) => `
      <article class="zgs-product-card">
        <header>
          <p class="zgs-row-title">${product.name}</p>
          <p class="zgs-row-meta">${product.sku} - ${product.sheet}</p>
        </header>
        <dl>
          <div><dt>Kategoria</dt><dd>${product.category} / ${product.subcategory}</dd></div>
          <div><dt>Wariant</dt><dd>${product.variant}</dd></div>
          <div><dt>RAL</dt><dd>${product.rals.join(", ")}</dd></div>
          <div><dt>Cena standard</dt><dd>${money(product.prices.unit)}</dd></div>
          <div><dt>Cena paleta</dt><dd>${money(product.prices.palette)}</dd></div>
          <div><dt>Cena TIR</dt><dd>${money(product.prices.tir)}</dd></div>
        </dl>
        <button type="button" class="zgs-btn zgs-btn--primary" data-action="add-product-line" data-product-id="${product.id}">Dodaj do oferty</button>
      </article>
    `
    )
    .join("");

  const content = `
    <section class="zgs-card">
      <header class="zgs-card-head">
        <h3>Katalog produktów</h3>
        <button type="button" class="zgs-btn zgs-btn--secondary" data-nav="/offers/new">Wróć do oferty</button>
      </header>

      <div class="zgs-row zgs-row--filters">
        <label class="zgs-field">
          <span>Szukaj</span>
          <input type="search" value="${selection.search || ""}" data-action="catalog-field" data-field="search" placeholder="Nazwa, SKU, wariant">
        </label>
        <label class="zgs-field">
          <span>Kategoria</span>
          <select data-action="catalog-field" data-field="category">
            <option value="all" ${selection.category === "all" ? "selected" : ""}>Wszystkie</option>
            ${categories.map((category) => `<option value="${category}" ${selection.category === category ? "selected" : ""}>${category}</option>`).join("")}
          </select>
        </label>
        <label class="zgs-field">
          <span>Podkategoria</span>
          <select data-action="catalog-field" data-field="subcategory">
            <option value="all" ${selection.subcategory === "all" ? "selected" : ""}>Wszystkie</option>
            ${subcategories
              .map((subcategory) => `<option value="${subcategory}" ${selection.subcategory === subcategory ? "selected" : ""}>${subcategory}</option>`)
              .join("")}
          </select>
        </label>
      </div>

      <div class="zgs-row zgs-row--filters">
        <label class="zgs-field">
          <span>Ilość</span>
          <input type="number" min="1" step="1" value="${selection.qty || 1}" data-action="catalog-field" data-field="qty">
        </label>
        <label class="zgs-field">
          <span>Rabat %</span>
          <input type="number" min="0" max="${maxDisc}" value="${selection.discount || 0}" data-action="catalog-field" data-field="discount">
        </label>
        <label class="zgs-field">
          <span>Tryb ceny</span>
          <select data-action="catalog-field" data-field="priceMode">
            <option value="unit" ${selection.priceMode === "unit" ? "selected" : ""}>Standard</option>
            <option value="palette" ${selection.priceMode === "palette" ? "selected" : ""}>Paleta</option>
            <option value="tir" ${selection.priceMode === "tir" ? "selected" : ""}>TIR</option>
          </select>
        </label>
      </div>
      <p class="zgs-muted">Limit rabatu dla aktywnego konta: ${maxDisc}%.</p>
    </section>

    <section class="zgs-product-grid">
      ${cards || `<div class="zgs-empty">Brak produktów dla wybranego filtra i uprawnień konta.</div>`}
    </section>
  `;

  return withVariantShell(
    ctx,
    "Katalog produktów",
    "Kategorie, podkategorie, warianty i cenniki unit/paleta/TIR",
    content,
    {
      loadingDesc: "Pobieranie katalogu produktów i wariantów.",
      emptyDesc: "Brak produktów w danej kategorii lub zakresie uprawnień.",
      errorDesc: "Błąd pobierania katalogu produktów.",
      disabledDesc: "Aktualna rola nie ma dostępu do katalogu.",
    }
  );
}
