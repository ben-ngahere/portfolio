import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;
    const timeline = timelineRef.current;

    if (!section || !heading || !content || !timeline) return;

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

    // Animate timeline cards
    const timelineCards = timeline.querySelectorAll('.timeline-card');
    tl.fromTo(timelineCards,
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.5, 
        stagger: 0.2, 
        ease: 'power2.out' 
      },
      '-=0.3'
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const timelineData = [
    {
      period: "2012-2025",
      title: "Retail & Tech Management",
      description: "A decade of being that person who'd stay late reading documentation just to understand how the new systems worked - same energy I put into researching the perfect bike or snowboard components.",
      color: "from-purple-500 to-pink-500"
    },
    {
      period: "2025",
      title: "Dev Academy Bootcamp",
      description: "800 hours where I discovered my passion wasn't just solving problems - it was building the solutions. Like finally understanding why certain game mechanics work so well together.",
      color: "from-blue-500 to-purple-500"
    },
    {
      period: "Present",
      title: "Full-Stack Developer",
      description: "Building stuff that actually works. Exploring infrastructure and DevOps because that's where the interesting problems live - the backend systems that make everything else possible.",
      color: "from-green-500 to-blue-500"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          About Me
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                A Problem Solver Who Builds Solutions
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm someone who's always been curious about how things work and how to make them better. 
                For over a decade in retail, I was that person who'd disappear down rabbit holes understanding 
                how electronic shifting systems or smart home setups actually connected - probably the same 
                obsessive streak that has me tweaking bike setups or optimising game performance at home.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                What started as figuring out why things weren't working evolved into something bigger: 
                <span className="text-blue-400 font-medium"> I wanted to build the solutions myself</span>. 
                There's this satisfaction in that moment when everything just clicks - whether it's nailing 
                a tricky line on the trails, pulling off a perfect strategy in a game or watching code come together.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I'm drawn to the infrastructure side of development because that's where all that systematic 
                thinking actually makes sense. Plus, some of my best learning has come after my worst crashes - 
                both on the mountain and in code. You stack it, dust yourself off and try again.
              </p>
            </div>

            {/* Key Values */}
            <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-3">What Drives Me</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Systems thinking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Infrastructure focus</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Curiosity-driven</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Problem solving</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">The Journey</h3>
            {timelineData.map((item, index) => (
              <div key={index} className="timeline-card relative">
                <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
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
      </div>
    </section>
  );
};

export default About;