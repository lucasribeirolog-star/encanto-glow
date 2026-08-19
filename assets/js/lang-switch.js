// ===== Encanto Glow — seletor de idioma =====
(function () {
  const LANGS = {
    pt: { prefix: "", label: "PT" },
    en: { prefix: "/en", label: "EN" },
    es: { prefix: "/es", label: "ES" }
  };

  const path = window.location.pathname;
  const search = window.location.search;
  const parts = path.split("/").filter(Boolean);

  let currentLang = "pt";
  let page = parts[0] || "index.html";
  if (parts[0] === "en" || parts[0] === "es") {
    currentLang = parts[0];
    page = parts[1] || "index.html";
  }

  const mounts = document.querySelectorAll(".lang-switch");
  if (!mounts.length) return;

  const html = Object.keys(LANGS)
    .map((lang) => {
      const info = LANGS[lang];
      const href = info.prefix + "/" + page + search;
      const activeClass = lang === currentLang ? " active" : "";
      return `<a href="${href}" class="lang-link${activeClass}">${info.label}</a>`;
    })
    .join("");

  mounts.forEach((mount) => {
    mount.innerHTML = html;
  });
})();
