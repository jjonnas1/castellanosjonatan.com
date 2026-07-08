/* ==========================================================
   Banco de preguntas del test de nivel (MCER A1–B2)
   "en" = test de inglés (instrucciones/audiencia en español)
   "es" = test de español (instrucciones/audiencia en inglés)
   ========================================================== */

const QUIZ_DATA = {
  en: {
    testLabel: 'Inglés',
    flag: '🇬🇧',
    instruction: 'Elige la palabra correcta para completar cada frase en inglés.',
    total: 20,
    questions: [
      { level: 'A1', prompt: 'She ___ from Colombia.', options: ['is', 'are', 'am', 'be'], correct: 0 },
      { level: 'A1', prompt: 'I ___ a teacher.', options: ['is', 'are', 'am', 'be'], correct: 2 },
      { level: 'A1', prompt: 'They ___ to school every day.', options: ['go', 'goes', 'going', 'went'], correct: 0 },
      { level: 'A1', prompt: 'There ___ a book on the table.', options: ['is', 'are', 'be', 'being'], correct: 0 },
      { level: 'A1', prompt: 'I have two ___.', options: ['child', 'childs', 'children', 'childrens'], correct: 2 },
      { level: 'A2', prompt: 'He ___ TV last night.', options: ['watch', 'watched', 'watches', 'watching'], correct: 1 },
      { level: 'A2', prompt: 'I have ___ apple.', options: ['a', 'an', 'the', 'some'], correct: 1 },
      { level: 'A2', prompt: 'She is ___ than her sister.', options: ['tall', 'taller', 'tallest', 'more tall'], correct: 1 },
      { level: 'A2', prompt: 'We ___ going to the beach tomorrow.', options: ['is', 'am', 'are', 'be'], correct: 2 },
      { level: 'A2', prompt: 'I usually ___ coffee in the morning.', options: ['drink', 'drinks', 'drank', 'drinking'], correct: 0 },
      { level: 'B1', prompt: 'If it rains, I ___ stay home.', options: ['will', 'would', 'am', 'was'], correct: 0 },
      { level: 'B1', prompt: 'I ___ never been to Paris.', options: ['have', 'has', 'had', 'having'], correct: 0 },
      { level: 'B1', prompt: 'She has been working here ___ 2019.', options: ['since', 'for', 'from', 'at'], correct: 0 },
      { level: 'B1', prompt: 'The book ___ by millions of people.', options: ['read', 'reads', 'was read', 'is reading'], correct: 2 },
      { level: 'B1', prompt: 'By the time we arrived, the movie ___ already started.', options: ['has', 'have', 'had', 'was'], correct: 2 },
      { level: 'B2', prompt: 'He said he ___ tired.', options: ['is', 'was', 'were', 'be'], correct: 1 },
      { level: 'B2', prompt: 'I wish I ___ more time to study.', options: ['have', 'has', 'had', 'would have'], correct: 2 },
      { level: 'B2', prompt: 'If I ___ known, I would have called you.', options: ['had', 'have', 'would have', 'has'], correct: 0 },
      { level: 'B2', prompt: 'Not only ___ she smart, but also kind.', options: ['is', 'was', 'does', 'has'], correct: 0 },
      { level: 'B2', prompt: '"Put off" means...', options: ['to postpone', 'to wear', 'to tolerate', 'to remove'], correct: 0 }
    ],
    levels: {
      A1: { title: 'Principiante · A1', text: 'Estás dando tus primeros pasos en inglés. Con clases 1:1 bien estructuradas puedes construir una base sólida muy rápido.' },
      A2: { title: 'Básico · A2', text: 'Ya entiendes lo esencial en situaciones cotidianas. Es el momento perfecto para ganar fluidez real conversando desde el día uno.' },
      B1: { title: 'Intermedio · B1', text: 'Te defiendes bien y puedes mantener una conversación. Con práctica dirigida vas a hablar con mucha más seguridad y naturalidad.' },
      B2: { title: 'Intermedio-alto · B2', text: '¡Muy buen nivel! Entiendes y te expresas con soltura. Podemos pulir matices y fluidez para que suenes 100% natural.' }
    },
    ui: {
      gateTitle: '¡Ya casi! Ingresa tus datos para ver tu resultado',
      nameLabel: 'Nombre completo',
      emailLabel: 'Correo electrónico',
      waLabel: 'WhatsApp (opcional, para agendar tu diagnóstico gratis)',
      consent: 'Acepto que Jonatan Castellanos me contacte con mi resultado y una recomendación de clases.',
      submit: 'Ver mi resultado →',
      sending: 'Enviando…',
      resultKicker: 'Tu resultado',
      scoreLabel: 'respuestas correctas',
      ctaWhatsapp: 'Escríbeme por WhatsApp con mi resultado',
      ctaRestart: 'Hacer otro test',
      waMessage: (level) => `Hola, hice el test de nivel de inglés y obtuve nivel ${level}. ¿Me ayudas a agendar mi diagnóstico gratis? 😊`
    }
  },

  es: {
    testLabel: 'Spanish',
    flag: '🇪🇸',
    instruction: 'Choose the correct word to complete each Spanish sentence.',
    total: 20,
    questions: [
      { level: 'A1', prompt: 'Yo ___ estudiante.', options: ['soy', 'eres', 'es', 'somos'], correct: 0 },
      { level: 'A1', prompt: 'Ella ___ de México.', options: ['soy', 'eres', 'es', 'son'], correct: 2 },
      { level: 'A1', prompt: 'Nosotros ___ al parque.', options: ['voy', 'vas', 'va', 'vamos'], correct: 3 },
      { level: 'A1', prompt: '¿Cómo te ___?', options: ['llamas', 'llamo', 'llama', 'llaman'], correct: 0 },
      { level: 'A1', prompt: 'Tengo dos ___.', options: ['niño', 'niños', 'niña', 'niñas'], correct: 1 },
      { level: 'A2', prompt: 'Ayer yo ___ al cine.', options: ['voy', 'fui', 'iré', 'iba'], correct: 1 },
      { level: 'A2', prompt: 'Ella ___ muy alta.', options: ['es', 'está', 'son', 'están'], correct: 0 },
      { level: 'A2', prompt: 'Hoy me siento ___ cansado.', options: ['soy', 'es', 'estoy', 'está'], correct: 2 },
      { level: 'A2', prompt: 'Este carro es ___ que el otro.', options: ['grande', 'más grande', 'el más grande', 'tan grande'], correct: 1 },
      { level: 'A2', prompt: 'Nosotros ___ a la fiesta mañana.', options: ['vamos a ir', 'fuimos', 'íbamos', 'vayamos'], correct: 0 },
      { level: 'B1', prompt: 'Espero que tú ___ bien.', options: ['estás', 'estés', 'estarás', 'estabas'], correct: 1 },
      { level: 'B1', prompt: 'Si llueve, yo ___ en casa.', options: ['me quedo', 'me quedé', 'me quedaré', 'me quedaría'], correct: 2 },
      { level: 'B1', prompt: 'Ella ha ___ aquí desde 2019.', options: ['trabaja', 'trabajado', 'trabajará', 'trabajando'], correct: 1 },
      { level: 'B1', prompt: 'Cuando era niño, ___ al parque todos los días.', options: ['fui', 'iba', 'voy', 'iré'], correct: 1 },
      { level: 'B1', prompt: 'Es importante que nosotros ___ temprano.', options: ['llegamos', 'llegaremos', 'lleguemos', 'llegábamos'], correct: 2 },
      { level: 'B2', prompt: 'Ella dijo que ___ cansada.', options: ['está', 'estaba', 'esté', 'estará'], correct: 1 },
      { level: 'B2', prompt: 'Ojalá ___ más tiempo.', options: ['tengo', 'tendría', 'tuviera', 'tendré'], correct: 2 },
      { level: 'B2', prompt: 'Si hubiera sabido, ___ llamado.', options: ['habría', 'había', 'habré', 'he'], correct: 0 },
      { level: 'B2', prompt: 'No solo ___ inteligente, sino también amable.', options: ['es', 'fue', 'sea', 'era'], correct: 0 },
      { level: 'B2', prompt: '"Darse por vencido" means...', options: ['to give up', 'to give away', 'to take back', 'to hand in'], correct: 0 }
    ],
    levels: {
      A1: { title: 'Beginner · A1', text: "You're just getting started with Spanish. With well-structured 1:1 classes you can build a solid foundation fast." },
      A2: { title: 'Elementary · A2', text: "You understand the essentials in everyday situations. It's the perfect time to build real fluency through conversation." },
      B1: { title: 'Intermediate · B1', text: "You can hold your own in conversation. With focused practice you'll speak with a lot more confidence and natural flow." },
      B2: { title: 'Upper-Intermediate · B2', text: 'Great level! You understand and express yourself smoothly. We can polish nuance and fluency so you sound 100% natural.' }
    },
    ui: {
      gateTitle: 'Almost there! Enter your info to see your result',
      nameLabel: 'Full name',
      emailLabel: 'Email',
      waLabel: 'WhatsApp (optional, to book your free level check)',
      consent: 'I agree that Jonatan Castellanos may contact me with my result and a class recommendation.',
      submit: 'See my result →',
      sending: 'Sending…',
      resultKicker: 'Your result',
      scoreLabel: 'correct answers',
      ctaWhatsapp: 'Message me on WhatsApp with my result',
      ctaRestart: 'Take another test',
      waMessage: (level) => `Hi! I took the Spanish level test and got level ${level}. Can you help me book my free level check? 😊`
    }
  }
};

function computeQuizLevel(score) {
  if (score <= 4) return 'A1';
  if (score <= 9) return 'A2';
  if (score <= 14) return 'B1';
  return 'B2';
}
