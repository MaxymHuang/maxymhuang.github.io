import React from 'react';

type TimelineEvent = {
  period: string;
  title: string;
  organization?: string;
  description: string;
};

// Seeded from resume.txt
const events: TimelineEvent[] = [
  {
    period: 'Nov 2023 – Present',
    title: 'Product Manager',
    organization: 'Brobridge Co., Taipei',
    description: 'Lead NPI for Gravity Portal; introduced Scrum; drove sprint efficiency; led PoCs; directed NHI Digital Transformation; stakeholder alignment.'
  },
  {
    period: 'Jan 2023 – May 2023',
    title: 'Industrial Engineer',
    organization: 'MPI, Small Parts Inc., Indiana',
    description: 'Optimized material flows and layouts; built Arena simulations; improved storage capacity and restocking efficiency.'
  },
  {
    period: 'Jun 2022 – Aug 2022',
    title: 'Software Engineering Intern',
    organization: 'Optoma Technology, Taipei',
    description: 'Built a Python CLI to process Firebase data; automated reporting with pandas; scheduled GCP SQL jobs.'
  },
  {
    period: 'May 2023',
    title: 'B.S. Industrial Engineering',
    organization: 'Purdue University',
    description: 'Graduated; focus on OR, SCM, ML, Quality, Lean Six Sigma.'
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