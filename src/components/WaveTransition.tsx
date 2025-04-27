import { motion } from 'framer-motion';
import React from 'react';

const WaveTransition: React.FC = () => {
  return (
    <div className="relative overflow-hidden" style={{
      height: '150px',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      marginBottom: '-20px',
      transform: 'translateY(-20px)',
      zIndex: 1
    }}>
      <div className="absolute inset-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >

          {/* Dritte Welle - Details */}
          <motion.path
            initial={{ d: "M0,180 C320,190 420,170 720,180 C1020,190 1320,175 1440,180 L1440,200 L0,200 Z" }}
            animate={{
              d: [
                "M0,180 C320,190 420,170 720,180 C1020,190 1320,175 1440,180 L1440,200 L0,200 Z",
                "M0,175 C320,185 420,165 720,175 C1020,185 1320,170 1440,175 L1440,200 L0,200 Z",
                "M0,180 C320,190 420,170 720,180 C1020,190 1320,175 1440,180 L1440,200 L0,200 Z"
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
              delay: 1
            }}
            fill="#FF8C00"
            fillOpacity="0.1"
          />

          {/* Glitzer-Effekte */}
          <g>
            <motion.circle
              cx="30%"
              cy="80%"
              r="2"
              fill="#FF8C00"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            <motion.circle
              cx="70%"
              cy="85%"
              r="2"
              fill="#FF8C00"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
            <motion.circle
              cx="50%"
              cy="82%"
              r="3"
              fill="#FF8C00"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default WaveTransition;
