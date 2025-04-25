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
    <section id="contact" className="py-20 bg-gray-50 dark:bg-dark-100">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">Kontaktiere mich</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ScrollReveal>
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
                      placeholder="Your Name"
                      required
                      autoComplete="name"
                      className="w-full px-4 py-3 bg-white dark:bg-dark-200 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-400 text-base"
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
                      placeholder="Your Email"
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 bg-white dark:bg-dark-200 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-400 text-base"
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
                    placeholder="Your Message"
                    required
                    rows={6}
                    autoComplete="off"
                    className="w-full px-4 py-3 bg-white dark:bg-dark-200 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-400 resize-none text-base"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-accent-400 to-accent-600 text-white rounded-lg flex items-center justify-center space-x-2 hover:from-accent-500 hover:to-accent-700 transition-colors disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send className="w-5 h-5" />
                </motion.button>

                {formStatus.type === 'success' && (
                  <p className="text-green-500 text-center mt-4">{formStatus.message}</p>
                )}
                {formStatus.type === 'error' && (
                  <p className="text-red-500 text-center mt-4">{formStatus.message}</p>
                )}
              </form>
            </ScrollReveal>
          </div>

          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <motion.a
                  href={info.link}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start p-6 bg-white dark:bg-dark-200 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="p-3 bg-accent-400/10 rounded-lg">
                    <info.Icon className="w-6 h-6 text-accent-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">{info.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{info.content}</p>
                  </div>
                </motion.a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;