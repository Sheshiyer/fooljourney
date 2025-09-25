import React from 'react';

interface PortalOverlayProps {
  isActive: boolean;
  onClose: () => void;
  content: string;
  title: string;
}

const PortalOverlay: React.FC<PortalOverlayProps> = ({ isActive, onClose, content, title }) => {
  if (!isActive) return null;

  return (
    <div 
      className="portal-overlay"
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        animation: 'portalFadeIn 0.5s ease-out'
      }}
      onClick={onClose}
    >
      <div 
        className="portal-content"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
          border: '2px solid #00ff00',
          borderRadius: '15px',
          padding: '30px',
          maxWidth: '80%',
          maxHeight: '80%',
          overflow: 'auto',
          position: 'relative',
          animation: 'portalSlideIn 0.5s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            background: 'none',
            border: 'none',
            color: '#00ff00',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          ×
        </button>
        
        <h2 style={{
          color: '#00ff00',
          marginBottom: '20px',
          fontSize: '24px',
          textAlign: 'center'
        }}>
          {title}
        </h2>
        
        <div style={{
          color: '#ccc',
          lineHeight: '1.6',
          fontSize: '16px',
          whiteSpace: 'pre-wrap'
        }}>
          {content}
        </div>
        
        <div 
          className="portal-glow"
          style={{
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            background: 'linear-gradient(45deg, #00ff00, #00ffff, #ff00ff, #00ff00)',
            borderRadius: '15px',
            zIndex: -1,
            animation: 'portalGlow 3s infinite linear'
          }}
        />
      </div>
      
      <style>{`
        @keyframes portalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes portalSlideIn {
          from { 
            transform: scale(0.8) translateY(-50px);
            opacity: 0;
          }
          to { 
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes portalGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default PortalOverlay;