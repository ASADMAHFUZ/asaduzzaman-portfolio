import { useCallback, useEffect, useRef, useState } from 'react';

const SECTIONS = ['home', 'about', 'skills', 'portfolio', 'contact'];

export function useScrollSpy() {
  const [activeNav, setActiveNavState] = useState('home');
  const activeRef = useRef('home');
  const lockUntilRef = useRef(0);

  const setActiveNav = useCallback((id) => {
    activeRef.current = id;
    setActiveNavState(id);
    // Keep scroll-spy from fighting smooth scroll after a click
    lockUntilRef.current = performance.now() + 900;
  }, []);

  useEffect(() => {
    let ticking = false;

    const pick = () => {
      ticking = false;
      if (performance.now() < lockUntilRef.current) return;

      const marker = window.scrollY + Math.min(160, window.innerHeight * 0.28);
      let next = 'home';

      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        // Hysteresis: require the section to be clearly under the marker
        if (el.offsetTop - 12 <= marker) next = id;
      }

      if (next !== activeRef.current) {
        activeRef.current = next;
        setActiveNavState(next);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(pick);
    };

    pick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return [activeNav, setActiveNav];
}
