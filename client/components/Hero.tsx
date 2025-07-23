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
          className="text-6xl md:text-8xl font-bold mb-8 gradient-morph cursor-default select-none"
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