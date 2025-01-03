import React, { useState, useEffect, useCallback } from 'react';

interface Props {
  onExit: () => void;
}

const GRID_SIZE = 4;
const WINNING_SCORE = 2048;

const Game2048: React.FC<Props> = ({ onExit }) => {
  const [grid, setGrid] = useState<number[][]>(() => initializeGrid());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  function initializeGrid() {
    const newGrid = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
    return addNewTile(addNewTile(newGrid));
  }

  function addNewTile(grid: number[][]) {
    const newGrid = grid.map(row => [...row]);
    const emptyCells = [];
    
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (newGrid[i][j] === 0) {
          emptyCells.push({ i, j });
        }
      }
    }

    if (emptyCells.length > 0) {
      const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      newGrid[i][j] = Math.random() < 0.9 ? 2 : 4;
    }

    return newGrid;
  }

  const moveGrid = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver || isPaused) return;

    let newGrid = grid.map(row => [...row]);
    let moved = false;
    let newScore = score;

    // Rotate grid to handle all directions uniformly
    const rotateGrid = (grid: number[][], times: number): number[][] => {
      let newGrid = grid;
      for (let i = 0; i < times; i++) {
        newGrid = newGrid[0].map((_, colIndex) => 
          newGrid.map(row => row[colIndex]).reverse()
        );
      }
      return newGrid;
    };

    // Rotate grid based on direction
    const rotations = {
      up: 0,
      right: 1,
      down: 2,
      left: 3,
    };

    newGrid = rotateGrid(newGrid, rotations[direction]);

    // Move and merge tiles
    for (let i = 0; i < GRID_SIZE; i++) {
      let row = newGrid[i];
      let newRow = row.filter(cell => cell !== 0);
      
      // Merge adjacent equal numbers
      for (let j = 0; j < newRow.length - 1; j++) {
        if (newRow[j] === newRow[j + 1]) {
          newRow[j] *= 2;
          newScore += newRow[j];
          if (newRow[j] === WINNING_SCORE) {
            setWon(true);
          }
          newRow.splice(j + 1, 1);
          moved = true;
        }
      }
      
      // Fill with zeros
      while (newRow.length < GRID_SIZE) {
        newRow.push(0);
      }
      
      // Check if anything moved
      if (row.some((cell, index) => cell !== newRow[index])) {
        moved = true;
      }
      
      newGrid[i] = newRow;
    }

    // Rotate back
    newGrid = rotateGrid(newGrid, (4 - rotations[direction]) % 4);

    if (moved) {
      newGrid = addNewTile(newGrid);
      setGrid(newGrid);
      setScore(newScore);

      // Check for game over
      const isGameOver = !canMove(newGrid);
      if (isGameOver) {
        setGameOver(true);
      }
    }
  }, [grid, gameOver, isPaused, score]);

  function canMove(grid: number[][]) {
    // Check for empty cells
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === 0) return true;
      }
    }

    // Check for possible merges
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const current = grid[i][j];
        // Check right
        if (j < GRID_SIZE - 1 && current === grid[i][j + 1]) return true;
        // Check down
        if (i < GRID_SIZE - 1 && current === grid[i + 1][j]) return true;
      }
    }

    return false;
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) {
        if (e.key === 'Enter') {
          setGrid(initializeGrid());
          setScore(0);
          setGameOver(false);
          setWon(false);
          setIsPaused(false);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          moveGrid('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveGrid('down');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          moveGrid('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveGrid('right');
          break;
        case 'Escape':
          e.preventDefault();
          onExit();
          break;
        case 'p':
          e.preventDefault();
          setIsPaused(p => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveGrid, gameOver, onExit]);

  const getCellColor = (value: number) => {
    const colors: { [key: number]: string } = {
      2: 'bg-gray-200 text-gray-800',
      4: 'bg-gray-300 text-gray-800',
      8: 'bg-orange-200 text-gray-800',
      16: 'bg-orange-300 text-white',
      32: 'bg-orange-400 text-white',
      64: 'bg-orange-500 text-white',
      128: 'bg-yellow-200 text-gray-800',
      256: 'bg-yellow-300 text-gray-800',
      512: 'bg-yellow-400 text-white',
      1024: 'bg-yellow-500 text-white',
      2048: 'bg-yellow-600 text-white',
    };
    return colors[value] || 'bg-gray-700 text-white';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex justify-between w-full">
        <div className="text-green-500">Score: {score}</div>
        <div className="text-orange-500">
          {gameOver ? (
            'Game Over! Press Enter to restart'
          ) : won ? (
            'You won! Keep going or press Enter to restart'
          ) : isPaused ? (
            'PAUSED - Press P to continue'
          ) : (
            'Arrow Keys to move | P to pause | ESC to exit'
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 p-4 bg-gray-800 rounded-lg">
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-16 h-16 flex items-center justify-center font-bold rounded-lg transition-all duration-100 ${
                cell === 0 ? 'bg-gray-700' : getCellColor(cell)
              }`}
            >
              {cell !== 0 && cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Game2048;
