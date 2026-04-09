import { useEffect, useRef } from 'react';

export function useProctoring(examId: string) {
  const tabSwitches = useRef(0);
  const fullscreenExits = useRef(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        tabSwitches.current += 1;
        console.warn(`Tab switch detected! Total: ${tabSwitches.current}`);
        
        // Log to server
        fetch(`/api/candidate/exams/${examId}/log`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'TAB_SWITCH', count: tabSwitches.current }),
        });
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        fullscreenExits.current += 1;
        console.warn(`Fullscreen exit detected! Total: ${fullscreenExits.current}`);
        
        // Log to server
        fetch(`/api/candidate/exams/${examId}/log`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'FULLSCREEN_EXIT', count: fullscreenExits.current }),
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [examId]);

  return { 
    getStats: () => ({ 
      tabSwitches: tabSwitches.current, 
      fullscreenExits: fullscreenExits.current 
    }) 
  };
}
