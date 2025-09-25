import React, { useState } from 'react';
import type { JournalEntry } from '../types';
import EnhancedContentFormatter from './EnhancedContentFormatter';
import '../styles/biofield.css';

interface InteractiveElementsProps {
  entry: JournalEntry;
  onSecretDiscover: (secret: string) => void;
  discoveredSecrets: string[];
}

const InteractiveElements: React.FC<InteractiveElementsProps> = ({ 
  entry, 
  onSecretDiscover, 
  discoveredSecrets 
}) => {
  const renderInteractiveContent = (content: string) => {
    // Split content by paragraphs and process secrets
    const paragraphs = content.split('\n\n');
    
    return {
      __html: paragraphs.map(paragraph => {
        // Process secrets marked with **text**
        return paragraph.replace(/\*\*(.*?)\*\*/g, (match, secret: string) => {
          const isDiscovered = discoveredSecrets.includes(secret);
          return `<span class="biofield-secret ${isDiscovered ? 'discovered' : 'interactive'}" 
                    data-secret="${secret}">
                    ${secret}
                  </span>`;
        });
      }).join('<br><br>')
    };
  };

  const handleContentClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('biofield-secret') && target.classList.contains('interactive')) {
      const secret = target.getAttribute('data-secret');
      if (secret) {
        onSecretDiscover(secret);
      }
    }
  };

  return (
    <div className="interactive-elements biofield-container neural-grid quantum-field">
      {/* Interactive Content with Enhanced Formatting */}
      <EnhancedContentFormatter 
        entry={entry}
        discoveredSecrets={discoveredSecrets}
        onSecretDiscover={onSecretDiscover}
        darkMode={true}
      />
    </div>
  );
};

export default InteractiveElements;