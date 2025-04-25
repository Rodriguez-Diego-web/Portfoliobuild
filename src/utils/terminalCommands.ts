import { CommandResponse } from '../types/terminal';

interface Directory {
  name: string;
  type: 'directory' | 'file';
  content?: { [key: string]: Directory };
}

// Alle verfügbaren Befehle als Konstante für den Export
export const AVAILABLE_COMMANDS = [
  'ls', 'cd', 'pwd', 'echo',
  'about', 'skills', 'projects', 'contact', 'social',
  'neofetch', 'matrix', 'help', 'clear', 'snake',
  'tetris', '2048'
] as const;

// Dateisystem
export const fileSystem: Directory = {
  name: 'root',
  type: 'directory',
  content: {
    'Documents': {
      type: 'directory',
      name: 'Documents',
      content: {
        'resume.pdf': { type: 'file', name: 'resume.pdf' },
        'projects.md': { type: 'file', name: 'projects.md' }
      }
    },
    'Games': {
      type: 'directory',
      name: 'Games',
      content: {
        'snake': { type: 'file', name: 'snake' },
        'tetris': { type: 'file', name: 'tetris' },
        '2048': { type: 'file', name: '2048' }
      }
    },
    'Projects': {
      type: 'directory',
      name: 'Projects',
      content: {
        'portfolio': { type: 'directory', name: 'portfolio' },
        'snake-game': { type: 'directory', name: 'snake-game' },
        'tetris-game': { type: 'directory', name: 'tetris-game' }
      }
    }
  }
};

// Skills mit Prozenten
const skillsData = {
  Frontend: [
    { name: 'React', level: 100 },
    { name: 'TypeScript', level: 80 },
    { name: 'Next.js', level: 70 }
  ],
  Backend: [
    { name: 'Node.js', level: 80 },
    { name: 'Express', level: 70 },
    { name: 'PostgreSQL', level: 60 }
  ],
  'Tools & Others': [
    { name: 'Git', level: 100 },
    { name: 'Docker', level: 80 },
    { name: 'AWS', level: 70 }
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
  if (path === '..') return null;
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
  '- Building awesome web applications',
  '- Learning new technologies',
  '- Creating innovative solutions',
  '',
  { text: '→ View full profile', type: 'link', href: '#about' },
  { text: '→ Download Resume', type: 'link', href: '#resume' }
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
  '      █████████      Resolution: 1485x812',
  '      █████████      Browser: Mozilla/5.0',
  '      █████████      ',
  '                     ',
  '▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀'
];

const matrix = (): CommandResponse => [{ 
  text: 'Matrix mode toggled', 
  type: 'success' 
}];

const clear = (): CommandResponse => [];

const projects = (): CommandResponse => [
  '📂 My Projects:',
  '--------------',
  '1. Portfolio Terminal',
  '   - Interactive terminal-based portfolio',
  '   - Tech: React, TypeScript, Tailwind',
  '',
  '2. Snake Game',
  '   - Classic snake game with modern features',
  '   - Tech: React, Canvas API',
  '',
  '3. Tetris',
  '   - Modern implementation of Tetris',
  '   - Tech: React, TypeScript',
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
  { text: '→ View LinkedIn', type: 'link', href: 'https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile' },
];

const social = (): CommandResponse => [
  '🔗 Social Links:',
  '--------------',
  { text: '→ GitHub', type: 'link', href: 'https://github.com/Kadirdiegp' },
  { text: '→ Instagram', type: 'link', href: 'https://instagram.com/kadirdiego_' }
];

const snake = (): CommandResponse => [];
const tetris = (): CommandResponse => [];
const _2048 = (): CommandResponse => [];

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
  snake,
  tetris,
  '2048': _2048
};

export const isGameCommand = (command: string): boolean => {
  return ['snake', 'tetris', '2048'].includes(command);
};
