import React, { useEffect, useState } from 'react';
import Line from './components/Line';
const apiUrl = '';
let targetWord;

const App = () => {
  const [solution, setSolution] = useState('hello');
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  //   const fetchWord = async () => {
  //     const response = await fetch();
  //     const wordsList = await response.json();
  //     const targetWord = words[Math.floor(Math.random() * words.length)];
  //   };

  const getWord = async () => {
    const response = await fetch(apiUrl);
    const word = await response.json();
    targetWord = 'Hello';
  };

  getWord();
  setSolution(targetWord);

  useEffect(() => {
    const handleType = (event) => {
      // Prevents user from interacting if the game is over.
      if (isGameOver) return;

      // Checks user input when submitting a five letter string
      if (event.key.toLowerCase() === 'enter') {
        if (currentGuess.length !== 5) return;
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val === null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess('');

        const isCorrect = solution === currentGuess;
        if (isCorrect) setIsGameOver(true);
      }

      // Handle backspace
      if (event.key.toLowerCase() === 'backspace') {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      // If we already have 5 chars do nothing
      if (currentGuess.length >= 5) return;

      if (/[a-z]/.test(event.key.toLowerCase()))
        setCurrentGuess((oldGuess) => oldGuess + event.key);
    };

    window.addEventListener('keydown', handleType);
    return () => window.removeEventListener('keydown', handleType);
  }, [currentGuess, isGameOver, solution, guesses]);

  return (
    <div className="flex gap-1 flex-col">
      {guesses.map((guess, index) => {
        const isCurrentGuess =
          index === guesses.findIndex((val) => val === null);
        return (
          <Line
            key={index}
            guess={isCurrentGuess ? currentGuess : guess ?? ''}
            isFinal={!isCurrentGuess && guess}
            solution={solution}
          />
        );
      })}
      {currentGuess}
    </div>
  );
};

export default App;
