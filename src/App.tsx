import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TechStack from './components/TechStack';
import WaveTransition from './components/WaveTransition';
import './styles/terminal.css';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [currentSection, setCurrentSection] = useState('hero');
  
  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    projects: useRef(null),
    services: useRef(null),
    contact: useRef(null)
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs[sectionId]?.current;
    if (section) {
      section.scrollIntoView({ behavior: 'auto' });
      setCurrentSection(sectionId);
    }
  };

  return (
    <div className="dark">
      <div className="min-h-screen bg-black dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
        <Header 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
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
          <div ref={sectionRefs.contact}><Contact /></div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;