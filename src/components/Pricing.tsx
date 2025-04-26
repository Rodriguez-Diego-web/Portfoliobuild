import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Check, X } from 'lucide-react';

const Pricing = () => {
  const pricingPlans = [
    {
      name: 'Basic',
      price: '999€',
      description: 'Perfekt für kleine Unternehmen, die eine professionelle Online-Präsenz benötigen.',
      features: [
        { included: true, text: 'Responsive Design' },
        { included: true, text: 'Bis zu 5 Seiten' },
        { included: true, text: 'Kontaktformular' },
        { included: true, text: 'SEO-Grundoptimierung' },
        { included: true, text: 'Social Media Integration' },
        { included: false, text: 'Content Management System' },
        { included: false, text: 'E-Commerce Funktionen' },
        { included: false, text: 'Premium Support' }
      ],
      accentColor: 'from-blue-400 to-blue-600',
      borderColor: 'border-blue-400/40',
      buttonColor: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Pro',
      price: '1.999€',
      description: 'Ideal für wachsende Unternehmen mit höheren Anforderungen an Design und Funktionalität.',
      features: [
        { included: true, text: 'Responsive Design' },
        { included: true, text: 'Bis zu 10 Seiten' },
        { included: true, text: 'Kontaktformular' },
        { included: true, text: 'Umfassende SEO-Optimierung' },
        { included: true, text: 'Social Media Integration' },
        { included: true, text: 'Content Management System' },
        { included: true, text: 'Basis E-Commerce Funktionen' },
        { included: false, text: 'Premium Support' }
      ],
      accentColor: 'from-accent-400 to-accent-600',
      borderColor: 'border-accent-400/40',
      buttonColor: 'bg-accent-500 hover:bg-accent-600',
      highlighted: true
    },
    {
      name: 'Premium',
      price: '3.999€',
      description: 'Maßgeschneiderte Lösung für Unternehmen mit komplexen Anforderungen und hohem Anspruch.',
      features: [
        { included: true, text: 'Responsive Design' },
        { included: true, text: 'Unbegrenzte Seiten' },
        { included: true, text: 'Erweiterte Formulare' },
        { included: true, text: 'Premium SEO-Optimierung' },
        { included: true, text: 'Social Media Integration' },
        { included: true, text: 'Fortschrittliches CMS' },
        { included: true, text: 'Vollständige E-Commerce Lösungen' },
        { included: true, text: 'Premium Support & Wartung' }
      ],
      accentColor: 'from-purple-400 to-purple-600',
      borderColor: 'border-purple-400/40',
      buttonColor: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  // Funktion zum Weiterleiten mit URL-Parametern
  const handlePackageSelect = (packageType: string) => {
    const url = new URL(window.location.href);
    url.hash = 'contact';
    url.searchParams.set("package", packageType);
    window.location.href = url.toString();
  };

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-dark-200">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-4xl font-bold mb-4 text-center gradient-text">
            Webseiten-Pakete
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Maßgeschneiderte Webseiten-Lösungen für dein Unternehmen - von einfachen Visitenkarten-Seiten bis hin zu komplexen E-Commerce-Plattformen
          </p>
        </ScrollReveal>

        <ScrollReveal staggerChildren staggerDelay={0.1} threshold={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className={`relative flex flex-col h-full rounded-2xl overflow-hidden shadow-xl ${
                  plan.highlighted ? 'border-2 border-accent-400' : 'border border-gray-200 dark:border-dark-300'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-0 bg-accent-500 text-white px-4 py-1 rounded-bl-lg font-medium z-10">
                    Beliebt
                  </div>
                )}
                
                <div className={`p-8 ${plan.highlighted ? 'bg-gradient-to-br from-accent-400/10 to-accent-600/10' : ''}`}>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                    {plan.name}
                  </h3>
                  <div className="flex items-end mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1 mb-1">/ einmalig</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex} 
                        className="flex items-center"
                      >
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                        )}
                        <span className={`${
                          feature.included 
                            ? 'text-gray-700 dark:text-gray-300' 
                            : 'text-gray-500 dark:text-gray-500'
                        }`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePackageSelect(plan.name)}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                      plan.highlighted 
                        ? 'bg-accent-500 hover:bg-accent-600' 
                        : 'bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600'
                    } transition-colors`}
                  >
                    Anfrage starten
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Benötigst du eine individuelle Lösung? Ich erstelle dir gerne ein maßgeschneidertes Angebot für dein Projekt.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePackageSelect('Custom')}
              className="px-8 py-3 bg-gradient-to-r from-accent-400 to-accent-600 text-white font-medium rounded-lg shadow-lg"
            >
              Individuelles Angebot anfragen
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Pricing;
