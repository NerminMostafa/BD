// ---- LOCK SCREEN ----
const CORRECT_PIN = '2762002';
let currentPin = '';

// Generate background floating hearts
const bhContainer = document.getElementById('bgHearts');
const bhEmojis = ['🌸','💕','✨','🌷','💝','🌺','💗','⭐'];
for (let i = 0; i < 20; i++) {
const el = document.createElement('div');
el.className = 'bh';
el.textContent = bhEmojis[Math.floor(Math.random() * bhEmojis.length)];
el.style.left = Math.random() * 100 + '%';
el.style.animationDuration = (8 + Math.random() * 10) + 's';
el.style.animationDelay = (Math.random() * 10) + 's';
el.style.fontSize = (14 + Math.random() * 16) + 'px';
bhContainer.appendChild(el);
}

function pressKey(num) {
if (currentPin.length >= 7) return;
currentPin += num;
updateDots();
// sparkle on press
createSparkle(event.clientX, event.clientY);
if (currentPin.length === 7) {
    setTimeout(checkPin, 200);
}
}

function clearPin() {
currentPin = '';
updateDots();
document.getElementById('errorMsg').style.opacity = '0';
}

function updateDots() {
for (let i = 0; i < 7; i++) {
    const dot = document.getElementById('d' + i);
    dot.classList.toggle('filled', i < currentPin.length);
    dot.classList.remove('error');
}
}

function checkPin() {
if (currentPin === CORRECT_PIN) {
    // SUCCESS!
    unlockBirthday();
} else {
    // Error shake
    for (let i = 0; i < 7; i++) {
    document.getElementById('d' + i).classList.add('error');
    }
    document.getElementById('errorMsg').style.opacity = '1';
    setTimeout(() => {
    currentPin = '';
    updateDots();
    }, 800);
}
}

function createSparkle(x, y) {
const sparkles = ['✨','💕','🌸','⭐','✦'];
const el = document.createElement('div');
el.className = 'sparkle';
el.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
el.style.left = (x - 12) + 'px';
el.style.top = (y - 12) + 'px';
document.body.appendChild(el);
setTimeout(() => el.remove(), 700);
}

// Also allow typing on keyboard
document.addEventListener('keydown', (e) => {
if (document.getElementById('lock-screen').style.display !== 'none' &&
    document.getElementById('lock-screen').style.display !== '') return;
if (e.key >= '0' && e.key <= '9') pressKey(e.key);
if (e.key === 'Backspace') clearPin();
if (e.key === 'Enter') checkPin();
});

// ---- UNLOCK SEQUENCE ----
function unlockBirthday() {
const lockScreen = document.getElementById('lock-screen');
lockScreen.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
lockScreen.style.opacity = '0';
lockScreen.style.transform = 'scale(1.05)';

setTimeout(() => {
    lockScreen.style.display = 'none';
    const bday = document.getElementById('birthday-page');
    bday.style.display = 'block';
    bday.style.opacity = '0';
    bday.style.transition = 'opacity 1s ease';
    setTimeout(() => { bday.style.opacity = '1'; }, 50);

    // Start music
    const audio = document.getElementById('birthdaySong');
    audio.volume = 0.4;
    audio.play().catch(() => {});

    // Launch balloons
    launchBalloons();

    // Launch confetti
    launchConfetti();

    // Start floating hearts
    startFloatingHearts();

}, 1200);
}

// ---- BALLOONS ----
function launchBalloons() {
const container = document.getElementById('balloonContainer');
const balloons = ['🎈','🎈','🎈','🎈','🎈','🎀','💗','💕','🎊','🎉','💝','🌸','🌷','❤️'];

// Launch a burst of balloons all at once, only within the first 3s
const burstEnd = Date.now() + 3000;
for (let i = 0; i < 28; i++) {
    const delay = Math.random() * 3000;
    setTimeout(() => {
    if (Date.now() > burstEnd + 500) return;
    const el = document.createElement('div');
    el.className = 'balloon';
    el.textContent = balloons[Math.floor(Math.random() * balloons.length)];
    el.style.left = (3 + Math.random() * 94) + '%';
    const duration = 6 + Math.random() * 7;
    el.style.animationDuration = duration + 's';
    el.style.setProperty('--tilt', (Math.random() * 30 - 15) + 'deg');
    el.style.fontSize = (34 + Math.random() * 22) + 'px';
    container.appendChild(el);
    setTimeout(() => el.remove(), (duration + 2) * 1000);
    }, delay);
}
}

// ---- FLOATING HEARTS ----
function startFloatingHearts() {
const hearts = ['❤️','💕','💗','💝','💖','🌸','✨','💞'];
setInterval(() => {
    const el = document.createElement('div');
    el.className = 'heart-float';
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.left = (Math.random() * 100) + '%';
    el.style.setProperty('--sz', (14 + Math.random() * 20) + 'px');
    const dur = 7 + Math.random() * 8;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = (Math.random() * 2) + 's';
    document.getElementById('birthday-page').appendChild(el);
    setTimeout(() => el.remove(), (dur + 3) * 1000);
}, 600);
}

// ---- CONFETTI ----
function launchConfetti() {
const colors = ['#e8738a','#d4a853','#f5c5d0','#c4536b','#ffd166','#a8d8ea','#c3f0ca','#e0c3fc'];
const shapes = ['square','circle','rect'];
for (let i = 0; i < 120; i++) {
    setTimeout(() => {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = (Math.random() * 100) + 'vw';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.width = (6 + Math.random() * 8) + 'px';
    el.style.height = (6 + Math.random() * 8) + 'px';
    if (Math.random() > 0.5) el.style.borderRadius = '50%';
    const dur = 2.5 + Math.random() * 2;
    el.style.animationDuration = dur + 's';
    el.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
    document.body.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000 + 200);
    }, i * 30);
}
}

// ---- LIGHTBOX ----
function openLightbox(el) {
const emoji = el.dataset.emoji || '📸';
const bg = el.dataset.bg || 'pbg-1';
const caption = el.dataset.caption || '';
const message = el.dataset.message || '';

// Check if real img exists inside
const imgEl = el.querySelector('img');
const photoDiv = document.getElementById('lb-photo');
photoDiv.className = 'photo-inner ' + bg;

if (imgEl) {
    const clone = imgEl.cloneNode();
    clone.style.width = '100%';
    clone.style.height = '100%';
    clone.style.objectFit = 'cover';
    photoDiv.innerHTML = '';
    photoDiv.appendChild(clone);
} else {
    photoDiv.innerHTML = emoji;
}

document.getElementById('lb-caption').textContent = caption;
document.getElementById('lb-message').textContent = message;

const lb = document.getElementById('lightbox');
lb.classList.add('open');
document.body.style.overflow = 'hidden';

// Sparkle burst on open
for (let i = 0; i < 8; i++) {
    setTimeout(() => {
    const rect = document.getElementById('lb-card').getBoundingClientRect();
    createSparkle(
        rect.left + Math.random() * rect.width,
        rect.top + Math.random() * rect.height
    );
    }, i * 60);
}
}

function closeLightbox() {
const lb = document.getElementById('lightbox');
const card = document.getElementById('lb-card');
card.style.animation = 'lbClose 0.25s ease forwards';
document.getElementById('lb-backdrop').style.opacity = '0';
setTimeout(() => {
    lb.classList.remove('open');
    card.style.animation = '';
    document.getElementById('lb-backdrop').style.opacity = '';
    document.body.style.overflow = '';
}, 250);
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') closeLightbox();
});
document.getElementById('birthday-page')?.addEventListener('click', (e) => {
createSparkle(e.clientX, e.clientY);
});

/* LOVE LETTER SLIDER */

const letters = document.querySelectorAll('.love-letter-card');
const prevLetter = document.querySelector('.prev-letter');
const nextLetter = document.querySelector('.next-letter');
const counter = document.getElementById('letterCurrent');

let currentLetter = 0;

function showLetter(index){
letters.forEach(letter=>{
    letter.classList.remove('active');
});

letters[index].classList.add('active');
counter.textContent = index + 1;
}

nextLetter.addEventListener('click',()=>{
currentLetter = (currentLetter + 1) % letters.length;
showLetter(currentLetter);
});

prevLetter.addEventListener('click',()=>{
currentLetter = (currentLetter - 1 + letters.length) % letters.length;
showLetter(currentLetter);
});

showLetter(0);