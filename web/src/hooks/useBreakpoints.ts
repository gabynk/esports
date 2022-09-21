import { useState, useEffect } from 'react';

export function useBreakpoint() {
  const [breakpoint, setBreakPoint] = useState(0);

  const handleResize = () => {
    setBreakPoint(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  
  return breakpoint;
};