// Lusta betöltés animáció
const faders = document.querySelectorAll('.fade-section');
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Nyelvváltás
const langData = {
  en: {
    "menu-home": "Home",
    "menu-portfolio": "Portfolio",
    "menu-services": "Services",
    "menu-about": "About",
    "menu-contact": "Contact",
    "hero-title": "Discover the power of light",
    "hero-text": "Aurora Photography – where every moment becomes art.",
    "hero-btn": "View my work",
    "portfolio-title": "Portfolio",
    "services-title": "Services",
    "service1-title": "Portrait Photography",
    "service1-text": "Professional portraits in natural or studio light.",
    "service2-title": "Wedding Photography",
    "service2-text": "Your special day, captured with artistic elegance.",
    "service3-title": "Product Photography",
    "service3-text": "Perfect lighting and composition for your brand.",
    "about-title": "About Me",
    "about-text": "My passion is light, human stories and capturing moments. Aurora Studio makes each picture speak for itself.",
    "contact-title": "Contact",
    "form-name": "Name",
    "form-email": "Email",
    "form-message": "Message",
    "form-send": "Send"
  },
  hu: {
    // Üres objektum, mert a magyar szöveg alapértelmezésként az HTML-ben szerepel
  }
};

const flags = document.querySelectorAll('.flag');
flags.forEach(flag => {
  flag.addEventListener('click', () => {
    flags.forEach(f => f.classList.remove('active'));
    flag.classList.add('active');
    const lang = flag.id;
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      if (langData[lang] && langData[lang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = langData[lang][key];
        } else {
          el.textContent = langData[lang][key];
        }
      } else {
        // Állítsd vissza az alapértelmezett magyar szöveget placeholderre, ha van
        if (lang === 'hu') {
          // Ha van placeholder attribútum, vedd az eredeti placeholdert
          const original = el.getAttribute('placeholder');
          if (original) el.placeholder = original;
        }
      }
    });
  });
});