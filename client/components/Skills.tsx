// client/components/Skills.tsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData, type Skill } from '../data/skills';
import { 
  SiReact, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiAuth0,
  SiPostgresql,
  SiSqlite,
  SiGit,
} from 'react-icons/si';
import { TbApi, TbBrandFramerMotion } from 'react-icons/tb';
import { MdOutlineAnimation } from 'react-icons/md';

gsap.registerPlugin(ScrollTrigger);

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // Icon mapping for each technology
  const getSkillIcon = (skillName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'React': <SiReact className="w-8 h-8" />,
      'TypeScript': <SiTypescript className="w-8 h-8" />,
      'JavaScript (ES6+)': <SiJavascript className="w-8 h-8" />,
      'Tailwind CSS': <SiTailwindcss className="w-8 h-8" />,
      'Node.js': <SiNodedotjs className="w-8 h-8" />,
      'Express.js': <SiExpress className="w-8 h-8" />,
      'RESTful APIs': <TbApi className="w-8 h-8" />,
      'Auth0': <SiAuth0 className="w-8 h-8" />,
      'PostgreSQL': <SiPostgresql className="w-8 h-8" />,
      'SQLite': <SiSqlite className="w-8 h-8" />,
      'GSAP': <TbBrandFramerMotion className="w-8 h-8" />,
      'CSS Animations': <MdOutlineAnimation className="w-8 h-8" />,
      'Git & GitHub': <SiGit className="w-8 h-8" />,
      'Agile Methodologies': <MdOutlineAnimation className="w-8 h-8" />
    };
    
    return iconMap[skillName] || <SiReact className="w-8 h-8" />;
  };

  useEffect(() => {
    const card = cardRef.current;
    const meter = meterRef.current;
    const percentage = percentageRef.current;
    const icon = iconRef.current;

    if (!card || !meter || !percentage || !icon) return;

    // Set initial states
    gsap.set(card, { opacity: 0 });
    gsap.set(meter, { width: '0%' });
    gsap.set(percentage, { innerText: '0%' });
    gsap.set(icon, { opacity: 0 });

    // Simple sequential fade-in
    const tl = gsap.timeline({ delay: index * 0.2 });

    // Card and icon fade in together
    tl.to([card, icon], {
      opacity: 1,
      duration: 0.3,
      ease: 'power1.out'
    });

    // Progress bar fills
    tl.to(meter, {
      width: `${skill.level}%`,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.1');

    // Percentage counter
    tl.to(percentage, {
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: function() {
        const progress = this.progress();
        const currentValue = Math.round(progress * skill.level);
        if (percentage) {
          percentage.innerText = `${currentValue}%`;
        }
      }
    }, '-=0.6');

    return () => {
      // No cleanup needed
    };
  }, [skill.level, index]);

  // Category-based styling
  const getCategoryClasses = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return {
          badge: 'bg-gradient-to-r from-cyan-400 to-blue-500',
          meter: 'bg-gradient-to-r from-cyan-400 to-blue-500',
          dot: 'bg-cyan-400',
          hoverBorder: 'hover:border-cyan-400'
        };
      case 'backend':
        return {
          badge: 'bg-gradient-to-r from-green-400 to-emerald-500',
          meter: 'bg-gradient-to-r from-green-400 to-emerald-500',
          dot: 'bg-green-400',
          hoverBorder: 'hover:border-green-400'
        };
      case 'database':
        return {
          badge: 'bg-gradient-to-r from-purple-400 to-pink-500',
          meter: 'bg-gradient-to-r from-purple-400 to-pink-500',
          dot: 'bg-purple-400',
          hoverBorder: 'hover:border-purple-400'
        };
      case 'tools':
        return {
          badge: 'bg-gradient-to-r from-orange-400 to-red-500',
          meter: 'bg-gradient-to-r from-orange-400 to-red-500',
          dot: 'bg-orange-400',
          hoverBorder: 'hover:border-orange-400'
        };
      case 'animation':
        return {
          badge: 'bg-gradient-to-r from-yellow-400 to-orange-500',
          meter: 'bg-gradient-to-r from-yellow-400 to-orange-500',
          dot: 'bg-yellow-400',
          hoverBorder: 'hover:border-yellow-400'
        };
      default:
        return {
          badge: 'bg-gradient-to-r from-gray-400 to-gray-600',
          meter: 'bg-gradient-to-r from-gray-400 to-gray-600',
          dot: 'bg-gray-400',
          hoverBorder: 'hover:border-gray-400'
        };
    }
  };

  const classes = getCategoryClasses(skill.category);

  return (
    <div
      ref={cardRef}
      className={`relative p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 transition-all duration-300 shadow-lg hover:shadow-xl group h-fit ${classes.hoverBorder}`}
    >
      {/* Category Badge - Inside card border */}
      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white shadow-lg ${classes.badge}`}>
        {skill.category}
      </div>

      {/* Skill Name */}
      <h3 className="text-base font-semibold text-white mb-3 pt-2">
        {skill.name}
      </h3>

      {/* Center Floating Icon */}
      <div 
        ref={iconRef}
        className={`flex justify-center items-center mb-4 text-white/60 group-hover:text-white/80 transition-colors duration-300`}
      >
        {getSkillIcon(skill.name)}
      </div>

      {/* Progress Section */}
      <div className="mb-3">
        {/* Labels */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-300">Proficiency</span>
          <span ref={percentageRef} className="text-xs font-medium text-white">
            0%
          </span>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden border border-white/10">
          {/* Progress Bar Fill */}
          <div
            ref={meterRef}
            className={`h-full rounded-full shadow-lg ${classes.meter}`}
            style={{ width: '0%' }}
          />
        </div>
      </div>

      {/* Bottom Row: Level + Rating Dots */}
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
          {skill.level >= 80 ? 'Expert' : 
           skill.level >= 65 ? 'Advanced' : 
           skill.level >= 45 ? 'Intermediate' : 
           'Beginner'}
        </span>
        
        {/* 5-Star Rating System */}
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i < Math.ceil(skill.level / 20) 
                  ? `${classes.dot} shadow-sm` 
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const [activeCategory, setActiveCategory] = useState<string>('Frontend');
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Carousel settings
  const cardsPerSlide = 3; // Show 3 cards at once on desktop

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const tabs = tabsRef.current;

    if (!section || !title || !subtitle || !tabs) return;

    // Set initial states
    gsap.set([title, subtitle, tabs], { opacity: 0, y: 30 });

    // Animate title
    gsap.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate subtitle
    gsap.to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate tabs
    gsap.to(tabs, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section || trigger.trigger === title) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Group skills by category
  const groupedSkills = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(groupedSkills);
  const activeSkills = groupedSkills[activeCategory] || [];
  
  // Calculate carousel slides
  const totalSlides = Math.ceil(activeSkills.length / cardsPerSlide);

  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) return;

    const container = cardsContainerRef.current;
    if (!container) return;

    // Animate out current cards
    gsap.to(container.children, {
      opacity: 0,
      x: -50,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        setActiveCategory(category);
        setCurrentSlide(0); // Reset to first slide
      }
    });
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

  // Get current slide's skills
  const getCurrentSlideSkills = () => {
    const startIndex = currentSlide * cardsPerSlide;
    const endIndex = startIndex + cardsPerSlide;
    return activeSkills.slice(startIndex, endIndex);
  };

  // Get category styling
  const getCategoryTabStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return {
          gradient: 'from-cyan-400 to-blue-500',
          hoverBorder: 'hover:border-cyan-400'
        };
      case 'backend':
        return {
          gradient: 'from-green-400 to-emerald-500',
          hoverBorder: 'hover:border-green-400'
        };
      case 'database':
        return {
          gradient: 'from-purple-400 to-pink-500',
          hoverBorder: 'hover:border-purple-400'
        };
      case 'tools':
        return {
          gradient: 'from-orange-400 to-red-500',
          hoverBorder: 'hover:border-orange-400'
        };
      case 'animation':
        return {
          gradient: 'from-yellow-400 to-orange-500',
          hoverBorder: 'hover:border-yellow-400'
        };
      default:
        return {
          gradient: 'from-gray-400 to-gray-600',
          hoverBorder: 'hover:border-gray-400'
        };
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent"
          >
            Technical Skills
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Explore my proficiency across different technology stacks
          </p>

          {/* Category Tabs */}
          <div 
            ref={tabsRef}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => {
              const tabStyle = getCategoryTabStyle(category);
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? `bg-gradient-to-r ${tabStyle.gradient} text-white shadow-lg scale-105`
                      : `bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10 ${tabStyle.hoverBorder}`
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Skills */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-white">
            {activeCategory} Technologies
          </h3>
        </div>

        {/* Cards */}
        <div className="max-w-5xl mx-auto">
          <div 
            ref={carouselRef}
            className="overflow-hidden"
          >
            <div 
              ref={cardsContainerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
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
        </div>

        {/* SIMPLE NAVIGATION: Arrow Dot Dot Arrow */}
        {totalSlides > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-8">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`w-6 h-6 rounded-full text-xs ${
                currentSlide === 0 
                  ? 'bg-white/10 text-white/30 cursor-not-allowed' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              ←
            </button>

            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index
                    ? `bg-gradient-to-r ${getCategoryTabStyle(activeCategory).gradient}`
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}

            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className={`w-6 h-6 rounded-full text-xs ${
                currentSlide === totalSlides - 1 
                  ? 'bg-white/10 text-white/30 cursor-not-allowed' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;