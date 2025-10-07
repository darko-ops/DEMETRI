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
  const [activeSection, setActiveSection] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    fetchEpisodes();

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

  const showSection = (section) => {
    setActiveSection(section);
  };

// helpers (top of file, outside component)
const titleText = (active) =>
  !active ? 'GENIUS' : active.toUpperCase(); // 'podcast' -> 'PODCAST'

const tightTracking = (txt) => {
  const n = txt.length;
  if (n >= 9) return '-0.1em';   // e.g., "PROJECTS"
  if (n >= 7) return '-0.1em';   // e.g., "PODCAST", "CONNECT"
  if (n >= 4) return '-0.1em';   // e.g., "BLOG", 
  return '-0.02em';               // default
};



  return (
    <div style={styles.body}>
      {/* Hero/Home Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.subheadline}>INTELLIGENCE : RESEARCH</p>
          <h1 style={styles.siteTitle}>
            DEMETRI<span style={{color: '#537385'}}>.XYZ</span>
          </h1>
          <h2 style={styles.headline}>
            INNOVATING NEWS<br />
            FOR THE COMING<br />
            WORLD
          </h2>
          <p style={styles.tagline}>A CIRCULAR RUINS CREATION</p>
        </div>
      </div>

      {/* Home Content Section with Navigation */}
      <div style={styles.homeSection}>
        <div style={styles.threeColumnLayout}>
          {/* Left Column */}
          <div style={styles.leftColumn}>
            <div style={styles.leftCenterGroup}>
              <h3 style={styles.leftWebsiteName}>
                DEMETRI<span style={{color: '#537385'}}>.XYZ</span>
              </h3>
              
              <h2   style={{
                 ...styles.pageName,
                letterSpacing: tightTracking(titleText(activeSection)),
                alignSelf: 'flex-start',
                textAlign: 'left',
               }}>
                {!activeSection && 'GENIUS'}
                {activeSection === 'podcast' && 'PODCAST'}
                {activeSection === 'blog' && 'BLOG'}
                {activeSection === 'projects' && 'PROJECTS'}
                {activeSection === 'connect' && 'CONNECT'}
         
              </h2>
            </div>
            <div>
              {!activeSection && (
                <>
                  <p style={styles.quote}>
                    I    HAVE    NO    SPECIAL<br/>
                    TALENT.    I    AM    ONLY<br/>
                    PASSIONATELY    CURIOUS.
                  </p>
                  <span style={styles.quoteAuthor}>— ALBERT EINSTEIN</span>
                </>
              )}
              {activeSection === 'podcast' && (
                <>
                  <p style={styles.quote}>
                    FACTS    DO     NOT    CEASE<br/>
                    TO    EXIST    BECAUSE    THEY<br/>
                    ARE     IGNORED.
                  </p>
                  <span style={styles.quoteAuthor}>— ALDOUS HUXLEY</span>
                </>
              )}
              {activeSection === 'blog' && (
                <>
                  <p style={styles.quote}>
                    I     WRITE     TO     UNDERSTAND<br/>
                    WHAT     I'M     THINKING.<br/>                   
                  </p>
                  <span style={styles.quoteAuthor}>— JOAN DIDION</span>
                </>
              )}
              {activeSection === 'projects' && (
                <>
                  <p style={styles.quote}>
                    TO     THINK     IS     TO<br/>
                    EXPERIMENT.<br/>
                  </p>
                  <span style={styles.quoteAuthor}>— GILLES DELEUZE</span>
                </>
              )}
              {activeSection === 'connect' && (
                <>
                  <p style={styles.quote}>
                    SIMPLICITY    IS     THE <br/>
                    ULTIMATE     SOPHISTICATION.<br/>    
                    
                  </p>
                  <span style={styles.quoteAuthor}>— LEONARDO DA VINCI</span>
                </>
              )}
            </div>
          </div>

          {/* Center Column - Navigation */}
          <div style={styles.centerColumn}>
            <div style={styles.navStack}>
              <button onClick={() => showSection('podcast')} style={{...styles.navStackItem, ...(activeSection === 'podcast' ? styles.navStackItemActive : {})}}>
                PODCAST
              </button>
              <button onClick={() => showSection('blog')} style={{...styles.navStackItem, ...(activeSection === 'blog' ? styles.navStackItemActive : {})}}>
                BLOG
              </button>
              <button onClick={() => showSection('projects')} style={{...styles.navStackItem, ...(activeSection === 'projects' ? styles.navStackItemActive : {})}}>
                PROJECTS
              </button>
              <button onClick={() => showSection('connect')} style={{...styles.navStackItem, ...(activeSection === 'connect' ? styles.navStackItemActive : {})}}>
                CONNECT
              </button>
            </div>
          </div>

          {/* Right Column - Context */}
          <div style={styles.rightColumn}>
            {!activeSection && (
              <>
                <h4 style={styles.subtitle}>[WELCOME]</h4>
                <p style={styles.contextText}>
                  I'm Demetri, a self-taught builder and designer. I work across systems, interfaces, and ideas, creating intuitive products with clear logic and minimalist design. GENIUS is the archive : a place to track progress, spot patterns, and refine perspective through writing, audio, and experiments that trace how thought becomes form.
                </p>
              </>
            )}
            {activeSection === 'podcast' && (
              <>
                <h4 style={styles.subtitle}>[LISTEN]</h4>
                <p style={styles.contextText}>
                  Demetri.xyz is an ongoing series exploring intelligence, design, and human progress. Each episode examines how ideas evolve—across technology, creativity, and systems that shape modern life. The podcast blends research, reflection, and conversation, connecting patterns between disciplines to uncover how thought becomes form.
                </p>
              </>
            )}
            {activeSection === 'blog' && (
              <>
                <h4 style={styles.subtitle}>[WRITE]</h4>
                <p style={styles.contextText}>
                  Writing as thinking. The blog is where ideas get tested, refined, and archived. Essays on design, systems thinking, intelligence, and the patterns that connect them. Each post traces a thread—sometimes technical, sometimes philosophical—always focused on understanding how things work and why they matter.
                </p>
              </>
            )}
            {activeSection === 'projects' && (
              <>
                <h4 style={styles.subtitle}>[BUILD]</h4>
                <p style={styles.contextText}>
                  Projects are experiments in form and function. From RRSRCH (independent research lab) to Bouncr (governance for AI identities) to The 86ed (minimalist clothing line)—each project explores different aspects of design, security, and systems thinking. Work that matters, built with intention.
                </p>
              </>
            )}
            {activeSection === 'connect' && (
              <>
                <h4 style={styles.subtitle}>[CONNECT]</h4>
                <p style={styles.contextText}>
                  Interested in collaborating, discussing ideas, or just saying hello? Best way to reach me is email. I read most of these and respond when I can. Also available on LinkedIn and GitHub for professional connections.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Selected Section Content */}
      {activeSection === 'podcast' && (
        <div style={styles.selectedContent}>
          <div style={styles.verticalLabel}>LISTEN</div>
        <div style={styles.pageContent}>
          <p style={styles.pageText}>
            Demetri.xyz is an ongoing series exploring intelligence, design, and human progress. Each episode examines how ideas evolve—across technology, creativity, and systems that shape modern life. The podcast blends research, reflection, and conversation, connecting patterns between disciplines to uncover how thought becomes form. It's not about trends or headlines, but about understanding the architecture behind change.
          </p>
          <div style={styles.titleBlock}>
            <h1 style={styles.pageTitle}>
              DEMETRI<span style={{color: '#537385'}}>.XYZ</span>
            </h1>
            <p style={styles.welcomeText}>[PODCAST]</p>
          </div>
          
          {/* RSS Feed Carousel */}
          {rssItems.length > 0 && (
            <div style={styles.carouselWrapper}>
              <button 
                onClick={handlePrev} 
                style={{...styles.navButton, ...styles.navButtonLeft}}
                disabled={isFlipping}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>

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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>

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
            </div>
          )}
        </div>
        <div style={styles.quoteSection}>
          <p style={styles.quote}>
            YOU HAVE ENEMIES? GOOD.<br/>
            THAT MEANS YOU STOOD<br/>
            UP FOR SOMETHING,<br/>
            SOMETIME IN YOUR LIFE.<br/>
            <span style={styles.quoteAuthor}>— WINSTON CHURCHILL</span>
          </p>
        </div>
      </div>
      )}

      {activeSection === 'blog' && (
        <div style={styles.selectedContent}>
          <div style={styles.verticalLabel}>WRITE</div>
        <div style={styles.pageContent}>
          <p style={styles.pageText}>
            Writing as thinking. The blog is where ideas get tested, refined, and archived. Essays on design, systems thinking, intelligence, and the patterns that connect them. Each post traces a thread—sometimes technical, sometimes philosophical—always focused on understanding how things work and why they matter.
          </p>
          <div style={styles.titleBlock}>
            <h1 style={styles.pageTitle}>
              DEMETRI<span style={{color: '#537385'}}>.XYZ</span>
            </h1>
            <p style={styles.welcomeText}>[BLOG]</p>
          </div>
        </div>
        <div style={styles.quoteSection}>
          <p style={styles.quote}>
            WRITING IS THINKING.<br/>
            TO WRITE WELL IS TO<br/>
            THINK CLEARLY.<br/>
            <span style={styles.quoteAuthor}>— DAVID MCCULLOUGH</span>
          </p>
        </div>
      </div>
      )}

      {activeSection === 'projects' && (
        <div style={styles.selectedContent}>
          <div style={styles.verticalLabel}>BUILD</div>
        <div style={styles.pageContent}>
          <p style={styles.pageText}>
            Projects are experiments in form and function. From RRSRCH (independent research lab) to Bouncr (governance for AI identities) to The 86ed (minimalist clothing line)—each project explores different aspects of design, security, and systems thinking. Work that matters, built with intention.
          </p>
          <div style={styles.titleBlock}>
            <h1 style={styles.pageTitle}>
              DEMETRI<span style={{color: '#537385'}}>.XYZ</span>
            </h1>
            <p style={styles.welcomeText}>[PROJECTS]</p>
          </div>
          <div style={styles.projectList}>
            <a href="https://rrsrch.com" target="_blank" rel="noopener noreferrer" style={styles.projectItem}>
              <span style={styles.projectName}>RRSRCH</span>
              <span style={styles.projectDesc}>Independent research lab</span>
            </a>
            <a href="https://bouncr.tech" target="_blank" rel="noopener noreferrer" style={styles.projectItem}>
              <span style={styles.projectName}>BOUNCR</span>
              <span style={styles.projectDesc}>Governance for AI identities</span>
            </a>
            <a href="https://the86ed.net" target="_blank" rel="noopener noreferrer" style={styles.projectItem}>
              <span style={styles.projectName}>THE 86ED</span>
              <span style={styles.projectDesc}>Minimalist clothing line</span>
            </a>
          </div>
        </div>
        <div style={styles.quoteSection}>
          <p style={styles.quote}>
            DESIGN IS NOT JUST<br/>
            WHAT IT LOOKS LIKE.<br/>
            DESIGN IS HOW IT WORKS.<br/>
            <span style={styles.quoteAuthor}>— STEVE JOBS</span>
          </p>
        </div>
      </div>
      )}

      {activeSection === 'connect' && (
        <div style={styles.selectedContent}>
          <div style={styles.verticalLabel}>CONNECT</div>
        <div style={styles.pageContent}>
          <p style={styles.pageText}>
            Interested in collaborating, discussing ideas, or just saying hello? Best way to reach me is email. I read most of these and respond when I can. Also available on LinkedIn and GitHub for professional connections.
          </p>
          <div style={styles.titleBlock}>
            <h1 style={styles.pageTitle}>
              DEMETRI<span style={{color: '#537385'}}>.XYZ</span>
            </h1>
            <p style={styles.welcomeText}>[CONNECT]</p>
          </div>
          <div style={styles.contactList}>
            <a href="mailto:demetri@rrsrch.com" style={styles.contactItem}>
              <span style={styles.contactLabel}>EMAIL</span>
              <span style={styles.contactValue}>demetri@rrsrch.com</span>
            </a>
            <a href="https://www.linkedin.com/in/demetri-hodges-418534195/" target="_blank" rel="noopener noreferrer" style={styles.contactItem}>
              <span style={styles.contactLabel}>LINKEDIN</span>
              <span style={styles.contactValue}>Demetri Hodges</span>
            </a>
            <a href="https://github.com/darko-ops" target="_blank" rel="noopener noreferrer" style={styles.contactItem}>
              <span style={styles.contactLabel}>GITHUB</span>
              <span style={styles.contactValue}>darko-ops</span>
            </a>
          </div>
        </div>
        <div style={styles.quoteSection}>
          <p style={styles.quote}>
            ALONE WE CAN DO<br/>
            SO LITTLE; TOGETHER<br/>
            WE CAN DO SO MUCH.<br/>
            <span style={styles.quoteAuthor}>— HELEN KELLER</span>
          </p>
        </div>
      </div>
      )}

      <footer style={styles.footer}>
        © {new Date().getFullYear()} Demetri. All rights reserved.
      </footer>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    background: '#eaedf0',
    color: '#7a7a7a',
    lineHeight: 1.5,
    WebkitFontSmoothing: 'antialiased',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
  },
  hero: {
    background: '#eaedf0',
    height: '100vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid #d1d5db',
  },
  heroContent: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  subheadline: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: '#545454',
    position: 'absolute',
    top: '60px',
    left: '50%',
    transform: 'translateX(-50%)',
    margin: 0,
  },
  siteTitle: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '180px',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    color: '#545454',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    margin: 0,
    whiteSpace: 'nowrap',
  },
  headline: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '18px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    lineHeight: 1.4,
    color: '#537385',
    position: 'absolute',
    bottom: '100px',
    left: '60px',
    margin: 0,
  },
  tagline: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#545454',
    position: 'absolute',
    bottom: '60px',
    right: '60px',
    margin: 0,
  },
  homeSection: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '80px 60px',
    position: 'relative',
    minHeight: '100vh',
    background: '#eaedf0',
  },
  threeColumnLayout: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0,1fr) 600px minmax(0,1fr)', // center locked
    gap: '80px',
    alignItems: 'start',
    minHeight: '80vh',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',     // was 'flex-start'
    minHeight: '80vh',
  },
  leftCenterGroup: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1px',            // DEMETRI.XYZ 10px above title
    width: '100%',             // ← important
  },
  pageName: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '100px',
    fontWeight: 700,
    color: '#545454',
    margin: 0,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  quoteBlock: {
    marginTop: '40px',
    rowGap: '10px',            // DEMETRI.XYZ 10px above title
    textAlign: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  leftWebsiteName: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#537385',
    margin: 0,
    textAlign: 'center',
    marginLeft: 'auto',        // ← centers the block
    marginRight: 'auto',
  },
  centerColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    position: 'sticky',
    top: '10vh',
    width: '600px',     // match the grid’s middle track
    flexShrink: 0,      // belt-and-suspenders (not strictly needed in grid)
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    paddingTop: '0',
    alignItems: 'center',
    marginLeft: 'auto',        // ← centers the block
    marginRight: 'auto',
  },
  subtitle: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#7a7a7a',
    margin: '0 0 20px 0',
  },
  contextText: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.8,
    color: '#7a7a7a',
    margin: 0,
  },
  homeContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '800px',
    margin: '0 auto',
  },
  homeText: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.8,
    color: '#7a7a7a',
    marginBottom: '60px',
  },
  navStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  navStackItem: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '0.15em',
    padding: '12px 24px',
    background: 'transparent',
    border: '1px solid transparent',
    color: '#7a7a7a',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  navStackItemActive: {
    color: '#1a1a1a',
    borderColor: '#d1d5db',
    background: '#ffffff',
  },
  selectedContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '80px 60px',
    position: 'relative',
    minHeight: 'calc(100vh - 200px)',
  },
  sectionPage: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '80px 60px',
    position: 'relative',
    minHeight: 'calc(100vh - 200px)',
  },
  verticalLabel: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '120px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    color: 'rgba(0, 0, 0, 0.03)',
    position: 'absolute',
    left: '-40px',
    top: '50%',
    transform: 'rotate(-90deg) translateX(-50%)',
    transformOrigin: 'left center',
    whiteSpace: 'nowrap',
    zIndex: 0,
  },
  pageContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '800px',
    margin: '0 auto',
  },
  pageText: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.8,
    color: '#7a7a7a',
    marginBottom: '60px',
  },
  titleBlock: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  pageTitle: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '60px',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: '#1a1a1a',
    margin: '0 0 12px 0',
  },
  welcomeText: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#7a7a7a',
    margin: 0,
  },
  quoteSection: {
    textAlign: 'center',
    alignItems: 'center',
  },
  quote: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    lineHeight: 1,
    color: '#545454',
    margin: 0,
    whiteSpace: 'pre',

  },
  quoteAuthor: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#537385',
    display: 'block',
    marginTop: '10px',
    letterSpacing: '0.05em',
  },
  carouselWrapper: {
    marginTop: '60px',
    marginBottom: '60px',
    position: 'relative',
  },
  carouselContainer: {
    position: 'relative',
    maxWidth: '600px',
    margin: '0 auto',
    height: '280px',
    perspective: '1000px',
    cursor: 'grab',
    userSelect: 'none',
  },
  flipCard: {
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  flipCardInner: {
    width: '100%',
    height: '100%',
  },
  episodeCard: {
    width: '100%',
    height: '100%',
    background: '#ffffff',
    border: '1px solid #d1d5db',
    padding: '40px 32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  episodeNumber: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '42px',
    fontWeight: 700,
    color: '#537385',
    marginBottom: '12px',
    letterSpacing: '0.05em',
  },
  episodeTitle: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '10px',
    color: '#1a1a1a',
    letterSpacing: '-0.01em',
  },
  episodeDate: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '11px',
    fontWeight: 400,
    color: '#6b7280',
    marginBottom: '16px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  episodeDescription: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    color: '#8a8a8a',
    marginBottom: '20px',
    lineHeight: 1.6,
  },
  episodeLink: {
    fontFamily: '"Inter", sans-serif',
    color: '#537385',
    textDecoration: 'none',
    borderBottom: '1px solid #537385',
    fontSize: '13px',
    fontWeight: 400,
    padding: '2px 0',
    transition: 'opacity 0.2s',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '36px',
    height: '36px',
 
 
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    zIndex: 10,
    color: '#545454',
  },
  navButtonLeft: {
    left: '-18px',
  },
  navButtonRight: {
    right: '-18px',
  },
  progressBar: {
    marginTop: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  progressTrack: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
  },
  progressDot: {
    width: '6px',
    height: '6px',
    background: '#d1d5db',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  progressDotActive: {
    width: '24px',
    height: '6px',
    borderRadius: '3px',
    background: '#537385',
  },
  progressText: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '11px',
    fontWeight: 400,
    color: '#6b7280',
    letterSpacing: '0.05em',
  },
  projectList: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  projectItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    background: '#ffffff',
    border: '1px solid #d1d5db',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
  projectName: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: '#1a1a1a',
  },
  projectDesc: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '13px',
    fontWeight: 400,
    color: '#7a7a7a',
  },
  contactList: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  contactItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    background: '#ffffff',
    border: '1px solid #d1d5db',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
  contactLabel: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.15em',
    color: '#1a1a1a',
  },
  contactValue: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    color: '#537385',
  },
  footer: {
    fontFamily: '"Inter", sans-serif',
    textAlign: 'center',
    padding: '30px 0',
    fontSize: '12px',
    fontWeight: 400,
    color: '#6b7280',
    background: '#ffffff',
    borderTop: '1px solid #d1d5db',
  },
};

export default App;