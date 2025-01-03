import { motion } from 'framer-motion';

const WaveTransition = () => {
  return (
    <div className="relative w-full h-48 overflow-hidden -mt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute w-full h-full"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Erste Welle - Hintergrund */}
          <motion.path
            initial={{ d: "M0,160 C320,200 420,0 720,100 C1020,200 1320,80 1440,160 L1440,200 L0,200 Z" }}
            animate={{
              d: [
                "M0,160 C320,200 420,0 720,100 C1020,200 1320,80 1440,160 L1440,200 L0,200 Z",
                "M0,180 C320,100 420,200 720,100 C1020,0 1320,180 1440,140 L1440,200 L0,200 Z",
                "M0,160 C320,200 420,0 720,100 C1020,200 1320,80 1440,160 L1440,200 L0,200 Z"
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut"
            }}
            fill="#FF8C00"
            fillOpacity="0.2"
          />

          {/* Zweite Welle - Vordergrund */}
          <motion.path
            initial={{ d: "M0,180 C320,100 420,200 720,100 C1020,0 1320,180 1440,140 L1440,200 L0,200 Z" }}
            animate={{
              d: [
                "M0,180 C320,100 420,200 720,100 C1020,0 1320,180 1440,140 L1440,200 L0,200 Z",
                "M0,160 C320,200 420,0 720,100 C1020,200 1320,80 1440,160 L1440,200 L0,200 Z",
                "M0,180 C320,100 420,200 720,100 C1020,0 1320,180 1440,140 L1440,200 L0,200 Z"
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
              delay: 0.5
            }}
            fill="#FF8C00"
            fillOpacity="0.3"
          />

          {/* Dritte Welle - Details */}
          <motion.path
            initial={{ d: "M0,170 C320,150 420,100 720,150 C1020,200 1320,130 1440,150 L1440,200 L0,200 Z" }}
            animate={{
              d: [
                "M0,170 C320,150 420,100 720,150 C1020,200 1320,130 1440,150 L1440,200 L0,200 Z",
                "M0,150 C320,200 420,150 720,100 C1020,50 1320,150 1440,170 L1440,200 L0,200 Z",
                "M0,170 C320,150 420,100 720,150 C1020,200 1320,130 1440,150 L1440,200 L0,200 Z"
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
              cy="50%"
              r="2"
              fill="#FF8C00"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            <motion.circle
              cx="70%"
              cy="30%"
              r="2"
              fill="#FF8C00"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            />
            <motion.circle
              cx="85%"
              cy="60%"
              r="2"
              fill="#FF8C00"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

export default WaveTransition;
