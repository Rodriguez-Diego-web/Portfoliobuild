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
    </section>
  );
};

export default Hero;