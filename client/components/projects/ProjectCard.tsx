import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { type Project } from './projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const getStatusColor = (status: string) => {
    return status === 'Live' 
      ? 'from-green-400 to-emerald-500' 
      : 'from-yellow-400 to-orange-500';
  };

  const getHoverBorder = (status: string) => {
    return status === 'Live'
      ? 'hover:border-green-400/50'
      : 'hover:border-yellow-400/50';
  };

  return (
    <div
      className={`project-card backdrop-blur-lg bg-white/3 rounded-xl p-6 border border-white/10 shadow-lg hover:shadow-xl cursor-pointer group transition-all duration-300 ${getHoverBorder(project.status)}`}
      onClick={() => onOpenModal(project)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 
          className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {project.title}
        </h3>
        <span 
          className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(project.status)} text-white shadow-lg flex-shrink-0 ml-3`}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {project.status}
        </span>
      </div>
      
      {/* Tagline */}
      <p 
        className="text-gray-300 text-sm mb-6 leading-relaxed"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {project.tagline}
      </p>
      
      {/* View Details */}
      <div className="flex items-center text-blue-400 text-sm group-hover:text-blue-300 transition-colors">
        <span style={{ fontFamily: 'Inter, sans-serif' }}>View Details</span>
        <FaExternalLinkAlt className="ml-2 w-3 h-3" />
      </div>
    </div>
  );
};

export default ProjectCard