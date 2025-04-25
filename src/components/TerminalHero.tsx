import React, { useState, useEffect, useRef } from 'react';
import { commands, fileSystem, isGameCommand } from '../utils/terminalCommands';
import { TerminalResponse, Command, CommandResponse } from '../types/terminal';
import MatrixRain from './MatrixRain';
import SnakeGame from './TerminalGames/Snake';
import TetrisGame from './TerminalGames/Tetris';
import Game2048 from './TerminalGames/Game2048';

type GameType = 'snake' | 'tetris' | '2048' | null;

// Typdefinition für verfügbare Befehle
type CommandKey = keyof typeof commands;

const TerminalHero: React.FC = () => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<Command[]>([
    { text: 'Welcome to my interactive portfolio terminal! Type \'help\' for available commands.', type: 'text' },
    { text: '\nVersion 2.0.0 (portfolio-os)\n', type: 'text' }
  ]);
  const [currentDirectory, setCurrentDirectory] = useState(fileSystem);
  const [currentPath, setCurrentPath] = useState('~');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showMatrix, setShowMatrix] = useState(false);
  const [currentGame, setCurrentGame] = useState<GameType>(null);
  const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1);
  const [commandHistoryBuffer, setCommandHistoryBuffer] = useState<string[]>([]);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const handleCommand = (cmd: string) => {
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();
    
    let response: CommandResponse = [];

    // Füge die Kommandozeile zum Verlauf hinzu
    setCommandHistory(prev => [
      ...prev,
      { text: `${currentPath} $ ${cmd}`, type: 'command', response: [] }
    ]);

    try {
      // Spezielle Befehle zuerst verarbeiten
      if (command === 'time') {
        const now = new Date();
        response = [`Current time: ${now.toLocaleTimeString()}`];
      } else if (command === 'weather') {
        response = [
          'Weather for Cuxhaven, Germany:',
          '🌤️  Currently: Partly Cloudy, 18°C',
          '🌡️  Today: High 21°C, Low 14°C',
          '💨  Wind: 15 km/h',
          '💧  Humidity: 71%',
          '',
          'Note: This is demo weather data.'
        ];
      }
      // Andere Befehle prüfen
      else if (!Object.prototype.hasOwnProperty.call(commands, command)) {
        response = [{ 
          text: `Command not found: ${command}. Type 'help' for available commands.`,
          type: 'error'
        }];
        
        // Füge die Antwort zum Verlauf hinzu und beende
        setCommandHistory(prev => [
          ...prev,
          { text: '', type: 'response', response }
        ]);
        
        setCommandHistoryBuffer(prev => [...prev, cmd]);
        setCommandHistoryIndex(-1);
        return;
      }

      const commandKey = command as CommandKey;

      // Handle special cases
      if (commandKey === 'cd' && args[1]) {
        try {
          const newDir = commands.cd(args[1], currentDirectory);
          if (newDir) {
            setCurrentDirectory(newDir);
            setCurrentPath(prev => 
              args[1] === '..' 
                ? prev.split('/').slice(0, -1).join('/') || '~'
                : `${prev}/${args[1]}`
            );
          }
        } catch (error) {
          response = [{ 
            text: error instanceof Error ? error.message : 'Navigation error',
            type: 'error'
          }];
          
          setCommandHistory(prev => [
            ...prev,
            { text: '', type: 'response', response }
          ]);
        }
        
        setCommandHistoryBuffer(prev => [...prev, cmd]);
        setCommandHistoryIndex(-1);
        return;
      }

      // Clear - leert den Verlauf
      if (commandKey === 'clear') {
        setCommandHistory([]);
        
        setCommandHistoryBuffer(prev => [...prev, cmd]);
        setCommandHistoryIndex(-1);
        return;
      }
      
      // Spiele starten
      if (isGameCommand(command)) {
        setCurrentGame(command as GameType);
        
        // Spielstart-Nachricht anzeigen
        let gameResponse: CommandResponse = [];
        if (commandKey === 'snake') {
          gameResponse = commands.snake();
        } else if (commandKey === 'tetris') {
          gameResponse = commands.tetris();
        } else if (commandKey === '2048') {
          gameResponse = commands['2048']();
        }
        
        setCommandHistory(prev => [
          ...prev,
          { text: '', type: 'response', response: gameResponse }
        ]);
        
        setCommandHistoryBuffer(prev => [...prev, cmd]);
        setCommandHistoryIndex(-1);
        return;
      }
      
      // Matrix - zeigt Matrix-Animation und gibt Text aus
      if (commandKey === 'matrix') {
        const matrixResponse = commands.matrix();
        setShowMatrix(prev => !prev);
        
        setCommandHistory(prev => [
          ...prev,
          { text: '', type: 'response', response: matrixResponse }
        ]);
        
        setCommandHistoryBuffer(prev => [...prev, cmd]);
        setCommandHistoryIndex(-1);
        return;
      }

      // Execute the command and get response, only if we haven't handled it yet
      if (command !== 'time' && command !== 'weather') {
        let result: CommandResponse;
        if (commandKey === 'ls') {
          result = commands.ls(currentDirectory);
        } else if (commandKey === 'pwd') {
          result = commands.pwd(currentPath);
        } else if (commandKey === 'echo') {
          result = commands.echo(args.slice(1));
        } else if (commandKey === 'about') {
          result = commands.about();
        } else if (commandKey === 'skills') {
          result = commands.skills();
        } else if (commandKey === 'projects') {
          result = commands.projects();
        } else if (commandKey === 'contact') {
          result = commands.contact();
        } else if (commandKey === 'social') {
          result = commands.social();
        } else if (commandKey === 'neofetch') {
          result = commands.neofetch();
        } else if (commandKey === 'help') {
          result = commands.help();
        } else {
          result = [];
        }
        
        response = Array.isArray(result) ? result : [];
      }
    } catch (error) {
      if (error instanceof Error) {
        response = [{ 
          text: error.message,
          type: 'error'
        }];
      }
    }

    // Füge die Antwort zum Verlauf hinzu
    setCommandHistory(prev => [
      ...prev,
      { text: '', type: 'response', response }
    ]);
    
    setCommandHistoryBuffer(prev => [...prev, cmd]);
    setCommandHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      handleCommand(input.trim());
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistoryBuffer.length > 0) {
        const newIndex = commandHistoryIndex + 1;
        if (newIndex < commandHistoryBuffer.length) {
          setCommandHistoryIndex(newIndex);
          setInput(commandHistoryBuffer[commandHistoryBuffer.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistoryIndex > 0) {
        const newIndex = commandHistoryIndex - 1;
        setCommandHistoryIndex(newIndex);
        setInput(commandHistoryBuffer[commandHistoryBuffer.length - 1 - newIndex]);
      } else if (commandHistoryIndex === 0) {
        setCommandHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const exitGame = () => {
    setCurrentGame(null);
  };

  const renderResponse = (response: Array<string | TerminalResponse>) => {
    return response.map((item, index) => {
      if (typeof item === 'string') {
        return <div key={index}>{item}</div>;
      }
      if (item.type === 'link') {
        return (
          <div key={index}>
            <a
              href={item.href}
              className="text-blue-400 hover:text-blue-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.text}
            </a>
          </div>
        );
      }
      if (item.type === 'error') {
        return <div key={index} className="text-red-500">{item.text}</div>;
      }
      if (item.type === 'success') {
        return <div key={index} className="text-green-500">{item.text}</div>;
      }
      return <div key={index}>{item.text}</div>;
    });
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-green-500 p-4 font-mono">
      {showMatrix && <MatrixRain />}
      <div
        ref={terminalRef}
        className="terminal-container h-full overflow-y-auto pb-8"
        onClick={handleClick}
      >
        {commandHistory.map((entry, index) => (
          <div key={index}>
            {entry.type === 'command' ? (
              <div>{entry.text}</div>
            ) : (
              <div>{entry.response && renderResponse(entry.response)}</div>
            )}
          </div>
        ))}
        <div className="flex">
          <span>{currentPath} $</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none ml-2"
            autoFocus
          />
          <span className={`cursor ${cursorVisible ? 'visible' : 'invisible'}`}>
            |
          </span>
        </div>
      </div>

      {/* Game container */}
      {currentGame === 'snake' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90">
          <SnakeGame onExit={exitGame} />
        </div>
      )}
      {currentGame === 'tetris' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90">
          <TetrisGame onExit={exitGame} />
        </div>
      )}
      {currentGame === '2048' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90">
          <Game2048 onExit={exitGame} />
        </div>
      )}
    </div>
  );
};

export default TerminalHero;
