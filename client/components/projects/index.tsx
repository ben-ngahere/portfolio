/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChevronDown } from 'react-icons/fa';
import { projectsData, type Project } from './projects'
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const downArrowRef = useRef<HTMLDivElement>(null);
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cards = cardsRef.current;
    const downArrow = downArrowRef.current;

    if (!section || !title || !subtitle || !cards || !downArrow) return;

    // Create floating particles
    const createParticles = () => {
      const colors = [
        'rgba(135, 206, 235, 0.4)', // light blue
        'rgba(255, 215, 0, 0.3)',   // gold
        'rgba(147, 112, 219, 0.4)', // purple
        'rgba(138, 43, 226, 0.3)',  // violet
        'rgba(255, 20, 147, 0.4)',  // magenta
        'rgba(144, 238, 144, 0.3)'  // light green
      ];

      // Remove existing particles
      const existingParticles = document.querySelector('.projects-particle-container');
      if (existingParticles) {
        existingParticles.remove();
      }

      const particleContainer = document.createElement('div');
      particleContainer.className = 'projects-particle-container';
      particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
      `;

      // Create 20 particles
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 2.5 + 1.5;
        
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          filter: blur(0.5px);
          box-shadow: 0 0 ${size * 2}px ${color};
        `;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particleContainer.appendChild(particle);

        // Animations
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 150,
          y: (Math.random() - 0.5) * 100,
          duration: Math.random() * 12 + 8,
          ease: 'none',
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 4
        });

        gsap.to(particle, {
          opacity: Math.random() * 0.4 + 0.2,
          duration: Math.random() * 4 + 2,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 3
        });
      }
      section.appendChild(particleContainer);
    };

    createParticles();

    // Set initial states
    gsap.set([title, subtitle, downArrow], { opacity: 0, y: 30 });

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    })
    .to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.6')
    .to(downArrow, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.4');

    // Animate project cards
    const projectCards = cards.querySelectorAll('.project-card');
    gsap.set(projectCards, { y: 40, opacity: 1 });
    
    gsap.to(projectCards, {
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cards,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    // Down arrow pulse animation
    gsap.to(downArrow, {
      y: 10,
      duration: 1.5,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section || trigger.trigger === title) {
          trigger.kill();
        }
      });
      
      const particleContainer = document.querySelector('.projects-particle-container');
      if (particleContainer) {
        particleContainer.remove();
      }
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

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('contact');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section 
        ref={sectionRef} 
        id="projects" 
        className="relative min-h-screen py-20 px-4 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Projects
            </h2>
            <p 
              ref={subtitleRef}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              What I've done and working on
            </p>
          </div>

          {/* Project Cards */}
          <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenModal={openModal}
              />
            ))}
          </div>

          {/* Down Arrow */}
          <div 
            ref={downArrowRef}
            className="absolute bottom left-1/2 transform -translate-x-1/2 z-20"
          >
            <button
              onClick={scrollToNextSection}
              className="w-8 h-8 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 group shadow-lg"
              aria-label="Scroll to next section"
            >
              <FaChevronDown className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Projects