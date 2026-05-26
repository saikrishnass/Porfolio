import React, { useState } from 'react';
import Reveal from './Reveal';
import { Send, AlertCircle, X } from 'lucide-react';

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', text: 'All fields are required.' });
      return;
    }

    // Build Gmail compose URL with pre-filled fields
    const to = encodeURIComponent('saikrishnapasikanti@gmail.com');
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Saikrishna,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;

    // Open Gmail compose in a new tab
    window.open(gmailComposeUrl, '_blank');

    // Reset form and close modal
    setFormData({ name: '', email: '', message: '' });
    setStatus({ type: '', text: '' });
    setIsModalOpen(false);
  };

  return (
    <section className="min-h-[100vh] py-16 flex items-center justify-center" id="contact">
      <Reveal className="w-full max-w-5xl">
        <div className="glass-card w-full p-8 md:p-16 rounded-3xl flex flex-col justify-center shadow-2xl text-center relative overflow-hidden group">
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl group-hover:bg-electric-blue/10 transition-colors duration-500 pointer-events-none"></div>

          <h2 className="font-display-xl text-3xl md:text-5xl text-on-surface mb-6">
            Get In Touch
          </h2>
          <p className="font-label-caps text-label-caps text-electric-blue mb-12 tracking-[0.2em] uppercase">
            LET'S BUILD SOMETHING GREAT
          </p>

          <div className="max-w-xl mx-auto space-y-8 relative z-10">
            <p className="font-body-lg text-sm md:text-lg text-soft-gray leading-relaxed">
              Available for collaborations, internships, and freelance projects. I'm always open to discussing new ideas and opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-electric-blue text-on-surface px-12 py-5 rounded-full font-label-caps hover:bg-on-surface hover:text-background transition-all duration-500 hover:scale-105 ease-out shadow-lg hover:shadow-electric-blue/20 cursor-pointer"
              >
                Send a Message
              </button>
              <a 
                className="glass-card text-on-surface px-12 py-5 rounded-full font-label-caps hover:border-electric-blue hover:text-electric-blue transition-all duration-500 flex items-center justify-center hover:scale-105 ease-out" 
                href="https://www.linkedin.com/in/saikrishnapasikanti/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Modal Overlay — z-[100] to sit above everything including the navbar */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in">
          <div className="glass-card w-full max-w-lg p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-2xl border border-glass-border">
            <button 
              onClick={() => { setIsModalOpen(false); setStatus({ type: '', text: '' }); }}
              className="absolute top-4 right-4 text-soft-gray hover:text-on-surface transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold font-headline-lg text-on-surface mb-2">Send Message</h3>
            <p className="text-soft-gray text-xs mb-6">Fill in your details below. Clicking send will open Gmail with the message ready to go.</p>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-soft-gray uppercase tracking-wider mb-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-electric-blue transition-colors placeholder:text-soft-gray/40 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-soft-gray uppercase tracking-wider mb-2">Your Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-electric-blue transition-colors placeholder:text-soft-gray/40 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-soft-gray uppercase tracking-wider mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Hey, I'd love to chat about a new project..."
                  className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-electric-blue transition-colors placeholder:text-soft-gray/40 text-sm"
                  required
                ></textarea>
              </div>

              {status.text && (
                <div className="p-3 rounded-xl flex items-center gap-2 text-xs border bg-red-950/20 text-red-400 border-red-800/30">
                  <AlertCircle size={16} />
                  <span>{status.text}</span>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full bg-on-surface text-background font-label-caps font-bold py-4 rounded-xl hover:bg-electric-blue hover:text-on-surface transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send via Gmail</span>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
