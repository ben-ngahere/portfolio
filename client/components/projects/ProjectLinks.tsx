import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { type Project } from './projects';

interface ProjectLinksProps {
  project: Project;
}

const ProjectLinks: React.FC<ProjectLinksProps> = ({ project }) => {
  return (
    <div className="flex flex-wrap gap-4 pt-4">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 backdrop-blur-lg bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-lg transition-colors border border-gray-600/50 hover:border-gray-500/50"
        >
          <FaGithub className="w-4 h-4" />
          <span style={{ fontFamily: 'Inter, sans-serif' }}>View Code</span>
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600/80 hover:bg-blue-700/80 text-white rounded-lg transition-colors backdrop-blur-lg"
        >
          <FaExternalLinkAlt className="w-4 h-4" />
          <span style={{ fontFamily: 'Inter, sans-serif' }}>Live Demo</span>
        </a>
      )}
    </div>
  );
};

export default ProjectLinks;