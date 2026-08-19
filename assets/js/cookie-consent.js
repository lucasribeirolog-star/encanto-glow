// ===== Encanto Glow — banner de consentimento de cookies (LGPD) =====
(function () {
  const STORAGE_KEY = "encantoGlowCookieConsent";

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (err) {
      // localStorage indisponível — o banner voltará a aparecer na próxima visita
    }
  }

  if (getConsent()) return;

  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-live", "polite");
  banner.innerHTML = `
    <p>
      Usamos cookies e armazenamento local essenciais para o funcionamento do site. Não utilizamos cookies de rastreamento publicitário.
      Saiba mais na nossa <a href="privacidade.html">Política de Privacidade</a> e nos <a href="termos-de-uso.html">Termos de Uso</a>.
    </p>
    <div class="cookie-banner-actions">
      <button type="button" class="btn btn-primary" id="cookieAccept">Aceitar</button>
      <button type="button" class="btn btn-ghost" id="cookieDecline">Somente essenciais</button>
    </div>
  `;
  document.body.appendChild(banner);

  setTimeout(() => banner.classList.add("visible"), 50);

  function dismiss(value) {
    setConsent(value);
    banner.classList.remove("visible");
    setTimeout(() => banner.remove(), 500);
  }

  document.getElementById("cookieAccept").addEventListener("click", () => dismiss("accepted"));
  document.getElementById("cookieDecline").addEventListener("click", () => dismiss("essential-only"));
})();
