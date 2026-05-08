const { BIZ, SERVICES, AREAS, CONDITIONS, FAQS, TEAM } = require('./data');

const ICONS = {
  spine: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 3v18M9 5h6M8.5 9h7M9 13h6M8.5 17h7M9 21h6"/></svg>',
  activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-7 4 14 2-7h6"/></svg>',
  hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11V5a2 2 0 0 1 4 0v6M13 11V4a2 2 0 0 1 4 0v9M17 13V7a2 2 0 1 1 4 0v8a7 7 0 0 1-7 7H10a5 5 0 0 1-5-5l-1-7a2 2 0 1 1 4-1l1 4"/></svg>',
  needle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l4-4M7 17l10-10 4 4L11 21H7v-4z"/></svg>',
  flow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c3 0 3-4 6-4s3 4 6 4 3-4 6-4M3 18c3 0 3-4 6-4s3 4 6 4 3-4 6-4"/></svg>',
  kettlebell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5h6a3 3 0 0 1 0 6 7 7 0 1 1-6 0 3 3 0 0 1 0-6z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-7.5 8-13a8 8 0 1 0-16 0c0 5.5 8 13 8 13z"/><circle cx="12" cy="9" r="3"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></svg>',
};

// path is the page's path from root, used to compute prefix
function rel(path) {
  // count slashes to determine ../
  if (path === '/' || path === '/index.html' || path === '') return '';
  const depth = path.replace(/^\/|\/$/g,'').split('/').length - 1;
  return depth === 0 ? '' : '../'.repeat(depth);
}

function head({ path = '/', title, description, canonical, schema }) {
  const prefix = rel(path);
  const url = canonical || (BIZ.baseUrl + (path === '/index.html' ? '/' : path));
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description.replace(/"/g,'&quot;')}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title.replace(/"/g,'&quot;')}">
<meta property="og:description" content="${description.replace(/"/g,'&quot;')}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${BIZ.baseUrl}/assets/images/clinic-1.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1a2a6e">
<link rel="icon" type="image/png" href="${prefix}assets/images/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${prefix}css/styles.css">
${schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : ''}
</head>
<body>`;
}

function header(path = '/') {
  const p = rel(path);
  const navItems = [
    { label: 'Services', href: p+'services/', sub: SERVICES.map(s => ({ label: s.title, href: `${p}services/${s.slug}.html` })) },
    { label: 'Conditions', href: p+'conditions/', sub: CONDITIONS.map(c => ({ label: c.title, href: `${p}conditions/${c.slug}.html` })) },
    { label: 'Areas', href: p+'areas/', sub: [
      { label: 'All areas →', href: p+'areas/' },
      ...AREAS.slice(0, 11).map(a => ({ label: a.name, href: `${p}areas/${a.slug}.html` })),
    ] },
    { label: 'Team', href: p+'team.html' },
    { label: 'About', href: p+'about.html' },
    { label: 'FAQs', href: p+'faqs.html' },
    { label: 'Contact', href: p+'contact.html' },
  ];
  return `
<header class="site-header">
  <nav class="nav container" aria-label="Main">
    <a class="brand" href="${p || '/'}" aria-label="Olton Health & Performance — home">
      <img src="${p}assets/images/logo.png" alt="Olton Health & Performance" width="220" height="55" class="brand__logo">
    </a>
    <button class="nav__toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav__menu">
      ${navItems.map(item => item.sub ? `
        <li class="has-sub"><a href="${item.href}">${item.label}</a>
          <ul class="submenu${item.sub.length>8?' submenu--wide':''}">
            ${item.sub.map(s => `<li><a href="${s.href}">${s.label}</a></li>`).join('')}
          </ul>
        </li>` : `<li><a href="${item.href}">${item.label}</a></li>`).join('')}
    </ul>
    <a class="nav__cta" href="${p}book.html">Book now</a>
  </nav>
</header>`;
}

function footer(path = '/') {
  const p = rel(path);
  return `
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <div class="footer__brand">Olton Health & Performance</div>
        <p style="font-size:.95rem;line-height:1.6;color:rgba(255,255,255,.7);">Evidence-led osteopathy, physiotherapy, sports massage, acupuncture and Pilates in Solihull. Helping people across the West Midlands move better since ${BIZ.founded}.</p>
        <p style="margin-top:1rem;"><a href="tel:${BIZ.phoneRaw}" style="color:var(--sky);font-weight:600;">${BIZ.phone}</a></p>
      </div>
      <div>
        <h4>Services</h4>
        <ul>${SERVICES.map(s=>`<li><a href="${p}services/${s.slug}.html">${s.title}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h4>Areas</h4>
        <ul>${AREAS.slice(0,8).map(a=>`<li><a href="${p}areas/${a.slug}.html">${a.name}</a></li>`).join('')}<li><a href="${p}areas/">All areas →</a></li></ul>
      </div>
      <div class="footer__address">
        <h4>Visit Us</h4>
        ${BIZ.addressLines.map(l=>`<p>${l}</p>`).join('')}
        <p style="margin-top:.75rem;"><a href="mailto:${BIZ.email}" style="color:var(--sky);">${BIZ.email}</a></p>
        <p style="margin-top:.5rem;font-size:.85rem;">Blue Light Card: 10% off</p>
      </div>
    </div>
    <div class="footer__bottom">
      <div>© ${new Date().getFullYear()} ${BIZ.name}. All rights reserved.</div>
      <div>
        <a href="${p}privacy.html">Privacy</a> ·
        <a href="${p}sitemap.xml">Sitemap</a> ·
        <a href="${BIZ.facebook}" rel="noopener">Facebook</a>
      </div>
    </div>
  </div>
</footer>
<script src="${p}js/main.js" defer></script>
</body>
</html>`;
}

function ctaStrip(path) {
  const p = rel(path);
  return `
<section>
  <div class="container">
    <div class="cta-strip">
      <div>
        <h2 class="mt-0">Ready to get back to doing your thing?</h2>
        <p>Book online in 60 seconds or call us on ${BIZ.phone}. If we don't think we can help, your first appointment is free.</p>
      </div>
      <div class="cta-strip__actions">
        <a class="btn btn--primary" href="${p}book.html">Book online</a>
        <a class="btn btn--outline" href="tel:${BIZ.phoneRaw}">Call ${BIZ.phone}</a>
      </div>
    </div>
  </div>
</section>`;
}

function trustBar(path) {
  const p = rel(path);
  return `
<section class="trust">
  <div class="container">
    <div class="trust__inner">
      <img src="${p}assets/images/accred-gosc.png" alt="General Osteopathic Council">
      <img src="${p}assets/images/accred-io.png" alt="Institute of Osteopathy">
      <img src="${p}assets/images/accred-coo.png" alt="College of Osteopaths">
      <img src="${p}assets/images/accred-csp.png" alt="Chartered Society of Physiotherapy">
      <img src="${p}assets/images/accred-aacp.png" alt="Acupuncture Association of Chartered Physiotherapists">
      <img src="${p}assets/images/accred-smbc.png" alt="Solihull Metropolitan Borough Council">
    </div>
  </div>
</section>`;
}

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness","LocalBusiness"],
    "name": BIZ.name,
    "image": `${BIZ.baseUrl}/assets/images/clinic-1.jpg`,
    "@id": `${BIZ.baseUrl}/#business`,
    "url": BIZ.baseUrl,
    "telephone": BIZ.phone,
    "email": BIZ.email,
    "priceRange": "££",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "114 Kineton Green Road",
      "addressLocality": "Olton",
      "addressRegion": "Solihull",
      "postalCode": BIZ.postcode,
      "addressCountry": "GB"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": BIZ.geo.lat, "longitude": BIZ.geo.lng },
    "openingHoursSpecification": [
      { "@type":"OpeningHoursSpecification","dayOfWeek":"Monday","opens":"09:00","closes":"21:00" },
      { "@type":"OpeningHoursSpecification","dayOfWeek":"Tuesday","opens":"09:00","closes":"18:00" },
      { "@type":"OpeningHoursSpecification","dayOfWeek":"Wednesday","opens":"09:00","closes":"21:00" },
      { "@type":"OpeningHoursSpecification","dayOfWeek":"Thursday","opens":"09:00","closes":"18:00" },
      { "@type":"OpeningHoursSpecification","dayOfWeek":"Friday","opens":"09:00","closes":"18:00" },
      { "@type":"OpeningHoursSpecification","dayOfWeek":"Sunday","opens":"10:00","closes":"13:00" }
    ],
    "sameAs": [BIZ.facebook]
  };
}

module.exports = { ICONS, head, header, footer, ctaStrip, trustBar, rel, localBusinessSchema };
