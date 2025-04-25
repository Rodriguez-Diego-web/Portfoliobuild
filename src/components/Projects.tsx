import { useState } from 'react';
import ProjectModal from './ProjectModal';

// Import roomies images
import roomiesImg from '../assets/Public/roomies.png';
import roomies2Img from '../assets/Public/rommies-2.png';
import roomies4Img from '../assets/Public/roomies-4.png';

// Import 3D assets
import render3dMain from '../assets/Public/3d/Bildschirmfoto 2024-07-14 um 00.14.40.png';
import render3d1 from '../assets/Public/3d/Bildschirmfoto 2024-07-12 um 21.10.22.png';
import render3d2 from '../assets/Public/3d/Bildschirmfoto 2024-07-12 um 21.10.54.png';
import render3d3 from '../assets/Public/3d/Bildschirmfoto 2024-07-12 um 21.11.17.png';
import render3d4 from '../assets/Public/3d/Bildschirmfoto 2024-07-12 um 14.15.50.png';
import render3d5 from '../assets/Public/3d/Bildschirmfoto 2024-07-12 um 19.05.42.png';
import render3d6 from '../assets/Public/3d/bild1.png';

// Definiere Typen für Projekt und Bilder
interface ProjectImage {
  path: string;
  alt: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  images: (ProjectImage | string)[];
  technologies: string[];
  featured: boolean;
  projectUrl?: string;
  type: string;
  semester?: string;
  year: string;
  videoPath?: string;
  videoUrl?: string;
  localVideos?: string[];
  youtubeEmbeds?: string[];
}

interface ProjectModalData {
  title: string;
  description: string;
  image: string;
  images: string[];
  tech: string[];
  videoUrl?: string;
  localVideos?: string[];
  videoPath?: string;
  youtubeEmbeds?: string[];
  liveUrl?: string;
  projectDetails: {
    type: string;
    semester?: string;
    year: string;
    category: string;
  };
}

// Placeholder image
const placeholderImage = '/hero.jpg';

// Projektdaten
const projectsData: Project[] = [
  {
    id: 1,
    title: "CityShare",
    description: "Eine Plattform für das Teilen urbaner Ressourcen und die Förderung nachhaltiger Stadtentwicklung. CityShare wurde als fiktives Kundenprojekt entwickelt und bietet innovative Lösungen für urbane Mobilität und Ressourcenteilung.",
    category: "website",
    images: [
      { path: "/bilder/cityshare bilder /Bildschirmfoto 2025-04-24 um 12.09.43.png", alt: "CityShare Hauptseite" },
      { path: "/bilder/cityshare bilder /Bildschirmfoto 2025-04-24 um 12.09.58.png", alt: "CityShare Funktionen" },
      { path: "/bilder/cityshare bilder /Bildschirmfoto 2025-04-24 um 12.10.15.png", alt: "CityShare mobile Ansicht" }
    ],
    technologies: ["React", "Node.js", "MongoDB", "Responsive Design"],
    featured: true,
    projectUrl: "https://cityshare.netlify.app/",
    type: "personal",
    semester: "5. Semester",
    year: "2024"
  },
  {
    id: 2,
    title: "Flyver",
    description: "Eine innovative Reiseplattform, die Benutzern hilft, Flüge zu finden und zu buchen mit besonderem Fokus auf Benutzerfreundlichkeit. Flyver wurde als fiktiver Kunde im Rahmen eines Studienprojekts konzipiert und implementiert.",
    category: "ui-ux",
    images: [
      { path: "/bilder/flyver bilder/Bildschirmfoto 2025-04-24 um 12.10.59.png", alt: "Flyver Startseite" },
      { path: "/bilder/flyver bilder/Bildschirmfoto 2025-04-24 um 12.11.09.png", alt: "Flyver Buchungsansicht" },
      { path: "/bilder/flyver bilder/Bildschirmfoto 2025-04-24 um 12.11.16.png", alt: "Flyver Ergebnisse" },
      { path: "/bilder/flyver bilder/Bildschirmfoto 2025-04-24 um 12.11.28.png", alt: "Flyver Mobile App" }
    ],
    technologies: ["React", "TypeScript", "Styled-Components", "Responsive Design", "UI/UX Design"],
    featured: true,
    projectUrl: "https://fleyver.netlify.app/",
    type: "personal",
    semester: "5. Semester",
    year: "2024"
  },
  {
    id: 3,
    title: "FAMFORDOGS",
    description: "Eine Plattform für Hundeliebhaber, die Ressourcen, Community und Produkte für Hunde und ihre Besitzer anbietet. Dieses Projekt wurde als Semesterabgabe im 6. Semester entwickelt und legt besonderen Wert auf Benutzerfreundlichkeit und ansprechendes Design für Haustierliebhaber.",
    category: "website",
    images: [
      { path: "/bilder/FAMFORDOGS bilder/Bildschirmfoto 2025-04-24 um 12.12.02.png", alt: "FAMFORDOGS Hauptseite" },
      { path: "/bilder/FAMFORDOGS bilder/Bildschirmfoto 2025-04-24 um 12.12.10.png", alt: "FAMFORDOGS Produktseite" },
      { path: "/bilder/FAMFORDOGS bilder/Bildschirmfoto 2025-04-24 um 12.12.25.png", alt: "FAMFORDOGS Community" }
    ],
    technologies: ["WordPress", "WooCommerce", "CSS", "JavaScript", "Responsive Design"],
    featured: true,
    projectUrl: "https://famfordogs.com/",
    type: "academic",
    semester: "6. Semester",
    year: "2025"
  },
  {
    id: 4,
    title: "Saskia Photographie",
    description: "Ein persönliches Portfolio für Saskia, eine professionelle Fotografin. Diese Website wurde für eine echte Kundin entwickelt und zeigt ihre fotografischen Arbeiten in einem eleganten, benutzerfreundlichen Design. Die Website bietet eine Galerie, Kontaktformular und Informationen zu ihren Dienstleistungen.",
    category: "website",
    images: [
      { path: "/bilder/saskia bilder/Bildschirmfoto 2025-04-24 um 12.13.39.png", alt: "Saskia Startseite" },
      { path: "/bilder/saskia bilder/Bildschirmfoto 2025-04-24 um 12.13.50.png", alt: "Saskia Projektseite" },
      { path: "/bilder/saskia bilder/Bildschirmfoto 2025-04-24 um 12.14.02.png", alt: "Saskia Kontakt" }
    ],
    technologies: ["WordPress", "CSS", "PHP", "JavaScript", "SEO-Optimierung"],
    featured: true,
    projectUrl: "https://www.saskia-photographie.de/",
    type: "client",
    year: "2024"
  },
  {
    id: 5,
    title: "Interaktives System",
    description: "Ein interaktives System für ein verbessertes Benutzererlebnis mit Fokus auf Zugänglichkeit und Innovation. Dieses Projekt wurde als Teil einer Studienabgabe im 4. Semester entwickelt und demonstriert die Anwendung von Interaktionsdesign-Prinzipien in einer webbasierten Umgebung.",
    category: "ui-ux",
    images: [
      { path: "/bilder/interaktive syssteem bilder/Bildschirmfoto 2025-04-24 um 12.14.41.png", alt: "System Overview" },
      { path: "/bilder/interaktive syssteem bilder/Bildschirmfoto 2025-04-24 um 12.14.51.png", alt: "Interaktionsdesign" },
      { path: "/bilder/interaktive syssteem bilder/Bildschirmfoto 2025-04-24 um 12.15.01.png", alt: "Benutzeroberfläche" },
      { path: "/bilder/interaktive syssteem bilder/Bildschirmfoto 2025-04-24 um 12.15.07.png", alt: "Mobile Integration" },
      { path: "/bilder/interaktive syssteem bilder/Bildschirmfoto 2025-04-24 um 12.15.14.png", alt: "Responsives Design" }
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "Interaction Design", "Prototyping", "User Testing"],
    featured: true,
    projectUrl: "https://interaktivesysteme.fun/",
    videoPath: "/videos/case_video.mp4",
    type: "academic",
    semester: "4. Semester",
    year: "2023"
  },
  {
    id: 6,
    title: "GlobalConnect",
    description: "Eine Plattform für globale Kommunikation und Zusammenarbeit mit Fokus auf Mehrsprachigkeit und kulturelle Integration. GlobalConnect wurde als fiktives Kundenprojekt konzipiert und implementiert, um die Vernetzung von Menschen aus verschiedenen Kulturen zu fördern.",
    category: "website",
    images: [
      { path: "/bilder/globalconnect_bilder/Bildschirmfoto 2025-04-24 um 12.15.47.png", alt: "GlobalConnect Dashboard" },
      { path: "/bilder/globalconnect_bilder/Bildschirmfoto 2025-04-24 um 12.15.52.png", alt: "GlobalConnect Profil" },
      { path: "/bilder/globalconnect_bilder/Bildschirmfoto 2025-04-24 um 12.16.12.png", alt: "GlobalConnect Messaging" }
    ],
    technologies: ["React", "Next.js", "i18n", "TailwindCSS", "MongoDB"],
    featured: false,
    projectUrl: "https://globalconnectrodriguez.netlify.app/",
    type: "personal",
    semester: "5. Semester",
    year: "2024"
  },
  {
    id: 7,
    title: "SafeSport",
    description: "Eine App für sicheres Sporttraining und Gesundheitsüberwachung mit personalisiertem Feedback. Dieses soziale Projekt wurde im 6. Semester entwickelt und bietet innovative Lösungen für sicheres Training und Gesundheitsmonitoring für alle Altersgruppen.",
    category: "ui-ux",
    images: [
      { path: "/bilder/Safesport/Bildschirmfoto 2025-04-24 um 12.16.46.png", alt: "SafeSport Home" },
      { path: "/bilder/Safesport/Bildschirmfoto 2025-04-24 um 12.16.52.png", alt: "SafeSport Trainingsplan" },
      { path: "/bilder/Safesport/Bildschirmfoto 2025-04-24 um 12.16.59.png", alt: "SafeSport Statistiken" },
      { path: "/bilder/Safesport/Bildschirmfoto 2025-04-24 um 12.17.06.png", alt: "SafeSport Profil" },
      { path: "/bilder/Safesport/Bildschirmfoto 2025-04-24 um 12.17.12.png", alt: "SafeSport Einstellungen" }
    ],
    technologies: ["React", "TypeScript", "Styled-Components", "Health API Integration", "UI/UX Design"],
    featured: true,
    projectUrl: "https://safesports.netlify.app/",
    type: "academic",
    semester: "6. Semester",
    year: "2025"
  },
  {
    id: 8,
    title: "Marketing Video",
    description: "Ein Marketingvideo zur Präsentation eines innovativen Produkts mit kreativen Visualisierungen und überzeugender Erzählung. Diese Videoarbeit demonstriert meine Fähigkeiten in Motion Graphics, Visual Storytelling und Audioproduktion.",
    category: "avm-video",
    images: [{ path: "/1.jpg", alt: "Marketing Video Thumbnail" }],
    technologies: ["After Effects", "Premiere Pro", "Motion Graphics", "Sound Design"],
    featured: false,
    videoPath: "/videos/marketing.mp4",
    type: "personal",
    year: "2024"
  },
  {
    id: 9,
    title: "KI-generierte Tierbilder",
    description: "Eine Sammlung von KI-generierten Tierbildern, die die Kreativität und Technologie in der digitalen Kunst demonstrieren. Dieses persönliche Projekt zeigt meinen experimentellen Umgang mit KI-Bildgenerierung und digitaler Kunstschaffung.",
    category: "other",
    images: [
      { path: "/kibilder/Mittel (Angel Kopie).jpeg", alt: "KI-generierter Engel" },
      { path: "/kibilder/Mittel (Goldfischglas Kopie).jpeg", alt: "KI-generiertes Goldfischglas" },
      { path: "/kibilder/Mittel (Hamster Kopie).jpeg", alt: "KI-generierter Hamster" },
      { path: "/kibilder/Mittel (Schwein Kopie).jpeg", alt: "KI-generiertes Schwein" },
      { path: "/kibilder/Mittel (käfig Kopie).jpeg", alt: "KI-generierter Käfig" },
      { path: "/kibilder/Mittel (taube Kopie).jpeg", alt: "KI-generierte Taube" }
    ],
    technologies: ["AI Image Generation", "Prompt Engineering", "Digital Art", "Midjourney"],
    featured: false,
    type: "academic",
    semester: "3. Semester",
    year: "2023"
  },
  {
    id: 10,
    title: "3D Visualization",
    description: "Eine Sammlung fotorealistischer 3D-Visualisierungen, die fortgeschrittene Beleuchtungstechniken, Materialgestaltung und atmosphärische Effekte demonstriert. Das Projekt zeigt meine Fähigkeiten in der 3D-Modellierung, Texturierung und Rendering-Optimierung.",
    category: "3d",
    images: [
      render3dMain,
      render3d1,
      render3d2,
      render3d3,
      render3d4,
      render3d5,
      render3d6
    ],
    technologies: ["Blender", "3D Modeling", "Texturing", "Lighting", "Rendering"],
    featured: true,
    youtubeEmbeds: [
      'https://www.youtube.com/embed/ynx2wpAQqnI',
      'https://www.youtube.com/embed/PeNQpLT9dbw',
      'https://www.youtube.com/embed/U7ku5W2hvkM',
      'https://www.youtube.com/embed/7VTaPGyd-QI'
    ],
    type: "academic",
    semester: "7. Semester",
    year: "2025"
  },
  {
    id: 11,
    title: "3D Tiny World",
    description: "Eine charmante 3D-animierte Inselszene, die in Blender erstellt wurde und ein gemütliches Hundehaus, verspielte Fischanimationen und eine friedliche Atmosphäre zeigt. Dieses Projekt demonstriert Fähigkeiten in 3D-Modellierung, Animation und Umgebungsdesign.",
    category: "3d",
    images: [{ path: "/hero.jpg", alt: "3D Tiny World Thumbnail" }],
    technologies: ["Blender", "3D Animation", "Environmental Design"],
    featured: true,
    videoUrl: 'https://www.youtube.com/embed/dGJBykjIYl0',
    localVideos: [
      '/videos2/WhatsApp Video 2025-03-23 at 18.00.48.mp4',
      '/videos2/WhatsApp Video 2025-03-23 at 18.00.57.mp4',
      '/videos2/WhatsApp Video 2025-03-23 at 18.01.02.mp4',
      '/videos2/WhatsApp Video 2025-03-23 at 18.01.06.mp4'
    ],
    type: "academic",
    semester: "7. Semester",
    year: "2025"
  },
  {
    id: 12,
    title: "Roomies - Room Finding App",
    description: "Eine mobile App, die Studenten beim Finden und Vernetzen mit neuen Arbeitsräumen unterstützt und ein nahtloses Benutzererlebnis mit Echtzeit-Updates bietet.",
    category: "ui-ux",
    images: [roomies4Img, roomiesImg, roomies2Img],
    technologies: ["Figma", "Flutter", "UI/UX"],
    featured: true,
    videoPath: "/videos2/Case_Video_Rodriguez_Rathgeber_4 semster.mp4",
    type: "academic",
    semester: "4. Semester",
    year: "2023"
  },
  {
    id: 13,
    title: "Dokumentarfilm: Der Rückschlag",
    description: "Ein emotionaler Kurzfilm (1-2 Minuten), der den Moment dokumentiert, als sich der junge Boxer Oussama Kebdani kurz vor seinem wichtigsten Kampf schwer an der Hand verletzt. Die Doku zeigt authentisch, wie Oussama mit Schmerz, Enttäuschung und Zweifel kämpft, aber dennoch seinen starken Willen behält. Ein eindringlicher Moment, der den wahren Kampfgeist sichtbar macht.",
    category: "avm-video",
    images: [{ path: "/hero.jpg", alt: "Boxerdokumentation Thumbnail" }],
    technologies: ["Filmproduktion", "Videoschnitt", "Dokumentarfilm", "Storytelling"],
    featured: true,
    localVideos: [
      '/videos2/WhatsApp Video 2025-03-23 at 18.00.48.mp4',
      '/videos2/WhatsApp Video 2025-03-23 at 18.00.57.mp4',
      '/videos2/WhatsApp Video 2025-03-23 at 18.01.02.mp4',
      '/videos2/WhatsApp Video 2025-03-23 at 18.01.06.mp4'
    ],
    type: "academic",
    semester: "7. Semester",
    year: "2025"
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectModalData | null>(null);
  const [filter, setFilter] = useState<string>("all");
  
  // Filter projects based on selected category
  const filteredProjects = filter === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === filter || (filter === "featured" && project.featured));

  const openProject = (index: number) => {
    const project = filteredProjects[index];
    setSelectedProject({
      title: project.title,
      description: project.description,
      image: typeof project.images[0] === 'string' 
        ? project.images[0] as string
        : (project.images[0] as ProjectImage).path,
      images: project.images.map(img => typeof img === 'string' ? img : img.path),
      tech: project.technologies,
      videoUrl: project.videoUrl,
      videoPath: project.videoPath,
      localVideos: project.localVideos,
      youtubeEmbeds: project.youtubeEmbeds,
      liveUrl: project.projectUrl,
      projectDetails: {
        type: project.type,
        semester: project.semester,
        year: project.year,
        category: project.category
      }
    });
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <div id="projects" className="py-20 bg-black transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-accent-400">Projekte</h2>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-10">
          Eine Auswahl meiner Arbeiten aus verschiedenen Bereichen wie Webentwicklung, UI/UX Design, 3D-Visualisierung und visueller Kommunikation.
        </p>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button 
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md transition-colors ${filter === "all" ? "bg-accent-400 text-black" : "bg-dark-200 text-white border border-accent-400/30 hover:border-accent-400"}`}
          >
            Alle Projekte
          </button>
          <button 
            onClick={() => setFilter("featured")}
            className={`px-4 py-2 rounded-md transition-colors ${filter === "featured" ? "bg-accent-400 text-black" : "bg-dark-200 text-white border border-accent-400/30 hover:border-accent-400"}`}
          >
            Highlights
          </button>
          <button 
            onClick={() => setFilter("website")}
            className={`px-4 py-2 rounded-md transition-colors ${filter === "website" ? "bg-accent-400 text-black" : "bg-dark-200 text-white border border-accent-400/30 hover:border-accent-400"}`}
          >
            Websites
          </button>
          <button 
            onClick={() => setFilter("ui-ux")}
            className={`px-4 py-2 rounded-md transition-colors ${filter === "ui-ux" ? "bg-accent-400 text-black" : "bg-dark-200 text-white border border-accent-400/30 hover:border-accent-400"}`}
          >
            UI/UX
          </button>
          <button 
            onClick={() => setFilter("3d")}
            className={`px-4 py-2 rounded-md transition-colors ${filter === "3d" ? "bg-accent-400 text-black" : "bg-dark-200 text-white border border-accent-400/30 hover:border-accent-400"}`}
          >
            3D
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => openProject(index)}
              className="bg-dark-200 rounded-md overflow-hidden border border-accent-400/30 hover:border-accent-400 transition-colors cursor-pointer group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={Array.isArray(project.images) && project.images.length > 0 
                    ? typeof project.images[0] === 'string' 
                      ? project.images[0] 
                      : (project.images[0] as ProjectImage).path || ''
                    : placeholderImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
                
                {project.type && (
                  <div className="absolute top-2 right-2 bg-accent-400 text-black px-2 py-1 text-xs rounded-md">
                    {project.type}
                  </div>
                )}
                
                {(project.videoPath || project.videoUrl || (project.localVideos && project.localVideos.length > 0)) && (
                  <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 text-xs rounded-md flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0 0 10 9.87v4.263a1 1 0 0 0 1.555.832l3.197-2.132a1 1 0 0 0 0-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                    </svg>
                    Video
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies && project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-accent-400/10 text-accent-400 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.technologies && project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-dark-100 text-gray-400 rounded-full text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject !== null && (
        <ProjectModal
          isOpen={selectedProject !== null}
          onClose={closeProject}
          project={selectedProject}
        />
      )}
    </div>
  );
};

export default Projects;