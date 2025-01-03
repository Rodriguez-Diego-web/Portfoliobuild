import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Globe2, Star } from 'lucide-react';
import logo from '../assets/LOGO RODRIGUEZ_.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { Icon: Globe2, href: 'https://interaktivesysteme.fun', label: 'Website' },
    { Icon: Star, href: 'https://saskia-photographie.de', label: 'Website' },
    { Icon: Github, href: 'https://github.com/Kadirdiegp', label: 'GitHub' },
    { Icon: Linkedin, href: 'https://www.linkedin.com/in/kadir-diego-padin-rodriguez-b1b2b0201/', label: 'LinkedIn' },
    { Icon: Instagram, href: 'https://www.instagram.com/kadirdiego_/', label: 'Instagram' },
    { Icon: Mail, href: 'mailto:diego@rodriguez-digital.de', label: 'Email' }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-dark-100 py-8 sm:py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full flex justify-center"
          >
            <img 
              src={logo} 
              alt="Rodriguez Logo" 
              className="h-16 w-auto [filter:brightness(0)_saturate(100%)_invert(56%)_sepia(83%)_saturate(1234%)_hue-rotate(346deg)_brightness(102%)_contrast(101%)] dark:invert-0" 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex space-x-4 sm:space-x-6"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-gray-600 dark:text-gray-400 hover:text-accent-400 dark:hover:text-accent-400 transition-colors"
                whileHover={{ scale: 1.2, y: -5 }}
              >
                <link.Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 dark:text-gray-400 text-sm text-center"
          >
            © {currentYear} Kadir Diego Padin Rodriguez
            <br className="md:hidden" />
            <span className="hidden md:inline"> · </span>
            All rights reserved
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;