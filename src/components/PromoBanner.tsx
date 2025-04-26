import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Clock, X } from 'lucide-react';
import { Link } from 'react-scroll';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [daysLeft, setDaysLeft] = useState(30);

  // Berechne die verbleibenden Tage bis Ende des Monats
  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date();
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const diffTime = Math.abs(lastDay.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays);
    };

    calculateDaysLeft();
    // Aktualisiere die verbleibenden Tage täglich
    const interval = setInterval(calculateDaysLeft, 86400000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-accent-500 to-accent-700 text-white py-3 px-4 shadow-lg"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-3 md:mb-0">
          <Clock className="w-5 h-5 mr-2" />
          <span className="font-medium">
            <span className="font-bold">Sonderangebot:</span> 15% Rabatt auf alle Website-Pakete für die nächsten {daysLeft} Tage!
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link
            to="pricing"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className="cursor-pointer bg-white text-accent-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium text-sm inline-flex items-center transition-colors"
          >
            Angebot sichern
          </Link>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Banner schließen"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PromoBanner;
