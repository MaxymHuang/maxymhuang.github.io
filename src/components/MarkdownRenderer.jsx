import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github-dark.css";

// Function to preprocess markdown and preserve additional line spacing
function preserveLineSpacing(markdownText) {
  // First, normalize line endings to \n
  let processedText = markdownText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');

  // Split by lines to process line by line
  const lines = processedText.split('\n');
  const processedLines = [];
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    
    // Check if we're in a code block
    if (line.trim().startsWith('```')) {
      // Add code block lines without processing
      processedLines.push(line);
      i++;
      // Continue until we find the closing ```
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        processedLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) {
        processedLines.push(lines[i]); // Add closing ```
        i++;
      }
    }
    // Check if line contains table syntax (pipe characters)
    else if (line.includes('|')) {
      // Don't process table lines
      processedLines.push(line);
      i++;
    }
    // Regular text line - check for line break processing
    else {
      processedLines.push(line);
      i++;
    }
  }
  
  // Join lines back and apply spacing transformations
  const result = processedLines.join('\n')
    // Replace 3+ consecutive newlines with paragraph breaks + extra spacing
    .replace(/\n{3,}/g, '\n\n<div style="margin-bottom: 1.5em;"></div>\n\n')
    // Replace single newlines within paragraphs with line breaks
    // But be very careful to avoid markdown syntax
    .replace(/([^\n|#*`-])\n([^\n|#*`-])/g, '$1<br/>\n$2');
  
  return result;
}

export default function MarkdownRenderer({ file }) {
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(file)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            // File doesn't exist, show "coming soon"
            setMarkdown('# Coming Soon\n\nThis case study is currently in progress. A detailed write-up will be available soon.');
            return;
          }
          throw new Error(`Failed to fetch ${file}`);
        }
        return res.text();
      })
      .then((text) => {
        if (text) {
          const processedMarkdown = preserveLineSpacing(text);
          setMarkdown(processedMarkdown);
        }
      })
      .catch((error) => {
        // If it's a 404, we already handled it above
        if (error.message && (error.message.includes('404') || error.message.includes('Failed to fetch'))) {
          setMarkdown('# Coming Soon\n\nThis case study is currently in progress. A detailed write-up will be available soon.');
        } else {
          setError(error);
        }
      });
  }, [file]);

  if (error && !markdown) return <div>Error loading markdown: {error.message}</div>;
  if (!markdown) return <div>Loading...</div>;

  return (
    <div className="markdown-renderer">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          [rehypeHighlight, { 
            ignoreMissing: true,
            plainText: ['txt', 'text'] 
          }], 
          rehypeRaw
        ]}
        components={{
          // Custom components for better spacing control
          p: ({ children, ...props }) => (
            <p style={{ marginBottom: '1.2em', lineHeight: '1.6' }} {...props}>
              {children}
            </p>
          ),
          // Preserve line breaks within paragraphs
          br: () => <br style={{ marginBottom: '0.5em' }} />,
          // Generate proper IDs for headings to match TOC
          h1: ({ children, ...props }) => {
            const text = children.toString();
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .trim();
            return <h1 id={id} {...props}>{children}</h1>;
          },
          h2: ({ children, ...props }) => {
            const text = children.toString();
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .trim();
            return <h2 id={id} {...props}>{children}</h2>;
          },
          h3: ({ children, ...props }) => {
            const text = children.toString();
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .trim();
            return <h3 id={id} {...props}>{children}</h3>;
          },
          h4: ({ children, ...props }) => {
            const text = children.toString();
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .trim();
            return <h4 id={id} {...props}>{children}</h4>;
          },
          h5: ({ children, ...props }) => {
            const text = children.toString();
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .trim();
            return <h5 id={id} {...props}>{children}</h5>;
          },
          h6: ({ children, ...props }) => {
            const text = children.toString();
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .trim();
            return <h6 id={id} {...props}>{children}</h6>;
          },
          // Ensure code blocks get proper class names
          pre: ({ children, ...props }) => (
            <pre {...props}>
              {children}
            </pre>
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
} 