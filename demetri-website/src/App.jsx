// src/App.jsx
import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import HomeContent from './components/HomeContent';
import PodcastSection from './sections/PodcastSection';
import BlogSection from './sections/BlogSection';
import ProjectsSection from './sections/ProjectsSection';
import SoundSection from './sections/SoundSection';
import ConnectSection from './sections/ConnectSection';
import { theme } from './styles/theme';

function App() {
  const [activeSection, setActiveSection] = useState(null);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const showSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div style={styles.body}>
      {/* Hero Section */}
      <Hero />

      {/* Home Content with Navigation */}
      <HomeContent 
        activeSection={activeSection}
        onSectionChange={showSection}
      />

      {/* Dynamic Section Content — always mounted so all content is present in
          the prerendered/static HTML; the nav toggles visibility, not mounting. */}
      <div style={{ display: activeSection === 'podcast' ? 'block' : 'none' }}>
        <PodcastSection />
      </div>
      <div style={{ display: activeSection === 'blog' ? 'block' : 'none' }}>
        <BlogSection />
      </div>
      <div style={{ display: activeSection === 'projects' ? 'block' : 'none' }}>
        <ProjectsSection />
      </div>
      <div style={{ display: activeSection === 'sound' ? 'block' : 'none' }}>
        <SoundSection />
      </div>
      <div style={{ display: activeSection === 'connect' ? 'block' : 'none' }}>
        <ConnectSection />
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div>
          <a href="/about/" style={styles.footerLink}>About</a>
          <span style={styles.footerSep}>·</span>
          <a href="/projects/" style={styles.footerLink}>Projects</a>
          <span style={styles.footerSep}>·</span>
          <a href="/blog/" style={styles.footerLink}>Writing</a>
          <span style={styles.footerSep}>·</span>
          <a href="/sound/" style={styles.footerLink}>Sound</a>
          <span style={styles.footerSep}>·</span>
          <a href="/connect/" style={styles.footerLink}>Connect</a>
        </div>
        <span style={styles.footerCopy}>
          © {new Date().getFullYear()} Demetri. All rights reserved.
        </span>
      </footer>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: theme.typography.fontFamily,
    background: theme.colors.background,
    color: theme.colors.text,
    lineHeight: 1.5,
    WebkitFontSmoothing: 'antialiased',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
  },
  footer: {
    fontFamily: theme.typography.fontFamily,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    padding: '30px 60px',
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.lightGray,
    background: theme.colors.white,
    borderTop: `1px solid ${theme.colors.border}`,
  },
  footerLink: {
    color: theme.colors.lightGray,
    textDecoration: 'none',
  },
  footerSep: {
    margin: `0 ${theme.spacing.sm}`,
    color: theme.colors.lightGray,
  },
  footerCopy: {
    marginLeft: 'auto',
    textAlign: 'right',
  },
};

export default App;