import { useState } from 'react';
import ProjectModal from './ProjectModal';

// Import Cloudinary URLs
const cloudinaryUrls = {
  "Angel": "https://res.cloudinary.com/dwxoapjlq/image/upload/v1735754801/portfolio/portfolio/Angel.jpg",
  "Goldfischglas": "https://res.cloudinary.com/dwxoapjlq/image/upload/v1735754803/portfolio/portfolio/Goldfischglas.jpg",
  "Hamster": "https://res.cloudinary.com/dwxoapjlq/image/upload/v1735754804/portfolio/portfolio/Hamster.jpg",
  "Schwein": "https://res.cloudinary.com/dwxoapjlq/image/upload/v1735754805/portfolio/portfolio/Schwein.jpg",
  "käfig": "https://res.cloudinary.com/dwxoapjlq/image/upload/v1735754807/portfolio/portfolio/k%C3%A4fig.jpg",
  "taube": "https://res.cloudinary.com/dwxoapjlq/image/upload/v1735754809/portfolio/portfolio/taube.jpg"
};

// Import roomies images
import roomiesImg from '/src/assets/Public/roomies.png';
import roomies2Img from '/src/assets/Public/rommies-2.png';
import roomies4Img from '/src/assets/Public/roomies-4.png';

// Import 3D assets
import renderingImg1 from '/src/assets/Public/3d/Bildschirmfoto 2024-07-12 um 14.15.21 (2).png';
import renderingImg2 from '/src/assets/Public/3d/Bildschirmfoto 2024-07-12 um 14.15.26.png';
import renderingImg3 from '/src/assets/Public/3d/Bildschirmfoto 2024-07-12 um 14.15.34.png';
import render3dMain from '/src/assets/Public/3d/Bildschirmfoto 2024-07-14 um 00.14.40.png';
import render3d1 from '/src/assets/Public/3d/Bildschirmfoto 2024-07-12 um 21.10.22.png';
import render3d2 from '/src/assets/Public/3d/Bildschirmfoto 2024-07-12 um 21.10.54.png';
import render3d3 from '/src/assets/Public/3d/Bildschirmfoto 2024-07-12 um 21.11.17.png';
import render3d4 from '/src/assets/Public/3d/Bildschirmfoto 2024-07-12 um 14.15.50.png';
import render3d5 from '/src/assets/Public/3d/Bildschirmfoto 2024-07-12 um 19.05.42.png';
import render3d6 from '/src/assets/Public/3d/bild1.png';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      title: 'Roomies - Room Finding App',
      description: 'A mobile app designed to help students find and connect with new workspaces, offering a seamless user experience with real-time updates.',
      image: roomies4Img,
      images: [roomies4Img, roomiesImg, roomies2Img, roomiesImg],
      tech: ['Figma', 'Flutter', 'UI/UX']
    },
    {
      title: 'Web Development Portfolio',
      description: 'Collection of modern, responsive websites built with cutting-edge technologies. Focusing on performance, accessibility, and engaging user experiences.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200&h=800',
      tech: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
      projects: [
        {
          title: 'Frebo Media',
          url: 'https://frebo-media.netlify.app',
          description: 'Media company website with advanced CMS integration, featuring dynamic content management, multimedia galleries, and responsive design.',
          tech: ['Next.js', 'Tailwind CSS', 'Sanity CMS']
        },
        {
          title: 'Fleyver',
          url: 'https://fleyver.netlify.app',
          description: 'Modern clothing brand platform with integrated CMS, featuring e-commerce functionality, inventory management, and seamless user experience.',
          tech: ['React', 'Node.js', 'MongoDB']
        },
        {
          title: 'CUX Snack',
          url: 'https://cuxsnack.netlify.app',
          description: 'Innovative snack ordering system with real-time tracking, inventory management, and integrated CMS for menu updates.',
          tech: ['MERN Stack', 'Socket.io']
        },
        {
          title: 'Global Connect',
          url: 'https://globalconnectrodriguez.netlify.app',
          description: 'International business networking platform with multilingual support and advanced search capabilities.',
          tech: ['Next.js', 'GraphQL', 'PostgreSQL']
        },
        {
          title: 'City Share',
          url: 'https://cityshare.netlify.app',
          description: 'Urban mobility solution with real-time vehicle tracking and integrated payment processing.',
          tech: ['React Native', 'Express', 'MongoDB']
        },
        {
          title: 'Pizza Galaxy',
          url: 'https://pizzagalaxycux.netlify.app',
          description: 'Modern pizza ordering system with CMS-powered menu management and real-time order tracking.',
          tech: ['MERN Stack', 'Redux']
        }
      ]
    },
    {
      title: '3D Visualization',
      description: 'Eine Sammlung fotorealistischer 3D-Visualisierungen, die fortgeschrittene Beleuchtungstechniken, Materialgestaltung und atmosphärische Effekte demonstriert. Das Projekt zeigt meine Fähigkeiten in der 3D-Modellierung, Texturierung und Rendering-Optimierung.',
      image: render3dMain,
      images: [
        render3dMain,
        render3d1,
        render3d2,
        render3d3,
        render3d4,
        render3d5,
        render3d6
      ],
      tech: ['Blender', '3D Modeling', 'Texturing', 'Lighting', 'Rendering'],
      youtubeEmbeds: [
        'https://www.youtube.com/embed/ynx2wpAQqnI',
        'https://www.youtube.com/embed/PeNQpLT9dbw',
        'https://www.youtube.com/embed/U7ku5W2hvkM',
        'https://www.youtube.com/embed/7VTaPGyd-QI'
      ],
      imagesAndVideos: [
        {
          type: 'image',
          url: render3dMain
        },
        {
          type: 'image',
          url: render3d1
        },
        {
          type: 'image',
          url: render3d2
        },
        {
          type: 'image',
          url: render3d3
        },
        {
          type: 'image',
          url: render3d4
        },
        {
          type: 'image',
          url: render3d5
        },
        {
          type: 'image',
          url: render3d6
        },
        {
          type: 'video',
          url: 'https://www.youtube.com/embed/ynx2wpAQqnI'
        },
        {
          type: 'video',
          url: 'https://www.youtube.com/embed/PeNQpLT9dbw'
        },
        {
          type: 'video',
          url: 'https://www.youtube.com/embed/U7ku5W2hvkM'
        },
        {
          type: 'video',
          url: 'https://www.youtube.com/embed/7VTaPGyd-QI'
        }
      ]
    },
    {
      title: '3D Tiny World Showcase',
      description: 'A charming 3D animated island scene created in Blender, featuring a cozy dog house, playful fish animations, and a peaceful atmosphere. This project demonstrates skills in 3D modeling, animation, and environmental design.',
      image: 'https://images.unsplash.com/photo-1620428268482-cf1851a36764?auto=format&fit=crop&q=80&w=1200&h=800',
      tech: ['Blender', '3D Animation', 'Environmental Design'],
      videoUrl: 'https://www.youtube.com/embed/dGJBykjIYl0'
    },
    {
      title: 'How We Treat Animals',
      description: 'A powerful visual narrative exploring the relationship between humans and animals, highlighting important ethical considerations in animal treatment.',
      image: cloudinaryUrls.Angel,
      images: [
        cloudinaryUrls.Angel,
        cloudinaryUrls.Goldfischglas,
        cloudinaryUrls.Hamster,
        cloudinaryUrls.Schwein,
        cloudinaryUrls.käfig,
        cloudinaryUrls.taube
      ],
      tech: ['Photoshop', 'Comfyui', 'Visual Storytelling']
    },
    {
      title: 'AVM - Audiovisual Media',
      description: 'A collection of audiovisual media projects showcasing digital art, motion graphics, and experimental video work. Features creative manipulations, 2D animations, and innovative visual storytelling techniques.',
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=2000&h=1200',
      tech: ['After Effects', 'Premiere Pro', 'Motion Graphics', 'Video Art', '2D Animation'],
      liveUrl: 'https://kadir-diego.myportfolio.com/avm',
      youtubeEmbeds: [
        'https://www.youtube.com/embed/VT7WoNbiYB0',
        'https://www.youtube.com/embed/TRuDKkB8NXg',
        'https://www.youtube.com/embed/HY2rGL84hwg'
      ]
    },
    {
      title: 'Interactive Systems Portfolio',
      description: 'Interactive website showcasing innovative approaches to human-computer interaction and user experience design, including a case study video featuring professional racing drivers.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1200&h=800',
      tech: ['HTML', 'CSS', 'JS', 'UX Design', 'Video Production'],
      liveUrl: 'https://interaktivesysteme.fun',
      videoUrl: 'https://www.youtube.com/embed/dQlK-w_eppQ'
    },
    {
      title: 'Ton Gestaltung',
      description: 'An innovative sound design project focusing on creating immersive audio experiences through experimental techniques and digital manipulation.',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=2000&h=1200',
      tech: ['Sound Design', 'Adobe Audition', 'Pro Tools', 'Audio Engineering'],
      liveUrl: 'https://kadir-diego.myportfolio.com/sound-design'
    }
  ];

  return (
    <div id="projects" className="py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl lg:text-4xl font-bold mb-8 lg:mb-16">
          Selected Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-200 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-accent-400 dark:hover:border-accent-400/50 transition-colors cursor-pointer group"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedProject(index);
              }}
            >
              <div className="relative aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-lg font-medium">
                    {project.videoUrl ? 'Watch Video' : 'View Project'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-accent-400/10 text-accent-400 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject !== null && (
        <ProjectModal
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
          project={projects[selectedProject]}
        />
      )}
    </div>
  );
};

export default Projects;