import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Box, Film, Code, Palette, Smartphone, Layers, Brain, PenTool } from 'lucide-react';

const Services = () => {
  const services = [
    {
      Icon: Box,
      title: '3D Design & Animation',
      description: 'Bringing ideas to life through stunning 3D visualizations and animations, perfect for product showcases, architectural walkthroughs, and immersive experiences.',
      tools: ['Blender', '3D Modeling', 'Animation', 'Rendering']
    },
    {
      Icon: Film,
      title: 'Motion Graphics',
      description: 'Creating dynamic visual stories through captivating motion graphics and professional video editing, from social media content to broadcast-ready productions.',
      tools: ['After Effects', 'Premiere Pro', 'CapCut', 'Animation']
    },
    {
      Icon: Layers,
      title: 'Brand Identity',
      description: 'Crafting distinctive brand identities that resonate with your audience, including comprehensive design systems, guidelines, and marketing collateral.',
      tools: ['Logo Design', 'Brand Guidelines', 'Marketing']
    },
    {
      Icon: Code,
      title: 'Web Development',
      description: 'Building modern, performant websites and web applications using cutting-edge technologies and frameworks, with a focus on user experience and scalability.',
      tools: ['React', 'Next.js', 'Three.js', 'Tailwind CSS', 'HTML', 'CSS', 'JS']
    },
    {
      Icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Developing intuitive and responsive mobile applications that provide seamless experiences across iOS and Android platforms.',
      tools: ['React Native', 'Flutter', 'UI/UX']
    },
    {
      Icon: Palette,
      title: 'UI/UX Design',
      description: 'Designing intuitive interfaces and user experiences that delight users while achieving business goals, backed by research and modern design principles.',
      tools: ['Figma', 'Prototyping', 'User Research', 'Wireframing']
    },
    {
      Icon: Brain,
      title: 'AI Solutions',
      description: 'Leveraging cutting-edge AI technologies to create intelligent solutions, from image generation to natural language processing and automated workflows.',
      tools: ['Image Generation', 'Video Processing', 'Prompt Engineering', 'AI Integration']
    },
    {
      Icon: PenTool,
      title: 'Logo Design',
      description: 'Creating memorable and versatile logos that capture your brand essence, from concept to final delivery across all necessary formats and variations.',
      tools: ['Canva', 'Figma', 'Adobe Suite', 'Vector Design', 'Brand Identity']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-dark-100">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-4xl font-bold mb-4 text-center gradient-text">
            Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Combining creative design with technical expertise to deliver comprehensive digital solutions
          </p>
        </ScrollReveal>

        <ScrollReveal staggerChildren staggerDelay={0.1} threshold={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="flex flex-col h-full p-6 bg-white dark:bg-dark-200 rounded-xl border border-accent-400/20 hover:border-accent-400/40 transition-colors shadow-lg hover:shadow-xl"
              >
                <div className="mb-4 bg-gradient-to-br from-accent-400 to-accent-600 p-3 rounded-lg w-fit">
                  <service.Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tools.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="text-sm px-2 py-1 bg-accent-400/10 text-accent-400 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Services;