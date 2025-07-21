import React, { useEffect, useState } from 'react';
import './TableOfContents.css';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  markdownContent: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ markdownContent }) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');

  // Extract headings from markdown content
  useEffect(() => {
    const headingRegex = /^#{1,6}\s+(.+)$/gm;
    const matches: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(markdownContent)) !== null) {
      const level = match[0].match(/^#+/)?.[0].length || 1;
      const text = match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .trim();

      matches.push({
        id,
        text,
        level
      });
    }

    setTocItems(matches);
  }, [markdownContent]);

  // Handle intersection observer for active section highlighting
  useEffect(() => {
    const headingElements = tocItems.map(item => 
      document.getElementById(item.id)
    ).filter(Boolean);

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, current) => 
            prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current
          );
          setActiveSection(topEntry.target.id);
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      }
    );

    headingElements.forEach(element => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest' 
      });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <div className="toc-container">
      <div className="toc-header">
        <h3>Contents</h3>
      </div>
      <nav className="toc-nav">
        <ul className="toc-list">
          {tocItems.map((item, index) => (
            <li 
              key={index} 
              className={`toc-item toc-level-${item.level} ${
                activeSection === item.id ? 'active' : ''
              }`}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className="toc-link"
                title={item.text}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents; 