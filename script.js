// Fade-in on scroll
const appear = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); appear.unobserve(e.target);} });
},{threshold:.15});
document.querySelectorAll('.fade-section').forEach(s=>appear.observe(s));

// Mobile menu
const burger=document.querySelector('.hamburger');const nav=document.querySelector('.nav');
burger?.addEventListener('click',()=>{ nav.style.display = (nav.style.display==='flex'?'none':'flex'); });

// Filters
const filterButtons=document.querySelectorAll('.chip');const images=document.querySelectorAll('.gallery img');
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
  filterButtons.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const cat=btn.dataset.filter; images.forEach(img=>img.style.display=(cat==='all'||img.dataset.cat===cat)?'block':'none');
}));

// Camera modal
const openCamera=document.getElementById('openCamera');const cameraModal=document.getElementById('cameraModal');const closeCamera=document.getElementById('closeCamera');
openCamera?.addEventListener('click',()=>cameraModal.classList.add('show'));
closeCamera?.addEventListener('click',()=>cameraModal.classList.remove('show'));
cameraModal?.addEventListener('click',e=>{ if(e.target===cameraModal) cameraModal.classList.remove('show'); });

// Carousel (testimonials)
const slides=[...document.querySelectorAll('.slide')]; let idx=0;
setInterval(()=>{ slides[idx].classList.remove('active'); idx=(idx+1)%slides.length; slides[idx].classList.add('active'); }, 4000);

// Back to top
const toTop=document.getElementById('toTop');
window.addEventListener('scroll',()=>{ toTop.classList.toggle('show', window.scrollY>500); });
toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// Cookie notice
const cookie=document.getElementById('cookie'); const cookieAccept=document.getElementById('cookie-accept');
if(!localStorage.getItem('cookie-ok')) cookie.classList.remove('hidden');
cookieAccept?.addEventListener('click',()=>{ localStorage.setItem('cookie-ok','1'); cookie.classList.add('hidden'); });

// i18n
const langData = {
  en:{
    "menu-home":"Home","menu-portfolio":"Portfolio","menu-services":"Services","menu-themes":"Themes","menu-about":"About","menu-reviews":"Reviews","menu-faq":"FAQ","menu-contact":"Contact",
    "rec":"REC",
    "hero-title":"Family wow‑moments — forever",
    "hero-text":"Warm atmosphere, patience, real smiles. Let’s turn every day into memories.",
    "hero-book":"Book now","hero-portfolio":"Portfolio","hero-camera":"Camera mode",
    "booking-title":"Quick booking","booking-sub":"Pick a date and timeslot — we’ll contact you to confirm.","slot":"Timeslot","pkg":"Package",
    "pkg-portrait":"Portrait","pkg-family":"Family","pkg-newborn":"Newborn","pkg-wedding":"Wedding","book-btn":"Send booking",
    "portfolio-title":"Portfolio","portfolio-sub":"Family, maternity, couples and weddings — friendly, natural mood.",
    "filter-all":"All","filter-family":"Family","filter-newborn":"Newborn","filter-couple":"Couple","filter-wedding":"Wedding","filter-studio":"Studio",
    "services-title":"Services & Pricing","services-sub":"Prices include curation and basic retouch. Hair & make‑up on request.",
    "svc-family-title":"Family package","svc-family-1":"90 minutes (studio/outdoor)","svc-family-2":"25 retouched photos","svc-family-3":"Online gallery + download",
    "svc-newborn-title":"Newborn package","svc-newborn-1":"2–3 hours, safe posing","svc-newborn-2":"15 retouched photos + props","svc-newborn-3":"Family images included",
    "svc-couple-title":"Couple package","svc-couple-1":"60 minutes creative session","svc-couple-2":"20 retouched photos","svc-couple-3":"Flexible location",
    "btn-book":"Book","popular":"Popular",
    "themes-title":"Photography themes",
    "theme-family":"Family","theme-family-txt":"Warm, natural vibe focused on shared laughter.",
    "theme-newborn":"Newborn","theme-newborn-txt":"Safe, sterile environment with great patience.",
    "theme-couple":"Couple","theme-couple-txt":"Love stories with cinematic mood.",
    "theme-wedding":"Wedding","theme-wedding-txt":"Documentary style with creative portraits.",
    "reviews-title":"Reviews","rev1":"The best family photos we’ve ever had! Kids loved it.","rev2":"Patient, kind, professional — newborn session was pure magic.","rev3":"Invisible at our wedding, yet captured everything.",
    "about-title":"About me","about-name":"Aurora – lead photographer","about-txt":"8+ years of experience, family‑friendly mood, precise editing. Goal: instant wow.",
    "about-b1":"Full‑frame systems, light shapers","about-b2":"Color‑accurate grading","about-b3":"Delivery in 3–7 business days","about-cta":"Get an appointment",
    "faq-title":"Frequently asked questions",
    "q1":"When will I get the pictures?","a1":"Preview within 48h, finals within 3–7 business days.",
    "q2":"How many photos do I get?","a2":"Depending on package 15–80 retouched images plus full preview gallery.",
    "q3":"Do you travel to locations?","a3":"Yes. Budapest free, beyond with per‑km rate.",
    "contact-title":"Contact","contact-sub":"Tell me your idea — I’ll reply within 24 hours.","send":"Send",
    "cookie-text":"We use cookies to improve your experience.","cookie-accept":"Accept"
  },
  hu:{
    "menu-home":"Főoldal","menu-portfolio":"Portfólió","menu-services":"Szolgáltatások","menu-themes":"Témák","menu-about":"Rólam","menu-reviews":"Vélemények","menu-faq":"GYIK","menu-contact":"Kapcsolat",
    "rec":"REC",
    "hero-title":"Családi „hűha” pillanatok – örökre",
    "hero-text":"Meleg hangulat, türelem, valódi mosolyok. Varázsoljuk emlékké a hétköznapit.",
    "hero-book":"Foglalás most","hero-portfolio":"Portfólió","hero-camera":"Kamera mód",
    "booking-title":"Gyors időpontfoglalás","booking-sub":"Válaszd ki a napot és az idősávot, majd felvesszük veled a kapcsolatot.","slot":"Idősáv","pkg":"Csomag",
    "pkg-portrait":"Portré","pkg-family":"Családi","pkg-newborn":"Újszülött","pkg-wedding":"Esküvő","book-btn":"Elküldöm",
    "portfolio-title":"Portfólió","portfolio-sub":"Család, baba-mama, páros és esküvő — barátságos, természetes hangulat.",
    "filter-all":"Összes","filter-family":"Család","filter-newborn":"Újszülött","filter-couple":"Páros","filter-wedding":"Esküvő","filter-studio":"Stúdió",
    "services-title":"Szolgáltatások és árak","services-sub":"Az árak tartalmazzák a válogatást és az alapretust. Smink és frizura külön kérhető.",
    "svc-family-title":"Családi csomag","svc-family-1":"90 perc fotózás (stúdió/kültér)","svc-family-2":"25 retusált fotó","svc-family-3":"Online galéria + letöltés",
    "svc-newborn-title":"Újszülött csomag","svc-newborn-1":"2–3 óra, biztonságos pózok","svc-newborn-2":"15 retusált fotó + kellékek","svc-newborn-3":"Családi képek az árban",
    "svc-couple-title":"Páros csomag","svc-couple-1":"60 perc kreatív fotózás","svc-couple-2":"20 retusált fotó","svc-couple-3":"Választható helyszín",
    "btn-book":"Foglalok","popular":"Népszerű",
    "themes-title":"Fotózás témái",
    "theme-family":"Család","theme-family-txt":"Meleg, természetes hangulat a közös nevetésekre fókuszálva.",
    "theme-newborn":"Újszülött","theme-newborn-txt":"Biztonságos, steril környezet, nagy türelemmel.",
    "theme-couple":"Páros","theme-couple-txt":"Szerelmes történetek film-hangulatban.",
    "theme-wedding":"Esküvő","theme-wedding-txt":"Dokumentarista stílus, kreatív beállításokkal.",
    "reviews-title":"Vélemények","rev1":"Életünk legszebb családi képei! A gyerekek is imádták.","rev2":"Türelmes, kedves, profi — az újszülött fotózás varázslat volt.","rev3":"Esküvőnkon észrevétlen volt, mégis minden pillanat megvan.",
    "about-title":"Rólam","about-name":"Aurora – vezető fotográfus","about-txt":"8+ év tapasztalat, családbarát légkör, precíz utómunka. A cél: az a bizonyos „hűha”.",
    "about-b1":"Full‑frame rendszerek, fényformálók","about-b2":"Színhelyes color grading","about-b3":"3–7 munkanapos átadás","about-cta":"Időpontot kérek",
    "faq-title":"Gyakori kérdések",
    "q1":"Mikor kapom meg a képeket?","a1":"Válogatót 48 órán belül, végleges képeket 3–7 munkanapon belül küldünk.",
    "q2":"Hány képet kapok?","a2":"Csomagtól függően 15–80 retusált fotó, teljes válogatás webgalérián.",
    "q3":"Utaztok helyszínre?","a3":"Igen, Budapest területén díjmentes, azon kívül km alapú díjjal.",
    "contact-title":"Kapcsolat","contact-sub":"Írd meg röviden az elképzelésed, 24 órán belül válaszolok.","send":"Küldés",
    "cookie-text":"Sütiket használunk a jobb élményhez.","cookie-accept":"Elfogadom"
  }
};
let currentLang='hu';
const successMsgs={hu:'Köszönöm! Hamarosan válaszolok.',en:'Thank you! I will get back to you shortly.'};
let successMsg=successMsgs.hu;

function applyLang(lang){
  currentLang=lang; successMsg=successMsgs[lang];
  document.querySelectorAll('[data-key]').forEach(el=>{
    const key = el.getAttribute('data-key'); const t = langData[lang][key];
    if(!t) return;
    if(el.tagName==='INPUT' || el.tagName==='TEXTAREA'){
      el.placeholder=t;
    } else {
      el.textContent=t;
    }
  });
  document.querySelectorAll('.flag').forEach(f=>f.classList.remove('active'));
  document.getElementById(lang==='hu'?'lang-hu':'lang-en').classList.add('active');
}
document.getElementById('lang-hu')?.addEventListener('click',()=>applyLang('hu'));
document.getElementById('lang-en')?.addEventListener('click',()=>applyLang('en'));
applyLang('hu');
