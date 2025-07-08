
import React, { useState } from 'react';
import { ModeSelector } from '../components/ModeSelector';
import { ModeExplanation } from '../components/ModeExplanation';
import { FlashcardGame } from '../components/FlashcardGame';
import { GameResults } from '../components/GameResults';
import { GameModeType } from '../types/modes';

type AppState = 
  | { screen: 'mode-select' }
  | { screen: 'mode-explanation'; mode: GameModeType }
  | { screen: 'game'; mode: GameModeType; gameType: 'random' | 'review'; cardCount?: number }
  | { screen: 'results'; results: GameResults };

interface GameResults {
  mode: GameModeType;
  gameType: 'random' | 'review';
  totalCards: number;
  correctAnswers: number;
  wrongAnswers: number;
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>({ screen: 'mode-select' });

  const handleSelectMode = (mode: GameModeType) => {
    setAppState({ screen: 'mode-explanation', mode });
  };

  const handleStartGame = (gameType: 'random' | 'review', cardCount?: number) => {
    if (appState.screen === 'mode-explanation') {
      setAppState({ 
        screen: 'game', 
        mode: appState.mode, 
        gameType, 
        cardCount 
      });
    }
  };

  const handleGameComplete = (results: GameResults) => {
    setAppState({ screen: 'results', results });
  };

  const handlePlayAgain = () => {
    if (appState.screen === 'results') {
      const { mode, gameType } = appState.results;
      const cardCount = gameType === 'review' ? undefined : appState.results.totalCards;
      setAppState({ screen: 'game', mode, gameType, cardCount });
    }
  };

  const handlePlayDifferent = () => {
    setAppState({ screen: 'mode-select' });
  };

  const handleBackToModeSelect = () => {
    setAppState({ screen: 'mode-select' });
  };

  const handleBackToExplanation = () => {
    if (appState.screen === 'game') {
      setAppState({ screen: 'mode-explanation', mode: appState.mode });
    }
  };

  switch (appState.screen) {
    case 'mode-select':
      return <ModeSelector onSelectMode={handleSelectMode} />;
    
    case 'mode-explanation':
      return (
        <ModeExplanation 
          mode={appState.mode}
          onBack={handleBackToModeSelect}
          onStartGame={handleStartGame}
        />
      );
    
    case 'game':
      return (
        <FlashcardGame 
          mode={appState.mode}
          gameType={appState.gameType}
          cardCount={appState.cardCount}
          onBack={handleBackToExplanation}
          onGameComplete={handleGameComplete}
        />
      );
    
    case 'results':
      return (
        <GameResults 
          results={appState.results}
          onPlayAgain={handlePlayAgain}
          onPlayDifferent={handlePlayDifferent}
        />
      );
    
    default:
      return <ModeSelector onSelectMode={handleSelectMode} />;
  }
};

export default Index;
