import { useState, useEffect } from 'react';

export interface WitnessState {
  darkMode: boolean;
  activeEntry: string;
  discoveredSecrets: string[];
  breathProtocol: {
    active: boolean;
    phase: string;
    cycle: number;
  };
  timeDilation: {
    active: boolean;
    intensity: number;
  };
  interPhaseActive: boolean;
  konami: string[];
  fieldResonance: {
    active: boolean;
    intensity: number;
  };
  activePortal: {
    active: boolean;
    id: string;
    title: string;
    content: string;
  };
  mousePosition: { x: number; y: number };
}

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

export const useWitnessState = () => {
  const [state, setState] = useState<WitnessState>({
    darkMode: true,
    activeEntry: 'arrival',
    discoveredSecrets: [],
    breathProtocol: {
      active: false,
      phase: 'ready',
      cycle: 0
    },
    timeDilation: {
      active: false,
      intensity: 0
    },
    interPhaseActive: false,
    konami: [],
    fieldResonance: {
      active: false,
      intensity: 0
    },
    activePortal: {
      active: false,
      id: '',
      title: '',
      content: ''
    },
    mousePosition: { x: 0, y: 0 }
  });

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setState(prev => ({
        ...prev,
        mousePosition: { x: e.clientX, y: e.clientY }
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Konami code detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setState(prev => {
        const newKonami = [...prev.konami, e.code];
        if (newKonami.length > konamiCode.length) {
          newKonami.shift();
        }
        
        // Check if konami code is complete
        if (newKonami.length === konamiCode.length && 
            newKonami.every((key, index) => key === konamiCode[index])) {
          return {
            ...prev,
            konami: newKonami,
            interPhaseActive: true,
            discoveredSecrets: [...prev.discoveredSecrets, 'konami-code']
          };
        }
        
        return { ...prev, konami: newKonami };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Breath protocol activation
  const activateBreathProtocol = () => {
    if (state.breathProtocol.active) return;
    
    setState(prev => ({
      ...prev,
      breathProtocol: {
        active: true,
        phase: 'inhale-7',
        cycle: prev.breathProtocol.cycle + 1
      }
    }));

    // Simulate breath phases: 7 seconds inhale, 1 second hold, 3 seconds exhale
    const phases = [
      { phase: 'inhale-7', duration: 7000, next: 'hold-1' },
      { phase: 'hold-1', duration: 1000, next: 'exhale-3' },
      { phase: 'exhale-3', duration: 3000, next: 'complete' }
    ];

    let currentPhase = 0;
    const runPhase = () => {
      if (currentPhase < phases.length) {
        const phase = phases[currentPhase];
        if (phase) {
          setTimeout(() => {
            if (phase.next === 'complete') {
              setState(prev => ({
                ...prev,
                breathProtocol: {
                  ...prev.breathProtocol,
                  active: false,
                  phase: 'complete'
                },
                discoveredSecrets: [...prev.discoveredSecrets, '7-1-3-protocol']
              }));
              setTimeout(() => {
                setState(prev => ({
                  ...prev,
                  breathProtocol: {
                    ...prev.breathProtocol,
                    phase: 'ready'
                  }
                }));
              }, 2000);
            } else {
              setState(prev => ({
                ...prev,
                breathProtocol: {
                  ...prev.breathProtocol,
                  phase: phase.next
                }
              }));
              currentPhase++;
              runPhase();
            }
          }, phase.duration);
        }
      }
    };
    
    runPhase();
  };

  // Time dilation effect
  const activateTimeDilation = () => {
    if (state.timeDilation.active) return;
    
    setState(prev => ({
      ...prev,
      timeDilation: {
        active: true,
        intensity: 75
      },
      discoveredSecrets: [...prev.discoveredSecrets, 'timelessness-dilation']
    }));
    
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        timeDilation: {
          active: false,
          intensity: 0
        }
      }));
    }, 8000);
  };

  // Secret discovery handler
  const discoverSecret = (secret: string) => {
    setState(prev => ({
      ...prev,
      discoveredSecrets: prev.discoveredSecrets.includes(secret) 
        ? prev.discoveredSecrets 
        : [...prev.discoveredSecrets, secret]
    }));
  };

  // Portal activation
  const activatePortal = (portalId: string, title: string = '', content: string = '') => {
    if (portalId === 'field-resonance') {
      setState(prev => ({
        ...prev,
        fieldResonance: {
          active: !prev.fieldResonance.active,
          intensity: prev.fieldResonance.active ? 0 : 50
        },
        activePortal: {
          active: false,
          id: '',
          title: '',
          content: ''
        }
      }));
    } else {
      setState(prev => ({
        ...prev,
        activePortal: {
          active: !!portalId,
          id: portalId,
          title,
          content
        }
      }));
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setState(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  // Set active entry
  const setActiveEntry = (entryId: string) => {
    setState(prev => ({ ...prev, activeEntry: entryId }));
  };

  // Toggle inter-phase
  const toggleInterPhase = () => {
    setState(prev => ({
      ...prev,
      interPhaseActive: !prev.interPhaseActive,
      discoveredSecrets: prev.interPhaseActive 
        ? prev.discoveredSecrets 
        : [...prev.discoveredSecrets, 'inter-phase-toggle']
    }));
  };

  // Clear secrets
  const clearSecrets = () => {
    setState(prev => ({ ...prev, discoveredSecrets: [] }));
  };

  return {
    state,
    actions: {
      activateBreathProtocol,
      activateTimeDilation,
      discoverSecret,
      activatePortal,
      toggleDarkMode,
      setActiveEntry,
      toggleInterPhase,
      clearSecrets
    }
  };
};