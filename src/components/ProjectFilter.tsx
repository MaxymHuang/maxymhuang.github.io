import React from 'react';
import type { ProjectFilterProps } from '../types';
import './ProjectFilter.css';

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <div className="project-filter" role="tablist" aria-label="Project categories">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
          role="tab"
          aria-selected={activeCategory === category.id ? 'true' : 'false'}
          aria-controls="projects-grid"
          aria-label={`Filter projects by ${category.label} (${category.count} projects)`}
        >
          <span className="filter-label">{category.label}</span>
          <span className="filter-count">({category.count})</span>
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter;