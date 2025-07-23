import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData, type Skill } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const meter = meterRef.current;
    const percentage = percentageRef.current;

    if (!card || !meter || !percentage) return;

    // Set initial states
    gsap.set(card, { opacity: 0, y: 50, scale: 0.9 });
    gsap.set(meter, { width: '0%' });
    gsap.set(percentage, { innerText: '0%' });

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate card entrance
    tl.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',
      delay: index * 0.1
    });

    // Animate progress bar
    tl.to(meter, {
      width: `${skill.level}%`,
      duration: 1.2,
      ease: 'power2.out'
    }, '-=0.3');

    // Animate percentage counter
    tl.to(percentage, {
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: function() {
        const progress = this.progress();
        const currentValue = Math.round(progress * skill.level);
        if (percentage) {
          percentage.innerText = `${currentValue}%`;
        }
      }
    }, '-=1.2');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === card) {
          trigger.kill();
        }
      });
    };
  }, [skill.level, index]);

  // Category-based styling
  const getCategoryClasses = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return {
          badge: 'bg-gradient-to-r from-cyan-400 to-blue-500',
          meter: 'bg-gradient-to-r from-cyan-400 to-blue-500',
          dot: 'bg-cyan-400'
        };
      case 'backend':
        return {
          badge: 'bg-gradient-to-r from-green-400 to-emerald-500',
          meter: 'bg-gradient-to-r from-green-400 to-emerald-500',
          dot: 'bg-green-400'
        };
      case 'database':
        return {
          badge: 'bg-gradient-to-r from-purple-400 to-pink-500',
          meter: 'bg-gradient-to-r from-purple-400 to-pink-500',
          dot: 'bg-purple-400'
        };
      case 'tools':
        return {
          badge: 'bg-gradient-to-r from-orange-400 to-red-500',
          meter: 'bg-gradient-to-r from-orange-400 to-red-500',
          dot: 'bg-orange-400'
        };
      case 'animation':
        return {
          badge: 'bg-gradient-to-r from-yellow-400 to-orange-500',
          meter: 'bg-gradient-to-r from-yellow-400 to-orange-500',
          dot: 'bg-yellow-400'
        };
      default:
        return {
          badge: 'bg-gradient-to-r from-gray-400 to-gray-600',
          meter: 'bg-gradient-to-r from-gray-400 to-gray-600',
          dot: 'bg-gray-400'
        };
    }
  };

  const classes = getCategoryClasses(skill.category);

  return (
    <div
      ref={cardRef}
      className="relative p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
    >
      {/* Floating Category Badge */}
      <div className={`absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg ${classes.badge}`}>
        {skill.category}
      </div>

      {/* Skill Name */}
      <h3 className="text-lg font-semibold text-white mb-4 pt-2">
        {skill.name}
      </h3>

      {/* Progress Section */}
      <div className="mb-4">
        {/* Labels */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-300">Proficiency</span>
          <span ref={percentageRef} className="text-sm font-medium text-white">
            0%
          </span>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden border border-white/10">
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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
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

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (!section || !title || !subtitle) return;

    // Set initial states
    gsap.set([title, subtitle], { opacity: 0, y: 30 });

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
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Proficiency levels in the technologies I work with, from frontend frameworks to backend systems
          </p>
        </div>

        {/* Skills Grid by Category */}
        <div className="space-y-12">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-2xl font-semibold text-white mb-6 capitalize">
                {category} Technologies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <SkillCard 
                    key={skill.name} 
                    skill={skill} 
                    index={index}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;