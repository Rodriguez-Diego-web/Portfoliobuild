import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Users } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const About = () => {
  const stats = [
    { icon: Briefcase, value: '2+', label: 'Years Experience' },
    { icon: Users, value: '30+', label: 'Happy Clients' },
    { icon: Award, value: '20+', label: 'Projects Completed' },
    { icon: GraduationCap, value: 'BSc', label: 'In Progress' }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-dark-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-400/20 to-accent-600/20 rounded-2xl transform rotate-6"></div>
              <img
                src="https://cdn.myportfolio.com/add13447-08e1-432a-b6ca-518d52c281da/ca829f95-6ddd-4463-97c8-350c99eddcf1_rw_1200.jpg?h=8d27d4b93e98c0198badded33d9bbf34"
                alt="Creative workspace"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            <ScrollReveal>
              <h2 className="text-4xl font-bold gradient-text">About Me</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg leading-relaxed">
                As a multidisciplinary designer and developer, I specialize in creating immersive digital experiences through a combination of 2D and 3D design, motion graphics, and development.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                My expertise spans across various creative tools including Blender for 3D modeling, After Effects for motion design, and modern development frameworks for web and mobile applications.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="text-center p-4 bg-white dark:bg-dark-200 rounded-xl border border-accent-400/20 shadow-lg"
                  >
                    <div className="inline-block p-3 bg-gradient-to-br from-accent-400/20 to-accent-600/20 rounded-lg mb-3">
                      <stat.icon className="w-6 h-6 text-accent-400" />
                    </div>
                    <div className="text-2xl font-bold text-accent-400 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex flex-wrap gap-4 mt-8">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="px-8 py-3 bg-gradient-to-r from-accent-400 to-accent-600 text-white rounded-full hover:from-accent-500 hover:to-accent-700 transition-all shadow-lg hover:shadow-accent-400/30"
                >
                  Hire Me
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects"
                  className="px-8 py-3 border-2 border-accent-400 text-accent-400 rounded-full hover:bg-accent-400/10 transition-colors"
                >
                  View Portfolio
                </motion.a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;