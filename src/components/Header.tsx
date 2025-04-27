import { Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';
import { useState, useEffect } from 'react';
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
    { id: 'blog', label: 'BLOG' },
    { id: 'contact', label: 'KONTAKT' }
  ];

  return (
    <>
      {/* Normaler Header - immer sichtbar */}
      <header className="fixed w-full z-50 bg-black">
        <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo links */}
          <Link
            to="hero"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            style={{ cursor: 'pointer' }}
            onClick={() => handleNavigate('hero')}
          >
            <img src={logo} alt="RODRIGUEZ PORTFOLIO" style={{ height: '32px' }} />
          </Link>

          {/* Navigation/Button rechts */}
          <div>
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavLinks currentSection={currentSection} onClick={handleNavigate} />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="block md:hidden"
              style={{ 
                padding: '8px', 
                borderRadius: '9999px', 
                backgroundColor: 'rgba(31, 41, 55, 0.5)',
                color: 'white'
              }}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu als absolut positioniertes Overlay */}
      {isOpen && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: 'black',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column'
          }}
          className="md:hidden"
        >
          {/* Exakt gleicher Header wie oben - mit inline styles für exakte Positionierung */}
          <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo links - exakt dieselbe Struktur wie im normalen Header */}
            <Link
              to="hero"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              style={{ cursor: 'pointer' }}
              onClick={() => handleNavigate('hero')}
            >
              <img src={logo} alt="RODRIGUEZ PORTFOLIO" style={{ height: '32px' }} />
            </Link>
            
            {/* X-Button rechts - exakt dieselbe Größe und Position wie der Menu-Button */}
            <button
              onClick={() => setIsOpen(false)}
              style={{ 
                padding: '8px', 
                borderRadius: '9999px', 
                backgroundColor: 'rgba(31, 41, 55, 0.5)',
                color: 'white'
              }}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Navigation Links */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexGrow: 1
          }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                style={{ 
                  fontSize: '1.875rem', 
                  fontWeight: 'bold', 
                  padding: '1rem 0',
                  color: currentSection === item.id ? '#f97316' : 'white'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Kontaktdaten */}
          <div style={{ textAlign: 'center', color: '#9ca3af', padding: '1rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>diego@rodriguez-digital.de</div>
            <div>+49 152 193 77166</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;