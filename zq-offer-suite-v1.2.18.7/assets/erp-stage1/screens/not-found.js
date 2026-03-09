import { withVariantShell } from "./helpers.js";

export function renderNotFound(ctx) {
  return withVariantShell(
    ctx,
    "Nie znaleziono widoku",
    "Podany adres nie jest częścią prototypu Etapu 1",
    `
      <section class="zgs-card">
        <p class="zgs-inline-error">Brak ekranu dla ścieżki: ${ctx.route.path}</p>
        <div class="zgs-row zgs-row--wrap">
          <button type="button" class="zgs-btn zgs-btn--primary" data-nav="/dashboard">Przejdź do dashboardu</button>
          <button type="button" class="zgs-btn zgs-btn--secondary" data-nav="/blueprint">Blueprint</button>
        </div>
      </section>
    `
  );
}
