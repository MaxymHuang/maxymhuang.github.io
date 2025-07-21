import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProjectDetails from './components/ProjectDetails';
import Timeline from './components/Timeline';
import PDFViewer from './components/PDFViewer';
// @ts-expect-error: No type declaration for ScrollVelocity
import ScrollVelocity from './blocks/TextAnimations/ScrollVelocity/ScrollVelocity';
// @ts-expect-error: No type declaration for BlurText
import BlurText from './blocks/TextAnimations/BlurText/BlurText';
// @ts-expect-error: No type declaration for SpotlightCard
import SpotlightCard from './blocks/Components/SpotlightCard/SpotlightCard';
// @ts-expect-error: No type declaration for FlowingMenu
import FlowingMenu from './blocks/Components/FlowingMenu/FlowingMenu';
// @ts-expect-error: No type declaration for DecryptedText
import DecryptedText from './blocks/TextAnimations/DecryptedText/DecryptedText';
// @ts-expect-error: No type declaration for ProfileCard
import ProfileCard from './blocks/Components/ProfileCard/ProfileCard';
import MarkdownRenderer from "./components/MarkdownRenderer";

const sections = [
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'connect', label: 'Connect' },
];

const projects = [
  {
    id: 'esp32', // This will load public/projects/esp32.md as the markdown content
    title: 'ESP32 Projects',
    description: 'Collection of IoT projects using ESP32 microcontrollers, including home automation, sensor networks, and custom firmware development.',
    logo: '/esp32.svg',
    links: [
      { label: 'GitHub', url: 'https://github.com/MaxymHuang/v2t' },
      { label: 'Documentation', url: '#' }
    ],
    details: {
      overview: 'A comprehensive collection of IoT projects leveraging ESP32 microcontrollers for various applications, from home automation to environmental monitoring.',
      technologies: [
        'ESP32 Microcontrollers',
        'Arduino Framework',
        'MQTT Protocol',
        'Home Assistant Integration',
        'Custom PCB Design'
      ],
      features: [
        'Real-time sensor data collection',
        'Automated home control systems',
        'Energy monitoring solutions',
        'Custom firmware development',
        'Integration with existing smart home platforms'
      ],
      challenges: [
        'Power consumption optimization',
        'Reliable wireless communication',
        'Secure data transmission',
        'Hardware constraints management'
      ],
      solutions: [
        'Implemented deep sleep modes',
        'Developed robust error handling',
        'Utilized encryption for data security',
        'Optimized code for limited resources'
      ]
    }
  },
  {
    id: 'homelab',
    title: 'Homelab Setup',
    description: 'Personal homelab infrastructure with Proxmox, Docker containers, and automated deployment pipelines. Includes monitoring, backup solutions, and network configuration.',
    logo: '/linux.svg',
    links: [
      { label: 'Setup Guide', url: '#' },
      { label: 'Hardware Specs', url: '#' }
    ],
    details: {
      overview: 'A robust homelab environment built for learning, development, and personal use, featuring virtualization, containerization, and automated workflows.',
      technologies: [
        'Proxmox VE',
        'Docker & Docker Compose',
        'Kubernetes',
        'Traefik Reverse Proxy',
        'Prometheus & Grafana'
      ],
      features: [
        'Virtual machine management',
        'Container orchestration',
        'Automated backups',
        'Network monitoring',
        'Resource optimization'
      ],
      challenges: [
        'Resource allocation',
        'Network security',
        'Backup reliability',
        'Service availability'
      ],
      solutions: [
        'Implemented resource quotas',
        'Set up VLANs and firewalls',
        'Developed automated backup scripts',
        'Configured high availability'
      ]
    }
  },
  {
    id: 'filefinder',
    title: 'File Finder Pro RAG System',
    description: 'AI-powered file search and summarization system using RAG (Retrieval-Augmented Generation) with semantic search, natural language queries, and modern web interface.',
    logo: '/ncloud.svg',
    links: [
      { label: 'GitHub', url: 'https://github.com/MaxymHuang/file_finder_pro_maaaax' },
      { label: 'Live Demo', url: '#' }
    ],
    details: {
      overview: 'A revolutionary file search system that uses AI and semantic understanding to help users find files using natural language queries, with built-in summarization and chat capabilities.',
      technologies: [
        'Python & Flask',
        'Ollama LLM Models', 
        'FAISS Vector Search',
        'Sentence Transformers',
        'Docker & Docker Compose',
        'Semantic Embeddings'
      ],
      features: [
        'Semantic file search with natural language',
        'AI-powered file summarization',
        'Interactive chat interface',
        'Multi-format support (PDF, Word, PowerPoint)',
        'Real-time search results',
        'Modern responsive UI'
      ],
      challenges: [
        'Semantic understanding vs exact matching',
        'Large-scale vector indexing performance',
        'Local LLM model optimization',
        'Multi-user thread safety'
      ],
      solutions: [
        'Implemented FAISS for efficient similarity search',
        'Used Ollama for local AI model deployment',
        'Built RAG pipeline for context-aware responses',
        'Optimized embedding generation and caching'
      ]
    }
  }
];

const socialLinks = [
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    url: 'https://www.linkedin.com/in/maxymhuang/',
    icon: '→'
  },
  {
    id: 'github',
    label: 'GITHUB',
    url: 'https://github.com/MaxymHuang',
    icon: '→'
  },
  {
    id: 'resume',
    label: 'RESUME',
    url: '/Resume.pdf',
    icon: '→'
  }
];

const flowingMenuItems = [
  { link: '#about', text: 'About', image: '/esp32.svg' },
  { link: '#journey', text: 'Journey', image: '/linux.svg' },
  { link: '#projects', text: 'Projects', image: '/ncloud.svg' },
  { link: '#connect', text: 'Connect' },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function Home() {
  const navigate = useNavigate();
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);

  // Handler for FlowingMenu navigation
  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link.startsWith('#')) {
      e.preventDefault();
      scrollToSection(link.substring(1));
    }
  };

  // Handler for resume link click
  const handleResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsPDFViewerOpen(true);
  };

  // Handler for ProfileCard contact click
  const handleContactClick = () => {
    scrollToSection('connect');
  };

  return (
    <div className="portfolio-root">
      <div style={{ width: '100vw', maxWidth: '100vw', position: 'relative', zIndex: 10 }}>
        <FlowingMenu
          items={flowingMenuItems.map(item => ({
            ...item,
            link: item.link,
            // Override onClick for smooth scroll
            onClick: (e: any) => handleMenuClick(e, item.link)
          }))}
        />
      </div>
      <main style={{ paddingTop: 0 }}>
                <section id="about" className="section" style={{ padding: '1rem 2rem 0', justifyContent: 'flex-start' }}>
          <div className="section-content">
            <BlurText text="MAXYM HUANG?" className="about-blur-heading" animateBy="words" direction="top" />
            <div className="about-container" style={{ marginTop: '1.5em', display: 'flex', gap: '3rem', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div className="about-text-content" style={{ flex: '1', maxWidth: '600px' }}>
                <p style={{ 
                  fontFamily: 'Metropolis, Arial, Helvetica, sans-serif', 
                  fontWeight: 400,
                  fontSize: '1.2rem',
                  lineHeight: '1.7',
                  color: '#f8f8f2',
                  marginBottom: '1.5rem',
                  textAlign: 'left'
                }}>
                  Field Application Engineer. Tech explorer. Problem solver.
                </p>
                <p style={{ 
                  fontFamily: 'Metropolis, Arial, Helvetica, sans-serif', 
                  fontWeight: 400,
                  fontSize: '1.1rem',
                  lineHeight: '1.6',
                  color: '#c0c0c0',
                  marginBottom: '1.5rem',
                  textAlign: 'left'
                }}>
                  B.S. Industrial Engineering, Purdue University.
                </p>
                <p style={{ 
                  fontFamily: 'Metropolis, Arial, Helvetica, sans-serif', 
                  fontWeight: 400,
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#a0a0a0',
                  marginBottom: '1.5rem',
                  textAlign: 'left'
                }}>
                  Skills: Python, C/C++, SQL, Linux, Docker, Kubernetes, Data Analytics, Bilingual (EN/中文).
                </p>
                <p style={{ 
                  fontFamily: 'Metropolis, Arial, Helvetica, sans-serif', 
                  fontWeight: 400,
                  fontSize: '1.1rem',
                  lineHeight: '1.6',
                  color: '#39ff14',
                  marginBottom: '0',
                  textAlign: 'left'
                }}>
                  Mission: Build secure, scalable, and efficient solutions that bridge hardware and software.
                </p>
              </div>
              <div className="profile-card-container" style={{ flexShrink: 0 }}>
                <ProfileCard
                  name="Maxym Huang"
                  title="Field Application Engineer"
                  handle="maxymhuang"
                  status="Available for Opportunities"
                  contactText="Get In Touch"
                  avatarUrl="/profilepic.JPG"
                  miniAvatarUrl="/profilepic.JPG"
                  showUserInfo={true}
                  enableTilt={true}
                  onContactClick={handleContactClick}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="section">
          <div className="section-content">
            <h2>My Journey</h2>
            <Timeline />
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-content" style={{ padding: 0 }}>
            {/* Three rows of ScrollVelocity with increased velocity, spanning full width */}
            <div style={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', gap: '0.2em', marginBottom: '1em' }}>
              <ScrollVelocity
                texts={["cool projects"]}
                velocity={200}
                className="scroller"
                numCopies={8}
                parallaxStyle={{ width: '100vw', overflow: 'hidden' }}
                scrollerStyle={{ fontSize: 'clamp(3rem, 14vw, 6rem)', color: '#39ff14', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, filter: 'drop-shadow(0 2px 8px #000a)' }}
              />
              <ScrollVelocity
                texts={["cool projects"]}
                velocity={-200}
                className="scroller"
                numCopies={8}
                parallaxStyle={{ width: '100vw', overflow: 'hidden' }}
                scrollerStyle={{ fontSize: 'clamp(3rem, 14vw, 6rem)', color: '#39ff14', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, filter: 'drop-shadow(0 2px 8px #000a)' }}
              />
              <ScrollVelocity
                texts={["cool projects"]}
                velocity={200}
                className="scroller"
                numCopies={8}
                parallaxStyle={{ width: '100vw', overflow: 'hidden' }}
                scrollerStyle={{ fontSize: 'clamp(3rem, 14vw, 6rem)', color: '#39ff14', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, filter: 'drop-shadow(0 2px 8px #000a)' }}
              />
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <SpotlightCard
                  key={project.id}
                  className="project-card"
                >
                  <div onClick={() => navigate(`/project/${project.id}`)}>
                    <img src={project.logo} alt={`${project.title} logo`} className="project-logo" />
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" className="section">
          <div className="section-content">
            <h2>Connect</h2>
            <div className="connect-grid">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="connect-link"
                  target={link.id === 'resume' ? undefined : "_blank"}
                  rel={link.id === 'resume' ? undefined : "noopener noreferrer"}
                  onClick={link.id === 'resume' ? handleResumeClick : undefined}
                >
                  <span className="connect-icon">{link.icon}</span>
                  <span className="connect-label">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <PDFViewer
        isOpen={isPDFViewerOpen}
        onClose={() => setIsPDFViewerOpen(false)}
        pdfUrl="/Resume.pdf"
        title="Maxym Huang - Resume"
      />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails projects={projects} />} />
        </Routes>
      </Router>
    </>
  );
}

