import React from 'react';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-deep-obsidian full-width py-16 border-t border-glass-border relative z-10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-headline-lg text-xl md:text-2xl text-on-surface">
          SAIKRISHNA
        </div>
        <div className="flex gap-6 font-body-md text-sm">
          <a className="text-soft-gray hover:text-primary transition-all duration-300 opacity-80 hover:opacity-100" href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="text-soft-gray hover:text-primary transition-all duration-300 opacity-80 hover:opacity-100" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="text-soft-gray hover:text-primary transition-all duration-300 opacity-80 hover:opacity-100" href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <button
            className="text-soft-gray hover:text-primary transition-all duration-300 opacity-80 hover:opacity-100 cursor-pointer"
            onClick={() => onNavigate('/admin')}
          >
            Admin Log In
          </button>
        </div>
        <div className="font-body-md text-xs text-soft-gray">
          © {new Date().getFullYear()} PORTFOLIO. BUILT FOR THE FUTURE.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
