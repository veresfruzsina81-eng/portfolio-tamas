// Preloader
window.addEventListener('load', ()=>{
  setTimeout(()=>document.getElementById('preloader').classList.add('hide'), 200);
});

// Mobile drawer
const burger=document.querySelector('.hamburger');
const drawer=document.getElementById('drawer');
burger?.addEventListener('click',()=>{
  drawer.style.display = drawer.style.display==='block' ? 'none' : 'block';
});

// Parallax hero
const heroMedia=document.querySelector('[data-parallax]');
window.addEventListener('scroll',()=>{
  const y=window.scrollY*0.25;
  heroMedia.style.transform=`translateY(${y}px)`;
});

// Reveal on scroll (for categories and faq)
const revObs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); revObs.unobserve(e.target);} });
},{threshold:.18});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

// Portfolio filters + category short-cuts
const filterButtons=[...document.querySelectorAll('.chip')];
const galleryImgs=[...document.querySelectorAll('.masonry img')];
function applyFilter(cat){
  filterButtons.forEach(b=>b.classList.toggle('active', b.dataset.filter===cat || (cat==='all'&&b.dataset.filter==='all')));
  galleryImgs.forEach(img=> img.style.display = (cat==='all'||img.dataset.cat===cat)?'block':'none');
  // smooth scroll to portfolio
  document.getElementById('portfolio').scrollIntoView({behavior:'smooth'});
}
filterButtons.forEach(btn=>btn.addEventListener('click',()=>applyFilter(btn.dataset.filter)));
document.querySelectorAll('.cat').forEach(card=>card.addEventListener('click',()=>applyFilter(card.dataset.filter)));

// Testimonials carousel
const slides=[...document.querySelectorAll('.slide')]; let idx=0;
setInterval(()=>{ slides[idx].classList.remove('active'); idx=(idx+1)%slides.length; slides[idx].classList.add('active'); }, 4000);

// Back to top
const toTop=document.getElementById('toTop');
window.addEventListener('scroll',()=>{ toTop.classList.toggle('show', window.scrollY>500); });
toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// Camera modal
const openCamera=document.getElementById('openCamera');const cameraModal=document.getElementById('cameraModal');const closeCamera=document.getElementById('closeCamera');
openCamera?.addEventListener('click',()=>cameraModal.classList.add('show'));
closeCamera?.addEventListener('click',()=>cameraModal.classList.remove('show'));
cameraModal?.addEventListener('click',e=>{ if(e.target===cameraModal) cameraModal.classList.remove('show'); });

// i18n
const langData={
  en:{
    "menu-home":"Home","menu-categories":"Categories","menu-portfolio":"Portfolio","menu-services":"Services","menu-about":"About","menu-reviews":"Reviews","menu-faq":"FAQ","menu-contact":"Contact",
    "rec":"REC",
    "hero-title":"Family wow‑moments — forever","hero-text":"Warm atmosphere, patience, real smiles. Let’s turn every day into memories.",
    "hero-btn-1":"Explore","hero-btn-2":"Portfolio","hero-btn-3":"Camera mode",
    "cats-title":"Categories","cats-sub":"Pick a theme — portfolio below will auto‑filter.","cat-family":"Family","cat-newborn":"Newborn","cat-couple":"Couple","cat-wedding":"Wedding","cat-studio":"Studio","cat-product":"Product",
    "portfolio-title":"Portfolio","filter-all":"All","filter-family":"Family","filter-newborn":"Newborn","filter-couple":"Couple","filter-wedding":"Wedding","filter-studio":"Studio","filter-product":"Product",
    "services-title":"Services & Pricing","services-sub":"Prices include curation and basic retouch. Hair & make‑up on request.",
    "svc-family-title":"Family package","svc-family-1":"90 minutes (studio / outdoor)","svc-family-2":"25 retouched photos","svc-family-3":"Online gallery + download",
    "svc-newborn-title":"Newborn package","svc-newborn-1":"2–3 hours, safe posing","svc-newborn-2":"15 retouched photos + props","svc-newborn-3":"Family images included",
    "svc-couple-title":"Couple package","svc-couple-1":"60 minutes creative session","svc-couple-2":"20 retouched photos","svc-couple-3":"Flexible location",
    "btn-book":"Book","popular":"Popular",
    "about-title":"About me","about-txt":"8+ years of experience, family‑friendly mood, precise editing. Goal: the instant wow.","about-b1":"Full‑frame systems, light shapers","about-b2":"Color‑accurate grading","about-b3":"Delivery in 3–7 business days","about-cta":"Get an appointment",
    "reviews-title":"Reviews","rev1":"The best family photos we’ve ever had! Kids loved it.","rev2":"Patient, kind, professional — newborn session was pure magic.","rev3":"Invisible at our wedding, yet captured everything.",
    "faq-title":"Frequently asked questions","q1":"When will I get the pictures?","a1":"Preview within 48h, finals within 3–7 business days.","q2":"How many photos do I get?","a2":"Depending on package 15–80 retouched images plus full preview gallery.","q3":"Do you travel to locations?","a3":"Yes. Budapest free, beyond with per‑km rate.",
    "contact-title":"Contact","contact-sub":"Tell me your idea — I’ll reply within 24 hours.","send":"Send","ph-name":"Name","ph-email":"E‑mail","ph-subject":"Subject","ph-message":"Message"
  },
  hu:{
    "menu-home":"Főoldal","menu-categories":"Kategóriák","menu-portfolio":"Portfólió","menu-services":"Szolgáltatások","menu-about":"Rólam","menu-reviews":"Vélemények","menu-faq":"GYIK","menu-contact":"Kapcsolat",
    "rec":"REC",
    "hero-title":"Családi „hűha” pillanatok – örökre","hero-text":"Meleg hangulat, türelem, valódi mosolyok. Varázsoljuk emlékké a hétköznapit.",
    "hero-btn-1":"Felfedezem","hero-btn-2":"Portfólió","hero-btn-3":"Kamera mód",
    "cats-title":"Kategóriák","cats-sub":"Válassz témát — a portfólió lent automatikusan szűrődik.","cat-family":"Család","cat-newborn":"Újszülött","cat-couple":"Páros","cat-wedding":"Esküvő","cat-studio":"Stúdió","cat-product":"Termék",
    "portfolio-title":"Portfólió","filter-all":"Összes","filter-family":"Család","filter-newborn":"Újszülött","filter-couple":"Páros","filter-wedding":"Esküvő","filter-studio":"Stúdió","filter-product":"Termék",
    "services-title":"Szolgáltatások és árak","services-sub":"Áraink tartalmazzák a válogatást és az alapretust. Smink és frizura kérhető.",
    "svc-family-title":"Családi csomag","svc-family-1":"90 perc (stúdió / kültér)","svc-family-2":"25 retusált fotó","svc-family-3":"Online galéria + letöltés",
    "svc-newborn-title":"Újszülött csomag","svc-newborn-1":"2–3 óra, biztonságos pózok","svc-newborn-2":"15 retusált fotó + kellékek","svc-newborn-3":"Családi képek az árban",
    "svc-couple-title":"Páros csomag","svc-couple-1":"60 perc kreatív fotózás","svc-couple-2":"20 retusált fotó","svc-couple-3":"Választható helyszín",
    "btn-book":"Foglalok","popular":"Népszerű",
    "about-title":"Rólam","about-txt":"8+ év tapasztalat, családbarát légkör, precíz utómunka. A cél: az a bizonyos „hűha”.","about-b1":"Full‑frame rendszerek, fényformálók","about-b2":"Színhelyes color grading","about-b3":"3–7 munkanapos átadás","about-cta":"Időpontot kérek",
    "reviews-title":"Vélemények","rev1":"Életünk legszebb családi képei! A gyerekek is imádták.","rev2":"Türelmes, kedves, profi — az újszülött fotózás varázslat volt.","rev3":"Esküvőnkon észrevétlen volt, mégis minden pillanat megvan.",
    "faq-title":"Gyakori kérdések","q1":"Mikor kapom meg a képeket?","a1":"Válogatót 48 órán belül, végleges képeket 3–7 munkanapon belül küldünk.","q2":"Hány képet kapok?","a2":"Csomagtól függően 15–80 retusált fotó, teljes válogatás webgalérián.","q3":"Utaztok helyszínre?","a3":"Igen, Budapest területén díjmentes, azon kívül km alapú díjjal.",
    "contact-title":"Kapcsolat","contact-sub":"Írd meg röviden az elképzelésed, 24 órán belül válaszolok.","send":"Küldés","ph-name":"Név","ph-email":"E‑mail","ph-subject":"Tárgy","ph-message":"Üzenet"
  }
};
let currentLang='hu';
const successMsgs={hu:'Köszönöm! Hamarosan válaszolok.',en:'Thank you! I will get back to you shortly.'};
let successMsg=successMsgs.hu;

function applyLang(lang){
  currentLang=lang; successMsg=successMsgs[lang];
  document.querySelectorAll('[data-key]').forEach(el=>{
    const key=el.getAttribute('data-key'); const t=langData[lang][key];
    if(!t) return;
    if(el.tagName==='INPUT' || el.tagName==='TEXTAREA'){ el.placeholder=t; }
    else{ el.textContent=t; }
  });
  document.querySelectorAll('.flag').forEach(f=>f.classList.remove('active'));
  document.getElementById(lang==='hu'?'lang-hu':'lang-en').classList.add('active');
}
document.getElementById('lang-hu')?.addEventListener('click',()=>applyLang('hu'));
document.getElementById('lang-en')?.addEventListener('click',()=>applyLang('en'));
applyLang('hu');
