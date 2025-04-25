// Da Google Analytics bereits im HTML-Head initialisiert wird,
// ist diese Datei nur ein Helper für zusätzliche Tracking-Funktionen

// Type-Definition für globales gtag-Objekt
declare global {
  interface Window {
    gtag: (command: string, action: string, params?: Record<string, unknown>) => void;
  }
}

export const initGA = (): void => {
  // Da GA bereits im HTML initialisiert wird, tun wir hier nichts mehr
  if (typeof window !== 'undefined' && import.meta.env.DEV) {
    console.log('GA ist bereits im HTML initialisiert - JS-Initialisierung übersprungen');
  }
};

// Die folgenden Methoden sind Wrapper um die global verfügbaren gtag-Funktionen
export const logPageView = (): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: window.location.pathname + window.location.search
    });
  }
};

export const logEvent = (category: string, action: string, label?: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
};

export const logException = (description: string, fatal = false): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description,
      fatal
    });
  }
};
