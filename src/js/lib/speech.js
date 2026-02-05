/**
 * Web Speech API integration for the dashboard.
 * Uses SpeechSynthesis (TTS) and optionally SpeechRecognition.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionResult
 */

let synthesis = null;

function getSynthesis() {
  if (typeof window === "undefined") return null;
  if (!synthesis && window.speechSynthesis) synthesis = window.speechSynthesis;
  return synthesis;
}

/**
 * Ensure speech synthesis is ready (voices loaded). Chrome often needs this before first speak().
 * @param {number} timeoutMs - Max wait for voices (default 800).
 * @returns {Promise<void>}
 */
function ensureReady(timeoutMs = 800) {
  const syn = getSynthesis();
  if (!syn) return Promise.resolve();
  const voices = syn.getVoices();
  if (voices.length > 0) return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => {
      syn.removeEventListener("voiceschanged", done);
      resolve();
    };
    syn.addEventListener("voiceschanged", done);
    setTimeout(done, timeoutMs);
  });
}

/**
 * Prime the synthesis engine with a minimal utterance (fixes Chrome/Safari first speak).
 * @returns {Promise<void>}
 */
function primeSynthesis() {
  const syn = getSynthesis();
  if (!syn) return Promise.resolve();
  return new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance("\u200B");
    u.volume = 0;
    u.rate = 10;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    syn.speak(u);
  });
}

/**
 * Pick the best available voice for the given language.
 * Prefers: default for lang, then any lang match (including premium/Google), then first default.
 * @param {SpeechSynthesisVoice[]} voices
 * @param {string} lang - BCP 47 (e.g. "en-US")
 * @returns {SpeechSynthesisVoice | null}
 */
function selectVoice(voices, lang) {
  if (!voices.length) return null;
  const langPrefix = lang.slice(0, 2);
  const forLang = (v) => v.lang.startsWith(langPrefix) || v.lang.startsWith(lang);
  const defaultForLang = voices.find((v) => forLang(v) && v.default);
  if (defaultForLang) return defaultForLang;
  const anyForLang = voices.find(forLang);
  if (anyForLang) return anyForLang;
  const systemDefault = voices.find((v) => v.default);
  return systemDefault || voices[0];
}

/**
 * Speak text using Speech Synthesis (TTS).
 * Waits for voices, optionally primes the engine, then speaks.
 * @param {string} text - Text to speak.
 * @param {Object} [options] - Options for the utterance.
 * @param {number} [options.rate=1.2] - Speed (0.1 to 10); default 1.2 for natural reading pace.
 * @param {number} [options.pitch=1] - Pitch (0 to 2).
 * @param {number} [options.volume=1] - Volume (0 to 1).
 * @param {string} [options.lang] - BCP 47 language tag (default: document lang or "en-US").
 * @returns {Promise<void>}
 */
export function speak(text, options = {}) {
  const syn = getSynthesis();
  if (!syn || !text) return Promise.resolve();
  const lang = options.lang ?? (document.documentElement.lang || "en-US");
  return ensureReady()
    .then(() => primeSynthesis())
    .then(() => {
      return new Promise((resolve, reject) => {
        const u = new SpeechSynthesisUtterance(text);
        u.rate = options.rate ?? 1.2;
        u.pitch = options.pitch ?? 1;
        u.volume = options.volume ?? 1;
        u.lang = lang;
        const voices = syn.getVoices();
        const chosen = selectVoice(voices, lang);
        if (chosen) u.voice = chosen;
        u.onend = () => resolve();
        u.onerror = (e) => reject(e);
        syn.speak(u);
      });
    });
}

/**
 * Cancel any ongoing speech.
 */
export function cancelSpeech() {
  const syn = getSynthesis();
  if (syn) syn.cancel();
}

/**
 * Check if speech synthesis is available.
 * @returns {boolean}
 */
export function isSpeechSupported() {
  return Boolean(getSynthesis());
}

/**
 * Check if speech recognition is available (Chrome, Edge; not in Firefox).
 * @returns {boolean}
 */
export function isRecognitionSupported() {
  return typeof window !== "undefined" && (
    window.SpeechRecognition || window.webkitSpeechRecognition
  );
}

/**
 * One-shot speech recognition. Resolves with the final transcript or empty string.
 * SpeechRecognitionResultList: results[i] is a SpeechRecognitionResult (has .length, .isFinal, .item(i)).
 * SpeechRecognitionResult.item(0) (or [0]) gives the first SpeechRecognitionAlternative with .transcript.
 * @returns {Promise<string>}
 */
export function listenOnce() {
  if (typeof window === "undefined") return Promise.resolve("");
  const C = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!C) return Promise.resolve("");
  return new Promise((resolve) => {
    const rec = new C();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = document.documentElement.lang || "en-US";
    rec.onresult = (e) => {
      const list = e.results;
      if (!list || list.length === 0) {
        resolve("");
        return;
      }
      const lastResult = list[list.length - 1];
      const firstAlternative = lastResult.length > 0 ? lastResult.item(0) : null;
      const transcript = firstAlternative ? firstAlternative.transcript : "";
      resolve(lastResult.isFinal ? transcript : "");
    };
    rec.onerror = () => resolve("");
    rec.onend = () => {};
    rec.start();
  });
}
