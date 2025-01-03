import React, { useState, useEffect, useRef } from 'react';
import { commands, fileSystem, isGameCommand } from '../utils/terminalCommands';
import { TerminalResponse, Command } from '../types/terminal';
import MatrixRain from './MatrixRain';
import SnakeGame from './TerminalGames/Snake';
import TetrisGame from './TerminalGames/Tetris';
import Game2048 from './TerminalGames/Game2048';

type GameType = 'snake' | 'tetris' | '2048' | null;

const AVAILABLE_COMMANDS = [
  'ls', 'cd', 'pwd', 'echo', 'time', 'weather',
  'about', 'skills', 'projects', 'contact', 'social',
  'neofetch', 'matrix', 'help', 'clear', 'snake',
  'tetris', '2048'
] as const;

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
    
    let response: Array<string | TerminalResponse> = [];

    try {
      const commandFn = commands[command as keyof typeof commands];
      if (!commandFn) {
        response = [{ 
          text: `Command not found: ${command}. Type 'help' for available commands.`,
          type: 'error'
        }];
        return;
      }

      // Handle special cases first
      if (command === 'cd' && args[1]) {
        const newDir = commandFn(args[1], currentDirectory);
        if (newDir) {
          setCurrentDirectory(newDir);
          setCurrentPath(prev => `${prev}/${args[1]}`);
        } else if (args[1] === '..') {
          const pathParts = currentPath.split('/');
          pathParts.pop();
          setCurrentPath(pathParts.join('/'));
        }
        return;
      }

      if (command === 'matrix') {
        setShowMatrix(prev => !prev);
      } else if (command === 'clear') {
        setCommandHistory([]);
        return;
      } else if (isGameCommand(command)) {
        setCurrentGame(command as GameType);
        return;
      }

      // Execute the command and get response
      let result;
      if (command === 'ls') {
        result = commandFn(currentDirectory);
      } else if (command === 'pwd') {
        result = commandFn(currentPath);
      } else if (command === 'echo') {
        result = commandFn(args.slice(1));
      } else {
        result = commandFn();
      }

      response = Array.isArray(result) ? result : [];
    } catch (error) {
      if (error instanceof Error) {
        response = [{ 
          text: error.message,
          type: 'error'
        }];
      }
    }

    console.log('Command:', command, 'Response:', response);

    setCommandHistory(prev => [
      ...prev,
      { text: `${currentPath} $ ${cmd}`, type: 'command', response: [] },
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
          <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>
            ▋
          </span>
        </div>
      </div>
      {currentGame && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative">
            <button
              onClick={() => setCurrentGame(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              Close [X]
            </button>
            {currentGame === 'snake' && <SnakeGame />}
            {currentGame === 'tetris' && <TetrisGame />}
            {currentGame === '2048' && <Game2048 />}
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalHero;
