
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ModeSelectorProps {
  onSelectMode: (mode: 'mode1' | 'mode2') => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Flashcard Learning</h1>
          <p className="text-gray-600 text-lg">Choose your study mode to begin</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelectMode('mode1')}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h2 className="text-2xl font-semibold mb-3">Text Mode 1</h2>
              <p className="text-gray-600 mb-6">Study with the first set of flashcards</p>
              <Button className="w-full">Enter Mode 1</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelectMode('mode2')}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h2 className="text-2xl font-semibold mb-3">Text Mode 2</h2>
              <p className="text-gray-600 mb-6">Study with the second set of flashcards</p>
              <Button className="w-full">Enter Mode 2</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
