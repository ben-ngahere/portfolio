/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaEnvelope, FaLinkedin, FaGithub, FaDownload, FaMapMarkerAlt } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;

    if (!section || !heading || !content) return;

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

    const contactCards = content.querySelectorAll('.contact-card');
    tl.fromTo(contactCards,
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

  const contactMethods = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'ngahereben@gmail.com',
      href: 'mailto:ngahereben@gmail.com',
      iconHover: 'hover:text-red-400',
      borderHover: 'hover:border-red-400/50'
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/ben-ngahere',
      href: 'https://linkedin.com/in/ben-ngahere',
      iconHover: 'hover:text-blue-400',
      borderHover: 'hover:border-blue-400/50'
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'github.com/ben-ngahere',
      href: 'https://github.com/ben-ngahere',
      iconHover: 'hover:text-purple-400',
      borderHover: 'hover:border-purple-400/50'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Hamilton, New Zealand',
      href: null,
      iconHover: 'hover:text-green-400',
      borderHover: 'hover:border-green-400/50'
    }
  ];

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          Contact
        </h2>
        
        <div ref={contentRef} className="space-y-8">
          {/* Intro Message */}
          <div className="contact-card backdrop-blur-lg bg-white/3 rounded-2xl p-8 border border-white/10 mb-12">
            <p 
              className="text-xl text-gray-300 leading-relaxed mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Always keen for a chat about tech or code. 
              Whether it's a project collaboration or you want to talk shop about development, 
              drop me a line
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {contactMethods.map((method) => {
              const IconComponent = method.icon;
              const content = (
                <div className={`contact-card backdrop-blur-lg bg-white/3 rounded-2xl p-6 border border-white/10 transition-all duration-300 group ${method.borderHover} ${method.href ? 'cursor-pointer' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <IconComponent className={`w-6 h-6 text-gray-400 ${method.iconHover} transition-colors`} />
                    <div className="text-left">
                      <h3 
                        className="text-white font-medium mb-1"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {method.label}
                      </h3>
                      <p 
                        className="text-gray-300 text-sm"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {method.value}
                      </p>
                    </div>
                  </div>
                </div>
              );

              return method.href ? (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {content}
                </a>
              ) : (
                <div key={method.label}>
                  {content}
                </div>
              );
            })}
          </div>

          {/* CV Download */}
          <div className="contact-card backdrop-blur-lg bg-white/3 rounded-2xl p-8 border border-white/10">
            <p 
              className="text-gray-300 mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              For an overview of my experience, 
              projects and technical skills
            </p>
            <a
              href="client/public/cv/BenNgahere-CV.pdf"
              download="BenNgahere-CV.pdf"
              className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 group hover:scale-105"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <FaDownload className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;