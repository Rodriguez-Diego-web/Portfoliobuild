import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
  threshold?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0,
  duration = 0.8,
  className = '',
  distance = 40,
  threshold = 0.1,
  staggerChildren = false,
  staggerDelay = 0.1
}: ScrollRevealProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
    rootMargin: '-50px 0px',
  });

  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const initialDirection = directions[direction];

  const containerVariants = {
    hidden: { 
      opacity: 0,
      ...initialDirection
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.215, 0.610, 0.355, 1.000], // Improved easing
        when: "beforeChildren",
        staggerChildren: staggerChildren ? staggerDelay : 0,
      }
    }
  };

  const childVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.610, 0.355, 1.000], // Matching easing
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {staggerChildren ? (
        React.Children.map(children, child => (
          <motion.div variants={childVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        children
      )}
    </motion.div>
  );
};

export default ScrollReveal;