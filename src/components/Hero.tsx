import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, ArrowDown, Globe2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Hero = () => {
  const skills = [
    { name: 'UI/UX Design', icon: <span className="text-accent-400">UI</span> },
    {
      name: 'Design Systems',
      icon: <span className="text-accent-400">DS</span>,
    },
    { name: 'Development', icon: <span className="text-accent-400">Dev</span> },
    { name: 'Author', icon: <span className="text-accent-400">A</span> },
    { name: 'Website', icon: <span className="text-accent-400">Web</span> },
    { name: 'AI', icon: <span className="text-accent-400">AI</span> },
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1.0],
      },
    }),
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 pt-20">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,123,62,0.1),rgba(0,0,0,0)_50%)] dark:animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-black/50 dark:to-black" />
      </motion.div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" className="mb-8">
            <motion.h1
              custom={0}
              variants={textVariants}
              className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 text-gray-900 dark:text-white"
            >
              Digital Design
            </motion.h1>
            <motion.h2
              custom={1}
              variants={textVariants}
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 gradient-text"
            >
              Innovation & Strategy
            </motion.h2>
          </motion.div>

          <motion.p
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg md:text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-12 max-w-3xl mx-auto px-4"
          >
            Creating immersive digital experiences through design, motion, and
            development
          </motion.p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 px-4">
            {skills.map(({ name, icon }, index) => (
              <motion.div
                key={name}
                variants={textVariants}
                custom={index + 3}
                initial="hidden"
                animate="visible"
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgba(255,123,62,0.4)',
                }}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm rounded-full border border-accent-400/20"
              >
                <span className="font-medium">{icon}</span>
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  {name}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 px-4">
            <motion.a
              custom={7}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full overflow-hidden text-center"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent-500 to-accent-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative text-base sm:text-lg text-white font-medium">
                View Case Studies
              </span>
            </motion.a>
            <motion.a
              custom={8}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-dark-200/80 backdrop-blur-sm rounded-full border border-accent-400/30 overflow-hidden text-center"
            >
              <span className="absolute inset-0 bg-accent-400/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative text-base sm:text-lg text-accent-400 font-medium">
                Schedule Consultation
              </span>
            </motion.a>
          </div>

          <motion.div
            custom={9}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center space-x-6 sm:space-x-8"
          >
            {[
              {
                Icon: Globe2,
                href: 'https://interaktivesysteme.fun',
                label: 'Website',
              },
              { 
                Icon: Github, 
                href: 'https://github.com/Kadirdiegp', 
                label: 'GitHub' 
              },
              { 
                Icon: Linkedin, 
                href: 'https://www.linkedin.com/in/kadir-diego-padin-rodriguez-b1b2b0201/', 
                label: 'LinkedIn' 
              },
              {
                Icon: Instagram,
                href: 'https://www.instagram.com/kadirdiego_/',
                label: 'Instagram',
              },
            ].map(({ Icon, href, label }, index) => (
              <motion.a
                key={index}
                whileHover={{ scale: 1.2, y: -5 }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-accent-400 dark:hover:text-accent-400 transition-colors"
                aria-label={label}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ArrowDown className="w-6 h-6 text-accent-400" />
      </motion.div>
    </section>
  );
};

export default Hero;
