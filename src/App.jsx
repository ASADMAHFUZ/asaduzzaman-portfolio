import { useCallback, useRef, useState } from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Toast from './components/Toast';
import { useClickSound } from './hooks/useClickSound';
import { useReveal } from './hooks/useReveal';
import { useScrollSpy } from './hooks/useScrollSpy';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useScrollSpy();
  const [toast, setToast] = useState({ type: '', message: '', show: false });
  const toastTimerRef = useRef(null);

  useReveal();
  useClickSound();

  const showToast = useCallback((type, message) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ type, message, show: true });
    toastTimerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3200);
  }, []);

  const onNavClick = useCallback(
    (id) => {
      setActiveNav(id);
      setMenuOpen(false);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    },
    [setActiveNav],
  );

  return (
    <div className="bg-[#212428] antialiased">
      <Toast toast={toast} />
      <div className="bg-[#212428]">
        <Navbar
          activeNav={activeNav}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          onNavClick={onNavClick}
        />
        <div className="overflow-x-hidden">
          <Hero onNavClick={onNavClick} />
          <About />
          <Skills />
          <Portfolio />
          <Contact showToast={showToast} />
          <Footer />
        </div>
      </div>
    </div>
  );
}