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
      scale: 3,
      filter: 'blur(8px)',
      force3D: true
    });

    gsap.set([subtitle, button], {
      opacity: 0,
      y: 30,
      force3D: true
    });

    // Create main timeline
    const tl = gsap.timeline({ delay: 0.2 });

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
          const charResolveTime = 0.1 + (index * 0.08);
          
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
      scale: 1.2,
      filter: 'blur(0px)',
      duration: 9,
      ease: "power3.out",
      force3D: true,
      onUpdate: function() {
        const progress = this.progress();
        updateCounter++;
        
        if (progress < 0.9 && name) {
          // Only update every 'x' frame to slow down the cycling
          if (updateCounter % 5 === 0) {
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

    // Give name extra time, then subtitle
    tl.to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      force3D: true
    }, '+=1.2');

    // Arrow button appears after subtitle
    tl.to(button, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      force3D: true
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
      delay: 8,
      force3D: true
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
      className="min-h-screen flex items-center justify-center px-4 relative gpu-accelerated"
    >
      <div className="text-center max-w-4xl mx-auto">
        {/* Main Name */}
        <h1 
          ref={nameRef}
          className="text-6xl md:text-8xl font-bold mb-8 gradient-morph cursor-default select-none gpu-text-morph"
          style={{ 
            fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            letterSpacing: '-0.02em',
            willChange: 'transform, opacity, background-position',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          Ben Ngahere
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-12 font-medium tracking-wide gpu-accelerated"
          style={{
            willChange: 'transform, opacity'
          }}
        >
          Full-Stack Developer
        </p>

        {/* Circular Scroll Button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button 
            ref={buttonRef}
            onClick={scrollToAbout}
            className="group relative w-8 h-8 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-110 shadow-xl hover:shadow-2xl flex items-center justify-center gpu-accelerated"
            style={{
              willChange: 'transform, opacity'
            }}
          >
            <FaChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1 group-hover:scale-110" />
            
            {/* Ripple effect on hover */}
            <div 
              className="absolute inset-0 rounded-full bg-white/5 scale-0 group-hover:scale-150 transition-transform duration-500 ease-out pointer-events-none"
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
            />
          </button>
        </div>
      </div>

      {/* Subtle geometric background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 gpu-accelerated">
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-500/3 to-purple-500/3 rounded-full blur-xl"
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-pink-500/3 to-cyan-500/3 rounded-full blur-2xl"
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
        />
      </div>
    </section>
  );
};

export default Hero;