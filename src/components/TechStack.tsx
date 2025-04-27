import { useState } from 'react';
import '../styles/tech-stack.css';

interface Technology {
  name: string;
  icon: string;
  category: string;
  description: string;
  experience: string;
  proficiency: number;
}

// Vereinfachte Datenstruktur ohne Sets und Puzzles
const technologies: Technology[] = [
  // Web Basics
  {
    name: 'HTML5',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    category: 'frontend',
    description: 'Modern semantic HTML',
    experience: '5+ years',
    proficiency: 90
  },
  {
    name: 'CSS3',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    category: 'frontend',
    description: 'Modern CSS, Flexbox, Grid',
    experience: '5+ years',
    proficiency: 85
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    category: 'frontend',
    description: 'ES6+, DOM manipulation',
    experience: '5+ years',
    proficiency: 88
  },

  // React Stack
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    category: 'frontend',
    description: 'Modern React with Hooks',
    experience: '4+ years',
    proficiency: 92
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    category: 'frontend',
    description: 'Type-safe JavaScript',
    experience: '3+ years',
    proficiency: 85
  },
  {
    name: 'Next.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    category: 'frontend',
    description: 'React Framework',
    experience: '2+ years',
    proficiency: 85
  },

  // Design Tools
  {
    name: 'Adobe XD',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg',
    category: 'design',
    description: 'UI Design & Wireframing',
    experience: '2+ years',
    proficiency: 75
  },
  {
    name: 'Photoshop',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
    category: 'design',
    description: 'Image Editing & Graphics',
    experience: '4+ years',
    proficiency: 82
  },

  // Video Tools
  {
    name: 'Premiere Pro',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg',
    category: 'video',
    description: 'Professional Video Editing',
    experience: '3+ years',
    proficiency: 85
  },
  {
    name: 'After Effects',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg',
    category: 'video',
    description: 'Motion Graphics & VFX',
    experience: '2+ years',
    proficiency: 80
  },

  // Backend
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    category: 'backend',
    description: 'Server-side JavaScript',
    experience: '4+ years',
    proficiency: 88
  },
  {
    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    category: 'backend',
    description: 'NoSQL Database',
    experience: '3+ years',
    proficiency: 82
  },

  // Cloud & Deployment
  {
    name: 'AWS',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    category: 'cloud',
    description: 'Cloud Infrastructure',
    experience: '2+ years',
    proficiency: 75
  },
  {
    name: 'Docker',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg',
    category: 'cloud',
    description: 'Containerization',
    experience: '2+ years',
    proficiency: 80
  },
  {
    name: 'Netlify',
    icon: 'https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg',
    category: 'cloud',
    description: 'Continuous Deployment',
    experience: '3+ years',
    proficiency: 88
  },

  // Dev Tools
  {
    name: 'VS Code',
    icon: 'https://www.svgrepo.com/show/374171/vscode.svg',
    category: 'tools',
    description: 'Code Editor',
    experience: '4+ years',
    proficiency: 90
  },
  {
    name: 'npm',
    icon: 'https://www.svgrepo.com/show/373933/npm.svg',
    category: 'tools',
    description: 'Package Manager',
    experience: '3+ years',
    proficiency: 85
  },
];

// Filter-Kategorien
const categories = [
  { id: 'all', label: 'Alle Technologien' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'design', label: 'Design' },
  { id: 'video', label: 'Video' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'tools', label: 'Tools' }
];

const TechStack = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Technologien nach Kategorie filtern
  const filteredTechnologies = selectedCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === selectedCategory);

  return (
    <section id="skills" className="py-24 md:py-32 bg-black text-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-10">
        <div className="mb-16 text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-8 text-accent-400">Tech Stack</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Die Technologien, mit denen ich arbeite und entwickle. Von Frontend über Backend bis hin zu Design-Tools.
          </p>

          {/* Filter-Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-3 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-accent-400 text-white'
                    : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Technologie-Karten */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-6 lg:gap-8 max-w-[1600px] mx-auto px-2 md:px-4">
          {filteredTechnologies.map((tech) => (
            <div
              key={tech.name}
              className="relative bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-accent-400 transition-all hover:-translate-y-1 hover:shadow-lg"
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <div className="p-6 md:p-8 flex flex-col items-center">
                <img src={tech.icon} alt={tech.name} className="w-20 h-20 mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>
                <p className="text-md text-gray-400">{tech.experience}</p>
                {hoveredTech === tech.name && (
                  <div className="absolute inset-0 bg-neutral-900 bg-opacity-95 p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-accent-400 mb-3">{tech.name}</h3>
                    <p className="text-md text-gray-300 mb-6">{tech.description}</p>
                    <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-accent-400 h-full rounded-full" 
                        style={{ width: `${tech.proficiency}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-gray-400">Kenntnisse: {tech.proficiency}%</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
