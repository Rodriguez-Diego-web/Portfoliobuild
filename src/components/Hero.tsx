import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center items-center">
      {/* Overlay Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] opacity-40 z-10"></div>
      
      {/* Text Content */}
      <div className="container relative z-20 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-9xl font-bold text-white mb-4 tracking-tighter"
        >
          <span className="block">BUILD</span>
          <span className="block">FUTURE</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-lg text-gray-300 tracking-widest uppercase mb-12"
        >
          ENGINEERING TOMORROW'S DIGITAL EXPERIENCES TODAY
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 md:mt-24"
        >
          <p className="text-lg md:text-2xl text-white font-light">
            WE DON'T IMAGINE FUTURES — WE BUILD THEM
          </p>
        </motion.div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
};

export default Hero;