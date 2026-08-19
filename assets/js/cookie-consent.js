// ===== Encanto Glow — banner de consentimento de cookies (LGPD) =====
(function () {
  const STORAGE_KEY = "encantoGlowCookieConsent";
  const GADS_ID = "G-JB0WRY4YN8";

  const STRINGS = {
    pt: {
      text: 'Usamos cookies e armazenamento local essenciais para o funcionamento do site. Com sua permissão, também usamos cookies de anúncios (Google Ads) para medir o desempenho das nossas campanhas. Saiba mais na nossa <a href="/privacidade.html">Política de Privacidade</a> e nos <a href="/termos-de-uso.html">Termos de Uso</a>.',
      accept: "Aceitar",
      decline: "Somente essenciais"
    },
    en: {
      text: 'We use essential cookies and local storage for the site to work. With your permission, we also use advertising cookies (Google Ads) to measure our campaign performance. Learn more in our <a href="/en/privacy-policy.html">Privacy Policy</a> and <a href="/en/terms-of-use.html">Terms of Use</a>.',
      accept: "Accept",
      decline: "Essential only"
    },
    es: {
      text: 'Usamos cookies y almacenamiento local esenciales para el funcionamiento del sitio. Con tu permiso, también usamos cookies publicitarias (Google Ads) para medir el rendimiento de nuestras campañas. Conoce más en nuestra <a href="/es/politica-de-privacidad.html">Política de Privacidad</a> y en los <a href="/es/terminos-de-uso.html">Términos de Uso</a>.',
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

  function loadGoogleAds() {
    if (window.__gadsLoaded) return;
    window.__gadsLoaded = true;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GADS_ID;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GADS_ID);
  }

  const existingConsent = getConsent();
  if (existingConsent === "accepted") {
    loadGoogleAds();
    return;
  }
  if (existingConsent) return;

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
    if (value === "accepted") loadGoogleAds();
    banner.classList.remove("visible");
    setTimeout(() => banner.remove(), 500);
  }

  document.getElementById("cookieAccept").addEventListener("click", () => dismiss("accepted"));
  document.getElementById("cookieDecline").addEventListener("click", () => dismiss("essential-only"));
})();
