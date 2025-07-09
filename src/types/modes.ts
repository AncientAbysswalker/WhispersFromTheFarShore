export enum GameMode {
  SIMPLE = "simple",
  COMBINED = "combined", 
  WORD = "word"
}

export type GameModeType = GameMode.SIMPLE | GameMode.COMBINED | GameMode.WORD;

// Helper function to get display names for modes
export const getModeDisplayName = (mode: GameModeType): string => {
  switch (mode) {
    case GameMode.SIMPLE:
      return "Simple Phonemes";
    case GameMode.COMBINED:
      return "Combined Phonemes";
    case GameMode.WORD:
      return "Whole Words";
    default:
      return "Unknown Mode";
  }
};

// Type for the actual mode values used throughout the system
export type ModeValue = "simple" | "combined" | "word";

// Helper function to convert enum to string value
export const getModeValue = (mode: GameModeType): ModeValue => {
  switch (mode) {
    case GameMode.SIMPLE:
      return "simple";
    case GameMode.COMBINED:
      return "combined";
    case GameMode.WORD:
      return "word";
    default:
      return "simple";
  }
};
