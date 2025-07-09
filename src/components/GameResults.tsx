import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Target, TrendingUp, X } from "lucide-react";
import { Navigation } from "./Navigation";
import { GameModeType, getModeDisplayName } from "@/types/modes";

interface GameResults {
  mode: GameModeType;
  gameType: "random" | "review";
  totalCards: number;
  correctAnswers: number;
  wrongAnswers: number;
}

interface GameResultsProps {
  results: GameResults;
  onPlayAgain: () => void;
  onPlayDifferent: () => void;
}

export const GameResults: React.FC<GameResultsProps> = ({
  results,
  onPlayAgain,
  onPlayDifferent,
}) => {
  const percentage = Math.round(
    (results.correctAnswers / results.totalCards) * 100
  );

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Excellent work! 🎉";
    if (percentage >= 75) return "Great job! 👏";
    if (percentage >= 60) return "Good effort! 👍";
    return "Keep practicing! 💪";
  };

  const getPerformanceColor = () => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-blue-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation title="Game Results" />

      <div className="max-w-2xl mx-auto p-6">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-yellow-600" />
            </div>
            <CardTitle className="text-3xl">Game Complete!</CardTitle>
            <p className={`text-xl ${getPerformanceColor()}`}>
              {getPerformanceMessage()}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Target className="w-5 h-5 text-gray-600 mr-2" />
                  <span className="text-sm text-gray-600">Total Cards</span>
                </div>
                <div className="text-3xl font-bold">{results.totalCards}</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">Correct</span>
                </div>
                <div className="text-3xl font-bold text-green-600">
                  {results.correctAnswers}
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <X className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-sm text-gray-600">Wrong</span>
                </div>
                <div className="text-3xl font-bold text-red-600">
                  {results.wrongAnswers}
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="text-4xl font-bold mb-2 text-blue-600">
                {percentage}%
              </div>
              <div className="text-gray-600">Accuracy Score</div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-600 mb-2">
                Mode:{" "}
                <span className="font-semibold">
                  {getModeDisplayName(results.mode)}
                </span>{" "}
                | Type:{" "}
                <span className="font-semibold">
                  {results.gameType.charAt(0).toUpperCase() +
                    results.gameType.slice(1)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={onPlayAgain} className="flex-1">
                Play Again
              </Button>
              <Button
                onClick={onPlayDifferent}
                variant="outline"
                className="flex-1"
              >
                Different Game
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
