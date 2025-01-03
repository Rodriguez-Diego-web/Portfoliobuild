import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, ArrowDown } from 'lucide-react';
import Snake from './TerminalGames/Snake';
import Tetris from './TerminalGames/Tetris';
import Game2048 from './TerminalGames/Game2048';
import MatrixRain from './MatrixRain';

const Hero = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [showMatrix, setShowMatrix] = useState(false);
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const fileSystem = {
    '~': {
      type: 'dir',
      content: {
        'Documents': { type: 'dir' },
        'Projects': { type: 'dir' },
        'Games': { type: 'dir' },
        'README.md': { type: 'file' },
        'portfolio.config.js': { type: 'file' },
        '.gitignore': { type: 'file' }
      }
    },
    'Documents': {
      type: 'dir',
      content: {
        'articles': { type: 'dir' },
        'blog': { type: 'dir' },
        'resume.pdf': { type: 'file' },
        'notes.txt': { type: 'file' }
      }
    },
    'Documents/articles': {
      type: 'dir',
      content: {
        'dev-tips.md': { type: 'file' },
        'react-hooks.md': { type: 'file' },
        'typescript.md': { type: 'file' }
      }
    },
    'Documents/blog': {
      type: 'dir',
      content: {
        'post1.md': { type: 'file' },
        'post2.md': { type: 'file' },
        'drafts': { type: 'dir' }
      }
    },
    'Projects': {
      type: 'dir',
      content: {
        'portfolio': { type: 'dir' },
        'game-engine': { type: 'dir' },
        'web-apps': { type: 'dir' },
        'experiments': { type: 'dir' }
      }
    },
    'Games': {
      type: 'dir',
      content: {
        'snake.js': { type: 'file' },
        'tetris.js': { type: 'file' },
        '2048.js': { type: 'file' },
        'saves': { type: 'dir' }
      }
    }
  };

  const commands = {
    help: () => [
      '🚀 Available commands:',
      '',
      '📁 Navigation:',
      '  ls        - List directory contents',
      '  pwd       - Print working directory',
      '  cd        - Change directory (demo)',
      '',
      '🎮 Games:',
      '  snake     - Play Snake game',
      '  tetris    - Play Tetris',
      '  2048      - Play 2048',
      '',
      '🛠️ Dev Tools:',
      '  clear     - Clear terminal',
      '  echo      - Print text',
      '  time      - Show current time',
      '  weather   - Show weather (demo)',
      '  matrix    - Toggle Matrix effect',
      '  neofetch  - System information',
      '',
      '👤 About Me:',
      '  about     - About me',
      '  skills    - My skills',
      '  projects  - My projects',
      '  contact   - Contact info',
      '  social    - Social links',
      '',
      '💡 Tips:',
      '  - Use Up/Down arrows for command history',
      '  - Tab for command completion (coming soon)',
      '  - Type "exit" to close terminal',
    ],

    pwd: () => [currentDirectory],

    cd: (args: string[]) => {
      const newDir = args[0] || '~';
      
      // Spezielle Fälle behandeln
      if (newDir === '..') {
        if (currentDirectory === '~') {
          return ['Already at home directory'];
        }
        const parentDir = currentDirectory.split('/').slice(0, -1).join('/') || '~';
        setCurrentDirectory(parentDir);
        return [`Changed to ${parentDir}`];
      }

      if (newDir === '.') {
        return [`Current directory: ${currentDirectory}`];
      }

      if (newDir === '~') {
        setCurrentDirectory('~');
        return ['Changed to home directory'];
      }

      // Absoluten Pfad erstellen
      const targetPath = newDir.startsWith('~') || newDir.startsWith('/')
        ? newDir.replace('~', '')
        : currentDirectory === '~'
          ? newDir
          : `${currentDirectory}/${newDir}`;

      // Prüfen ob das Verzeichnis existiert
      if (!fileSystem[targetPath] || fileSystem[targetPath].type !== 'dir') {
        return [`Directory not found: ${newDir}`];
      }

      setCurrentDirectory(targetPath);
      return [`Changed to ${targetPath}`];
    },

    ls: (args: string[]) => {
      const targetPath = args[0] || currentDirectory;
      
      // Verzeichnis finden
      const dir = fileSystem[targetPath];
      if (!dir || dir.type !== 'dir') {
        return [`Directory not found: ${targetPath}`];
      }

      // Dateien und Verzeichnisse auflisten
      return Object.entries(dir.content).map(([name, item]) => 
        item.type === 'dir' ? `${name}/` : name
      ).sort((a, b) => {
        // Verzeichnisse zuerst, dann Dateien
        const aIsDir = a.endsWith('/');
        const bIsDir = b.endsWith('/');
        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;
        return a.localeCompare(b);
      });
    },

    echo: (args: string[]) => [args.join(' ')],

    neofetch: () => [
      '       ▄▄▄▄▄▄▄       ',
      '      █████████      User: guest@portfolio',
      '      █████████      OS: Portfolio OS',
      '      █████████      Shell: React Terminal',
      '      █████████      Theme: Cyberpunk',
      '      █████████      Resolution: ' + window.innerWidth + 'x' + window.innerHeight,
      '      █████████      Browser: ' + navigator.userAgent.split(' ')[0],
      '      █████████      ',
      '                     ',
      '▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀',
    ],

    about: () => [
      '👨‍💻 About Me:',
      '',
      'Hey! I\'m Kadir Diego Padin Rodriguez',
      'Full Stack Developer based in Germany',
      '',
      '🎯 Currently working on:',
      '- Building awesome web applications',
      '- Learning new technologies',
      '- Creating innovative solutions',
    ],

    skills: () => [
      '🚀 Technical Skills:',
      '',
      'Frontend:',
      '██████████ React      100%',
      '████████── TypeScript  80%',
      '███████─── Next.js     70%',
      '',
      'Backend:',
      '████████── Node.js     80%',
      '███████─── Express     70%',
      '██████──── PostgreSQL  60%',
      '',
      'Tools & Others:',
      '██████████ Git        100%',
      '████████── Docker      80%',
      '███████─── AWS         70%',
    ],

    projects: () => [
      '📂 Featured Projects:',
      '',
      '1. Interactive Systems',
      '   → https://interaktivesysteme.fun',
      '   Tech: React, TypeScript, Node.js',
      '',
      '2. Portfolio Website',
      '   → https://rodriguez-digital.de',
      '   Tech: React, TailwindCSS, Framer Motion',
      '',
      '3. Photography Portfolio',
      '   → https://saskia-photographie.de',
      '   Tech: Next.js, TailwindCSS',
    ],

    contact: () => [
      '📫 Contact Information:',
      '',
      'Email: kadirdiegopadin@gmail.com',
      'GitHub: https://github.com/kadirdiegp',
      'Instagram: https://www.instagram.com/kadirdiego_/',
      'Location: Germany',
      '',
      'Feel free to reach out for collaborations!',
    ],

    social: () => [
      '🔗 Social Links:',
      '',
      'GitHub: https://github.com/Kadirdiegp',
      'Instagram: https://www.instagram.com/kadirdiego_/',
    ],

    clear: () => {
      setOutput([]);
      return [];
    },

    snake: () => {
      setCurrentGame('snake');
      return ['🎮 Starting Snake...', 'Use arrow keys to move, ESC to exit'];
    },

    tetris: () => {
      setCurrentGame('tetris');
      return ['Starting Tetris...'];
    },

    '2048': () => {
      setCurrentGame('2048');
      return ['Starting 2048...'];
    },

    ascii: () => [
      '   ▄█   ▄█▄    ▄████████ ████████▄   ▄█     ▄████████ ',
      '  ███ ▄███▀   ███    ███ ███   ▀███ ███    ███    ███ ',
      '  ███▐██▀     ███    ███ ███    ███ ███▌   ███    ███ ',
      ' ▄█████▀      ███    ███ ███    ███ ███▌  ▄███▄▄▄▄██▀ ',
      '▀▀█████▄    ▀███████████ ███    ███ ███▌ ▀▀███▀▀▀▀▀   ',
      '  ███▐██▄     ███    ███ ███    ███ ███  ▀███████████ ',
      '  ███ ▀███▄   ███    ███ ███   ▄███ ███    ███    ███ ',
      '  ███   ▀█▀   ███    █▀  ████████▀  █▀     ███    ███ ',
      '  ▀                                         ███    ███ ',
    ],

    matrix: () => {
      setShowMatrix(prev => !prev);
      return [
        'Matrix mode ' + (!showMatrix ? 'activated' : 'deactivated') + ' 🕶️',
        !showMatrix ? 'Wake up, Neo...' : 'Back to reality...',
      ];
    },
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    const handleClick = () => {
      if (!currentGame) {
        inputRef.current?.focus();
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [currentGame]);

  const handleCommand = (cmd: string) => {
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();
    args.shift();

    // Speichere Befehl in History
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    if (command === '') {
      return [''];
    }

    if (commands[command]) {
      return commands[command](args);
    }

    return [`Command not found: ${command}. Type 'help' for available commands.`];
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (currentGame) return; // Wenn ein Spiel läuft, ignoriere Terminal-Eingaben

    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        setHistoryIndex(prev => prev + 1);
        setInput(history[historyIndex + 1]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        setHistoryIndex(prev => prev - 1);
        setInput(history[historyIndex - 1]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const newOutput = [
      ...output,
      `➜ ${currentDirectory} $ ${trimmedInput}`,
      ...handleCommand(trimmedInput),
      '',
    ];
    
    setOutput(newOutput);
    setInput('');
    
    // Scroll zum Ende
    setTimeout(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }, 0);
  };

  return (
    <section className="min-h-[100vh] flex items-center justify-center relative overflow-hidden px-4 sm:px-6 pt-32 pb-16 sm:pt-40">
      {showMatrix && <MatrixRain />}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
        <motion.div
          className="w-full max-w-3xl bg-black/50 rounded-lg overflow-hidden border border-green-500/20"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-black/60 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-green-500/60 text-sm hidden sm:block">guest@portfolio: {currentDirectory}</div>
            <div className="text-green-500/60 text-sm block sm:hidden">guest@portfolio</div>
            <div className="text-green-500/60 text-sm hidden sm:block">{new Date().toLocaleTimeString()}</div>
          </div>

          {/* Terminal Body */}
          <div 
            ref={outputRef}
            className="p-2 sm:p-4 h-[70vh] sm:h-[60vh] overflow-y-auto font-mono text-green-500 text-sm"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Welcome Message */}
            <div className="mb-4">
              {/* Desktop ASCII Art */}
              <pre className="hidden sm:block text-green-500 text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap">
{`
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
                                                                          
`}
              </pre>
              {/* Mobile ASCII Art */}
              <pre className="block sm:hidden text-green-500 text-xs overflow-x-auto whitespace-pre-wrap">
{`
 ██████╗  ██████╗ ██████╗ ████████╗
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
 ██████╔╝██║   ██║██████╔╝   ██║   
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   
 ██║     ╚██████╔╝██║  ██║   ██║   
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   
`}
              </pre>
              <p className="mb-2 text-xs sm:text-sm">Welcome to my interactive portfolio terminal! Type 'help' for available commands.</p>
              <p className="text-yellow-500 text-xs sm:text-sm">Version 2.0.0 (portfolio-os)</p>
            </div>

            {/* Command Output */}
            {output.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap mb-1 text-xs sm:text-sm break-words">
                {line}
              </div>
            ))}

            {/* Current Game */}
            {currentGame === 'snake' && (
              <div className="my-4 bg-black/40 p-2 sm:p-4 rounded-lg">
                <Snake onExit={() => setCurrentGame(null)} />
              </div>
            )}
            {currentGame === 'tetris' && (
              <div className="my-4 bg-black/40 p-2 sm:p-4 rounded-lg">
                <Tetris onExit={() => setCurrentGame(null)} />
              </div>
            )}
            {currentGame === '2048' && (
              <div className="my-4 bg-black/40 p-2 sm:p-4 rounded-lg">
                <Game2048 onExit={() => setCurrentGame(null)} />
              </div>
            )}

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center mt-2">
              <label htmlFor="terminal-input" className="sr-only">Terminal command input</label>
              <span className="text-green-500 mr-2 text-xs sm:text-sm">➜</span>
              <span className="text-blue-500 mr-2 text-xs sm:text-sm hidden sm:inline">{currentDirectory}</span>
              <span className="text-green-500 mr-2 text-xs sm:text-sm">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-green-500 text-xs sm:text-sm min-w-0"
                spellCheck="false"
                autoFocus
                autoCapitalize="none"
                autoCorrect="off"
                id="terminal-input"
                name="terminal-input"
                autoComplete="off"
                aria-label="Terminal input"
              />
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;