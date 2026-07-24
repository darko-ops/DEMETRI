// src/components/ContactGrid.jsx
// Minimalist typographic contact index, matching the Works list but smaller.
// Rows are plain links; on hover-capable devices the value fades in beside
// the label. On touch devices rows just navigate.
import React from 'react';
import { CONTACTS } from '../utils/constants';

const INTER = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const MONO = "'IBM Plex Mono', 'SF Mono', Menlo, monospace";

const css = `
.connect-index {
  margin: 24px 0 96px;
}
.connect-row {
  display: flex;
  align-items: baseline;
  gap: 24px;
  border-bottom: 1px solid #ededea;
  padding: 18px 0 14px;
  text-decoration: none;
  cursor: pointer;
}
.connect-label {
  font-family: ${INTER};
  font-weight: 800;
  font-size: 28px;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: #545454; /* same grey as the Works names */
}
.connect-value {
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
.connect-row:hover .connect-value {
  opacity: 1;
}
.connect-num {
  font-family: ${MONO};
  font-size: 12px;
  color: #b8b3aa;
  flex-shrink: 0;
}
@media (max-width: 768px) {
  .connect-label {
    font-size: 22px;
  }
  .connect-value {
    display: none;
  }
  .connect-row {
    padding: 16px 0 12px;
  }
}
@media (hover: none) {
  .connect-value {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .connect-value {
    transition: none;
  }
}
`;

const ContactGrid = () => {
  return (
    <div className="connect-index">
      <style>{css}</style>
      {CONTACTS.map((contact, i) => (
        <a
          key={contact.label}
          href={contact.url}
          target={contact.url.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="connect-row"
        >
          <span className="connect-label">{contact.label}</span>
          <span className="connect-value">{contact.value}</span>
          <span className="connect-num">{String(i + 1).padStart(2, '0')}</span>
        </a>
      ))}
    </div>
  );
};

export default ContactGrid;
