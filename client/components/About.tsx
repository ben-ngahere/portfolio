/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChevronDown } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;
    const timeline = timelineRef.current;
    const button = buttonRef.current;

    if (!section || !heading || !content || !timeline || !button) return;

    // Set initial states
    gsap.set(button, {
      opacity: 0,
      y: 30
    });

    // Create timeline for section animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate heading
    tl.fromTo(heading, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );

    // Animate content
    tl.fromTo(content,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Animate left side boxes with stagger
    const leftSideBoxes = content.querySelectorAll('.story-box');
    tl.fromTo(leftSideBoxes,
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.5, 
        stagger: 0.15, 
        ease: 'power2.out' 
      },
      '-=0.5'
    );

    // Animate timeline cards
    const timelineCards = timeline.querySelectorAll('.timeline-card');
    const journeyHeading = timeline.querySelector('.journey-heading');
    
    tl.fromTo(journeyHeading,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(timelineCards,
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.5, 
        stagger: 0.2, 
        ease: 'power2.out' 
      },
      '-=0.2'
    );

    // Arrow button appears last
    tl.to(button, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, '+=0.3');

    // Add subtle breathing effect to button
    gsap.to(button, {
      scale: 1.02,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 3
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const timelineData = [
    {
      period: "2010-2025",
      title: "Retail & Tech Management",
      description: "Over a decade of being that person who'd stay late reading documentation just to understand how the new systems worked - same energy I put into researching the perfect bike or snowboard components",
      color: "from-purple-500 to-pink-500"
    },
    {
      period: "2025",
      title: "Dev Academy Aotearoa",
      description: "800 hours where I discovered my passion wasn't just solving problems - it was building the solutions. Like finally understanding why certain game mechanics work so well together",
      color: "from-blue-500 to-purple-500"
    },
    {
      period: "Present",
      title: "Full-Stack Developer",
      description: "Building stuff that works. Exploring infrastructure and DevOps because that's where the interesting problems live",
      color: "from-green-500 to-blue-500"
    }
  ];

  const scrollToSkills = () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="min-h-screen flex items-center justify-center px-4 py-20 relative"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          style={{ fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace' }}
        >
          About Me
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="story-box backdrop-blur-lg bg-white/3 rounded-2xl p-8 border border-white/20 hover:border-blue-400/60 hover:bg-white/8 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/10">
              <h3 
                className="text-2xl font-semibold text-white mb-4"
                style={{ fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace' }}
              >
                How I Got Here
              </h3>
              <p 
                className="text-gray-300 leading-relaxed mb-4"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                I'm someone who's always been curious about how things work and how to make them better. 
                For over a decade in retail, I was that person who'd disappear down rabbit holes understanding 
                how electronic shifting systems or smart home setups actually connected - probably the same 
                obsessive streak that has me tweaking bike setups or optimising game performance at home.
              </p>
              <p 
                className="text-gray-300 leading-relaxed mb-4"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                What started as figuring out why things weren't working evolved into something bigger: 
                <span className="text-blue-400 font-medium"> I wanted to build the solutions myself</span>. 
                There's this satisfaction in that moment when everything just clicks - whether it's nailing 
                a tricky line on the trails, pulling off a perfect strategy in a game or watching code come together.
              </p>
              <p 
                className="text-gray-300 leading-relaxed"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                I'm drawn to the infrastructure side of development because that's where all that systematic 
                thinking actually makes sense. Plus, some of my best learning has come after my worst crashes - 
                both on the mountain and in code. You stack it, dust yourself off and try again.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="space-y-6">
            <h3 
              className="journey-heading text-xl font-semibold text-white mb-6 text-center"
              style={{ fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace' }}
            >
              The Journey
            </h3>
            {timelineData.map((item, index) => (
              <div key={index} className="timeline-card relative">
                <div className={`backdrop-blur-lg bg-white/3 rounded-xl p-6 border border-white/20 hover:bg-white/8 transition-all duration-300 hover:shadow-lg ${
                  index === 0 ? 'hover:border-pink-400/60 hover:shadow-purple-400/10' :
                  index === 1 ? 'hover:border-violet-400/60 hover:shadow-blue-400/10' :
                  'hover:border-green-400/60 hover:shadow-green-400/10'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <span 
                        className="text-white font-bold text-sm"
                        style={{ fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace' }}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 
                          className="font-semibold text-white"
                          style={{ fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace' }}
                        >
                          {item.title}
                        </h4>
                        <span 
                          className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded"
                          style={{ fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace' }}
                        >
                          {item.period}
                        </span>
                      </div>
                      <p 
                        className="text-gray-300 text-sm leading-relaxed"
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Connecting line */}
                {index < timelineData.length - 1 && (
                  <div className="absolute left-6 top-full w-0.5 h-6 bg-gradient-to-b from-gray-600 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Circular Scroll Button - positioned at bottom center */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <button 
            ref={buttonRef}
            onClick={scrollToSkills}
            className="group relative w-8 h-8 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-110 shadow-xl hover:shadow-2xl flex items-center justify-center"
          >
            <FaChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1 group-hover:scale-110" />
            
            {/* Ripple effect on hover */}
            <div className="absolute inset-0 rounded-full bg-white/5 scale-0 group-hover:scale-150 transition-transform duration-500 ease-out pointer-events-none"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;