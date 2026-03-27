const WORDS = [
  { en: "dog", kana: "いぬ", romaji: "inu", category: "animals", emoji: "🐶", variants: ["puppy", "happy dog", "brown dog"] },
  { en: "cat", kana: "ねこ", romaji: "neko", category: "animals", emoji: "🐱", variants: ["kitten", "sleepy cat", "white cat"] },
  { en: "bird", kana: "とり", romaji: "tori", category: "animals", emoji: "🐦", variants: ["blue bird", "small bird", "flying bird"] },
  { en: "fish", kana: "さかな", romaji: "sakana", category: "animals", emoji: "🐟", variants: ["gold fish", "sea fish", "striped fish"] },
  { en: "rabbit", kana: "うさぎ", romaji: "usagi", category: "animals", emoji: "🐰", variants: ["white rabbit", "jumping rabbit", "cute rabbit"] },
  { en: "apple", kana: "りんご", romaji: "ringo", category: "food", emoji: "🍎", variants: ["red apple", "green apple", "apple slices"] },
  { en: "banana", kana: "バナナ", romaji: "banana", category: "food", emoji: "🍌", variants: ["yellow banana", "ripe banana", "banana bunch"] },
  { en: "bread", kana: "パン", romaji: "pan", category: "food", emoji: "🍞", variants: ["loaf bread", "toast", "round bread"] },
  { en: "milk", kana: "ぎゅうにゅう", romaji: "gyuunyuu", category: "food", emoji: "🥛", variants: ["milk glass", "milk carton", "fresh milk"] },
  { en: "rice", kana: "ごはん", romaji: "gohan", category: "food", emoji: "🍚", variants: ["rice bowl", "steamed rice", "white rice"] },
  { en: "blue", kana: "あお", romaji: "ao", category: "colors", emoji: "🔵", variants: ["blue paint", "blue balloon", "blue toy"] },
  { en: "red", kana: "あか", romaji: "aka", category: "colors", emoji: "🔴", variants: ["red paint", "red balloon", "red toy"] },
  { en: "green", kana: "みどり", romaji: "midori", category: "colors", emoji: "🟢", variants: ["green paint", "green balloon", "green toy"] },
  { en: "yellow", kana: "きいろ", romaji: "kiiro", category: "colors", emoji: "🟡", variants: ["yellow paint", "yellow balloon", "yellow toy"] },
  { en: "black", kana: "くろ", romaji: "kuro", category: "colors", emoji: "⚫", variants: ["black paint", "black balloon", "black toy"] },
  { en: "book", kana: "ほん", romaji: "hon", category: "school", emoji: "📘", variants: ["storybook", "school book", "open book"] },
  { en: "pencil", kana: "えんぴつ", romaji: "enpitsu", category: "school", emoji: "✏️", variants: ["yellow pencil", "sharp pencil", "color pencil"] },
  { en: "school", kana: "がっこう", romaji: "gakkou", category: "school", emoji: "🏫", variants: ["school building", "small school", "city school"] },
  { en: "teacher", kana: "せんせい", romaji: "sensei", category: "school", emoji: "🧑‍🏫", variants: ["kind teacher", "smiling teacher", "class teacher"] },
  { en: "friend", kana: "ともだち", romaji: "tomodachi", category: "school", emoji: "🧒", variants: ["best friend", "play friend", "school friend"] },
  { en: "sun", kana: "たいよう", romaji: "taiyou", category: "nature", emoji: "☀️", variants: ["morning sun", "bright sun", "sunshine"] },
  { en: "moon", kana: "つき", romaji: "tsuki", category: "nature", emoji: "🌙", variants: ["night moon", "crescent moon", "full moon"] },
  { en: "tree", kana: "き", romaji: "ki", category: "nature", emoji: "🌳", variants: ["big tree", "green tree", "park tree"] },
  { en: "flower", kana: "はな", romaji: "hana", category: "nature", emoji: "🌸", variants: ["pink flower", "garden flower", "spring flower"] },
  { en: "rain", kana: "あめ", romaji: "ame", category: "nature", emoji: "🌧️", variants: ["rain cloud", "light rain", "rainy day"] }
];

const COLORS = ["#ffd7eb", "#d8f0ff", "#fce7b0", "#d8f8dc", "#e2deff"];
const STORAGE_KEY = "nihongo-kids-progress-v1";

const state = {
  points: 0,
  stars: 0,
  learned: [],
  flashcards: [],
  currentWord: null,
  flashIdx: 0,
  flashFlipped: false,
  quizWord: null
};

const el = {
  pointsValue: document.getElementById("pointsValue"),
  starsValue: document.getElementById("starsValue"),
  learnedValue: document.getElementById("learnedValue"),
  wordInput: document.getElementById("wordInput"),
  translateBtn: document.getElementById("translateBtn"),
  quickPicks: document.getElementById("quickPicks"),
  categorySelect: document.getElementById("categorySelect"),
  multiImageToggle: document.getElementById("multiImageToggle"),
  englishWord: document.getElementById("englishWord"),
  jpKana: document.getElementById("jpKana"),
  jpRomaji: document.getElementById("jpRomaji"),
  listenBtn: document.getElementById("listenBtn"),
  flashcardAddBtn: document.getElementById("flashcardAddBtn"),
  imageGallery: document.getElementById("imageGallery"),
  voiceBtn: document.getElementById("voiceBtn"),
  dayEnglish: document.getElementById("dayEnglish"),
  dayJapanese: document.getElementById("dayJapanese"),
  dayRomaji: document.getElementById("dayRomaji"),
  flashcard: document.getElementById("flashcard"),
  prevCardBtn: document.getElementById("prevCardBtn"),
  nextCardBtn: document.getElementById("nextCardBtn"),
  flipCardBtn: document.getElementById("flipCardBtn"),
  quizIllustration: document.getElementById("quizIllustration"),
  quizOptions: document.getElementById("quizOptions"),
  quizFeedback: document.getElementById("quizFeedback"),
  badges: document.getElementById("badges")
};

function createIllustration(emoji, label, color) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="360">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${color}" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>
      </defs>
      <rect width="500" height="360" fill="url(#g)"/>
      <circle cx="250" cy="140" r="95" fill="#ffffffcc"/>
      <text x="250" y="170" text-anchor="middle" font-size="110">${emoji}</text>
      <rect x="110" y="258" width="280" height="62" rx="22" fill="#ffffffdd"/>
      <text x="250" y="298" text-anchor="middle" font-family="Arial" font-size="33" fill="#443f5f">${label}</text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    points: state.points,
    stars: state.stars,
    learned: state.learned,
    flashcards: state.flashcards
  }));
}

function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    state.points = data.points || 0;
    state.stars = data.stars || 0;
    state.learned = Array.isArray(data.learned) ? data.learned : [];
    state.flashcards = Array.isArray(data.flashcards) ? data.flashcards : [];
  } catch (err) {
    console.warn("Could not load progress", err);
  }
}

function award(points, stars = 0) {
  state.points += points;
  state.stars += stars;
  renderScore();
  saveProgress();
}

function renderScore() {
  el.pointsValue.textContent = state.points;
  el.starsValue.textContent = state.stars;
  el.learnedValue.textContent = state.learned.length;
  renderBadges();
}

function renderQuickPicks() {
  const category = el.categorySelect.value;
  const options = WORDS.filter((w) => category === "all" || w.category === category).slice(0, 10);
  el.quickPicks.innerHTML = "";
  options.forEach((word) => {
    const btn = document.createElement("button");
    btn.textContent = `${word.emoji} ${word.en}`;
    btn.addEventListener("click", () => translateWord(word.en));
    el.quickPicks.appendChild(btn);
  });
}

function findWord(raw) {
  const term = raw.trim().toLowerCase();
  if (!term) return null;
  return WORDS.find((w) => w.en === term);
}

function renderTranslation(word) {
  state.currentWord = word;
  el.englishWord.textContent = `${word.emoji} ${word.en.toUpperCase()}`;
  el.jpKana.textContent = word.kana;
  el.jpRomaji.textContent = word.romaji;
  renderImages(word);

  if (!state.learned.includes(word.en)) {
    state.learned.push(word.en);
    award(10, 1);
  } else {
    award(2, 0);
  }
  saveProgress();
}

function renderImages(word) {
  const showAll = el.multiImageToggle.checked;
  const variants = showAll ? word.variants : [word.variants[0]];
  el.imageGallery.innerHTML = "";

  variants.forEach((variant, idx) => {
    const card = document.createElement("div");
    card.className = "image-card";
    const img = document.createElement("img");
    img.src = createIllustration(word.emoji, variant, COLORS[idx % COLORS.length]);
    img.alt = `${word.en} illustration`;
    const caption = document.createElement("p");
    caption.textContent = variant;
    card.appendChild(img);
    card.appendChild(caption);
    el.imageGallery.appendChild(card);
  });
}

function translateWord(input) {
  const word = findWord(input);
  if (!word) {
    el.englishWord.textContent = "Word not found";
    el.jpKana.textContent = "Try one of the quick pick words";
    el.jpRomaji.textContent = "";
    el.imageGallery.innerHTML = "";
    return;
  }
  el.wordInput.value = word.en;
  renderTranslation(word);
}

function speakCurrentWord() {
  if (!state.currentWord) return;
  const utterance = new SpeechSynthesisUtterance(state.currentWord.kana);
  utterance.lang = "ja-JP";
  utterance.rate = 0.85;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
  award(1, 0);
}

function addCurrentToFlashcards() {
  if (!state.currentWord) return;
  if (!state.flashcards.includes(state.currentWord.en)) {
    state.flashcards.push(state.currentWord.en);
    award(8, 1);
    renderFlashcard();
    saveProgress();
  }
}

function getFlashcardWord() {
  const list = state.flashcards.length ? state.flashcards : state.learned;
  if (!list.length) return null;
  const safeIndex = Math.max(0, Math.min(state.flashIdx, list.length - 1));
  state.flashIdx = safeIndex;
  const english = list[safeIndex];
  return WORDS.find((w) => w.en === english) || null;
}

function renderFlashcard() {
  const word = getFlashcardWord();
  if (!word) {
    el.flashcard.innerHTML = "Translate a word and add it to flashcards!";
    return;
  }
  if (!state.flashFlipped) {
    el.flashcard.innerHTML = `<div><img src="${createIllustration(word.emoji, word.variants[0], "#e8ecff")}" alt="flashcard image"><p>${word.en.toUpperCase()}</p></div>`;
  } else {
    el.flashcard.innerHTML = `<div><p style="font-size:2rem;margin:.2rem 0">${word.kana}</p><p>${word.romaji}</p><p>${word.en}</p></div>`;
  }
}

function shiftFlashcard(direction) {
  const list = state.flashcards.length ? state.flashcards : state.learned;
  if (!list.length) return;
  state.flashIdx = (state.flashIdx + direction + list.length) % list.length;
  state.flashFlipped = false;
  renderFlashcard();
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function newQuizQuestion() {
  const pool = WORDS.filter((w) => (el.categorySelect.value === "all" ? true : w.category === el.categorySelect.value));
  state.quizWord = pool[Math.floor(Math.random() * pool.length)];
  const wrong = shuffle(pool.filter((w) => w.en !== state.quizWord.en)).slice(0, 2);
  const options = shuffle([state.quizWord, ...wrong]);

  el.quizIllustration.innerHTML = `<img src="${createIllustration(state.quizWord.emoji, state.quizWord.variants[1], "#fff1cb")}" alt="quiz picture">`;
  el.quizOptions.innerHTML = "";
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = `${opt.kana} (${opt.romaji})`;
    btn.addEventListener("click", () => answerQuiz(opt.en === state.quizWord.en));
    el.quizOptions.appendChild(btn);
  });
  el.quizFeedback.textContent = "";
}

function answerQuiz(correct) {
  if (correct) {
    el.quizFeedback.textContent = "Great job! +15 points +1 star";
    award(15, 1);
  } else {
    el.quizFeedback.textContent = `Nice try! Correct: ${state.quizWord.kana} (${state.quizWord.romaji})`;
    award(2, 0);
  }
  setTimeout(newQuizQuestion, 900);
}

function renderWordOfDay() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now - start) / 86400000);
  const word = WORDS[day % WORDS.length];
  el.dayEnglish.textContent = word.en;
  el.dayJapanese.textContent = word.kana;
  el.dayRomaji.textContent = word.romaji;
}

function renderBadges() {
  const badges = [
    { name: "First 5 Words", unlocked: state.learned.length >= 5 },
    { name: "Word Explorer", unlocked: state.learned.length >= 12 },
    { name: "Quiz Hero", unlocked: state.points >= 120 },
    { name: "Nihongo Star", unlocked: state.stars >= 25 }
  ];
  el.badges.innerHTML = "";
  badges.forEach((b) => {
    const chip = document.createElement("span");
    chip.className = `badge ${b.unlocked ? "unlocked" : ""}`;
    chip.textContent = `${b.unlocked ? "✅" : "🔒"} ${b.name}`;
    el.badges.appendChild(chip);
  });
}

function startVoiceInput() {
  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Rec) {
    alert("Voice input is not supported in this browser.");
    return;
  }
  const recog = new Rec();
  recog.lang = "en-US";
  recog.interimResults = false;
  recog.maxAlternatives = 1;
  recog.start();
  recog.onresult = (event) => {
    const spoken = event.results[0][0].transcript;
    el.wordInput.value = spoken;
    translateWord(spoken);
  };
}

function wireEvents() {
  el.translateBtn.addEventListener("click", () => translateWord(el.wordInput.value));
  el.wordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") translateWord(el.wordInput.value);
  });
  el.listenBtn.addEventListener("click", speakCurrentWord);
  el.flashcardAddBtn.addEventListener("click", addCurrentToFlashcards);
  el.prevCardBtn.addEventListener("click", () => shiftFlashcard(-1));
  el.nextCardBtn.addEventListener("click", () => shiftFlashcard(1));
  el.flipCardBtn.addEventListener("click", () => {
    state.flashFlipped = !state.flashFlipped;
    renderFlashcard();
  });
  el.categorySelect.addEventListener("change", () => {
    renderQuickPicks();
    newQuizQuestion();
  });
  el.multiImageToggle.addEventListener("change", () => {
    if (state.currentWord) renderImages(state.currentWord);
  });
  el.voiceBtn.addEventListener("click", startVoiceInput);
}

function init() {
  loadProgress();
  renderScore();
  renderQuickPicks();
  renderWordOfDay();
  renderFlashcard();
  wireEvents();
  newQuizQuestion();
  translateWord("dog");
}

init();
