import React from 'react';

interface BreathProtocolProps {
  isActive: boolean;
  onActivate: () => void;
  phase: string;
}

const BreathProtocol: React.FC<BreathProtocolProps> = ({ isActive, onActivate, phase }) => {
  return (
    <div className="breath-protocol">
      <div 
        className="protocol-trigger"
        onClick={onActivate}
        style={{
          cursor: 'pointer',
          padding: '10px',
          border: '1px solid #333',
          borderRadius: '5px',
          backgroundColor: isActive ? '#1a1a1a' : 'transparent',
          color: isActive ? '#00ff00' : '#666',
          transition: 'all 0.3s ease'
        }}
      >
        <span>🫁 Breath Protocol</span>
        {isActive && (
          <div className="breath-display" style={{ marginTop: '10px', fontSize: '12px' }}>
            <div>Phase: {phase}</div>
            <div>Pattern: 7-1-3</div>
            <div className="breath-animation" style={{
              width: '100%',
              height: '4px',
              backgroundColor: '#333',
              borderRadius: '2px',
              overflow: 'hidden',
              marginTop: '5px'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#00ff00',
                animation: 'breathPulse 11s infinite',
                borderRadius: '2px'
              }}></div>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes breathPulse {
          0% { transform: scaleX(0); }
          63.6% { transform: scaleX(1); }
          72.7% { transform: scaleX(1); }
          100% { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
};

export default BreathProtocol;