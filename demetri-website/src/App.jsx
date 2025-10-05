import { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [rssItems, setRssItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  // Fetch episodes from Supabase
  useEffect(() => {
    fetchEpisodes();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('episodes-channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'episodes' },
        () => {
          fetchEpisodes();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchEpisodes = async () => {
    try {
      const { data, error } = await supabase
        .from('episodes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setRssItems(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching episodes:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPaused && rssItems.length > 0) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, rssItems.length, currentSlide]);

  const handlePrev = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setCurrentSlide((prev) => (prev - 1 + rssItems.length) % rssItems.length);
    setTimeout(() => setIsFlipping(false), 600);
  };

  const handleNext = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setCurrentSlide((prev) => (prev + 1) % rssItems.length);
    setTimeout(() => setIsFlipping(false), 600);
  };

  const handleMouseDown = (e) => {
    setDragStart(e.clientX);
    setIsPaused(true);
  };

  const handleMouseMove = (e) => {
    if (dragStart === null) return;
    const diff = e.clientX - dragStart;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (dragStart === null) return;
    
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    
    setDragStart(null);
    setDragOffset(0);
    setIsPaused(false);
  };

  const handleTouchStart = (e) => {
    setDragStart(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    if (dragStart === null) return;
    const diff = e.touches[0].clientX - dragStart;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const projects = [
    { name: "RRSRCH", url: "https://rrsrch.com" },
    { name: "Bouncr", url: "https://bouncr.tech" },
    { name: "The 86ed", url: "https://the86ed.net" }
  ];

  const contacts = [
    { name: "Email", url: "mailto:demetri@rrsrch.com" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/demetri-hodges-418534195/" },
    { name: "GitHub", url: "https://github.com/darko-ops" }
  ];

  if (loading) {
    return (
      <div style={styles.body}>
        <div style={styles.container}>
          <h1 style={styles.heading}>DEMETRI.XYZ</h1>
          <div style={styles.emptyState}>
            <p style={styles.emptyStateText}>Loading podcasts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.heading}>DEMETRI.XYZ</h1>

        {/* RSS Feed Carousel */}
        <div style={styles.carouselWrapper}>
          {rssItems.length > 0 ? (
            <>
              {/* Navigation Arrows */}
              <button 
                onClick={handlePrev} 
                style={{...styles.navButton, ...styles.navButtonLeft}}
                disabled={isFlipping}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>

              {/* Draggable Carousel */}
              <div 
                ref={carouselRef}
                style={styles.carouselContainer}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div 
                  style={{
                    ...styles.flipCard,
                    transform: `translateX(${dragOffset}px) rotateY(${isFlipping ? '180deg' : '0deg'})`,
                  }}
                >
                  <div style={styles.flipCardInner}>
                    <div style={styles.episodeCard}>
                      <div style={styles.episodeNumber}>
                        EP {rssItems[currentSlide].episode_number || currentSlide + 1}
                      </div>
                      <h2 style={styles.episodeTitle}>{rssItems[currentSlide].title}</h2>
                      <div style={styles.episodeDate}>{rssItems[currentSlide].date}</div>
                      <p style={styles.episodeDescription}>
                        {rssItems[currentSlide].description}
                      </p>
                      <a 
                        href={rssItems[currentSlide].link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={styles.episodeLink}
                      >
                        Listen now →
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleNext} 
                style={{...styles.navButton, ...styles.navButtonRight}}
                disabled={isFlipping}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>

              {/* Progress Indicator */}
              <div style={styles.progressBar}>
                <div style={styles.progressTrack}>
                  {rssItems.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setIsFlipping(true);
                        setCurrentSlide(index);
                        setTimeout(() => setIsFlipping(false), 600);
                      }}
                      style={{
                        ...styles.progressDot,
                        ...(currentSlide === index ? styles.progressDotActive : {})
                      }}
                    />
                  ))}
                </div>
                <div style={styles.progressText}>
                  {currentSlide + 1} / {rssItems.length}
                </div>
              </div>
            </>
          ) : (
            <div style={styles.emptyState}>
              <p style={styles.emptyStateText}>Podcasts coming soon...</p>
            </div>
          )}
        </div>

        {/* Bio Section */}
        <div style={styles.bioSection}>
          <h2 style={styles.sectionTitle}>About</h2>
          <p style={styles.paragraph}>
            I'm Demetri — product-minded security founder based in North Carolina. I like turning messy problems into elegant, verifiable flows.
          </p>
          
          <p style={styles.paragraph}>
            Recently: exploring research and design work at <strong style={styles.strong}>RRSRCH</strong> and shipping <strong style={styles.strong}>Bouncr</strong>, a governance layer for human + AI identities.
          </p>
          
          <p style={{...styles.paragraph, ...styles.muted, marginTop: '24px'}}>
            Interests: AI autonomy, identity & access governance, cryptographic logs, humane interfaces, Muay Thai and movies.
          </p>

          <div style={styles.projects}>
            <h2 style={styles.sectionTitle}>Current Work</h2>
            <div style={styles.projectLinks}>
              {projects.map((project, index) => (
                
                  key={index}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.projectChip}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {project.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div style={styles.contact}>
          <h2 style={styles.sectionTitle}>Contact</h2>
          <p style={styles.paragraph}>Best way to reach me: email.</p>
          <div style={styles.contactLinks}>
            {contacts.map((contact, index) => (
              
                key={index}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.contactChip}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {contact.name}
              </a>
            ))}
          </div>
        </div>

        <footer style={styles.footer}>
          © {new Date().getFullYear()} Demetri. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
    background: '#f5f5f5',
    color: '#1a1a1a',
    lineHeight: 1.6,
    WebkitFontSmoothing: 'antialiased',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '80px 32px',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: '80px',
    letterSpacing: '0.5px',
    color: '#000',
  },
  carouselWrapper: {
    marginBottom: '100px',
    position: 'relative',
  },
  carouselContainer: {
    position: 'relative',
    maxWidth: '600px',
    margin: '0 auto',
    height: '320px',
    perspective: '1000px',
    cursor: 'grab',
    userSelect: 'none',
  },
  flipCard: {
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    transformStyle: 'preserve-3d',
  },
  flipCardInner: {
    width: '100%',
    height: '100%',
  },
  episodeCard: {
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    padding: '48px 40px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  episodeNumber: {
    fontSize: '48px',
    fontWeight: 700,
    color: '#000',
    marginBottom: '16px',
    letterSpacing: '2px',
    fontFamily: 'monospace',
  },
  episodeTitle: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '12px',
    color: '#000',
    letterSpacing: '-0.01em',
  },
  episodeDate: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '20px',
    fontWeight: 400,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  episodeDescription: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#333',
    marginBottom: '24px',
    lineHeight: 1.6,
  },
  episodeLink: {
    color: '#000',
    textDecoration: 'none',
    borderBottom: '1px solid #000',
    fontSize: '14px',
    fontWeight: 500,
    padding: '4px 0',
    transition: 'opacity 0.2s',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '48px',
    height: '48px',
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    zIndex: 10,
    color: '#000',
    backdropFilter: 'blur(10px)',
  },
  navButtonLeft: {
    left: '-24px',
  },
  navButtonRight: {
    right: '-24px',
  },
  progressBar: {
    marginTop: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
  progressTrack: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  progressDot: {
    width: '8px',
    height: '8px',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  progressDotActive: {
    width: '32px',
    height: '8px',
    borderRadius: '4px',
    background: '#000',
  },
  progressText: {
    fontSize: '12px',
    color: '#666',
    fontWeight: 500,
    letterSpacing: '0.5px',
    fontFamily: 'monospace',
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 32px',
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '2px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  emptyStateText: {
    fontSize: '15px',
    color: '#666',
    fontWeight: 400,
    letterSpacing: '0.3px',
  },
  bioSection: {
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '2px',
    padding: '40px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '20px',
    letterSpacing: '0.2px',
    color: '#000',
  },
  paragraph: {
    fontSize: '15px',
    fontWeight: 400,
    marginBottom: '16px',
    color: '#333',
  },
  strong: {
    fontWeight: 600,
    color: '#000',
  },
  muted: {
    color: '#666',
    fontSize: '14px',
  },
  projects: {
    marginTop: '32px',
    paddingTop: '32px',
    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
  },
  projectLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '16px',
  },
  projectChip: {
    display: 'inline-block',
    padding: '8px 16px',
    background: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '1px',
    color: '#000',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 400,
    transition: 'all 0.2s',
    letterSpacing: '0.2px',
  },
  contact: {
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '2px',
    padding: '40px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
  },
  contactLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '20px',
  },
  contactChip: {
    display: 'inline-block',
    padding: '8px 16px',
    background: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '1px',
    color: '#000',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 400,
    transition: 'all 0.2s',
    letterSpacing: '0.2px',
  },
  footer: {
    textAlign: 'center',
    padding: '60px 0 20px',
    fontSize: '13px',
    color: '#666',
    letterSpacing: '0.3px',
  },
};

export default App;