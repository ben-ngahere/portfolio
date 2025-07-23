import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GlobalParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticles = () => {
      const colors = [
        'rgba(135, 206, 235, 0.4)', // light blue
        'rgba(255, 215, 0, 0.3)',   // gold
        'rgba(147, 112, 219, 0.4)', // purple
        'rgba(138, 43, 226, 0.3)',  // violet
        'rgba(255, 20, 147, 0.4)',  // magenta
        'rgba(144, 238, 144, 0.3)'  // light green
      ];

      // Clear any existing particles
      container.innerHTML = '';

      // Create particles
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 2.5 + 1.5; // 1.5-4px
        
        // Particle styling
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          filter: blur(0.5px);
          box-shadow: 0 0 ${size * 2}px ${color};
          will-change: transform, opacity;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        `;
        
        // Random positioning across the viewport
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        container.appendChild(particle);

        // Set initial transform
        gsap.set(particle, {
          force3D: true,
          transformOrigin: "center center"
        });

        // Floating animations
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 150,
          duration: Math.random() * 15 + 10, // 10-25 seconds
          ease: 'none',
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 5,
          force3D: true
        });

        // Opacity pulsing
        gsap.to(particle, {
          opacity: Math.random() * 0.4 + 0.2, // 0.2-0.6
          duration: Math.random() * 4 + 2,    // 2-6 seconds
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 3,
          force3D: true
        });
      }
    };

    createParticles();

    // Cleanup function
    return () => {
      if (container) {
        // Kill all GSAP animations before cleanup
        gsap.killTweensOf(container.children);
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        width: '100vw',
        height: '100vh',
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden'
      }}
    />
  );
};

export default GlobalParticles;