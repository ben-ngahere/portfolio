/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaChevronDown } from 'react-icons/fa';

interface HeroProps {
  onHamburgerAnimationComplete?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onHamburgerAnimationComplete }) => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const name = nameRef.current;
    const subtitle = subtitleRef.current;
    const button = buttonRef.current;

    if (!name || !subtitle || !button) return;

    // Create floating particles
    const createParticles = () => {
      const colors = [
        'rgba(135, 206, 235, 0.6)', // light blue
        'rgba(255, 215, 0, 0.5)',   // gold
        'rgba(147, 112, 219, 0.6)', // purple
        'rgba(138, 43, 226, 0.5)',  // violet
        'rgba(255, 20, 147, 0.6)',  // magenta
        'rgba(144, 238, 144, 0.5)'  // light green
      ];

      const particleContainer = document.createElement('div');
      particleContainer.className = 'particle-container';
      particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
      `;

      // Create 10 particles
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 3 + 2; // 2-5px
        
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          filter: blur(0.5px);
          box-shadow: 0 0 ${size * 2}px ${color};
        `;

        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        particleContainer.appendChild(particle);

        // Gentle floating animation
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 150,
          duration: Math.random() * 15 + 10, // 10-25 seconds
          ease: 'none',
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 5
        });

        // Gentle opacity breathing
        gsap.to(particle, {
          opacity: Math.random() * 0.3 + 0.3, // 0.3-0.6
          duration: Math.random() * 3 + 2, // 2-5 seconds
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 2
        });
      }

      document.querySelector('#hero')?.appendChild(particleContainer);
    };

    // Start particles immediately
    createParticles();

    // Set initial states for main elements
    gsap.set(name, {
      opacity: 0.2,
      scale: 2.8,
      filter: 'blur(8px)'
    });

    gsap.set([subtitle, button], {
      opacity: 0,
      y: 30
    });

    // Create main timeline
    const tl = gsap.timeline({ delay: 0.8 });

    // Matrix unscramble effect during name entrance
    const originalText = 'Ben Ngahere';
    const matrixChars = 'ﾊﾐﾋｰｳｼﾅｴｶｷﾑﾒﾓｻｽｾｿﾀﾁﾂﾃﾅﾆﾇﾈﾊﾋﾌﾍﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ@#$%^&*(){}[]|\\~`01101001';
    let updateCounter = 0;
    
    const smoothCycleText = (progress: number) => {
      return originalText
        .split('')
        .map((finalChar, index) => {
          if (finalChar === ' ') return ' ';
          
          // Stagger resolution - each character resolves at different times
          const charResolveTime = 0.3 + (index * 0.08); // Start at 30%, stagger by 8%
          
          if (progress >= charResolveTime) {
            return finalChar; // Character is resolved
          } else {
            // Character is still cycling - use counter for smooth cycling
            const cycleIndex = (updateCounter + index * 3) % matrixChars.length;
            return matrixChars[cycleIndex];
          }
        })
        .join('');
    };

    // Name entrance with smooth matrix cycling
    tl.to(name, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 4,
      ease: "power3.out",
      onUpdate: function() {
        const progress = this.progress();
        updateCounter++;
        
        if (progress < 0.85 && name) {
          // Only update every 3rd frame to slow down the cycling
          if (updateCounter % 7 === 0) {
            name.textContent = smoothCycleText(progress);
          }
        } else if (name) {
          name.textContent = originalText;
        }
      },
      onComplete: function() {
        if (name) name.textContent = originalText;
      }
    });

    // Give name extra spotlight time, then subtitle
    tl.to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, '+=1.2');

    // Arrow button appears after subtitle
    tl.to(button, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, '+=0.5');

    // Signal hamburger to animate in
    tl.call(() => {
      if (onHamburgerAnimationComplete) {
        onHamburgerAnimationComplete();
      }
    }, [], '+=0.3');

    // Add subtle breathing effect to button after everything settles
    gsap.to(button, {
      scale: 1.02,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 8
    });

    // Cleanup function
    return () => {
      const particleContainer = document.querySelector('.particle-container');
      if (particleContainer) {
        particleContainer.remove();
      }
    };

  }, [onHamburgerAnimationComplete]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center px-4 relative"
    >
      <div className="text-center max-w-4xl mx-auto">
        {/* Main Name */}
        <h1 
          ref={nameRef}
          className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent cursor-default select-none"
          style={{ 
            fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            letterSpacing: '-0.02em'
          }}
        >
          Ben Ngahere
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-12 font-medium tracking-wide"
        >
          Full-Stack Developer
        </p>

        {/* Circular Scroll Button - positioned at bottom center */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button 
            ref={buttonRef}
            onClick={scrollToAbout}
            className="group relative w-16 h-16 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-110 shadow-xl hover:shadow-2xl flex items-center justify-center"
          >
            <FaChevronDown className="w-6 h-6 transition-transform duration-300 group-hover:translate-y-1 group-hover:scale-110" />
            
            {/* Ripple effect on hover */}
            <div className="absolute inset-0 rounded-full bg-white/5 scale-0 group-hover:scale-150 transition-transform duration-500 ease-out pointer-events-none"></div>
          </button>
        </div>
      </div>

      {/* Subtle geometric background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-500/3 to-purple-500/3 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-pink-500/3 to-cyan-500/3 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
};

export default Hero;