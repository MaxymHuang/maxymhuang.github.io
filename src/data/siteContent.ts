export const siteContent = {
  hero: {
    name: "MAXYM HUANG?",
    title: "Application Engineer",
    subtitle: "IoT & AI Developer",
    description: "Bridging hardware and software to build secure, scalable solutions that solve real-world problems.",
    ctas: [
      { 
        id: 'view-projects',
        label: "View Projects", 
        action: "scroll", 
        target: "projects", 
        primary: true,
        icon: "→"
      },
      { 
        id: 'download-resume',
        label: "Download Resume", 
        action: "download", 
        target: "/Resume.pdf", 
        primary: false,
        icon: "↓"
      }
    ]
  },
  
  about: {
    education: "B.S. Industrial Engineering, Purdue University",
    description: "I'm a Field Application Engineer passionate about bridging the gap between hardware and software. I focus on building secure, scalable, and efficient solutions that solve real-world problems.",
    skills: "Python, C/C++, SQL, Linux, Docker, Kubernetes, Data Analytics, Bilingual (EN/中文)",
    contactMessage: "Ready for new opportunities"
  },
  
  projects: [
    {
      id: 'esp32',
      title: 'ESP32 Projects',
      description: 'Collection of IoT projects using ESP32 microcontrollers, including home automation, sensor networks, and custom firmware development.',
      logo: '/esp32.svg',
      image: '/hardware.png', // Will be handled by ResponsiveImage component
      categories: ['iot', 'fullstack'],
      tags: ['ESP32', 'IoT', 'Hardware', 'C++', 'Arduino'],
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
      image: '/linux.svg', // SVG will load directly
      categories: ['infrastructure', 'fullstack'],
      tags: ['Proxmox', 'Docker', 'Kubernetes', 'Linux', 'DevOps'],
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
      description: 'A revolutionary file search system that uses AI and semantic understanding to help users find files using natural language queries, with built-in summarization and chat capabilities.',
      logo: '/filefinder.svg',
      image: null, // No image for this project
      categories: ['ai', 'fullstack'],
      tags: ['Python', 'AI/ML', 'RAG', 'FAISS', 'Flask', 'Docker'],
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
    },
    {
      id: 'opnsense-router',
      title: 'OPNSense Network Switch Implementation',
      description: 'Innovative home lab solution repurposing OPNSense router as a Layer 2 network switch by bridging multiple interfaces, providing cost-effective network expansion without additional hardware.',
      logo: '/linux.svg',
      image: null,
      categories: ['infrastructure', 'fullstack'],
      tags: ['OPNSense', 'Networking', 'Bridging', 'Home Lab', 'Layer 2', 'Network Switch'],
      links: [
        { label: 'Project Documentation', url: '/projects/router.md' },
        { label: 'Configuration Guide', url: '#' }
      ],
      details: {
        overview: 'A practical home lab networking solution that transforms OPNSense from a traditional router into a software-based Layer 2 switch by bridging multiple physical interfaces, enabling network expansion without purchasing additional switching hardware.',
        technologies: [
          'OPNSense Firewall/Router',
          'FreeBSD Network Stack',
          'Software Bridging',
          'Layer 2 Switching',
          'Interface Management',
          'Network Interface Cards (NICs)'
        ],
        features: [
          'Software-based Layer 2 bridging',
          'Multiple physical port aggregation',
          'Cost-effective network expansion',
          'Unified firewall and switching management',
          'Flexible interface assignment',
          'Hardware repurposing capabilities'
        ],
        challenges: [
          'Software bridging performance limitations',
          'CPU overhead for high-throughput scenarios',
          'Missing managed switch features (VLAN tagging, STP)',
          'Manual configuration complexity'
        ],
        solutions: [
          'Implemented bridge interface configuration',
          'Optimized for low-to-moderate traffic loads',
          'Balanced flexibility over peak performance',
          'Leveraged existing OPNSense infrastructure'
        ]
      }
    }
  ],
  
  social: [
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
  ],
  
  navigation: {
    sections: ['about', 'journey', 'projects', 'connect']
  },
  
  projectCategories: [
    { id: 'all', label: 'All Projects', count: 4 },
    { id: 'iot', label: 'IoT & Hardware', count: 1 },
    { id: 'ai', label: 'AI & ML', count: 1 },
    { id: 'infrastructure', label: 'Infrastructure', count: 2 },
    { id: 'fullstack', label: 'Full Stack', count: 3 }
  ]
}; 