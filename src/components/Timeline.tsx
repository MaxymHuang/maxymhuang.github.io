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
  const [selected, setSelected] = useState(0);

  const handleDateClick = (idx: number) => setSelected(idx);
  const handlePrev = () => setSelected((prev) => (prev > 0 ? prev - 1 : prev));
  const handleNext = () => setSelected((prev) => (prev < timelineEvents.length - 1 ? prev + 1 : prev));

  return (
    <div id="timeline">
      <ul id="dates">
        {timelineEvents.map((event, idx) => (
          <li key={event.date}>
            <a
              href={`#${event.date}`}
              className={selected === idx ? 'selected' : ''}
              onClick={(e) => { e.preventDefault(); handleDateClick(idx); }}
            >
              {event.date}
            </a>
          </li>
        ))}
      </ul>
      <ul id="issues">
        {timelineEvents.map((event, idx) => (
          <li
            key={event.date}
            id={event.date}
            className={selected === idx ? 'selected' : ''}
            style={{ display: selected === idx ? 'block' : 'none' }}
          >
            <div style={{ fontSize: '64px', margin: '20px 0' }}>{event.icon}</div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
      <a
        href="#"
        id="prev"
        className={selected === 0 ? 'disabled' : ''}
        onClick={e => { e.preventDefault(); handlePrev(); }}
        aria-label="Previous"
      >-</a>
      <a
        href="#"
        id="next"
        className={selected === timelineEvents.length - 1 ? 'disabled' : ''}
        onClick={e => { e.preventDefault(); handleNext(); }}
        aria-label="Next"
      >+</a>
    </div>
  );
};

export default Timeline; 