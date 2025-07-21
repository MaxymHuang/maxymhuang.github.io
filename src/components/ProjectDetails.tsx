import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MarkdownRenderer from "./MarkdownRenderer";
import TableOfContents from "./TableOfContents";
import './ProjectDetails.css';

const MenuBar = () => (
  <nav style={{
    width: '100%',
    background: '#111',
    padding: '1.2rem 2rem',
    borderBottom: '1px solid #222',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100
  }}>
    <span style={{
      fontFamily: 'Metropolis, Arial, Helvetica, sans-serif',
      fontWeight: 900,
      color: '#39ff14',
      fontSize: '1.3rem',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      textShadow: '0 2px 8px #000a'
    }}>MAXYM HUANG</span>
    <div style={{ display: 'flex', gap: '2rem' }}>
      <a href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 400, fontFamily: 'Metropolis, Arial, Helvetica, sans-serif' }}>Home</a>
      <a href="/#projects" style={{ color: '#fff', textDecoration: 'none', fontWeight: 400, fontFamily: 'Metropolis, Arial, Helvetica, sans-serif' }}>Projects</a>
      <a href="/#connect" style={{ color: '#fff', textDecoration: 'none', fontWeight: 400, fontFamily: 'Metropolis, Arial, Helvetica, sans-serif' }}>Connect</a>
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
          color: '#39ff14'
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
        <div className="markdown-project-details markdown-content" style={{ fontFamily: "'Metropolis', Arial, Helvetica, sans-serif", color: 'inherit', background: 'none', boxShadow: 'none', borderRadius: 0, padding: '2rem', maxWidth: 900, margin: '2rem auto' }}>
          <MarkdownRenderer file={markdownFile} />
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'block',
              margin: '3rem auto 0',
              background: 'none',
              color: '#39ff14',
              border: '2px solid #39ff14',
              borderRadius: '8px',
              padding: '0.7em 2em',
              fontFamily: 'Metropolis, Arial, Helvetica, sans-serif',
              fontWeight: 700,
              fontSize: '1.1em',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: '0 2px 8px #000a'
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#39ff14';
              (e.currentTarget as HTMLButtonElement).style.color = '#111';
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'none';
              (e.currentTarget as HTMLButtonElement).style.color = '#39ff14';
            }}
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