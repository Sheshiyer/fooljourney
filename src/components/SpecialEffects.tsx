import React, { useEffect, useState } from 'react';
import type { UserState } from '../types';

interface SpecialEffectsProps {
  userState: UserState;
  onStateChange: (updates: Partial<UserState>) => void;
}

export function SpecialEffects({ userState, onStateChange }: SpecialEffectsProps) {
  const [konamiCode] = useState([38, 38, 40, 40, 37, 39, 37, 39, 66, 65]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      onStateChange({
        mousePosition: { x: e.clientX, y: e.clientY }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [onStateChange]);

  // Konami code detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const expectedKey = konamiCode[userState.konamiProgress];
      if (e.keyCode === expectedKey) {
        const newProgress = userState.konamiProgress + 1;
        if (newProgress === konamiCode.length) {
          onStateChange({ 
            konamiProgress: 0, 
            portalActive: true 
          });
        } else {
          onStateChange({ konamiProgress: newProgress });
        }
      } else {
        onStateChange({ konamiProgress: 0 });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [userState.konamiProgress, konamiCode, onStateChange]);

  const breathProtocol = () => {
    onStateChange({ breathActive: !userState.breathActive });
    setTimeout(() => {
      onStateChange({ breathActive: false });
    }, 10000);
  };

  const timeDilation = () => {
    onStateChange({ timeDilationActive: !userState.timeDilationActive });
    setTimeout(() => {
      onStateChange({ timeDilationActive: false });
    }, 8000);
  };

  const activatePortal = () => {
    onStateChange({ portalActive: true });
  };

  const closePortal = () => {
    onStateChange({ portalActive: false });
  };

  return (
    <>
      {/* Field Resonance Overlay */}
      <div 
        className="field-resonance"
        style={{
          background: `radial-gradient(circle at ${userState.mousePosition.x}px ${userState.mousePosition.y}px, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
        }}
      />

      {/* Time Dilation Effect */}
      {userState.timeDilationActive && (
        <div className="time-dilation" />
      )}

      {/* Breath Protocol Effect */}
      {userState.breathActive && (
        <div className="fixed inset-0 pointer-events-none z-20">
          <div className="w-full h-full bg-gradient-radial from-blue-500/10 via-transparent to-transparent animate-pulse-slow" />
        </div>
      )}

      {/* Portal Overlay */}
      {userState.portalActive && (
        <div className="portal-overlay" onClick={closePortal}>
          <div className="mystical-card p-12 max-w-md text-center">
            <div className="text-6xl mb-4 animate-spin">🌀</div>
            <h2 className="text-2xl font-bold text-purple-200 mb-4">
              Portal Activated
            </h2>
            <p className="text-purple-300 mb-6">
              The veil between worlds grows thin. What do you seek in the spaces between?
            </p>
            <button 
              onClick={closePortal}
              className="mystical-button"
            >
              Close Portal
            </button>
          </div>
        </div>
      )}

      {/* Hidden Triggers */}
      <div className="fixed bottom-4 right-4 space-y-2 opacity-20 hover:opacity-100 transition-opacity">
        <button
          onClick={breathProtocol}
          className="block w-12 h-12 bg-blue-600/20 rounded-full hover:bg-blue-600/40 transition-colors"
          title="Breath Protocol"
        >
          🫁
        </button>
        <button
          onClick={timeDilation}
          className="block w-12 h-12 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition-colors"
          title="Time Dilation"
        >
          ⏰
        </button>
        <button
          onClick={activatePortal}
          className="block w-12 h-12 bg-indigo-600/20 rounded-full hover:bg-indigo-600/40 transition-colors"
          title="Activate Portal"
        >
          🌀
        </button>
      </div>
    </>
  );
}