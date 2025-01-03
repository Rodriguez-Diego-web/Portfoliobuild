import React, { useState, useEffect, useCallback } from 'react';

interface Props {
  onExit: () => void;
}

interface HighScore {
  playerName: string;
  score: number;
  date: string;
}

// Kleineres Spielfeld für bessere Übersicht
const GRID_SIZE = 15;
const CELL_SIZE = 15;
const INITIAL_SNAKE = [{ x: 7, y: 7 }];
const INITIAL_FOOD = { x: 11, y: 11 };
const INITIAL_DIRECTION = { x: 1, y: 0 };
const MAX_HIGH_SCORES = 5;

const Snake: React.FC<Props> = ({ onExit }) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(200); // Langsamerer Start für bessere Kontrolle
  const [isPaused, setIsPaused] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [highScores, setHighScores] = useState<HighScore[]>(() => {
    const saved = localStorage.getItem('snakeHighScores');
    return saved ? JSON.parse(saved) : [];
  });
  const [powerUp, setPowerUp] = useState<{ x: number; y: number; type: 'speed' | 'points' } | null>(null);
  const [powerUpTimeout, setPowerUpTimeout] = useState<NodeJS.Timeout | null>(null);
  const [currentPowerUp, setCurrentPowerUp] = useState<'speed' | 'points' | null>(null);
  const [powerUpDuration, setPowerUpDuration] = useState<NodeJS.Timeout | null>(null);

  // Speichere Highscores
  useEffect(() => {
    localStorage.setItem('snakeHighScores', JSON.stringify(highScores));
  }, [highScores]);

  const generatePowerUp = useCallback(() => {
    if (Math.random() < 0.1 && !powerUp) {
      const type = Math.random() < 0.5 ? 'speed' : 'points';
      let newPowerUp;
      do {
        newPowerUp = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
          type
        };
      } while (
        snake.some(segment => segment.x === newPowerUp.x && segment.y === newPowerUp.y) ||
        (food.x === newPowerUp.x && food.y === newPowerUp.y)
      );
      setPowerUp(newPowerUp);

      if (powerUpTimeout) clearTimeout(powerUpTimeout);
      setPowerUpTimeout(setTimeout(() => setPowerUp(null), 5000));
    }
  }, [snake, food, powerUp, powerUpTimeout]);

  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snake.some(segment => segment.x === newFood.x && segment.y === newFood.y) ||
      (powerUp && powerUp.x === newFood.x && powerUp.y === newFood.y)
    );
    return newFood;
  }, [snake, powerUp]);

  const checkCollision = useCallback((head: { x: number; y: number }) => {
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
  }, [snake]);

  const addHighScore = useCallback((newScore: number) => {
    if (newScore === 0) return;
    setHighScores(prev => {
      const newHighScores = [...prev, { playerName: playerName || 'Anonymous', score: newScore, date: new Date().toLocaleDateString() }]
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_HIGH_SCORES);
      return newHighScores;
    });
  }, [playerName]);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = {
        x: prevSnake[0].x + direction.x,
        y: prevSnake[0].y + direction.y,
      };

      if (checkCollision(head)) {
        setGameOver(true);
        if (score > 0) {
          setShowNameInput(true);
        }
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];
      
      if (powerUp && head.x === powerUp.x && head.y === powerUp.y) {
        if (powerUp.type === 'speed') {
          setSpeed(s => s * 0.8);
          setCurrentPowerUp('speed');
        } else {
          setScore(s => s + 5);
          setCurrentPowerUp('points');
        }
        setPowerUp(null);
        if (powerUpDuration) clearTimeout(powerUpDuration);
        setPowerUpDuration(setTimeout(() => {
          if (powerUp?.type === 'speed') setSpeed(s => s / 0.8);
          setCurrentPowerUp(null);
        }, 5000));
      }

      if (head.x === food.x && head.y === food.y) {
        setFood(generateFood());
        setScore(s => s + (currentPowerUp === 'points' ? 2 : 1));
        generatePowerUp();
        return newSnake;
      }

      newSnake.pop();
      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, checkCollision, generateFood, powerUp, currentPowerUp, generatePowerUp, score]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showNameInput) {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (playerName.trim()) {
            addHighScore(score);
            setShowNameInput(false);
            resetGame();
          }
        }
        // Erlaube Tastatureingabe während der Namenseingabe
        return;
      }

      // Verhindere Standard-Scrolling nur für Spielsteuerung
      e.preventDefault();

      if (e.key === 'Escape') {
        onExit();
        return;
      }

      if (e.key === 'p') {
        setIsPaused(p => !p);
        return;
      }

      if (gameOver && !showNameInput) {
        if (e.key === 'Enter') {
          resetGame();
        }
        return;
      }

      const keyMap: { [key: string]: { x: number; y: number } } = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      };

      const newDirection = keyMap[e.key];
      if (newDirection) {
        // Verhindere 180-Grad-Drehungen
        if (!(direction.x + newDirection.x === 0 && direction.y + newDirection.y === 0)) {
          setDirection(newDirection);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const gameInterval = setInterval(moveSnake, speed);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(gameInterval);
      if (powerUpTimeout) clearTimeout(powerUpTimeout);
      if (powerUpDuration) clearTimeout(powerUpDuration);
    };
  }, [direction, gameOver, moveSnake, onExit, speed, showNameInput, playerName, score, addHighScore, powerUpTimeout, powerUpDuration]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setSpeed(200);
    setIsPaused(false);
    setPowerUp(null);
    setCurrentPowerUp(null);
    setPlayerName('');
  };

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value.slice(0, 15));
  };

  return (
    <div className="relative font-mono max-w-[600px] mx-auto">
      <div className="mb-4 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <div className="text-green-500">Score: {score}</div>
          {currentPowerUp && (
            <div className="text-yellow-500">
              {currentPowerUp === 'speed' ? '🚀 Speed Boost!' : '⭐ Double Points!'}
            </div>
          )}
          <div className="text-orange-500">
            {showNameInput ? (
              <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                <span>Enter your name:</span>
                <input
                  type="text"
                  value={playerName}
                  onChange={handleNameInput}
                  onKeyDown={e => {
                    e.stopPropagation();
                    if (e.key === 'Enter' && playerName.trim()) {
                      e.preventDefault();
                      addHighScore(score);
                      setShowNameInput(false);
                      resetGame();
                    }
                  }}
                  onClick={e => e.stopPropagation()}
                  className="bg-black/40 border border-green-500/20 rounded px-2 py-1 text-green-500 w-32 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Player"
                  autoFocus
                />
              </div>
            ) : gameOver ? (
              'Game Over! Press Enter to restart'
            ) : isPaused ? (
              'PAUSED - Press P to continue'
            ) : (
              'Use Arrow Keys or WASD to move | P to pause | ESC to exit'
            )}
          </div>
        </div>

        {/* Highscores */}
        <div className="text-sm text-green-500/80">
          <div className="font-bold mb-1">High Scores:</div>
          <div className="grid grid-cols-3 gap-4">
            {highScores.map((hs, i) => (
              <div key={i} className="flex justify-between">
                <span>{hs.playerName}</span>
                <span>{hs.score}</span>
                <span className="text-green-500/50">{hs.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="grid gap-px bg-black/40 p-1 rounded-lg border border-green-500/20 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          width: 'fit-content'
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;
          const isHead = snake[0].x === x && snake[0].y === y;
          const isPowerUp = powerUp && powerUp.x === x && powerUp.y === y;

          return (
            <div
              key={i}
              className={`
                w-[15px] h-[15px] rounded-sm transition-colors duration-100
                ${isHead ? 'bg-green-400' : ''}
                ${isSnake && !isHead ? 'bg-green-600' : ''}
                ${isFood ? 'bg-orange-500' : ''}
                ${isPowerUp ? `bg-${powerUp.type === 'speed' ? 'blue' : 'yellow'}-500` : ''}
                ${!isSnake && !isFood && !isPowerUp ? 'bg-black/20' : ''}
              `}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Snake;
