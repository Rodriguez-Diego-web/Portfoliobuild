import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Users } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const About = () => {
  const stats = [
    { icon: Briefcase, value: '2+', label: 'Jahre Erfahrung' },
    { icon: Users, value: '30+', label: 'Zufriedene Kunden' },
    { icon: Award, value: '20+', label: 'Abgeschlossene Projekte' },
    { icon: GraduationCap, value: 'BSc', label: 'In Bearbeitung' }
  ];

  return (
    <section id="about" className="py-24 bg-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] opacity-40"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image Side - Left on desktop, top on mobile */}
          <ScrollReveal className="w-full lg:w-1/2">
            <div className="relative">
              {/* Orange Highlight Element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent-400 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent-400 rounded-full opacity-20 blur-xl"></div>
              
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-md border border-accent-400 shadow-xl">
                <img
                  src="https://cdn.myportfolio.com/add13447-08e1-432a-b6ca-518d52c281da/ca829f95-6ddd-4463-97c8-350c99eddcf1_rw_1200.jpg?h=8d27d4b93e98c0198badded33d9bbf34"
                  alt="Creative workspace"
                  className="w-full object-cover rounded-md"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent opacity-60"></div>
              </div>
            </div>
          </ScrollReveal>

          {/* Content Side - Right on desktop, bottom on mobile */}
          <div className="w-full lg:w-1/2 space-y-10">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-4xl font-bold">
                  <span className="text-accent-400">Über</span> Mich
                </h2>
                <div className="h-1 w-20 bg-accent-400 rounded-full"></div>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Als multidisziplinärer Designer und Entwickler habe ich mich auf die Erstellung immersiver digitaler Erlebnisse spezialisiert, 
                  die 2D- und 3D-Design, Motion Graphics und Entwicklung kombinieren.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Meine Expertise umfasst verschiedene kreative Tools wie Blender für 3D-Modellierung, 
                  After Effects für Motion Design und moderne Entwicklungs-Frameworks für Web- und Mobile-Anwendungen.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, borderColor: 'rgb(255, 144, 31)' }}
                    className="text-center p-4 bg-dark-200 rounded-xl border border-accent-400 transition-colors shadow-lg hover:shadow-xl"
                  >
                    <div className="inline-block p-3 bg-accent-400/10 rounded-lg mb-3">
                      <stat.icon className="w-5 h-5 text-accent-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
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
                  className="px-6 py-3 bg-accent-400 text-black font-medium rounded-lg hover:bg-accent-300 transition-colors shadow-lg hover:shadow-accent-400/30"
                >
                  Kontakt
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, borderColor: '#ff901f' }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects"
                  className="px-6 py-3 bg-dark-200 border border-accent-400 text-white font-medium rounded-lg hover:border-accent-400 transition-colors shadow-lg"
                >
                  Projekte
                </motion.a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Orange Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path 
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
            fill="#ff901f" 
            opacity="0.15"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default About;