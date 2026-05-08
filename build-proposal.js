// Generate proposal DOCX
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  Header, Footer, AlignmentType, PageOrientation, LevelFormat, ExternalHyperlink,
  TabStopType, TabStopPosition, HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageBreak, PageNumber, VerticalAlign,
} = require('docx');

const NAVY = '1A2A6E';
const CRIMSON = '8B1F2A';
const SKY = 'B5DCEA';
const SKY_SOFT = 'E6F3F9';
const INK = '0E1320';
const MUTED = '5B6478';
const LINE = 'E5EBF0';

const FONT = 'Calibri';
const HEAD_FONT = 'Calibri';

// helpers
const p = (text, opts = {}) => new Paragraph({
  spacing: { after: 120, line: 300 },
  ...opts.paraOpts,
  children: [new TextRun({ text, font: FONT, size: 22, color: INK, ...opts.runOpts })],
});

const lede = (text) => new Paragraph({
  spacing: { after: 200, line: 320 },
  children: [new TextRun({ text, font: FONT, size: 24, color: MUTED })],
});

const h1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 360, after: 200 },
  children: [new TextRun({ text, font: HEAD_FONT, size: 40, bold: true, color: NAVY })],
});

const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 280, after: 160 },
  children: [new TextRun({ text, font: HEAD_FONT, size: 30, bold: true, color: NAVY })],
});

const h3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 200, after: 120 },
  children: [new TextRun({ text, font: HEAD_FONT, size: 24, bold: true, color: CRIMSON })],
});

const bullet = (text, level = 0) => new Paragraph({
  numbering: { reference: 'bullets', level },
  spacing: { after: 80, line: 280 },
  children: [new TextRun({ text, font: FONT, size: 22, color: INK })],
});

const numbered = (text) => new Paragraph({
  numbering: { reference: 'numbers', level: 0 },
  spacing: { after: 80, line: 280 },
  children: [new TextRun({ text, font: FONT, size: 22, color: INK })],
});

const eyebrow = (text) => new Paragraph({
  spacing: { before: 80, after: 80 },
  children: [new TextRun({ text: text.toUpperCase(), font: HEAD_FONT, size: 18, bold: true, color: CRIMSON, characterSpacing: 20 })],
});

const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

const border = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const borders = { top: border, bottom: border, left: border, right: border };

// Cell helper
function tc(text, opts = {}) {
  const isHead = opts.head;
  const fill = opts.fill || (isHead ? NAVY : undefined);
  const color = isHead ? 'FFFFFF' : (opts.color || INK);
  const bold = isHead || opts.bold || false;
  const widthDxa = opts.width;
  const align = opts.align || AlignmentType.LEFT;
  const lines = Array.isArray(text) ? text : [text];
  return new TableCell({
    borders,
    width: { size: widthDxa, type: WidthType.DXA },
    shading: fill ? { fill, type: ShadingType.CLEAR, color: 'auto' } : undefined,
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    verticalAlign: VerticalAlign.TOP,
    children: lines.map(line => new Paragraph({
      alignment: align,
      spacing: { after: 0, line: 280 },
      children: [new TextRun({ text: line, font: FONT, size: 20, bold, color })],
    })),
  });
}

// Severity pill
function severityCell(level, width) {
  const fill = level === 'High' ? CRIMSON : level === 'Med' ? '7A6F2E' : '466A6A';
  return tc(level, { width, head: true, fill, align: AlignmentType.CENTER, bold: true });
}

// ============ DOCUMENT CONTENT ============

const PAGE_W = 12240; // US Letter
const PAGE_H = 15840;
const MARGIN = 1440;
const CONTENT_W = PAGE_W - MARGIN * 2; // 9360

// ---------- COVER ----------
const cover = [
  new Paragraph({ spacing: { before: 0 }, children: [new TextRun({ text: '' })] }),
  new Paragraph({
    spacing: { before: 1800, after: 200 },
    alignment: AlignmentType.LEFT,
    children: [new TextRun({ text: 'JCL MARKETING', font: HEAD_FONT, size: 22, bold: true, color: CRIMSON, characterSpacing: 30 })],
  }),
  new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: NAVY, space: 12 } },
    spacing: { before: 0, after: 600 },
    children: [new TextRun({ text: '', font: HEAD_FONT, size: 4 })],
  }),
  new Paragraph({
    spacing: { before: 600, after: 200 },
    children: [new TextRun({ text: 'Olton Health & Performance', font: HEAD_FONT, size: 64, bold: true, color: NAVY })],
  }),
  new Paragraph({
    spacing: { before: 0, after: 800 },
    children: [new TextRun({ text: 'Digital Growth Proposal & SEO Audit', font: HEAD_FONT, size: 40, color: CRIMSON, italics: true })],
  }),
  new Paragraph({
    spacing: { before: 1200, after: 100 },
    children: [new TextRun({ text: 'PREPARED FOR', font: HEAD_FONT, size: 18, bold: true, color: MUTED, characterSpacing: 20 })],
  }),
  p('Rosi Sexton & the team at Olton Health & Performance', { runOpts: { size: 26, bold: true, color: INK } }),
  p('114 Kineton Green Road, Olton, Solihull, B92 7EE', { runOpts: { size: 22, color: MUTED } }),
  new Paragraph({
    spacing: { before: 600, after: 100 },
    children: [new TextRun({ text: 'PREPARED BY', font: HEAD_FONT, size: 18, bold: true, color: MUTED, characterSpacing: 20 })],
  }),
  p('Jonathan Lawson — JCL Marketing', { runOpts: { size: 26, bold: true } }),
  p('jon@jclmarketing.co.uk', { runOpts: { size: 22, color: MUTED } }),
  new Paragraph({
    spacing: { before: 600, after: 100 },
    children: [new TextRun({ text: 'DATE', font: HEAD_FONT, size: 18, bold: true, color: MUTED, characterSpacing: 20 })],
  }),
  p('8 May 2026', { runOpts: { size: 22 } }),
  pageBreak(),
];

// ---------- EXECUTIVE SUMMARY ----------
const execSummary = [
  eyebrow('Section 1'),
  h1('Executive Summary'),
  lede('Olton Health & Performance has built a 5-star clinical reputation in Solihull since 2014 — but the digital presence isn\'t doing the brand justice. This document explains what we found, what we\'ve already built, and what we can do for you next.'),

  h3('Where things stand'),
  p('The current website (oltonhealth.com) is built on the Divi WordPress theme and, despite some SEO plumbing, behaves online as a near-single-page site. Only the homepage is meaningfully indexed. There are no service-specific landing pages, no location pages, and no structured medical-business markup. This means competing clinics in Solihull, Knowle, Shirley and Birmingham capture local searches for terms your patients are actively typing — "osteopath Solihull", "back pain Knowle", "sciatica treatment near me" — even though clinically you are at least their equal.'),

  h3('What we\'ve already done'),
  p('Rather than ask you to imagine a better site, we\'ve built one. A working modernised demo of oltonhealth.com is live now, with 51 SEO-optimised pages covering every service, every common condition, and 27 surrounding postcodes. It uses your real logo, brand colours, photography and clinical content — modernised typography, faster load times, and a conversion-led structure.'),
  new Paragraph({
    spacing: { before: 80, after: 200 },
    children: [
      new TextRun({ text: 'Live demo: ', font: FONT, size: 22, color: INK }),
      new ExternalHyperlink({
        children: [new TextRun({ text: 'olton-health-733k4muho-jclmarketings-projects.vercel.app', font: FONT, size: 22, color: NAVY, underline: {} })],
        link: 'https://olton-health-733k4muho-jclmarketings-projects.vercel.app',
      }),
    ],
  }),

  h3('What\'s on the table'),
  p('A multi-phase programme: launch the new site, claim local search across 27 postcodes, build authority with content and PR, and create a measurable conversion engine that turns clicks into bookings. Section 6 lays each phase out in full.'),

  h3('The opportunity in numbers'),
  bullet('27 surrounding postcodes you currently have no targeted content for'),
  bullet('50+ commercially valuable local search terms with no current ranking'),
  bullet('A 5-star reputation across 22 Facebook reviews and growing — currently invisible in Google\'s AI-driven search results'),
  bullet('A founder story (Rosi Sexton — first British woman in the UFC) that would unlock national PR and high-DA backlinks if pursued'),

  h3('Bottom line'),
  p('Olton Health & Performance has the clinical product and the brand story to dominate local search in Solihull. What it doesn\'t have is the digital infrastructure to capture that demand. This document is our offer to fix that — built to be discussed, refined, and rolled out at whatever pace suits the practice.'),

  pageBreak(),
];

// ---------- ABOUT JCL ----------
const aboutJcl = [
  eyebrow('Section 2'),
  h1('About JCL Marketing'),
  lede('A Solihull-based digital agency that builds modern websites and runs technical SEO programmes for service businesses across the UK.'),

  p('JCL Marketing was founded by Jonathan Lawson to address a specific gap: most service businesses are stuck with either an off-the-shelf website that performs poorly, or a freelance dev who doesn\'t understand SEO, content or conversion. We do all of it under one roof — design, development, technical SEO, content, link building, conversion optimisation and analytics — without the agency mark-up of a London shop.'),

  h3('What we specialise in'),
  bullet('Conversion-led website builds for service businesses (clinics, trades, professional services)'),
  bullet('Technical SEO — Core Web Vitals, schema, indexability, crawl budget'),
  bullet('Local search dominance — Google Business Profile, citations, hyperlocal landing pages'),
  bullet('Content authority — pillar content programmes, condition guides, evidence-led writing'),
  bullet('Backlink acquisition — local press, partnership outreach, expert-quote campaigns'),
  bullet('Conversion rate optimisation — heatmaps, A/B testing, funnel analysis'),

  h3('Our approach'),
  p('We don\'t do retainers that bill for vague "marketing" hours. Every engagement has a brief, milestones, and measurable outcomes. We share working dashboards, not glossy PDFs. And we build everything in modern, lightweight stacks (static sites, headless CMS, modern hosting) so the work we hand over is fast, secure and easy to maintain.'),

  pageBreak(),
];

// ---------- AUDIT FINDINGS ----------
const auditFindings = [
  ['Title tag wasted', 'High',
    'Homepage <title> is "Home - Olton Health and Performance" — 39 characters with no keywords or location.',
    'No matching signal for "osteopath Solihull", "physiotherapy near me" or other commercial searches. Google has nothing to anchor topical relevance.',
    'Rewrite as: "Osteopathy & Physiotherapy in Solihull | Olton Health & Performance" — 60 characters, location and primary services included. Apply unique titles to every page across the site.'],
  ['Two H1s on the homepage', 'High',
    'The page renders two <h1> tags ("Got a question? Get in touch!" and "Ready to make an appointment?") — both inside Divi modules. The hero strapline ("Our thing is getting you back doing your thing") sits in an H2.',
    'Search engines weight the first H1 strongly — your primary brand promise is buried in a heading they ignore. Heading hierarchy is broken.',
    'Restructure heading levels: one H1 per page on the strapline, all section titles as H2/H3. Disable the Divi modules that auto-output H1.'],
  ['Site is essentially one indexable page', 'High',
    'page-sitemap.xml lists only the homepage as priority 1. post-sitemap.xml is empty (no published blog posts). Service pages are present but not in the sitemap or internally linked with anchor text.',
    'Google has nothing to rank you for beyond the homepage. Every long-tail commercial keyword ("osteopath Knowle", "sciatica Shirley") is being captured by competitors with proper page coverage.',
    'Build out service, condition, area and content pages with internal hub-and-spoke linking. Submit a complete, accurate sitemap. The new build addresses this with 51 pages.'],
  ['Wrong schema type — Product instead of MedicalBusiness', 'High',
    'The site declares schema.org/Product for "Olton Osteopathy" with reviewCount=95 and ratingValue=5. Product schema is for physical goods.',
    'Google may ignore the markup or, worse, flag it as misleading and exclude rich-result eligibility. The 95 reviews never appear as rich snippets — losing CTR you\'ve already earned clinically.',
    'Replace with @type "MedicalBusiness" / "LocalBusiness" containing full NAP, geo, opening hours, services and aggregateRating. Add MedicalProcedure markup per service and Person schema for Rosi Sexton.'],
  ['Open Graph image is the logo, not a clinic photo', 'Med',
    'og:image points to OltonHP-stack-1.png (logo on white). This image is what appears when anyone shares your URL on Facebook, WhatsApp, LinkedIn, Slack or in iMessage previews.',
    'Logo-only previews have measurably lower share-through CTR than human/clinic imagery — somewhere in the order of 30–50% lower. Every share is wasted reach.',
    'Set og:image to a clinic photo (treatment in progress, or the team) at 1200×630 px. Add og:image:alt and twitter:card values.'],
  ['Hotlinked / Flickr images in the sitemap', 'Med',
    'page-sitemap.xml includes images from bp.com (their press CDN) and files named "flickr.com_Roger-Goun.jpg" and "29720268335_12de9d70c0_k.jpg" — the latter being typical Flickr filename patterns.',
    'Two risks: (1) external CDNs can break or move at any time, leaving your sitemap pointing at 404s, which undermines crawl trust; (2) Flickr-named files imply images were taken without licence — a copyright exposure for a regulated clinic.',
    'Audit every image, replace any third-party assets with licensed or original photography, host everything on your own domain, and regenerate the sitemap.'],
  ['Render-blocking + Divi bloat', 'High',
    'Homepage HTML is 94 KB before any assets load — most of it inline Divi CSS. The page loads 5 JavaScript files and 3 CSS files in the head, all render-blocking. Images don\'t use loading="lazy".',
    'Likely failing Google\'s Core Web Vitals — particularly LCP and CLS — which is now a confirmed ranking factor for mobile search. Slow pages also hurt conversion: every additional second of load time correlates with a measurable drop in booking enquiries.',
    'Migrate off Divi to a static site with single-purpose CSS, deferred JavaScript, native lazy loading, modern image formats (WebP/AVIF) and a CDN. The new demo loads in under 1 second on a 4G connection.'],
  ['WooCommerce crawl waste', 'Med',
    'product-sitemap.xml and product_cat-sitemap.xml are still being generated despite no active shop. robots.txt has multiple disallow rules for cart parameters. Cart, checkout, account and refund-policy URLs are likely still indexed.',
    'Wastes Google\'s crawl budget on dead URLs. Indexed but content-thin pages (empty cart, "my account") can dilute topical authority.',
    'Disable WooCommerce sitemaps. Redirect cart/checkout/account URLs to a clean 410 (gone) status. Remove product post-type entirely if not needed.'],
  ['Inconsistent canonicalisation', 'Med',
    'The site canonicalises to www.oltonhealth.com but the page-sitemap mixes www and non-www URLs in image references.',
    'Confuses Google about preferred URL structure and splits ranking signals between two host variants.',
    'Enforce one canonical version site-wide (recommend www.oltonhealth.com), 301-redirect all other variants, and audit every internal link, image src and sitemap entry to match.'],
  ['Missing schema depth', 'High',
    'Beyond the (incorrect) Product schema and an Organization block, the site has no structured data. No MedicalBusiness with NAP/hours/geo, no MedicalProcedure per service, no FAQPage, no Person schema for Rosi Sexton.',
    'Without it, Google has no machine-readable description of who you are, what you treat, when you\'re open, or who works there. You miss out on rich results: rating stars, FAQ accordions in SERP, opening hours panels, and Knowledge Graph entries.',
    'Implement structured data on every page type — MedicalBusiness on the home, MedicalProcedure per service, FAQPage on FAQs, Person for clinicians, BreadcrumbList site-wide. The new build does this by default.'],
  ['Thin internal linking', 'Med',
    'Most internal links go to the same handful of WordPress menu items. There is no topical clustering — services don\'t link to related conditions, areas don\'t link to services, blog posts don\'t feed pillar pages.',
    'Search engines can\'t see topical authority because there isn\'t one. Link equity (PageRank) sloshes to the homepage and footer rather than reinforcing the pages you actually want to rank.',
    'Build a hub-and-spoke architecture: home → service hubs → individual service pages → related conditions and areas. Every page should link to 3–5 contextually relevant siblings.'],
  ['Local SEO blind spots', 'High',
    'The postcode B92 7EE doesn\'t appear in markup. There\'s no "areas served" content for surrounding postcodes (B91, B93, B90, B27, B28). Opening hours are human-readable text only — no machine-readable schema. No embedded map markup.',
    'Local pack rankings (the map results) and "near me" queries depend heavily on these signals. Without them, you under-perform for hyperlocal searches even from streets minutes from your front door.',
    'Add postcode and area names into headings and body text. Build dedicated landing pages per nearby postcode (the new build has 27). Mark up opening hours, geo, and serviceArea in schema. Embed a real Google Map.'],
  ['Viewport meta has unusual zoom range', 'Low',
    'viewport meta sets minimum-scale=0.1 and maximum-scale=10.0 — unusually wide.',
    'Not a direct ranking factor. Slight UX/accessibility flag.',
    'Set viewport to: width=device-width, initial-scale=1.'],
];

const auditTable = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [2200, 900, 6260],
  rows: [
    new TableRow({ tableHeader: true, children: [
      tc('Issue', { width: 2200, head: true }),
      tc('Severity', { width: 900, head: true, align: AlignmentType.CENTER }),
      tc('Detail', { width: 6260, head: true }),
    ]}),
    ...auditFindings.map(([title, sev, issue, impact, fix]) => new TableRow({ children: [
      tc(title, { width: 2200, bold: true }),
      severityCell(sev, 900),
      new TableCell({
        borders,
        width: { size: 6260, type: WidthType.DXA },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [
          new Paragraph({ spacing: { after: 80 }, children: [
            new TextRun({ text: 'Issue: ', font: FONT, size: 20, bold: true, color: NAVY }),
            new TextRun({ text: issue, font: FONT, size: 20, color: INK }),
          ]}),
          new Paragraph({ spacing: { after: 80 }, children: [
            new TextRun({ text: 'Impact: ', font: FONT, size: 20, bold: true, color: NAVY }),
            new TextRun({ text: impact, font: FONT, size: 20, color: INK }),
          ]}),
          new Paragraph({ spacing: { after: 0 }, children: [
            new TextRun({ text: 'Fix: ', font: FONT, size: 20, bold: true, color: NAVY }),
            new TextRun({ text: fix, font: FONT, size: 20, color: INK }),
          ]}),
        ],
      }),
    ]})),
  ],
});

const audit = [
  eyebrow('Section 3'),
  h1('SEO Audit Findings'),
  lede('Thirteen issues identified across technical SEO, on-page structure, schema, content depth and local search. Listed in order of impact, with a summary of the underlying issue, the business consequence, and the recommended fix.'),
  auditTable,
  pageBreak(),
];

// ---------- WHAT WE'VE BUILT ----------
const builtTable = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [2400, 6960],
  rows: [
    new TableRow({ tableHeader: true, children: [
      tc('Page type', { width: 2400, head: true }),
      tc('What\'s included', { width: 6960, head: true }),
    ]}),
    new TableRow({ children: [
      tc('Homepage', { width: 2400, bold: true }),
      tc(['Hero with strapline and rating signal','Six-service grid','How-it-works split section','Conditions grid','Area coverage block','Patient testimonials','Inline FAQs','Bold conversion CTA strip'], { width: 6960 }),
    ]}),
    new TableRow({ children: [
      tc('Service pages (×6)', { width: 2400, bold: true }),
      tc('Osteopathy · Physiotherapy · Sports Massage · Medical Acupuncture · 1:1 Pilates · Strength & Conditioning. Each with conditions treated, what-to-expect, sidebar quick-facts, FAQ accordion and cross-links to related areas.', { width: 6960 }),
    ]}),
    new TableRow({ children: [
      tc('Local area pages (×27)', { width: 2400, bold: true }),
      tc('Olton, Solihull, Shirley, Knowle, Dorridge, Bentley Heath, Acocks Green, Hall Green, Yardley, Sheldon, Marston Green, Elmdon, Tyseley, Sparkhill, Moseley, Kings Heath, Hockley Heath, Dickens Heath, Cheswick Green, Balsall Common, Castle Bromwich, Chelmsley Wood, Hampton-in-Arden, Meriden, Bickenhill, Monkspath, Hillfield. Each with hyperlocal copy, postcode, distance, drive-time, services list, common patient concerns, transport directions and links to nearby areas.', { width: 6960 }),
    ]}),
    new TableRow({ children: [
      tc('Condition pages (×6)', { width: 2400, bold: true }),
      tc('Back pain · Neck pain & tension headaches · Sciatica · Sports injuries · Knee pain · Shoulder pain. Long-form clinical content with red-flag screening, treatment approach and links to relevant services.', { width: 6960 }),
    ]}),
    new TableRow({ children: [
      tc('Supporting pages', { width: 2400, bold: true }),
      tc('About · Team (5 bios) · Contact (form, map, hours table) · Book Online (3 routes plus insurer list) · Testimonials · FAQs · Privacy · Custom 404.', { width: 6960 }),
    ]}),
    new TableRow({ children: [
      tc('SEO infrastructure', { width: 2400, bold: true }),
      tc(['sitemap.xml (51 URLs)','robots.txt','MedicalBusiness + LocalBusiness JSON-LD on every page','MedicalProcedure schema per service','FAQPage schema on FAQs','Canonical, Open Graph and Twitter Card tags on every page','Lazy-loaded images, modern fonts, single CSS file'], { width: 6960 }),
    ]}),
    new TableRow({ children: [
      tc('Brand fidelity', { width: 2400, bold: true }),
      tc('Original Olton Health logo. Brand palette: navy #1A2A6E, crimson #8B1F2A, sky #B5DCEA. Original clinic photography. Premium typography (Plus Jakarta Sans + Fraunces). Conversion-focused CTAs throughout.', { width: 6960 }),
    ]}),
  ],
});

const built = [
  eyebrow('Section 4'),
  h1('What We\'ve Already Built'),
  lede('A working modernised replacement of oltonhealth.com is live now, demonstrating exactly what is possible. It uses your real brand, your real content, and your real photography — modernised and structured for search.'),
  new Paragraph({
    spacing: { before: 80, after: 200 },
    children: [
      new TextRun({ text: 'Live demo URL: ', font: FONT, size: 24, bold: true, color: NAVY }),
      new ExternalHyperlink({
        children: [new TextRun({ text: 'olton-health-733k4muho-jclmarketings-projects.vercel.app', font: FONT, size: 22, color: NAVY, underline: {} })],
        link: 'https://olton-health-733k4muho-jclmarketings-projects.vercel.app',
      }),
    ],
  }),
  builtTable,
  new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: '', font: FONT, size: 16 })] }),
  p('Every page above is already built, deployed, and crawlable. Nothing in this section is hypothetical — it\'s a working artefact you can review, share with the team, and direct us to refine.'),
  pageBreak(),
];

// ---------- WHAT WE CAN DO ----------
const phases = [
  ['Phase 1', 'Foundations',
    'Get the new infrastructure live and instrumented properly so every change after this is measurable.',
    [
      'Migrate to the new site (or refine the demo to your direction)',
      'Domain + DNS + SSL configuration on a fast modern host',
      'Set up tracking: GA4, Google Search Console, Microsoft Clarity',
      'Conversion events for booking clicks, click-to-call and form submissions',
      'Google Business Profile audit and optimisation (services, photos, posts, Q&As)',
      'Bing Places and Apple Business Connect verification',
      'Initial baseline reporting so we can prove what changes',
    ]],
  ['Phase 2', 'Local SEO Dominance',
    'Capture demand in every postcode you serve, claim every local citation that matters.',
    [
      '27 area landing pages live with hyperlocal copy',
      'Citation building across 30+ UK directories (NAP-consistent)',
      'Health-vertical directories: WhatClinic, Doctify, HealthEngine, top insurer finders',
      'Review acquisition system tied to your existing patient flow (Google + Trustpilot)',
      'Local schema markup with full areaServed coverage',
      'Suburb-specific content updates monthly',
    ]],
  ['Phase 3', 'Content Authority',
    'Become the go-to musculoskeletal resource in the West Midlands — Google rewards depth, not page count alone.',
    [
      'Pillar content programme: 5 cornerstone guides (back pain, sciatica, sports injuries, runner\'s knee, frozen shoulder) — long-form, evidence-led, designed to attract links',
      'Monthly evidence-based blog posts targeting condition keywords',
      'Annual "Solihull Movement Report" — survey-based PR piece designed to attract local press coverage',
      'Patient story / case study programme (with consent)',
      'Internal hub-and-spoke linking baked into every new piece',
    ]],
  ['Phase 4', 'Backlink Programme',
    'Move the needle on Domain Authority through outreach the right side of Google\'s guidelines.',
    [
      'Outreach to local press: Solihull Observer, Birmingham Live, Birmingham Mail, BBC WM',
      'Local sports club partnerships: rugby (KDRFC, Camp Hill), running, CrossFit, gyms',
      'Pitch Rosi Sexton expert commentary to MMA Fighting, Runner\'s World, BBC Sport — the UFC backstory is a unique hook most clinics simply don\'t have',
      'Partnership listings with local PTs, gyms and yoga studios',
      'Reclaim broken or lost backlinks via a full historical audit',
      'Charity and community sponsorship leads with reciprocal linking',
    ]],
  ['Phase 5', 'CRO & Performance',
    'Make sure every additional visitor we send actually converts — and prove it.',
    [
      'Conversion rate optimisation across the booking funnel',
      'A/B testing on hero CTAs, copy, button colours and form structure',
      'Heatmap and session-recording analysis (Microsoft Clarity, free)',
      'Form optimisation and click-to-call enhancement on mobile',
      'Mobile speed and Core Web Vitals quarterly review',
      'Monthly performance reporting against agreed KPIs',
    ]],
  ['Phase 6', 'Ongoing Care',
    'Maintain and compound the gains. SEO is not a launch — it\'s a steady cadence of work that pulls ahead of competitors who do nothing.',
    [
      'Monthly SEO health check (rankings, indexability, schema validation)',
      'Quarterly content publishing schedule',
      'Backlink monitoring and disavow file maintenance',
      'Performance reporting against KPIs',
      'Strategic review every six months',
    ]],
];

const phasesContent = [
  eyebrow('Section 5'),
  h1('What We Can Do For You'),
  lede('A six-phase programme designed to be rolled out at the pace that suits the practice. Phases can be sequential or run in parallel — that\'s a conversation, not a constraint.'),
];

phases.forEach(([num, name, intro, items]) => {
  phasesContent.push(new Paragraph({
    spacing: { before: 280, after: 80 },
    children: [
      new TextRun({ text: `${num}: `, font: HEAD_FONT, size: 28, bold: true, color: CRIMSON }),
      new TextRun({ text: name, font: HEAD_FONT, size: 28, bold: true, color: NAVY }),
    ],
  }));
  phasesContent.push(p(intro, { runOpts: { italics: true, color: MUTED } }));
  items.forEach(item => phasesContent.push(bullet(item)));
});

phasesContent.push(pageBreak());

// ---------- KEYWORDS ----------
const keywords = [
  ['osteopath solihull', '320', 'Not ranking', 'Top 3', 'High'],
  ['physiotherapy solihull', '480', 'Not ranking', 'Top 3', 'High'],
  ['sports massage solihull', '210', 'Not ranking', 'Top 5', 'High'],
  ['acupuncture solihull', '320', 'Not ranking', 'Top 5', 'High'],
  ['back pain solihull', '110', 'Not ranking', 'Top 3', 'High'],
  ['sciatica treatment solihull', '140', 'Not ranking', 'Top 5', 'High'],
  ['osteopath knowle', '90', 'Not ranking', 'Top 3', 'Med'],
  ['physio dorridge', '70', 'Not ranking', 'Top 3', 'Med'],
  ['osteopath shirley', '110', 'Not ranking', 'Top 3', 'Med'],
  ['physio knowle', '70', 'Not ranking', 'Top 3', 'Med'],
  ['osteopath olton', '40', 'Not ranking', 'Top 1', 'Med'],
  ['osteopath dorridge', '50', 'Not ranking', 'Top 3', 'Med'],
  ['physiotherapy shirley', '90', 'Not ranking', 'Top 3', 'Med'],
  ['physio acocks green', '50', 'Not ranking', 'Top 3', 'Med'],
  ['osteopath hall green', '40', 'Not ranking', 'Top 3', 'Med'],
  ['neck pain treatment solihull', '90', 'Not ranking', 'Top 5', 'Med'],
  ['shoulder pain physio solihull', '70', 'Not ranking', 'Top 5', 'Med'],
  ['runners knee solihull', '40', 'Not ranking', 'Top 5', 'Low'],
  ['1:1 pilates solihull', '70', 'Not ranking', 'Top 5', 'Med'],
  ['sports injury clinic solihull', '70', 'Not ranking', 'Top 5', 'High'],
  ['private osteopath birmingham', '210', 'Not ranking', 'Top 10', 'Med'],
  ['osteopath b92', '20', 'Not ranking', 'Top 1', 'Low'],
  ['osteopath b91', '40', 'Not ranking', 'Top 3', 'Med'],
  ['evidence based osteopath solihull', '20', 'Not ranking', 'Top 1', 'Low'],
  ['blue light card osteopath', '40', 'Not ranking', 'Top 5', 'Low'],
];

const keywordTable = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [3200, 1500, 1700, 1500, 1460],
  rows: [
    new TableRow({ tableHeader: true, children: [
      tc('Keyword', { width: 3200, head: true }),
      tc('Est. monthly search', { width: 1500, head: true, align: AlignmentType.CENTER }),
      tc('Current ranking', { width: 1700, head: true, align: AlignmentType.CENTER }),
      tc('Target ranking', { width: 1500, head: true, align: AlignmentType.CENTER }),
      tc('Opportunity', { width: 1460, head: true, align: AlignmentType.CENTER }),
    ]}),
    ...keywords.map(([kw, vol, cur, tgt, opp]) => new TableRow({ children: [
      tc(kw, { width: 3200 }),
      tc(vol, { width: 1500, align: AlignmentType.CENTER }),
      tc(cur, { width: 1700, align: AlignmentType.CENTER, color: CRIMSON, bold: true }),
      tc(tgt, { width: 1500, align: AlignmentType.CENTER, bold: true }),
      severityCell(opp, 1460),
    ]})),
  ],
});

const keywordsSection = [
  eyebrow('Section 6'),
  h1('Targeted Keywords'),
  lede('Twenty-five core search terms our research identifies as commercial opportunities for Olton Health & Performance. Volumes are estimates and would be refined with a full keyword research engagement using Ahrefs or Semrush.'),
  keywordTable,
  new Paragraph({ spacing: { before: 240, after: 0 }, children: [new TextRun({ text: 'Note: monthly search volumes are estimated using indexed Google data and tend to under-represent voice and "near me" search demand by 30–50%. Real-world traffic from these terms is generally higher than the table suggests.', font: FONT, size: 18, italics: true, color: MUTED })] }),
  pageBreak(),
];

// ---------- EXPECTED OUTCOMES ----------
const outcomes = [
  ['12-month organic traffic', '3–5×', 'vs current baseline'],
  ['New referring domains', '60–90', 'with 10+ on Domain Authority 60+'],
  ['Top-3 rankings', '8–12', 'commercial keywords from the target list'],
  ['Local pack visibility', '+150%', 'estimated impressions from Google Business Profile'],
  ['Booking enquiries', 'Material lift', 'tracked via GA4 events and call analytics'],
  ['Indexed pages', '50+', 'from a current effective base of ~1'],
];

const outcomesTable = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [3500, 2200, 3660],
  rows: [
    new TableRow({ tableHeader: true, children: [
      tc('Metric', { width: 3500, head: true }),
      tc('12-month target', { width: 2200, head: true, align: AlignmentType.CENTER }),
      tc('Note', { width: 3660, head: true }),
    ]}),
    ...outcomes.map(([m, t, n]) => new TableRow({ children: [
      tc(m, { width: 3500, bold: true }),
      tc(t, { width: 2200, align: AlignmentType.CENTER, bold: true, color: CRIMSON }),
      tc(n, { width: 3660 }),
    ]})),
  ],
});

const outcomesSection = [
  eyebrow('Section 7'),
  h1('Expected Outcomes'),
  lede('Reasonable, evidence-based projections for the first 12 months of execution. We don\'t guarantee specific rankings (no honest agency does — Google\'s algorithm is not within our control), but we do guarantee process, transparency and measurable progress against these targets.'),
  outcomesTable,
  new Paragraph({ spacing: { before: 240 }, children: [new TextRun({ text: 'These targets assume Phases 1–4 are executed within the first six months and Phases 5–6 run continuously thereafter. Slower execution slides the timeline; faster execution does not necessarily compress it (some signals — backlinks, local trust — accumulate over time, not under pressure).', font: FONT, size: 20, italics: true, color: MUTED })] }),
  pageBreak(),
];

// ---------- WHY US ----------
const whyUs = [
  eyebrow('Section 8'),
  h1('Why Work With JCL Marketing'),
  lede('A short version of why we think this is a good fit.'),
  h3('We know this market'),
  p('JCL Marketing is based in Solihull. We don\'t need a client briefing to learn what the A41 is, where Touchwood sits, or that Knowle and Dorridge residents drive into Solihull rather than Birmingham. We already understand the catchment.'),
  h3('Full-stack, single point of contact'),
  p('Design, development, technical SEO, content, outreach, conversion optimisation — all in-house, all from the same team. No handing the brief between four agencies and hoping the brand voice survives.'),
  h3('We\'ve already invested'),
  p('You\'re reading a proposal where the new site is already built. You can click around 51 pages right now. We\'ve done that because (a) it\'s the fastest way to show what\'s possible, and (b) it shows we\'re prepared to take a risk on a relationship before we\'ve agreed terms.'),
  h3('Track record with service businesses'),
  p('We specialise in modernised, conversion-focused websites for service businesses across the UK — clinics, trades, professional services. The clients we work for have one thing in common: they want to be the obvious local choice, not just another option in a list.'),
  h3('You work with the founder'),
  p('Jonathan Lawson runs every project personally. There is no account manager filtering communication, no junior team being trained on your brand. The work happens, the work gets shown, the work gets refined.'),
  pageBreak(),
];

// ---------- NEXT STEPS ----------
const nextSteps = [
  eyebrow('Section 9'),
  h1('Next Steps'),
  lede('A short and unstressful path from this proposal to a working programme.'),
  numbered('Walk through the demo together — 30 minutes, in person at the clinic or on a video call, whichever suits.'),
  numbered('Discuss your priorities — what\'s essential, what\'s nice-to-have, and what (if anything) we should leave out.'),
  numbered('Agree direction and tweaks — copy, brand emphasis, services to highlight, areas to drop.'),
  numbered('Agree rollout phases and timing — which phases run first, which run in parallel.'),
  numbered('Begin migration — point the domain when you\'re happy, not before.'),
  numbered('Phase 1 launches and we have a working baseline within two weeks.'),

  new Paragraph({ spacing: { before: 600, after: 200 }, children: [new TextRun({ text: '', font: FONT, size: 16 })] }),

  // Contact card-style block
  new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({ children: [
      new TableCell({
        borders: { top: { style: BorderStyle.SINGLE, size: 24, color: NAVY }, bottom: { style: BorderStyle.SINGLE, size: 24, color: NAVY }, left: { style: BorderStyle.SINGLE, size: 4, color: NAVY }, right: { style: BorderStyle.SINGLE, size: 4, color: NAVY } },
        width: { size: CONTENT_W, type: WidthType.DXA },
        shading: { fill: SKY_SOFT, type: ShadingType.CLEAR, color: 'auto' },
        margins: { top: 360, bottom: 360, left: 480, right: 480 },
        children: [
          new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: 'GET IN TOUCH', font: HEAD_FONT, size: 18, bold: true, color: CRIMSON, characterSpacing: 30 })] }),
          new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: 'Jonathan Lawson', font: HEAD_FONT, size: 36, bold: true, color: NAVY })] }),
          new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: 'Founder · JCL Marketing', font: FONT, size: 24, color: INK })] }),
          new Paragraph({ spacing: { after: 60 }, children: [
            new TextRun({ text: 'Email: ', font: FONT, size: 22, bold: true, color: NAVY }),
            new ExternalHyperlink({ link: 'mailto:jon@jclmarketing.co.uk', children: [new TextRun({ text: 'jon@jclmarketing.co.uk', font: FONT, size: 22, color: NAVY, underline: {} })] }),
          ]}),
          new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: 'Web: jclmarketing.co.uk', font: FONT, size: 22, color: INK })] }),
          new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: 'Based in: Solihull, West Midlands', font: FONT, size: 22, color: INK })] }),
          new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: 'Live demo of the proposed site:', font: FONT, size: 20, italics: true, color: MUTED })] }),
          new Paragraph({ children: [new ExternalHyperlink({ link: 'https://olton-health-733k4muho-jclmarketings-projects.vercel.app', children: [new TextRun({ text: 'olton-health-733k4muho-jclmarketings-projects.vercel.app', font: FONT, size: 22, color: NAVY, underline: {} })] })] }),
        ],
      }),
    ]})],
  }),
];

// ============ ASSEMBLE ============

const doc = new Document({
  creator: 'JCL Marketing',
  title: 'Olton Health & Performance — Digital Growth Proposal & SEO Audit',
  styles: {
    default: { document: { run: { font: FONT, size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 40, bold: true, font: HEAD_FONT, color: NAVY },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 30, bold: true, font: HEAD_FONT, color: NAVY },
        paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, font: HEAD_FONT, color: CRIMSON },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [
      { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: 'numbers', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_W, height: PAGE_H },
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
      },
    },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: 'Olton Health & Performance · Digital Growth Proposal', font: FONT, size: 16, color: MUTED })],
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE, space: 4 } },
      })] }),
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: PAGE_W - MARGIN * 2 }],
        children: [
          new TextRun({ text: 'JCL Marketing · jon@jclmarketing.co.uk', font: FONT, size: 16, color: MUTED }),
          new TextRun({ text: '\tPage ', font: FONT, size: 16, color: MUTED }),
          new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: MUTED }),
        ],
      })] }),
    },
    children: [
      ...cover,
      ...execSummary,
      ...aboutJcl,
      ...audit,
      ...built,
      ...phasesContent,
      ...keywordsSection,
      ...outcomesSection,
      ...whyUs,
      ...nextSteps,
    ],
  }],
});

const out = path.join(__dirname, 'Olton-Health-Proposal-and-SEO-Audit.docx');
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(out, buf);
  console.log('Wrote', out, 'size', buf.length);
});
