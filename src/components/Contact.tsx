import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Contact = () => {
  const contactInfo = [
    {
      Icon: Mail,
      title: 'Email',
      content: 'Rodriguez@digital.de',
      link: 'mailto:Rodriguez@digital.de'
    },
    {
      Icon: Phone,
      title: 'Phone',
      content: '0176 55429381',
      link: 'tel:017655429381'
    },
    {
      Icon: MapPin,
      title: 'Location',
      content: 'Cuxhaven, Germany',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-dark-100">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">Get in Touch</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-white dark:bg-dark-200 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-400 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-white dark:bg-dark-200 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-400 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full px-4 py-3 bg-white dark:bg-dark-200 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-400 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div className="relative">
                  <textarea
                    placeholder="Your Message"
                    rows={6}
                    className="w-full px-4 py-3 bg-white dark:bg-dark-200 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-400 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-accent-400 to-accent-600 text-white rounded-lg flex items-center justify-center space-x-2 hover:from-accent-500 hover:to-accent-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </motion.button>
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