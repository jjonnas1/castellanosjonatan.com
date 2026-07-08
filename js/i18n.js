/* ==========================================================
   i18n — Español (por defecto en países hispanohablantes)
   e inglés para el resto del mundo. El español se captura
   del propio HTML; aquí solo vive el diccionario en inglés.
   ========================================================== */

(function () {
  const WA_NUMBER = '573148309306';

  const WA_MESSAGES = {
    es: {
      general: 'Hola, quiero información sobre las clases y/o los materiales. 😊',
      clases: 'Hola, quiero clases particulares 1:1 de inglés o español. ¿Me das info de horarios, precios y niveles? 😊',
      ingles: 'Hola, quiero clases particulares de inglés. ¿Agendamos el diagnóstico gratuito? 😊',
      espanol: 'Hola, quiero clases particulares de español. ¿Agendamos el diagnóstico gratuito? 😊',
      solo: 'Hola, quiero clases individuales (USD 22/hora). ¿Agendamos mi diagnóstico gratis? 😊',
      duo: 'Hola, quiero clases en pareja (USD 20/hora cada uno). ¿Me das info? 😊',
      trio: 'Hola, quiero clases en grupo de 3 (USD 18/hora cada uno). ¿Me das info? 😊',
      profe: 'Hola, soy profe. ¿Me recomiendas el pack ideal según el idioma que enseño? 😊'
    },
    en: {
      general: "Hi! I'd like info about your classes and/or teaching materials. 😊",
      clases: "Hi! I'm interested in 1:1 English or Spanish classes. Could you share schedules, prices and levels? 😊",
      ingles: "Hi! I want private English classes. Can we schedule the free level check? 😊",
      espanol: "Hi! I want private Spanish classes. Can we schedule the free level check? 😊",
      solo: 'Hi! I want individual classes (USD 22/hour). Can we schedule my free level check? 😊',
      duo: 'Hi! We are 2 students (USD 20/hour each). Could you share more info? 😊',
      trio: 'Hi! We are a group of 3 (USD 18/hour each). Could you share more info? 😊',
      profe: "Hi! I'm a teacher. Which pack do you recommend for the language I teach? 😊"
    }
  };

  const EN = {
    brand_tag: 'Language Teacher',
    nav_clases: '1:1 Classes',
    nav_precios: 'Pricing',
    nav_packs: 'Teacher Shop',
    nav_sobre: 'About me',
    nav_test: 'Level Test',
    nav_cta: 'Say hi 👋',

    hero_eyebrow: 'Spots open · 1:1 online classes',
    hero_t1: 'Speak',
    hero_t2: 'with confidence.',
    hero_desc: "I'm <strong>Jonatan Castellanos</strong> and I've spent 16 years making languages finally make sense. 1:1 online <strong>English</strong> and <strong>Spanish</strong> classes that feel like a conversation, not homework.",
    hero_cta1: 'Start on WhatsApp',
    hero_cta2: 'See pricing →',
    stat_1: 'years teaching',
    stat_2: 'USD, from (groups)',
    stat_3: 'students per class',
    stat_4: 'response time',

    chat_name: 'Jonatan · Teacher',
    chat_online: 'online',
    chat_m0: 'Hi Jonatan 👋 I need Spanish for my new job in Bogotá…',
    chat_m1: "Perfect! We'll start with a free level check and build your plan with weekly goals 🎯",
    chat_m2: '¡Genial! ¿Cuándo empezamos? 😄',
    chat_m3: "That's the spirit! 🚀 This very week.",
    chat_placeholder: 'Type a message…',
    chip_es: '🇪🇸 Spanish for foreigners',
    chip_packs: '📚 Packs for teachers',

    rb_1: 'Speak with confidence',
    rb_2: 'Private 1:1 classes',
    rb_3: 'From 18 USD/hour',
    rb_4: 'Communicative method',
    rb_5: 'PayPal payments',

    clases_kicker: 'The method',
    clases_h2: '1:1 classes that <span class="hl hl-yellow">actually work</span>',
    clases_lead: 'No endless verb lists. An initial level check, weekly goals and real conversation from day one. Online, flexible schedules, solo or with up to 2 friends.',
    tab_en: '🇬🇧 English',
    tab_es: '🇪🇸 Spanish',

    pen_badge: 'A1 → B1 progression · CEFR',
    pen_h3: 'English people will notice',
    pen_p: 'A communicative approach with simple explanations and guided practice. You speak from the very first class — not "someday when you\'re ready".',
    pen_l1: 'Communicative approach + functional grammar',
    pen_l2: 'Instant correction with EN/ES comparative explanations',
    pen_l3: 'Clearer, more natural pronunciation',
    pen_l4: 'More fluency and confidence when speaking',
    pen_l5: 'Prep for interviews, exams or travel',
    pen_cta: 'Get my free level check →',

    pes_badge: 'Spanish · All levels',
    pes_h3: 'Spanish for real life',
    pes_p: 'Spanish as a foreign language with a clear, communicative method. Personalized sessions for academic, professional or travel goals.',
    pes_l1: 'Dynamic activities adapted to your level',
    pes_l2: 'Understand key structures without memorizing',
    pes_l3: 'Visual, practical, reusable material',
    pes_l4: 'A clear plan with weekly goals',
    pes_l5: 'Active conversation from the first class',
    pes_cta: 'Get my free level check →',

    step1_t: 'Level X-ray',
    step1_p: 'Free level check: we know exactly where you start.',
    step2_t: 'Your flight plan',
    step2_p: 'Clear weekly goals: you know what you practice and why.',
    step3_t: 'Visible take-off',
    step3_p: 'Concrete feedback every session. You notice it — and so does everyone else.',

    pr_kicker: 'Clear pricing',
    pr_h2: 'Invest in your <span class="hl hl-coral">fluency</span>',
    pr_lead: 'No enrollment fees, no surprises: you pay per hour via PayPal. Bring a friend (or two) and everyone saves. Maximum 3 students per class.',
    pr1_badge: '★ Most popular',
    pr1_name: 'Just you',
    pr1_unit: 'USD / hour',
    pr1_sub: '1 student · 100% of the attention on you',
    pr1_f1: 'A plan fully tailored to you',
    pr1_f2: 'All the speaking time is yours',
    pr1_f3: 'Flexible schedules',
    pr1_cta: 'Start solo →',
    pr2_name: 'With a friend',
    pr2_unit: 'USD / hour <em>each</em>',
    pr2_sub: '2 students · learn together',
    pr2_f1: 'Practice real conversation in pairs',
    pr2_f2: 'Same plan, lower cost',
    pr2_f3: 'Great for couples and coworkers',
    pr2_cta: 'Come as two →',
    pr3_name: 'Mini-group',
    pr3_unit: 'USD / hour <em>each</em>',
    pr3_sub: '3 students · the maximum',
    pr3_f1: 'The most affordable rate',
    pr3_f2: 'Group games and dynamics',
    pr3_f3: 'Closed group: just the 3 of you',
    pr3_cta: 'Build my group →',
    pr_note: '💳 International payments via <strong>PayPal</strong> · Your first level-check conversation is <strong>free</strong>.',

    pk_kicker: 'Teaching Materials · The Teacher Shop',
    pk_h2: 'Do you teach languages? <span class="hl hl-coral">Prep less</span>',
    pk_lead: 'Besides my classes, I create PDF packs for fellow teachers: clear structure, CEFR-aligned communicative approach and teaching guides included. Secure checkout via Hotmart, instant delivery.',
    f_all: 'All',
    f_en: 'I teach English',
    f_fr: 'I teach French',
    f_es: 'I teach Spanish',
    f_gr: 'Grammar',

    pd_cta: 'I want it →',
    pd1_hook: 'Your complete English course, solved.',
    pd1_p: '100+ activities, grammar explanations and visual material ready for your groups.',
    pd1_t1: '+100 activities',
    pd1_t2: 'Teaching guide',
    pd1_t3: 'Visual material',
    pd2_hook: 'Complete sequences, zero improvising.',
    pd2_p: 'Full A1–A2 (CEFR) teaching sequences with a communicative approach and clear grammar for French teachers.',
    pd2_t1: 'Complete sequences',
    pd2_t3: 'Visual grammar',
    pd3_p: 'Progressive content, directly usable in class, with instructions in French.',
    pd4_hook: 'Bilingual Spanish, ready for Monday.',
    pd4_p: 'Bilingual (EN/ES) material with cultural activities and complete lesson plans.',
    pd4_t1: 'Bilingual EN/ES',
    pd4_t2: 'Lesson plans',
    pd4_t3: 'Culture',
    pd5_badge: '★ Most complete',
    pd5_tag: 'Total Grammar',
    pd5_hook: 'Grammar, mastered once and for all.',
    pd5_p: 'A complete course with clear explanations, total structure and organized material.',
    pd5_t1: 'Total structure',
    pd5_t2: 'Clear explanations',
    pd5_t3: 'Organized material',
    pdh_tag: 'Not sure which one?',
    pdh_h3: "I'll help you decide",
    pdh_p: "Message me on WhatsApp and I'll recommend the ideal pack for the language you teach, your level and your class type. No strings attached.",
    pdh_cta: 'Ask me for free',

    perk1_t: 'Instant delivery',
    perk1_s: 'Automatic download after Hotmart checkout',
    perk2_t: '7-day guarantee',
    perk2_s: "Full refund if it's not for you",
    perk3_t: 'Lifetime access',
    perk3_s: 'Updates included at no extra cost',
    perk4_t: 'Teacher community',
    perk4_s: 'WhatsApp group with free weekly sessions',
    sm_h3: '🎁 Try it free first',
    sm_p: 'Download a free sample (3 activities + guide) and check the quality of the material before buying.',
    sm_cta: 'Get my free sample',

    cred1: '🎓 Degree in modern languages',
    cred2: '⚖️ Lawyer',
    cred3: '🗣️ Specialist in communicative methodologies and CEFR',
    ab_kicker: "Hi, I'm Jonatan 👋",
    ab_h2: '16 years making languages <span class="hl hl-mint">make sense</span>',
    ab_p1: 'A teacher who\'s also a lawyer? You read that right 😄. I hold <strong>degrees in modern languages and law</strong>, and that mix shaped the way I teach: a jurist\'s clarity and structure, with the passion of a teacher who\'s spent 16 years making languages finally make sense.',
    ab_p2: 'My priority is <strong>1:1 classes</strong>: structured, progressive, human sessions where you speak from day one. And for my fellow teachers I created <strong>Teaching Materials</strong> — the packs I wish I had when I started.',
    portrait_chip: '⚖️ Lawyer & 🎓 Language teacher',
    ab_quote: "«You don't memorize a language: you live it, speak it and enjoy it.»",

    ab_lawyer: '⚖️ What if what you need isn\'t a language but a lawyer in Colombia? Objection sustained — I\'ve got you covered too: <a href="https://jonatancastellanosabogado.com" target="_blank" rel="noopener noreferrer">jonatancastellanosabogado.com</a> 😉',

    qp_kicker: 'Free · 5 minutes',
    qp_h2: "What's your real level?",
    qp_lead: 'Answer 20 questions and discover your CEFR level (A1–B2) instantly, with a class recommendation made for you.',
    qp_test_en: 'Test my English',
    qp_test_es: 'Test my Spanish',

    ts_kicker: 'Testimonials',
    ts_h2: 'People already <span class="hl hl-yellow">breathing easy</span>',
    ts1_p: '"The level of detail in the teaching guides is impressive. It gave me back the joy of teaching without the stress of planning."',
    ts3_p: '"Aesthetically flawless and pedagogically solid material. An investment that pays for itself in the first week."',
    ts3_role: 'Spanish Teacher',

    fq_kicker: 'Quick answers',
    fq_h2: 'What everyone <span class="hl hl-sky">asks</span>',
    fq1_q: 'How much do 1:1 classes cost?',
    fq1_a: 'USD $22 per hour if you come solo, $20 per hour each for 2 students, and $18 per hour each for 3 (the maximum per group). Payments via PayPal, and the initial level-check conversation is free.',
    fq2_q: 'How do I book my first class?',
    fq2_a: "Message me on WhatsApp. I'll share levels, available schedules and a recommended path for your goal, and we'll book your free level check.",
    fq3_q: 'Are the teacher packs a video course?',
    fq3_a: 'No. They are professional teaching resources (PDFs and editable files) designed for you, as a teacher, to use directly in your classes with your students.',
    fq4_q: 'How do I receive the material after buying?',
    fq4_a: "Delivery is digital and instant. After secure checkout on Hotmart, you'll get access to a download area with all the pack's files.",
    fq5_q: "Can I get a refund if a pack isn't for me?",
    fq5_a: "Yes. Hotmart offers a 7-day satisfaction guarantee. If the material doesn't meet your expectations, you can request a full refund within that period.",
    fq6_q: 'What format does the material come in?',
    fq6_a: 'Mostly PDF (ready to use) and some editable files (Word, PowerPoint). Compatible with Windows, Mac and Linux, for online or in-person classes.',

    ct_kicker: 'Contact',
    ct_h2: "Your Spanish won't<br>learn <em>itself</em>.",
    ct_lead: "Message me today and we'll book your free level check. I reply within 24 hours (business days).",
    ct_cta1: 'WhatsApp me',
    ft_rights: 'All rights reserved.',
    ft_legal: 'Privacy, Terms & Cookies'
  };

  const META = {
    es: {
      title: 'Clases de Inglés y Español Online 1:1 | Jonatan Castellanos',
      desc: 'Clases particulares de inglés y español online desde 18 USD/hora, con profesor de 16 años de experiencia. Diagnóstico gratis por WhatsApp y packs en PDF para profesores de idiomas.'
    },
    en: {
      title: 'Online English & Spanish Classes 1:1 | Jonatan Castellanos',
      desc: 'Private online English and Spanish classes from 18 USD/hour with a teacher with 16 years of experience. Free level check via WhatsApp and PDF packs for teachers.'
    }
  };

  const ROTATOR_WORDS = {
    es: ['inglés', 'English', 'español', 'como local'],
    en: ['Spanish', 'español', 'English', 'like a local']
  };

  const SAMPLE_MAILTO = {
    es: 'mailto:business@castellanosjonatan.com?subject=' + encodeURIComponent('Solicitud de muestra gratuita (Teaching Materials)') + '&body=' + encodeURIComponent('Hola, quiero recibir la muestra gratuita de Teaching Materials. ¡Gracias!'),
    en: 'mailto:business@castellanosjonatan.com?subject=' + encodeURIComponent('Free sample request (Teaching Materials)') + '&body=' + encodeURIComponent('Hi! I would like to receive the free Teaching Materials sample. Thanks!')
  };

  // Captura el español original del HTML como diccionario base
  const ES = {};
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!(key in ES)) ES[key] = el.innerHTML;
  });

  const DICTS = { es: ES, en: EN };

  function detectLang() {
    const saved = localStorage.getItem('lang');
    if (saved === 'es' || saved === 'en') return saved;
    const langs = navigator.languages || [navigator.language || 'en'];
    return langs.some((l) => String(l).toLowerCase().startsWith('es')) ? 'es' : 'en';
  }

  let current = 'es';

  function apply(lang) {
    current = lang;
    const dict = DICTS[lang];

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const html = dict[el.dataset.i18n];
      if (html !== undefined) el.innerHTML = html;
    });

    document.querySelectorAll('[data-wa]').forEach((el) => {
      const msg = WA_MESSAGES[lang][el.dataset.wa] || WA_MESSAGES[lang].general;
      el.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
    });

    const sample = document.getElementById('sampleMail');
    if (sample) sample.href = SAMPLE_MAILTO[lang];

    document.documentElement.lang = lang;
    if (!document.body.hasAttribute('data-static-meta')) {
      document.title = META[lang].title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', META[lang].desc);
    }

    const toggle = document.getElementById('langToggle');
    if (toggle) toggle.textContent = lang === 'es' ? 'EN' : 'ES';
  }

  function toggle() {
    const next = current === 'es' ? 'en' : 'es';
    localStorage.setItem('lang', next);
    apply(next);
  }

  window.I18N = {
    get lang() { return current; },
    words() { return ROTATOR_WORDS[current]; },
    apply,
    toggle
  };

  apply(detectLang());

  const toggleBtn = document.getElementById('langToggle');
  if (toggleBtn) toggleBtn.addEventListener('click', toggle);
})();
