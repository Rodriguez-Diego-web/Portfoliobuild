import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

type CtaSectionProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  targetSection?: string;
  bgColor?: string;
  packageType?: string; // Neuer Parameter für die Paketauswahl
};

const CtaSection = ({
  title = "Bereit für deine neue Website?",
  description = "Sichere dir jetzt 15% Rabatt auf allen Website-Paketen bis Ende des Monats",
  buttonText = "Angebot sichern",
  targetSection = "pricing",
  bgColor = "bg-gradient-to-r from-accent-500 to-accent-700",
  packageType = "" // Standardmäßig kein Paket ausgewählt
}: CtaSectionProps) => {
  // Berechne die verbleibenden Tage bis Ende des Monats
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const diffTime = Math.abs(lastDay.getTime() - today.getTime());
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Funktion zum Weiterleiten mit URL-Parametern
  const handleButtonClick = () => {
    if (packageType && targetSection === "contact") {
      // Wenn ein Pakettyp definiert ist und zum Kontakt weitergeleitet wird,
      // füge den Pakettyp als URL-Parameter hinzu
      const url = new URL(window.location.href);
      url.hash = targetSection;
      url.searchParams.set("package", packageType);
      window.location.href = url.toString();
    } else {
      // Normales Scroll-Verhalten für andere Abschnitte
      document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="cta" className="relative py-16 overflow-hidden">
      {/* Hintergrund, der über die volle Bildschirmbreite geht */}
      <div className={`absolute inset-0 ${bgColor} w-screen left-[calc(50%-50vw)]`}></div>
      
      {/* Decorative elements */}
      <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {title}
            </h2>
            
            <div className="flex items-center justify-center mb-8">
              <Clock className="text-white/80 w-5 h-5 mr-2" />
              <p className="text-white/90 text-lg">
                Angebot endet in <span className="font-bold">{daysLeft} Tagen</span>
              </p>
            </div>
            
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              {description}
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button
                onClick={handleButtonClick}
                className="cursor-pointer group bg-white hover:bg-gray-100 text-accent-600 px-8 py-4 rounded-lg font-medium text-lg inline-flex items-center shadow-lg transition-colors"
              >
                {buttonText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CtaSection;
