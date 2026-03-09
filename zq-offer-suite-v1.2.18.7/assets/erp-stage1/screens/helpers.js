import { renderVariantState, sectionTitle, variantSwitcher } from "../ui/components.js";

export function routeVariant(ctx) {
  return ctx.state.ui.routeVariants[ctx.route.key] || "default";
}

export function withVariantShell(ctx, title, subtitle, content, config = {}) {
  const variant = routeVariant(ctx);
  const variantNode = renderVariantState(variant, config);

  return `
    <section class="zgs-screen">
      <div class="zgs-screen-head">
        ${sectionTitle(title, subtitle)}
        ${variantSwitcher(ctx.route.key, variant)}
      </div>
      ${variantNode || content}
    </section>
  `;
}

export function whenVariant(variant, jsx) {
  if (variant === "default") return "";
  return jsx;
}
