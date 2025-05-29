
export const getWrongAnswers = (mode: 'mode1' | 'mode2'): string[] => {
  const key = `flashcards_wrong_${mode}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

export const addWrongAnswer = (mode: 'mode1' | 'mode2', answer: string): void => {
  const wrongAnswers = getWrongAnswers(mode);
  if (!wrongAnswers.includes(answer)) {
    wrongAnswers.push(answer);
    const key = `flashcards_wrong_${mode}`;
    localStorage.setItem(key, JSON.stringify(wrongAnswers));
  }
};

export const removeWrongAnswer = (mode: 'mode1' | 'mode2', answer: string): void => {
  const wrongAnswers = getWrongAnswers(mode);
  const filtered = wrongAnswers.filter(item => item !== answer);
  const key = `flashcards_wrong_${mode}`;
  localStorage.setItem(key, JSON.stringify(filtered));
};

export const clearWrongAnswers = (mode: 'mode1' | 'mode2'): void => {
  const key = `flashcards_wrong_${mode}`;
  localStorage.removeItem(key);
};
