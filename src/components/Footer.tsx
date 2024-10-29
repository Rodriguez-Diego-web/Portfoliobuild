import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Globe2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { Icon: Globe2, href: 'https://interaktivesysteme.fun', label: 'Website' },
    { Icon: Github, href: 'https://github.com/Kadirdiegp', label: 'GitHub' },
    { Icon: Linkedin, href: 'https://www.linkedin.com/in/kadir-diego-padin-rodriguez-b1b2b0201/', label: 'LinkedIn' },
    { Icon: Instagram, href: 'https://www.instagram.com/kadirdiego_/', label: 'Instagram' },
    { Icon: Mail, href: 'mailto:Rodriguez@digital.de', label: 'Email' }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-dark-100 py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-0"
          >
            <span className="text-2xl font-bold gradient-text">KDR</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex space-x-6 mb-6 md:mb-0"
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
            className="text-gray-600 dark:text-gray-400 text-sm"
          >
            © {currentYear} Kadir Diego Padin Rodriguez. All rights reserved. Rodriguez Digital
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;