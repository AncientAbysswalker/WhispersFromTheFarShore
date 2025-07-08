import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ModeSelectorProps {
  onSelectMode: (mode: "mode1" | "mode2") => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Flashcard Learning
          </h1>
          <p className="text-gray-600 text-lg">
            Choose your study mode to begin
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelectMode("mode1")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h2 className="text-2xl font-semibold mb-3">Simple Phonemes</h2>
              <p className="text-gray-600 mb-6">
                Practice simple phonemes (one consonant or vowel) in the
                language of Tunic
              </p>
              <Button className="w-full">Practice Simple Phonemes</Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelectMode("mode2")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h2 className="text-2xl font-semibold mb-3">Whole Words</h2>
              <p className="text-gray-600 mb-6">
                Practice whole words in the language of Tunic
              </p>
              <Button className="w-full">Practice Words</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
