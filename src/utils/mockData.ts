import { getWrongAnswers } from "./localStorage";
import { ModeValue } from "@/types/modes";

// Define Card type
type Card = {
  text: string;
  subtext: string;
};

// --- Simple phoneme cards generated from phonemes.md ---
// Use a more natural key format: "b · /b/" (centered dot with spaces)
const simpleCards: Record<string, string> = {
  "b · /b/": "As in beg and bag",
  "d · /d/": "As in doe and deal",
  "f · /f/": "As in fall and fit",
  "ɡ · /g/": "As in goal and gill",
  "h · /h/": "As in has and him",
  "dʒ · /j/": "As in job and jolt",
  "k · /k/": "As in cap and kite",
  "ɫ · /l/": "As in lip and load",
  "m · /m/": "As in map and moth",
  "n · /n/": "As in net and nip",
  "p · /p/": "As in pin and plot",
  "ɹ · /r/": "As in run and rope",
  "s · /s/": "As in sat and small",
  "t · /t/": "As in toe and tale",
  "v · /v/": "As in vin and volt",
  "w · /w/": "As in wait and wind",
  "j · /y/": "As in yam and yet",
  "z · /z/": "As in zip and zoo",
  "tʃ · /ch/": "As in watch and chime",
  "ʃ · /sh/": "As in shift and short",
  "ŋ · /ng/": "As in ring and sting",
  "θ · /th/ (voiced)": "As in weather and thin",
  "ð · /th/ (unvoiced)": "As in thing and thunder",
  "ʒ · /zh/": "As in genre and division",
  "ɑɹ · /a(r)/": "As in car and far",
  "ɛɹ · /ā(r)/": "As in fair and chair",
  "ɪɹ · /i(r)/": "As in here and steer",
  "ɔɹ · /o(r)/": "As in core and door",
  "ɝ · /u(r)/": "As in fern and burn",
  "eɪ · /ā/": "As in day and eight",
  "i · /ē/": "As in beet and sleep",
  "aɪ · /ī/": "As in pie and sky",
  "oʊ · /ō/": "As in boat and row",
  "æ · /a/": "As in bat and laugh",
  "ɛ · /e/": "As in medical and bread",
  "ɪ · /i/": "As in sit and lip",
  "ɑ · /o/": "As in swan and hot",
  "ə · /u/": "As in shut and cut",
  "ʊ · /oo/": "As in took and could",
  "u · /ōō/": "As in moon and zoo",
  "aʊ · /ow/": "As in mouse and cow",
  "ɔɪ · /oy/": "As in coin and toy",
};
// --- end generated ---

// Load IPA dictionary dynamically for word mode
let ipaDict: Record<string, string[]> = {};

// Function to load IPA dictionary
async function loadIPADict() {
  try {
    const response = await fetch("/ipa_dict.json");
    const data = await response.json();
    ipaDict = data;
    console.log("IPA Dictionary loaded for word mode:", Object.keys(ipaDict).length, "words");
  } catch (error) {
    console.error("Failed to load IPA dictionary for word mode:", error);
  }
}

// Load the dictionary immediately
loadIPADict();

// Consonants from the phonemes table (before vowels)
const consonants = [
  { ipa: "b", description: "As in beg and bag" },
  { ipa: "d", description: "As in doe and deal" },
  { ipa: "f", description: "As in fall and fit" },
  { ipa: "ɡ", description: "As in goal and gill" },
  { ipa: "h", description: "As in has and him" },
  { ipa: "dʒ", description: "As in job and jolt" },
  { ipa: "k", description: "As in cap and kite" },
  { ipa: "ɫ", description: "As in lip and load" },
  { ipa: "m", description: "As in map and moth" },
  { ipa: "n", description: "As in net and nip" },
  { ipa: "p", description: "As in pin and plot" },
  { ipa: "ɹ", description: "As in run and rope" },
  { ipa: "s", description: "As in sat and small" },
  { ipa: "t", description: "As in toe and tale" },
  { ipa: "v", description: "As in vin and volt" },
  { ipa: "w", description: "As in wait and wind" },
  { ipa: "j", description: "As in yam and yet" },
  { ipa: "z", description: "As in zip and zoo" },
  { ipa: "tʃ", description: "As in watch and chime" },
  { ipa: "ʃ", description: "As in shift and short" },
  { ipa: "ŋ", description: "As in ring and sting" },
  { ipa: "θ", description: "As in weather and thin" },
  { ipa: "ð", description: "As in thing and thunder" },
  { ipa: "ʒ", description: "As in genre and division" }
];

// Vowels from the phonemes table (ɑɹ and beyond)
const vowels = [
  { ipa: "ɑɹ", description: "As in car and far" },
  { ipa: "ɛɹ", description: "As in fair and chair" },
  { ipa: "ɪɹ", description: "As in here and steer" },
  { ipa: "ɔɹ", description: "As in core and door" },
  { ipa: "ɝ", description: "As in fern and burn" },
  { ipa: "eɪ", description: "As in day and eight" },
  { ipa: "i", description: "As in beet and sleep" },
  { ipa: "aɪ", description: "As in pie and sky" },
  { ipa: "oʊ", description: "As in boat and row" },
  { ipa: "æ", description: "As in bat and laugh" },
  { ipa: "ɛ", description: "As in medical and bread" },
  { ipa: "ɪ", description: "As in sit and lip" },
  { ipa: "ɑ", description: "As in swan and hot" },
  { ipa: "ə", description: "As in shut and cut" },
  { ipa: "ʊ", description: "As in took and could" },
  { ipa: "u", description: "As in moon and zoo" },
  { ipa: "aʊ", description: "As in mouse and cow" },
  { ipa: "ɔɪ", description: "As in coin and toy" }
];

// Function to generate combined consonant-vowel pairs
function getCombinedCards(): Record<string, string> {
  const cards: Record<string, string> = {};
  
  // Create all possible consonant-vowel combinations (both orders)
  consonants.forEach(consonant => {
    vowels.forEach(vowel => {
      // Consonant + Vowel
      const cvKey = `${consonant.ipa} + ${vowel.ipa}`;
      cards[cvKey] = `Consonant ${consonant.ipa} (${consonant.description.split(' ')[2]}) + Vowel ${vowel.ipa} (${vowel.description.split(' ')[2]})`;
      
      // Vowel + Consonant  
      const vcKey = `${vowel.ipa} + ${consonant.ipa}`;
      cards[vcKey] = `Vowel ${vowel.ipa} (${vowel.description.split(' ')[2]}) + Consonant ${consonant.ipa} (${consonant.description.split(' ')[2]})`;
    });
  });
  
  return cards;
}

// Store as mapping: text -> subtext (for word mode, subtext is phoneme without spaces)
function getWordCards(): Record<string, string> {
  const cards: Record<string, string> = {};
  
  // Convert IPA dictionary to the format we need
  for (const [word, phonemes] of Object.entries(ipaDict)) {
    if (phonemes && phonemes.length > 0) {
      // Use the first phoneme variant and remove spaces
      const phoneme = phonemes[0].replace(/\s+/g, "");
      cards[word] = phoneme;
    }
  }
  
  return cards;
}

// Helper to get shuffled keys
function getShuffledKeys(obj: Record<string, string>): string[] {
  return Object.keys(obj).sort(() => Math.random() - 0.5);
}

// Returns Card[]
export const getCards = (
  mode: ModeValue,
  count: number,
  gameType: "random" | "review" = "random"
): Card[] => {
  let cardMap: Record<string, string>;
  
  if (mode === "simple") {
    cardMap = simpleCards;
  } else if (mode === "combined") {
    cardMap = getCombinedCards();
  } else {
    cardMap = getWordCards();
  }
  if (gameType === "review") {
    const wrongAnswers = getWrongAnswers(mode);
    if (wrongAnswers.length === 0) return [];
    // Only include wrong answers that exist in the mapping
    const cards = wrongAnswers
      .filter((text) => cardMap[text])
      .map((text) => ({ text, subtext: cardMap[text] }));
    // Shuffle and take up to 10
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(10, shuffled.length));
  }
  // Random selection from all keys
  const keys = getShuffledKeys(cardMap).slice(0, count);
  return keys.map((text) => ({ text, subtext: cardMap[text] }));
};

import { generateRuneWordSvg } from "../lib/ruinseeker/generateRuneWordSvg.js";

// Constants for SVG generation modes (legacy system)
const SVG_MODE_PHONEME = "mode1"; // For simple and combined phonemes
const SVG_MODE_WORD = "mode2"; // For complete words

// Use RUNEWORD SVG generation for the answer side.
// For simple/combined modes, use phoneme-based generation.
// For word mode, use word-based generation.
export const getSvg = (
  text: string,
  mode: ModeValue = "simple"
): string => {
  try {
    if (mode === "simple") {
      // For simple mode, only use the portion before the whitespace
      const runeword = text.split(" · ")[0];
      return generateRuneWordSvg(SVG_MODE_PHONEME, runeword);
    } else if (mode === "combined") {
      // For combined mode, extract the phonemes from "ipa1 + ipa2" format and pass as array
      const phonemes = text.split(" + ");
      if (phonemes.length === 2) {
        return generateRuneWordSvg(SVG_MODE_PHONEME, phonemes); // Pass array of phonemes
      } else {
        // Fallback if format is unexpected
        const runeword = text.replace(" + ", "");
        return generateRuneWordSvg(SVG_MODE_PHONEME, runeword);
      }
    } else {
      // For word mode, use the full text
      return generateRuneWordSvg(SVG_MODE_WORD, text);
    }
  } catch (error) {
    console.error("Error generating RuneWord SVG:", error);

    // Fallback SVG if generation fails
    return `
      <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
        <svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="180" height="130" rx="10" fill="#F3F4F6" stroke="#3B82F6" stroke-width="2"/>
          <text x="100" y="75" text-anchor="middle" font-size="24" fill="#222" font-family="monospace">${
            mode === "simple" ? text.split(" · ")[0] : 
            mode === "combined" ? text.replace(" + ", "") : text
          }</text>
          <text x="100" y="130" text-anchor="middle" font-size="12" fill="#666">${
            mode === "simple" ? "Rune (IPA)" : 
            mode === "combined" ? "Rune (Combined)" : "Rune (Word)"
          }</text>
        </svg>
      </div>
    `;
  }
};
