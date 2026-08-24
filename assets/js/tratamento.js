// ===== Encanto Glow — página de detalhe do tratamento =====
(function () {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("t");
  const treatment = TREATMENTS.find((t) => t.slug === slug);
  const root = document.getElementById("treatmentRoot");

  if (!treatment) {
    root.innerHTML = `
      <section class="tmt-hero">
        <div class="container tmt-hero-inner">
          <span class="eyebrow">Tratamento não encontrado</span>
          <h1>Ops, essa página não existe</h1>
          <p>O tratamento que você procura não foi encontrado. Veja a lista completa de tratamentos da Encanto Glow.</p>
          <a href="index.html#servicos" class="btn btn-primary">Ver todos os tratamentos</a>
        </div>
      </section>`;
    document.title = "Tratamento não encontrado — Encanto Glow";
    return;
  }

  document.title = treatment.name + " — Encanto Glow | Dra. Laureen Polidoro";

  const seoBase = "https://encantoglow.com.br";
  [
    { rel: "canonical", href: `${seoBase}/tratamento.html?t=${slug}` },
    { rel: "alternate", hreflang: "pt-BR", href: `${seoBase}/tratamento.html?t=${slug}` },
    { rel: "alternate", hreflang: "en", href: `${seoBase}/en/tratamento.html?t=${slug}` },
    { rel: "alternate", hreflang: "es", href: `${seoBase}/es/tratamento.html?t=${slug}` },
    { rel: "alternate", hreflang: "x-default", href: `${seoBase}/tratamento.html?t=${slug}` },
  ].forEach((l) => {
    const link = document.createElement("link");
    link.rel = l.rel;
    if (l.hreflang) link.setAttribute("hreflang", l.hreflang);
    link.href = l.href;
    document.head.appendChild(link);
  });
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", treatment.short);

  if (treatment.faq && treatment.faq.length) {
    const faqSchema = document.createElement("script");
    faqSchema.type = "application/ld+json";
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: treatment.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(faqSchema);
  }

  const list = (items) => items.map((i) => `<li>${i}</li>`).join("");
  const galleryHtml = treatment.images.length
    ? `
    <section class="tmt-gallery">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Resultados reais</span>
          <h2>Registros do consultório</h2>
        </div>
        <div class="tmt-gallery-grid">
          ${treatment.images
            .map(
              (img) => `
            <div class="result-card reveal" data-lightbox="${img}">
              <img loading="lazy" src="${img}" alt="${treatment.name} — Encanto Glow">
              <div class="result-overlay"><span>${treatment.name}</span></div>
            </div>`
            )
            .join("")}
        </div>
      </div>
    </section>`
    : "";

  root.innerHTML = `
    <section class="tmt-hero">
      <div class="container tmt-hero-inner reveal">
        <a href="index.html#servicos" class="tmt-back">&larr; Todos os tratamentos</a>
        <div class="tmt-icon">${treatment.icon}</div>
        <span class="eyebrow">Encanto Glow &middot; Tratamentos</span>
        <h1>${treatment.name}</h1>
        <p>${treatment.short}</p>
        <a href="index.html#contato" class="btn btn-primary">Agendar avaliação</a>
      </div>
    </section>

    <section class="tmt-content">
      <div class="container tmt-grid">
        <div class="tmt-main">
          <div class="tmt-block reveal">
            <h2>O que é</h2>
            <p>${treatment.intro}</p>
          </div>

          <div class="tmt-block reveal">
            <h2>Benefícios</h2>
            <ul class="tmt-check-list">${list(treatment.benefits)}</ul>
          </div>

          <div class="tmt-block reveal">
            <h2>Como funciona</h2>
            <ol class="tmt-steps">${list(treatment.steps)}</ol>
          </div>

          <div class="tmt-block reveal">
            <h2>Dúvidas frequentes</h2>
            <div class="tmt-faq">
              ${treatment.faq
                .map(
                  (f, i) => `
                <div class="tmt-faq-item">
                  <button class="tmt-faq-q" data-faq="${i}">
                    <span>${f.q}</span>
                    <span class="tmt-faq-toggle">+</span>
                  </button>
                  <div class="tmt-faq-a"><p>${f.a}</p></div>
                </div>`
                )
                .join("")}
            </div>
          </div>
        </div>

        <aside class="tmt-side reveal">
          <div class="tmt-side-card">
            <h3>Indicado para</h3>
            <ul class="tmt-dot-list">${list(treatment.indicated)}</ul>
          </div>
          <div class="tmt-side-card">
            <h3>Cuidados e dicas</h3>
            <ul class="tmt-dot-list">${list(treatment.care)}</ul>
          </div>
          <div class="tmt-side-card tmt-side-cta">
            <h3>Pronta para começar?</h3>
            <p>Agende sua avaliação com a Dra. Laureen Polidoro e descubra o protocolo ideal para você.</p>
            <a href="index.html#contato" class="btn btn-primary" style="width:100%; justify-content:center;">Agendar avaliação</a>
            <a href="https://wa.me/5515992809088" target="_blank" rel="noopener" class="btn btn-ghost" style="width:100%; justify-content:center; margin-top:0.7rem;"><svg class="wa-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16.004 3C9.377 3 4 8.377 4 15.004c0 2.65.86 5.1 2.322 7.09L4.6 28l6.084-1.68a11.94 11.94 0 0 0 5.32 1.253h.005c6.627 0 12.004-5.377 12.004-12.004C28.013 8.377 22.636 3 16.004 3Zm0 21.86h-.004a9.83 9.83 0 0 1-5.01-1.37l-.36-.213-3.61.997.964-3.522-.235-.362a9.815 9.815 0 0 1-1.51-5.386c0-5.434 4.42-9.854 9.858-9.854 2.633 0 5.11 1.026 6.972 2.89a9.79 9.79 0 0 1 2.884 6.968c0 5.434-4.42 9.854-9.85 9.854l-.099-.002Zm5.4-7.386c-.296-.148-1.752-.865-2.024-.964-.272-.099-.47-.148-.668.148-.198.297-.767.964-.94 1.163-.173.198-.347.223-.643.074-.297-.148-1.253-.462-2.386-1.472-.882-.787-1.478-1.76-1.65-2.058-.173-.297-.018-.457.13-.605.134-.133.297-.347.446-.52.148-.174.198-.297.297-.495.099-.198.05-.372-.025-.52-.074-.148-.667-1.61-.915-2.204-.24-.578-.485-.5-.667-.51l-.568-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.478 0 1.462 1.065 2.874 1.213 3.072.148.198 2.096 3.2 5.078 4.488.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.752-.716 2-1.408.247-.693.247-1.286.173-1.409-.074-.123-.272-.198-.568-.347Z"/></svg> Falar no WhatsApp</a>
          </div>
        </aside>
      </div>
    </section>

    ${galleryHtml}
  `;

  // Accordion FAQ
  const closeFaqItem = (item) => {
    item.classList.remove("open");
    item.querySelector(".tmt-faq-a").style.maxHeight = "";
  };
  const openFaqItem = (item) => {
    item.classList.add("open");
    const answer = item.querySelector(".tmt-faq-a");
    answer.style.maxHeight = answer.scrollHeight + "px";
  };
  root.querySelectorAll(".tmt-faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".tmt-faq-item");
      const wasOpen = item.classList.contains("open");
      root.querySelectorAll(".tmt-faq-item.open").forEach(closeFaqItem);
      if (!wasOpen) openFaqItem(item);
    });
  });
})();
