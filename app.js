// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks){
  toggle.addEventListener('click', ()=>{
    const open = navLinks.style.display === 'flex' ? false : true;
    navLinks.style.display = open ? 'flex' : 'none';
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Year
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

// Reveal
const els = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }});
  },{threshold:.12});
  els.forEach(el=>io.observe(el));
} else { els.forEach(el=>el.classList.add('show')); }

// Tabs
const tabs = document.querySelectorAll('.tab');
const panels = {
  webshop: document.getElementById('panel-webshop'),
  website: document.getElementById('panel-website'),
  ai: document.getElementById('panel-ai'),
  game: document.getElementById('panel-game'),
  video: document.getElementById('panel-video'),
};
tabs.forEach(t=>{
  t.addEventListener('click', ()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    const key = t.dataset.tab;
    Object.values(panels).forEach(p=>p.classList.remove('active'));
    panels[key]?.classList.add('active');
  });
});

// Modals
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
document.getElementById('loginOpen')?.addEventListener('click', ()=> loginModal.showModal());
document.getElementById('registerOpen')?.addEventListener('click', ()=> registerModal.showModal());

// Cookie banner
const cookieBar = document.getElementById('cookieBar');
const cookieAccept = document.getElementById('cookieAccept');
const cookieDecline = document.getElementById('cookieDecline');
if (cookieBar){
  if (!localStorage.getItem('cookieConsent')) setTimeout(()=>cookieBar.classList.add('show'), 600);
  const setConsent = (v)=>{ localStorage.setItem('cookieConsent', v); cookieBar.classList.remove('show'); };
  cookieAccept?.addEventListener('click', ()=> setConsent('accepted'));
  cookieDecline?.addEventListener('click', ()=> setConsent('declined'));
}

// Netlify form feedback
const form = document.querySelector('form[netlify]');
const note = document.getElementById('form-note');
if (form && note){
  form.addEventListener('submit', ()=>{ note.textContent = 'Küldés folyamatban…'; });
}

// Simple i18n (HU/EN)
const dict = {
  en: {
    "nav.services":"Services","nav.work":"Work","nav.pricing":"Pricing","nav.contact":"Contact",
    "nav.login":"Login","nav.register":"Register",
    "hero.title1":"E-commerce","hero.title2":"Website","hero.title3":"AI",
    "hero.lead":"Fast, clean and converting solutions. Magento/Woo/Shopify, custom sites, AI chat, Unity/Unreal, video editing.",
    "cta.workTogether":"Work together","cta.viewServices":"View services",
    "services.title":"Services",
    "work.title":"Clients we’re proud of",
    "pricing.title":"Pricing",
    "contact.title":"Get in touch",
    "contact.text":"WhatsApp, phone or e-mail — I’ll reply with next steps.",
    "form.name":"Your name","form.email":"E-mail","form.message":"Message","form.send":"Send message"
  },
  hu: {
    "nav.services":"Szolgáltatások","nav.work":"Referenciák","nav.pricing":"Árak","nav.contact":"Kapcsolat",
    "nav.login":"Bejelentkezés","nav.register":"Regisztráció",
    "hero.title1":"Webshop","hero.title2":"Weboldal","hero.title3":"AI",
    "hero.lead":"Gyors, letisztult és konvertáló megoldások. Magento/Woo/Shopify, egyedi site, AI chat, Unity/Unreal, videóvágás.",
    "cta.workTogether":"Dolgozzunk együtt","cta.viewServices":"Szolgáltatások",
    "services.title":"Szolgáltatások",
    "work.title":"Akikre büszkék vagyunk",
    "pricing.title":"Árak / csomagok",
    "contact.title":"Vedd fel velem a kapcsolatot",
    "contact.text":"WhatsApp, telefon vagy e-mail – válaszolok, és küldöm a következő lépéseket.",
    "form.name":"Neved","form.email":"E-mail","form.message":"Üzenet","form.send":"Üzenet küldése"
  }
};
const applyLang = (lang)=>{
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const t = dict[lang]?.[key];
    if (t) el.textContent = t;
  });
  document.querySelectorAll('.lang').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  localStorage.setItem('lang', lang);
};
document.querySelectorAll('.lang').forEach(b=>{
  b.addEventListener('click', ()=> applyLang(b.dataset.lang));
});
applyLang(localStorage.getItem('lang') || 'hu');
