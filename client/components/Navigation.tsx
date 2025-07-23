import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const menuItems = menuItemsRef.current;
    if (!menuItems) return;

    if (isOpen) {
      // Open animation - cascade slide in from left
      gsap.set(menuItems.children, { opacity: 0, x: -30 });
      gsap.to(menuItems.children, { 
        opacity: 1, 
        x: 0, 
        duration: 0.3, 
        stagger: 0.08, 
        ease: 'power2.out' 
      });
    } else {
      // Close animation - quick fade out
      gsap.to(menuItems.children, { 
        opacity: 0, 
        duration: 0.15
      });
    }
  }, [isOpen]);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  const handleNavClick = (href: string) => {
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeNav();
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleNav}
        className="fixed top-6 left-6 z-50 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-3 hover:bg-white/15 transition-all duration-300 group"
      >
        {isOpen ? (
          <FaTimes className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors" />
        ) : (
          <FaBars className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors" />
        )}
      </button>

      {/* Navigation Items */}
      {isOpen && (
        <div 
          ref={menuItemsRef} 
          className="fixed top-24 left-6 z-40 space-y-4"
        >
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className="block text-2xl font-medium text-white hover:text-blue-400 transition-all duration-300 text-shadow-lg hover:translate-x-2"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Navigation;