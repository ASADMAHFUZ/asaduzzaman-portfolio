import { useEffect, useState } from 'react';

const SECTIONS = ['home', 'about', 'skills', 'portfolio', 'contact'];

export function useScrollSpy() {
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const pick = () => {
      const marker = window.scrollY + 140;
      let current = 'home';
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= marker) current = id;
      });
      setActiveNav(current);
    };

    pick();
    window.addEventListener('scroll', pick, { passive: true });
    return () => window.removeEventListener('scroll', pick);
  }, []);

  return [activeNav, setActiveNav];
}