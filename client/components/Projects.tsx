import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaPlay } from 'react-icons/fa';

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
  screenshot?: string;
  video?: string;
  features: string[];
}

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const projects: Project[] = [
    {
      id: 'fono',
      title: 'FONO',
      tagline: 'Secure communication platform with real-time encrypted messaging',
      status: 'In Development',
      description: "Currently building a privacy-first communication platform that explores modern security principles. It's been a proper deep dive into real-time messaging, encryption, and user experience design. The kind of project where you disappear down rabbit holes understanding how secure protocols actually work.",
      techStack: ['React', 'TypeScript', 'Node.js', 'Auth0', 'PostgreSQL', 'Docker', 'Pusher', 'TailwindCSS'],
      githubUrl: 'https://github.com/ben-ngahere/fono',
      screenshot: '/api/placeholder/600/400',
      video: '/api/placeholder/600/400',
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
      screenshot: '/api/placeholder/600/400',
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
      screenshot: '/api/placeholder/600/400',
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
    setIsVideoPlaying(false);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Live' ? 'from-green-500 to-emerald-500' : 'from-yellow-500 to-orange-500';
  };

  return (
    <>
      <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-4 py-20">
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md border-b border-white/10 p-6 flex items-center justify-between">
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
            
            <div className="p-6 space-y-6">
              {/* Media Section */}
              <div className="relative">
                {selectedProject.video && selectedProject.id === 'fono' ? (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      className="w-full rounded-xl"
                      poster={selectedProject.screenshot}
                    >
                      <source src={selectedProject.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <button
                      onClick={toggleVideo}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors rounded-xl"
                    >
                      {!isVideoPlaying && (
                        <div className="bg-blue-500 hover:bg-blue-600 rounded-full p-4 transition-colors">
                          <FaPlay className="w-8 h-8 text-white ml-1" />
                        </div>
                      )}
                    </button>
                  </div>
                ) : (
                  <img
                    src={selectedProject.screenshot}
                    alt={`${selectedProject.title} screenshot`}
                    className="w-full rounded-xl"
                  />
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
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg border border-gray-700">
                      {tech}
                    </span>
                  ))}
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