import React, { useState, useEffect } from 'react';
import { journalEntries } from '../data/journalEntries';

interface NavigationProps {
  activeEntry: string | null;
  onEntrySelect: (entryId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeEntry, onEntrySelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredEntry, setHoveredEntry] = useState<string | null>(null);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getEntrySummary = (content: string) => {
    // Extract first sentence or first 100 characters
    const sentences = content.split('.');
    const firstSentence = sentences[0] || '';
    return firstSentence.length > 100 
      ? content.substring(0, 100) + '...' 
      : firstSentence + '.';
  };

  return (
    <>
      <nav className="navigation">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-symbol">🌟</span>
            <span className="brand-text">Fool's Journey</span>
          </div>
          
          <button 
            className={`nav-toggle ${isOpen ? 'nav-toggle-active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Full-screen dropdown overlay */}
      <div className={`nav-overlay ${isOpen ? 'nav-overlay-open' : ''}`}>
        <div className="nav-overlay-content">
          <div className="nav-header">
            <h2 className="nav-overlay-title">Journey Entries</h2>
            <button 
              className="nav-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation"
            >
              ✕
            </button>
          </div>

          <div className="nav-entries-grid">
            {journalEntries.map((entry, index) => (
              <div
                key={entry.id}
                className={`nav-entry-card ${activeEntry === entry.id ? 'nav-entry-active' : ''}`}
                onMouseEnter={() => setHoveredEntry(entry.id)}
                onMouseLeave={() => setHoveredEntry(null)}
                onClick={() => {
                  onEntrySelect(entry.id);
                  setIsOpen(false);
                }}
              >
                <div className="nav-entry-header">
                  <span className="nav-entry-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="nav-entry-symbol">{entry.symbol}</span>
                </div>
                
                <h3 className="nav-entry-title">{entry.title}</h3>
                
                <div className="nav-entry-meta">
                  <span className="nav-entry-tarot">{entry.tarot}</span>
                  <span className="nav-entry-numerology">#{entry.numerology}</span>
                </div>

                {hoveredEntry === entry.id && (
                  <div className="nav-entry-summary">
                    <p>{getEntrySummary(entry.content.replace(/\*\*/g, ''))}</p>
                  </div>
                )}

                {activeEntry === entry.id && (
                  <div className="nav-entry-indicator">
                    <span>Currently Reading</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};