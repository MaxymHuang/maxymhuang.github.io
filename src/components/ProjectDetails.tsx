import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

  return (
    <div className="project-details">
      <div className="terminal-window">
        <div className="terminal-content">
          <div className="terminal-command">
            <span className="terminal-prompt">$</span> cd {project.id}
          </div>
          
          <div className="project-header">
            <img src={project.logo} alt={`${project.title} logo`} className="project-logo-large" />
            <h2>{project.title}</h2>
          </div>

          <div className="project-section">
            <h3>Overview</h3>
            <p>{project.details.overview}</p>
          </div>

          <div className="project-section">
            <h3>Technologies</h3>
            <ul className="terminal-list">
              {project.details.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>

          <div className="project-section">
            <h3>Key Features</h3>
            <ul className="terminal-list">
              {project.details.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="project-section">
            <h3>Challenges & Solutions</h3>
            <div className="challenges-section">
              <h4>Challenges</h4>
              <ul className="terminal-list">
                {project.details.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
            <div className="solutions-section">
              <h4>Solutions</h4>
              <ul className="terminal-list">
                {project.details.solutions.map((solution, index) => (
                  <li key={index}>{solution}</li>
                ))}
              </ul>
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

          <div className="terminal-command">
            <span className="terminal-prompt">$</span> cd ..
          </div>
          <button className="back-button" onClick={() => navigate('/')}>
            Back to Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails; 