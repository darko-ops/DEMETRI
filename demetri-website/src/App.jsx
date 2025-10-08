// src/App.jsx
import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import HomeContent from './components/HomeContent';
import PodcastSection from './sections/PodcastSection';
import BlogSection from './sections/BlogSection';
import ProjectsSection from './sections/ProjectsSection';
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

      {/* Dynamic Section Content */}
      {activeSection === 'podcast' && <PodcastSection />}
      {activeSection === 'blog' && <BlogSection />}
      {activeSection === 'projects' && <ProjectsSection />}
      {activeSection === 'connect' && <ConnectSection />}

      {/* Footer */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} Demetri. All rights reserved.
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
    textAlign: 'center',
    padding: '30px 0',
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.lightGray,
    background: theme.colors.white,
    borderTop: `1px solid ${theme.colors.border}`,
  },
};

export default App;