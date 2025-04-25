import React, { useState, useEffect } from 'react';
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
    videoPath?: string;
    localVideos?: string[];
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

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        className="fixed inset-0 bg-black/50 z-50 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="relative max-w-4xl mx-auto my-8 bg-white dark:bg-dark-200 rounded-xl overflow-hidden"
        >
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <button
                onClick={handleCloseClick}
                className="p-1 hover:bg-gray-100 dark:hover:bg-dark-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Image Gallery */}
            <div className="relative aspect-video mb-4 bg-gray-100 dark:bg-dark-300 rounded-lg overflow-hidden">
              <img
                src={images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={previousImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 hover:bg-black/75 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 hover:bg-black/75 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}
            </div>

            {/* Project Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {project.description}
            </p>

            {/* Visit Website Button */}
            {project.liveUrl && (
              <div className="mb-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-accent-400 text-black font-medium rounded-md hover:bg-accent-500 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Website besuchen
                </a>
              </div>
            )}

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-accent-400/10 text-accent-400 rounded-full text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Single YouTube Video */}
            {project.videoUrl && (
              <div className="space-y-4 mb-6">
                <h4 className="text-xl font-bold mb-2">Video Demonstration</h4>
                <div className="aspect-video">
                  <iframe
                    src={project.videoUrl}
                    title={`${project.title} Demonstration`}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Local Video */}
            {project.videoPath && (
              <div className="space-y-4 mb-6">
                <h4 className="text-xl font-bold mb-2">Video Demonstration</h4>
                <div className="aspect-video bg-black">
                  <video 
                    src={project.videoPath} 
                    className="w-full h-full" 
                    controls
                    autoPlay={false}
                  />
                </div>
              </div>
            )}

            {/* Local Videos List */}
            {project.localVideos && project.localVideos.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold mb-2">Videos</h4>
                <div className="grid gap-4">
                  {project.localVideos.map((videoPath, index) => (
                    <div key={index} className="aspect-video bg-black">
                      <video 
                        src={videoPath} 
                        className="w-full h-full" 
                        controls
                        autoPlay={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* YouTube Videos */}
            {project.youtubeEmbeds && project.youtubeEmbeds.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold mb-2">Videos</h4>
                {project.youtubeEmbeds.map((embed, index) => (
                  <div key={index} className="aspect-video">
                    <iframe
                      src={embed}
                      title={`${project.title} Video ${index + 1}`}
                      className="w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Sub-projects */}
            {project.projects && project.projects.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xl font-bold mb-4">Featured Projects</h4>
                <div className="grid gap-4">
                  {project.projects.map((subProject, index) => (
                    <a
                      key={index}
                      href={subProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-gray-50 dark:bg-dark-300 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-400 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h5 className="font-bold mb-2">{subProject.title}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {subProject.description}
                      </p>
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
