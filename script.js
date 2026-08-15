/* --------------------------------
   CHANGE THIS DATE
   Put the date you became official.
   Format: Year, Month-1, Day
-------------------------------- */
const relationshipDate = new Date(2026, 3, 12);

/* --------------------------------
   DAYS TOGETHER (index.html)
-------------------------------- */
function updateDays() {
    const el = document.getElementById("daysTogether");
    if (!el) return;
    const today = new Date();
    const diff = today - relationshipDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    el.textContent = days;
}
updateDays();

/* --------------------------------
   HOURS TOGETHER (wrapped.html)
-------------------------------- */
function updateHours() {
    const el = document.getElementById("hoursTogether");
    if (!el) return;
    const today = new Date();
    const diff = today - relationshipDate;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    el.textContent = hours.toLocaleString();
}
updateHours();

/* --------------------------------
   REMEMBER LAST PAGE VISITED
   (so Reasons & Garden can return
   to wherever she came from)
-------------------------------- */
function trackLastPage() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    if (path !== "reasons.html" && path !== "garden.html") {
        sessionStorage.setItem("lastMainPage", path);
    }
}
trackLastPage();

function setBackLink() {
    const el = document.getElementById("backLink");
    if (!el) return;
    el.href = sessionStorage.getItem("lastMainPage") || "index.html";
}
setBackLink();

/* --------------------------------
   ENTER BUTTON (index.html)
-------------------------------- */
function enterWebsite() {
    window.location.href = "story.html";
}

/* --------------------------------
   STAR RAIN
-------------------------------- */
function initStarRain() {
    document.querySelectorAll(".stars span").forEach(star => {
        star.style.left = Math.random() * 100 + "%";
        star.style.animationDuration = (5 + Math.random() * 6) + "s";
        star.style.animationDelay = (Math.random() * 5) + "s";
        star.style.fontSize = (10 + Math.random() * 10) + "px";
    });
}
if (document.querySelector(".stars span")) initStarRain();

/* --------------------------------
   SHOOTING STARS
-------------------------------- */
function spawnShootingStar() {
    const field = document.querySelector(".stars");
    if (!field) return;

    const star = document.createElement("div");
    star.className = "shooting-star";

    const startX = Math.random() * window.innerWidth;
    const duration = 1.5 + Math.random() * 1.5;

    star.style.left = startX + "px";
    star.style.top = "-10px";
    star.style.animation = `shoot ${duration}s linear forwards`;

    field.appendChild(star);
    setTimeout(() => star.remove(), duration * 1000);
}

if (document.querySelector(".stars")) {
    setInterval(spawnShootingStar, 1800 + Math.random() * 1200);
}

/* --------------------------------
   GALLERY FILTER (memories.html)
-------------------------------- */
function filterGallery(category, btn) {
    document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".gallery-item").forEach(item => {
        if (category === "all" || item.dataset.category === category) {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }
    });
}

/* --------------------------------
   WRAPPED CAROUSEL (wrapped.html)
-------------------------------- */
const wrappedSlides = [
    [
        { label: "We spent together", value: "438", icon: "⏱️" },
        { label: "Most used word", value: "SAYANG & BABY", icon: "💬" },
        { label: "Arguments (solved!)", value: "∞", icon: "🙂" }
    ],
    [
        { label: "Dates we went on", value: "4", icon: "🌙" },
        { label: "Photos taken", value: "500+", icon: "📸" },
        { label: "Times we said I love you", value: "∞", icon: "❤️" }
    ]
];
let wrappedIndex = 0;

function renderWrapped() {
    const row = document.getElementById("statsRow");
    const dots = document.getElementById("carouselDots");
    if (!row) return;
    row.innerHTML = "";
    wrappedSlides[wrappedIndex].forEach(stat => {
        row.innerHTML += `
            <div class="stat-card">
                <div class="stat-label">${stat.label}</div>
                <div class="stat-value">${stat.value}</div>
                <div class="stat-icon">${stat.icon}</div>
            </div>`;
    });
    dots.innerHTML = "";
    wrappedSlides.forEach((_, i) => {
        dots.innerHTML += `<span class="${i === wrappedIndex ? "active" : ""}"></span>`;
    });
}
function nextWrapped() {
    wrappedIndex = (wrappedIndex + 1) % wrappedSlides.length;
    renderWrapped();
}
function prevWrapped() {
    wrappedIndex = (wrappedIndex - 1 + wrappedSlides.length) % wrappedSlides.length;
    renderWrapped();
}
if (document.getElementById("statsRow")) renderWrapped();

/* --------------------------------
   LETTERS MODAL (letters.html)
-------------------------------- */
const letters = {
    miss: { title: "You miss me 💌", text: "Hey love, if you're reading this, it means you're missing me right now. Close your eyes and remember that I'm just a call away, and I'm always thinking of you too." },
    badday: { title: "You're having a bad day 💜", text: "I'm sorry today is hard. Whatever happened, it doesn't define you. Take a breath. Tomorrow is a new page, and I'll be right there with you." },
    sleep: { title: "You can't sleep 🤍", text: "Still awake, baby? Put your phone down after this, close your eyes, and imagine me holding your hand. You're safe. Goodnight, love." },
    mad: { title: "You're mad at me 🧡", text: "I know I messed up somehow. I'm sorry. Talk to me when you're ready and I'll listen, I'll fix it, and I'll always choose us." },
    reassurance: { title: "You need reassurance 💚", text: "In case no one told you today: you are enough, you are loved, and you are exactly where you're meant to be. I'm so proud of you." },
    smile: { title: "You want to smile 💛", text: "Remember that one time we couldn't stop laughing over nothing? Yeah. That. Have a big smile,  you look really pretty when you do." }
};
function openLetter(key) {
    const data = letters[key];
    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalText").textContent = data.text;
    document.getElementById("letterModal").classList.add("open");
}
function closeLetter() {
    document.getElementById("letterModal").classList.remove("open");
}

/* --------------------------------
   BUCKET LIST (future.html)
-------------------------------- */
function toggleBucket(el, key) {
    el.classList.toggle("done");
    const done = el.classList.contains("done");
    localStorage.setItem("bucket-" + key, done);
    el.querySelector(".check").textContent = done ? "✓" : "";
}
function loadBucketState() {
    document.querySelectorAll(".bucket-item").forEach(item => {
        const key = item.dataset.key;
        const done = localStorage.getItem("bucket-" + key) === "true";
        if (done) {
            item.classList.add("done");
            item.querySelector(".check").textContent = "✓";
        }
    });
}
if (document.querySelector(".bucket-list")) loadBucketState();

/* --------------------------------
   SECRET TERMINAL (secret.html)
-------------------------------- */
const terminalLines = [
    "~/heart$ ./love.sh", "",
    "Initializing...           [100%]",
    "Loading memories...       [100%]",
    "Loading photos...         [100%]",
    "Loading messages...       [100%]",
    "Loading love...           [100%]", "",
    "Compilation successful.  ♥",
    "--- heart.txt ---", "",
    "STATUS: ACTIVE",
    "UPTIME: 365 DAYS+",
    "ERRORS:  MANY 😅",
    "RESTARTS: 0", "",
    "STATUS: STILL CHOOSING YOU",
    "Process completed successfully. ♥"
];
function typeTerminal() {
    const box = document.getElementById("terminalBody");
    if (!box) return;
    let i = 0;
    function typeLine() {
        if (i >= terminalLines.length) { renderHeart(); return; }
        const p = document.createElement("div");
        p.className = "terminal-line";
        p.textContent = terminalLines[i];
        box.appendChild(p);
        i++;
        setTimeout(typeLine, 180);
    }
    typeLine();
}
function renderHeart() {
    const heart = document.getElementById("pixelHeart");
    if (!heart) return;
    const pattern = [
    "00111100111100","00111100111100","11111111111111","11111111111111",
    "11111111111111","11111111111111","00111111111100","00111111111100",
    "00001111110000","00001111110000","00000011000000","00000011000000"
];
    heart.innerHTML = "";
    pattern.forEach(row => {
        row.split("").forEach(bit => {
            const cell = document.createElement("div");
            cell.className = bit === "1" ? "on" : "off";
            heart.appendChild(cell);
        });
    });
}
if (document.getElementById("terminalBody")) typeTerminal();

/* --------------------------------
   COMPLIMENT GENERATOR (reasons.html)
-------------------------------- */
const compliments = [
    "You are so loved.",
    "Your smile makes everything better.",
    "You are stronger than you think.",
    "You make ordinary days feel special.",
    "You are enough, just as you are.",
    "Your laugh is my favorite sound.",
    "You deserve every good thing coming your way.",
    "You handle hard things with so much grace.",
    "I'm so proud of who you are.",
    "You light up every room you're in.",
    "You are worth all the love you give others.",
    "Today is lucky to have you in it.",
    "You're doing better than you realize.",
    "Your heart is one of the best things about you.",
    "You are my favorite person, always."
];
function newCompliment() {
    const card = document.getElementById("complimentCard");
    if (!card) return;
    const msg = compliments[Math.floor(Math.random() * compliments.length)];
    card.classList.remove("pop");
    void card.offsetWidth;
    card.textContent = msg;
    card.classList.add("pop");
}

/* --------------------------------
   REASONS I LOVE YOU JAR (reasons.html)
-------------------------------- */
const reasons = [
    "The way you laugh at your own jokes before finishing them.",
    "How you always check if I've eaten.",
    "Your patience, even when I don't deserve it.",
    "The way you get excited over small things.",
    "How you remember tiny details I forgot I said.",
    "Your kindness toward everyone, even strangers.",
    "The way you say my name.",
    "How you always try to make things right.",
    "Your determination, even when things get hard.",
    "The way you care for people around you.",
    "How safe I feel when I'm with you.",
    "Your honesty, even when it's hard to say.",
    "The way you make me want to be better.",
    "How you never give up on us.",
    "Your quiet strength on hard days.",
    "The way you look when you're focused on something you love.",
    "How you always find a reason to smile.",
    "Your voice — it calms me instantly.",
    "How you make home feel like home.",
    "Simply, you being you."
];
let jarPool = [];

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function initJar() {
    const stored = JSON.parse(localStorage.getItem("jarPool") || "null");
    if (stored && stored.length) {
        jarPool = stored;
    } else {
        jarPool = shuffleArray([...Array(reasons.length).keys()]);
        localStorage.setItem("jarPool", JSON.stringify(jarPool));
    }
    updateJarUI();
}

function pullNote() {
    if (!jarPool.length) {
        jarPool = shuffleArray([...Array(reasons.length).keys()]);
    }
    const idx = jarPool.pop();
    localStorage.setItem("jarPool", JSON.stringify(jarPool));

    const note = document.getElementById("jarNote");
    note.classList.remove("pop");
    void note.offsetWidth;
    note.textContent = reasons[idx];
    note.classList.add("pop");

    updateJarUI();
}

function updateJarUI() {
    const total = reasons.length;
    const pulled = total - jarPool.length;
    const bar = document.getElementById("jarProgressBar");
    const count = document.getElementById("jarCount");
    if (bar) bar.style.width = (pulled / total * 100) + "%";
    if (count) count.textContent = pulled + " of " + total + " notes pulled";
}

function resetJar() {
    jarPool = shuffleArray([...Array(reasons.length).keys()]);
    localStorage.setItem("jarPool", JSON.stringify(jarPool));
    document.getElementById("jarNote").textContent = "Pull a note to reveal a reason ♥";
    updateJarUI();
}

if (document.getElementById("jarNote")) initJar();

/* --------------------------------
   LIGHTBOX (click to zoom images)
-------------------------------- */
function openLightbox(src) {
    let overlay = document.getElementById("lightboxOverlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "lightboxOverlay";
        overlay.className = "lightbox-overlay";
        overlay.innerHTML = `
            <button class="lightbox-close" onclick="closeLightbox()">✕</button>
            <img id="lightboxImg" src="" alt="Zoomed photo">
        `;
        document.body.appendChild(overlay);
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) closeLightbox();
        });
    }
    document.getElementById("lightboxImg").src = src;
    overlay.classList.add("open");
}

function closeLightbox() {
    const overlay = document.getElementById("lightboxOverlay");
    if (overlay) overlay.classList.remove("open");
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});

/* Auto-attach zoom to gallery, timeline, and home photo */
document.querySelectorAll(".gallery-item img, .timeline-card img, .photo-frame img").forEach(img => {
    img.classList.add("zoomable");
    img.addEventListener("click", () => openLightbox(img.src));
});


/* --------------------------------
   VIRTUAL GARDEN (garden.html)
-------------------------------- */
const flowerStages = {
    pink: ["🪴", "🌱", "🌿", "🌷", "🌸"],
    yellow: ["🪴", "🌱", "🌿", "🌼", "🌻"]
};

const WATER_COOLDOWN_HOURS = 4; // hours between waterings

let gardenState = {
    type: null,
    level: 0,
    lastWatered: null
};

function loadGardenState() {
    const saved = JSON.parse(localStorage.getItem("gardenState") || "null");
    if (saved) gardenState = saved;
}

function saveGardenState() {
    localStorage.setItem("gardenState", JSON.stringify(gardenState));
}

function selectFlower(type) {
    if (gardenState.type) return; // already growing one
    gardenState.type = type;
    gardenState.level = 0;
    gardenState.lastWatered = null;
    saveGardenState();
    renderGarden();
}

function waterFlower() {
    if (!gardenState.type) return;

    const now = Date.now();
    if (gardenState.lastWatered) {
        const hoursSince = (now - gardenState.lastWatered) / (1000 * 60 * 60);
        if (hoursSince < WATER_COOLDOWN_HOURS) {
            const hoursLeft = (WATER_COOLDOWN_HOURS - hoursSince).toFixed(1);
            alert(`Your flower is resting 🌙 Come back to water it again in about ${hoursLeft} hour(s).`);
            return;
        }
    }

    if (gardenState.level < flowerStages[gardenState.type].length - 1) {
        gardenState.level++;
        gardenState.lastWatered = now;
        saveGardenState();
        renderGarden(true);
    }
}

function addToGarden() {
    const collection = JSON.parse(localStorage.getItem("gardenCollection") || "[]");
    collection.push({
        type: gardenState.type,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem("gardenCollection", JSON.stringify(collection));

    gardenState = { type: null, level: 0, lastWatered: null };
    saveGardenState();
    renderGarden();
    renderCollection();
}

function renderGarden(grew) {
    const potDisplay = document.getElementById("potDisplay");
    const progressBar = document.getElementById("growthProgressBar");
    const label = document.getElementById("growthLabel");
    const picker = document.getElementById("flowerPicker");
    const waterBtn = document.getElementById("waterBtn");
    const addBtn = document.getElementById("addToGardenBtn");
    const note = document.getElementById("waterNote");

    if (!potDisplay) return;

    if (!gardenState.type) {
        potDisplay.textContent = "🪴";
        progressBar.style.width = "0%";
        label.textContent = "Pick a flower to start planting";
        picker.style.display = "flex";
        waterBtn.style.display = "none";
        addBtn.style.display = "none";
        note.style.display = "none";
        return;
    }

    picker.style.display = "none";
    const stages = flowerStages[gardenState.type];
    const maxLevel = stages.length - 1;

    potDisplay.textContent = stages[gardenState.level];
    if (grew) {
        potDisplay.classList.remove("grew");
        void potDisplay.offsetWidth;
        potDisplay.classList.add("grew");
    }

    progressBar.style.width = (gardenState.level / maxLevel * 100) + "%";

    if (gardenState.level >= maxLevel) {
        label.textContent = "Fully bloomed! 🎉";
        waterBtn.style.display = "none";
        addBtn.style.display = "inline-flex";
        note.style.display = "none";
    } else {
        label.textContent = `Growing... (${gardenState.level}/${maxLevel})`;
        waterBtn.style.display = "inline-flex";
        addBtn.style.display = "none";
        note.style.display = "block";
    }
}

function renderCollection() {
    const grid = document.getElementById("gardenGrid");
    const empty = document.getElementById("gardenEmpty");
    if (!grid) return;

    const collection = JSON.parse(localStorage.getItem("gardenCollection") || "[]");

    if (!collection.length) {
        grid.innerHTML = "";
        empty.style.display = "block";
        return;
    }

    empty.style.display = "none";
    grid.innerHTML = collection.map(f => `
        <div class="garden-flower">
            <div class="emoji">${flowerStages[f.type][flowerStages[f.type].length - 1]}</div>
            <div class="date">${f.date}</div>
        </div>
    `).join("");
}

if (document.getElementById("potDisplay")) {
    loadGardenState();
    renderGarden();
    renderCollection();
}

/* --------------------------------
   ENVELOPE OPENING + FIREWORKS (wish.html)
-------------------------------- */
function openEnvelope() {
    const envelope = document.getElementById("envelopeBox");
    if (!envelope || envelope.classList.contains("open")) return;

    playSong(); // moved to the very top — must run in direct response to the tap

    envelope.classList.add("open");

    setTimeout(() => {
        document.getElementById("letterReveal").classList.add("open");
        startFireworks();
    }, 1500);
}
function closeLetterReveal() {
    document.getElementById("letterReveal").classList.remove("open");

    const envelope = document.getElementById("envelopeBox");
    if (envelope) envelope.classList.remove("open");
}

/* --------------------------------
   ENVELOPE OPENING + NONSTOP FIREWORKS + MUSIC (wish.html)
-------------------------------- */
let fireworksInterval = null;

function openEnvelope() {
    const envelope = document.getElementById("envelopeBox");
    if (!envelope || envelope.classList.contains("open")) return;

    envelope.classList.add("open");

    setTimeout(() => {
        document.getElementById("letterReveal").classList.add("open");
        startFireworks();
        playSong();
    }, 1500);
}

function closeLetterReveal() {
    document.getElementById("letterReveal").classList.remove("open");

    const envelope = document.getElementById("envelopeBox");
    if (envelope) envelope.classList.remove("open");

    stopFireworks();
    pauseSong();
}

function startFireworks() {
    const layer = document.getElementById("fireworksLayer");
    if (!layer) return;

    if (fireworksInterval) return; // already running

    const colors = ["#f3a7cf", "#e78abb", "#a86bd0", "#f5e6a6", "#ffffff"];

    fireworksInterval = setInterval(() => {
        const originX = 10 + Math.random() * 80;
        const originY = 15 + Math.random() * 50;
        createBurst(layer, originX, originY, colors);
    }, 500);
}

function stopFireworks() {
    if (fireworksInterval) {
        clearInterval(fireworksInterval);
        fireworksInterval = null;
    }
}

function createBurst(layer, xPercent, yPercent, colors) {
    const particleCount = 18;
    const heartCount = 5;

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement("div");
        p.className = "firework-particle";

        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 60 + Math.random() * 60;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        const size = 4 + Math.random() * 4;
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = xPercent + "%";
        p.style.top = yPercent + "%";
        p.style.setProperty("--tx", tx + "px");
        p.style.setProperty("--ty", ty + "px");
        p.style.animation = "burst 0.9s ease-out forwards";

        layer.appendChild(p);
        setTimeout(() => p.remove(), 900);
    }

    for (let i = 0; i < heartCount; i++) {
        const h = document.createElement("div");
        h.className = "firework-heart";
        h.textContent = "♥";

        const angle = (Math.PI * 2 * i) / heartCount + Math.random();
        const distance = 40 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        h.style.color = colors[Math.floor(Math.random() * colors.length)];
        h.style.left = xPercent + "%";
        h.style.top = yPercent + "%";
        h.style.setProperty("--tx", tx + "px");
        h.style.setProperty("--ty", ty + "px");
        h.style.animation = "burst 1.1s ease-out forwards";

        layer.appendChild(h);
        setTimeout(() => h.remove(), 1100);
    }
}

/* --------------------------------
   YOUTUBE SONG (wish.html)
-------------------------------- */
let ytPlayer = null;
let ytReady = false;

function loadYouTubeAPI() {
    if (window.YT) { ytReady = true; return; }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
}

window.onYouTubeIframeAPIReady = function () {
    const CHORUS_START = 164; // change to your chorus start time (seconds)
const CHORUS_END = 181.2;   // change to your chorus end time (seconds)

let loopChecker = null;

ytPlayer = new YT.Player("ytPlayer", {
    videoId: "RPvhItA3lIM",
    playerVars: { autoplay: 0, controls: 0, start: CHORUS_START },
    events: {
        onReady: () => { ytReady = true; },
        onStateChange: (event) => {
            if (event.data === YT.PlayerState.PLAYING) {
                if (loopChecker) clearInterval(loopChecker);
                loopChecker = setInterval(() => {
                    if (ytPlayer.getCurrentTime() >= CHORUS_END) {
                        ytPlayer.seekTo(CHORUS_START, true);
                    }
                }, 300);
            }
            if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                if (loopChecker) clearInterval(loopChecker);
            }
        }
    }
});
}

function playSong() {
    if (ytReady && ytPlayer && ytPlayer.playVideo) {
        ytPlayer.playVideo();
    }
}

function pauseSong() {
    if (ytReady && ytPlayer && ytPlayer.pauseVideo) {
        ytPlayer.pauseVideo();
    }
}

if (document.getElementById("ytPlayer")) loadYouTubeAPI();

function createBurst(layer, xPercent, yPercent, colors) {
    const particleCount = 18;
    const heartCount = 5;

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement("div");
        p.className = "firework-particle";

        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 60 + Math.random() * 60;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        const size = 4 + Math.random() * 4;
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = xPercent + "%";
        p.style.top = yPercent + "%";
        p.style.setProperty("--tx", tx + "px");
        p.style.setProperty("--ty", ty + "px");
        p.style.animation = "burst 0.9s ease-out forwards";

        layer.appendChild(p);
        setTimeout(() => p.remove(), 900);
    }

    for (let i = 0; i < heartCount; i++) {
        const h = document.createElement("div");
        h.className = "firework-heart";
        h.textContent = "♥";

        const angle = (Math.PI * 2 * i) / heartCount + Math.random();
        const distance = 40 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        h.style.color = colors[Math.floor(Math.random() * colors.length)];
        h.style.left = xPercent + "%";
        h.style.top = yPercent + "%";
        h.style.setProperty("--tx", tx + "px");
        h.style.setProperty("--ty", ty + "px");
        h.style.animation = "burst 1.1s ease-out forwards";

        layer.appendChild(h);
        setTimeout(() => h.remove(), 1100);
    }
}
