// ===== Encanto Glow — banner de consentimento de cookies (LGPD) =====
(function () {
  const STORAGE_KEY = "encantoGlowCookieConsent";

  const STRINGS = {
    pt: {
      text: 'Usamos cookies e armazenamento local essenciais para o funcionamento do site. Não utilizamos cookies de rastreamento publicitário. Saiba mais na nossa <a href="/privacidade.html">Política de Privacidade</a> e nos <a href="/termos-de-uso.html">Termos de Uso</a>.',
      accept: "Aceitar",
      decline: "Somente essenciais"
    },
    en: {
      text: 'We use essential cookies and local storage for the site to work. We do not use advertising tracking cookies. Learn more in our <a href="/en/privacy-policy.html">Privacy Policy</a> and <a href="/en/terms-of-use.html">Terms of Use</a>.',
      accept: "Accept",
      decline: "Essential only"
    },
    es: {
      text: 'Usamos cookies y almacenamiento local esenciales para el funcionamiento del sitio. No utilizamos cookies de rastreo publicitario. Conoce más en nuestra <a href="/es/politica-de-privacidad.html">Política de Privacidad</a> y en los <a href="/es/terminos-de-uso.html">Términos de Uso</a>.',
      accept: "Aceptar",
      decline: "Solo esenciales"
    }
  };

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

  const htmlLang = (document.documentElement.lang || "pt").slice(0, 2).toLowerCase();
  const t = STRINGS[htmlLang] || STRINGS.pt;

  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-live", "polite");
  banner.innerHTML = `
    <p>${t.text}</p>
    <div class="cookie-banner-actions">
      <button type="button" class="btn btn-primary" id="cookieAccept">${t.accept}</button>
      <button type="button" class="btn btn-ghost" id="cookieDecline">${t.decline}</button>
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
