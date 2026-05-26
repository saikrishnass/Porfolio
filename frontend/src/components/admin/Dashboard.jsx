import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Briefcase, 
  GraduationCap, 
  Terminal, 
  FolderGit2, 
  Mail, 
  LogOut, 
  Trash2, 
  Plus, 
  Check, 
  Edit3,
  X
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Dashboard = ({ token, username, onLogout, refreshData }) => {
  const [activeTab, setActiveTab] = useState('messages');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  // Form states
  const [skillForm, setSkillForm] = useState({ name: '', category: 'Frontend' });
  const [projectForm, setProjectForm] = useState({ title: '', description: '', tags: '', githubLink: '', liveLink: '', image: '' });
  const [expForm, setExpForm] = useState({ role: '', company: '', duration: '', description: '', orderIndex: 0 });
  const [eduForm, setEduForm] = useState({ degree: '', institution: '', duration: '', description: '', orderIndex: 0 });

  // Edit IDs
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingExpId, setEditingExpId] = useState(null);
  const [editingEduId, setEditingEduId] = useState(null);

  // Status message state
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [msgRes, skillRes, projRes, expRes, eduRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/messages`, axiosConfig),
        axios.get(`${API_BASE_URL}/api/skills`),
        axios.get(`${API_BASE_URL}/api/projects`),
        axios.get(`${API_BASE_URL}/api/experience`),
        axios.get(`${API_BASE_URL}/api/education`)
      ]);

      setMessages(msgRes.data);
      setSkills(skillRes.data);
      setProjects(projRes.data);
      setExperience(expRes.data);
      setEducation(eduRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      showFeedback('error', 'Failed to load panel data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [activeTab]);

  const showFeedback = (type, text) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback({ type: '', text: '' }), 4000);
  };

  // --- CRUD MESSAGES ---
  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/messages/${id}`, axiosConfig);
      setMessages(messages.filter(m => m._id !== id));
      showFeedback('success', 'Message deleted successfully.');
    } catch (err) {
      showFeedback('error', 'Failed to delete message.');
    }
  };

  // --- CRUD SKILLS ---
  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!skillForm.name) return;
    try {
      const res = await axios.post(`${API_BASE_URL}/api/skills`, skillForm, axiosConfig);
      setSkills([...skills, res.data]);
      setSkillForm({ name: '', category: skillForm.category });
      showFeedback('success', 'Skill added!');
      refreshData();
    } catch (err) {
      showFeedback('error', 'Failed to add skill.');
    }
  };

  const deleteSkill = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/skills/${id}`, axiosConfig);
      setSkills(skills.filter(s => s._id !== id));
      showFeedback('success', 'Skill deleted.');
      refreshData();
    } catch (err) {
      showFeedback('error', 'Failed to delete skill.');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProjectForm(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // --- CRUD PROJECTS ---
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) return;
    
    try {
      if (editingProjectId) {
        // Edit
        const res = await axios.put(`${API_BASE_URL}/api/projects/${editingProjectId}`, projectForm, axiosConfig);
        setProjects(projects.map(p => p._id === editingProjectId ? res.data : p));
        setEditingProjectId(null);
        showFeedback('success', 'Project updated successfully!');
      } else {
        // Add
        const res = await axios.post(`${API_BASE_URL}/api/projects`, projectForm, axiosConfig);
        setProjects([res.data, ...projects]);
        showFeedback('success', 'Project added successfully!');
      }
      setProjectForm({ title: '', description: '', tags: '', githubLink: '', liveLink: '', image: '' });
      refreshData();
    } catch (err) {
      showFeedback('error', 'Failed to save project.');
    }
  };

  const startEditProject = (p) => {
    setEditingProjectId(p._id);
    setProjectForm({
      title: p.title,
      description: p.description,
      tags: p.tags.join(', '),
      githubLink: p.githubLink,
      liveLink: p.liveLink,
      image: p.image
    });
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/projects/${id}`, axiosConfig);
      setProjects(projects.filter(p => p._id !== id));
      showFeedback('success', 'Project removed.');
      refreshData();
    } catch (err) {
      showFeedback('error', 'Failed to delete project.');
    }
  };

  // --- CRUD EXPERIENCE ---
  const handleSaveExperience = async (e) => {
    e.preventDefault();
    if (!expForm.role || !expForm.company || !expForm.duration || !expForm.description) return;

    try {
      if (editingExpId) {
        // Edit
        const res = await axios.put(`${API_BASE_URL}/api/experience/${editingExpId}`, expForm, axiosConfig);
        setExperience(experience.map(exp => exp._id === editingExpId ? res.data : exp));
        setEditingExpId(null);
        showFeedback('success', 'Experience record updated!');
      } else {
        // Add
        const res = await axios.post(`${API_BASE_URL}/api/experience`, expForm, axiosConfig);
        setExperience([...experience, res.data]);
        showFeedback('success', 'Experience record added!');
      }
      setExpForm({ role: '', company: '', duration: '', description: '', orderIndex: 0 });
      refreshData();
    } catch (err) {
      showFeedback('error', 'Failed to save experience.');
    }
  };

  const startEditExperience = (e) => {
    setEditingExpId(e._id);
    setExpForm({
      role: e.role,
      company: e.company,
      duration: e.duration,
      description: e.description,
      orderIndex: e.orderIndex || 0
    });
  };

  const deleteExperience = async (id) => {
    if (!window.confirm('Delete this experience?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/experience/${id}`, axiosConfig);
      setExperience(experience.filter(e => e._id !== id));
      showFeedback('success', 'Experience removed.');
      refreshData();
    } catch (err) {
      showFeedback('error', 'Failed to delete experience.');
    }
  };

  // --- CRUD EDUCATION ---
  const handleSaveEducation = async (e) => {
    e.preventDefault();
    if (!eduForm.degree || !eduForm.institution || !eduForm.duration) return;

    try {
      if (editingEduId) {
        // Edit
        const res = await axios.put(`${API_BASE_URL}/api/education/${editingEduId}`, eduForm, axiosConfig);
        setEducation(education.map(edu => edu._id === editingEduId ? res.data : edu));
        setEditingEduId(null);
        showFeedback('success', 'Education record updated!');
      } else {
        // Add
        const res = await axios.post(`${API_BASE_URL}/api/education`, eduForm, axiosConfig);
        setEducation([...education, res.data]);
        showFeedback('success', 'Education record added!');
      }
      setEduForm({ degree: '', institution: '', duration: '', description: '', orderIndex: 0 });
      refreshData();
    } catch (err) {
      showFeedback('error', 'Failed to save education.');
    }
  };

  const startEditEducation = (edu) => {
    setEditingEduId(edu._id);
    setEduForm({
      degree: edu.degree,
      institution: edu.institution,
      duration: edu.duration,
      description: edu.description,
      orderIndex: edu.orderIndex || 0
    });
  };

  const deleteEducation = async (id) => {
    if (!window.confirm('Delete this education record?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/education/${id}`, axiosConfig);
      setEducation(education.filter(edu => edu._id !== id));
      showFeedback('success', 'Education record removed.');
      refreshData();
    } catch (err) {
      showFeedback('error', 'Failed to delete education.');
    }
  };

  return (
    <section className="min-h-screen pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar Panel */}
      <aside className="w-full md:w-64 flex flex-col gap-4">
        <div className="glass-card p-6 rounded-3xl flex flex-col justify-between shadow-xl h-full border border-glass-border">
          <div>
            <div className="mb-8 border-b border-glass-border pb-4">
              <h3 className="text-on-surface font-bold text-lg leading-tight uppercase font-headline-lg">Dashboard</h3>
              <p className="text-soft-gray text-[10px] tracking-widest font-label-caps mt-1">Hello, {username}</p>
            </div>
            
            <nav className="flex flex-col gap-2 font-label-caps text-xs">
              {[
                { id: 'messages', label: 'Messages', count: messages.length, icon: <Mail size={16} /> },
                { id: 'skills', label: 'Skills Manager', icon: <Terminal size={16} /> },
                { id: 'projects', label: 'Projects Manager', icon: <FolderGit2 size={16} /> },
                { id: 'experience', label: 'Experience Manager', icon: <Briefcase size={16} /> },
                { id: 'education', label: 'Education Manager', icon: <GraduationCap size={16} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setFeedback({ type: '', text: '' }); }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                    activeTab === tab.id 
                      ? 'bg-electric-blue text-on-surface border-electric-blue/50 shadow-md' 
                      : 'text-soft-gray hover:text-on-surface bg-surface-container/20 border-transparent hover:border-glass-border'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className="text-[10px] bg-background px-2 py-0.5 rounded-full border border-glass-border">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center justify-center gap-3 mt-8 border border-glass-border hover:border-red-500 hover:text-red-400 text-soft-gray font-label-caps text-xs py-3 rounded-xl transition-all cursor-pointer"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="glass-card p-6 md:p-8 rounded-3xl shadow-xl border border-glass-border min-h-[60vh] relative">
          
          {feedback.text && (
            <div className={`absolute top-4 right-4 z-40 px-4 py-2 border rounded-xl shadow-lg text-xs flex items-center gap-2 animate-fade-in ${
              feedback.type === 'success' 
                ? 'bg-green-950/40 text-green-400 border-green-800/40' 
                : 'bg-red-950/40 text-red-400 border-red-800/40'
            }`}>
              {feedback.type === 'success' ? <Check size={14} /> : <X size={14} />}
              <span>{feedback.text}</span>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center h-96 gap-4">
              <div className="w-8 h-8 border-2 border-electric-blue border-t-transparent rounded-full animate-spin"></div>
              <p className="text-soft-gray text-xs">Loading panel records...</p>
            </div>
          ) : (
            <div>
              {/* --- MESSAGES TAB --- */}
              {activeTab === 'messages' && (
                <div>
                  <h2 className="text-xl font-bold font-headline-lg text-on-surface mb-6 border-b border-glass-border pb-3">
                    Contact Inbox ({messages.length})
                  </h2>
                  {messages.length === 0 ? (
                    <div className="text-center py-20 text-soft-gray text-sm italic">
                      No messages received yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg._id} className="bg-surface-container/30 border border-glass-border p-5 rounded-2xl flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-on-surface font-semibold text-sm">{msg.name}</span>
                              <a href={`mailto:${msg.email}`} className="text-xs text-electric-blue hover:underline">{msg.email}</a>
                              <span className="text-[10px] text-soft-gray bg-background border border-glass-border px-2 py-0.5 rounded-full">
                                {new Date(msg.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-soft-gray text-xs md:text-sm leading-relaxed font-body-md whitespace-pre-line">
                              {msg.message}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteMessage(msg._id)}
                            className="self-start md:self-center p-2 rounded-xl text-soft-gray hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-950/20 transition-all cursor-pointer"
                            title="Delete message"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- SKILLS TAB --- */}
              {activeTab === 'skills' && (
                <div>
                  <h2 className="text-xl font-bold font-headline-lg text-on-surface mb-6 border-b border-glass-border pb-3">
                    Skills Manager
                  </h2>

                  <form onSubmit={handleAddSkill} className="flex flex-col sm:flex-row gap-4 mb-8 bg-surface-container/10 p-5 border border-glass-border rounded-2xl">
                    <div className="flex-1">
                      <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Skill Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Next.js"
                        value={skillForm.name}
                        onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                        className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                        required
                      />
                    </div>
                    <div className="w-full sm:w-48">
                      <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Category</label>
                      <select
                        value={skillForm.category}
                        onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                        className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-3 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                        <option value="AI / Tools">AI / Tools</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="self-end bg-on-surface text-background px-6 py-2 rounded-xl font-label-caps text-xs hover:bg-electric-blue hover:text-on-surface transition-all flex items-center gap-2 cursor-pointer h-9 mb-[2px]"
                    >
                      <Plus size={14} />
                      <span>Add</span>
                    </button>
                  </form>

                  {/* Skills lists by Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['Frontend', 'Backend', 'Database', 'AI / Tools'].map((cat) => {
                      const list = skills.filter(s => s.category === cat);
                      return (
                        <div key={cat} className="bg-surface-container/30 border border-glass-border p-5 rounded-2xl">
                          <h3 className="text-on-surface font-semibold text-sm mb-3 border-b border-glass-border pb-1.5">{cat}</h3>
                          {list.length === 0 ? (
                            <p className="text-soft-gray text-xs italic py-2">No skills in this category.</p>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {list.map((s) => (
                                <span 
                                  key={s._id} 
                                  className="flex items-center gap-1.5 pl-3 pr-2 py-1 bg-background border border-glass-border rounded-full text-xs text-soft-gray hover:text-on-surface"
                                >
                                  <span>{s.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => deleteSkill(s._id)}
                                    className="text-soft-gray hover:text-red-400 p-0.5 rounded-full hover:bg-surface-container transition-colors"
                                  >
                                    <X size={12} />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* --- PROJECTS TAB --- */}
              {activeTab === 'projects' && (
                <div>
                  <h2 className="text-xl font-bold font-headline-lg text-on-surface mb-6 border-b border-glass-border pb-3">
                    {editingProjectId ? 'Edit Project' : 'Add New Project'}
                  </h2>

                  <form onSubmit={handleSaveProject} className="space-y-4 bg-surface-container/10 p-5 border border-glass-border rounded-2xl mb-8 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Title</label>
                        <input
                          type="text"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          placeholder="Project Title"
                          className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Tags (Comma Separated)</label>
                        <input
                          type="text"
                          value={projectForm.tags}
                          onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                          placeholder="React, Node, MongoDB"
                          className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">GitHub Repository URL</label>
                        <input
                          type="url"
                          value={projectForm.githubLink}
                          onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                          placeholder="https://github.com/..."
                          className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Live Demo URL</label>
                        <input
                          type="url"
                          value={projectForm.liveLink}
                          onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                          placeholder="https://demo.com"
                          className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Upload Project Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-1.5 text-on-surface text-sm focus:outline-none focus:border-electric-blue file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-electric-blue/20 file:text-electric-blue hover:file:bg-electric-blue/30 file:cursor-pointer"
                        />
                        {projectForm.image && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-[10px] text-green-400">✓ Image loaded</span>
                            <button
                              type="button"
                              onClick={() => setProjectForm({ ...projectForm, image: '' })}
                              className="text-[9px] text-red-400 underline hover:text-red-300 ml-2"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Description</label>
                      <textarea
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        placeholder="Detailed description of the project..."
                        rows="3"
                        className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                        required
                      ></textarea>
                    </div>

                    <div className="flex justify-end gap-3">
                      {editingProjectId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProjectId(null);
                            setProjectForm({ title: '', description: '', tags: '', githubLink: '', liveLink: '', image: '' });
                          }}
                          className="border border-glass-border text-soft-gray px-5 py-2 rounded-xl text-xs hover:border-red-500 hover:text-red-400 cursor-pointer"
                        >
                          Cancel Edit
                        </button>
                      )}
                      <button
                        type="submit"
                        className="bg-on-surface text-background px-6 py-2 rounded-xl font-label-caps text-xs hover:bg-electric-blue hover:text-on-surface transition-all cursor-pointer"
                      >
                        {editingProjectId ? 'Update Project' : 'Add Project'}
                      </button>
                    </div>
                  </form>

                  <h3 className="text-sm font-semibold text-on-surface mb-3 uppercase tracking-wider">Current Projects</h3>
                  <div className="space-y-4">
                    {projects.map((p) => (
                      <div key={p._id} className="bg-surface-container/30 border border-glass-border p-4 rounded-xl flex justify-between items-center gap-4">
                        <div>
                          <h4 className="text-on-surface font-semibold text-sm">{p.title}</h4>
                          <p className="text-soft-gray text-xs line-clamp-1 mt-1">{p.description}</p>
                          <div className="flex gap-2 mt-2">
                            {p.tags.map((t, idx) => (
                              <span key={idx} className="text-[9px] bg-background border border-glass-border px-2 py-0.5 rounded-full text-primary">{t}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditProject(p)}
                            className="p-2 rounded-xl text-soft-gray hover:text-electric-blue hover:bg-electric-blue/10 transition-all cursor-pointer"
                            title="Edit project"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => deleteProject(p._id)}
                            className="p-2 rounded-xl text-soft-gray hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                            title="Delete project"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- EXPERIENCE TAB --- */}
              {activeTab === 'experience' && (
                <div>
                  <h2 className="text-xl font-bold font-headline-lg text-on-surface mb-6 border-b border-glass-border pb-3">
                    {editingExpId ? 'Edit Experience' : 'Add New Experience'}
                  </h2>

                  <form onSubmit={handleSaveExperience} className="space-y-4 bg-surface-container/10 p-5 border border-glass-border rounded-2xl mb-8 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Role / Title</label>
                        <input
                          type="text"
                          value={expForm.role}
                          onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                          placeholder="e.g. Frontend Intern"
                          className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Company / Institution</label>
                        <input
                          type="text"
                          value={expForm.company}
                          onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                          placeholder="e.g. Tech Solutions Inc."
                          className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Duration</label>
                        <input
                          type="text"
                          value={expForm.duration}
                          onChange={(e) => setExpForm({ ...expForm, duration: e.target.value })}
                          placeholder="e.g. 2023 - Present"
                          className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-3">
                        <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Description</label>
                        <input
                          type="text"
                          value={expForm.description}
                          onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                          placeholder="Developed APIs, integrated features, etc."
                          className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Order Index</label>
                        <input
                          type="number"
                          value={expForm.orderIndex}
                          onChange={(e) => setExpForm({ ...expForm, orderIndex: parseInt(e.target.value) || 0 })}
                          className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      {editingExpId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingExpId(null);
                            setExpForm({ role: '', company: '', duration: '', description: '', orderIndex: 0 });
                          }}
                          className="border border-glass-border text-soft-gray px-5 py-2 rounded-xl text-xs hover:border-red-500 hover:text-red-400 cursor-pointer"
                        >
                          Cancel Edit
                        </button>
                      )}
                      <button
                        type="submit"
                        className="bg-on-surface text-background px-6 py-2 rounded-xl font-label-caps text-xs hover:bg-electric-blue hover:text-on-surface transition-all cursor-pointer"
                      >
                        {editingExpId ? 'Update Record' : 'Add Record'}
                      </button>
                    </div>
                  </form>

                  <h3 className="text-sm font-semibold text-on-surface mb-3 uppercase tracking-wider">Current Experience Records</h3>
                  <div className="space-y-4">
                    {experience.map((e) => (
                      <div key={e._id} className="bg-surface-container/30 border border-glass-border p-4 rounded-xl flex justify-between items-center gap-4">
                        <div>
                          <h4 className="text-on-surface font-semibold text-sm">{e.role}</h4>
                          <p className="text-soft-gray text-xs mt-1">{e.company} // {e.duration} [Order: {e.orderIndex}]</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditExperience(e)}
                            className="p-2 rounded-xl text-soft-gray hover:text-electric-blue hover:bg-electric-blue/10 transition-all cursor-pointer"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => deleteExperience(e._id)}
                            className="p-2 rounded-xl text-soft-gray hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- EDUCATION TAB --- */}
              {activeTab === 'education' && (
                <div>
                  <h2 className="text-xl font-bold font-headline-lg text-on-surface mb-6 border-b border-glass-border pb-3">
                    {editingEduId ? 'Edit Education Record' : 'Add New Education Record'}
                  </h2>

                  <form onSubmit={handleSaveEducation} className="space-y-4 bg-surface-container/10 p-5 border border-glass-border rounded-2xl mb-8 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Degree / Qualification</label>
                        <input
                          type="text"
                          value={eduForm.degree}
                          onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                          placeholder="e.g. Bachelor of Technology in IT"
                          className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Institution</label>
                        <input
                          type="text"
                          value={eduForm.institution}
                          onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                          placeholder="e.g. University of Technology"
                          className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Duration</label>
                        <input
                          type="text"
                          value={eduForm.duration}
                          onChange={(e) => setEduForm({ ...eduForm, duration: e.target.value })}
                          placeholder="e.g. 2021 - 2025"
                          className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-3">
                        <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Description</label>
                        <input
                          type="text"
                          value={eduForm.description}
                          onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                          placeholder="Academic honors, coursework details, etc."
                          className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-soft-gray uppercase tracking-wider mb-2">Order Index</label>
                        <input
                          type="number"
                          value={eduForm.orderIndex}
                          onChange={(e) => setEduForm({ ...eduForm, orderIndex: parseInt(e.target.value) || 0 })}
                          className="w-full bg-surface-container/50 border border-glass-border rounded-xl px-4 py-2 text-on-surface text-sm focus:outline-none focus:border-electric-blue"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      {editingEduId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingEduId(null);
                            setEduForm({ degree: '', institution: '', duration: '', description: '', orderIndex: 0 });
                          }}
                          className="border border-glass-border text-soft-gray px-5 py-2 rounded-xl text-xs hover:border-red-500 hover:text-red-400 cursor-pointer"
                        >
                          Cancel Edit
                        </button>
                      )}
                      <button
                        type="submit"
                        className="bg-on-surface text-background px-6 py-2 rounded-xl font-label-caps text-xs hover:bg-electric-blue hover:text-on-surface transition-all cursor-pointer"
                      >
                        {editingEduId ? 'Update Record' : 'Add Record'}
                      </button>
                    </div>
                  </form>

                  <h3 className="text-sm font-semibold text-on-surface mb-3 uppercase tracking-wider">Current Academic Records</h3>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu._id} className="bg-surface-container/30 border border-glass-border p-4 rounded-xl flex justify-between items-center gap-4">
                        <div>
                          <h4 className="text-on-surface font-semibold text-sm">{edu.degree}</h4>
                          <p className="text-soft-gray text-xs mt-1">{edu.institution} // {edu.duration} [Order: {edu.orderIndex}]</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditEducation(edu)}
                            className="p-2 rounded-xl text-soft-gray hover:text-electric-blue hover:bg-electric-blue/10 transition-all cursor-pointer"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => deleteEducation(edu._id)}
                            className="p-2 rounded-xl text-soft-gray hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </section>
  );
};

export default Dashboard;
