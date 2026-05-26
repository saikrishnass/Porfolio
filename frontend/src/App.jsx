import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Public Components
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

// Admin Components
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';

const App = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  
  // Portfolio database states
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  // Authentication states
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [adminUsername, setAdminUsername] = useState(localStorage.getItem('admin_user') || '');

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Dynamically enable/disable scroll snapping based on whether user is on the main portfolio page
  useEffect(() => {
    if (currentPath === '/') {
      document.documentElement.classList.add('scroll-snap-active');
    } else {
      document.documentElement.classList.remove('scroll-snap-active');
    }
    return () => {
      document.documentElement.classList.remove('scroll-snap-active');
    };
  }, [currentPath]);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchPortfolioData = async () => {
    setLoading(true);
    try {
      const [skillRes, projRes, expRes, eduRes] = await Promise.all([
        axios.get('http://localhost:5000/api/skills'),
        axios.get('http://localhost:5000/api/projects'),
        axios.get('http://localhost:5000/api/experience'),
        axios.get('http://localhost:5000/api/education')
      ]);

      setSkills(skillRes.data);
      setProjects(projRes.data);
      setExperience(expRes.data);
      setEducation(eduRes.data);
    } catch (error) {
      console.error('Error fetching public portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  // Handle Admin Logged In
  const handleLoginSuccess = (token, username) => {
    setToken(token);
    setAdminUsername(username);
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_user', username);
  };

  // Handle Admin Logged Out
  const handleLogout = () => {
    setToken('');
    setAdminUsername('');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigateTo('/');
  };

  return (
    <div className="relative min-h-screen text-on-surface select-none selection:bg-electric-blue selection:text-white">
      {/* 3D Particle Network Canvas */}
      <ParticleBackground />

      {/* Global Navigation Header */}
      <Navbar onNavigate={navigateTo} currentPath={currentPath} onViewResume={() => setIsResumeOpen(true)} />

      {/* Route Views */}
      {currentPath === '/admin' ? (
        token ? (
          <Dashboard 
            token={token} 
            username={adminUsername} 
            onLogout={handleLogout} 
            refreshData={fetchPortfolioData}
          />
        ) : (
          <Login 
            onLoginSuccess={handleLoginSuccess} 
            onCancel={() => navigateTo('/')} 
          />
        )
      ) : (
        /* Public SPA Portfolio View */
        <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <Hero />
          
          <div className="relative w-full">
            <About />
            <Skills skills={skills} loading={loading} />
            <Projects projects={projects} loading={loading} />
            <Experience experiences={experience} loading={loading} />
            <Education education={education} loading={loading} />
            <Contact />
          </div>
        </main>
      )}

      {/* Resume Overlay Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Footer Branding and Social links */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
