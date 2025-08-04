import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MarkdownRenderer from "./MarkdownRenderer";
import TableOfContents from "./TableOfContents";
import './ProjectDetails.css';

const MenuBar = () => (
  <nav style={{
    background: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '1.5rem 3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  }}>
    <span style={{
      fontFamily: 'Metropolis, Arial, Helvetica, sans-serif',
      fontWeight: 700,
      color: '#ffffff',
      fontSize: '1.2rem',
      letterSpacing: '0.05em',
      textTransform: 'uppercase'
    }}>MAXYM HUANG</span>
    <div style={{ display: 'flex', gap: '2.5rem' }}>
      <a href="/" style={{ 
        color: '#fff', 
        textDecoration: 'none', 
        fontWeight: 400, 
        fontFamily: 'Metropolis, Arial, Helvetica, sans-serif',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        transition: 'opacity 0.3s ease'
      }}>Home</a>
      <a href="/#projects" style={{ 
        color: '#fff', 
        textDecoration: 'none', 
        fontWeight: 400, 
        fontFamily: 'Metropolis, Arial, Helvetica, sans-serif',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        transition: 'opacity 0.3s ease'
      }}>Case Studies</a>
      <a href="/#connect" style={{ 
        color: '#fff', 
        textDecoration: 'none', 
        fontWeight: 400, 
        fontFamily: 'Metropolis, Arial, Helvetica, sans-serif',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        transition: 'opacity 0.3s ease'
      }}>Connect</a>
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
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '50vh',
          fontFamily: 'Metropolis, Arial, Helvetica, sans-serif',
          color: '#ffffff'
        }}>
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