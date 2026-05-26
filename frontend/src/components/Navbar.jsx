import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert } from 'lucide-react';

const Navbar = ({ onNavigate, currentPath, onViewResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  // Monitor scroll to highlight active navigation link
  useEffect(() => {
    if (currentPath !== '/') return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (currentPath !== '/') {
      onNavigate('/');
      // Wait for path change render, then scroll
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-8 left-0 right-0 z-50 flex items-center justify-center w-full px-margin-mobile md:px-margin-desktop">
      <nav
        aria-label="Main Navigation"
        className="bg-background/70 backdrop-blur-[-20px] rounded-full mx-auto w-full max-w-5xl px-6 md:px-8 py-4 border border-glass-border flex items-center justify-between shadow-lg"      >
        <a
          className="font-display-xl text-lg md:text-xl tracking-tighter text-on-surface hover:text-electric-blue transition-colors duration-300 cursor-pointer"
          onClick={(e) => handleAnchorClick(e, '#hero')}
        >
          SAIKRISHNA
        </a>

        {/* Desktop Navigation Links */}
        {currentPath === '/' ? (
          <div className="hidden md:flex items-center gap-6 font-label-caps text-[11px] tracking-[0.1em] uppercase">
            {navLinks.map((link) => (
              <a
                key={link.name}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={`transition-colors duration-300 nav-underline cursor-pointer ${activeSection === link.href.slice(1)
                  ? 'text-electric-blue nav-active'
                  : 'text-soft-gray hover:text-electric-blue'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-6 font-label-caps text-[11px] tracking-[0.1em] uppercase">
            <a
              onClick={() => onNavigate('/')}
              className="text-soft-gray hover:text-electric-blue transition-colors duration-300 cursor-pointer"
            >
              ← Back to Portfolio
            </a>
          </div>
        )}

        <div className="flex items-center gap-4">
          {/* Admin Login Link */}
          <button
            onClick={() => onNavigate(currentPath === '/admin' ? '/' : '/admin')}
            className="text-soft-gray hover:text-electric-blue p-2 rounded-full border border-transparent hover:border-glass-border transition-all duration-300"
            title="Admin Panel"
          >
            <ShieldAlert size={18} />
          </button>

          {/* Resume link */}
          <button
            onClick={onViewResume}
            className="hidden md:flex items-center justify-center font-label-caps text-[11px] tracking-[0.1em] text-on-surface border border-glass-border rounded-full px-6 py-2 hover:text-electric-blue hover:border-electric-blue transition-all duration-300 hover:scale-105 ease-out"
          >
            Resume
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden text-on-surface p-1 hover:text-electric-blue transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile drop-down Menu */}
      {isOpen && (
        <div className="absolute top-24 left-margin-mobile right-margin-mobile bg-background/95 backdrop-blur-2xl border border-glass-border rounded-3xl p-6 flex flex-col gap-6 md:hidden shadow-2xl animate-fade-in">
          {currentPath === '/' ? (
            <div className="flex flex-col gap-4 font-label-caps text-xs tracking-wider uppercase">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={`py-2 px-4 rounded-xl border border-transparent transition-all ${activeSection === link.href.slice(1)
                    ? 'text-on-surface bg-electric-blue/20 border-electric-blue/30'
                    : 'text-soft-gray hover:text-on-surface'
                    } cursor-pointer`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          ) : (
            <a
              onClick={() => { setIsOpen(false); onNavigate('/'); }}
              className="py-2 px-4 text-soft-gray hover:text-on-surface font-label-caps text-xs tracking-wider uppercase cursor-pointer"
            >
              ← Back to Portfolio
            </a>
          )}
          <hr className="border-glass-border" />
          <button
            className="w-full text-center font-label-caps text-xs text-on-surface border border-glass-border rounded-full py-3 hover:border-electric-blue hover:text-electric-blue transition-all"
            onClick={() => {
              setIsOpen(false);
              onViewResume();
            }}
          >
            Resume
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
