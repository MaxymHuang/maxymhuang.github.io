import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ProjectDetails from './components/ProjectDetails';
import Timeline from './components/Timeline';
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
    id: 'tailscale',
    title: 'Nextcloud with Tailscale',
    description: 'Secure private cloud setup using Tailscale for remote access, with encrypted tunnels and zero-trust networking principles.',
    logo: '/ncloud.svg',
    links: [
      { label: 'Configuration', url: '#' },
      { label: 'Security Notes', url: '#' }
    ],
    details: {
      overview: 'A secure private cloud solution combining NextCloud for file storage and Tailscale for secure remote access, implementing zero-trust networking principles.',
      technologies: [
        'NextCloud',
        'Tailscale',
        'Docker',
        'Nginx',
        'Let\'s Encrypt'
      ],
      features: [
        'Secure file sharing',
        'Remote access',
        'End-to-end encryption',
        'Cross-platform sync',
        'Automated backups'
      ],
      challenges: [
        'Security configuration',
        'Performance optimization',
        'Backup management',
        'Access control'
      ],
      solutions: [
        'Implemented zero-trust networking',
        'Optimized caching and compression',
        'Set up automated backup systems',
        'Configured granular access controls'
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
    url: '/resume.pdf',
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

  // Handler for FlowingMenu navigation
  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link.startsWith('#')) {
      e.preventDefault();
      scrollToSection(link.substring(1));
    }
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
            <div className="about-content" style={{ marginTop: '1.5em', display: 'flex', flexDirection: 'column', gap: '1.2em' }}>
              <DecryptedText
                text="Field Application Engineer. Tech explorer. Problem solver."
                speed={40}
                maxIterations={18}
                className="about-decrypt"
                animateOn="view"
                revealDirection="center"
              />
              <DecryptedText
                text="B.S. Industrial Engineering, Purdue University."
                speed={50}
                maxIterations={15}
                className="about-decrypt"
                animateOn="view"
                revealDirection="center"
              />
              <DecryptedText
                text="Skills: Python, C/C++, SQL, Linux, Docker, Kubernetes, Data Analytics, Bilingual (EN/中文)."
                speed={30}
                maxIterations={20}
                className="about-decrypt"
                animateOn="view"
                revealDirection="center"
              />
              <DecryptedText
                text="Mission: Build secure, scalable, and efficient solutions that bridge hardware and software."
                speed={40}
                maxIterations={18}
                className="about-decrypt"
                animateOn="view"
                revealDirection="center"
              />
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
                    <div className="project-links">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          className="project-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
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
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="connect-icon">{link.icon}</span>
                  <span className="connect-label">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
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

