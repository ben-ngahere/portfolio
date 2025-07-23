import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaPlay, FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiPostgresql, SiExpress, SiTailwindcss, SiSqlite, SiBulma } from 'react-icons/si';
import { DiGitBranch } from 'react-icons/di';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  tagline: string;
  status: 'Live' | 'In Development';
  description: string;
  role?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  images: string[];
  features: string[];
}

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projects: Project[] = [
    {
      id: 'fono',
      title: 'FONO',
      tagline: 'Secure communication platform with real-time encrypted messaging',
      status: 'In Development',
      description: "Currently building a privacy-first communication platform that explores modern security principles. It's been a proper deep dive into real-time messaging, encryption, and user experience design. The kind of project where you disappear down rabbit holes understanding how secure protocols actually work.",
      techStack: ['React', 'TypeScript', 'Node.js', 'Auth0', 'PostgreSQL', 'Docker', 'Pusher', 'TailwindCSS'],
      githubUrl: 'https://github.com/ben-ngahere/fono',
      images: [
        '/client/public/images/fono-1.png',
        '/client/public/images/fono-2.png',
        '/client/public/images/fono-3.png',
        '/client/public/images/fono-4.png',
        '/client/public/images/fono-5.png'
      ],
      features: [
        'End-to-end encrypted messaging',
        'Real-time communication with Pusher',
        'Modern privacy-first design',
        'Dockerised development environment'
      ]
    },
    {
      id: 'fitquest',
      title: 'Fit Quest',
      tagline: 'Real-world fitness RPG built in 7 days',
      status: 'Live',
      description: "A group project where we gamified fitness using RPG mechanics. Users earn STR, DEX, and INT points through daily quest completion. I served as Agile Facilitator, which basically meant keeping everyone organised and making sure we actually shipped something functional in a week.",
      role: 'Agile Facilitator',
      techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Auth0', 'TailwindCSS', 'Express.js', 'Knex.js'],
      githubUrl: 'https://github.com/ben-ngahere/fit-quest',
      liveUrl: 'https://fitquest-wupo.onrender.com/',
      images: ['/client/public/images/fitquest-screenshot.png'],
      features: [
        'RPG-style character progression',
        'Daily quest system',
        'Team collaboration in 7-day sprint',
        'Full-stack CRUD operations'
      ]
    },
    {
      id: 'thunk',
      title: 'thunk.',
      tagline: 'Digital notebook app with secure authentication',
      status: 'Live',
      description: "My first proper full-stack CRUD app. A secure thought and idea management platform where you can organise your random ideas without them disappearing into the void. Built it solo to figure out how authentication, databases, and user interfaces actually work together.",
      techStack: ['React', 'TypeScript', 'Node.js', 'SQLite', 'Auth0', 'BulmaCSS', 'Express.js', 'Knex.js'],
      githubUrl: 'https://github.com/ben-ngahere/thunk',
      liveUrl: 'https://thunk-jx31.onrender.com/',
      images: ['/client/public/images/thunk-screenshot.png'],
      features: [
        'Secure user authentication',
        'Intuitive content organisation',
        'Responsive design',
        'Complete CRUD functionality'
      ]
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(heading, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );

    const projectCards = cards.querySelectorAll('.project-card');
    tl.fromTo(projectCards,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.2, 
        ease: 'power2.out' 
      },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const getStatusColor = (status: string) => {
    return status === 'Live' ? 'from-green-500 to-emerald-500' : 'from-yellow-500 to-orange-500';
  };

  return (
    <>
      <section ref={sectionRef} id="projects" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Projects
          </h2>
          
          <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`project-card backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group ${
                  project.status === 'Live' 
                    ? 'hover:border-green-400/50' 
                    : 'hover:border-yellow-400/50'
                }`}
                onClick={() => openModal(project)}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(project.status)} text-white`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.tagline}
                </p>
                
                <div className="flex items-center text-blue-400 text-sm group-hover:text-blue-300 transition-colors">
                  <span>View Details</span>
                  <FaExternalLinkAlt className="ml-2 w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleModalClick}
        >
          <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl border border-white/10 max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Fixed Header */}
            <div className="bg-gray-900/95 backdrop-blur-md border-b border-white/10 p-6 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-4">
                <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getStatusColor(selectedProject.status)} text-white`}>
                  {selectedProject.status}
                </span>
                {selectedProject.role && (
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded border border-blue-500/30">
                    {selectedProject.role}
                  </span>
                )}
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Image Gallery */}
              <div className="relative">
                <img
                  src={selectedProject.images[currentImageIndex]}
                  alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                  className="w-full rounded-xl"
                />
                
                {/* Navigation arrows - only show if multiple images */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
                
                {/* Dots indicator - only show if multiple images */}
                {selectedProject.images.length > 1 && (
                  <div className="flex justify-center space-x-2 mt-4">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-blue-400' 
                            : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">About This Project</h4>
                <p className="text-gray-300 leading-relaxed">{selectedProject.description}</p>
              </div>
              
              {/* Features */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Tech Stack */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.techStack.map((tech) => {
                    const getTechIcon = (techName: string) => {
                      const name = techName.toLowerCase();
                      if (name.includes('react')) return { icon: FaReact, color: 'text-blue-400' };
                      if (name.includes('typescript')) return { icon: SiTypescript, color: 'text-blue-400' };
                      if (name.includes('node')) return { icon: FaNodeJs, color: 'text-green-400' };
                      if (name.includes('express')) return { icon: SiExpress, color: 'text-green-400' };
                      if (name.includes('postgresql')) return { icon: SiPostgresql, color: 'text-purple-400' };
                      if (name.includes('sqlite')) return { icon: SiSqlite, color: 'text-purple-400' };
                      if (name.includes('docker')) return { icon: FaDocker, color: 'text-orange-400' };
                      if (name.includes('tailwind')) return { icon: SiTailwindcss, color: 'text-teal-400' };
                      if (name.includes('bulma')) return { icon: SiBulma, color: 'text-teal-400' };
                      if (name.includes('auth0')) return { icon: DiGitBranch, color: 'text-orange-400' };
                      if (name.includes('pusher')) return { icon: DiGitBranch, color: 'text-purple-400' };
                      if (name.includes('knex')) return { icon: DiGitBranch, color: 'text-green-400' };
                      return { icon: DiGitBranch, color: 'text-gray-400' };
                    };
                    
                    const { icon: IconComponent, color } = getTechIcon(tech);
                    
                    return (
                      <div key={tech} className="flex items-center space-x-2 px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-700/50 transition-colors group">
                        <IconComponent className={`w-5 h-5 ${color} group-hover:scale-110 transition-transform`} />
                        <span className="text-gray-300 text-sm">{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-4">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-600"
                  >
                    <FaGithub className="w-4 h-4" />
                    <span>View Code</span>
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;