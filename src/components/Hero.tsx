import { useEffect, useState } from 'react';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initiale Überprüfung
    checkIfMobile();
    
    // Event-Listener für Fenstergrößenänderungen
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Overlay Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] opacity-40 z-10"></div>
      
      {/* Background Image - Stabile Positionierung */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img 
          src={isMobile ? "/1.jpg" : "/hero.jpg"} 
          alt="Build Future" 
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center center' }}
        />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full px-4 text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-center uppercase tracking-wider">
          Build Future
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-center max-w-xl mb-8">
          ENGINEERING TOMORROW'S DIGITAL EXPERIENCES TODAY
        </p>
        <p className="text-xs md:text-sm text-center max-w-md opacity-80">
          WE DON'T IMAGINE FUTURES — WE BUILD THEM
        </p>
      </div>
    </section>
  );
};

export default Hero;