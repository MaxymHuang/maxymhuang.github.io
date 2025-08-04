import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, lazy, Suspense } from 'react';

// Lazy load components to reduce initial bundle size
const ProjectDetails = lazy(() => import('./components/ProjectDetails'));
const Timeline = lazy(() => import('./components/Timeline'));
const PDFViewer = lazy(() => import('./components/PDFViewer'));
// @ts-expect-error: No type declaration for ScrollVelocity
const ScrollVelocity = lazy(() => import('./blocks/TextAnimations/ScrollVelocity/ScrollVelocity'));
// @ts-expect-error: No type declaration for BlurText
const BlurText = lazy(() => import('./blocks/TextAnimations/BlurText/BlurText'));
// @ts-expect-error: No type declaration for SpotlightCard
const SpotlightCard = lazy(() => import('./blocks/Components/SpotlightCard/SpotlightCard'));
// @ts-expect-error: No type declaration for FlowingMenu
const FlowingMenu = lazy(() => import('./blocks/Components/FlowingMenu/FlowingMenu'));
// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '2rem',
    color: 'var(--text-light)' 
  }}>
    Loading...
  </div>
);

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
    title: 'File Finder',
    description: 'A project for finding files efficiently.',
    logo: '/filefinder.svg',
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
  { link: '#projects', text: 'Case Studies', image: '/filefinder.svg' },
  { link: '#timeline', text: 'Experience', image: '/linux.svg' },
  { link: '#connect', text: 'Connect', image: '/profilepic.JPG' }
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
        <Suspense fallback={<LoadingSpinner />}>
          <FlowingMenu
            items={flowingMenuItems.map(item => ({
              ...item,
              link: item.link,
              // Override onClick for smooth scroll
              onClick: (e: any) => handleMenuClick(e, item.link)
            }))}
          />
        </Suspense>
      </div>
      <main style={{ paddingTop: 0 }}>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <Suspense fallback={<LoadingSpinner />}>
                <BlurText 
                  text="MAXYM HUANG?" 
                  className="about-blur-heading"
                  delay={100}
                  animateBy="words"
                />
              </Suspense>
              <div className="hero-profile-section">
                <div className="hero-divider"></div>
                <div className="hero-profile-content">
                  <img 
                    src="/profilepic.JPG" 
                    alt="Maxym Huang" 
                    className="hero-profile-pic"
                  />
                  <div className="hero-profile-text">
                    <div className="location-text">
                      <h2 className="location-heading">Vancouver, Canada</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-content">
            {/* About sections - redesigned to match Dan's case study layout */}
            <div className="content-sections">
              <div className="content-section-item">
                <h3 className="section-number">● About</h3>
                <div className="section-text">
                  <p className="about-education">B.S. Industrial Engineering, Purdue University</p>
                  <p className="about-description">
                    I'm a Field Application Engineer passionate about bridging the gap between hardware and software. 
                    I focus on building secure, scalable, and efficient solutions that solve real-world problems.
                  </p>
                </div>
              </div>

              <div className="content-section-item">
                <h3 className="section-number">● Technical Skills</h3>
                <div className="skills-list-text">
                  <p>Python, C/C++, SQL, Linux, Docker, Kubernetes, Data Analytics, Bilingual (EN/中文)</p>
                </div>
              </div>

              <div className="content-section-item">
                <h3 className="section-number">● Contact</h3>
                <div className="section-text">
                  <p>Ready for new opportunities</p>
                  <button 
                    className="contact-button-clean"
                    onClick={handleContactClick}
                  >
                    Get In Touch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="section">
          <div className="section-content">
            <h2>My Journey</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <Timeline />
            </Suspense>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="section-content">
            {/* Section header like Dan's design */}
            <div className="section-header">
              <h2 className="section-title">Case Studies:</h2>
            </div>
            
            {/* Projects as case studies - redesigned to match Dan's layout */}
            <div className="case-studies">
              {projects.map((project, index) => (
                <div key={project.id} className="case-study-item">
                  <div className="case-study-number">
                    <div className="case-study-icon">
                      <img 
                        src={project.id === 'esp32' ? '/esp32.svg' : 
                             project.id === 'filefinder' ? '/filefinder.svg' : 
                             project.id === 'homelab' ? '/linux.svg' : '/esp32.svg'} 
                        alt={`${project.title} icon`}
                        className="project-icon"
                      />
                    </div>
                    <h3>● Case Study {String(index + 1).padStart(2, '0')}</h3>
                  </div>
                  
                  <div className="case-study-content">
                    <h2 className="case-study-title">{project.title}</h2>
                    <p className="case-study-description">{project.description}</p>
                    <button 
                      className="case-study-link"
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      View Case Study
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" className="section connect-section">
          <div className="section-content">
            {/* Contact section like Dan's design */}
            <div className="contact-section">
              <div className="contact-header">
                <h3 className="section-number">● Contact me</h3>
                <p className="contact-subtitle">Get in touch</p>
              </div>
              
              <div className="contact-links">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    className="clean-contact-link"
                    target={link.id === 'resume' ? undefined : "_blank"}
                    rel={link.id === 'resume' ? undefined : "noopener noreferrer"}
                    onClick={link.id === 'resume' ? handleResumeClick : undefined}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Suspense fallback={<LoadingSpinner />}>
        <PDFViewer
          isOpen={isPDFViewerOpen}
          onClose={() => setIsPDFViewerOpen(false)}
          pdfUrl="/Resume.pdf"
          title="Maxym Huang - Resume"
        />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProjectDetails projects={projects} />
            </Suspense>
          } />
        </Routes>
      </Router>
    </>
  );
}

