import React, { useState } from 'react';
import './Timeline.css';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: '2020',
    title: 'Started with Arch Linux',
    description: 'Began my journey with Arch Linux, learning system administration and customization.',
    icon: '🐧'
  },
  {
    date: '2021',
    title: 'Homelab Setup',
    description: 'Established Proxmox-based homelab with Docker containers and automated deployment pipelines.',
    icon: '🏠'
  },
  {
    date: '2022',
    title: 'IoT Development',
    description: 'Started working with ESP32 microcontrollers for home automation and environmental monitoring.',
    icon: '🔌'
  },
  {
    date: '2023',
    title: 'Cloud Infrastructure',
    description: 'Implemented Tailscale + NextCloud private infrastructure with zero-trust networking.',
    icon: '☁️'
  },
  {
    date: '2024',
    title: 'DevOps & Firmware',
    description: 'Advanced to automated deployment pipelines and custom firmware solutions.',
    icon: '⚙️'
  }
];

const Timeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="timeline-container">
      <div className="timeline">
        {timelineEvents.map((event, index) => (
          <div
            key={index}
            className={`timeline-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <div className="timeline-icon">{event.icon}</div>
            <div className="timeline-content">
              <div className="timeline-date">{event.date}</div>
              <h3 className="timeline-title">{event.title}</h3>
              <p className="timeline-description">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline; 