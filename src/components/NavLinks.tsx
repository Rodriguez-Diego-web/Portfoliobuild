import React from 'react';
import { Link } from 'react-scroll';

interface NavLinksProps {
  mobile?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ mobile, setIsOpen }) => {
  const links = [
    { to: 'about', label: 'About' },
    { to: 'services', label: 'Services' },
    { to: 'projects', label: 'Projects' },
    { to: 'contact', label: 'Contact' }
  ];

  const handleClick = () => {
    if (mobile && setIsOpen) {
      setIsOpen(false);
    }
  };

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
          onClick={handleClick}
          className={`cursor-pointer text-light-900 hover:text-accent-400 transition-colors ${
            mobile ? 'block py-2 px-4' : ''
          }`}
        >
          {label}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
