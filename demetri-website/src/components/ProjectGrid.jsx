// src/components/ProjectGrid.jsx
// Minimalist typographic "Works" index: stacked text-only rows.
// Desktop: whole row is a link, description fades in beside the name on hover.
// Mobile/touch: rows are accordion buttons with a separate VISIT link.
import React, { useEffect, useState } from 'react';
import { PROJECTS } from '../utils/constants';

const INTER = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const MONO = "'IBM Plex Mono', 'SF Mono', Menlo, monospace";

// True for backgrounds dark enough to need white lettering.
const isDarkColor = (hex) => {
  if (!hex) return false;
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128;
};

const css = `
.works-index {
  margin-top: 40px;
  margin-bottom: 96px;
}
.works-row {
  display: block;
  border-bottom: 1px solid #ededea;
  padding: 28px 24px 22px;
  margin: 0 -24px;
  text-decoration: none;
  transition: background-color 0.35s ease;
}
.works-row--open {
  background: var(--row-bg, transparent);
}
.works-row--dark.works-row--open .works-name,
.works-row--dark.works-row--open .works-name--muted {
  color: #ffffff;
}
.works-row--dark.works-row--open .works-desc-inline,
.works-row--dark.works-row--open .works-desc-text,
.works-row--dark.works-row--open .works-num,
.works-row--dark.works-row--open .works-plus {
  color: rgba(255, 255, 255, 0.72);
}
.works-row--dark.works-row--open .works-visit {
  color: #ffffff;
}
.works-row--black.works-row--open .works-name,
.works-row--black.works-row--open .works-name--muted {
  color: #000000;
}
.works-row--black.works-row--open .works-desc-inline,
.works-row--black.works-row--open .works-desc-text,
.works-row--black.works-row--open .works-num,
.works-row--black.works-row--open .works-plus {
  color: rgba(0, 0, 0, 0.65);
}
.works-row--black.works-row--open .works-visit {
  color: #000000;
}
.works-row--link {
  cursor: pointer;
}
.works-toggle {
  display: block;
  width: 100%;
  background: none;
  border: 0;
  padding: 0;
  text-align: left;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.works-row-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
}
.works-name {
  font-family: ${INTER};
  font-weight: 800;
  font-size: 56px;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: #545454; /* matches PROJECTS/GENIUS page title grey (theme.colors.secondary) */
  transition: color 0.35s ease;
}
.works-name--muted {
  color: #c9c4bb;
}
.works-row-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}
.works-num {
  font-family: ${MONO};
  font-size: 13px;
  color: #b8b3aa;
}
.works-plus {
  display: inline-block;
  font-family: ${MONO};
  font-weight: 300;
  font-size: 24px;
  line-height: 1;
  color: #b8b3aa;
  transition: transform 0.35s ease;
}
.works-plus--open {
  transform: rotate(45deg);
}
.works-desc-inline {
  flex: 1;
  min-width: 0;
  margin-left: 40px;
  font-family: ${INTER};
  font-size: 16px;
  letter-spacing: 0.08em;
  line-height: 1.4;
  color: #6e6a61;
  opacity: 0;
  transition: opacity 1s ease;
}
.works-row--open .works-desc-inline {
  opacity: 1;
}
.works-desc {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, opacity 0.35s ease;
}
.works-row--open .works-desc {
  max-height: 140px;
  opacity: 1;
}
.works-desc-text {
  margin: 12px 0 0;
  font-family: ${INTER};
  font-size: 16px;
  line-height: 1.5;
  color: #6e6a61;
  max-width: 60ch;
}
.works-visit {
  display: inline-block;
  margin: 10px 0 4px;
  font-family: ${MONO};
  font-size: 12px;
  letter-spacing: 0.2em;
  color: #537385;
  text-decoration: none;
}
@media (max-width: 768px) {
  .works-name {
    font-size: 40px;
  }
  .works-row {
    padding: 22px 20px 18px;
    margin: 0 -20px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .works-desc,
  .works-desc-inline,
  .works-plus {
    transition: none;
  }
}
`;

const ProjectGrid = () => {
  // Name of the open project, or null. Drives both desktop hover and mobile accordion.
  const [expanded, setExpanded] = useState(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (max-width: 768px)');
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <div className="works-index">
      <style>{css}</style>
      {PROJECTS.map((project, i) => {
        const isOpen = expanded === project.name;
        const muted = project.comingSoon || !project.url;
        const num = String(i + 1).padStart(2, '0');
        const descId = `works-desc-${project.name.toLowerCase().replace(/\s+/g, '-')}`;
        const rowColorClass = project.blackText
          ? ' works-row--black'
          : project.whiteText || isDarkColor(project.bg)
            ? ' works-row--dark'
            : '';
        const rowColorStyle = project.bg ? { '--row-bg': project.bg } : undefined;

        const rowTop = (
          <span className="works-row-top">
            <span className={`works-name${muted ? ' works-name--muted' : ''}`}>
              {project.name}
            </span>
            {!isTouch && (
              <span className="works-desc-inline">{project.description}</span>
            )}
            <span className="works-row-meta">
              <span className="works-num">{num}</span>
              {isTouch && (
                <span
                  className={`works-plus${isOpen ? ' works-plus--open' : ''}`}
                  aria-hidden="true"
                >
                  +
                </span>
              )}
            </span>
          </span>
        );

        if (isTouch) {
          return (
            <div
              key={project.name}
              className={`works-row${rowColorClass}${isOpen ? ' works-row--open' : ''}`}
              style={rowColorStyle}
            >
              <button
                type="button"
                className="works-toggle"
                aria-expanded={isOpen}
                aria-controls={descId}
                onClick={() => setExpanded(isOpen ? null : project.name)}
              >
                {rowTop}
              </button>
              <div id={descId} className="works-desc">
                <p className="works-desc-text">{project.description}</p>
                {project.url && (
                  <a
                    className="works-visit"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    VISIT&nbsp;↗
                  </a>
                )}
              </div>
            </div>
          );
        }

        const RowTag = project.url ? 'a' : 'div';
        const rowProps = project.url
          ? { href: project.url, target: '_blank', rel: 'noopener noreferrer' }
          : {};
        return (
          <RowTag
            key={project.name}
            {...rowProps}
            className={`works-row works-row--link${rowColorClass}${isOpen ? ' works-row--open' : ''}`}
            style={rowColorStyle}
            onMouseEnter={() => setExpanded(project.name)}
            onMouseLeave={() =>
              setExpanded((cur) => (cur === project.name ? null : cur))
            }
          >
            {rowTop}
          </RowTag>
        );
      })}
    </div>
  );
};

export default ProjectGrid;
