import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, lazy, Suspense } from 'react';
import { siteContent } from './data/siteContent';
import ResponsiveImage from './components/ResponsiveImage';
import { useCriticalImagePreloader } from './hooks/useImagePreloader';

// Lazy load components to reduce initial bundle size
const ProjectDetails = lazy(() => import('./components/ProjectDetails'));
const Timeline = lazy(() => import('./components/Timeline'));
const PDFViewer = lazy(() => import('./components/PDFViewer'));
const ProjectFilter = lazy(() => import('./components/ProjectFilter'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const LoadingSpinner = lazy(() => import('./components/LoadingSpinner'));
const MinimalNavBar = lazy(() => import('./components/MinimalNavBar'));
// @ts-expect-error: No type declaration for ScrollVelocity
const ScrollVelocity = lazy(() => import('./blocks/TextAnimations/ScrollVelocity/ScrollVelocity'));
// @ts-expect-error: No type declaration for BlurText
const BlurText = lazy(() => import('./blocks/TextAnimations/BlurText/BlurText'));
// @ts-expect-error: No type declaration for SpotlightCard
const SpotlightCard = lazy(() => import('./blocks/Components/SpotlightCard/SpotlightCard'));

// Use siteContent from the data file
const { projects, social: socialLinks } = siteContent;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function Home() {
  const navigate = useNavigate();
  
  // Preload critical above-the-fold images
  useCriticalImagePreloader();
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);
  const [activeProjectCategory, setActiveProjectCategory] = useState('all');

  // Handler for nav bar navigation
  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  // Handler for resume link click
  const handleResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsPDFViewerOpen(true);
  };

  // Handler for ProfileCard contact click
  const handleContactClick = () => {
    scrollToSection('connect');
  };

  // Filter projects based on active category
  const filteredProjects = activeProjectCategory === 'all' 
    ? projects 
    : projects.filter(project => 
        project.categories && project.categories.includes(activeProjectCategory)
      );

  return (
    <div className="portfolio-root">
      <Suspense fallback={<LoadingSpinner />}>
        <MinimalNavBar onNavigate={handleNavClick} />
      </Suspense>
      <main id="main-content" className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <Suspense fallback={<LoadingSpinner />}>
                <BlurText 
                  text={siteContent.hero.name}
                  className="about-blur-heading"
                  delay={100}
                  animateBy="words"
                />
              </Suspense>
              
              <div className="hero-subtitle">
                <h2 className="hero-title">{siteContent.hero.title}</h2>
                <h3 className="hero-role">{siteContent.hero.subtitle}</h3>
                <p className="hero-description">{siteContent.hero.description}</p>
              </div>
              
              <div className="hero-ctas">
                {siteContent.hero.ctas.map((cta) => (
                  <button
                    key={cta.id}
                    className={`hero-cta ${cta.primary ? 'primary' : 'secondary'}`}
                    onClick={() => {
                      if (cta.action === 'scroll') {
                        scrollToSection(cta.target);
                      } else if (cta.action === 'download') {
                        window.open(cta.target, '_blank');
                      }
                    }}
                    aria-label={cta.label}
                  >
                    <span>{cta.label}</span>
                    <span className="cta-icon">{cta.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-content">
            <div className="about-card">
              <div className="about-image-container">
                <img 
                  src="/coolpic.png" 
                  alt="Maxym Huang" 
                  className="about-profile-pic"
                />
              </div>
              
              <div className="about-text-container">
                                 <div className="about-section-item">
                   <h3 className="section-number">● About</h3>
                   <div className="section-text">
                     <p className="about-education">{siteContent.about.education}</p>
                     <p className="about-description">
                       {siteContent.about.description}
                     </p>
                   </div>
                 </div>

                 <div className="about-section-item">
                   <h3 className="section-number">● Technical Skills</h3>
                   <div className="skills-list-text">
                     <p>{siteContent.about.skills}</p>
                   </div>
                 </div>

                 <div className="about-section-item">
                   <h3 className="section-number">● Contact</h3>
                   <div className="section-text">
                     <p>{siteContent.about.contactMessage}</p>
                     <button 
                       className="contact-button-clean"
                       onClick={handleContactClick}
                     >
                       Get In Touch
                     </button>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="section">
          <div className="section-content">
            <h2>My Journey</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <Timeline />
            </Suspense>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="section-content">
            {/* Section header like Dan's design */}
            <div className="section-header">
              <h2 className="section-title">Case Studies:</h2>
            </div>
            
            {/* Project Filter */}
            <Suspense fallback={<LoadingSpinner />}>
              <ProjectFilter
                categories={siteContent.projectCategories}
                activeCategory={activeProjectCategory}
                onCategoryChange={setActiveProjectCategory}
              />
            </Suspense>
            
            {/* Projects as case studies - redesigned to match Dan's layout */}
            <div className="case-studies" id="projects-grid">
              {filteredProjects.map((project, index) => (
                <div key={project.id} className="case-study-item">
                                     <div className="case-study-number">
                     <h3>● Case Study {String(index + 1).padStart(2, '0')}</h3>
                     {project.image && (
                       <div className="case-study-icon">
                         <ResponsiveImage
                           src={project.image}
                           alt={`${project.title} project showcase`}
                           className="project-icon"
                           sizes="(max-width: 768px) 300px, (max-width: 1200px) 400px, 500px"
                           priority={index === 0} // First project gets priority loading
                           placeholder={true}
                         />
                       </div>
                     )}
                   </div>
                  
                  <div className="case-study-content">
                    <h2 className="case-study-title">{project.title}</h2>
                    <p className="case-study-description">{project.description}</p>
                    <button 
                      className="case-study-link"
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      View Case Study
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" className="section connect-section">
          <div className="section-content">
            {/* Contact section with form and social links */}
            <div className="contact-section">
              <div className="contact-header">
                <h3 className="section-number">● Contact me</h3>
                <p className="contact-subtitle">Let's work together</p>
              </div>
              
              <div className="contact-content">
                <div className="contact-form-section">
                  <Suspense fallback={<LoadingSpinner />}>
                    <ContactForm />
                  </Suspense>
                </div>
                
                <div className="contact-links-section">
                  <h4 className="contact-links-title">Or reach out directly:</h4>
                  <div className="contact-links">
                    {socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        className="clean-contact-link"
                        target={link.id === 'resume' ? undefined : "_blank"}
                        rel={link.id === 'resume' ? undefined : "noopener noreferrer"}
                        onClick={link.id === 'resume' ? handleResumeClick : undefined}
                        aria-label={`Visit my ${link.label.toLowerCase()}`}
                      >
                        <span>{link.label}</span>
                        <span className="contact-icon">{link.icon}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Suspense fallback={<LoadingSpinner />}>
        <PDFViewer
          isOpen={isPDFViewerOpen}
          onClose={() => setIsPDFViewerOpen(false)}
          pdfUrl="/Resume.pdf"
          title="Maxym Huang - Resume"
        />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProjectDetails projects={projects} />
            </Suspense>
          } />
        </Routes>
      </Router>
    </>
  );
}

