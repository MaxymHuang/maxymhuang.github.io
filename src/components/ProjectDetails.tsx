import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectDetails.css';

interface ProjectDetailsProps {
  projects: Array<{
    id: string;
    title: string;
    description: string;
    links: Array<{ label: string; url: string }>;
    logo: string;
    details: {
      overview: string;
      technologies: string[];
      features: string[];
      challenges: string[];
      solutions: string[];
    };
  }>;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projects }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  const handleBackClick = () => {
    navigate('/');
    // Use setTimeout to ensure the navigation completes before scrolling
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="project-details">
      <div className="project-header">
        <img src={project.logo} alt={`${project.title} logo`} className="project-logo-large" />
        <h2>{project.title}</h2>
        <div className="project-meta">
          <span>Last Updated: {new Date().toLocaleDateString()}</span>
          <span>Category: {project.id.toUpperCase()}</span>
        </div>
      </div>

      <div className="project-section">
        <h3>Overview</h3>
        <p>{project.details.overview}</p>
      </div>

      <div className="project-section">
        <h3>Technologies</h3>
        <div className="tech-grid">
          {project.details.technologies.map((tech, index) => (
            <div key={index} className="tech-item">
              {tech}
            </div>
          ))}
        </div>
      </div>

      <div className="project-section">
        <h3>Key Features</h3>
        <ul className="feature-list">
          {project.details.features.map((feature, index) => (
            <li key={index} className="feature-item">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="project-section">
        <h3>Development Journey</h3>
        <div className="challenges-section">
          <h4>Challenges</h4>
          {project.details.challenges.map((challenge, index) => (
            <div key={index} className="challenge-item">
              {challenge}
            </div>
          ))}
        </div>
        <div className="solutions-section">
          <h4>Solutions</h4>
          {project.details.solutions.map((solution, index) => (
            <div key={index} className="solution-item">
              {solution}
            </div>
          ))}
        </div>
      </div>

      <div className="project-links">
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            className="project-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>

      <button className="back-button" onClick={handleBackClick}>
        Back to Projects
      </button>
    </div>
  );
};

export default ProjectDetails; 