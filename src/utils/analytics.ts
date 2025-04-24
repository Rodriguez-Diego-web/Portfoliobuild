import ReactGA from 'react-ga4';

// Replace this with your actual Google Analytics measurement ID
const MEASUREMENT_ID = 'G-XXXXXXXXXX'; // <- Hier deine tatsächliche GA4 Measurement ID einsetzen (z.B. 'G-ABC123XYZ')

export const initGA = (): void => {
  if (typeof window !== 'undefined') {
    // Initialisiere Google Analytics mit deiner Measurement ID
    ReactGA.initialize(MEASUREMENT_ID, {
      testMode: import.meta.env.DEV // Nur Testmodus in der Entwicklungsumgebung
    });
    console.log('Google Analytics initialized with ID:', MEASUREMENT_ID);
  }
};

export const logPageView = (): void => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
};

export const logEvent = (category: string, action: string, label?: string): void => {
  ReactGA.event({
    category,
    action,
    label
  });
};

export const logException = (description: string, fatal = false): void => {
  // Using event to log exceptions since exception method is not available in GA4
  ReactGA.event({
    category: 'Exception',
    action: description,
    label: fatal ? 'fatal' : 'non-fatal'
  });
};
