// Use the global SVG object from the CDN
import "./classes/RuneWord.js";
import { runeStyle, vowelStyle } from "./helpers/constants.js";

// Use a relative path that works for your build/dev environment.
// If this file is served from /src/lib/ruinseeker/, and your ipa_dictionary.json is in /src/ipa/,
// use the following path:
async function loadIPADict() {
  return await fetch("src/ipa/ipa_dict.json")
    .then((response) => response.json())
    .then((json) => {
      console.log("IPA Dictionary was successfully loaded");
      return json;
    })
    .catch((error) =>
      console.error("An error occured loading the IPA Dictionary: " + error)
    );
}

const ipaDict = await loadIPADict();

// Constants for internal SVG generation modes
const MODE_PHONEME = "mode1"; // Phoneme-based generation (simple & combined)
const MODE_WORD = "mode2"; // Word-based generation

/**
 * Generate a RuneWord SVG for a given text or array of phonemes
 * @param {string} mode - The generation mode (MODE_PHONEME or MODE_WORD)
 * @param {string|string[]} text - The text to generate a RuneWord for, or array of phonemes
 * @returns {string} - The SVG string
 */
export function generateRuneWordSvg(mode, text) {
  // Handle array input for combined phonemes
  let textKey, phonemeArray;
  
  if (Array.isArray(text)) {
    // For combined mode - text is an array of phonemes
    textKey = text.join(""); // Create a key for the dictionary
    phonemeArray = text; // Use the array directly
  } else {
    // For simple/word mode - text is a string
    textKey = text.toLowerCase();
    phonemeArray = [text.toLowerCase()];
  }

  // Create a simple IPA dictionary for the text
  const simpleIpaDict = {
    [textKey]: [phonemeArray],
  };

  // Create props for the RuneWord
  let props = {
    runeStyle: runeStyle.STANDARD,
    vowelStyle: vowelStyle.LOW_CIRCLE,
    segmentLength: 30,
    lineWidth: 4,
    fullHeight: 3.5 * 30 + 4,
    innerWidth: 2 * 0.866 * 30, // sin60 = 0.866
    fullWidth: 2 * 0.866 * 30 + 4,
    ipaDict: ipaDict,
    customIpaDict: {},
  };

  try {
    // Create a container for the SVG
    const container = document.createElement("div");

    // Create an SVG.js instance
    const draw = SVG().addTo(container).size(200, 150);
    const svgTag = container.getElementsByTagName("svg")[0];

    // Add a base rect with stroke color before drawing the RuneWord
    draw.stroke({ color: "#000000" });

    // Create a RuneWord
    let svgString = "";
    console.log(mode);
    if (mode === MODE_PHONEME) {
      draw.rune(props, phonemeArray);
      svgTag.setAttribute("width", 2 * 0.866 * 30 + 4);
      svgTag.setAttribute("height", props.fullHeight);

      // Get the SVG element
      svgString = container.innerHTML;
      console.log(svgString);
    } else if (mode === MODE_WORD) {
      console.log(textKey);
      const runeWord = draw.runeword(props, textKey);
      console.log("schildren");
      console.log(runeWord.runes.length);

      svgTag.setAttribute("width", 2 * 0.866 * 30 * runeWord.runes.length + 4);
      svgTag.setAttribute("height", props.fullHeight);

      svgString = container.innerHTML;
    }

    // Wrap the SVG in a div with centering styles
    return `<div style="display: flex; justify-content: center; align-items: center; width: 100%;">${svgString}</div>`;
  } catch (error) {
    console.error("Error generating SVG:", error);

    // Fallback SVG if generation fails
    return `
      <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
        <svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="180" height="130" rx="10" fill="#F3F4F6" stroke="#3B82F6" stroke-width="2"/>
          <text x="100" y="75" text-anchor="middle" font-size="24" fill="#222" font-family="monospace">${text}</text>
          <text x="100" y="130" text-anchor="middle" font-size="12" fill="#666">Runeword: ${text}</text>
        </svg>
      </div>
    `;
  }
}
