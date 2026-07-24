// src/components/SoundContent.jsx
// Shared "ELEVATOR MUSIC" label + 3D cover-flow deck, used by both the
// homepage Sound section and the standalone /sound/ page.
// Drag the stage (or click a side cover) to browse; click the active cover
// to play/pause its 30-second preview. Playback auto-advances and loops.
import React, { useEffect, useRef, useState } from 'react';
import { SOUND } from '../utils/constants';
import { theme } from '../styles/theme';

const INTER = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const MONO = "'IBM Plex Mono', 'SF Mono', Menlo, monospace";

// Whole deck tilts back so you look down on it.
const TILT = 13;
const DRAG_CLICK_TOLERANCE = 6; // px moved before a click is treated as a drag

// Deck geometry, desktop vs phone. Cards at 300px swamp a 375px viewport,
// so everything scales down together on small screens.
const GEOMETRY = {
  desktop: { card: 300, spacing: 150, zStep: 130, zFront: 60, stageH: 460, cardTop: 60 },
  mobile: { card: 190, spacing: 95, zStep: 85, zFront: 40, stageH: 320, cardTop: 44 },
};

// Fallback cover tints for tracks without art, keyed by index.
const FALLBACK_TINTS = ['#2b2b2b', '#3d4a52', '#537385', '#6b5d52', '#42403c', '#4a5a63', '#5c5148', '#38414a'];

const css = `
.cf-stage {
  perspective: 1500px;
  perspective-origin: 50% 18%;
  overflow: hidden;
  position: relative;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  cursor: grab;
}
.cf-stage--dragging {
  cursor: grabbing;
}
.cf-deck {
  transform-style: preserve-3d;
  position: relative;
  height: 100%;
}
.cf-card {
  position: absolute;
  left: 50%;
  border: 0;
  padding: 0;
  background: none;
  cursor: pointer;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
  transition: transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.55s, box-shadow 0.55s;
  -webkit-tap-highlight-color: transparent;
}
.cf-card--active {
  box-shadow: 0 28px 60px rgba(0, 0, 0, 0.35);
}
.cf-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
.cf-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 40px 14px 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0));
  text-align: left;
  pointer-events: none;
}
.cf-caption-title {
  display: block;
  font-family: ${INTER};
  font-weight: 800;
  font-size: 15px;
  letter-spacing: -0.02em;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cf-caption-artist {
  display: block;
  font-family: ${MONO};
  font-size: 11px;
  color: rgba(255, 255, 255, 0.75);
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cf-badge {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 56px;
  height: 56px;
  margin: -28px 0 0 -28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.cf-ground {
  position: absolute;
  left: 50%;
  bottom: 8px;
  width: 560px;
  height: 60px;
  margin-left: -280px;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0) 70%);
  pointer-events: none;
}
@media (max-width: 768px) {
  .cf-ground {
    width: 340px;
    height: 40px;
    margin-left: -170px;
  }
  .cf-badge {
    width: 44px;
    height: 44px;
    margin: -22px 0 0 -22px;
  }
  .cf-caption {
    padding: 28px 10px 8px;
  }
  .cf-caption-title {
    font-size: 13px;
  }
}
.cf-now {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
  text-align: center;
}
.cf-now-index {
  font-family: ${MONO};
  font-size: 12px;
  letter-spacing: 0.2em;
  color: #b8b3aa;
}
.cf-now-title {
  font-family: ${INTER};
  font-weight: 800;
  font-size: 40px;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: #537385;
  margin: 0;
}
.cf-now-artist {
  font-family: ${MONO};
  font-size: 12px;
  letter-spacing: 0.08em;
  color: #6e6a61;
}
.cf-progress {
  width: 260px;
  height: 1px;
  background: #ededea;
  overflow: hidden;
}
.cf-progress-fill {
  height: 100%;
  background: #537385;
}
.cf-play {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #537385;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
}
@media (max-width: 768px) {
  .cf-now-title {
    font-size: 28px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .cf-card {
    transition: none;
  }
}
`;

const PlayIcon = ({ size = 14, color = '#537385' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3 1.5 L12 7 L3 12.5 Z" fill={color} />
  </svg>
);

const PauseIcon = ({ size = 14, color = '#537385' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true">
    <rect x="2.5" y="1.5" width="3.2" height="11" fill={color} />
    <rect x="8.3" y="1.5" width="3.2" height="11" fill={color} />
  </svg>
);

const mod = (a, n) => ((a % n) + n) % n;

const SoundContent = () => {
  const n = SOUND.tracks.length;
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(null); // index of playing track, or null
  const [progress, setProgress] = useState(0); // 0–100 for the playing track
  const [dragging, setDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef(null);
  const playingRef = useRef(null);
  const drag = useRef({ startX: 0, base: 0, moved: 0, active: false });
  const geo = isMobile ? GEOMETRY.mobile : GEOMETRY.desktop;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

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
        if (cur !== null) {
          const next = mod(cur + 1, n);
          setActive(next);
          playTrack(next);
        }
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

  const togglePlay = (i) => {
    if (!SOUND.tracks[i].previewUrl) return;
    if (playing === i) {
      getAudio().pause();
      setPlaying(null);
    } else {
      playTrack(i);
    }
  };

  // Select a cover: bring it to front; if audio was playing, follow with sound.
  const select = (i) => {
    setActive(i);
    if (playingRef.current !== null && playingRef.current !== i) playTrack(i);
  };

  const onPointerDown = (e) => {
    drag.current = {
      startX: e.clientX,
      base: active,
      moved: 0,
      active: true,
      captured: false,
      pointerId: e.pointerId,
    };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    d.moved = Math.max(d.moved, Math.abs(dx));
    // Capture only once a real drag starts — capturing on pointerdown would
    // retarget the ending click to the stage and swallow card taps
    // (play/pause on the active cover, side-cover selection).
    if (!d.captured && d.moved > DRAG_CLICK_TOLERANCE) {
      d.captured = true;
      setDragging(true);
      try {
        e.currentTarget.setPointerCapture(d.pointerId);
      } catch {
        /* capture unsupported — drag still works while over the stage */
      }
    }
    if (!d.captured) return;
    const shift = Math.round(-dx / geo.spacing);
    const next = mod(d.base + shift, n);
    if (next !== active) setActive(next);
  };

  const onPointerUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    // A real drag landed on a new cover — follow with sound if playing.
    if (drag.current.moved > DRAG_CLICK_TOLERANCE && playingRef.current !== null && playingRef.current !== active) {
      playTrack(active);
    }
  };

  const onCardClick = (i) => {
    // Suppress the click that ends a real drag.
    if (drag.current.moved > DRAG_CLICK_TOLERANCE) return;
    if (i === active) togglePlay(i);
    else select(i);
  };

  const cardStyle = (i) => {
    // Circular offset so covers fan symmetrically on both sides.
    let off = i - active;
    if (off > n / 2) off -= n;
    if (off < -n / 2) off += n;
    const abs = Math.abs(off);
    const hidden = abs > 4;
    const x = off * geo.spacing;
    const z = off === 0 ? geo.zFront : -abs * geo.zStep;
    const ry = off === 0 ? 0 : off < 0 ? 42 : -42;
    const scale = off === 0 ? 1 : Math.max(0.66, 0.9 - abs * 0.06);
    return {
      top: `${geo.cardTop}px`,
      width: `${geo.card}px`,
      height: `${geo.card}px`,
      marginLeft: `${-geo.card / 2}px`,
      transform: `translateX(${x}px) translateZ(${z}px) rotateX(${TILT}deg) rotateY(${ry}deg) scale(${scale})`,
      opacity: hidden ? 0 : off === 0 ? 1 : Math.max(0.25, 0.85 - abs * 0.16),
      zIndex: 100 - abs,
      pointerEvents: hidden ? 'none' : 'auto',
    };
  };

  const track = SOUND.tracks[active];
  const isActivePlaying = playing === active;

  return (
    <div style={styles.soundSection} data-section-container>
      <h1 style={styles.title}>ELEVATOR MUSIC</h1>
      <style>{css}</style>

      <div
        className={`cf-stage${dragging ? ' cf-stage--dragging' : ''}`}
        style={{ height: `${geo.stageH}px` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="cf-deck">
          {SOUND.tracks.map((t, i) => {
            const isPlaying = playing === i;
            return (
              <button
                key={`${t.title}-${i}`}
                type="button"
                className={`cf-card${i === active ? ' cf-card--active' : ''}`}
                style={{
                  ...cardStyle(i),
                  background: t.art ? '#2b2b2b' : FALLBACK_TINTS[i % FALLBACK_TINTS.length],
                }}
                onClick={() => onCardClick(i)}
                aria-pressed={isPlaying}
                aria-label={`${isPlaying ? 'Pause' : 'Play'} preview of ${t.title} by ${t.artist}`}
              >
                {t.art && <img className="cf-art" src={t.art} alt="" draggable="false" />}
                <span className="cf-caption">
                  <span className="cf-caption-title">{t.title}</span>
                  <span className="cf-caption-artist">{t.artist}</span>
                </span>
                {i === active && (
                  <span className="cf-badge">
                    {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="cf-ground" />
      </div>

      <div className="cf-now">
        <span className="cf-now-index">
          {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </span>
        <h2 className="cf-now-title">{track.title}</h2>
        <span className="cf-now-artist">{track.artist}</span>
        <div className="cf-progress">
          <div
            className="cf-progress-fill"
            style={{ width: `${isActivePlaying ? progress : 0}%` }}
          />
        </div>
        <button
          type="button"
          className="cf-play"
          onClick={() => togglePlay(active)}
          aria-pressed={isActivePlaying}
          aria-label={`${isActivePlaying ? 'Pause' : 'Play'} preview of ${track.title} by ${track.artist}`}
        >
          {isActivePlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
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
