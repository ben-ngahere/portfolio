import React from 'react';
import { FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiPostgresql, SiExpress, SiTailwindcss, SiSqlite, SiBulma, SiAuth0, SiKnexdotjs } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

interface TechStackProps {
  techStack: string[];
}

const TechStack: React.FC<TechStackProps> = ({ techStack }) => {
  const getTechIcon = (techName: string) => {
    const name = techName.toLowerCase();
    if (name.includes('react')) return { icon: FaReact, color: 'text-blue-400' };
    if (name.includes('typescript')) return { icon: SiTypescript, color: 'text-blue-400' };
    if (name.includes('node')) return { icon: FaNodeJs, color: 'text-green-400' };
    if (name.includes('express')) return { icon: SiExpress, color: 'text-green-400' };
    if (name.includes('postgresql')) return { icon: SiPostgresql, color: 'text-purple-400' };
    if (name.includes('sqlite')) return { icon: SiSqlite, color: 'text-purple-400' };
    if (name.includes('docker')) return { icon: FaDocker, color: 'text-blue-500' };
    if (name.includes('tailwind')) return { icon: SiTailwindcss, color: 'text-teal-400' };
    if (name.includes('bulma')) return { icon: SiBulma, color: 'text-teal-400' };
    if (name.includes('auth0')) return { icon: SiAuth0, color: 'text-orange-400' };
    if (name.includes('knex')) return { icon: SiKnexdotjs, color: 'text-orange-400' };
    if (name.includes('pusher')) return { icon: TbApi, color: 'text-purple-400' };
    return { icon: TbApi, color: 'text-gray-400' };
  };

  return (
    <div>
      <h4 
        className="text-lg font-semibold text-white mb-3"
        style={{ fontFamily: 'JetBrains Mono, monospace' }}
      >
        Tech Stack
      </h4>
      <div className="flex flex-wrap gap-3">
        {techStack.map((tech) => {
          const { icon: IconComponent, color } = getTechIcon(tech);
          
          return (
            <div 
              key={tech} 
              className="flex items-center space-x-2 px-3 py-2 backdrop-blur-lg bg-gray-800/30 rounded-lg border border-gray-700/50 hover:bg-gray-700/30 transition-colors group"
            >
              <IconComponent className={`w-5 h-5 ${color} group-hover:scale-110 transition-transform`} />
              <span 
                className="text-gray-300 text-sm"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {tech}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechStack