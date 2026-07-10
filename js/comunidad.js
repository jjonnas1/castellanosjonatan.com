/* ==========================================================
   Comunidad de estudiantes · castellanosjonatan.com
   Firebase Auth + Firestore desde el navegador (sitio estático).
   La seguridad real vive en firestore.rules (servidor).
   ========================================================== */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail,
  updateProfile, signOut
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc,
  collection, query, orderBy, where, limit, startAfter, getDocs,
  onSnapshot, serverTimestamp, Timestamp
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

const ADMIN_EMAIL = 'jonatancastellanosabogado@gmail.com';
const WA_NUMBER = '573148309306';
const TERMS_VERSION = '2026-07-v1';
const GRACE_DAYS = 5;
const PAGE_SIZE = 20;

/* ---------------- textos dinámicos ES/EN ---------------- */
const STR = {
  es: {
    ph_post: 'Desarrolla tu tema: haz tu pregunta, propone la conversación, escribe en inglés o español…',
    ph_titulo: 'Título de tu tema (ej: "¿Cómo se usa el past perfect?")',
    err_titulo: 'Ponle un título a tu tema (mínimo 3 letras).',
    ph_pais: '📍 ¿De dónde eres? (ej: Pereira, Colombia)',
    err_generic: 'Algo falló. Intenta de nuevo.',
    err_login: 'Correo o contraseña incorrectos.',
    err_email_in_use: 'Ese correo ya tiene una cuenta. Usa "Entrar".',
    err_weak_pass: 'La contraseña debe tener mínimo 8 caracteres.',
    err_checks: 'Debes declarar que eres mayor de 18 años y aceptar las normas.',
    err_nombre: 'Escribe tu nombre (mínimo 2 letras).',
    err_filtro_contacto: '🛡️ Por tu seguridad no se permiten teléfonos, correos ni enlaces de contacto en los mensajes.',
    err_filtro_groseria: '🛡️ Tu mensaje contiene lenguaje que no está permitido en la comunidad.',
    err_vacio: 'Escribe algo primero.',
    err_no_activo: 'Tu membresía no está activa. Escríbeme por WhatsApp para activarla.',
    ok_reset: 'Te enviamos un correo para restablecer tu contraseña.',
    ok_verify_sent: 'Correo reenviado. Revisa tu bandeja (y spam).',
    err_not_verified: 'Aún no aparece confirmado. Abre el enlace del correo y vuelve a intentar.',
    status_activo: 'Membresía activa hasta el',
    status_gracia: '⚠️ Tu membresía venció el {f}. Tienes hasta el {g} de gracia para renovar.',
    ahora: 'ahora',
    hace_min: 'hace {n} min',
    hace_h: 'hace {n} h',
    comentarios: 'Conversación',
    comentar: 'Responder',
    ph_comment: 'Únete a la conversación…',
    reportar: '⚑ Reportar',
    ocultar: '🚫 Ocultar usuario',
    borrar: '🗑 Borrar',
    seguro: '¿Seguro?',
    report_ph: 'Cuéntame qué pasa con esta publicación (solo lo leo yo).',
    report_send: 'Enviar reporte',
    report_cancel: 'Cancelar',
    report_ok: '✅ Reporte enviado. Lo revisaré personalmente. Gracias por cuidar la comunidad.',
    sin_posts: 'Aún no hay publicaciones. ¡Sé quien rompa el hielo! 🧊',
    wa_activar: 'Hola Jonatan, ya me registré en la Comunidad con el correo {e} y quiero activar mi acceso. 😊',
    wa_renovar: 'Hola Jonatan, mi membresía de la Comunidad venció y quiero renovar mis clases. 😊',
    wa_susp: 'Hola Jonatan, mi cuenta de la Comunidad aparece suspendida y quiero hablar sobre eso.'
  },
  en: {
    ph_post: 'Develop your topic: ask your question, start the conversation, write in English or Spanish…',
    ph_titulo: 'Title of your topic (e.g. "How do I use the past perfect?")',
    err_titulo: 'Give your topic a title (at least 3 letters).',
    ph_pais: '📍 Where are you from? (e.g. Recife, Brazil)',
    err_generic: 'Something went wrong. Please try again.',
    err_login: 'Wrong email or password.',
    err_email_in_use: 'That email already has an account. Use "Sign in".',
    err_weak_pass: 'Password must be at least 8 characters.',
    err_checks: 'You must confirm you are over 18 and accept the community rules.',
    err_nombre: 'Please write your name (at least 2 letters).',
    err_filtro_contacto: '🛡️ For your safety, phone numbers, emails and contact links are not allowed in messages.',
    err_filtro_groseria: '🛡️ Your message contains language that is not allowed in this community.',
    err_vacio: 'Write something first.',
    err_no_activo: 'Your membership is not active. Message me on WhatsApp to activate it.',
    ok_reset: 'We sent you a password reset email.',
    ok_verify_sent: 'Email re-sent. Check your inbox (and spam).',
    err_not_verified: "It doesn't show as confirmed yet. Open the link in the email and try again.",
    status_activo: 'Membership active until',
    status_gracia: '⚠️ Your membership expired on {f}. You have until {g} (grace period) to renew.',
    ahora: 'now',
    hace_min: '{n} min ago',
    hace_h: '{n} h ago',
    comentarios: 'Conversation',
    comentar: 'Reply',
    ph_comment: 'Join the conversation…',
    reportar: '⚑ Report',
    ocultar: '🚫 Hide user',
    borrar: '🗑 Delete',
    seguro: 'Sure?',
    report_ph: 'Tell me what is wrong with this post (only I will read it).',
    report_send: 'Send report',
    report_cancel: 'Cancel',
    report_ok: '✅ Report sent. I will review it personally. Thanks for protecting the community.',
    sin_posts: 'No posts yet. Be the one who breaks the ice! 🧊',
    wa_activar: 'Hi Jonatan, I just signed up for the Community with the email {e} and I want to activate my access. 😊',
    wa_renovar: 'Hi Jonatan, my Community membership expired and I want to renew my classes. 😊',
    wa_susp: 'Hi Jonatan, my Community account shows as suspended and I want to talk about it.'
  }
};
const t = (k) => (STR[(window.I18N && window.I18N.lang) || 'es'][k] || STR.es[k] || k);
const tf = (k, vars) => Object.entries(vars).reduce((s, [a, b]) => s.replaceAll('{' + a + '}', b), t(k));

/* ---------------- filtros de protección ------------------ */
/* (El servidor vuelve a validar teléfonos/correos/enlaces en
   firestore.rules; aquí además filtramos groserías y damos
   mensajes de error amables antes de enviar.) */
const RE_TELEFONO = /\d[\d .()\-]{5,}\d/;
const RE_EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
const RE_LINKS = /(wa\.me|whatsapp\.com|t\.me|telegram\.me|instagram\.com|facebook\.com|tiktok\.com|snapchat\.com|discord\.gg)/i;

const MALAS_PALABRAS = [
  // español
  'hijueputa', 'hijo de puta', 'malparido', 'malparida', 'gonorrea',
  'pirobo', 'piroba', 'careverga', 'carechimba', 'chimbo', 'culicagad',
  'marica', 'maricon', 'maricón', 'puta', 'puto', 'perra', 'zorra',
  'verga', 'polla', 'coño', 'joder', 'mierda', 'cabron', 'cabrón',
  'pendejo', 'pendeja', 'imbecil', 'imbécil', 'estupido', 'estúpida', 'estúpido',
  // inglés
  'fuck', 'fucking', 'motherfucker', 'shit', 'bullshit', 'bitch',
  'asshole', 'dickhead', 'cunt', 'whore', 'slut', 'faggot', 'nigger', 'nigga',
  'retard', 'retarded'
];

function normaliza(s) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/0/g, 'o').replace(/1/g, 'i').replace(/3/g, 'e')
    .replace(/4/g, 'a').replace(/5/g, 's').replace(/7/g, 't')
    .replace(/@/g, 'a').replace(/\$/g, 's');
}

function validaTexto(texto) {
  if (!texto.trim()) return 'err_vacio';
  if (RE_TELEFONO.test(texto) || RE_EMAIL.test(texto) || RE_LINKS.test(texto)) return 'err_filtro_contacto';
  const limpio = ' ' + normaliza(texto).replace(/[^a-zñ ]/g, ' ') + ' ';
  for (const p of MALAS_PALABRAS) {
    if (limpio.includes(' ' + normaliza(p) + ' ')) return 'err_filtro_groseria';
  }
  return null;
}

/* ---------------- arranque ------------------------------- */
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const VIEWS = ['cLoading', 'cAuth', 'cVerify', 'cPending', 'cSuspended', 'cCommunity'];
function show(view) {
  VIEWS.forEach((v) => { const el = $(v); if (el) el.hidden = (v !== view); });
}

if (!window.FIREBASE_CONFIG) {
  show('cAuth');
  const err = $('loginError');
  if (err) { err.hidden = false; err.textContent = 'La comunidad está en preparación. Vuelve pronto. 🚧'; }
  throw new Error('FIREBASE_CONFIG no configurado');
}

const app = initializeApp(window.FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getFirestore(app);

let miPerfil = null;
let soyAdmin = false;
let bloqueados = new Set();
let categoria = 'general';   // categoría del tema nuevo (chips del compositor)
let tabActual = 'todo';      // pestaña de temas activa
let ultimoDoc = null;
const idsRenderizados = new Set();

const wa = (msg) => 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
const fmtFecha = (d) => d.toLocaleDateString((window.I18N && window.I18N.lang) === 'en' ? 'en-US' : 'es-CO',
  { day: 'numeric', month: 'short', year: 'numeric' });

function fmtCuando(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : ts;
  const min = Math.floor((Date.now() - d.getTime()) / 60000);
  if (min < 1) return t('ahora');
  if (min < 60) return tf('hace_min', { n: min });
  if (min < 24 * 60) return tf('hace_h', { n: Math.floor(min / 60) });
  return fmtFecha(d);
}

/* ---------------- estados de membresía ------------------- */
function estadoMembresia(perfil) {
  if (!perfil) return 'pendiente';
  if (perfil.suspendido === true) return 'suspendido';
  if (!perfil.activoHasta) return 'pendiente';
  const fin = perfil.activoHasta.toDate();
  const gracia = new Date(fin.getTime() + GRACE_DAYS * 86400000);
  const ahora = new Date();
  if (ahora <= fin) return 'activo';
  if (ahora <= gracia) return 'gracia';
  return 'vencido';
}

/* ---------------- flujo de sesión ------------------------ */
onAuthStateChanged(auth, async (user) => {
  $('btnSalirNav').hidden = !user;
  if (!user) { show('cAuth'); return; }

  if (!user.emailVerified) {
    show('cVerify');
    return;
  }

  try {
    const snap = await getDoc(doc(db, 'usuarios', user.uid));
    if (!snap.exists()) {
      // Registro incompleto (el perfil no llegó a crearse): pedir de nuevo
      // nombre + aceptación de normas, sin volver a crear la cuenta.
      modoCompletarPerfil();
      return;
    }
    miPerfil = snap.data();
  } catch (e) {
    console.error('[Comunidad] error leyendo perfil', e);
    show('cAuth');
    return;
  }

  soyAdmin = user.email === ADMIN_EMAIL;
  const estado = estadoMembresia(miPerfil);

  if (estado === 'suspendido' && !soyAdmin) {
    $('waSuspendido').href = wa(t('wa_susp'));
    show('cSuspended');
    return;
  }

  if (estado === 'pendiente' && !soyAdmin) {
    $('waActivar').href = wa(tf('wa_activar', { e: user.email }));
    show('cPending');
    return;
  }

  await entrarComunidad(estado);
});

async function entrarComunidad(estado) {
  // barra de estado
  const st = $('cStatus');
  const puedeEscribir = soyAdmin || estado === 'activo' || estado === 'gracia';
  if (soyAdmin) {
    st.textContent = '👑 Administrador';
    $('btnAdminToggle').hidden = false;
  } else if (estado === 'activo') {
    st.textContent = t('status_activo') + ' ' + fmtFecha(miPerfil.activoHasta.toDate());
  } else if (estado === 'gracia') {
    const fin = miPerfil.activoHasta.toDate();
    st.textContent = tf('status_gracia', {
      f: fmtFecha(fin),
      g: fmtFecha(new Date(fin.getTime() + GRACE_DAYS * 86400000))
    });
  } else {
    st.textContent = '';
  }

  $('cComposer').hidden = !puedeEscribir;
  $('cExpired').hidden = puedeEscribir;
  if (!puedeEscribir) $('waRenovar').href = wa(t('wa_renovar'));
  $('postTexto').placeholder = t('ph_post');
  $('postTitulo').placeholder = t('ph_titulo');

  // invitar a completar el país si no lo tiene
  if (puedeEscribir && !miPerfil.pais) {
    $('paisNudge').hidden = false;
    $('paisInput').placeholder = t('ph_pais');
  }

  await cargarBloqueados();
  show('cCommunity');
  cargarFeed();
  if (soyAdmin) initAdmin();
}

$('btnGuardarPais').addEventListener('click', async () => {
  const v = $('paisInput').value.trim();
  if (v.length < 2 || validaTexto(v)) return;
  try {
    await updateDoc(doc(db, 'usuarios', auth.currentUser.uid), { pais: v });
    miPerfil.pais = v;
    $('paisNudge').hidden = true;
  } catch (e) { console.error('[Comunidad] pais', e); }
});

function modoCompletarPerfil() {
  show('cAuth');
  $('tabRegister').click();
  $('regEmail').value = auth.currentUser.email;
  $('regEmail').disabled = true;
  $('regPass').value = 'x'.repeat(12);
  $('regPass').style.display = 'none';
  $('formRegister').dataset.soloPerfil = '1';
}

/* ---------------- login / registro ----------------------- */
function muestraError(el, msg, ok = false) {
  el.hidden = false;
  el.textContent = msg;
  el.classList.toggle('c-ok', ok);
}

$('tabLogin').addEventListener('click', () => {
  $('tabLogin').classList.add('is-active');
  $('tabRegister').classList.remove('is-active');
  $('formLogin').hidden = false;
  $('formRegister').hidden = true;
});
$('tabRegister').addEventListener('click', () => {
  $('tabRegister').classList.add('is-active');
  $('tabLogin').classList.remove('is-active');
  $('formRegister').hidden = false;
  $('formLogin').hidden = true;
});

$('formLogin').addEventListener('submit', async (e) => {
  e.preventDefault();
  const err = $('loginError'); err.hidden = true;
  try {
    await signInWithEmailAndPassword(auth, $('loginEmail').value.trim(), $('loginPass').value);
  } catch (ex) {
    muestraError(err, ['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found']
      .includes(ex.code) ? t('err_login') : t('err_generic'));
  }
});

$('btnForgot').addEventListener('click', async () => {
  const err = $('loginError'); err.hidden = true;
  const email = $('loginEmail').value.trim();
  if (!email) { muestraError(err, t('err_login')); return; }
  try {
    await sendPasswordResetEmail(auth, email);
    muestraError(err, t('ok_reset'), true);
  } catch { muestraError(err, t('err_generic')); }
});

$('formRegister').addEventListener('submit', async (e) => {
  e.preventDefault();
  const err = $('regError'); err.hidden = true;
  const nombre = $('regNombre').value.trim();
  const soloPerfil = $('formRegister').dataset.soloPerfil === '1';

  if (nombre.length < 2) { muestraError(err, t('err_nombre')); return; }
  if (!$('regAdulto').checked || !$('regTerminos').checked) { muestraError(err, t('err_checks')); return; }
  const filtro = validaTexto(nombre);
  if (filtro && filtro !== 'err_vacio') { muestraError(err, t(filtro)); return; }

  try {
    let user = auth.currentUser;
    if (!soloPerfil) {
      const cred = await createUserWithEmailAndPassword(auth, $('regEmail').value.trim(), $('regPass').value);
      user = cred.user;
    }
    await updateProfile(user, { displayName: nombre });
    await setDoc(doc(db, 'usuarios', user.uid), {
      nombre,
      pais: ($('regPais').value || '').trim().slice(0, 40),
      email: user.email,
      creadoEl: serverTimestamp(),
      terminosAceptadosEl: serverTimestamp(),
      terminosVersion: TERMS_VERSION,
      mayorDeEdad: true,
      activoHasta: null,
      suspendido: false
    });
    if (!user.emailVerified) await sendEmailVerification(user);
    if (soloPerfil) { location.reload(); return; }
    show('cVerify');
  } catch (ex) {
    console.error('[Comunidad] registro', ex);
    if (ex.code === 'auth/email-already-in-use') muestraError(err, t('err_email_in_use'));
    else if (ex.code === 'auth/weak-password') muestraError(err, t('err_weak_pass'));
    else muestraError(err, t('err_generic'));
  }
});

/* verificación de correo */
$('btnYaVerifique').addEventListener('click', async () => {
  await auth.currentUser.reload();
  if (auth.currentUser.emailVerified) {
    await auth.currentUser.getIdToken(true); // refresca el token para las reglas
    location.reload();
  } else {
    muestraError($('verifyMsg'), t('err_not_verified'));
  }
});
$('btnReenviar').addEventListener('click', async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    muestraError($('verifyMsg'), t('ok_verify_sent'), true);
  } catch { muestraError($('verifyMsg'), t('err_generic')); }
});

['btnSalir1', 'btnSalir2', 'btnSalir3', 'btnSalirNav'].forEach((id) => {
  const el = $(id);
  if (el) el.addEventListener('click', () => signOut(auth).then(() => location.reload()));
});

/* modal de términos (delegado: i18n regenera el botón al cambiar idioma) */
const modal = $('modalTerminos');
document.addEventListener('click', (e) => {
  if (e.target.id === 'btnVerTerminos') modal.hidden = false;
});
$('btnCerrarTerminos').addEventListener('click', () => { modal.hidden = true; });
$('btnCerrarTerminos2').addEventListener('click', () => { modal.hidden = true; });
modal.addEventListener('click', (e) => { if (e.target === modal) modal.hidden = true; });

/* ---------------- bloqueados (silenciar) ------------------ */
async function cargarBloqueados() {
  bloqueados = new Set();
  try {
    const snap = await getDocs(collection(db, 'usuarios', auth.currentUser.uid, 'bloqueados'));
    snap.forEach((d) => bloqueados.add(d.id));
  } catch (e) { console.error('[Comunidad] bloqueados', e); }
}

/* ---------------- compositor y pestañas ------------------- */
document.querySelectorAll('#catChips .c-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('#catChips .c-chip').forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    categoria = chip.dataset.cat;
  });
});

document.querySelectorAll('#catTabs .c-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('#catTabs .c-tab').forEach((x) => x.classList.remove('is-active'));
    tab.classList.add('is-active');
    tabActual = tab.dataset.cat;
    cargarFeed(true);
  });
});

function activarTab(cat) {
  tabActual = cat;
  document.querySelectorAll('#catTabs .c-tab').forEach((x) =>
    x.classList.toggle('is-active', x.dataset.cat === cat));
}

$('postTexto').addEventListener('input', () => {
  $('postCounter').textContent = $('postTexto').value.length + ' / 1200';
});

$('btnPublicar').addEventListener('click', async () => {
  const err = $('composerError'); err.hidden = true;
  const titulo = $('postTitulo').value.trim();
  const texto = $('postTexto').value;
  if (titulo.length < 3) { muestraError(err, t('err_titulo')); return; }
  const problema = validaTexto(titulo) || validaTexto(texto);
  if (problema) { muestraError(err, t(problema)); return; }

  const btn = $('btnPublicar');
  btn.disabled = true;
  try {
    await addDoc(collection(db, 'posts'), {
      uid: auth.currentUser.uid,
      autorNombre: (miPerfil && miPerfil.nombre) || auth.currentUser.displayName || '—',
      autorPais: (miPerfil && miPerfil.pais) || '',
      titulo,
      texto: texto.trim(),
      categoria,
      creadoEl: serverTimestamp(),
      expiraEl: Timestamp.fromMillis(Date.now() + 90 * 86400000)
    });
    $('postTitulo').value = '';
    $('postTexto').value = '';
    $('postCounter').textContent = '0 / 1200';
    activarTab(categoria); // saltar a la pestaña donde quedó el tema
    cargarFeed();
    setTimeout(() => { btn.disabled = false; }, 15000); // anti-spam suave
  } catch (ex) {
    console.error('[Comunidad] publicar', ex);
    muestraError(err, ex.code === 'permission-denied' ? t('err_no_activo') : t('err_generic'));
    btn.disabled = false;
  }
});

/* ---------------- muro (en tiempo real) -------------------- */
let unsubFeed = null;
let ultimoDocMore = null;

function filtrosBase() {
  const f = [];
  if (tabActual !== 'todo') f.push(where('categoria', '==', tabActual));
  f.push(orderBy('creadoEl', 'desc'));
  return f;
}

function avisoVacio() {
  const live = $('cFeedLive'), more = $('cFeedMore');
  const previo = document.getElementById('cVacio');
  if (previo) previo.remove();
  if (!live.children.length && !more.children.length) {
    const d = document.createElement('div');
    d.id = 'cVacio';
    d.className = 'c-card center';
    d.textContent = t('sin_posts');
    $('cFeed').appendChild(d);
  }
}

function cargarFeed() {
  if (unsubFeed) { unsubFeed(); unsubFeed = null; }
  const live = $('cFeedLive'), more = $('cFeedMore');
  live.innerHTML = ''; more.innerHTML = '';
  ultimoDoc = null; ultimoDocMore = null;
  idsRenderizados.clear();

  const q = query(collection(db, 'posts'), ...filtrosBase(), limit(PAGE_SIZE));
  unsubFeed = onSnapshot(q, (snap) => {
    ultimoDoc = snap.docs[snap.docs.length - 1] || ultimoDoc;
    $('btnMas').hidden = snap.size < PAGE_SIZE;
    snap.docChanges().forEach((ch) => {
      const id = ch.doc.id;
      if (ch.type === 'removed') {
        const el = live.querySelector(`[data-id="${CSS.escape(id)}"]`);
        if (el) el.remove();
        idsRenderizados.delete(id);
        return;
      }
      if (ch.type !== 'added') return;
      const data = ch.doc.data();
      if (idsRenderizados.has(id) || bloqueados.has(data.uid)) return;
      idsRenderizados.add(id);
      const el = renderPost(id, data);
      el.dataset.id = id;
      live.insertBefore(el, live.children[ch.newIndex] || null);
    });
    avisoVacio();
  }, (e) => console.error('[Comunidad] feed', e));
}

async function cargarMas() {
  const base = ultimoDocMore || ultimoDoc;
  if (!base) return;
  try {
    const snap = await getDocs(query(
      collection(db, 'posts'), ...filtrosBase(), startAfter(base), limit(PAGE_SIZE)));
    ultimoDocMore = snap.docs[snap.docs.length - 1] || ultimoDocMore;
    if (snap.docs.length < PAGE_SIZE) $('btnMas').hidden = true;
    snap.docs.forEach((d) => {
      if (idsRenderizados.has(d.id)) return;
      idsRenderizados.add(d.id);
      const data = d.data();
      if (bloqueados.has(data.uid)) return;
      const el = renderPost(d.id, data);
      el.dataset.id = d.id;
      $('cFeedMore').appendChild(el);
    });
  } catch (e) { console.error('[Comunidad] más', e); }
}
$('btnMas').addEventListener('click', cargarMas);

const CATS = { general: '🌎', english: '🇬🇧', espanol: '🇪🇸', dudas: '❓', partners: '🤝' };
const COLORES = ['#ffd9d1', '#e5ddfd', '#ffe9b3', '#d9f5ec', '#d7eaff'];
const colorDe = (uid) => COLORES[[...uid].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORES.length];
const iniciales = (n) => n.trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join('').toUpperCase();

function renderPost(id, p) {
  const div = document.createElement('article');
  div.className = 'c-post';
  const esMio = p.uid === auth.currentUser.uid;
  div.innerHTML = `
    <div class="c-post-head">
      <span class="c-avatar" style="background:${colorDe(p.uid)}">${esc(iniciales(p.autorNombre || '?'))}</span>
      <div>
        <div class="c-post-author">${esc(p.autorNombre || '—')}</div>
        <div class="c-post-meta">${p.autorPais ? '📍 ' + esc(p.autorPais) + ' · ' : ''}${fmtCuando(p.creadoEl)}</div>
      </div>
      <span class="c-post-flag">${CATS[p.categoria] || ''}</span>
    </div>
    ${p.titulo ? `<h3 class="c-post-title">${esc(p.titulo)}</h3>` : ''}
    <p class="c-post-text">${esc(p.texto)}</p>
    <div class="c-post-foot">
      <button class="c-linkbtn" data-act="comentarios">💬 ${esc(t('comentarios'))}</button>
      ${esMio || soyAdmin ? `<button class="c-linkbtn" data-act="borrar">${esc(t('borrar'))}</button>` : ''}
      ${!esMio ? `<button class="c-linkbtn" data-act="reportar">${esc(t('reportar'))}</button>` : ''}
      ${!esMio ? `<button class="c-linkbtn" data-act="ocultar">${esc(t('ocultar'))}</button>` : ''}
    </div>
    <div class="c-comments" hidden></div>
    <div class="c-extra"></div>`;

  div.querySelector('[data-act="comentarios"]').addEventListener('click', () => toggleComentarios(id, div));
  const bBorrar = div.querySelector('[data-act="borrar"]');
  if (bBorrar) bBorrar.addEventListener('click', () => borrarPost(id, p, div, bBorrar));
  const bReportar = div.querySelector('[data-act="reportar"]');
  if (bReportar) bReportar.addEventListener('click', () => formReporte('post', id, null, p, div));
  const bOcultar = div.querySelector('[data-act="ocultar"]');
  if (bOcultar) bOcultar.addEventListener('click', async () => {
    await setDoc(doc(db, 'usuarios', auth.currentUser.uid, 'bloqueados', p.uid), { el: serverTimestamp() });
    bloqueados.add(p.uid);
    cargarFeed();
  });
  return div;
}

async function borrarPost(id, p, div, btn) {
  if (btn.dataset.confirmar !== '1') {
    btn.dataset.confirmar = '1';
    btn.textContent = '🗑 ' + t('seguro');
    setTimeout(() => { btn.dataset.confirmar = ''; btn.textContent = t('borrar'); }, 4000);
    return;
  }
  try {
    if (soyAdmin && p.uid !== auth.currentUser.uid) {
      await setDoc(doc(db, 'posts_eliminados', id), {
        ...p, postIdOriginal: id, eliminadoEl: serverTimestamp(), motivo: 'moderacion'
      });
    }
    await deleteDoc(doc(db, 'posts', id));
    div.remove();
  } catch (e) { console.error('[Comunidad] borrar', e); }
}

/* --------- conversación de cada tema (chat en vivo) -------- */
const unsubsHilo = {};

function toggleComentarios(postId, div) {
  const box = div.querySelector('.c-comments');
  if (!box.hidden) {
    box.hidden = true;
    if (unsubsHilo[postId]) { unsubsHilo[postId](); delete unsubsHilo[postId]; }
    return;
  }
  box.hidden = false;
  box.innerHTML = '<div class="c-thread"></div>';
  const thread = box.querySelector('.c-thread');

  if (!$('cComposer').hidden) {
    const form = document.createElement('div');
    form.className = 'c-comment-form';
    form.innerHTML = `<input type="text" maxlength="500" placeholder="${esc(t('ph_comment'))}">
      <button type="button">${esc(t('comentar'))}</button>`;
    const input = form.querySelector('input');
    const enviar = async () => {
      const problema = validaTexto(input.value);
      if (problema) { input.value = ''; input.placeholder = t(problema); return; }
      const texto = input.value.trim();
      input.value = '';
      try {
        await addDoc(collection(db, 'posts', postId, 'comentarios'), {
          uid: auth.currentUser.uid,
          autorNombre: (miPerfil && miPerfil.nombre) || auth.currentUser.displayName || '—',
          autorPais: (miPerfil && miPerfil.pais) || '',
          texto,
          creadoEl: serverTimestamp(),
          expiraEl: Timestamp.fromMillis(Date.now() + 90 * 86400000)
        });
      } catch (e) { console.error('[Comunidad] comentar', e); input.placeholder = t('err_generic'); }
    };
    form.querySelector('button').addEventListener('click', enviar);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') enviar(); });
    box.appendChild(form);
    setTimeout(() => input.focus(), 50);
  }

  const q = query(collection(db, 'posts', postId, 'comentarios'),
    orderBy('creadoEl', 'asc'), limit(200));
  unsubsHilo[postId] = onSnapshot(q, (snap) => {
    snap.docChanges().forEach((ch) => {
      const id = ch.doc.id;
      if (ch.type === 'removed') {
        const el = thread.querySelector(`[data-id="${CSS.escape(id)}"]`);
        if (el) el.remove();
        return;
      }
      if (ch.type !== 'added') return;
      if (thread.querySelector(`[data-id="${CSS.escape(id)}"]`)) return;
      const el = renderComentario(postId, id, ch.doc.data());
      el.dataset.id = id;
      thread.insertBefore(el, thread.children[ch.newIndex] || null);
    });
    thread.scrollTop = thread.scrollHeight; // como un chat: siempre al último mensaje
  }, (e) => console.error('[Comunidad] hilo', e));
}

function renderComentario(postId, cid, c) {
  const esMio = c.uid === auth.currentUser.uid;
  const el = document.createElement('div');
  el.className = 'c-comment' + (esMio ? ' mine' : '');
  el.innerHTML = `
    <div class="c-bubble-head">
      <span class="c-comment-author">${esc(c.autorNombre || '—')}</span>
      <span class="c-post-meta">${c.autorPais ? ' · 📍 ' + esc(c.autorPais) : ''} · ${fmtCuando(c.creadoEl)}</span>
    </div>
    <div class="c-bubble-text">${esc(c.texto)}</div>
    <div class="c-bubble-foot">${esMio || soyAdmin ? `<button class="c-linkbtn" data-act="bc">${esc(t('borrar'))}</button>` : ''}
    ${!esMio ? `<button class="c-linkbtn" data-act="rc">${esc(t('reportar'))}</button>` : ''}</div>`;
  const bb = el.querySelector('[data-act="bc"]');
  if (bb) bb.addEventListener('click', async () => {
    if (bb.dataset.c !== '1') { bb.dataset.c = '1'; bb.textContent = t('seguro'); return; }
    await deleteDoc(doc(db, 'posts', postId, 'comentarios', cid));
  });
  const br = el.querySelector('[data-act="rc"]');
  if (br) br.addEventListener('click', () => formReporte('comentario', postId, cid, c, el));
  return el;
}

/* ---------------- reportes -------------------------------- */
function formReporte(tipo, postId, comentarioId, data, contenedor) {
  if (contenedor.querySelector('.c-report-form')) return;
  const form = document.createElement('div');
  form.className = 'c-report-form';
  form.innerHTML = `
    <textarea rows="2" maxlength="500" placeholder="${esc(t('report_ph'))}"></textarea>
    <div class="c-actions">
      <button class="c-mini-btn warn">${esc(t('report_send'))}</button>
      <button class="c-mini-btn">${esc(t('report_cancel'))}</button>
    </div>`;
  const [btnEnviar, btnCancelar] = form.querySelectorAll('button');
  btnCancelar.addEventListener('click', () => form.remove());
  btnEnviar.addEventListener('click', async () => {
    const motivo = form.querySelector('textarea').value.trim();
    if (motivo.length < 3) return;
    try {
      await addDoc(collection(db, 'reportes'), {
        tipo,
        postId,
        comentarioId: comentarioId || null,
        textoReportado: data.texto || '',
        reportadoUid: data.uid,
        reportadoNombre: data.autorNombre || '',
        reporterUid: auth.currentUser.uid,
        motivo,
        creadoEl: serverTimestamp(),
        estado: 'pendiente'
      });
      form.innerHTML = '<p>' + esc(t('report_ok')) + '</p>';
      setTimeout(() => form.remove(), 5000);
    } catch (e) { console.error('[Comunidad] reporte', e); }
  });
  (tipo === 'post' ? contenedor.querySelector('.c-extra') : contenedor).appendChild(form);
}

/* ---------------- panel de administración ----------------- */

/* Retención de 90 días: cada vez que el admin entra, se purgan
   las publicaciones vencidas (con sus comentarios). */
async function purgarAntiguos() {
  try {
    const corte = Timestamp.fromMillis(Date.now() - 90 * 86400000);
    const snap = await getDocs(query(
      collection(db, 'posts'), where('creadoEl', '<', corte), limit(100)));
    for (const d of snap.docs) {
      const coms = await getDocs(collection(db, 'posts', d.id, 'comentarios'));
      for (const c of coms.docs) await deleteDoc(c.ref);
      await deleteDoc(d.ref);
    }
    if (snap.size) console.log('[Comunidad] purgados', snap.size, 'posts de más de 90 días');
  } catch (e) { console.error('[Comunidad] purga', e); }
}

function initAdmin() {
  purgarAntiguos();
  $('btnAdminToggle').addEventListener('click', () => {
    const panel = $('cAdmin');
    panel.hidden = !panel.hidden;
    if (!panel.hidden) { cargarUsuariosAdmin(); cargarReportesAdmin(); }
  });
  $('tabAdminUsuarios').addEventListener('click', () => {
    $('tabAdminUsuarios').classList.add('is-active');
    $('tabAdminReportes').classList.remove('is-active');
    $('adminUsuarios').hidden = false;
    $('adminReportes').hidden = true;
  });
  $('tabAdminReportes').addEventListener('click', () => {
    $('tabAdminReportes').classList.add('is-active');
    $('tabAdminUsuarios').classList.remove('is-active');
    $('adminReportes').hidden = false;
    $('adminUsuarios').hidden = true;
  });
}

function estadoTexto(u) {
  const e = estadoMembresia(u);
  if (e === 'suspendido') return ['⛔ Suspendido', 'warn'];
  if (e === 'pendiente') return ['🕓 Pendiente de activación', 'warn'];
  if (e === 'activo') return ['✅ Activo hasta ' + fmtFecha(u.activoHasta.toDate()), 'ok'];
  if (e === 'gracia') return ['⚠️ En gracia (venció ' + fmtFecha(u.activoHasta.toDate()) + ')', 'warn'];
  return ['💤 Vencido el ' + fmtFecha(u.activoHasta.toDate()), 'off'];
}

async function cargarUsuariosAdmin() {
  const cont = $('adminUsuarios');
  cont.innerHTML = 'Cargando…';
  try {
    const snap = await getDocs(query(collection(db, 'usuarios'), orderBy('creadoEl', 'desc'), limit(200)));
    cont.innerHTML = '';
    const orden = { pendiente: 0, gracia: 1, vencido: 2, activo: 3, suspendido: 4 };
    const docs = snap.docs.sort((a, b) => orden[estadoMembresia(a.data())] - orden[estadoMembresia(b.data())]);
    docs.forEach((d) => cont.appendChild(filaUsuario(d.id, d.data())));
    if (!cont.children.length) cont.textContent = 'Sin usuarios todavía.';
  } catch (e) { console.error('[Comunidad] admin usuarios', e); cont.textContent = 'Error cargando usuarios.'; }
}

function filaUsuario(uid, u) {
  const row = document.createElement('div');
  row.className = 'c-user-row';
  const [txt, cls] = estadoTexto(u);
  row.innerHTML = `
    <div class="c-user-info">
      <div class="c-user-name">${esc(u.nombre || '—')}</div>
      <div class="c-user-mail">${esc(u.email || '')}</div>
      <div class="c-user-state ${cls}">${txt}</div>
    </div>
    <div class="c-user-actions">
      <button class="c-mini-btn act" data-a="30">+30 días</button>
      <button class="c-mini-btn warn" data-a="susp">${u.suspendido ? 'Reactivar' : 'Suspender'}</button>
    </div>`;
  row.querySelector('[data-a="30"]').addEventListener('click', async (e) => {
    const base = u.activoHasta && u.activoHasta.toDate() > new Date() ? u.activoHasta.toDate() : new Date();
    const nueva = Timestamp.fromDate(new Date(base.getTime() + 30 * 86400000));
    try {
      await updateDoc(doc(db, 'usuarios', uid), { activoHasta: nueva });
      u.activoHasta = nueva;
      const [txt2, cls2] = estadoTexto(u);
      row.querySelector('.c-user-state').textContent = txt2;
      row.querySelector('.c-user-state').className = 'c-user-state ' + cls2;
    } catch (err) { console.error(err); }
  });
  row.querySelector('[data-a="susp"]').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    if (btn.dataset.c !== '1' && !u.suspendido) { btn.dataset.c = '1'; btn.textContent = '¿Seguro?'; return; }
    try {
      await updateDoc(doc(db, 'usuarios', uid), { suspendido: !u.suspendido });
      u.suspendido = !u.suspendido;
      btn.dataset.c = '';
      btn.textContent = u.suspendido ? 'Reactivar' : 'Suspender';
      const [txt2, cls2] = estadoTexto(u);
      row.querySelector('.c-user-state').textContent = txt2;
      row.querySelector('.c-user-state').className = 'c-user-state ' + cls2;
    } catch (err) { console.error(err); }
  });
  return row;
}

async function cargarReportesAdmin() {
  const cont = $('adminReportes');
  cont.innerHTML = 'Cargando…';
  try {
    const snap = await getDocs(query(collection(db, 'reportes'),
      where('estado', '==', 'pendiente'), orderBy('creadoEl', 'desc'), limit(50)));
    cont.innerHTML = '';
    $('badgeReportes').hidden = snap.empty;
    $('badgeReportes').textContent = snap.size;
    if (snap.empty) { cont.textContent = 'Sin reportes pendientes. 🎉'; return; }
    snap.forEach((d) => {
      const r = d.data();
      const item = document.createElement('div');
      item.className = 'c-report-item';
      item.innerHTML = `
        <strong>${r.tipo === 'post' ? 'Publicación' : 'Comentario'} de ${esc(r.reportadoNombre)}</strong>
        <span class="c-post-meta"> · ${fmtCuando(r.creadoEl)}</span>
        <div class="c-report-quote">${esc(r.textoReportado)}</div>
        <div><em>Motivo:</em> ${esc(r.motivo)}</div>
        <div class="c-actions">
          <button class="c-mini-btn warn" data-a="del">Eliminar contenido</button>
          <button class="c-mini-btn warn" data-a="susp">Suspender usuario</button>
          <button class="c-mini-btn act" data-a="ok">Marcar resuelto</button>
        </div>`;
      item.querySelector('[data-a="del"]').addEventListener('click', async () => {
        try {
          if (r.tipo === 'post') {
            await setDoc(doc(db, 'posts_eliminados', r.postId), {
              texto: r.textoReportado, uid: r.reportadoUid, autorNombre: r.reportadoNombre,
              postIdOriginal: r.postId, eliminadoEl: serverTimestamp(), motivo: 'reporte: ' + r.motivo
            });
            await deleteDoc(doc(db, 'posts', r.postId));
          } else {
            await deleteDoc(doc(db, 'posts', r.postId, 'comentarios', r.comentarioId));
          }
          await updateDoc(doc(db, 'reportes', d.id), { estado: 'resuelto', resueltoEl: serverTimestamp() });
          item.remove();
        } catch (err) { console.error(err); }
      });
      item.querySelector('[data-a="susp"]').addEventListener('click', async () => {
        try {
          await updateDoc(doc(db, 'usuarios', r.reportadoUid), { suspendido: true });
          await updateDoc(doc(db, 'reportes', d.id), { estado: 'resuelto', resueltoEl: serverTimestamp() });
          item.remove();
        } catch (err) { console.error(err); }
      });
      item.querySelector('[data-a="ok"]').addEventListener('click', async () => {
        try {
          await updateDoc(doc(db, 'reportes', d.id), { estado: 'resuelto', resueltoEl: serverTimestamp() });
          item.remove();
        } catch (err) { console.error(err); }
      });
      cont.appendChild(item);
    });
  } catch (e) { console.error('[Comunidad] admin reportes', e); cont.textContent = 'Error cargando reportes.'; }
}
