import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Müller",
      company: "Café Sonnenschein",
      image: "/testimonials/sarah.jpg", // Platzhalter-Image, kann später ersetzt werden
      quote: "Diego hat unsere Website komplett überarbeitet und das Ergebnis hat unsere Erwartungen übertroffen. Seit dem Relaunch haben sich unsere Online-Reservierungen um 40% erhöht!",
      stars: 5,
      service: "Premium Website"
    },
    {
      name: "Markus Schmidt",
      company: "Innovate Tech GmbH",
      image: "/testimonials/markus.jpg", // Platzhalter-Image, kann später ersetzt werden
      quote: "Die Zusammenarbeit mit Diego war von Anfang bis Ende professionell. Er hat verstanden, was wir brauchten, bevor wir es selbst wussten. Unser neues Corporate Design hebt uns wirklich von der Konkurrenz ab.",
      stars: 5,
      service: "Brand Identity & Website"
    },
    {
      name: "Julia Weber",
      company: "Fitnessstudio PowerMove",
      image: "/testimonials/julia.jpg", // Platzhalter-Image, kann später ersetzt werden
      quote: "Dank unserer neuen Website und den Social Media Templates von Diego konnten wir unsere Mitgliederzahlen deutlich steigern. Die Website lädt schnell, sieht modern aus und funktioniert einwandfrei auf allen Geräten.",
      stars: 5,
      service: "Pro Website & Social Media Kit"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-dark-100">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-4xl font-bold mb-4 text-center gradient-text">
            Kundenstimmen
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Erfahre, was meine Kunden über die Zusammenarbeit und die Ergebnisse sagen
          </p>
        </ScrollReveal>

        <ScrollReveal staggerChildren staggerDelay={0.1} threshold={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="relative bg-white dark:bg-dark-200 rounded-xl shadow-xl overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200 dark:bg-dark-300 mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback bei Bild-Fehler
                          e.currentTarget.src = '/hero.jpg';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-accent-400">{testimonial.company}</p>
                      <div className="flex mt-1">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Quote className="absolute top-0 left-0 w-8 h-8 text-accent-400/20 -translate-x-3 -translate-y-3" />
                    <p className="text-gray-600 dark:text-gray-300 italic mb-4 z-10 relative">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-300">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Projekt: <span className="font-medium text-accent-400">{testimonial.service}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Diese Kunden haben mit meinen Webdesign-Lösungen Erfolg erzielt.
            </p>
            <p className="text-xl font-medium text-gray-800 dark:text-white mb-8">
              Möchtest du der nächste Erfolgsfall sein?
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-accent-400 to-accent-600 text-white font-medium rounded-lg shadow-lg"
            >
              Kostenlose Beratung vereinbaren
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;
