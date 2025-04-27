import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import CtaSection from './components/CtaSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TechStack from './components/TechStack';
import WaveTransition from './components/WaveTransition';
import Blog from './components/Blog/Blog';
import SEO from './components/SEO';
import { logPageView } from './utils/analytics';
import './styles/terminal.css';

type SectionId = 'hero' | 'about' | 'projects' | 'services' | 'pricing' | 'testimonials' | 'blog' | 'contact';

function App() {
  const [currentSection, setCurrentSection] = useState<SectionId>('hero');
  
  // Properly type the refs
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    pricing: useRef<HTMLDivElement>(null),
    testimonials: useRef<HTMLDivElement>(null),
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
          <div ref={sectionRefs.hero}><Hero /></div>
          <WaveTransition />
          <TechStack />
          <div ref={sectionRefs.about}><About /></div>
          <div ref={sectionRefs.projects}><Projects /></div>
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
          <div ref={sectionRefs.testimonials}><Testimonials /></div>
          
          {/* Zweite CTA-Sektion mit anderem Stil und Text */}
          <CtaSection 
            title="Noch Fragen?" 
            description="Vereinbare eine kostenlose Beratung und lass uns über dein Projekt sprechen" 
            buttonText="Kontakt aufnehmen" 
            targetSection="contact"
            bgColor="bg-gradient-to-r from-purple-600 to-blue-600"
            packageType="Custom"
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