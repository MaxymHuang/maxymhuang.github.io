import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MarkdownRenderer from "./MarkdownRenderer";
import TableOfContents from "./TableOfContents";
import './ProjectDetails.css';

const MenuBar = () => (
  <nav className="project-menu-bar">
    <span className="project-menu-brand">MAXYM HUANG</span>
    <div className="project-menu-nav">
      <a href="/" className="project-menu-link">Home</a>
      <a href="/#projects" className="project-menu-link">Case Studies</a>
      <a href="/#connect" className="project-menu-link">Connect</a>
    </div>
  </nav>
);

const ProjectDetails: React.FC<{ projects: any[] }> = ({ projects }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Assume markdown file is always /projects/{id}.md
  const markdownFile = `/projects/${project?.id}.md`;

  // Fetch markdown content for TOC
  useEffect(() => {
    if (!project) return;

    fetch(markdownFile)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${markdownFile}`);
        return res.text();
      })
      .then((content) => {
        setMarkdownContent(content);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching markdown:', error);
        setIsLoading(false);
      });
  }, [project, markdownFile]);

  if (!project) {
    return <div>Project not found</div>;
  }

  if (isLoading) {
    return (
      <>
        <MenuBar />
        <div className="project-loading">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <MenuBar />
      <div className="project-details-layout">
        <div className="markdown-project-details markdown-content">
          <MarkdownRenderer file={markdownFile} />
          <button
            className="back-to-home-button"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
        {markdownContent && <TableOfContents markdownContent={markdownContent} />}
      </div>
    </>
  );
};

export default ProjectDetails; 