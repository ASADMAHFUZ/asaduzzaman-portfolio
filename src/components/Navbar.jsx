import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MenuIcon } from './icons';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
];

function NavLink({ id, label, activeNav, onNavigate, linkRef }) {
  const isActive = activeNav === id;
  return (
    <a
      ref={linkRef}
      data-nav={id}
      className={`nav-link relative z-[1] px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-300 group${
        isActive ? ' is-active' : ''
      }`}
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(id);
      }}
    >
      <span
        className={`nav-label relative z-10 transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
        }`}
      >
        {label}
      </span>
    </a>
  );
}

export default function Navbar({ activeNav, menuOpen, setMenuOpen, onNavClick }) {
  const drawerRef = useRef(null);
  const toggleRef = useRef(null);
  const desktopListRef = useRef(null);
  const linkRefs = useRef({});
  const [pill, setPill] = useState({ x: 0, w: 0, ready: false });

  const onNavigate = (id) => {
    onNavClick(id);
    closeDrawer();
  };

  const openDrawer = () => {
    setMenuOpen(true);
    requestAnimationFrame(() => {
      drawerRef.current?.classList.add('is-open');
      toggleRef.current?.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    });
  };

  const closeDrawer = () => {
    drawerRef.current?.classList.remove('is-open');
    toggleRef.current?.classList.remove('menu-open');
    document.body.style.overflow = '';
    setTimeout(() => setMenuOpen(false), 280);
  };

  const toggleMenu = () => {
    if (menuOpen) closeDrawer();
    else openDrawer();
  };

  useLayoutEffect(() => {
    const updatePill = () => {
      const list = desktopListRef.current;
      const active = linkRefs.current[activeNav];
      if (!list || !active) return;

      const listRect = list.getBoundingClientRect();
      const itemRect = active.getBoundingClientRect();
      const next = {
        x: itemRect.left - listRect.left,
        w: itemRect.width,
        ready: true,
      };
      setPill((prev) =>
        prev.x === next.x && prev.w === next.w && prev.ready === next.ready ? prev : next,
      );
    };

    updatePill();
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [activeNav]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && menuOpen) closeDrawer();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      drawerRef.current?.classList.remove('is-open');
      toggleRef.current?.classList.remove('menu-open');
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <>
      <header className="w-full fixed top-0 z-50 flex justify-center pointer-events-none">
        <nav className="pointer-events-auto mt-4 mx-4 px-2 sm:px-3 h-[56px] flex items-center rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.06] overflow-hidden">
          <div className="md:hidden px-2">
            <button
              ref={toggleRef}
              id="menu-toggle"
              type="button"
              aria-label="Open menu"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] hover:border-[#FF8D5E]/30 transition-all duration-300"
              onClick={toggleMenu}
            >
              <MenuIcon />
            </button>
          </div>
          <div ref={desktopListRef} className="nav-list relative hidden md:flex items-center gap-1 overflow-hidden">
            <span
              className={`nav-slider${pill.ready ? ' is-ready' : ''}`}
              style={{
                width: pill.ready ? `${pill.w}px` : 0,
                transform: `translateX(${pill.x}px)`,
              }}
              aria-hidden="true"
            />
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                id={item.id}
                label={item.label}
                activeNav={activeNav}
                onNavigate={onNavClick}
                linkRef={(el) => {
                  linkRefs.current[item.id] = el;
                }}
              />
            ))}
          </div>
        </nav>
      </header>

      <div
        id="drawer"
        ref={drawerRef}
        className="drawer-root"
        hidden={!menuOpen ? true : undefined}
      >
        <div className="drawer-mask" onClick={closeDrawer} role="presentation" />
        <div className="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              id={item.id}
              label={item.label}
              activeNav={activeNav}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </>
  );
}
