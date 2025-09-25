import React from 'react';
import { useWitnessState } from '../hooks/useWitnessState';
import { witnessJournalEntries } from '../data/witnessJournalEntries';
import BreathProtocol from './BreathProtocol';
import TimeDilation from './TimeDilation';
import PortalOverlay from './PortalOverlay';
import InteractiveElements from './InteractiveElements';
import FieldResonance from './FieldResonance';

const WitnessInterface: React.FC = () => {
  // Destructure state and actions from the hook
  const { state, actions } = useWitnessState();
  
  // Further destructure for easier access
  const {
    darkMode,
    activeEntry,
    discoveredSecrets,
    breathProtocol,
    timeDilation,
    interPhaseActive,
    fieldResonance,
    activePortal,
    mousePosition,
    konami
  } = state;
  
  const {
    activateBreathProtocol,
    activateTimeDilation,
    discoverSecret,
    activatePortal: activatePortalAction,
    toggleDarkMode,
    setActiveEntry,
    toggleInterPhase,
    clearSecrets
  } = actions;
  
  // Get current entry and check if konami is activated
  const currentEntry = witnessJournalEntries.find(entry => entry.id === activeEntry) || witnessJournalEntries[0];
  const konamiActivated = konami.length === 10;

  // Early return if no entries exist (shouldn't happen in normal operation)
  if (!currentEntry) {
    return <div>No journal entries available</div>;
  }

  return (
    <div 
      className={`witness-interface ${darkMode ? 'dark-mode' : ''} ${interPhaseActive ? 'inter-phase' : ''}`}
      style={{
        minHeight: '100vh',
        background: darkMode 
          ? 'linear-gradient(135deg, #0a0a0a, #1a1a1a)' 
          : 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
        color: darkMode ? '#ccc' : '#333',
        fontFamily: 'Courier New, monospace',
        transition: 'all 0.5s ease',
        position: 'relative',
        overflow: interPhaseActive ? 'hidden' : 'auto'
      }}
    >
      {/* Field Resonance Effect */}
      <FieldResonance isActive={fieldResonance.active} mousePosition={mousePosition} />

      {/* Header with Hidden Triggers */}
      <header style={{
        padding: '15px 10px',
        borderBottom: `2px solid ${darkMode ? '#333' : '#ccc'}`,
        position: 'relative'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <h1 
            style={{ 
              fontSize: 'clamp(18px, 4vw, 24px)', 
              fontWeight: 'bold',
              cursor: 'pointer',
              margin: '0',
              minWidth: '200px'
            }}
            onClick={() => setActiveEntry('arrival')}
          >
            🌟 WitnessOS Tracker
          </h1>
          
          <div style={{ 
            display: 'flex', 
            gap: 'clamp(8px, 2vw, 15px)', 
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            {/* Konami Code Indicator */}
            {konamiActivated && (
              <span style={{ 
                color: '#ff00ff', 
                fontSize: 'clamp(10px, 2.5vw, 12px)',
                whiteSpace: 'nowrap'
              }}>
                ↑↑↓↓←→←→BA
              </span>
            )}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              style={{
                background: 'none',
                border: `1px solid ${darkMode ? '#666' : '#999'}`,
                color: darkMode ? '#ccc' : '#333',
                padding: 'clamp(4px, 1vw, 5px) clamp(8px, 2vw, 10px)',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: 'clamp(14px, 3vw, 16px)',
                minHeight: '36px',
                minWidth: '36px'
              }}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Inter-Phase Toggle */}
            <button
              onClick={toggleInterPhase}
              style={{
              background: interPhaseActive ? 'rgba(255, 0, 255, 0.2)' : 'none',
              border: `1px solid ${interPhaseActive ? '#ff00ff' : (darkMode ? '#666' : '#999')}`,
              color: interPhaseActive ? '#ff00ff' : (darkMode ? '#ccc' : '#333'),
                padding: 'clamp(4px, 1vw, 5px) clamp(8px, 2vw, 10px)',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                minHeight: '36px',
                whiteSpace: 'nowrap'
              }}
            >
              ⚡ Inter-Phase
            </button>
          </div>
        </div>

        {/* Number Sequence Display */}
        <div style={{
          marginTop: 'clamp(10px, 2vw, 15px)',
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(4px, 1vw, 8px)',
          flexWrap: 'wrap',
          padding: '0 5px'
        }}>
          {witnessJournalEntries.map((entry, index) => (
            <span
              key={entry.id}
              style={{
                fontSize: 'clamp(14px, 3vw, 18px)',
                fontWeight: activeEntry === entry.id ? 'bold' : 'normal',
                color: activeEntry === entry.id 
                  ? '#00ff00' 
                  : (darkMode ? '#666' : '#999'),
                cursor: 'pointer',
                padding: 'clamp(3px, 1vw, 4px) clamp(6px, 1.5vw, 8px)',
                borderRadius: '4px',
                background: activeEntry === entry.id 
                  ? 'rgba(0, 255, 0, 0.1)' 
                  : 'transparent',
                transition: 'all 0.3s ease',
                minWidth: 'clamp(24px, 5vw, 32px)',
                minHeight: 'clamp(24px, 5vw, 32px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'manipulation'
              }}
              onClick={() => setActiveEntry(entry.id)}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main style={{ 
        padding: 'clamp(20px, 5vw, 30px) clamp(16px, 4vw, 20px) clamp(80px, 20vw, 120px) clamp(16px, 4vw, 20px)',
        minHeight: '100vh',
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          maxWidth: 'min(800px, 95vw)', 
          margin: '0 auto',
          width: '100%'
        }}>
          {/* Entry Header */}
          <div style={{
            marginBottom: 'clamp(20px, 5vw, 30px)',
            textAlign: 'center',
            padding: 'clamp(16px, 4vw, 20px)',
            background: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
            borderRadius: '15px',
            border: `2px solid ${darkMode ? '#333' : '#ccc'}`,
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          }}>
            <h2 style={{
              fontSize: 'clamp(20px, 5vw, 28px)',
              marginBottom: 'clamp(8px, 2vw, 10px)',
              color: darkMode ? '#00ff00' : '#006600',
              lineHeight: '1.2',
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}>
              {currentEntry.symbol} {currentEntry.title}
            </h2>
          </div>

          {/* Interactive Elements */}
          <InteractiveElements
            entry={currentEntry}
            onSecretDiscover={discoverSecret}
            discoveredSecrets={discoveredSecrets}
          />

          {/* Protocol Controls */}
          <div style={{
            marginTop: 'clamp(30px, 6vw, 40px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 45vw, 250px), 1fr))',
            gap: 'clamp(16px, 4vw, 20px)'
          }}>
            <BreathProtocol
              isActive={breathProtocol.active}
              onActivate={activateBreathProtocol}
              phase={breathProtocol.phase}
            />
            
            <TimeDilation
              isActive={timeDilation.active}
              onActivate={activateTimeDilation}
              intensity={timeDilation.intensity}
            />

            <button
              onClick={() => activatePortalAction('field-resonance', 'Field Resonance Portal', 'The field responds to your presence...')}
              style={{
                padding: 'clamp(12px, 3vw, 15px)',
                background: fieldResonance.active ? 'rgba(0, 255, 0, 0.2)' : 'none',
                border: `1px solid ${fieldResonance.active ? '#00ff00' : '#666'}`,
                borderRadius: '5px',
                color: fieldResonance.active ? '#00ff00' : '#666',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: 'clamp(14px, 3vw, 16px)',
                minHeight: '44px',
                touchAction: 'manipulation'
              }}
            >
              🌐 Field Resonance
            </button>
          </div>

          {/* Discovered Secrets Panel */}
          {discoveredSecrets.length > 0 && (
            <div style={{
              marginTop: 'clamp(30px, 6vw, 40px)',
              padding: 'clamp(16px, 4vw, 20px)',
              background: darkMode ? 'rgba(0, 255, 0, 0.1)' : 'rgba(0, 100, 0, 0.1)',
              border: `1px solid ${darkMode ? '#00ff00' : '#006600'}`,
              borderRadius: '10px'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: 'clamp(12px, 3vw, 15px)',
                flexWrap: 'wrap',
                gap: 'clamp(8px, 2vw, 12px)'
              }}>
                <h3 style={{ 
                  color: darkMode ? '#00ff00' : '#006600',
                  fontSize: 'clamp(16px, 4vw, 18px)',
                  margin: '0'
                }}>
                  🔓 Discovered Secrets ({discoveredSecrets.length})
                </h3>
                <button
                  onClick={clearSecrets}
                  style={{
                    background: 'none',
                    border: `1px solid ${darkMode ? '#666' : '#999'}`,
                    color: darkMode ? '#ccc' : '#333',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Clear All
                </button>
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {discoveredSecrets.map((secret, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '4px 8px',
                      background: darkMode ? 'rgba(0, 255, 0, 0.2)' : 'rgba(0, 100, 0, 0.2)',
                      border: `1px solid ${darkMode ? '#00ff00' : '#006600'}`,
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: darkMode ? '#00ff00' : '#006600'
                    }}
                  >
                    {secret}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation Controls */}
      <footer style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        padding: 'clamp(12px, 3vw, 20px)',
        background: darkMode 
          ? 'linear-gradient(to top, rgba(10, 10, 10, 0.95), rgba(10, 10, 10, 0.8))' 
          : 'linear-gradient(to top, rgba(240, 240, 240, 0.95), rgba(240, 240, 240, 0.8))',
        backdropFilter: 'blur(10px)',
        borderTop: `1px solid ${darkMode ? '#333' : '#ccc'}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 'clamp(8px, 2vw, 16px)',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => {
            const currentIndex = witnessJournalEntries.findIndex(entry => entry.id === activeEntry);
            if (currentIndex > 0) {
              setActiveEntry(witnessJournalEntries[currentIndex - 1].id);
            }
          }}
          disabled={witnessJournalEntries.findIndex(entry => entry.id === activeEntry) === 0}
          style={{
            background: 'none',
            border: `1px solid ${darkMode ? '#666' : '#999'}`,
            color: darkMode ? '#ccc' : '#333',
            padding: 'clamp(8px, 2vw, 10px) clamp(16px, 4vw, 20px)',
            borderRadius: '25px',
            cursor: witnessJournalEntries.findIndex(entry => entry.id === activeEntry) === 0 ? 'not-allowed' : 'pointer',
            fontSize: 'clamp(14px, 3vw, 16px)',
            opacity: witnessJournalEntries.findIndex(entry => entry.id === activeEntry) === 0 ? 0.5 : 1,
            transition: 'all 0.3s ease',
            minHeight: '44px',
            minWidth: 'clamp(80px, 20vw, 120px)',
            touchAction: 'manipulation',
            whiteSpace: 'nowrap'
          }}
        >
          ← Previous
        </button>

        <div style={{
          fontSize: 'clamp(12px, 2.5vw, 14px)',
          color: darkMode ? '#666' : '#999',
          textAlign: 'center',
          padding: '0 clamp(8px, 2vw, 16px)',
          whiteSpace: 'nowrap',
          order: window.innerWidth < 480 ? 3 : 0,
          flexBasis: window.innerWidth < 480 ? '100%' : 'auto'
        }}>
          {witnessJournalEntries.findIndex(entry => entry.id === activeEntry) + 1} of {witnessJournalEntries.length}
        </div>

        <button
          onClick={() => {
            const currentIndex = witnessJournalEntries.findIndex(entry => entry.id === activeEntry);
            if (currentIndex < witnessJournalEntries.length - 1) {
              setActiveEntry(witnessJournalEntries[currentIndex + 1].id);
            }
          }}
          disabled={witnessJournalEntries.findIndex(entry => entry.id === activeEntry) === witnessJournalEntries.length - 1}
          style={{
            background: 'none',
            border: `1px solid ${darkMode ? '#666' : '#999'}`,
            color: darkMode ? '#ccc' : '#333',
            padding: 'clamp(8px, 2vw, 10px) clamp(16px, 4vw, 20px)',
            borderRadius: '25px',
            cursor: witnessJournalEntries.findIndex(entry => entry.id === activeEntry) === witnessJournalEntries.length - 1 ? 'not-allowed' : 'pointer',
            fontSize: 'clamp(14px, 3vw, 16px)',
            opacity: witnessJournalEntries.findIndex(entry => entry.id === activeEntry) === witnessJournalEntries.length - 1 ? 0.5 : 1,
            transition: 'all 0.3s ease',
            minHeight: '44px',
            minWidth: 'clamp(80px, 20vw, 120px)',
            touchAction: 'manipulation',
            whiteSpace: 'nowrap'
          }}
        >
          Next →
        </button>
      </footer>

      {/* Portal Overlay */}
      <PortalOverlay
        isActive={activePortal.active}
        onClose={() => activatePortalAction('', '', '')}
        title={activePortal.title}
        content={activePortal.content}
      />

      {/* Global Styles */}
      <style>{`
        .witness-interface.inter-phase {
          animation: interPhaseFlicker 0.1s infinite;
        }
        
        @keyframes interPhaseFlicker {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(180deg); }
        }
        
        .witness-interface button:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        .witness-interface .mystical-card {
          transition: all 0.3s ease;
        }
        
        .witness-interface .mystical-card:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 20px rgba(0, 255, 0, 0.2);
        }

        /* Number sequence hover effects */
        .witness-interface span:hover {
          transform: scale(1.1);
          text-shadow: 0 0 8px currentColor;
        }

        /* Footer navigation hover effects */
        .witness-interface footer button:hover:not(:disabled) {
          background: rgba(0, 255, 0, 0.1);
          border-color: #00ff00;
          color: #00ff00;
          text-shadow: 0 0 4px currentColor;
        }
      `}</style>
    </div>
  );
};

export default WitnessInterface;