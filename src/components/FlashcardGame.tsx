
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation } from './Navigation';
import { getCardTexts, getSvg } from '../utils/mockData';
import { addWrongAnswer, removeWrongAnswer } from '../utils/localStorage';

interface FlashcardGameProps {
  mode: 'mode1' | 'mode2';
  gameType: 'random' | 'review';
  cardCount?: number;
  onBack: () => void;
  onGameComplete: (results: GameResults) => void;
}

interface GameResults {
  mode: 'mode1' | 'mode2';
  gameType: 'random' | 'review';
  totalCards: number;
  correctAnswers: number;
  wrongAnswers: number;
}

export const FlashcardGame: React.FC<FlashcardGameProps> = ({ 
  mode, 
  gameType, 
  cardCount = 10, 
  onBack, 
  onGameComplete 
}) => {
  const [cards, setCards] = useState<string[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    const cardTexts = getCardTexts(mode, cardCount, gameType);
    setCards(cardTexts);
  }, [mode, cardCount, gameType]);

  const currentCard = cards[currentCardIndex];
  const isLastCard = currentCardIndex === cards.length - 1;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (hasAnswered) return;
    
    setHasAnswered(true);
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      if (gameType === 'review') {
        removeWrongAnswer(mode, currentCard);
      }
    } else {
      setWrongCount(prev => prev + 1);
      if (gameType === 'random') {
        addWrongAnswer(mode, currentCard);
      }
    }
  };

  const handleNext = () => {
    if (isLastCard) {
      onGameComplete({
        mode,
        gameType,
        totalCards: cards.length,
        correctAnswers: correctCount,
        wrongAnswers: wrongCount
      });
    } else {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
      setHasAnswered(false);
    }
  };

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading cards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation 
        title={`${mode.toUpperCase()} - ${gameType.charAt(0).toUpperCase() + gameType.slice(1)}`}
        onBack={onBack} 
        showBack 
      />
      
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-6">
          <div className="text-sm text-gray-600 mb-2">
            Card {currentCardIndex + 1} of {cards.length}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-6">
          <Card 
            className="h-80 cursor-pointer transition-transform hover:scale-105 bg-white"
            onClick={handleFlip}
          >
            <CardContent className="h-full flex items-center justify-center p-8">
              {!isFlipped ? (
                <div className="text-center">
                  <div className="text-2xl font-semibold mb-4">{currentCard}</div>
                  <div className="text-sm text-gray-500">Click to reveal answer</div>
                </div>
              ) : (
                <div className="text-center w-full">
                  <div 
                    className="mx-auto mb-4"
                    dangerouslySetInnerHTML={{ __html: getSvg(currentCard) }}
                  />
                  <div className="text-sm text-gray-500">This is the answer</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {isFlipped && (
          <div className="space-y-4">
            {!hasAnswered ? (
              <div className="text-center">
                <p className="mb-4 text-gray-700">Did you answer correctly?</p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={() => handleAnswer(false)}
                    variant="destructive"
                    className="px-8"
                  >
                    Wrong
                  </Button>
                  <Button 
                    onClick={() => handleAnswer(true)}
                    className="px-8 bg-green-500 hover:bg-green-600"
                  >
                    Right
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Button onClick={handleNext} className="px-8">
                  {isLastCard ? 'Finish Game' : 'Next Card'}
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-600">
          Correct: {correctCount} | Wrong: {wrongCount}
        </div>
      </div>
    </div>
  );
};
