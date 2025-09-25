import React from 'react';

interface TimeDilationProps {
  isActive: boolean;
  onActivate: () => void;
  intensity: number;
}

const TimeDilation: React.FC<TimeDilationProps> = ({ isActive, onActivate, intensity }) => {
  return (
    <div className="time-dilation">
      <div 
        className="dilation-trigger"
        onClick={onActivate}
        style={{
          cursor: 'pointer',
          padding: '10px',
          border: '1px solid #333',
          borderRadius: '5px',
          backgroundColor: isActive ? '#1a1a1a' : 'transparent',
          color: isActive ? '#00ffff' : '#666',
          transition: 'all 0.3s ease'
        }}
      >
        <span>⏰ Time Dilation</span>
        {isActive && (
          <div className="dilation-display" style={{ marginTop: '10px', fontSize: '12px' }}>
            <div>Intensity: {intensity}%</div>
            <div>Status: Active</div>
            <div className="time-wave" style={{
              width: '100%',
              height: '20px',
              backgroundColor: '#000',
              borderRadius: '10px',
              overflow: 'hidden',
              marginTop: '5px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
                animation: 'timeWave 3s infinite ease-in-out',
                borderRadius: '10px'
              }}></div>
            </div>
          </div>
        )}
      </div>
      
      {isActive && (
        <div 
          className="dilation-overlay"
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            background: 'radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 1000,
            animation: 'dilationPulse 4s infinite ease-in-out'
          }}
        />
      )}
      
      <style>{`
        @keyframes timeWave {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes dilationPulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default TimeDilation;