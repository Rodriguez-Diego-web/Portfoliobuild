import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Root from './components/Root';
import './index.css';
import './styles/terminal.css'
import './styles/tech-stack.css'
import './styles/mobile-fixes.css'
import { initGA } from './utils/analytics';

// Initialize Google Analytics
initGA();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
