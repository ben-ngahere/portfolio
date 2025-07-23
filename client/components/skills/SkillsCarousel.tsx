import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { type Skill } from '../../data/skills';
import SkillCard from './SkillCard';
import { getCategoryTabStyle } from './skillsUtils';

interface SkillsCarouselProps {
  skills: Skill[];
  activeCategory: string;
}

const SkillsCarousel: React.FC<SkillsCarouselProps> = ({ skills, activeCategory }) => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(skills.length / cardsPerSlide);

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeCategory]);

  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    // Animate in new cards
    gsap.fromTo(container.children, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
  }, [activeCategory, currentSlide]);

  const getCurrentSlideSkills = () => {
    const startIndex = currentSlide * cardsPerSlide;
    const endIndex = startIndex + cardsPerSlide;
    return skills.slice(startIndex, endIndex);
  };

  const goToSlide = (slideIndex: number) => {
    if (slideIndex === currentSlide || slideIndex < 0 || slideIndex >= totalSlides) return;
    setCurrentSlide(slideIndex);
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Category Title */}
      <div className="text-center mb-8">
        
      </div>

      {/* Cards Grid */}
      <div className="overflow-hidden">
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {getCurrentSlideSkills().map((skill, index) => (
            <SkillCard 
              key={`${activeCategory}-${skill.name}-${currentSlide}`}
              skill={skill} 
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Carousel Navigation */}
      {totalSlides > 1 && (
        <div className="flex items-center justify-center space-x-3 mt-8">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`w-8 h-8 rounded-full backdrop-blur-lg border transition-all duration-300 flex items-center justify-center text-sm ${
              currentSlide === 0 
                ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed' 
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30'
            }`}
          >
            ←
          </button>

          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? `bg-gradient-to-r ${getCategoryTabStyle(activeCategory).gradient} shadow-lg`
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`w-8 h-8 rounded-full backdrop-blur-lg border transition-all duration-300 flex items-center justify-center text-sm ${
              currentSlide === totalSlides - 1 
                ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed' 
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30'
            }`}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsCarousel