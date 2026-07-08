/* ==========================================================
   Test de nivel — lógica de la app
   ========================================================== */

function trackWa(source) {
  if (typeof gtag === 'function') {
    gtag('event', 'whatsapp_click', { source });
    gtag('event', 'conversion', { send_to: WA_CONVERSION_ID });
  }
}

const state = {
  lang: null,
  index: 0,
  answers: [],
  selected: null
};

const els = {
  intro: document.getElementById('quizIntro'),
  play: document.getElementById('quizPlay'),
  gate: document.getElementById('quizGate'),
  result: document.getElementById('quizResult'),
  progressFill: document.getElementById('progressFill'),
  progressLabel: document.getElementById('progressLabel'),
  questionPrompt: document.getElementById('questionPrompt'),
  optionsList: document.getElementById('optionsList'),
  nextBtn: document.getElementById('nextBtn'),
  prevBtn: document.getElementById('prevBtn'),
  quizInstruction: document.getElementById('quizInstruction'),
  gateTitle: document.getElementById('gateTitle'),
  gateForm: document.getElementById('gateForm'),
  nameLabel: document.getElementById('nameLabel'),
  emailLabel: document.getElementById('emailLabel'),
  waLabel: document.getElementById('waLabel'),
  consentText: document.getElementById('consentText'),
  gateSubmit: document.getElementById('gateSubmit'),
  gateError: document.getElementById('gateError'),
  resultKicker: document.getElementById('resultKicker'),
  resultBadge: document.getElementById('resultBadge'),
  resultTitle: document.getElementById('resultTitle'),
  resultText: document.getElementById('resultText'),
  resultScore: document.getElementById('resultScore'),
  resultWa: document.getElementById('resultWa'),
  resultRestart: document.getElementById('resultRestart')
};

function showSection(section) {
  [els.intro, els.play, els.gate, els.result].forEach((s) => s.hidden = s !== section);
  window.scrollTo({ top: els.intro.closest('.quiz-hero').offsetTop - 90, behavior: 'smooth' });
}

function startQuiz(lang) {
  state.lang = lang;
  state.index = 0;
  state.answers = new Array(QUIZ_DATA[lang].total).fill(null);
  state.selected = null;
  els.quizInstruction.textContent = QUIZ_DATA[lang].instruction;
  renderQuestion();
  showSection(els.play);
}

function renderQuestion() {
  const data = QUIZ_DATA[state.lang];
  const q = data.questions[state.index];
  state.selected = state.answers[state.index];

  els.progressFill.style.width = `${((state.index) / data.total) * 100}%`;
  els.progressLabel.textContent = `${state.index + 1} / ${data.total}`;
  els.questionPrompt.textContent = q.prompt;

  els.optionsList.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option';
    btn.textContent = opt;
    if (state.selected === i) btn.classList.add('selected');
    btn.addEventListener('click', () => selectOption(i));
    els.optionsList.appendChild(btn);
  });

  els.prevBtn.style.visibility = state.index === 0 ? 'hidden' : 'visible';
  els.nextBtn.disabled = state.selected === null;
  els.nextBtn.textContent = state.index === data.total - 1 ? 'Finalizar / Finish →' : 'Siguiente / Next →';
}

function selectOption(i) {
  state.selected = i;
  state.answers[state.index] = i;
  [...els.optionsList.children].forEach((btn, bi) => btn.classList.toggle('selected', bi === i));
  els.nextBtn.disabled = false;
}

function nextQuestion() {
  const data = QUIZ_DATA[state.lang];
  if (state.index < data.total - 1) {
    state.index += 1;
    renderQuestion();
  } else {
    els.progressFill.style.width = '100%';
    openGate();
  }
}

function prevQuestion() {
  if (state.index > 0) {
    state.index -= 1;
    renderQuestion();
  }
}

function openGate() {
  const ui = QUIZ_DATA[state.lang].ui;
  els.gateTitle.textContent = ui.gateTitle;
  els.nameLabel.textContent = ui.nameLabel;
  els.emailLabel.textContent = ui.emailLabel;
  els.waLabel.textContent = ui.waLabel;
  els.consentText.textContent = ui.consent;
  els.gateSubmit.textContent = ui.submit;
  els.gateError.hidden = true;
  showSection(els.gate);
}

function computeScore() {
  const data = QUIZ_DATA[state.lang];
  return state.answers.reduce((acc, ans, i) => acc + (ans === data.questions[i].correct ? 1 : 0), 0);
}

async function submitGate(e) {
  e.preventDefault();
  const ui = QUIZ_DATA[state.lang].ui;
  const form = els.gateForm;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const whatsapp = form.whatsapp.value.trim();
  const consent = form.consent.checked;
  const honeypot = form.website.value;

  if (!name || !email || !consent) {
    els.gateError.hidden = false;
    return;
  }

  els.gateSubmit.disabled = true;
  els.gateSubmit.textContent = ui.sending;

  const score = computeScore();
  const level = computeQuizLevel(score);
  const payload = {
    name, email, whatsapp,
    language: QUIZ_DATA[state.lang].testLabel,
    level, score, total: QUIZ_DATA[state.lang].total,
    website: honeypot
  };

  try {
    await fetch('send-quiz.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error('No se pudo enviar el resultado por correo', err);
  }

  showResult(score, level);
}

function showResult(score, level) {
  const data = QUIZ_DATA[state.lang];
  const info = data.levels[level];

  els.resultKicker.textContent = data.ui.resultKicker;
  els.resultBadge.textContent = level;
  els.resultTitle.textContent = info.title;
  els.resultText.textContent = info.text;
  els.resultScore.textContent = `${score} / ${data.total} ${data.ui.scoreLabel}`;

  const msg = encodeURIComponent(data.ui.waMessage(level));
  els.resultWa.href = `https://wa.me/573148309306?text=${msg}`;
  els.resultWa.textContent = data.ui.ctaWhatsapp;
  els.resultWa.onclick = () => trackWa('quiz-result');

  els.resultRestart.textContent = data.ui.ctaRestart;

  showSection(els.result);
}

document.querySelectorAll('[data-start-lang]').forEach((btn) => {
  btn.addEventListener('click', () => startQuiz(btn.dataset.startLang));
});

els.nextBtn.addEventListener('click', nextQuestion);
els.prevBtn.addEventListener('click', prevQuestion);
els.gateForm.addEventListener('submit', submitGate);
els.resultRestart.addEventListener('click', () => showSection(els.intro));

const urlLang = new URLSearchParams(location.search).get('lang');
if (urlLang === 'en' || urlLang === 'es') startQuiz(urlLang);
