// src/components/SoundContent.jsx
// Shared "ELEVATOR MUSIC" label + typographic track player, used by both the
// homepage Sound section and the standalone /sound/ page.
// No Spotify chrome — clicking a row plays its 30-second preview through a
// bare <audio> element; playback auto-advances through the list. A hairline
// progress line fills along the playing row's bottom border. Each row has a
// small ↗ that opens the track on Spotify.
import React, { useEffect, useRef, useState } from 'react';
import { SOUND } from '../utils/constants';
import { theme } from '../styles/theme';

const INTER = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const MONO = "'IBM Plex Mono', 'SF Mono', Menlo, monospace";

const css = `
.sound-index {
  margin: 24px 0 96px;
}
.sound-row {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 24px;
  width: 100%;
  border-bottom: 1px solid #ededea;
  padding: 18px 0 14px;
}
.sound-play {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: baseline;
  gap: 24px;
  border: 0;
  background: none;
  text-align: left;
  padding: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.sound-title {
  font-family: ${INTER};
  font-weight: 800;
  font-size: 28px;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: #545454;
  transition: color 0.35s ease;
}
.sound-row--playing .sound-title {
  color: #537385;
}
.sound-artist {
  flex: 1;
  min-width: 0;
  font-family: ${INTER};
  font-size: 13px;
  letter-spacing: 0.08em;
  line-height: 1.4;
  color: #6e6a61;
  opacity: 0;
  transition: opacity 1s ease;
}
.sound-row:hover .sound-artist,
.sound-row--playing .sound-artist {
  opacity: 1;
}
.sound-num {
  font-family: ${MONO};
  font-size: 12px;
  color: #b8b3aa;
  flex-shrink: 0;
}
.sound-row--playing .sound-num {
  color: #537385;
}
.sound-open {
  font-family: ${MONO};
  font-size: 12px;
  color: #b8b3aa;
  text-decoration: none;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.35s ease;
}
.sound-row:hover .sound-open,
.sound-row--playing .sound-open {
  opacity: 1;
}
.sound-open:hover {
  color: #537385;
}
.sound-progress {
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 1px;
  background: #537385;
  pointer-events: none;
}
.sound-note {
  display: inline-block;
  margin-top: 16px;
  font-family: ${MONO};
  font-size: 12px;
  letter-spacing: 0.2em;
  color: #b8b3aa;
}
.sound-note a {
  color: #537385;
  text-decoration: none;
}
@media (max-width: 768px) {
  .sound-title {
    font-size: 22px;
  }
  .sound-artist {
    display: none;
  }
  .sound-row {
    padding: 16px 0 12px;
  }
  .sound-open {
    opacity: 1;
  }
}
@media (hover: none) {
  .sound-open {
    opacity: 1;
  }
}
@media (prefers-reduced-motion: reduce) {
  .sound-artist,
  .sound-title,
  .sound-open {
    transition: none;
  }
}
`;

const SoundContent = () => {
  const [playing, setPlaying] = useState(null); // index of playing track, or null
  const [progress, setProgress] = useState(0); // 0–100 for the playing track
  const audioRef = useRef(null);
  const playingRef = useRef(null);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  // Pause on unmount.
  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const getAudio = () => {
    if (!audioRef.current) {
      const a = new Audio();
      a.addEventListener('timeupdate', () => {
        if (a.duration) setProgress((a.currentTime / a.duration) * 100);
      });
      // Elevator behavior: previews auto-advance and loop the list.
      a.addEventListener('ended', () => {
        const cur = playingRef.current;
        if (cur !== null) playTrack((cur + 1) % SOUND.tracks.length);
      });
      audioRef.current = a;
    }
    return audioRef.current;
  };

  const playTrack = (i) => {
    const a = getAudio();
    a.src = SOUND.tracks[i].previewUrl;
    setProgress(0);
    a.play();
    setPlaying(i);
  };

  const toggle = (i) => {
    if (!SOUND.tracks[i].previewUrl) return;
    if (playing === i) {
      getAudio().pause();
      setPlaying(null);
    } else {
      playTrack(i);
    }
  };

  return (
    <div style={styles.soundSection} data-section-container>
      <h1 style={styles.title}>ELEVATOR MUSIC</h1>
      <div className="sound-index">
        <style>{css}</style>
        {SOUND.tracks.map((track, i) => {
          const isPlaying = playing === i;
          return (
            <div
              key={`${track.title}-${i}`}
              className={`sound-row${isPlaying ? ' sound-row--playing' : ''}`}
            >
              <button
                type="button"
                className="sound-play"
                onClick={() => toggle(i)}
                aria-pressed={isPlaying}
                aria-label={`${isPlaying ? 'Pause' : 'Play'} preview of ${track.title} by ${track.artist}`}
              >
                <span className="sound-title">{track.title}</span>
                <span className="sound-artist">{track.artist}</span>
              </button>
              <span className="sound-num">{String(i + 1).padStart(2, '0')}</span>
              <a
                className="sound-open"
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${track.title} on Spotify`}
              >
                ↗
              </a>
              {isPlaying && (
                <span className="sound-progress" style={{ width: `${progress}%` }} />
              )}
            </div>
          );
        })}
        <span className="sound-note">
          30-SEC PREVIEWS —{' '}
          <a
            href={SOUND.playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            FULL PLAYLIST ON SPOTIFY ↗
          </a>
        </span>
      </div>
    </div>
  );
};

const styles = {
  soundSection: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: `0 ${theme.spacing['4xl']} ${theme.spacing.xl}`,
    minHeight: 'calc(100vh - 200px)',
  },
  title: {
    fontFamily: "'IBM Plex Mono', 'SF Mono', Menlo, monospace",
    fontSize: '12px',
    fontWeight: 400,
    letterSpacing: '0.3em',
    color: '#b8b3aa',
    textAlign: 'left',
    margin: `${theme.spacing.md} 0 0`,
  },
};

export default SoundContent;
