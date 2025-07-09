import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "./Navigation";
import { getWrongAnswers } from "../utils/localStorage";
import { GameMode, GameModeType, getModeDisplayName, getModeValue } from "@/types/modes";

interface ModeExplanationProps {
  mode: GameModeType;
  onBack: () => void;
  onStartGame: (type: "random" | "review", count?: number) => void;
}

export const ModeExplanation: React.FC<ModeExplanationProps> = ({
  mode,
  onBack,
  onStartGame,
}) => {
  const wrongAnswers = getWrongAnswers(getModeValue(mode));
  const reviewAvailable = wrongAnswers.length > 0;

  const getModeConfig = (mode: GameModeType) => {
    switch (mode) {
      case GameMode.SIMPLE:
        return {
          title: "Simple Phonemes",
          description: "Practice individual consonants and vowels in the language of Tunic.",
          color: "blue",
        };
      case GameMode.COMBINED:
        return {
          title: "Combined Phonemes",
          description: "Practice complex phoneme combinations and clusters in the language of Tunic.",
          color: "purple",
        };
      case GameMode.WORD:
        return {
          title: "Whole Words",
          description: "Practice complete words in the language of Tunic.",
          color: "green",
        };
      default:
        return {
          title: "Unknown Mode",
          description: "Unknown mode",
          color: "gray",
        };
    }
  };

  const config = getModeConfig(mode);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation title={config.title} onBack={onBack} showBack />

      <div className="max-w-4xl mx-auto p-6">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {config.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 text-lg mb-6">{config.description}</p>
            <div className="text-sm text-gray-500">
              Wrong answers stored: {wrongAnswers.length}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Random Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Practice with randomly selected cards
              </p>
              <div className="space-y-3">
                <Button
                  className="w-full"
                  onClick={() => onStartGame("random", 10)}
                >
                  10 Cards
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => onStartGame("random", 20)}
                >
                  20 Cards
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => onStartGame("random", 50)}
                >
                  50 Cards
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Review Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Review cards you've previously answered incorrectly
              </p>
              <Button
                className="w-full"
                onClick={() => onStartGame("review")}
                disabled={!reviewAvailable}
              >
                {reviewAvailable
                  ? "Review Wrong Answers"
                  : "No Wrong Answers Yet"}
              </Button>
              {reviewAvailable && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  {Math.min(wrongAnswers.length, 10)} cards available
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
