// client/components/Skills/SkillCard.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { type Skill } from '../../data/skills';
import { getSkillIcon, getCategoryClasses } from './skillsUtils';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const meter = meterRef.current;
    const icon = iconRef.current;

    if (!card || !meter || !icon) return;

    // Set initial states - cards start in position but slightly below
    gsap.set(card, { y: 40, opacity: 1 });
    gsap.set(meter, { width: '0%' });
    gsap.set(icon, { scale: 0.9, opacity: 1 });

    // Smooth wave animation - cards slide up like being placed down
    const tl = gsap.timeline({ delay: index * 0.08 }); // Subtle wave timing

    // Card slides into final position
    tl.to(card, {
      y: 0,
      opacity: 1, // Force opacity to stay at 1
      duration: 0.5,
      ease: 'power2.out'
    })
    // Icon pops to full size
    .to(icon, {
      scale: 1,
      opacity: 1, // Force opacity to stay at 1
      duration: 0.3,
      ease: 'back.out(1.2)'
    }, '-=0.3')
    // Progress bar fills smoothly
    .to(meter, {
      width: `${skill.level}%`,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.2');

    return () => {
      tl.kill();
    };
  }, [skill.level, index]);

  const classes = getCategoryClasses(skill.category);

  return (
    <div
      ref={cardRef}
      className={`relative p-6 rounded-xl backdrop-blur-lg bg-white/3 border border-white/10 shadow-lg hover:shadow-xl group h-fit ${classes.hoverBorder}`}
    >
      {/* Skill Name */}
      <h3 className="text-lg font-semibold text-white mb-4"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        {skill.name}
      </h3>

      {/* Center Icon */}
      <div 
        ref={iconRef}
        className="flex justify-center items-center mb-6 text-white/60 group-hover:text-white/80 transition-colors duration-300"
      >
        {getSkillIcon(skill.name)}
      </div>

      {/* Progress Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
            Proficiency
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden border border-white/10">
          <div
            ref={meterRef}
            className={`h-full rounded-full shadow-lg ${classes.meter}`}
            style={{ width: '0%' }}
          />
        </div>
      </div>

      {/* Rating Dots */}
      <div className="flex justify-end">
        <div className="flex space-x-1.5">
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

export default SkillCard;