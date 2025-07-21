import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github.css";

export default function MarkdownRenderer({ file }) {
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${file}`);
        return res.text();
      })
      .then(setMarkdown)
      .catch(setError);
  }, [file]);

  if (error) return <div>Error loading markdown: {error.message}</div>;
  if (!markdown) return <div>Loading...</div>;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight, rehypeRaw]}
    >
      {markdown}
    </ReactMarkdown>
  );
} 