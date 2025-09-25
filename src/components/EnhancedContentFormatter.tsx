import React from 'react';
import type { JournalEntry } from '../data/witnessJournalEntries';

interface EnhancedContentFormatterProps {
  entry: JournalEntry;
  onSecretDiscover: (secret: string) => void;
  discoveredSecrets: string[];
  darkMode?: boolean;
}

const EnhancedContentFormatter: React.FC<EnhancedContentFormatterProps> = ({ 
  entry, 
  onSecretDiscover, 
  discoveredSecrets,
  darkMode = true
}) => {
  const handleSecretClick = (secret: string) => {
    if (!discoveredSecrets.includes(secret)) {
      onSecretDiscover(secret);
    }
  };

  // Enhanced mathematical equation rendering with advanced LaTeX support
  const renderMathEquation = (equation: string, index?: number): React.JSX.Element => {
    // Advanced LaTeX-style rendering for mathematical expressions
    const processedEquation = equation
      // Basic delimiters
      .replace(/\\\(/g, '<span class="math-inline">')
      .replace(/\\\)/g, '</span>')
      .replace(/\\\[/g, '<div class="math-block">')
      .replace(/\\\]/g, '</div>')
      
      // Superscripts and subscripts with enhanced support
      .replace(/\^(\{[^}]+\}|\w+)/g, (match, p1) => {
        const content = p1.startsWith('{') ? p1.slice(1, -1) : p1;
        return `<sup class="biofield-superscript">${content}</sup>`;
      })
      .replace(/_(\{[^}]+\}|\w+)/g, (match, p1) => {
        const content = p1.startsWith('{') ? p1.slice(1, -1) : p1;
        return `<sub class="biofield-subscript">${content}</sub>`;
      })
      
      // Fractions with enhanced styling
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, 
        '<span class="biofield-fraction"><span class="numerator">$1</span><span class="fraction-line"></span><span class="denominator">$2</span></span>')
      
      // Square roots and nth roots
      .replace(/\\sqrt\[(\d+)\]\{([^}]+)\}/g, '<span class="biofield-root"><sup class="root-index">$1</sup>√<span class="radicand">$2</span></span>')
      .replace(/\\sqrt\{([^}]+)\}/g, '<span class="biofield-sqrt">√<span class="radicand">$1</span></span>')
      
      // Integrals and summations
      .replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, '<span class="biofield-sum">∑<sub class="sum-lower">$1</sub><sup class="sum-upper">$2</sup></span>')
      .replace(/\\int_\{([^}]+)\}\^\{([^}]+)\}/g, '<span class="biofield-integral">∫<sub class="int-lower">$1</sub><sup class="int-upper">$2</sup></span>')
      .replace(/\\sum/g, '<span class="biofield-operator">∑</span>')
      .replace(/\\int/g, '<span class="biofield-operator">∫</span>')
      
      // Matrices
      .replace(/\\begin\{matrix\}(.*?)\\end\{matrix\}/gs, (match, content) => {
        const rows = content.split('\\\\').map((row: string) => 
          row.split('&').map((cell: string) => `<td class="matrix-cell">${cell.trim()}</td>`).join('')
        ).map((row: string) => `<tr>${row}</tr>`).join('');
        return `<table class="biofield-matrix"><tbody>${rows}</tbody></table>`;
      })
      
      // Greek letters with enhanced styling
      .replace(/\\alpha/g, '<span class="greek-letter">α</span>')
      .replace(/\\beta/g, '<span class="greek-letter">β</span>')
      .replace(/\\gamma/g, '<span class="greek-letter">γ</span>')
      .replace(/\\delta/g, '<span class="greek-letter">δ</span>')
      .replace(/\\epsilon/g, '<span class="greek-letter">ε</span>')
      .replace(/\\theta/g, '<span class="greek-letter">θ</span>')
      .replace(/\\lambda/g, '<span class="greek-letter">λ</span>')
      .replace(/\\mu/g, '<span class="greek-letter">μ</span>')
      .replace(/\\pi/g, '<span class="greek-letter">π</span>')
      .replace(/\\sigma/g, '<span class="greek-letter">σ</span>')
      .replace(/\\phi/g, '<span class="greek-letter">φ</span>')
      .replace(/\\omega/g, '<span class="greek-letter">ω</span>')
      .replace(/\\Omega/g, '<span class="greek-letter">Ω</span>')
      .replace(/\\Phi/g, '<span class="greek-letter">Φ</span>')
      .replace(/\\Psi/g, '<span class="greek-letter">Ψ</span>')
      
      // Mathematical operators and symbols
      .replace(/\\infty/g, '<span class="math-symbol">∞</span>')
      .replace(/\\partial/g, '<span class="math-symbol">∂</span>')
      .replace(/\\nabla/g, '<span class="math-symbol">∇</span>')
      .replace(/\\pm/g, '<span class="math-symbol">±</span>')
      .replace(/\\mp/g, '<span class="math-symbol">∓</span>')
      .replace(/\\times/g, '<span class="math-symbol">×</span>')
      .replace(/\\div/g, '<span class="math-symbol">÷</span>')
      .replace(/\\neq/g, '<span class="math-symbol">≠</span>')
      .replace(/\\leq/g, '<span class="math-symbol">≤</span>')
      .replace(/\\geq/g, '<span class="math-symbol">≥</span>')
      .replace(/\\approx/g, '<span class="math-symbol">≈</span>')
      .replace(/\\equiv/g, '<span class="math-symbol">≡</span>')
      
      // Quantum mechanics symbols
      .replace(/\\hbar/g, '<span class="quantum-symbol">ℏ</span>')
      .replace(/\\ket\{([^}]+)\}/g, '<span class="quantum-ket">|$1⟩</span>')
      .replace(/\\bra\{([^}]+)\}/g, '<span class="quantum-bra">⟨$1|</span>')
      .replace(/\\braket\{([^}]+)\}\{([^}]+)\}/g, '<span class="quantum-braket">⟨$1|$2⟩</span>');

    return (
      <div 
        className="biofield-equation terminal-text energy-field quantum-field neural-grid"
        style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '1.2em',
          color: darkMode ? '#00ffff' : '#0066cc',
          background: darkMode 
            ? 'linear-gradient(135deg, rgba(0, 255, 255, 0.15), rgba(255, 0, 255, 0.1), rgba(0, 255, 0, 0.05))' 
            : 'linear-gradient(135deg, rgba(0, 100, 200, 0.15), rgba(100, 0, 200, 0.1), rgba(0, 100, 0, 0.05))',
          border: `2px solid ${darkMode ? '#00ffff' : '#0066cc'}`,
          borderRadius: '8px',
          padding: '16px',
          margin: '12px 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: darkMode 
            ? '0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)' 
            : '0 0 15px rgba(0, 100, 200, 0.3), inset 0 0 15px rgba(0, 100, 200, 0.1)'
        }}
        dangerouslySetInnerHTML={{ __html: processedEquation }}
      />
    );
  };

  const renderQuote = (quote: string, index: number) => {
    const cleanQuote = quote.startsWith('>') ? quote.slice(1).trim() : quote;
    
    return (
      <div key={`quote-${index}`} className="biofield-quote energy-field cyber-border" style={{
        fontFamily: 'Courier New, Monaco, monospace',
        background: darkMode ? 'rgba(255, 0, 255, 0.08)' : 'rgba(128, 0, 128, 0.08)',
        border: `2px solid ${darkMode ? '#ff00ff' : '#800080'}`,
        borderRadius: '8px',
        padding: '20px 24px',
        margin: '20px 0',
        fontSize: '16px',
        fontStyle: 'italic',
        color: darkMode ? '#ff88ff' : '#660066',
        position: 'relative',
        textAlign: 'center',
        letterSpacing: '0.3px',
        lineHeight: '1.6',
        boxShadow: darkMode ? '0 0 15px rgba(255, 0, 255, 0.3)' : '0 0 8px rgba(128, 0, 128, 0.2)',
        animation: 'pulse 4s ease-in-out infinite'
      }}>
        <div style={{
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          right: '-2px',
          bottom: '-2px',
          background: `linear-gradient(45deg, ${darkMode ? '#ff00ff' : '#800080'}, transparent, ${darkMode ? '#ff00ff' : '#800080'})`,
          borderRadius: '8px',
          zIndex: -1,
          opacity: 0.3
        }} />
        <span style={{ fontSize: '24px', opacity: 0.6 }}>"</span>
        {quote}
        <span style={{ fontSize: '24px', opacity: 0.6 }}>"</span>
      </div>
    );
  };

  const renderParagraph = (paragraph: string, index: number) => {
    // Check if it's a mathematical equation
    if (paragraph.includes('\\mathbf') || paragraph.includes('\\langle') || paragraph.includes('\\frac') || paragraph.includes('=')) {
      return renderMathEquation(paragraph);
    }

    // Check if it's a quote (starts and ends with *)
    if (paragraph.startsWith('*') && paragraph.endsWith('*') && paragraph.length > 2) {
      return renderQuote(paragraph.slice(1, -1), index);
    }

    // Enhanced paragraph rendering with biofield styling
    const processedParagraph = paragraph.split(/(\*\*.*?\*\*)/).map((part, partIndex) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        const isSecret = entry.secrets.includes(boldText);
        
        return (
          <span
            key={partIndex}
            className={`biofield-secret ${isSecret ? 'interactive' : ''}`}
            onClick={isSecret ? () => handleSecretClick(boldText) : undefined}
            style={{
              fontWeight: 'bold',
              color: isSecret 
                ? (discoveredSecrets.includes(boldText) 
                  ? (darkMode ? '#00ff00' : '#006600')
                  : (darkMode ? '#ffff00' : '#cc6600'))
                : (darkMode ? '#ffffff' : '#000000'),
              cursor: isSecret ? 'pointer' : 'default',
              textShadow: isSecret ? `0 0 8px ${discoveredSecrets.includes(boldText) ? '#00ff00' : '#ffff00'}` : 'none',
              transition: 'all 0.3s ease',
              padding: isSecret ? '2px 4px' : '0',
              borderRadius: isSecret ? '3px' : '0',
              background: isSecret ? (discoveredSecrets.includes(boldText) 
                ? 'rgba(0, 255, 0, 0.1)' 
                : 'rgba(255, 255, 0, 0.1)') : 'transparent',
              border: isSecret ? `1px solid ${discoveredSecrets.includes(boldText) ? '#00ff00' : '#ffff00'}` : 'none',
              animation: isSecret && !discoveredSecrets.includes(boldText) ? 'flicker 2s infinite' : 'none'
            }}
          >
            {boldText}
          </span>
        );
      }
      
      // Handle italic text
      return part.split(/(\*.*?\*)/).map((italicPart, italicIndex) => {
        if (italicPart.startsWith('*') && italicPart.endsWith('*') && !italicPart.startsWith('**')) {
          return (
            <em 
              key={italicIndex} 
              style={{ 
                color: darkMode ? '#88ffff' : '#004488',
                fontStyle: 'italic',
                textShadow: darkMode ? '0 0 4px #88ffff' : 'none'
              }}
            >
              {italicPart.slice(1, -1)}
            </em>
          );
        }
        return italicPart;
      });
    });

    return (
      <div 
        key={index}
        className="biofield-paragraph"
        style={{
          fontFamily: 'Courier New, Monaco, monospace',
          fontSize: '16px',
          lineHeight: '1.8',
          marginBottom: '20px',
          padding: '12px 16px',
          background: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)',
          border: `1px solid ${darkMode ? '#333333' : '#cccccc'}`,
          borderRadius: '6px',
          color: darkMode ? '#cccccc' : '#333333',
          position: 'relative',
          letterSpacing: '0.2px',
          boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.5)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '4px',
          height: '100%',
          background: `linear-gradient(180deg, ${darkMode ? '#00ff00' : '#006600'}, transparent)`,
          borderRadius: '2px 0 0 2px'
        }} />
        {processedParagraph}
      </div>
    );
  };

  return (
    <div className="enhanced-content-formatter" style={{ position: 'relative' }}>
      {/* Enhanced Content */}
        <div className="biofield-content">
          {entry.content.split('\n\n').filter(p => p.trim()).map((paragraph, index) => {
            if (paragraph.trim() === '') return null;
            
            // Check if paragraph contains mathematical equations
            if (paragraph.includes('$') || paragraph.includes('\\')) {
              return renderMathEquation(paragraph, index);
            }
            
            // Check if paragraph is a quote (starts with > or contains quotation marks)
            if (paragraph.startsWith('>') || paragraph.includes('"')) {
              return renderQuote(paragraph.slice(paragraph.startsWith('>') ? 1 : 0).trim(), index);
            }
            
            // Regular paragraph with secret processing
            return renderParagraph(paragraph.trim(), index);
          }).filter(Boolean)}
        </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 15px rgba(255, 0, 255, 0.3); }
          50% { box-shadow: 0 0 25px rgba(255, 0, 255, 0.6); }
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .biofield-paragraph:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(0, 255, 0, 0.2);
        }
        
        .biofield-secret.interactive:hover {
          transform: scale(1.05);
          text-shadow: 0 0 12px currentColor;
        }
      `}</style>
    </div>
  );
};

export default EnhancedContentFormatter;