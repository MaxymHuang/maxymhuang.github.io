import React, { useState, useEffect } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import type { NavBarProps, SectionId } from '../types';
import styles from './MinimalNavBar.module.css';

const MinimalNavBar: React.FC<NavBarProps> = ({ onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  const navItems: Array<{ id: SectionId; label: string }> = [
    { id: 'about', label: 'About' },
    { id: 'journey', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'connect', label: 'Connect' }
  ];

  // Handle navigation click
  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false); // Close mobile menu
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
      <div className={styles.navbarBrand}>MAXYM HUANG</div>
      
      {/* Desktop Navigation */}
      <div className={styles.desktopNav}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`${styles.navBtn} ${activeSection === item.id ? styles.active : ''}`}
            aria-label={`Navigate to ${item.label} section`}
            aria-current={activeSection === item.id ? 'page' : undefined}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        className={styles.mobileMenuBtn}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
        aria-controls="mobile-navigation"
      >
        <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* Mobile Navigation */}
      <div 
        id="mobile-navigation"
        className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`${styles.mobileNavBtn} ${activeSection === item.id ? styles.active : ''}`}
            aria-current={activeSection === item.id ? 'page' : undefined}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MinimalNavBar;