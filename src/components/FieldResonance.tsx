import React, { useEffect, useState } from 'react';

interface FieldResonanceProps {
  isActive: boolean;
  mousePosition: { x: number; y: number };
}

const FieldResonance: React.FC<FieldResonanceProps> = ({ isActive, mousePosition }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([]);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    const interval = setInterval(() => {
      setParticles(prev => {
        // Add new particle at mouse position
        const newParticle = {
          id: Date.now(),
          x: mousePosition.x,
          y: mousePosition.y,
          opacity: 1
        };

        // Update existing particles (fade out)
        const updatedParticles = prev
          .map(particle => ({
            ...particle,
            opacity: particle.opacity - 0.05
          }))
          .filter(particle => particle.opacity > 0);

        return [...updatedParticles, newParticle].slice(-20); // Keep max 20 particles
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isActive, mousePosition]);

  if (!isActive) return null;

  return (
    <div 
      className="field-resonance"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 500
      }}
    >
      {/* Mouse trail particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: particle.x - 2,
            top: particle.y - 2,
            width: '4px',
            height: '4px',
            background: `rgba(0, 255, 0, ${particle.opacity})`,
            borderRadius: '50%',
            boxShadow: `0 0 ${particle.opacity * 10}px rgba(0, 255, 0, ${particle.opacity})`,
            transition: 'opacity 0.1s ease-out'
          }}
        />
      ))}

      {/* Field grid overlay */}
      <div 
        className="field-grid"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'fieldPulse 4s infinite ease-in-out'
        }}
      />

      {/* Central resonance point */}
      <div
        style={{
          position: 'absolute',
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          width: '40px',
          height: '40px',
          border: '2px solid rgba(0, 255, 0, 0.5)',
          borderRadius: '50%',
          animation: 'resonancePulse 2s infinite ease-in-out'
        }}
      />

      <style>{`
        @keyframes fieldPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes resonancePulse {
          0% { 
            transform: scale(1);
            opacity: 0.5;
          }
          50% { 
            transform: scale(1.5);
            opacity: 0.8;
          }
          100% { 
            transform: scale(1);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default FieldResonance;