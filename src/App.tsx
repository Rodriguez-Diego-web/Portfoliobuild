import React, { useState } from 'react';
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

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-black dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header isDark={isDark} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <WaveTransition />
          <TechStack />
          <About />
          <Projects />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;