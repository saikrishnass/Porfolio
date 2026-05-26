import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';

const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl h-[85vh] bg-[#0c0c0e]/80 border border-glass-border rounded-3xl overflow-hidden flex flex-col shadow-2xl transition-all duration-500 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-electric-blue/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-glass-border bg-background/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-electric-blue animate-pulse" />
            <h3 className="font-display-xl text-base md:text-lg tracking-tight text-on-surface">
              Resume
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Download Button */}
            <a
              href="/SAIRESUME_APR_1 (1).pdf"
              download="SAIKRISHNA_P_Resume.pdf"
              className="flex items-center gap-2 font-label-caps text-[10px] tracking-[0.1em] text-soft-gray hover:text-on-surface border border-glass-border rounded-full px-4 py-2 hover:border-electric-blue/50 transition-all duration-300"
            >
              <Download size={14} className="text-electric-blue" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            {/* External link fallback */}
            <a
              href="/SAIRESUME_APR_1 (1).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-label-caps text-[10px] tracking-[0.1em] text-soft-gray hover:text-on-surface border border-glass-border rounded-full px-4 py-2 hover:border-electric-blue/50 transition-all duration-300"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Full Screen</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-soft-gray hover:text-on-surface hover:bg-glass-border rounded-full transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="relative z-10 flex-grow bg-black/40 overflow-hidden flex items-center justify-center p-2 md:p-4">
          <iframe
            src="/SAIRESUME_APR_1 (1).pdf#toolbar=0"
            className="w-full h-full rounded-2xl border border-glass-border"
            title="SAIKRISHNA P Resume"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
