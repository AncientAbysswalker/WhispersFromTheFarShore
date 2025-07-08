import { getWrongAnswers } from "./localStorage";

// Define Card type
type Card = {
  text: string;
  subtext: string;
};

// --- Mode 1 cards generated from phonemes.md ---
// Use a more natural key format: "b · /b/" (centered dot with spaces)
const mode1Cards: Record<string, string> = {
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

// Store as mapping: text -> subtext
const mode2Cards: Record<string, string> = {
  Laptop: "Portable computer",
  Monitor: "Displays output",
  Keyboard: "Input device",
  Mouse: "Pointer device",
  Headphones: "Audio output",
  Speaker: "Outputs sound",
  Microphone: "Captures audio",
  Router: "For internet connection",
  Database: "Stores data",
  Server: "Provides resources",
  "Cloud Storage": "Online data storage",
  Network: "Interconnected computers",
  Security: "Protection against threats",
  Firewall: "Blocks unauthorized access",
  Backup: "Copy of data for recovery",
  Update: "Install the latest version",
  Algorithm: "A step-by-step procedure",
  Function: "A block of code that performs a task",
  Variable: "Stores data values",
  Array: "A collection of items",
  Object: "A collection of key-value pairs",
  Class: "Blueprint for creating objects",
  Method: "A function associated with an object",
  Property: "A value associated with an object",
  Loop: "Repeats a block of code",
  Condition: "A statement that evaluates to true or false",
  Boolean: "True or false value",
  String: "A sequence of characters",
  Number: "A numeric value",
  Integer: "A whole number",
  Float: "A number with decimals",
  Character: "A single letter or symbol",
  Input: "Data sent to a program",
  Output: "Data sent from a program",
  Process: "A program in execution",
  Memory: "Stores data for quick access",
  Storage: "Holds data permanently",
  CPU: "The brain of the computer",
  GPU: "Renders images and video",
  RAM: "Temporary data storage",
  Binary: "Base-2 number system",
  Hexadecimal: "Base-16 number system",
  ASCII: "Character encoding standard",
  Unicode: "Universal character encoding",
  Encryption: "Secures data by converting it",
  Compression: "Reduces file size",
  Protocol: "Rules for data exchange",
  API: "Interface for software components",
  Frontend: "Client-side of a web application",
  Backend: "Server-side of a web application",
  Database: "Organized collection of data",
  Framework: "A structure for building applications",
  Library: "A collection of pre-written code",
  Package: "A bundle of software components",
  Module: "A self-contained unit of code",
  Component: "A modular part of a system",
};

// Helper to get shuffled keys
function getShuffledKeys(obj: Record<string, string>): string[] {
  return Object.keys(obj).sort(() => Math.random() - 0.5);
}

// Returns Card[]
export const getCards = (
  mode: "mode1" | "mode2",
  count: number,
  gameType: "random" | "review" = "random"
): Card[] => {
  const cardMap = mode === "mode1" ? mode1Cards : mode2Cards;
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

// Use RUNEWORD SVG generation for the answer side.
// For mode1, use only the portion before the whitespace in the key.
// For mode2, use the full key as the runeword input.
export const getSvg = (
  text: string,
  mode: "mode1" | "mode2" = "mode1"
): string => {
  try {
    // For mode1, only use the portion before the whitespace
    const runeword = mode === "mode1" ? text.split(" · ")[0] : text;

    // Use the RuneWord class to generate the SVG
    return generateRuneWordSvg(mode, runeword);
  } catch (error) {
    console.error("Error generating RuneWord SVG:", error);

    // Fallback SVG if generation fails
    return `
      <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
        <svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="180" height="130" rx="10" fill="#F3F4F6" stroke="#3B82F6" stroke-width="2"/>
          <text x="100" y="75" text-anchor="middle" font-size="24" fill="#222" font-family="monospace">${
            mode === "mode1" ? text.split(" · ")[0] : text
          }</text>
          <text x="100" y="130" text-anchor="middle" font-size="12" fill="#666">${
            mode === "mode1" ? "Rune (IPA)" : "Rune (Word)"
          }</text>
        </svg>
      </div>
    `;
  }
};
