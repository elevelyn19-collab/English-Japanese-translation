# Kids English-to-Japanese Learning Web App

A colorful and interactive web app for children ages 6-12 to learn Japanese words from English using visuals, audio, and games.

## Features

- Translate common English words to Japanese
- Show Japanese in:
  - Hiragana/Katakana
  - Romaji (pronunciation)
- Listen button for Japanese pronunciation
- Kid-friendly image illustrations for each word
- Multi-image mode for better visual understanding
- Flashcards with image + English + Japanese
- Picture quiz with points and stars
- Progress tracking and badges
- Category filters (animals, food, colors, school, nature)
- Voice input (browser support dependent)
- Word of the Day

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- Browser Web Speech APIs (Speech Synthesis + optional Speech Recognition)
- LocalStorage for progress saving

## Project Files

- `index.html` - app structure and UI sections
- `styles.css` - child-friendly visual styles and animations
- `app.js` - app logic, translations, flashcards, quiz, scoring, and persistence
- `kids-english-japanese-app.zip` - packaged version of the app files

## Run Locally

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Use a local server

If you have a local server extension/tool (for example Live Server in VS Code/Cursor), serve the folder and open:

`http://127.0.0.1:5500/index.html`

## Notes

- Voice input requires browser support for `SpeechRecognition` / `webkitSpeechRecognition`.
- Pronunciation uses `SpeechSynthesisUtterance` with `ja-JP` voice where available.

