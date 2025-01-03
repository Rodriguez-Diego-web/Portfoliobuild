import React, { useState, useEffect, useCallback } from 'react';

interface Props {
  onExit: () => void;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const EMPTY_CELL = 0;

const TETROMINOS = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: 'bg-cyan-500',
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: 'bg-blue-500',
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: 'bg-orange-500',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: 'bg-yellow-500',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: 'bg-green-500',
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: 'bg-purple-500',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: 'bg-red-500',
  },
};

const Tetris: React.FC<Props> = ({ onExit }) => {
  const [board, setBoard] = useState<number[][]>(() =>
    Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(EMPTY_CELL))
  );
  const [currentPiece, setCurrentPiece] = useState<{
    shape: number[][];
    position: { x: number; y: number };
    type: keyof typeof TETROMINOS;
  } | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const createNewPiece = useCallback(() => {
    const types = Object.keys(TETROMINOS) as (keyof typeof TETROMINOS)[];
    const type = types[Math.floor(Math.random() * types.length)];
    const shape = TETROMINOS[type].shape;
    return {
      shape,
      position: { x: Math.floor((BOARD_WIDTH - shape[0].length) / 2), y: 0 },
      type,
    };
  }, []);

  const checkCollision = useCallback(
    (piece: typeof currentPiece, board: number[][], offsetX = 0, offsetY = 0) => {
      if (!piece) return false;
      
      return piece.shape.some((row, dy) =>
        row.some((cell, dx) => {
          if (cell === 0) return false;
          const newX = piece.position.x + dx + offsetX;
          const newY = piece.position.y + dy + offsetY;
          return (
            newX < 0 ||
            newX >= BOARD_WIDTH ||
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && board[newY][newX] !== EMPTY_CELL)
          );
        })
      );
    },
    []
  );

  const rotatePiece = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const rotated = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map(row => row[i]).reverse()
    );

    const newPiece = {
      ...currentPiece,
      shape: rotated,
    };

    if (!checkCollision(newPiece, board)) {
      setCurrentPiece(newPiece);
    }
  }, [currentPiece, board, checkCollision, gameOver, isPaused]);

  const movePiece = useCallback(
    (offsetX: number) => {
      if (!currentPiece || gameOver || isPaused) return;

      const newPosition = {
        ...currentPiece.position,
        x: currentPiece.position.x + offsetX,
      };

      if (!checkCollision({ ...currentPiece, position: newPosition }, board)) {
        setCurrentPiece({ ...currentPiece, position: newPosition });
      }
    },
    [currentPiece, board, checkCollision, gameOver, isPaused]
  );

  const dropPiece = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const newPosition = {
      ...currentPiece.position,
      y: currentPiece.position.y + 1,
    };

    if (!checkCollision({ ...currentPiece, position: newPosition }, board)) {
      setCurrentPiece({ ...currentPiece, position: newPosition });
    } else {
      // Piece has landed
      const newBoard = board.map(row => [...row]);
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell !== EMPTY_CELL) {
            const boardY = currentPiece.position.y + y;
            const boardX = currentPiece.position.x + x;
            if (boardY >= 0) {
              newBoard[boardY][boardX] = cell;
            }
          }
        });
      });

      // Check for completed rows
      let completedRows = 0;
      for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
        if (newBoard[y].every(cell => cell !== EMPTY_CELL)) {
          newBoard.splice(y, 1);
          newBoard.unshift(Array(BOARD_WIDTH).fill(EMPTY_CELL));
          completedRows++;
          y++;
        }
      }

      // Update score
      if (completedRows > 0) {
        setScore(score => score + completedRows * 100);
      }

      setBoard(newBoard);
      const newPiece = createNewPiece();
      
      // Check for game over
      if (checkCollision(newPiece, newBoard)) {
        setGameOver(true);
      } else {
        setCurrentPiece(newPiece);
      }
    }
  }, [currentPiece, board, checkCollision, createNewPiece, gameOver, isPaused]);

  useEffect(() => {
    if (!currentPiece) {
      setCurrentPiece(createNewPiece());
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) {
        if (e.key === 'Enter') {
          // Reset game
          setBoard(Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(EMPTY_CELL)));
          setScore(0);
          setGameOver(false);
          setCurrentPiece(createNewPiece());
          setIsPaused(false);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          movePiece(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePiece(1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          dropPiece();
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotatePiece();
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

    const gameLoop = setInterval(() => {
      if (!gameOver && !isPaused) {
        dropPiece();
      }
    }, 1000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(gameLoop);
    };
  }, [
    currentPiece,
    createNewPiece,
    dropPiece,
    movePiece,
    rotatePiece,
    gameOver,
    onExit,
    isPaused,
  ]);

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);

    if (currentPiece && !gameOver) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell !== EMPTY_CELL) {
            const boardY = currentPiece.position.y + y;
            const boardX = currentPiece.position.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = cell;
            }
          }
        });
      });
    }

    return displayBoard.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            className={`w-6 h-6 border border-gray-800 ${
              cell !== EMPTY_CELL
                ? currentPiece && y >= currentPiece.position.y && y < currentPiece.position.y + currentPiece.shape.length
                  ? TETROMINOS[currentPiece.type].color
                  : 'bg-gray-500'
                : 'bg-black'
            }`}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex justify-between w-full">
        <div className="text-green-500">Score: {score}</div>
        <div className="text-orange-500">
          {gameOver ? (
            'Game Over! Press Enter to restart'
          ) : isPaused ? (
            'PAUSED - Press P to continue'
          ) : (
            'Arrow Keys to move | Up to rotate | P to pause | ESC to exit'
          )}
        </div>
      </div>
      <div className="border-2 border-green-500/20 p-2 bg-black/40">
        {renderBoard()}
      </div>
    </div>
  );
};

export default Tetris;
