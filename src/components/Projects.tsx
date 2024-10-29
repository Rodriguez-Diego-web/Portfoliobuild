import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { ExternalLink, FileText } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Roomies - Room Finding App',
      description: 'A mobile app designed to help students find and connect with new workspaces, offering a seamless user experience with real-time updates.',
      image: 'https://cdn.myportfolio.com/add13447-08e1-432a-b6ca-518d52c281da/a8856be6-d600-4daa-928e-ea3ab2c78105_rw_1920.png?h=42be41848abe1a9138a2ed10f2c2f3ab',
      tech: ['Figma', 'Flutter', 'UI/UX'],
      liveUrl: 'https://kadir-diego.myportfolio.com/ui-ux',
    },
    {
      title: 'Interactive Systems Portfolio',
      description: 'Interactive website for my professional user experience projects.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=1200&h=800',
      tech: ['HTML', 'CSS', 'JS'],
      liveUrl: 'https://interaktivesysteme.fun',
      documentUrl: 'https://1drv.ms/f/c/ea6795ce9e9b8a80/EoCKm57OlWcggOp2WwAAAAABsSJm2i2XAXRqHZVGWnLbwA?e=fyj9Gn'
    },
    {
      title: 'AI Chat Assistant',
      description: 'An AI-powered tool that assists and automating repetitive tasks, enhancing productivity and creativity.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200&h=800',
      tech: ['Python', 'TensorFlow', 'React', 'FastAPI'],
      liveUrl: 'https://interaktivesysteme.fun/ai-assistant',
    },
    {
      title: '3D Tiny World Showcase',
      description: 'Just a Tiny world which was a task in my university.',
      image: 'https://i9.ytimg.com/vi/dGJBykjIYl0/mqdefault.jpg?v=66897c82&sqp=CLS8grkG&rs=AOn4CLBn5-J5sqUATzS2XrIPnUbKjjy9sg',
      tech: ['Blender'],
      liveUrl: 'https://www.youtube.com/watch?v=dGJBykjIYl0',
    },
    {
      title: 'AVM',
      description: 'A 2D art animation project created for a weekly showcase, demonstrating creativity and technical skills in digital art.',
      image: 'https://cdn-prod-ccv.adobe.com/Uh-vamR3uNv/image/Uh-vamR3uNv_poster.jpg?hdnts=st%3D1730189279%7Eexp%3D1730448479%7Eacl%3D%2Fshared_assets%2Fimage%2F*%21%2Fz%2FUh-vamR3uNv%2Frend%2F*%21%2Fi%2FUh-vamR3uNv%2Frend%2F*%21%2FUh-vamR3uNv%2Frend%2F*%21%2FUh-vamR3uNv%2Fimage%2F*%21%2FUh-vamR3uNv%2Fcaptions%2F*%7Ehmac%3Dde4db59e9f89b3428c68b3d8d1f5e992ed4c8eb5ad5c18858672aff6f12a9480',
      tech: ['Premiere Pro', 'After Effects', 'Photoshop'],
      liveUrl: 'https://portfolio.adobe.com/add13447-08e1-432a-b6ca-518d52c281da/editor/avm',
    },
    {
      title: 'AI Image Generation',
      description: 'A project focused on generating 2D art animations using AI, showcasing the potential of machine learning in creative processes.',
      image: 'https://cdn.myportfolio.com/add13447-08e1-432a-b6ca-518d52c281da/5d0f985f-54f7-45f1-af79-0bfb9eb75f57_rw_3840.jpeg?h=45c5432f2d971e06e27c39d5bb1d2e25',
      tech: ['Premiere Pro', 'After Effects', 'Photoshop'],
      liveUrl: 'https://kadir-diego.myportfolio.com/ai',
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-4xl font-bold mb-4 text-center gradient-text">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            A selection of my most impactful work across different domains
          </p>
        </ScrollReveal>

        <ScrollReveal staggerChildren staggerDelay={0.15} threshold={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="group bg-white dark:bg-dark-200 rounded-xl overflow-hidden border border-gray-200 dark:border-accent-400/20 h-full transition-all duration-300 hover:border-accent-400/40"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <motion.a
                      href={project.liveUrl}
                      className="p-3 bg-accent-400 rounded-full hover:bg-accent-500 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </motion.a>
                    {project.documentUrl && (
                      <motion.a
                        href={project.documentUrl}
                        className="p-3 bg-accent-400 rounded-full hover:bg-accent-500 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FileText className="w-5 h-5 text-white" />
                      </motion.a>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm bg-accent-400/10 text-accent-400 rounded-full border border-accent-400/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Projects;