import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const name = nameRef.current;
    const subtitle = subtitleRef.current;
    const button = buttonRef.current;

    if (!name || !subtitle || !button) return;

    // Set initial states
    gsap.set([name, subtitle, button], {
      opacity: 0,
      y: 30
    });

    // Create entrance animation timeline
    const tl = gsap.timeline({ delay: 0.5 });

    tl.to(name, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .to(button, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");

  }, []);

  const scrollToSkills = () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="text-center max-w-4xl mx-auto">
        {/* Main Name */}
        <h1 
          ref={nameRef}
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent"
        >
          Ben Ngahere
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-8 font-medium"
        >
          Full-Stack Developer • React Specialist • GSAP Animator
        </p>

        {/* CTA Button */}
        <button 
          ref={buttonRef}
          onClick={scrollToSkills}
          className="px-8 py-4 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white font-medium transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105 shadow-lg"
        >
          View My Skills
        </button>
      </div>
    </section>
  );
};

export default Hero;