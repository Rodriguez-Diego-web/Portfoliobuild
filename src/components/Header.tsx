import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';
import NavLinks from './NavLinks';
import logo from '../assets/LOGO RODRIGUEZ_.png';
import { SectionId } from '../types';

interface HeaderProps {
  onNavigate: (sectionId: SectionId) => void;
  currentSection: SectionId;
}

const Header: React.FC<HeaderProps> = ({
  onNavigate,
  currentSection
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Verhindern des Scrollens, wenn das Menü geöffnet ist
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleNavigate = (sectionId: SectionId) => {
    onNavigate(sectionId);
    setIsOpen(false);
  };

  // Liste der Navigationslinks
  const navItems: {id: SectionId; label: string}[] = [
    { id: 'hero', label: 'HOME' },
    { id: 'about', label: 'ÜBER MICH' },
    { id: 'services', label: 'SERVICES' },
    { id: 'pricing', label: 'PRICING' },
    { id: 'testimonials', label: 'TESTIMONIALS' },
    { id: 'blog', label: 'BLOG' },
    { id: 'contact', label: 'KONTAKT' }
  ];

  return (
    <header className="fixed w-full z-50 bg-black">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="hero"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className="cursor-pointer"
            onClick={() => handleNavigate('hero')}
          >
            <img src={logo} alt="RODRIGUEZ PORTFOLIO" className="h-8" />
          </Link>

          <div className="flex items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavLinks currentSection={currentSection} onClick={handleNavigate} />
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="block md:hidden p-2 rounded-full bg-gray-800/50 text-white hover:bg-gray-700/50"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </motion.button>
          </div>
        </div>

        {/* Fullscreen Mobile Menu - Minimalist Style */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex flex-col"
              style={{ 
                backgroundColor: '#000000', 
                background: '#000000',
                color: 'white'
              }}
            >
              <div 
                className="container mx-auto px-6 py-8 flex flex-col h-full" 
                style={{ backgroundColor: '#000000', background: '#000000' }}
              >
                {/* Logo and Close Button */}
                <div className="flex justify-between items-center mb-12" style={{ backgroundColor: '#000000' }}>
                  <img src={logo} alt="RODRIGUEZ PORTFOLIO" className="h-8" />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="text-white"
                  >
                    <X size={30} />
                  </motion.button>
                </div>
                
                {/* Navigation Links */}
                <div className="flex flex-col items-center justify-center flex-grow" style={{ backgroundColor: '#000000' }}>
                  {navItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ delay: navItems.findIndex(nav => nav.id === item.id) * 0.1 }}
                      className="mb-8"
                      style={{ backgroundColor: '#000000' }}
                    >
                      <button
                        onClick={() => handleNavigate(item.id)}
                        className={`text-4xl font-bold ${
                          currentSection === item.id 
                            ? 'text-accent-400' 
                            : 'text-white hover:text-accent-300'
                        } transition-colors`}
                        style={{ backgroundColor: '#000000' }}
                      >
                        {item.label}
                      </button>
                    </motion.div>
                  ))}
                </div>
                
                {/* Contact Info */}
                <div className="text-center text-gray-400 text-sm mt-auto" style={{ backgroundColor: '#000000' }}>
                  <a href="mailto:diego@rodriguez-digital.de" className="text-white hover:text-accent-400 transition-colors block">
                    diego@rodriguez-digital.de
                  </a>
                  <a href="tel:+4915219377166" className="text-white hover:text-accent-400 transition-colors block mt-1">
                    +49 152 193 77166
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;