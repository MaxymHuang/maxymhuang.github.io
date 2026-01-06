export const siteContent = {
  hero: {
    name: "MAXYM HUANG",
    title: "Application Engineer",
    subtitle: "Software & Hardware Developer",
    description: "Bridging hardware and software to solve real-world problems.",
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
        id: 'download-cv',
        label: "Download CV", 
        action: "download", 
        target: "/CV_Yu-Chia_Huang.pdf", 
        primary: false,
        icon: "↓"
      }
    ]
  },
  
  about: {
    education: "B.S. Industrial Engineering, Purdue University (2019 — 2023)",
    description: "I'm an Application Engineer passionate about bridging the gap between hardware and software. I focus on building efficient solutions that solve real-world problems.",
    skills: "C/C++, Python, Shell Scripts, Docker, SQL, Linux, Kubernetes, RTOS",
    contactMessage: "Ready for new opportunities! Connect with me on LinkedIn or send me an email!"
  },
  
  projects: [
    {
      id: 'esp32',
      title: 'v2t (voice to text) IoT Project',
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
      id: 'version-control',
      title: 'Git Version Control GUI',
      description: 'A Windows WPF (.NET 9) desktop app for visual Git operations powered by LibGit2Sharp. Features commit history, commit details, file staging, repository explorer, and hard reset.',
      logo: null,
      image: null,
      categories: ['fullstack'],
      tags: ['C#', '.NET 9', 'WPF', 'LibGit2Sharp', 'Desktop'],
      links: [
        { label: 'GitHub', url: 'https://github.com/MaxymHuang/version-control' }
      ],
      details: {
        overview: 'A modern Git GUI client built with WPF and LibGit2Sharp to simplify everyday version control tasks with an intuitive UI.',
        technologies: [
          '.NET 9 WPF',
          'LibGit2Sharp',
          'Windows Desktop'
        ],
        features: [
          'Visual commit history and commit details',
          'File selection and staging UI',
          'Repository explorer with tree view',
          'Hard reset to selected commit with confirmation'
        ],
        challenges: [
          'Presenting Git state clearly for users new to CLI',
          'Ensuring safe operations for destructive actions (resets)'
        ],
        solutions: [
          'Guided UI and confirmation dialogs',
          'LibGit2Sharp integration for reliable Git operations'
        ]
      }
    },
    {
      id: 'homelab',
      title: 'Homelab Setup',
      description: 'Personal homelab infrastructure with Arch Linux, Docker containers, and automated deployment pipelines. Includes monitoring, backup solutions, and network configuration.',
      logo: '/server.jpeg',
      image: '/server.jpeg', // Use server image as the project icon
      categories: ['infrastructure', 'fullstack'],
      tags: ['Docker', 'Kubernetes', 'Linux', 'DevOps'],
      links: [
        { label: 'Setup Guide', url: '#' },
        { label: 'Hardware Specs', url: '#' }
      ],
      details: {
        overview: 'A robust homelab environment built for learning, development, and personal use, featuring virtualization, containerization, and automated workflows.',
        technologies: [
          'QEMU/KVM',
          'Docker & Docker Compose',
          'Arch Linux',
          'BTRFS',
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
      logo: '/filefinder.png',
      image: '/filefinder.png',
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
      title: 'OPNSense Router Setup',
      description: 'OPNSense router setup with multiple interfaces and VLANs for home lab networking.',
      logo: '/opnsense.svg',
      image: '/opnsense.svg',
      categories: ['infrastructure'],
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
    },
    {
      id: 'autonomous-rc-car',
      title: 'Autonomous RC Car with Object Detection & Avoidance',
      description: 'An autonomous navigation system integrating OpenCV computer vision with ultrasonic sensors for real-time obstacle detection and avoidance. Coming soon.',
      logo: null,
      image: '/hardware.png',
      categories: ['iot', 'wip'],
      tags: ['OpenCV', 'C++', 'Raspberry Pi', 'Computer Vision', 'Sensor Fusion', 'Robotics'],
      links: [],
      details: {
        overview: 'Coming soon - A fully autonomous RC car system that combines computer vision and sensor fusion to navigate environments while avoiding obstacles in real-time.',
        technologies: [],
        features: [],
        challenges: [],
        solutions: []
      },
      wip: true
    },
    {
      id: 'n8n-homelab-agent',
      title: 'n8n Automated Homelab Administrator Agent',
      description: 'An intelligent automation agent built with n8n to manage and administer homelab infrastructure. Coming soon.',
      logo: null,
      image: '/server.jpeg',
      categories: ['infrastructure', 'wip'],
      tags: ['n8n', 'Automation', 'Homelab', 'DevOps', 'Infrastructure'],
      links: [],
      details: {
        overview: 'Coming soon - An automated homelab administrator agent leveraging n8n workflows to manage infrastructure, monitor services, and automate routine administrative tasks.',
        technologies: [],
        features: [],
        challenges: [],
        solutions: []
      },
      wip: true
    }
  ],
  
  gallery: {
    photos: [
      {
        id: 'photo-000050',
        src: '/gallery/000050.JPG',
        alt: '',
        title: 'Friends',
        description: 'friends at the beach',
        aspectRatio: 1.5
      },
      {
        id: 'photo-000063',
        src: '/gallery/000063.JPG',
        alt: '',
        title: 'Friends in taiwan',
        description: 'cool picture with friends',
        aspectRatio: 1.33
      },
      {
        id: 'photo-000070',
        src: '/gallery/000070.JPG',
        alt: '',
        title: 'Hanoi',
        description: 'Behind the scenes in a busy old town.',
        aspectRatio: 1.5
      },
      {
        id: 'photo-img-2001',
        src: '/gallery/IMG_2001.JPG',
        alt: '',
        title: 'Friends',
        description: 'Cool picture with friends',
        aspectRatio: 0.75
      },
      {
        id: 'photo-img-2002',
        src: '/gallery/IMG_2002.JPG',
        alt: 'Photography by Maxym Huang',
        title: 'Street photography',
        description: 'A moment captured through the lens.',
        aspectRatio: 1.33
      },
      {
        id: 'photo-img-2008',
        src: '/gallery/IMG_2008.JPG',
        alt: 'Photography by Maxym Huang',
        title: 'CAT',
        description: 'A moment captured through the lens.',
        aspectRatio: 1.5
      },
      {
        id: 'photo-img-8327',
        src: '/gallery/IMG_8327.JPG',
        alt: 'Photography by Maxym Huang',
        title: 'Skater man',
        description: 'A moment captured through the lens.',
        aspectRatio: 0.8
      }
    ]
  },
  
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
      label: 'CV',
      url: '/CV_Yu-Chia_Huang.pdf',
      icon: '→'
    }
  ],
  
  navigation: {
    sections: ['about', 'journey', 'projects', 'gallery', 'connect']
  },
  
  projectCategories: [
    { id: 'all', label: 'All Projects', count: 7 },
    { id: 'iot', label: 'IoT & Hardware', count: 2 },
    { id: 'ai', label: 'AI & ML', count: 1 },
    { id: 'infrastructure', label: 'Infrastructure', count: 3 },
    { id: 'fullstack', label: 'Full Stack', count: 4 },
    { id: 'wip', label: 'WIP', count: 2 }
  ]
}; 