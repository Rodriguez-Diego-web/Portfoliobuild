import React from 'react';
import { Link } from 'react-scroll';
import { SectionId } from '../types';

interface NavLinksProps {
  currentSection: SectionId;
  onClick: (sectionId: SectionId) => void;
  isMobile?: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ currentSection, onClick, isMobile }) => {
  const links = [
    { to: 'about' as SectionId, label: 'About' },
    { to: 'services' as SectionId, label: 'Services' },
    { to: 'pricing' as SectionId, label: 'Preise' },
    { to: 'testimonials' as SectionId, label: 'Referenzen' },
    { to: 'portfolio' as SectionId, label: 'Projects' },
    { to: 'contact' as SectionId, label: 'Contact' }
  ];

  return (
    <>
      {links.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          onClick={() => onClick(to)}
          className={`cursor-pointer transition-colors 
            ${currentSection === to 
              ? 'text-accent-400 font-medium' 
              : 'text-light-900 hover:text-accent-400'} 
            ${isMobile ? 'block py-2 px-4' : 'inline-block mx-3'}`}
        >
          {label}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
