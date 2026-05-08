#!/usr/bin/env node
// Static site generator for Olton Health & Performance
const fs = require('fs');
const path = require('path');
const { BIZ, SERVICES, TEAM, AREAS, CONDITIONS, FAQS } = require('./data');
const { ICONS, head, header, footer, ctaStrip, trustBar, rel, localBusinessSchema } = require('./templates');

const ROOT = __dirname;

function write(rel, html) {
  const out = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log('  •', rel);
}

// ----- HOME -----
function homePage() {
  const p = '/';
  const title = `Olton Health & Performance | Osteopathy & Physiotherapy in Solihull`;
  const desc = `Evidence-led osteopathy, physiotherapy, sports massage, acupuncture & Pilates in Olton, Solihull. Get back to doing your thing — first appointment free if we can't help.`;
  return [
    head({ path: p, title, description: desc, schema: localBusinessSchema() }),
    header(p),

    `<section class="hero"><div class="container"><div class="hero__grid">
      <div>
        <div class="hero__rating">
          <span class="stars">★★★★★</span>
          <span><strong>100% recommended</strong> · 22 patient reviews</span>
        </div>
        <span class="eyebrow">Solihull · Established 2014</span>
        <h1 class="hero__title">Get back to <em>doing your thing</em>.</h1>
        <p class="lede">Hands-on osteopathy, chartered physiotherapy and clinical Pilates in Olton — built around getting you better, not keeping you in our diary.</p>
        <div class="hero__cta">
          <a class="btn btn--primary btn--lg" href="book.html">Book your appointment</a>
          <a class="btn btn--outline btn--lg" href="tel:${BIZ.phoneRaw}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            ${BIZ.phone}
          </a>
        </div>
        <ul class="hero__assurance">
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> First visit free if we can't help</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Most insurers covered</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Blue Light Card 10% off</li>
        </ul>
        <div class="hero__meta">
          <div><strong data-count="2014">2014</strong><span>Established</span></div>
          <div><strong data-count="5" data-suffix="★">5★</strong><span>Patient rating</span></div>
          <div><strong>45 min</strong><span>First visit</span></div>
          <div><strong>1–3 days</strong><span>Wait time</span></div>
        </div>
      </div>
      <div class="hero__visual">
        <span class="hero__sticker">Available this week</span>
        <img src="assets/images/clinic-2.png" alt="Inside Olton Health & Performance clinic in Solihull" loading="eager">
        <div class="hero__badge">
          <div class="hero__badge__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>
          </div>
          <div>
            <strong>Senior clinicians only</strong>
            <span>GOsC · HCPC · CSP · AACP registered</span>
          </div>
        </div>
      </div>
    </div></div></section>`,

    trustBar(p),

    `<section><div class="container">
      <div class="section__head section__head--split" data-reveal>
        <div>
          <span class="eyebrow">What we do</span>
          <h2>Six services. One purpose: <br>get you back to full strength.</h2>
        </div>
        <p class="lede">Every patient is different — so every treatment plan is tailored. Pick the service that fits, or come for a consultation and we'll work out the right blend together.</p>
      </div>
      <div class="cards" data-reveal-stagger>
        ${SERVICES.map(s => `
          <article class="card">
            <div class="card__icon">${ICONS[s.icon]}</div>
            <h3>${s.title}</h3>
            <p>${s.short}</p>
            <a class="card__link" href="services/${s.slug}.html">Learn more</a>
          </article>`).join('')}
      </div>
    </div></section>`,

    `<section class="bg-cream"><div class="container">
      <div class="section__head section__head--center" data-reveal>
        <span class="eyebrow">How it works</span>
        <h2>Three steps. No mystery.</h2>
        <p class="lede">From the moment you book to the moment you walk out pain-free, here's exactly what to expect.</p>
      </div>
      <div class="steps" data-reveal-stagger>
        <article class="step">
          <h3>Book in 60 seconds</h3>
          <p>Choose your service, clinician and time online — or call us directly. Most patients are seen within 1–3 working days.</p>
        </article>
        <article class="step">
          <h3>45-minute first visit</h3>
          <p>Full case history, hands-on examination, plain-English explanation of what's going on, and treatment in the same session. You leave with a plan.</p>
        </article>
        <article class="step">
          <h3>2–6 sessions, typically</h3>
          <p>We treat for as long as you need and not a session longer. If we don't think we can help on day one, your first visit is free.</p>
        </article>
      </div>
    </div></section>`,

    `<section><div class="container">
      <div class="stats" data-reveal>
        <div><span class="stat__num" data-count="11">0</span><span class="stat__label">Years in Solihull</span></div>
        <div><span class="stat__num" data-count="100" data-suffix="%">0%</span><span class="stat__label">Recommend us</span></div>
        <div><span class="stat__num" data-count="27">0</span><span class="stat__label">Postcodes covered</span></div>
        <div><span class="stat__num" data-count="5" data-suffix="★">0★</span><span class="stat__label">Average rating</span></div>
      </div>
    </div></section>`,

    `<section class="bg-soft"><div class="container">
      <div class="split">
        <div data-reveal>
          <span class="eyebrow">Our approach</span>
          <h2>Find the cause. Fix it. Move on.</h2>
          <p>Most people walk in expecting a quick fix or a long course of treatment. We do neither by default. Our job is to understand <em>why</em> something hurts, do the right hands-on and rehab work to settle it, and give you the tools to keep it gone.</p>
          <ul class="prose">
            <li><strong>45-minute first appointment</strong> — full case history, examination and treatment.</li>
            <li><strong>Honest plan</strong> — typically 2–6 sessions for most issues.</li>
            <li><strong>First visit free</strong> if we don't think we can help.</li>
            <li><strong>Blue Light Card</strong> — 10% off all services.</li>
          </ul>
          <a class="btn btn--secondary" href="about.html" style="margin-top:1rem;">More about our approach</a>
        </div>
        <div data-reveal><img src="assets/images/clinic-3.jpg" alt="Treatment in progress at Olton Health" loading="lazy"></div>
      </div>
    </div></section>`,

    `<section><div class="container">
      <div class="section__head section__head--center" style="text-align:center;">
        <span class="eyebrow">Common reasons people come in</span>
        <h2>What we treat</h2>
      </div>
      <div class="cards">
        ${CONDITIONS.map(c => `
          <article class="card" data-reveal>
            <h3>${c.title}</h3>
            <p>${c.short}</p>
            <a class="card__link" href="conditions/${c.slug}.html">Read more</a>
          </article>`).join('')}
      </div>
    </div></section>`,

    `<section class="bg-soft"><div class="container">
      <div class="section__head section__head--split">
        <div>
          <span class="eyebrow">Coverage</span>
          <h2>Trusted by patients across Solihull and Birmingham</h2>
        </div>
        <p class="lede">From Olton and Solihull to Knowle, Dorridge, Shirley and beyond — we welcome patients from across the West Midlands. Find your area below.</p>
      </div>
      <div class="area-grid">
        ${AREAS.slice(0, 12).map(a => `
          <a href="areas/${a.slug}.html"><strong>${a.name}</strong><span>${a.postcode}</span></a>
        `).join('')}
      </div>
      <div style="margin-top:1.5rem;"><a class="btn btn--ghost" href="areas/">See all 27 areas we cover </a></div>
    </div></section>`,

    `<section><div class="container">
      <div class="section__head section__head--center" style="text-align:center;">
        <span class="eyebrow">Patient stories</span>
        <h2>Real people. Real results.</h2>
      </div>
      <div class="testimonials" data-reveal-stagger>
        <div class="testimonial"><div class="testimonial__stars">★★★★★</div><p>I'd been struggling with lower back pain for over a year. Within three sessions I was back at the gym, and Rosi gave me the rehab work to keep it that way. Honest, evidence-based and never strung me along.</p><cite><div>James T.<span>Solihull · Lower back pain</span></div></cite></div>
        <div class="testimonial"><div class="testimonial__stars">★★★★★</div><p>After my marathon training started causing knee pain, the team got to the root of it quickly. Combined sports massage and rehab — I finished my race pain-free.</p><cite><div>Sarah W.<span>Knowle · Runner's knee</span></div></cite></div>
        <div class="testimonial"><div class="testimonial__stars">★★★★★</div><p>I'd tried physiotherapy elsewhere with no real improvement. The clinical Pilates here was a game changer for my chronic neck pain. I really felt heard.</p><cite><div>Rachel M.<span>Shirley · Chronic neck pain</span></div></cite></div>
      </div>
    </div></section>`,

    `<section><div class="container">
      <div class="section__head section__head--center" style="text-align:center;"><span class="eyebrow">Frequently asked</span><h2>Quick answers</h2></div>
      <div class="prose narrow">
        ${FAQS.slice(0,5).map(f => `
          <details class="faq__item"><summary>${f.q}</summary><div>${f.a}</div></details>
        `).join('')}
      </div>
      <div style="text-align:center;margin-top:2rem;"><a class="btn btn--ghost" href="faqs.html">See all FAQs </a></div>
    </div></section>`,

    ctaStrip(p),
    footer(p),
  ].join('');
}

// ----- SERVICES HUB -----
function servicesHub() {
  const p = '/services/index.html';
  const title = `Our Services | Olton Health & Performance, Solihull`;
  const desc = `Osteopathy, physiotherapy, sports massage, medical acupuncture, 1:1 Pilates and strength & conditioning at our Solihull clinic. Evidence-led care, tailored to you.`;
  return [
    head({ path: p, title, description: desc }),
    header(p),
    `<section class="page-head"><div class="container">
      <div class="breadcrumbs"><a href="../">Home</a> / Services</div>
      <span class="eyebrow">What we do</span>
      <h1>Hands-on, evidence-led care for active people.</h1>
      <p class="lede">Six interconnected services under one roof in Olton, Solihull — picked and combined to suit your body, your goals and your timeline.</p>
    </div></section>`,
    `<section><div class="container">
      <div class="cards">
        ${SERVICES.map(s => `
          <article class="card" data-reveal>
            <div class="card__icon">${ICONS[s.icon]}</div>
            <h3>${s.title}</h3>
            <p>${s.summary}</p>
            <a class="card__link" href="${s.slug}.html">Read more</a>
          </article>`).join('')}
      </div>
    </div></section>`,
    ctaStrip(p),
    footer(p),
  ].join('');
}

// ----- INDIVIDUAL SERVICE PAGE -----
function servicePage(svc) {
  const p = `/services/${svc.slug}.html`;
  const title = `${svc.title} in Solihull | Olton Health & Performance`;
  const desc = `${svc.short} Book ${svc.title.toLowerCase()} at our Olton, Solihull clinic — evidence-led care since 2014.`;
  return [
    head({ path: p, title, description: desc, schema: {
      "@context":"https://schema.org",
      "@type":"MedicalProcedure",
      "name": svc.title,
      "description": svc.summary,
      "provider": { "@id": `${BIZ.baseUrl}/#business` }
    }}),
    header(p),
    `<section class="page-head"><div class="container">
      <div class="breadcrumbs"><a href="../">Home</a> / <a href="./">Services</a> / ${svc.title}</div>
      <span class="eyebrow">${svc.title}</span>
      <h1>${svc.title} in Solihull, tailored to you.</h1>
      <p class="lede">${svc.summary}</p>
      <div style="display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1.5rem;">
        <a class="btn btn--primary" href="../book.html">Book ${svc.title}</a>
        <a class="btn btn--outline" href="tel:${BIZ.phoneRaw}">Call ${BIZ.phone}</a>
      </div>
    </div></section>`,
    `<section><div class="container split">
      <div class="prose">
        <h2>What ${svc.title.toLowerCase()} can help with</h2>
        <ul>${svc.treats.map(t=>`<li>${t}</li>`).join('')}</ul>
        <h2>What to expect</h2>
        <p>Your first appointment is 45 minutes. We take a full case history, examine you carefully, explain what we find in plain English and start treatment in the same session. You'll leave with a clear plan — not a question mark.</p>
        <p>Follow-up sessions are typically 30 minutes and combine hands-on treatment with rehab and self-management strategies. Most patients see meaningful improvement within 2–6 sessions.</p>
        <h2>Why patients choose us</h2>
        <ul>
          <li>Senior, fully-registered clinicians (GOsC, HCPC, CSP)</li>
          <li>No "course of treatment" sales pitch — we treat for as long as you need, no longer</li>
          <li>First appointment free if we don't think we can help</li>
          <li>Direct booking with most major private insurers</li>
          <li>10% Blue Light Card discount</li>
        </ul>
        <blockquote>"Our thing is getting you back doing your thing."</blockquote>
      </div>
      <aside>
        <div class="card">
          <h3>Quick facts</h3>
          <table class="hours" style="margin-top:.5rem;">
            <tr><td>First appointment</td><td>45 mins</td></tr>
            <tr><td>Follow-ups</td><td>30 mins</td></tr>
            <tr><td>Insurer covered</td><td>Yes (most)</td></tr>
            <tr><td>GP referral</td><td>Not needed</td></tr>
            <tr><td>Blue Light Card</td><td>10% off</td></tr>
          </table>
          <a class="btn btn--primary" href="../book.html" style="margin-top:1.5rem;width:100%;justify-content:center;">Book ${svc.title}</a>
        </div>
        <div class="card" style="margin-top:1rem;">
          <h3>Other services</h3>
          <ul style="list-style:none;padding:0;margin:.5rem 0 0;">
            ${SERVICES.filter(o=>o.slug!==svc.slug).map(o=>`<li style="padding:.4rem 0;"><a href="${o.slug}.html">${o.title} →</a></li>`).join('')}
          </ul>
        </div>
      </aside>
    </div></section>`,
    `<section class="bg-soft"><div class="container">
      <div class="section__head section__head--center" style="text-align:center;"><span class="eyebrow">FAQs</span><h2>Common questions</h2></div>
      <div class="prose narrow">
        ${FAQS.map(f=>`<details class="faq__item"><summary>${f.q}</summary><div>${f.a}</div></details>`).join('')}
      </div>
    </div></section>`,
    ctaStrip(p),
    footer(p),
  ].join('');
}

// ----- AREAS HUB -----
function areasHub() {
  const p = '/areas/index.html';
  const title = `Areas We Cover | Osteopathy & Physiotherapy Across Solihull & Birmingham`;
  const desc = `Olton Health & Performance welcomes patients from across Solihull, Birmingham and Warwickshire — Olton, Solihull, Shirley, Knowle, Dorridge, Acocks Green, Sheldon, Hall Green and more.`;
  return [
    head({ path: p, title, description: desc }),
    header(p),
    `<section class="page-head"><div class="container">
      <div class="breadcrumbs"><a href="../">Home</a> / Areas</div>
      <span class="eyebrow">Coverage</span>
      <h1>Easy to reach from across Solihull, Birmingham and beyond.</h1>
      <p class="lede">Our clinic on Kineton Green Road sits at the crossroads of Solihull, Birmingham and the Meriden Gap — easy to reach by car, bus or train. Find your area below.</p>
    </div></section>`,
    `<section><div class="container">
      <div class="area-grid">
        ${AREAS.map(a => `
          <a href="${a.slug}.html"><strong>${a.name}</strong><span>${a.postcode}</span></a>
        `).join('')}
      </div>
    </div></section>`,
    ctaStrip(p),
    footer(p),
  ].join('');
}

// ----- INDIVIDUAL AREA PAGE -----
function areaPage(area) {
  const p = `/areas/${area.slug}.html`;
  const title = `Osteopathy & Physiotherapy in ${area.name} | Olton Health & Performance`;
  const desc = `Looking for an osteopath or physiotherapist in ${area.name} (${area.postcode})? Olton Health & Performance is just ${area.distance} away — evidence-led care since 2014. Book online.`;
  const isHome = area.slug === 'olton';
  return [
    head({ path: p, title, description: desc, schema: {
      "@context":"https://schema.org",
      "@type":"MedicalBusiness",
      "name": `${BIZ.name} — serving ${area.name}`,
      "areaServed": { "@type":"Place", "name": `${area.name}, ${area.postcode}` },
      "address": { "@type":"PostalAddress","streetAddress":"114 Kineton Green Road","addressLocality":"Olton","addressRegion":"Solihull","postalCode":BIZ.postcode,"addressCountry":"GB" },
      "telephone": BIZ.phone,
      "url": `${BIZ.baseUrl}${p}`
    }}),
    header(p),
    `<section class="page-head"><div class="container">
      <div class="breadcrumbs"><a href="../">Home</a> / <a href="./">Areas</a> / ${area.name}</div>
      <span class="eyebrow">${area.postcode} · ${area.distance} away</span>
      <h1>Osteopathy & physiotherapy for ${area.name}.</h1>
      <p class="lede">${isHome ? 'Right in the heart of ' + area.name + '.' : `Trusted, evidence-led musculoskeletal care for ${area.name} residents — just ${area.distance} from your front door.`}</p>
      <div style="display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1.5rem;">
        <a class="btn btn--primary" href="../book.html">Book online</a>
        <a class="btn btn--outline" href="tel:${BIZ.phoneRaw}">Call ${BIZ.phone}</a>
      </div>
    </div></section>`,
    `<section><div class="container split">
      <div class="prose">
        <h2>Why ${area.name} chooses Olton Health</h2>
        <p>${area.notes}</p>
        <p>We've welcomed patients from ${area.name} (${area.postcode}) since opening in 2014. Whether you've been pushed past breaking point at your desk, can't shake a sports injury, or want to stay strong and moving as you get older, we'll work out what's going on and what'll fix it — without keeping you in our diary longer than you need.</p>

        <h2>Services we offer ${area.name} patients</h2>
        <ul>
          ${SERVICES.map(s => `<li><strong><a href="../services/${s.slug}.html">${s.title}</a></strong> — ${s.short}</li>`).join('')}
        </ul>

        <h2>Common ${area.name} patient concerns</h2>
        <ul>
          <li>Office-related back and neck pain</li>
          <li>Sports injuries — running, golf, rugby, tennis, gym</li>
          <li>Post-surgical rehab and return to fitness</li>
          <li>Pregnancy-related musculoskeletal issues</li>
          <li>Pain that's been brushed off elsewhere</li>
        </ul>

        <h2>Getting to us from ${area.name}</h2>
        <p>The clinic is at <strong>114 Kineton Green Road, Olton, Solihull, B92 7EE</strong> — about ${area.distance} from ${area.name}. There's free on-street parking outside, and we're a ten-minute walk from Olton railway station with the A12 bus stopping nearby.</p>

        <blockquote>"Our thing is getting you back doing your thing."</blockquote>
      </div>
      <aside>
        <div class="card">
          <h3>${area.name} at a glance</h3>
          <table class="hours" style="margin-top:.5rem;">
            <tr><td>Postcode</td><td>${area.postcode}</td></tr>
            <tr><td>Distance</td><td>${area.distance}</td></tr>
            <tr><td>Drive time</td><td>~${Math.max(2, parseInt(area.distance)*3)} mins</td></tr>
            <tr><td>Parking</td><td>Free on-street</td></tr>
          </table>
          <a class="btn btn--primary" href="../book.html" style="margin-top:1.5rem;width:100%;justify-content:center;">Book your appointment</a>
        </div>
        <div class="card" style="margin-top:1rem;">
          <h3>Nearby areas we cover</h3>
          <ul style="list-style:none;padding:0;margin:.5rem 0 0;">
            ${AREAS.filter(a=>a.slug!==area.slug).slice(0,8).map(a=>`<li style="padding:.35rem 0;"><a href="${a.slug}.html">${a.name} (${a.postcode}) →</a></li>`).join('')}
          </ul>
        </div>
      </aside>
    </div></section>`,
    ctaStrip(p),
    footer(p),
  ].join('');
}

// ----- CONDITIONS HUB + INDIVIDUAL -----
function conditionsHub() {
  const p = '/conditions/index.html';
  return [
    head({ path: p, title: 'Conditions We Treat | Olton Health & Performance', description: 'Back pain, neck pain, sciatica, sports injuries, knee pain and more — evidence-led musculoskeletal care in Solihull since 2014.' }),
    header(p),
    `<section class="page-head"><div class="container">
      <div class="breadcrumbs"><a href="../">Home</a> / Conditions</div>
      <span class="eyebrow">Conditions</span>
      <h1>What we treat.</h1>
      <p class="lede">Most of what we see is musculoskeletal — back, neck, joints, soft tissue, nerves — and most of it gets better. Here's a snapshot of common reasons people come in.</p>
    </div></section>`,
    `<section><div class="container"><div class="cards">
      ${CONDITIONS.map(c => `<article class="card" data-reveal><h3>${c.title}</h3><p>${c.short}</p><a class="card__link" href="${c.slug}.html">Read more</a></article>`).join('')}
    </div></div></section>`,
    ctaStrip(p),
    footer(p),
  ].join('');
}

const CONDITION_CONTENT = {
  'back-pain': {
    intro: 'Lower back pain is the single most common reason people walk into our clinic — and one of the most treatable. Whether you\'ve woken up locked, you\'ve been nagging at it for years, or it shoots down a leg every time you sit too long, there\'s almost always a clear path back to normal life.',
    sections: [
      ['What causes back pain?', 'Most back pain is mechanical — driven by the way joints, discs, muscles and nerves are loaded and moved. It can be triggered by anything from a heavy deadlift to a long car journey, but it\'s rarely about the trigger itself: it\'s about how your tissues are coping with what you\'re asking them to do.'],
      ['How we treat it', 'Treatment usually combines hands-on osteopathy or physiotherapy to settle the acute pain, gentle movement and rehab to restore confidence, and progressive loading to build resilience. Most patients see meaningful improvement in 2–4 sessions.'],
      ['When to seek urgent care', 'Back pain combined with loss of bladder or bowel control, numbness in the saddle area, or sudden severe weakness in the legs needs urgent A&E assessment. We\'ll always screen for these red flags at your first visit.'],
    ],
  },
  'neck-pain': {
    intro: 'Modern life is hard on necks — long hours at a screen, phones held against shoulders, stress that lives in the trapezius. Neck pain often brings tension headaches, jaw pain or arm symptoms with it, and most of it responds well to a mix of hands-on work and the right movement.',
    sections: [
      ['What causes neck pain?', 'Postural strain, joint restriction, muscle overuse, whiplash, and occasionally disc-related nerve irritation. We work out which is which and treat accordingly.'],
      ['How we treat it', 'Manual therapy to mobilise stiff joints, soft-tissue release for overworked muscles, posture and ergonomic advice, and graded exercise to retrain how you hold yourself.'],
      ['Tension headaches', 'Many "headaches" are actually cervicogenic — coming from the upper neck. Treating the neck often reduces or eliminates the headaches.'],
    ],
  },
  'sciatica': {
    intro: 'True sciatica — pain travelling down the leg from a nerve being irritated in the lower back — sounds dramatic but is usually treatable without surgery or strong painkillers. Most cases improve within 6–12 weeks with the right combination of hands-on care, movement and patience.',
    sections: [
      ['What is sciatica?', 'Pain, pins-and-needles or numbness travelling from the lower back into the buttock, thigh, calf or foot, usually caused by irritation of a lumbar nerve root. It can be sharp, shooting or burning.'],
      ['How we treat it', 'Gentle nerve mobilisation, lumbar joint mobilisation, soft-tissue work for overprotective muscles, and a progressive movement plan you can do at home.'],
      ['What to avoid', 'Bed rest. Sciatica responds far better to gentle, regular movement than to staying still. We\'ll show you exactly what to do.'],
    ],
  },
  'sports-injuries': {
    intro: 'From acute ankle sprains to chronic tendon problems, we treat athletes and active people of all levels — recreational runners, weekend rugby players, lifters, golfers, climbers, fighters. Our team has lived sport: martial arts, MMA, rugby, athletics, climbing.',
    sections: [
      ['Acute injury management', 'Within the first 72 hours we focus on protecting the tissue, reducing pain and starting safe movement. We\'ll diagnose, screen for fracture risk, and refer for imaging if needed.'],
      ['Return-to-play rehab', 'Most reinjuries happen because rehab finished too soon. We progress you through pain-free, then symptom-controlled, then sport-specific loading — so when you return, you stay back.'],
      ['Performance & prehab', 'Strength and conditioning to address the asymmetries and weaknesses that cause injuries in the first place.'],
    ],
  },
  'knee-pain': {
    intro: 'Knees take a beating — from running, kneeling, pivoting and the slow march of arthritis. Most knee pain is treatable without surgery, and even post-op knees benefit hugely from focused rehab.',
    sections: [
      ['Common knee problems', 'Patellofemoral pain (runner\'s knee), ITB syndrome, meniscal irritation, patellar tendinopathy, osteoarthritis, ACL/MCL recovery.'],
      ['How we treat it', 'Manual therapy to restore movement, soft-tissue work for tight quads and ITB, and — most importantly — strength work for hips, glutes and quads. Knees rarely get better without strength.'],
      ['Surgical recovery', 'We work alongside surgeons across Birmingham private and NHS to support post-op recovery from knee replacements and arthroscopies.'],
    ],
  },
  'shoulder-pain': {
    intro: 'Shoulders are the most mobile joints in the body — and the most easily upset. Rotator cuff problems, frozen shoulder and impingement are common in over-40s, swimmers, climbers and desk workers.',
    sections: [
      ['Rotator cuff problems', 'Pain on lifting the arm, weakness, night pain. Usually responds well to graded loading combined with hands-on work — surgery is rarely needed.'],
      ['Frozen shoulder', 'A frustrating condition with three phases. We help you move through them faster with manual therapy, gentle stretching and acupuncture.'],
      ['Impingement', 'Pain in the outer shoulder when reaching overhead. We work on shoulder blade control, rotator cuff strength and posture.'],
    ],
  },
};

function conditionPage(c) {
  const content = CONDITION_CONTENT[c.slug];
  const p = `/conditions/${c.slug}.html`;
  return [
    head({ path: p, title: `${c.title} Treatment in Solihull | Olton Health & Performance`, description: `Evidence-led ${c.title.toLowerCase()} treatment in Solihull. Hands-on osteopathy, physiotherapy and rehab — first appointment free if we can't help.` }),
    header(p),
    `<section class="page-head"><div class="container">
      <div class="breadcrumbs"><a href="../">Home</a> / <a href="./">Conditions</a> / ${c.title}</div>
      <span class="eyebrow">${c.title}</span>
      <h1>${c.title} treatment, done properly.</h1>
      <p class="lede">${content.intro}</p>
      <div style="display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1.5rem;">
        <a class="btn btn--primary" href="../book.html">Book online</a>
        <a class="btn btn--outline" href="tel:${BIZ.phoneRaw}">Call ${BIZ.phone}</a>
      </div>
    </div></section>`,
    `<section><div class="container split">
      <div class="prose">
        ${content.sections.map(([h,p])=>`<h2>${h}</h2><p>${p}</p>`).join('')}
        <blockquote>If we don't think we can help, your first appointment is on us.</blockquote>
      </div>
      <aside>
        <div class="card">
          <h3>How we treat ${c.title.toLowerCase()}</h3>
          <ul style="padding-left:1.2rem;margin:.5rem 0 1rem;">
            ${SERVICES.slice(0,5).map(s=>`<li style="margin-bottom:.4rem;"><a href="../services/${s.slug}.html">${s.title}</a></li>`).join('')}
          </ul>
          <a class="btn btn--primary" href="../book.html" style="width:100%;justify-content:center;">Book online</a>
        </div>
      </aside>
    </div></section>`,
    ctaStrip(p),
    footer(p),
  ].join('');
}

// ----- ABOUT -----
function aboutPage() {
  const p = '/about.html';
  return [
    head({ path: p, title: 'About Us | Olton Health & Performance, Solihull', description: 'Olton Health & Performance has been helping people across Solihull and Birmingham move better since 2014. Meet our team and learn about our approach.' }),
    header(p),
    `<section class="page-head"><div class="container">
      <div class="breadcrumbs"><a href="./">Home</a> / About</div>
      <span class="eyebrow">Established 2014</span>
      <h1>Our thing is getting you back doing yours.</h1>
      <p class="lede">A small, senior team of osteopaths, physiotherapists and coaches running a busy clinic in Olton, Solihull. No upselling, no endless treatment plans — just honest, evidence-led care.</p>
    </div></section>`,
    `<section><div class="container split">
      <div class="prose">
        <h2>Our approach</h2>
        <p>We opened Olton Health & Performance in 2014 with a simple idea: most musculoskeletal problems get better, and the patient's job is to get on with their life — not visit us forever.</p>
        <p>That belief shapes everything we do. We screen carefully at the first visit. We tell you honestly whether we think we can help — if we can't, that visit is free. We treat for as long as you actually need treatment, and not a session longer.</p>
        <h2>What makes us different</h2>
        <ul>
          <li>Senior, experienced clinicians only — no junior practitioners</li>
          <li>Six interconnected disciplines under one roof</li>
          <li>An on-site rehab gym for strength and conditioning</li>
          <li>Full registration with GOsC, HCPC, CSP, AACP, iO, College of Osteopaths and Solihull Council</li>
          <li>Direct billing with most major private medical insurers</li>
        </ul>
        <h2>Who we treat</h2>
        <p>Anyone with a musculoskeletal problem — from elite athletes to retirees, from new mums to teenagers, from desk-bound coders to manual labourers. We've seen it all, and we treat each person as an individual.</p>
      </div>
      <aside>
        <img src="assets/images/clinic-2.png" alt="Olton Health & Performance clinic interior" style="border-radius:var(--radius);box-shadow:var(--shadow-md);">
        <div class="card" style="margin-top:1rem;">
          <h3>Visit us</h3>
          <p style="margin:0;">${BIZ.addressLines.join('<br>')}</p>
          <p style="margin-top:.75rem;"><a href="tel:${BIZ.phoneRaw}">${BIZ.phone}</a></p>
        </div>
      </aside>
    </div></section>`,
    ctaStrip(p),
    footer(p),
  ].join('');
}

// ----- TEAM -----
function teamPage() {
  const p = '/team.html';
  return [
    head({ path: p, title: 'Meet the Team | Olton Health & Performance', description: 'Meet the senior osteopaths, physiotherapists and coaches at Olton Health & Performance — Rosi Sexton, Rhiannon Needham, Kruti Kulkarni, Matt Thorp.' }),
    header(p),
    `<section class="page-head"><div class="container">
      <div class="breadcrumbs"><a href="./">Home</a> / Team</div>
      <span class="eyebrow">Our team</span>
      <h1>Senior clinicians. Real-world experience.</h1>
      <p class="lede">Every member of our team is a fully-qualified, registered clinician with significant clinical experience and a personal stake in keeping people moving.</p>
    </div></section>`,
    `<section><div class="container">
      <div class="team">
        ${TEAM.map(m => `
          <article class="team__card" data-reveal>
            <h3>${m.name}</h3>
            <div class="team__role">${m.role}</div>
            <p class="team__bio">${m.bio}</p>
          </article>`).join('')}
      </div>
    </div></section>`,
    ctaStrip(p),
    footer(p),
  ].join('');
}

// ----- CONTACT -----
function contactPage() {
  const p = '/contact.html';
  return [
    head({ path: p, title: 'Contact & Visit Us | Olton Health & Performance, Solihull', description: 'Contact Olton Health & Performance — 114 Kineton Green Road, Olton, Solihull, B92 7EE. Call 0121 314 0666 or book online.' }),
    header(p),
    `<section class="page-head"><div class="container">
      <div class="breadcrumbs"><a href="./">Home</a> / Contact</div>
      <span class="eyebrow">Get in touch</span>
      <h1>Visit us, call us, or send a message.</h1>
      <p class="lede">We're at 114 Kineton Green Road in Olton, Solihull — easy to reach by car, bus or train. Plenty of free parking on the street.</p>
    </div></section>`,
    `<section><div class="container">
      <div class="contact-grid">
        <div class="contact-info">
          <dl>
            <dt>Phone</dt><dd><a href="tel:${BIZ.phoneRaw}">${BIZ.phone}</a></dd>
            <dt>Email</dt><dd><a href="mailto:${BIZ.email}">${BIZ.email}</a></dd>
            <dt>Address</dt><dd>${BIZ.addressLines.join('<br>')}</dd>
            <dt>Opening hours</dt>
            <dd><table class="hours">${BIZ.hours.map(([d,h])=>`<tr><td>${d}</td><td>${h}</td></tr>`).join('')}</table></dd>
            <dt>Parking</dt><dd>Free on-street parking on Kineton Green Road and adjoining streets.</dd>
            <dt>Public transport</dt><dd>Olton railway station: 10-minute walk. A12 bus (Solihull–Acocks Green): nearest stops Gunns Way (NB) / Raddington Drive (SB).</dd>
          </dl>
        </div>
        <form class="form" action="https://formspree.io/f/your-form-id" method="POST">
          <div class="row"><label for="name">Your name</label><input id="name" name="name" required></div>
          <div class="row"><label for="email">Email</label><input id="email" type="email" name="email" required></div>
          <div class="row"><label for="phone">Phone</label><input id="phone" name="phone"></div>
          <div class="row"><label for="service">Service</label>
            <select id="service" name="service">
              <option>I'm not sure</option>
              ${SERVICES.map(s=>`<option>${s.title}</option>`).join('')}
            </select>
          </div>
          <div class="row"><label for="msg">How can we help?</label><textarea id="msg" name="message"></textarea></div>
          <button class="btn btn--primary" type="submit">Send message</button>
        </form>
      </div>
    </div></section>`,
    `<section><div class="container">
      <div class="map">
        <iframe loading="lazy" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2433.8!2d-1.7758!3d52.4444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDI2JzM5LjgiTiAxwrA0NicyNy4wIlc!5e0!3m2!1sen!2suk!4v1700000000" allowfullscreen referrerpolicy="no-referrer-when-downgrade" title="Map to Olton Health"></iframe>
      </div>
    </div></section>`,
    footer(p),
  ].join('');
}

// ----- BOOK -----
function bookPage() {
  const p = '/book.html';
  return [
    head({ path: p, title: 'Book Online | Olton Health & Performance, Solihull', description: 'Book your appointment online with Olton Health & Performance in Solihull — osteopathy, physiotherapy, sports massage, acupuncture, Pilates.' }),
    header(p),
    `<section class="page-head"><div class="container">
      <div class="breadcrumbs"><a href="./">Home</a> / Book</div>
      <span class="eyebrow">Book online</span>
      <h1>Book your appointment in 60 seconds.</h1>
      <p class="lede">New patient? Book a 45-minute initial consultation. Returning? Choose your clinician below — most weeks we have appointments available within 1–3 working days.</p>
    </div></section>`,
    `<section><div class="container split">
      <div class="prose">
        <h2>Three ways to book</h2>
        <h3>1. Online</h3>
        <p>Click below to open our live booking system. Choose service, clinician, date and time.</p>
        <p><a class="btn btn--primary" href="${BIZ.bookUrl}" target="_blank" rel="noopener">Open booking system →</a></p>
        <h3>2. Phone</h3>
        <p>Call <a href="tel:${BIZ.phoneRaw}">${BIZ.phone}</a> during opening hours. Voicemail outside hours — we always call back.</p>
        <h3>3. Email</h3>
        <p>Email <a href="mailto:${BIZ.email}">${BIZ.email}</a> with your preferred service and times.</p>

        <h2>What you'll need</h2>
        <ul>
          <li>For private health insurance: authorisation code + membership number</li>
          <li>For Blue Light Card 10% discount: your card number</li>
          <li>Comfortable clothing you can move in</li>
        </ul>
      </div>
      <aside>
        <div class="card">
          <h3>First-time visitor?</h3>
          <p>Initial appointments are 45 minutes and cover full case history, examination, explanation and treatment.</p>
          <p><strong>If we don't think we can help, your first appointment is free.</strong></p>
          <a class="btn btn--secondary" href="${BIZ.bookUrl}" target="_blank" rel="noopener" style="width:100%;justify-content:center;margin-top:.5rem;">Book initial appointment</a>
        </div>
        <div class="card" style="margin-top:1rem;">
          <h3>Insurers we work with</h3>
          <p style="font-size:.95rem;color:var(--muted);">AXA · Aviva · Vitality · WPA · Bupa · Cigna · Simplyhealth · and more.</p>
        </div>
      </aside>
    </div></section>`,
    ctaStrip(p),
    footer(p),
  ].join('');
}

// ----- TESTIMONIALS -----
function testimonialsPage() {
  const p = '/testimonials.html';
  const items = [
    ['James T.','Solihull · Lower back pain',"I'd been struggling with lower back pain for over a year. Within three sessions I was back at the gym, and Rosi gave me the rehab work to keep it that way. Honest, evidence-based and never strung me along."],
    ['Sarah W.','Knowle · Runner\'s knee','After my marathon training started causing knee pain, the team got to the root of it quickly. Combined sports massage and rehab — I finished my race pain-free.'],
    ['Rachel M.','Shirley · Chronic neck pain',"I'd tried physiotherapy elsewhere with no real improvement. The clinical Pilates here was a game changer for my chronic neck pain. I really felt heard."],
    ['David L.','Dorridge · Sciatica',"Sciatica had me sleeping on the floor. After six visits I was back hill-walking. The exercises they gave me have kept it away ever since."],
    ['Liz P.','Acocks Green · Frozen shoulder','Patient, professional and properly knowledgeable. They explained exactly what was going on and made sense of it.'],
    ['Mark D.','Hall Green · Sports injury','Rugby pre-season collision. The team had me back in training inside four weeks. Top class.'],
    ['Helen S.','Olton · Post-natal','Found Olton Health after my second child. Pelvic floor and back pain — both better in weeks. Couldn\'t recommend more.'],
    ['Tom R.','Sheldon · Tendon pain','Stubborn Achilles tendon pain — treated properly with progressive loading rather than just rest. Finally fixed it.'],
    ['Naseem K.','Yardley · Tension headaches','Headaches had been ruining my work. Treating my neck was the answer. Wish I\'d come sooner.'],
  ];
  return [
    head({ path: p, title: 'Patient Testimonials | Olton Health & Performance', description: '100% recommended on Facebook with 22 reviews. Read patient stories from across Solihull, Knowle, Dorridge, Shirley and beyond.' }),
    header(p),
    `<section class="page-head"><div class="container">
      <div class="breadcrumbs"><a href="./">Home</a> / Testimonials</div>
      <span class="eyebrow">Patient stories</span>
      <h1>Real people. Real outcomes.</h1>
      <p class="lede">A selection of feedback from people we've worked with since 2014. We're proud of a 100% recommended rating across 22 Facebook reviews.</p>
    </div></section>`,
    `<section><div class="container">
      <div class="testimonials">
        ${items.map(([n,s,t])=>`<div class="testimonial" data-reveal><p>${t}</p><cite>${n}<span>${s}</span></cite></div>`).join('')}
      </div>
      <p style="margin-top:2rem;text-align:center;">Been treated by us? <a href="${BIZ.reviewUrl}" target="_blank" rel="noopener">Leave us a review →</a></p>
    </div></section>`,
    ctaStrip(p),
    footer(p),
  ].join('');
}

// ----- FAQs -----
function faqsPage() {
  const p = '/faqs.html';
  return [
    head({ path: p, title: 'FAQs | Olton Health & Performance', description: 'Answers to common questions about osteopathy, physiotherapy, insurance, booking, and what to expect at Olton Health & Performance.', schema: {
      "@context":"https://schema.org",
      "@type":"FAQPage",
      "mainEntity": FAQS.map(f=>({ "@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))
    }}),
    header(p),
    `<section class="page-head"><div class="container">
      <div class="breadcrumbs"><a href="./">Home</a> / FAQs</div>
      <span class="eyebrow">FAQs</span>
      <h1>Common questions, clearly answered.</h1>
      <p class="lede">Anything we haven't covered? Call us on <a href="tel:${BIZ.phoneRaw}">${BIZ.phone}</a> — we're happy to help.</p>
    </div></section>`,
    `<section><div class="container narrow prose">
      ${FAQS.map(f=>`<details class="faq__item"><summary>${f.q}</summary><div>${f.a}</div></details>`).join('')}
    </div></section>`,
    ctaStrip(p),
    footer(p),
  ].join('');
}

// ----- PRIVACY -----
function privacyPage() {
  const p = '/privacy.html';
  return [
    head({ path: p, title: 'Privacy Policy | Olton Health & Performance', description: 'Privacy and data protection policy for Olton Health & Performance.' }),
    header(p),
    `<section class="page-head"><div class="container"><h1>Privacy Policy</h1></div></section>
    <section><div class="container narrow prose">
      <p>Olton Health & Performance is committed to protecting your personal data. As a healthcare provider we handle sensitive personal data under the UK GDPR and the Data Protection Act 2018.</p>
      <h2>What we collect</h2><p>Contact details, medical history, treatment records, payment information and (where applicable) insurance details.</p>
      <h2>How we use it</h2><p>To deliver and document your care, communicate with you, process payments, work with insurers and meet our legal obligations as registered healthcare professionals.</p>
      <h2>How we store it</h2><p>Medical records are stored securely in our HIPAA/GDPR-compliant clinical software. Paper records are kept in locked filing cabinets on premises.</p>
      <h2>Your rights</h2><p>You have the right to access, correct, restrict, port or (in some cases) delete your data. Contact <a href="mailto:${BIZ.email}">${BIZ.email}</a> to exercise any of these.</p>
      <h2>Cookies</h2><p>This site uses essential cookies only. We do not run advertising trackers.</p>
      <h2>Contact</h2><p>For data protection queries: <a href="mailto:${BIZ.email}">${BIZ.email}</a> · ${BIZ.phone} · ${BIZ.address}</p>
    </div></section>`,
    footer(p),
  ].join('');
}

// ----- 404 -----
function notFound() {
  const p = '/404.html';
  return [
    head({ path: p, title: 'Page Not Found | Olton Health & Performance', description: 'Page not found.' }),
    header(p),
    `<section class="page-head"><div class="container text-center">
      <h1 style="margin-inline:auto;">404 — Page not found.</h1>
      <p class="lede" style="margin-inline:auto;">The page you wanted has moved or no longer exists. Try our <a href="/">homepage</a>, <a href="/services/">services</a> or <a href="/contact.html">contact us</a>.</p>
    </div></section>`,
    footer(p),
  ].join('');
}

// ----- SITEMAP & ROBOTS -----
function sitemap() {
  const urls = [
    '/', '/about.html','/team.html','/contact.html','/book.html','/testimonials.html','/faqs.html','/privacy.html',
    '/services/',
    ...SERVICES.map(s=>`/services/${s.slug}.html`),
    '/areas/',
    ...AREAS.map(a=>`/areas/${a.slug}.html`),
    '/conditions/',
    ...CONDITIONS.map(c=>`/conditions/${c.slug}.html`),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u=>`<url><loc>${BIZ.baseUrl}${u}</loc><changefreq>monthly</changefreq><priority>${u==='/' ? '1.0' : '0.7'}</priority></url>`).join('\n')}
</urlset>`;
}

function robots() {
  return `User-agent: *
Allow: /
Sitemap: ${BIZ.baseUrl}/sitemap.xml`;
}

// ===== BUILD =====
console.log('Building site…');
write('index.html', homePage());
write('about.html', aboutPage());
write('team.html', teamPage());
write('contact.html', contactPage());
write('book.html', bookPage());
write('testimonials.html', testimonialsPage());
write('faqs.html', faqsPage());
write('privacy.html', privacyPage());
write('404.html', notFound());
write('services/index.html', servicesHub());
SERVICES.forEach(s => write(`services/${s.slug}.html`, servicePage(s)));
write('areas/index.html', areasHub());
AREAS.forEach(a => write(`areas/${a.slug}.html`, areaPage(a)));
write('conditions/index.html', conditionsHub());
CONDITIONS.forEach(c => write(`conditions/${c.slug}.html`, conditionPage(c)));
write('sitemap.xml', sitemap());
write('robots.txt', robots());
console.log(`\nDone. Built ${1 + 8 + 1 + SERVICES.length + 1 + AREAS.length + 1 + CONDITIONS.length} HTML pages.`);
