import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ProjectDetails from './components/ProjectDetails';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'connect', label: 'Connect' },
];

const projects = [
  {
    id: 'esp32',
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

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function Home() {
  const navigate = useNavigate();

  return (
    <div className="portfolio-root">
      <nav className="navbar">
        <div className="logo-text">Maxym Huang</div>
        <div className="nav-links">
          {sections.map((section) => (
            <button
              key={section.id}
              className="nav-btn"
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>
      <main>
        <section id="about" className="section">
          <div className="section-content">
            <h2>About</h2>
            <div className="terminal-window">
              <div className="terminal-content">
                <div className="terminal-command">
                  <span className="terminal-prompt">$</span> whoami
                </div>
                <div className="whoami-section">
                  <div className="whoami-name">Maxym Huang</div>
                  <div className="whoami-title">Field Application Engineer @ Test Research, Inc.</div>
                  <div className="whoami-education">B.S. Industrial Engineering, Purdue University</div>
                  <ul className="whoami-description">
                    <li>Passionate about technology innovation and continuous learning.</li>
                    <li>My work involves both technical implementation and knowledge sharing, helping organizations adopt and optimize modern technology solutions.</li>
                    <li>I believe in creating robust, scalable, and secure systems that drive business value and technological advancement.</li>
                  </ul>
                </div>

                <div className="terminal-command">
                  <span className="terminal-prompt">$</span> cat skills.txt
                </div>
                <ul className="terminal-list">
                  <li>Programming Languages: Python, C, C++, SQL, Shell Script</li>
                  <li>Software Tools: Linux (Arch), vim, Docker, Kubernetes, Microsoft Excel, Jira, Confluence</li>
                  <li>Languages: Native fluency in English and Chinese</li>
                  <li>Certifications: Data Analytics Fundamentals (Google), Python (Codecademy), Scrum Processes, Lean Six Sigma</li>
                </ul>

                <div className="terminal-command">
                  <span className="terminal-prompt">$</span> cat linux_iot_journey.txt
                </div>
                <div className="terminal-output">
                  Started with Arch Linux, exploring system administration and customization.
                  Current projects include:
                </div>
                <ul className="terminal-list">
                  <li>Homelab: Proxmox + Docker containers</li>
                  <li>IoT: ESP32 microcontrollers for home automation</li>
                  <li>Cloud: Tailscale + NextCloud private infrastructure</li>
                  <li>DevOps: Automated deployment pipelines</li>
                  <li>Firmware: Custom solutions for environmental monitoring</li>
                </ul>

                <div className="terminal-command">
                  <span className="terminal-prompt">$</span> echo "Passionate about creating efficient, secure, and scalable solutions that bridge hardware and software."
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-content">
            <h2>Projects</h2>
            <div className="project-grid">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="project-card"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
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
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails projects={projects} />} />
      </Routes>
    </Router>
  );
}
