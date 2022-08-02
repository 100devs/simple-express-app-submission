import React from 'react';

const Line = ({ guess, isFinal, solution }) => {
  const tiles = [];
  const wordLength = 5;
  for (let i = 0; i < wordLength; i++) {
    const char = guess[i];
    let bCol = 'bg-white';
    if (isFinal) {
      if (char === solution[i]) bCol = 'bg-lime-600';
      else if (solution.includes(char)) bCol = 'bg-yellow-400';
      else bCol = 'bg-slate-400';
    }

    tiles.push(
      <div
        key={i}
        className={`flex bg w-10 h-10 border-2 border-solid border-black justify-center items-center ${bCol}`}
      >
        {char}
      </div>
    );
  }

  return (
    <div className="flex gap-1 text-xl justify-center items-center uppercase font-bold">
      {tiles}
    </div>
  );
};

export default Line;
