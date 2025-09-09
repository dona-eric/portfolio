import React from "react";

function ProjectCard({ project }) {
  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
          {project.title}
        </h3>
        {project.category && (
          <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
            {project.category}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4">{project.description}</p>

      {/* Link */}
      <a 
        href={project.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block mt-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
      >
        Voir le projet
      </a>
    </div>
  );
}

export default ProjectCard;
