import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    image: string;
    images?: string[];
    videoUrl?: string;
    videoEmbeds?: string[];
    youtubeEmbeds?: string[];
    tech: string[];
    liveUrl?: string;
    projects?: {
      title: string;
      description: string;
      url: string;
    }[];
  };
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project.images || [project.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl mx-auto mt-16 bg-white dark:bg-dark-300 rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold">{project.title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-100 rounded-full"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="relative bg-black">
              {/* Image Gallery */}
              {images && (
                <>
                  <motion.div className="relative h-[500px] w-full">
                    <motion.img
                      key={currentImageIndex}
                      src={images[currentImageIndex]}
                      alt={`${project.title} ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          previousImage();
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/30 rounded-full text-white/60"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/30 rounded-full text-white/60"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              index === currentImageIndex
                                ? 'bg-white/90'
                                : 'bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Single Image */}
              {project.image && !images && (
                <div className="relative h-[500px] w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              {/* YouTube Video */}
              {project.videoUrl && (
                <div className="relative w-full h-[500px]">
                  <iframe
                    src={project.videoUrl}
                    title={`${project.title} video`}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Multiple YouTube Videos */}
              {project.youtubeEmbeds && (
                <div className="grid grid-cols-1 gap-4">
                  {project.youtubeEmbeds.map((embedUrl, index) => (
                    <div key={index} className="relative w-full h-[500px]">
                      <iframe
                        src={embedUrl}
                        title={`${project.title} video ${index + 1}`}
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ))}
                </div>
              )}
              {/* Vimeo Embeds */}
              {project.videoEmbeds && project.videoEmbeds.map((embed, index) => (
                <div key={index} className="aspect-video mt-4">
                  <iframe
                    src={embed}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent-400/10 text-accent-500 dark:bg-accent-400/20 dark:text-accent-400 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.liveUrl && (
              <div className="mt-6">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg transition-colors"
                >
                  <span>View Live Project</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}

            {project.projects && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Featured Projects</h3>
                <div className="grid grid-cols-1 gap-3">
                  {project.projects.map((subProject, index) => (
                    <a
                      key={index}
                      href={subProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-base mb-1">{subProject.title}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{subProject.description}</p>
                        </div>
                        <svg className="w-5 h-5 text-accent-500 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
