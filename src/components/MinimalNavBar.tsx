import React from 'react';

interface NavBarProps {
  onNavigate: (sectionId: string) => void;
}

const MinimalNavBar: React.FC<NavBarProps> = ({ onNavigate }) => {
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'journey', label: 'Experience' },
    { id: 'connect', label: 'Connect' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '1rem 2rem',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{
        fontFamily: 'Metropolis, Arial, Helvetica, sans-serif',
        fontSize: '1.2rem',
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '0.05em'
      }}>
        MAXYM HUANG
      </div>
      
      <div style={{
        display: 'flex',
        gap: '2rem'
      }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontFamily: 'Metropolis, Arial, Helvetica, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 400,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              transition: 'opacity 0.3s ease',
              padding: '0.5rem 0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MinimalNavBar; 