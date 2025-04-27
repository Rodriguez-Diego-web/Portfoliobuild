import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Pricing from './components/Pricing';
import CtaSection from './components/CtaSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TechStack from './components/TechStack';
import Blog from './components/Blog/Blog';
import SEO from './components/SEO';
import { logPageView } from './utils/analytics';
import { SectionId } from './types';
import './styles/wave.css';

function App() {
  const [currentSection, setCurrentSection] = useState<SectionId>('hero');
  
  // Properly type the refs
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    portfolio: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    pricing: useRef<HTMLDivElement>(null),
    blog: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null)
  };

  // Track page changes for Google Analytics
  useEffect(() => {
    const handleHashChange = () => {
      logPageView();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToSection = (sectionId: SectionId) => {
    const section = sectionRefs[sectionId]?.current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(sectionId);
    }
  };

  return (
    <div className="dark">
      {/* SEO Component with default values */}
      <SEO />
      
      <div className="min-h-screen bg-black dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
        <Header 
          onNavigate={scrollToSection}
          currentSection={currentSection}
        />
        <main onClick={(e) => e.stopPropagation()}>
          <div ref={sectionRefs.hero} className="relative">
            <Hero />
            {/* Hero Wave - mit verbesserten CSS-Klassen */}
            <div className="hero-wave-container">
              <svg 
                className="hero-wave" 
                viewBox="0 0 1200 120" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
                  style={{ fill: "#FF8C00", opacity: 0.85 }}
                />
              </svg>
            </div>
          </div>
          <TechStack />
          <div ref={sectionRefs.about}><About /></div>
          <div ref={sectionRefs.portfolio}><Projects /></div>
          <div ref={sectionRefs.services}><Services /></div>
          
          {/* Erste CTA-Sektion vor Pricing */}
          <CtaSection 
            title="Bereit für deine neue Website?" 
            description="Sichere dir jetzt 15% Rabatt auf allen Website-Paketen bis Ende des Monats" 
            buttonText="Angebot sichern" 
            targetSection="pricing"
            packageType="Website"
          />
          
          <div ref={sectionRefs.pricing}><Pricing /></div>
          
          {/* Zweite CTA-Sektion mit anderem Stil und Text */}
          <CtaSection 
            title="Noch Fragen?" 
            description="Vereinbare eine kostenlose Beratung und lass uns über dein Projekt sprechen" 
            buttonText="Kontakt aufnehmen" 
            targetSection="contact"
            bgColor="bg-gradient-to-r from-blue-500 to-blue-700"
          />
          
          <div ref={sectionRefs.blog}><Blog /></div>
          <div ref={sectionRefs.contact}><Contact /></div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;