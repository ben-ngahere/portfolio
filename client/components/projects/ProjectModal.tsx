import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { type Project } from './projects';
import ImageGallery from './ImageGallery';
import TechStack from './TechStack';
import ProjectLinks from './ProjectLinks';

interface ProjectModalProps {
  project: Project;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  currentImageIndex,
  setCurrentImageIndex,
  onClose
}) => {
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Live' 
      ? 'from-green-400 to-emerald-500' 
      : 'from-yellow-400 to-orange-500';
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleModalClick}
    >
      <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl border border-white/10 max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="bg-gray-900/95 backdrop-blur-md border-b border-white/10 p-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-4">
            <h3 
              className="text-2xl font-bold text-white"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {project.title}
            </h3>
            <span 
              className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getStatusColor(project.status)} text-white`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {project.status}
            </span>
            {project.role && (
              <span 
                className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded border border-blue-500/30"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {project.role}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Image Gallery */}
          <ImageGallery
            images={project.images}
            projectTitle={project.title}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
          
          {/* Description */}
          <div>
            <h4 
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              About This Project
            </h4>
            <p 
              className="text-gray-300 leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {project.description}
            </p>
          </div>
          
          {/* Features */}
          <div>
            <h4 
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Key Features
            </h4>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-center text-gray-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Tech Stack */}
          <TechStack techStack={project.techStack} />
          
          {/* Links */}
          <ProjectLinks project={project} />
        </div>
      </div>
    </div>
  );
};

export default ProjectModal