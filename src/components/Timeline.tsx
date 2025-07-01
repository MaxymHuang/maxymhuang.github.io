import React, { useState } from 'react';
import './Timeline.css';
// @ts-expect-error: No type declaration for AnimatedList
import AnimatedList from '../blocks/Components/AnimatedList/AnimatedList';

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

  const items = timelineEvents.map(
    (event) => `${event.icon} ${event.date} — ${event.title}: ${event.description}`
  );

  return (
    <div className="timeline-container">
      <AnimatedList
        items={items}
        onItemSelect={(item: string, index: number) => setActiveIndex(index)}
        showGradients={true}
        enableArrowNavigation={true}
        displayScrollbar={true}
        initialSelectedIndex={activeIndex ?? -1}
      />
      <div className="timeline-dots">
        <div className="timeline-line"></div>
        {timelineEvents.map((event, index) => (
          <div
            key={index}
            className={`timeline-dot ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
            title={`${event.date} - ${event.title}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline; 