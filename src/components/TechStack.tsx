import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import '../styles/tech-stack.css';

interface Technology {
  name: string;
  icon: string;
  category: string;
  description: string;
  experience: string;
  proficiency: number;
  projects?: string[];
  setId?: string;  // Für Puzzle-Sets
  setPosition?: 'left' | 'center' | 'right';  // Position im Set
  pattern?: string;
}

interface TechSet {
  id: string;
  name: string;
  technologies: string[];
  reward: string;
  pattern: string;
}

const techSets: { [key: string]: TechSet } = {
  'web-basics': {
    id: 'web-basics',
    name: 'Web Fundamentals',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    reward: 'Master of the Web Basics',
    pattern: 'circuit-board'
  },
  'react-stack': {
    id: 'react-stack',
    name: 'React Ecosystem',
    technologies: ['React', 'TypeScript', 'Redux', 'Next.js'],
    reward: 'React Wizard',
    pattern: 'hexagons'
  },
  'design-tools': {
    id: 'design-tools',
    name: 'Design Suite',
    technologies: ['Figma', 'Adobe XD', 'Photoshop', 'Canva'],
    reward: 'Design Master',
    pattern: 'paint-splash'
  },
  'video-tools': {
    id: 'video-tools',
    name: 'Video Production',
    technologies: ['Premiere Pro', 'After Effects'],
    reward: 'Video Master',
    pattern: 'video-pattern'
  },
  'backend-stack': {
    id: 'backend-stack',
    name: 'Backend Masters',
    technologies: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
    reward: 'Backend Guru',
    pattern: 'server-rack'
  },
  'cloud-stack': {
    id: 'cloud-stack',
    name: 'Cloud & Deploy',
    technologies: ['AWS', 'Vercel', 'Docker', 'GitHub'],
    reward: 'Cloud Master',
    pattern: 'cloud-pattern'
  },
  'tools-stack': {
    id: 'tools-stack',
    name: 'Dev Tools',
    technologies: ['VS Code', 'Git', 'Postman', 'npm'],
    reward: 'Tool Master',
    pattern: 'tools-pattern'
  }
};

const technologies: Technology[] = [
  // Web Basics Set
  {
    name: 'HTML5',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    category: 'frontend',
    description: 'Modern semantic HTML',
    experience: '5+ years',
    proficiency: 90,
    setId: 'web-basics'
  },
  {
    name: 'CSS3',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    category: 'frontend',
    description: 'Modern CSS, Flexbox, Grid',
    experience: '5+ years',
    proficiency: 85,
    setId: 'web-basics'
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    category: 'frontend',
    description: 'ES6+, DOM manipulation',
    experience: '5+ years',
    proficiency: 88,
    setId: 'web-basics'
  },

  // React Stack Set
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    category: 'frontend',
    description: 'Modern React with Hooks',
    experience: '4+ years',
    proficiency: 92,
    setId: 'react-stack'
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    category: 'frontend',
    description: 'Type-safe JavaScript',
    experience: '3+ years',
    proficiency: 85,
    setId: 'react-stack'
  },
  {
    name: 'Redux',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
    category: 'frontend',
    description: 'State Management',
    experience: '3+ years',
    proficiency: 80,
    setId: 'react-stack'
  },
  {
    name: 'Next.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    category: 'frontend',
    description: 'React Framework',
    experience: '2+ years',
    proficiency: 85,
    setId: 'react-stack'
  },

  // Design Tools Set
  {
    name: 'Figma',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    category: 'design',
    description: 'UI/UX Design & Prototyping',
    experience: '3+ years',
    proficiency: 88,
    setId: 'design-tools'
  },
  {
    name: 'Adobe XD',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg',
    category: 'design',
    description: 'UI Design & Wireframing',
    experience: '2+ years',
    proficiency: 75,
    setId: 'design-tools'
  },
  {
    name: 'Photoshop',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
    category: 'design',
    description: 'Image Editing & Graphics',
    experience: '4+ years',
    proficiency: 82,
    setId: 'design-tools'
  },
  {
    name: 'Canva',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',
    category: 'design',
    description: 'Quick Design & Social Media',
    experience: '3+ years',
    proficiency: 90,
    setId: 'design-tools'
  },

  // Video Tools Set
  {
    name: 'Premiere Pro',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg',
    category: 'video',
    description: 'Professional Video Editing',
    experience: '3+ years',
    proficiency: 85,
    setId: 'video-tools',
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='rgba(249, 115, 22, 0.07)'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  },
  {
    name: 'After Effects',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg',
    category: 'video',
    description: 'Motion Graphics & VFX',
    experience: '2+ years',
    proficiency: 80,
    setId: 'video-tools',
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='rgba(249, 115, 22, 0.07)'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  },

  // Backend Stack Set
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    category: 'backend',
    description: 'Server-side JavaScript',
    experience: '4+ years',
    proficiency: 88,
    setId: 'backend-stack'
  },
  {
    name: 'Express',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    category: 'backend',
    description: 'Web Framework',
    experience: '4+ years',
    proficiency: 85,
    setId: 'backend-stack'
  },
  {
    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    category: 'backend',
    description: 'NoSQL Database',
    experience: '3+ years',
    proficiency: 82,
    setId: 'backend-stack'
  },
  {
    name: 'PostgreSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    category: 'backend',
    description: 'SQL Database',
    experience: '2+ years',
    proficiency: 75,
    setId: 'backend-stack'
  },

  // Cloud Stack
  {
    name: 'AWS',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    category: 'cloud',
    description: 'Cloud Infrastructure',
    experience: '2+ years',
    proficiency: 75,
    setId: 'cloud-stack',
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='rgba(249, 115, 22, 0.07)'%3E%3Cpath d='M30 20c5.523 0 10-4.477 10-10S35.523 0 30 0 20 4.477 20 10s4.477 10 10 10zm0 40c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm-20-20c5.523 0 10-4.477 10-10s-4.477-10-10-10S0 24.477 0 30s4.477 10 10 10zm40 0c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  },
  {
    name: 'Vercel',
    icon: 'https://www.svgrepo.com/show/327408/logo-vercel.svg',
    category: 'cloud',
    description: 'Deployment Platform',
    experience: '2+ years',
    proficiency: 85,
    setId: 'cloud-stack',
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='rgba(249, 115, 22, 0.07)'%3E%3Cpath d='M30 20c5.523 0 10-4.477 10-10S35.523 0 30 0 20 4.477 20 10s4.477 10 10 10zm0 40c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm-20-20c5.523 0 10-4.477 10-10s-4.477-10-10-10S0 24.477 0 30s4.477 10 10 10zm40 0c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  },
  {
    name: 'Docker',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg',
    category: 'cloud',
    description: 'Containerization',
    experience: '2+ years',
    proficiency: 80,
    setId: 'cloud-stack',
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='rgba(249, 115, 22, 0.07)'%3E%3Cpath d='M30 20c5.523 0 10-4.477 10-10S35.523 0 30 0 20 4.477 20 10s4.477 10 10 10zm0 40c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm-20-20c5.523 0 10-4.477 10-10s-4.477-10-10-10S0 24.477 0 30s4.477 10 10 10zm40 0c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  },
  {
    name: 'GitHub',
    icon: 'https://www.svgrepo.com/show/439171/github.svg',
    category: 'cloud',
    description: 'Version Control',
    experience: '4+ years',
    proficiency: 90,
    setId: 'cloud-stack',
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='rgba(249, 115, 22, 0.07)'%3E%3Cpath d='M30 20c5.523 0 10-4.477 10-10S35.523 0 30 0 20 4.477 20 10s4.477 10 10 10zm0 40c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm-20-20c5.523 0 10-4.477 10-10s-4.477-10-10-10S0 24.477 0 30s4.477 10 10 10zm40 0c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  },

  // Dev Tools
  {
    name: 'VS Code',
    icon: 'https://www.svgrepo.com/show/374171/vscode.svg',
    category: 'tools',
    description: 'Code Editor',
    experience: '4+ years',
    proficiency: 90,
    setId: 'tools-stack',
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='rgba(249, 115, 22, 0.07)'%3E%3Cpath d='M15 15h5v5h-5zM25 15h5v5h-5zM35 15h5v5h-5zM15 25h5v5h-5zM25 25h5v5h-5zM35 25h5v5h-5zM15 35h5v5h-5zM25 35h5v5h-5zM35 35h5v5h-5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  },
  {
    name: 'Git',
    icon: 'https://www.svgrepo.com/show/452210/git.svg',
    category: 'tools',
    description: 'Version Control',
    experience: '4+ years',
    proficiency: 85,
    setId: 'tools-stack',
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='rgba(249, 115, 22, 0.07)'%3E%3Cpath d='M15 15h5v5h-5zM25 15h5v5h-5zM35 15h5v5h-5zM15 25h5v5h-5zM25 25h5v5h-5zM35 25h5v5h-5zM15 35h5v5h-5zM25 35h5v5h-5zM35 35h5v5h-5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  },
  {
    name: 'Postman',
    icon: 'https://www.svgrepo.com/show/354202/postman-icon.svg',
    category: 'tools',
    description: 'API Testing',
    experience: '3+ years',
    proficiency: 85,
    setId: 'tools-stack',
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='rgba(249, 115, 22, 0.07)'%3E%3Cpath d='M15 15h5v5h-5zM25 15h5v5h-5zM35 15h5v5h-5zM15 25h5v5h-5zM25 25h5v5h-5zM35 25h5v5h-5zM15 35h5v5h-5zM25 35h5v5h-5zM35 35h5v5h-5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  },
  {
    name: 'npm',
    icon: 'https://www.svgrepo.com/show/373933/npm.svg',
    category: 'tools',
    description: 'Package Manager',
    experience: '3+ years',
    proficiency: 85,
    setId: 'tools-stack',
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='rgba(249, 115, 22, 0.07)'%3E%3Cpath d='M15 15h5v5h-5zM25 15h5v5h-5zM35 15h5v5h-5zM15 25h5v5h-5zM25 25h5v5h-5zM35 25h5v5h-5zM15 35h5v5h-5zM25 35h5v5h-5zM35 35h5v5h-5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  },
];

const getPatternStyle = (tech: Technology) => {
  if (!tech.setId) return {};
  const set = techSets[tech.setId];
  if (!set) return {};

  return {
    backgroundImage: `url(/patterns/${set.pattern}.svg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    opacity: 0.1
  };
};

const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [completedSets, setCompletedSets] = useState<string[]>([]);
  const [showingSetCompletion, setShowingSetCompletion] = useState<string | null>(null);
  const [lockedCards, setLockedCards] = useState<string[]>([]);

  const resetGame = useCallback(() => {
    setFlippedCards({});
    setCompletedSets([]);
    setShowingSetCompletion(null);
    setLockedCards([]);
  }, []);

  const handleSetCompletionClose = () => {
    setShowingSetCompletion(null);
  };

  const isSetComplete = (setId: string) => {
    const set = techSets[setId];
    if (!set) return false;
    return set.technologies.every(tech => flippedCards[tech]);
  };

  const canFlipCard = (techName: string) => {
    const tech = technologies.find(t => t.name === techName);
    if (!tech || !tech.setId) return true;
    
    if (completedSets.includes(tech.setId)) {
      const otherSets = Object.keys(techSets).filter(id => id !== tech.setId);
      return otherSets.every(setId => completedSets.includes(setId));
    }
    
    return true;
  };

  useEffect(() => {
    Object.keys(techSets).forEach(setId => {
      const set = techSets[setId];
      if (!set) return;

      const isComplete = set.technologies.every(tech => flippedCards[tech]);

      if (isComplete && !completedSets.includes(setId)) {
        setCompletedSets(prev => [...prev, setId]);
        setShowingSetCompletion(setId);
        setLockedCards(prev => [...prev, ...set.technologies]);
        
        // Karten des Sets auf der Rückseite zeigen
        const newFlippedState = { ...flippedCards };
        set.technologies.forEach(tech => {
          newFlippedState[tech] = true;
        });
        setFlippedCards(newFlippedState);

        setTimeout(() => {
          setShowingSetCompletion(null);
        }, 3000);
      }
    });
  }, [flippedCards, completedSets]);

  // Überprüfe, ob alle Sets gesammelt wurden
  useEffect(() => {
    const allSets = Object.keys(techSets);
    if (completedSets.length === allSets.length && completedSets.length > 0) {
      // Warte 10 Sekunden und setze dann das Spiel zurück
      setTimeout(() => {
        resetGame();
      }, 10000);
    }
  }, [completedSets, resetGame]);

  const handleCardClick = (techName: string, event: React.MouseEvent) => {
    // Verhindere das Standard-Scrollverhalten
    event.preventDefault();
    
    if (!canFlipCard(techName)) return;
    
    setFlippedCards(prev => ({
      ...prev,
      [techName]: !prev[techName]
    }));
  };

  const filteredTechnologies = technologies.filter(tech => {
    if (selectedCategory === 'all') return true;
    return tech.category === selectedCategory;
  });

  return (
    <section className="relative min-h-screen" id="tech-stack">
      <div className="tech-stack-container min-h-screen" ref={containerRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Completed Sets Display */}
          {completedSets.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl text-orange-500 mb-4">
                Completed Sets: {completedSets.length}/{Object.keys(techSets).length}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedSets.map(setId => {
                  const set = techSets[setId];
                  if (!set) return null;
                  
                  return (
                    <div key={setId} className="completed-set">
                      <h4 className="text-lg font-semibold text-orange-500 mb-2">
                        {set.name}
                      </h4>
                      <div className="flex gap-2">
                        {set.technologies.map(techName => {
                          const tech = technologies.find(t => t.name === techName);
                          return tech ? (
                            <img 
                              key={techName}
                              src={tech.icon} 
                              alt={tech.name}
                              className="w-8 h-8"
                            />
                          ) : null;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tech Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTechnologies.map((tech) => {
              const isCompleted = tech.setId && completedSets.includes(tech.setId);
              const isLocked = lockedCards.includes(tech.name);
              const isFlipped = !isCompleted && flippedCards[tech.name];
              
              return (
                <div
                  key={tech.name}
                  className="perspective"
                >
                  <div 
                    className={`tech-card 
                              ${isFlipped ? 'flipped' : ''} 
                              ${isCompleted ? 'completed' : ''} 
                              ${isLocked && !canFlipCard(tech.name) ? 'locked' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCardClick(tech.name, e);
                    }}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    title={isLocked && !canFlipCard(tech.name) ? 'Complete other sets first!' : ''}
                  >
                    <div className="tech-card-front bg-[#1a1a1a] border border-orange-500/20 rounded-xl p-6 shadow-lg">
                      <div className="flex flex-col items-center">
                        <div className="tech-icon-container">
                          <img 
                            src={tech.icon} 
                            alt={tech.name}
                            className="w-16 h-16 object-contain pointer-events-none"
                            draggable="false"
                          />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-200">{tech.name}</h3>
                        
                        <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${tech.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="bg-gradient-to-r from-orange-500 to-orange-600 h-2.5 rounded-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="tech-card-back bg-[#1a1a1a] border border-orange-500/20 rounded-xl p-6 shadow-lg relative overflow-hidden">
                      <div 
                        className="absolute inset-0 z-0" 
                        style={tech.pattern ? { backgroundImage: tech.pattern } : getPatternStyle(tech)}
                      />
                      <div className="relative z-10">
                        <h4 className="font-semibold text-orange-500 mb-2">{tech.name}</h4>
                        <p className="text-sm mb-2 text-gray-300">{tech.description}</p>
                        <p className="text-sm text-gray-400 mb-2">
                          Experience: {tech.experience}
                        </p>
                        {tech.projects && (
                          <div className="text-sm">
                            <p className="font-medium mb-1 text-gray-300">Key Projects:</p>
                            <ul className="list-disc list-inside text-xs text-gray-400">
                              {tech.projects.slice(0, 2).map((project, idx) => (
                                <li key={idx}>{project}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Set Completion Modal */}
      {showingSetCompletion && techSets[showingSetCompletion] && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(5px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
          onClick={handleSetCompletionClose}
        >
          <motion.div 
            className="bg-gradient-to-br from-black/90 to-black/95 p-4 rounded-xl relative w-full max-w-[280px] mx-auto border border-orange-500/20"
            initial={{ scale: 0.8, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: 0.1
            }}
            onClick={e => e.stopPropagation()}
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={handleSetCompletionClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-orange-500 mb-2 pr-6">
                {techSets[showingSetCompletion].name} Complete!
              </h3>
              <p className="text-gray-300 mb-3 text-sm">
                Reward: {techSets[showingSetCompletion].reward}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 justify-items-center">
              {techSets[showingSetCompletion].technologies.map((techName, index) => {
                const tech = technologies.find(t => t.name === techName);
                return tech ? (
                  <motion.div
                    key={techName}
                    className="w-14 h-14 bg-[#1a1a1a] rounded-lg p-2.5 flex items-center justify-center hover:bg-[#252525] transition-colors border border-orange-500/10"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                      delay: 0.3 + index * 0.1 
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                ) : null;
              })}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Game Complete Message */}
      {completedSets.length === Object.keys(techSets).length && completedSets.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 left-4 right-4 bg-orange-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm text-center"
        >
          Restarting game in 10 seconds...
        </motion.div>
      )}
    </section>
  );
};

export default TechStack;
