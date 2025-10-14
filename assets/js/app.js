// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Egyszerű üdvözlés
const greetingEl = document.getElementById('greeting');
if (greetingEl){
  const h = new Date().getHours();
  const hello = h < 11 ? 'Jó reggelt' : h < 18 ? 'Szép napot' : 'Szép estét';
  greetingEl.textContent = `${hello}!`;
}

// Későbbi bővítéshez: ide jön majd a chat, animációk, auth stb.
console.log('v1 scaffold betöltve');
