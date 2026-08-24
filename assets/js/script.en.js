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
  servicesGrid.innerHTML = TREATMENTS.map(t => `
    <a href="tratamento.html?t=${t.slug}" class="service-card reveal">
      <div class="service-icon">${t.icon}</div>
      <h3>${t.name}</h3>
      <p>${t.short}</p>
      <span class="service-more">Learn more &rarr;</span>
    </a>
  `).join('');
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// Carrossel contínuo de resultados (duplica os cards para loop sem emenda)
const resultsTrack = document.getElementById('resultsTrack');
if (resultsTrack) {
  Array.from(resultsTrack.children).forEach(card => {
    resultsTrack.appendChild(card.cloneNode(true));
  });
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

// Lightbox para galeria de resultados
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

if (lightbox && lightboxImg && lightboxClose) {
  document.querySelectorAll('[data-lightbox]').forEach(card => {
    card.addEventListener('click', () => {
      lightboxImg.src = card.getAttribute('data-lightbox');
      lightbox.classList.add('active');
    });
  });
  lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('active');
  });
}
