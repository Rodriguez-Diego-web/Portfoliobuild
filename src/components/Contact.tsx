import React, { useState, FormEvent, FocusEvent, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Linkedin, Github } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import emailjs from '@emailjs/browser';

// EmailJS-Konfiguration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_yo3ovyt';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_84x1pto';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '2FiVwKz2ZCrHs-_gh'; // Exakt wie im Dashboard angezeigt

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',       // Geändert von user_name zu name für das Template
    email: '',      // Geändert von user_email zu email für das Template
    message: '',
    package: '',
    phone: '',
    subject: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    message: string;
    type: 'success' | 'error' | '';
  }>({
    message: '',
    type: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // URL-Parameter auslesen (für Weiterleitungen von den CTA-Buttons)
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const packageParam = queryParams.get('package');
    const subjectParam = queryParams.get('subject');
    
    if (packageParam) {
      setFormData(prev => ({ 
        ...prev, 
        package: packageParam,
        subject: subjectParam ? subjectParam : `Anfrage zum ${packageParam}-Paket`
      }));
      
      // Nach dem Auslesen der Parameters die URL säubern, ohne die Seite neu zu laden
      const url = new URL(window.location.href);
      url.search = '';
      window.history.replaceState({}, document.title, url.toString());
      
      // Zum Kontaktformular scrollen
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Formular wird gesendet mit Daten:', formData);
    
    if (isSubmitting) return;
    
    // Zurücksetzen des Formularstatus vor dem Absenden
    setFormStatus({ message: '', type: '' });
    setIsSubmitting(true);
    
    try {
      console.log('Formular wird an EmailJS gesendet mit Daten:', formData);
      
      // Wir verwenden hier send statt sendForm, da wir das exakte Objekt-Mapping kontrollieren können
      const templateParams = {
        // Variablen für das Template
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Nicht angegeben',
        subject: formData.subject,
        package: formData.package || 'Nicht ausgewählt',
        message: formData.message,
        
        // Zusätzliche Variablen, die EmailJS möglicherweise erwartet
        user_name: formData.name,
        user_email: formData.email,
        from_name: formData.name,
        
        // Standardvariablen
        to_name: 'Diego Rodriguez',
        reply_to: formData.email
      };
      
      console.log('Template Params:', templateParams);
      
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS Ergebnis:', result);

      if (result.text === 'OK') {
        setFormStatus({ message: 'Nachricht erfolgreich gesendet!', type: 'success' });
        setFormData({ name: '', email: '', message: '', package: '', phone: '', subject: '' });
      } else {
        setFormStatus({ message: 'Fehler beim Senden der Nachricht. Bitte versuche es erneut.', type: 'error' });
      }
    } catch (errorObj: Error | unknown) {
      console.error('Formular-Übermittlungsfehler:', errorObj);
      let errorMessage = 'Fehler beim Senden der Nachricht. Bitte versuche es erneut.';
      
      if (errorObj && typeof errorObj === 'object' && 'text' in errorObj) {
        errorMessage += ` (${(errorObj as { text: string }).text})`;
      }
      
      setFormStatus({ message: errorMessage, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'package' && value) {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        subject: `Anfrage zum ${value}-Paket` 
      }));
    } else if (name === 'email') {
      // Wenn sich die E-Mail ändert, aktualisiere auch das versteckte reply_to Feld
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Manuell das reply_to Feld aktualisieren
      const replyToField = document.querySelector('input[name="reply_to"]') as HTMLInputElement;
      if (replyToField) {
        replyToField.value = value;
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const viewportHeight = window.innerHeight;
    const elementPosition = e.target.getBoundingClientRect().top;
    const offset = 150; 

    if (elementPosition > viewportHeight / 2) {
      window.scrollBy({
        top: elementPosition - viewportHeight / 2 + offset,
        behavior: 'smooth'
      });
    }
  };

  const contactInfo = [
    {
      Icon: Mail,
      title: 'Email',
      content: 'diego@rodriguez-digital.de',
      link: 'mailto:diego@rodriguez-digital.de'
    },
    {
      Icon: Phone,
      title: 'Anrufen',
      content: '0152 193 77166',
      link: 'tel:+4915219377166'
    },
    {
      Icon: MessageSquare,
      title: 'WhatsApp',
      content: '0176 41673111',
      link: 'https://wa.me/4917641673111'
    },
    {
      Icon: MapPin,
      title: 'Location',
      content: 'Cuxhaven, Germany',
      link: '#'
    },
    {
      Icon: Linkedin,
      title: 'LinkedIn',
      content: 'Diego Rodriguez',
      link: 'https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile'
    },
    {
      Icon: Github,
      title: 'GitHub',
      content: 'Rodriguez-Diego-web',
      link: 'https://github.com/Rodriguez-Diego-web'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-dark-200">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-4xl font-bold mb-4 text-center gradient-text">Kontakt</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Lass uns über dein Projekt sprechen und gemeinsam etwas Großartiges schaffen
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ScrollReveal className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-dark-300 p-6 rounded-xl shadow-lg h-full">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
                Kontaktinformationen
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a 
                    key={index}
                    href={item.link}
                    target={item.link.startsWith('http') ? '_blank' : undefined}
                    rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start group"
                  >
                    <div className="bg-accent-400/10 p-3 rounded-lg mr-4">
                      <item.Icon className="w-5 h-5 text-accent-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {item.title}
                      </h4>
                      <p className="text-gray-800 dark:text-white group-hover:text-accent-500 dark:group-hover:text-accent-400 transition-colors">
                        {item.content}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-2">
            <div className="bg-white dark:bg-dark-100 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
                Schreib mir eine Nachricht
              </h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                {/* Versteckte Felder für EmailJS */}
                <input type="hidden" name="to_name" value="Diego Rodriguez" />
                <input type="hidden" name="reply_to" value={formData.email} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-300 rounded-lg focus:ring-2 focus:ring-accent-400 focus:border-transparent bg-white dark:bg-dark-200 text-gray-800 dark:text-white"
                      placeholder="Dein Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-300 rounded-lg focus:ring-2 focus:ring-accent-400 focus:border-transparent bg-white dark:bg-dark-200 text-gray-800 dark:text-white"
                      placeholder="deine@email.de"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Telefon (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-300 rounded-lg focus:ring-2 focus:ring-accent-400 focus:border-transparent bg-white dark:bg-dark-200 text-gray-800 dark:text-white"
                      placeholder="Deine Telefonnummer"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="package" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Interessiertes Paket
                    </label>
                    <select
                      id="package"
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-300 rounded-lg focus:ring-2 focus:ring-accent-400 focus:border-transparent bg-white dark:bg-dark-200 text-gray-800 dark:text-white"
                    >
                      <option value="">Bitte auswählen (optional)</option>
                      <option value="Basic">Basic Website (999€)</option>
                      <option value="Pro">Pro Website (1.999€)</option>
                      <option value="Premium">Premium Website (3.999€)</option>
                      <option value="Custom">Individuelles Angebot</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Betreff
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-300 rounded-lg focus:ring-2 focus:ring-accent-400 focus:border-transparent bg-white dark:bg-dark-200 text-gray-800 dark:text-white"
                    placeholder="Worum geht es?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nachricht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-300 rounded-lg focus:ring-2 focus:ring-accent-400 focus:border-transparent bg-white dark:bg-dark-200 text-gray-800 dark:text-white resize-none"
                    placeholder="Wie kann ich dir helfen?"
                  ></textarea>
                </div>
                
                {formStatus.message && (
                  <div className={`p-3 rounded-lg ${
                    formStatus.type === 'success' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' 
                      : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
                  }`}>
                    {formStatus.message}
                  </div>
                )}
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-3 bg-gradient-to-r from-accent-400 to-accent-600 text-white font-medium rounded-lg flex items-center justify-center shadow-lg ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Nachricht senden
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;