// ===== Encanto Glow — interações =====

// Header sombra ao rolar
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Menu mobile
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Renderiza os cards de tratamentos (página inicial)
const servicesGrid = document.getElementById('servicesGrid');
if (servicesGrid && typeof TREATMENTS !== 'undefined') {
  servicesGrid.innerHTML = TREATMENTS.map((t, i) => `
    <a href="tratamento.html?t=${t.slug}" class="service-card reveal-left" style="transition-delay:${(i % 3) * 0.12}s">
      <div class="service-icon">${t.icon}</div>
      <h3>${t.name}</h3>
      <p>${t.short}</p>
      <span class="service-more">Saiba mais &rarr;</span>
    </a>
  `).join('');
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal, .reveal-left');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// Lightbox para galeria de resultados — função reaproveitável porque os
// cards de resultado da home chegam depois, via fetch (ver abaixo)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function setupLightbox() {
  if (!(lightbox && lightboxImg && lightboxClose)) return;
  document.querySelectorAll('[data-lightbox]').forEach(card => {
    card.addEventListener('click', () => {
      lightboxImg.src = card.getAttribute('data-lightbox');
      lightbox.classList.add('active');
    });
  });
}

if (lightbox && lightboxImg && lightboxClose) {
  setupLightbox();
  lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('active');
  });
}

// Carrossel contínuo de resultados — busca as fotos cadastradas no painel
// interno e duplica os cards pra fazer o loop sem emenda.
// Se o backend ainda não tiver a aba "Resultados" (ou a busca falhar por
// qualquer motivo), cai pra essa lista fixa, pra a seção nunca ficar vazia.
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby_1KixFPNg8exeGzPzu3WaCbRQlt8gB-iIUmZNfFyKqZ5u7aEq42gd_EAG2lzFZ46e/exec";
const FALLBACK_RESULTS = [
  { imagemUrl: '/assets/images/post4.webp', tag: 'Antes / Depois', legenda: 'Harmonização facial' },
  { imagemUrl: '/assets/images/post3.jpg', tag: 'Antes / Depois', legenda: 'Resultado incrível' },
  { imagemUrl: '/assets/images/reel3.jpg', tag: 'Antes / Depois', legenda: 'Transformação real' },
  { imagemUrl: '/assets/images/post9.jpg', tag: 'Antes / Depois', legenda: 'Preenchimento labial' },
  { imagemUrl: '/assets/images/post1.jpg', tag: 'Antes / Depois', legenda: 'Preenchimento labial' },
  { imagemUrl: '/assets/images/new1.jpg', tag: 'Antes / Depois', legenda: 'Botox — testa' },
  { imagemUrl: '/assets/images/new2.webp', tag: 'Antes / Depois', legenda: 'Rejuvenescimento facial' },
  { imagemUrl: '/assets/images/new3.webp', tag: '2 semanas após Botox', legenda: 'Botox' },
  { imagemUrl: '/assets/images/new4.webp', tag: 'Antes / Depois', legenda: 'Preenchimento labial' },
];
const resultsTrack = document.getElementById('resultsTrack');
if (resultsTrack) {
  const renderResults = (rows) => {
    resultsTrack.innerHTML = rows.map(r => `
      <div class="result-card" data-lightbox="${r.imagemUrl}">
        <span class="result-tag">${r.tag || ''}</span>
        <img loading="lazy" src="${r.imagemUrl}" alt="${r.legenda || 'Resultado'}">
        <div class="result-overlay"><span>${r.legenda || ''}</span></div>
      </div>
    `).join('');
    Array.from(resultsTrack.children).forEach(card => {
      resultsTrack.appendChild(card.cloneNode(true));
    });
    setupLightbox();
  };
  fetch(`${WEBHOOK_URL}?action=list_resultados`)
    .then(res => res.json())
    .then(json => {
      const rows = (json.rows || [])
        .slice()
        .sort((a, b) => (a['Ordem'] || 0) - (b['Ordem'] || 0))
        .map(r => ({ imagemUrl: r['Imagem URL'], tag: r['Tag'], legenda: r['Legenda'] }));
      renderResults(rows.length ? rows : FALLBACK_RESULTS);
    })
    .catch(() => renderResults(FALLBACK_RESULTS));
}

// Carrossel contínuo do feed do Instagram
const feedTrack = document.getElementById('feedTrack');
if (feedTrack && typeof INSTAGRAM_FEED !== 'undefined') {
  feedTrack.innerHTML = INSTAGRAM_FEED.map(post => `
    <a class="feed-item" href="${post.href}" target="_blank" rel="noopener">
      <img loading="lazy" src="${post.img}" alt="Post Instagram">
    </a>
  `).join('');
  Array.from(feedTrack.children).forEach(item => {
    feedTrack.appendChild(item.cloneNode(true));
  });
}
