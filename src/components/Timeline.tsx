import React from 'react';

type TimelineEvent = {
  period: string;
  title: string;
  organization?: string;
  description: string;
};

// Seeded from CV_Yu-Chia_Huang.pdf
const events: TimelineEvent[] = [
  {
    period: 'Feb 2025 – Present',
    title: 'Application Engineer',
    organization: 'Test Research Inc.',
    description: 'First line technical support and system optimization for automated X-ray inspection systems; trained and deployed ML segmentation models improving inspection accuracy by 40%; developed inspection recipes and automation scripts.'
  },
  {
    period: 'Nov 2023 – Jan 2025',
    title: 'Product Engineer',
    organization: 'Brobridge',
    description: 'Led NPI for Gravity Portal; designed backend system architecture; conducted research and developed QA test plans; implemented CI pipelines with self-hosted runners for dockerized applications.'
  },
  {
    period: '2019 — 2023',
    title: 'B.S. Industrial Engineering',
    organization: 'Purdue University',
    description: 'Graduated with focus on operations research, supply chain management, machine learning, and quality engineering.'
  }
];

const Timeline: React.FC = () => {
  return (
    <ol className="relative border-l border-border">
      {events.map((e, idx) => (
        <li key={idx} className="mb-10 ml-4">
          <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-subtle" />
          <time className="mb-1 block text-sm font-medium text-muted">{e.period}</time>
          <h3 className="text-lg font-semibold text-foreground">
            {e.title}
            {e.organization ? <span className="text-muted font-normal"> · {e.organization}</span> : null}
          </h3>
          <p className="mt-2 text-muted">
            {e.description}
          </p>
        </li>
      ))}
    </ol>
  );
};

export default Timeline;