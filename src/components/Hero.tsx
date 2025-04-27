import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center items-center">
      {/* Einfacher schwarzer Hintergrund ohne Gradient */}
      <div className="absolute inset-0 bg-black z-0"></div>
      
      {/* Overlay Pattern mit verbesserter Sichtbarkeit */}
      <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:40px_40px] opacity-40 z-[1]"></div>
      
      {/* Text Content */}
      <div className="container relative z-[5] text-center px-4 md:px-8 py-8 mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-white mb-4 tracking-tighter"
        >
          <span className="block mb-2 md:mb-4">BUILD</span>
          <span className="block relative">
            FUTURE
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-orange-500 md:w-40 lg:w-56"></span>
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm md:text-lg text-gray-300 tracking-widest uppercase mb-8 md:mb-12 mt-6"
        >
          ENGINEERING TOMORROW'S DIGITAL EXPERIENCES TODAY
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 md:mt-16 lg:mt-24"
        >
          <p className="text-md sm:text-lg md:text-xl lg:text-2xl text-white font-light">
            WE DON'T IMAGINE FUTURES — <span className="text-orange-500">WE BUILD THEM</span>
          </p>
        </motion.div>
        
        {/* Scroll Down Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { duration: 1, delay: 1 },
            y: { repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1 }
          }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        >
          <div className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center py-2">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 h-2 bg-orange-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;