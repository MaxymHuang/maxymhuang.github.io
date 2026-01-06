import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MarkdownRenderer from "./MarkdownRenderer";
import TableOfContents from "./TableOfContents";
import './ProjectDetails.css';
const MinimalNavBar = lazy(() => import('./MinimalNavBar'));

const ProjectDetails: React.FC<{ projects: any[] }> = ({ projects }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Map project ids to markdown slugs if needed
  const getMarkdownSlug = (pid?: string) => {
    if (!pid) return '';
    if (pid === 'opnsense-router') return 'router';
    return pid;
  };
  const markdownFile = `/projects/${getMarkdownSlug(project?.id)}.md`;

  // Fetch markdown content for TOC
  useEffect(() => {
    if (!project) return;

    fetch(markdownFile)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            // File doesn't exist, set empty content (TOC won't show)
            setMarkdownContent('');
            setIsLoading(false);
            return;
          }
          throw new Error(`Failed to fetch ${markdownFile}`);
        }
        return res.text();
      })
      .then((content) => {
        if (content) {
          setMarkdownContent(content);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching markdown:', error);
        setMarkdownContent('');
        setIsLoading(false);
      });
  }, [project, markdownFile]);

  if (!project) {
    return <div>Project not found</div>;
  }

  if (isLoading) {
    return (
      <>
        <Suspense fallback={<div />}> 
          <MinimalNavBar onNavigate={(sectionId: string) => {
            if (sectionId.startsWith('#')) {
              window.location.href = `/${sectionId}`;
            } else {
              window.location.href = `/#${sectionId}`;
            }
          }} />
        </Suspense>
        <div className="project-loading">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Suspense fallback={<div />}> 
        <MinimalNavBar onNavigate={(sectionId: string) => {
          if (sectionId.startsWith('#')) {
            window.location.href = `/${sectionId}`;
          } else {
            window.location.href = `/#${sectionId}`;
          }
        }} />
      </Suspense>
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