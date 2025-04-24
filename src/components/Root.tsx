import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';
import { logPageView } from '../utils/analytics';

const Root = () => {
  useEffect(() => {
    // Log page view on initial load
    logPageView();
  }, []);

  return (
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
};

export default Root;
