// client/components/Skills/skillsUtils.tsx
import React from 'react';
import { 
  SiReact, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss,
  SiBulma,
  SiNodedotjs,
  SiExpress,
  SiAuth0,
  SiPostgresql,
  SiSqlite,
  SiGit,
  SiDocker,
  SiRender,
  SiVercel,
  SiFramer,
  SiKnexdotjs,
  SiGreensock,
  SiVite
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { MdOutlineAnimation } from 'react-icons/md';

export const getSkillIcon = (skillName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'React': <SiReact className="w-8 h-8" />,
    'TypeScript': <SiTypescript className="w-8 h-8" />,
    'JavaScript (ES6+)': <SiJavascript className="w-8 h-8" />,
    'Tailwind CSS': <SiTailwindcss className="w-8 h-8" />,
    'Bulma CSS': <SiBulma className="w-8 h-8" />,
    'Node.js': <SiNodedotjs className="w-8 h-8" />,
    'Express.js': <SiExpress className="w-8 h-8" />,
    'RESTful APIs': <TbApi className="w-8 h-8" />,
    'Auth0': <SiAuth0 className="w-8 h-8" />,
    'PostgreSQL': <SiPostgresql className="w-8 h-8" />,
    'SQLite': <SiSqlite className="w-8 h-8" />,
    'GSAP': <SiGreensock className="w-8 h-8" />,
    'Framer Motion': <SiFramer className="w-8 h-8" />,
    'Git & GitHub': <SiGit className="w-8 h-8" />,
    'Agile Methodologies': <MdOutlineAnimation className="w-8 h-8" />,
    'Docker': <SiDocker className="w-8 h-8" />,
    'Render': <SiRender className="w-8 h-8" />,
    'Vercel': <SiVercel className="w-8 h-8" />,
    'Knex.js': <SiKnexdotjs className="w-8 h-8" />,
    'Vite': <SiVite className="w-8 h-8" />
  };
  
  return iconMap[skillName] || <SiReact className="w-8 h-8" />;
};

export const getCategoryClasses = (category: string) => {
  switch (category.toLowerCase()) {
    case 'frontend':
      return {
        badge: 'bg-gradient-to-r from-cyan-400 to-blue-500',
        meter: 'bg-gradient-to-r from-cyan-400 to-blue-500',
        dot: 'bg-cyan-400',
        hoverBorder: 'hover:border-cyan-400/50'
      };
    case 'backend':
      return {
        badge: 'bg-gradient-to-r from-green-400 to-emerald-500',
        meter: 'bg-gradient-to-r from-green-400 to-emerald-500',
        dot: 'bg-green-400',
        hoverBorder: 'hover:border-green-400/50'
      };
    case 'database':
      return {
        badge: 'bg-gradient-to-r from-purple-400 to-pink-500',
        meter: 'bg-gradient-to-r from-purple-400 to-pink-500',
        dot: 'bg-purple-400',
        hoverBorder: 'hover:border-purple-400/50'
      };
    case 'tools':
      return {
        badge: 'bg-gradient-to-r from-orange-400 to-red-500',
        meter: 'bg-gradient-to-r from-orange-400 to-red-500',
        dot: 'bg-orange-400',
        hoverBorder: 'hover:border-orange-400/50'
      };
    case 'animation':
      return {
        badge: 'bg-gradient-to-r from-yellow-400 to-orange-500',
        meter: 'bg-gradient-to-r from-yellow-400 to-orange-500',
        dot: 'bg-yellow-400',
        hoverBorder: 'hover:border-yellow-400/50'
      };
    default:
      return {
        badge: 'bg-gradient-to-r from-gray-400 to-gray-600',
        meter: 'bg-gradient-to-r from-gray-400 to-gray-600',
        dot: 'bg-gray-400',
        hoverBorder: 'hover:border-gray-400/50'
      };
  }
};

export const getCategoryTabStyle = (category: string) => {
  switch (category.toLowerCase()) {
    case 'frontend':
      return {
        gradient: 'from-cyan-400 to-blue-500',
        hoverBorder: 'hover:border-cyan-400/50'
      };
    case 'backend':
      return {
        gradient: 'from-green-400 to-emerald-500',
        hoverBorder: 'hover:border-green-400/50'
      };
    case 'database':
      return {
        gradient: 'from-purple-400 to-pink-500',
        hoverBorder: 'hover:border-purple-400/50'
      };
    case 'tools':
      return {
        gradient: 'from-orange-400 to-red-500',
        hoverBorder: 'hover:border-orange-400/50'
      };
    case 'animation':
      return {
        gradient: 'from-yellow-400 to-orange-500',
        hoverBorder: 'hover:border-yellow-400/50'
      };
    default:
      return {
        gradient: 'from-gray-400 to-gray-600',
        hoverBorder: 'hover:border-gray-400/50'
      };
  }
};