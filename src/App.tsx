import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useMemo, useState, lazy, Suspense } from 'react';
import { siteContent } from './data/siteContent';
import ResponsiveImage from './components/ResponsiveImage';
import { useCriticalImagePreloader } from './hooks/useImagePreloader';
import MarkdownRenderer from './components/MarkdownRenderer';

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
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isInlineOpen, setIsInlineOpen] = useState<boolean>(true);

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
  const filteredProjects = useMemo(() => (
    activeProjectCategory === 'all'
      ? projects
      : projects.filter(project => project.categories && project.categories.includes(activeProjectCategory))
  ), [activeProjectCategory]);

  const getMarkdownSlug = (id: string) => {
    if (id === 'opnsense-router') return 'router';
    return id;
  };

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<LoadingSpinner />}>
        <MinimalNavBar onNavigate={handleNavClick} />
      </Suspense>
      <main id="main-content" className="">
        {/* Hero Section */}
        <section className="relative isolate pt-28 pb-20 sm:pt-32">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <Suspense fallback={<LoadingSpinner />}>
                <BlurText 
                  text={siteContent.hero.name}
                  className="text-5xl sm:text-6xl font-semibold tracking-tight text-center justify-center"
                  delay={100}
                  animateBy="words"
                />
              </Suspense>
              <div className="mt-6 space-y-3">
                <h2 className="text-2xl sm:text-3xl text-foreground">{siteContent.hero.title}</h2>
                <h3 className="text-lg sm:text-xl text-muted">{siteContent.hero.subtitle}</h3>
                <p className="text-base sm:text-lg text-muted/90">{siteContent.hero.description}</p>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {siteContent.hero.ctas.map((cta) => (
                  <button
                    key={cta.id}
                    className={`${cta.primary ? 'bg-foreground text-background' : 'bg-subtle text-foreground'} inline-flex items-center gap-2 rounded-md px-4 py-2 shadow-soft hover:opacity-90 transition`}
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
                    <span aria-hidden>{cta.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 sm:py-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <img 
                  src="/coolpic.png" 
                  alt="Maxym Huang" 
                  className="w-40 h-40 rounded-xl object-cover shadow-soft ring-1 ring-border mx-auto md:mx-0"
                />
              </div>
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-muted">About</h3>
                  <p className="mt-2 text-foreground font-medium">{siteContent.about.education}</p>
                  <p className="mt-2 text-muted">{siteContent.about.description}</p>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-muted">Technical Skills</h3>
                  <p className="mt-2 text-muted">{siteContent.about.skills}</p>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-muted">Contact</h3>
                  <p className="mt-2 text-muted">{siteContent.about.contactMessage}</p>
                  <button 
                    className="mt-4 inline-flex items-center rounded-md bg-accent/20 text-foreground px-4 py-2 hover:bg-accent/30 transition"
                    onClick={handleContactClick}
                  >
                    Get In Touch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="py-16 sm:py-20">
          <div className="container">
            <h2 className="text-2xl font-semibold">Experience</h2>
            <div className="mt-8">
              <Suspense fallback={<LoadingSpinner />}>
                <Timeline />
              </Suspense>
            </div>
          </div>
        </section>

        <section id="projects" className="py-16 sm:py-20">
          <div className="container">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold">Projects</h2>
            </div>
            <div className="mt-6">
              <Suspense fallback={<LoadingSpinner />}>
                <ProjectFilter
                  categories={siteContent.projectCategories}
                  activeCategory={activeProjectCategory}
                  onCategoryChange={(cat) => { setActiveProjectCategory(cat); setSelectedProjectId(null); }}
                />
              </Suspense>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6" id="projects-grid">
              {filteredProjects.map((project, index) => (
                <div key={project.id} className="rounded-xl bg-card ring-1 ring-border shadow-soft p-5 hover:translate-y-[-2px] transition">
                  <div className="flex items-start gap-4">
                    {project.image && (
                      <div className="shrink-0">
                        <ResponsiveImage
                          src={project.image}
                          alt={`${project.title} project showcase`}
                          className="h-16 w-16 rounded-md object-cover"
                          sizes="(max-width: 768px) 96px, 128px"
                          priority={index === 0}
                          placeholder={true}
                          useOptimized={!(project.image?.endsWith('.jpeg') || project.image?.endsWith('.jpg') || project.image?.endsWith('.png') || project.image?.endsWith('.svg'))}
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold truncate">{project.title}</h3>
                      <p className="mt-2 text-sm text-muted line-clamp-3">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button 
                          className="inline-flex items-center rounded-md bg-subtle px-3 py-1.5 text-sm hover:bg-foreground hover:text-background transition"
                          onClick={() => navigate(`/project/${project.id}`)}
                        >
                          View Case Study
                        </button>
                        <button 
                          className="inline-flex items-center rounded-md bg-foreground px-3 py-1.5 text-sm text-background hover:opacity-90 transition"
                          onClick={() => { 
                            setSelectedProjectId(project.id);
                            setIsInlineOpen(true);
                            setTimeout(() => scrollToSection('project-markdown'), 0);
                          }}
                        >
                          Read Inline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedProjectId && (
              <div id="project-markdown" className="mt-12 rounded-xl bg-card ring-1 ring-border shadow-soft">
                <div className="flex items-center justify-between gap-2 px-5 py-3 border-b border-border">
                  <h3 className="text-lg font-semibold">{filteredProjects.find(p => p.id === selectedProjectId)?.title}</h3>
                  <button 
                    className="inline-flex items-center rounded-md bg-subtle px-2 py-1 text-sm hover:bg-foreground hover:text-background transition"
                    aria-expanded={isInlineOpen}
                    onClick={() => setIsInlineOpen(o => !o)}
                  >
                    <span className="mr-1">{isInlineOpen ? 'Collapse' : 'Expand'}</span>
                    <span aria-hidden>{isInlineOpen ? '▾' : '▸'}</span>
                  </button>
                </div>
                {isInlineOpen && (
                  <>
                    <div className="p-5 markdown-project-details">
                      <MarkdownRenderer file={`/projects/${getMarkdownSlug(selectedProjectId)}.md`} />
                    </div>
                    <div className="px-5 pb-5">
                      <button
                        className="inline-flex items-center rounded-md bg-foreground px-3 py-1.5 text-sm text-background hover:opacity-90 transition"
                        onClick={() => scrollToSection('projects')}
                      >
                        Back to top
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        <section id="connect" className="py-16 sm:py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h3 className="text-sm uppercase tracking-wider text-muted">Contact me</h3>
                <p className="mt-2 text-2xl font-semibold">Let's work together</p>
                <div className="mt-6 rounded-xl bg-card ring-1 ring-border shadow-soft p-5">
                  <Suspense fallback={<LoadingSpinner />}>
                    <ContactForm />
                  </Suspense>
                </div>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-wider text-muted">Or reach out directly</h4>
                <div className="mt-4 flex flex-col gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      className="inline-flex items-center justify-between rounded-md bg-card ring-1 ring-border px-4 py-3 hover:bg-subtle transition"
                      target={link.id === 'resume' ? undefined : "_blank"}
                      rel={link.id === 'resume' ? undefined : "noopener noreferrer"}
                      onClick={link.id === 'resume' ? handleResumeClick : undefined}
                      aria-label={`Visit my ${link.label.toLowerCase()}`}
                    >
                      <span className="font-medium">{link.label}</span>
                      <span aria-hidden>{link.icon}</span>
                    </a>
                  ))}
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

