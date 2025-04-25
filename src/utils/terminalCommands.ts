import { CommandResponse } from '../types/terminal';

interface Directory {
  name: string;
  type: 'directory' | 'file';
  content?: { [key: string]: Directory };
  parent?: Directory;
}

// Alle verfügbaren Befehle als Konstante für den Export
export const AVAILABLE_COMMANDS = [
  'ls', 'cd', 'pwd', 'echo',
  'about', 'skills', 'projects', 'contact', 'social',
  'neofetch', 'matrix', 'help', 'clear', 'time', 'weather',
  'snake', 'tetris', '2048'
] as const;

// Dateisystem erstellen mit Eltern-Referenzen
export const initializeFileSystem = (): Directory => {
  const root: Directory = {
    name: 'root',
    type: 'directory',
    content: {}
  };

  const documents: Directory = {
    name: 'Documents',
    type: 'directory',
    content: {},
    parent: root
  };
  
  const games: Directory = {
    name: 'Games',
    type: 'directory',
    content: {},
    parent: root
  };

  const projects: Directory = {
    name: 'Projects',
    type: 'directory',
    content: {},
    parent: root
  };

  // Dateisystem aufbauen
  root.content!['Documents'] = documents;
  root.content!['Games'] = games;
  root.content!['Projects'] = projects;
  root.content!['.gitignore'] = { type: 'file', name: '.gitignore', parent: root };
  root.content!['portfolio.config.js'] = { type: 'file', name: 'portfolio.config.js', parent: root };
  root.content!['README.md'] = { type: 'file', name: 'README.md', parent: root };

  // Dokumente hinzufügen
  documents.content!['resume.pdf'] = { 
    type: 'file', 
    name: 'resume.pdf',
    parent: documents
  };
  
  documents.content!['projects.md'] = { 
    type: 'file', 
    name: 'projects.md',
    parent: documents
  };
  
  // Spiele hinzufügen
  games.content!['snake'] = { 
    type: 'file', 
    name: 'snake',
    parent: games
  };
  
  games.content!['tetris'] = { 
    type: 'file', 
    name: 'tetris',
    parent: games
  };
  
  games.content!['2048'] = { 
    type: 'file', 
    name: '2048',
    parent: games
  };

  // Projekte hinzufügen
  projects.content!['portfolio'] = { 
    type: 'directory', 
    name: 'portfolio',
    content: {},
    parent: projects
  };
  
  projects.content!['web-apps'] = { 
    type: 'directory', 
    name: 'web-apps',
    content: {},
    parent: projects
  };

  return root;
};

// Dateisystem initialisieren
export const fileSystem = initializeFileSystem();

// Skills mit Prozenten
const skillsData = {
  Frontend: [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Next.js', level: 80 }
  ],
  Backend: [
    { name: 'Node.js', level: 88 },
    { name: 'MongoDB', level: 82 }
  ],
  'Cloud & Tools': [
    { name: 'AWS', level: 75 },
    { name: 'Docker', level: 80 },
    { name: 'Netlify', level: 88 }
  ]
};

const ls = (currentDir: Directory): CommandResponse => {
  if (!currentDir.content) return [];
  return Object.keys(currentDir.content).map(name => {
    const item = currentDir.content![name];
    return item.type === 'directory' ? `${name}/` : name;
  });
};

const cd = (path: string, currentDir: Directory): Directory | null => {
  // Bei .. zur übergeordneten Directory zurückkehren
  if (path === '..') {
    if (currentDir.parent) {
      return currentDir.parent;
    } else {
      return currentDir; // Bleibe im Root-Verzeichnis
    }
  }
  
  // Absolute Pfade (beginnend mit /) navigieren vom Root
  if (path.startsWith('/')) {
    // Diese Implementierung ist vereinfacht - würde in einem echten Terminal erweitert werden
    throw new Error('Absolute paths not supported in this demo');
  }
  
  // Einfache Navigation in Unterverzeichnisse
  if (!currentDir.content || !currentDir.content[path]) {
    throw new Error(`Directory not found: ${path}`);
  }
  
  const target = currentDir.content[path];
  if (target.type !== 'directory') {
    throw new Error(`Not a directory: ${path}`);
  }
  
  return target;
};

const pwd = (currentPath: string): CommandResponse => [currentPath];

const echo = (args: string[]): CommandResponse => [args.join(' ')];

const about = (): CommandResponse => [
  '👨‍💻 About Me:',
  'Hey! I\'m Kadir Diego Padin Rodriguez',
  'Full Stack Developer based in Germany',
  '',
  '🎯 Currently working on:',
  '- Building modern web applications with React & TypeScript',
  '- Exploring cloud infrastructure and deployment solutions',
  '- Creating responsive and accessible user interfaces',
  '',
  { text: '→ View full profile', type: 'link', href: '#about' },
  { text: '→ Download Resume', type: 'link', href: '/resume.pdf' }
];

const skills = (): CommandResponse => {
  const response: CommandResponse = ['🚀 Technical Skills:'];
  
  for (const [category, skills] of Object.entries(skillsData)) {
    response.push('', category + ':');
    for (const skill of skills) {
      const blocks = '█'.repeat(Math.floor(skill.level / 10));
      const spaces = '─'.repeat(10 - Math.floor(skill.level / 10));
      response.push(`${blocks}${spaces} ${skill.name.padEnd(10)} ${skill.level}%`);
    }
  }
  
  response.push('', { text: '→ View detailed skills', type: 'link', href: '#skills' });
  return response;
};

const help = (): CommandResponse => [
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
  { text: '  about     - About me', type: 'link', href: '#about' },
  { text: '  skills    - My skills', type: 'link', href: '#skills' },
  { text: '  projects  - My projects', type: 'link', href: '#projects' },
  { text: '  contact   - Contact info', type: 'link', href: '#contact' },
  { text: '  social    - Social links', type: 'link', href: '#social' },
  '',
  '💡 Tips:',
  '  - Use Up/Down arrows for command history',
  '  - Tab for command completion (coming soon)',
  '  - Type "exit" to close terminal'
];

const neofetch = (): CommandResponse => [
  '       ▄▄▄▄▄▄▄       ',
  '      █████████      User: guest@portfolio',
  '      █████████      OS: Portfolio OS',
  '      █████████      Shell: React Terminal',
  '      █████████      Theme: Cyberpunk',
  '      █████████      Resolution: Dynamic',
  '      █████████      Browser: Mozilla/5.0',
  '      █████████      ',
  '                     ',
  '▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀'
];

const matrix = (): CommandResponse => [{ 
  text: 'Matrix mode activated 🕶️', 
  type: 'success' 
}, 'Wake up, Neo...'];

const clear = (): CommandResponse => [];

const time = (): CommandResponse => {
  const now = new Date();
  return [`Current time: ${now.toLocaleTimeString()}`];
};

const weather = (): CommandResponse => [
  'Weather for Cuxhaven, Germany:',
  '🌤️  Currently: Partly Cloudy, 18°C',
  '🌡️  Today: High 21°C, Low 14°C',
  '💨  Wind: 15 km/h',
  '💧  Humidity: 71%',
  '',
  'Note: This is demo weather data.'
];

const projects = (): CommandResponse => [
  '📂 My Projects:',
  '--------------',
  '1. Portfolio Website',
  '   - Interactive portfolio with terminal interface',
  '   - Tech: React, TypeScript, Tailwind CSS',
  '',
  '2. E-Commerce Platform',
  '   - Full-featured online shop with payment integration',
  '   - Tech: Next.js, MongoDB, Stripe API',
  '',
  '3. Content Management System',
  '   - Headless CMS for managing digital content',
  '   - Tech: Node.js, React, GraphQL',
  '',
  { text: '→ View all projects', type: 'link', href: '#projects' }
];

const contact = (): CommandResponse => [
  '📫 Contact Information:',
  '---------------------',
  'Email: diego@rodriguez-digital.de',
  'Phone (Call): +49 152 193 77166',
  'WhatsApp: +49 176 41673111',
  'LinkedIn: Diego Rodriguez',
  'GitHub: github.com/Rodriguez-Diego-web',
  'Location: Cuxhaven, Germany',
  'Feel free to reach out for collaborations!',
  '',
  { text: '→ Send email', type: 'link', href: 'mailto:diego@rodriguez-digital.de' },
  { text: '→ Call me', type: 'link', href: 'tel:+4915219377166' },
  { text: '→ WhatsApp', type: 'link', href: 'https://wa.me/4917641673111' },
  { text: '→ View LinkedIn', type: 'link', href: 'https://www.linkedin.com/in/kadir-diego-padin-rodriguez-89a105362/' },
  { text: '→ View GitHub', type: 'link', href: 'https://github.com/Rodriguez-Diego-web' },
];

const social = (): CommandResponse => [
  '🔗 Social Links:',
  '--------------',
  { text: '→ GitHub', type: 'link', href: 'https://github.com/Rodriguez-Diego-web' },
  { text: '→ LinkedIn', type: 'link', href: 'https://www.linkedin.com/in/kadir-diego-padin-rodriguez-89a105362/' },
  { text: '→ Instagram', type: 'link', href: 'https://instagram.com/kadirdiego_' }
];

const snake = (): CommandResponse => [{
  text: 'Starting Snake game...', 
  type: 'success'
}];

const tetris = (): CommandResponse => [{
  text: 'Starting Tetris game...', 
  type: 'success'
}];

const _2048 = (): CommandResponse => [{
  text: 'Starting 2048 game...', 
  type: 'success'
}];

export const commands = {
  ls,
  cd,
  pwd,
  echo,
  about,
  skills,
  projects,
  contact,
  social,
  neofetch,
  matrix,
  help,
  clear,
  time,
  weather,
  snake,
  tetris,
  '2048': _2048
};

export const isGameCommand = (command: string): boolean => {
  return ['snake', 'tetris', '2048'].includes(command);
};
