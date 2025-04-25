import React, { useState, FormEvent, FocusEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Linkedin, Github } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    message: string;
    type: 'success' | 'error' | '';
  }>({
    message: '',
    type: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xnqewlrn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus({ message: 'Message sent successfully!', type: 'success' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus({ message: 'Failed to send message. Please try again.', type: 'error' });
      }
    } catch (errorObj) {
      console.error('Form submission error:', errorObj);
      setFormStatus({ message: 'Failed to send message. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Smooth scroll to focused input on mobile
    const viewportHeight = window.innerHeight;
    const elementPosition = e.target.getBoundingClientRect().top;
    const offset = 150; // Adjust offset based on your layout

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
    <section id="contact" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-5xl font-bold text-center mb-16 text-accent-400">
            Kontaktiere mich
          </h2>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row gap-12 overflow-hidden rounded-2xl">
          {/* Kontaktformular Sektion - Linke Seite */}
          <div className="md:w-2/3 bg-neutral-900 p-8 rounded-2xl">
            <ScrollReveal>
              <h3 className="text-2xl font-semibold mb-6 text-accent-400">Schreib mir eine Nachricht</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      placeholder="Dein Name"
                      required
                      autoComplete="name"
                      className="w-full px-4 py-3 bg-neutral-800 rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-accent-400 text-base placeholder-gray-400 text-white"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      placeholder="Deine Email"
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 bg-neutral-800 rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-accent-400 text-base placeholder-gray-400 text-white"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Deine Nachricht"
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-neutral-800 rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-accent-400 text-base placeholder-gray-400 text-white"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 px-6 bg-accent-400 text-black font-semibold rounded-lg shadow-lg flex justify-center items-center space-x-2 transition-all disabled:opacity-70"
                >
                  <span>{isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}</span>
                  <Send className="w-5 h-5" />
                </motion.button>

                {formStatus.type === 'success' && (
                  <p className="text-green-400 text-center mt-4">{formStatus.message}</p>
                )}
                {formStatus.type === 'error' && (
                  <p className="text-red-400 text-center mt-4">{formStatus.message}</p>
                )}
              </form>
            </ScrollReveal>
          </div>

          {/* Kontaktinfo Sektion - Rechte Seite */}
          <div className="md:w-1/3 bg-neutral-900 p-8 rounded-2xl">
            <ScrollReveal>
              <h3 className="text-2xl font-semibold mb-8 text-accent-400">Kontaktdaten</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    target={info.title !== 'Location' ? '_blank' : undefined}
                    rel="noreferrer"
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center space-x-4 p-3 rounded-lg transition-colors hover:bg-neutral-800"
                  >
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-neutral-800 rounded-full text-accent-400">
                      <info.Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">{info.title}</h4>
                      <p className="text-gray-400">{info.content}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;