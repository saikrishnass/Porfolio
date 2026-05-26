import React, { useState } from 'react';
import axios from 'axios';
import { LogIn, KeyRound, User, AlertCircle } from 'lucide-react';

const Login = ({ onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      if (response.data && response.data.token) {
        onLoginSuccess(response.data.token, response.data.username);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-32">
      <div className="glass-card w-full max-w-md p-8 rounded-3xl shadow-2xl relative border border-glass-border">
        {/* Glow ambient background element */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-electric-blue/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
          <h2 className="font-display-xl text-2xl md:text-3xl text-on-surface mb-2">Admin Login</h2>
          <p className="text-soft-gray text-xs tracking-wider font-label-caps">PORTFOLIO PORTAL MANAGEMENT</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10 text-left">
          {error && (
            <div className="p-3 bg-red-950/20 text-red-400 border border-red-800/30 rounded-xl flex items-center gap-2 text-xs">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-soft-gray uppercase tracking-wider">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-soft-gray">
                <User size={16} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full bg-surface-container/50 border border-glass-border rounded-xl pl-10 pr-4 py-3 text-on-surface focus:outline-none focus:border-electric-blue transition-colors placeholder:text-soft-gray/30 text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-soft-gray uppercase tracking-wider">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-soft-gray">
                <KeyRound size={16} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-surface-container/50 border border-glass-border rounded-xl pl-10 pr-4 py-3 text-on-surface focus:outline-none focus:border-electric-blue transition-colors placeholder:text-soft-gray/30 text-sm"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="w-1/2 border border-glass-border text-on-surface font-label-caps py-4 rounded-xl hover:border-red-500 hover:text-red-400 transition-all cursor-pointer text-center text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 bg-on-surface text-background font-label-caps font-bold py-4 rounded-xl hover:bg-electric-blue hover:text-on-surface transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
            >
              {loading ? 'Logging in...' : (
                <>
                  <span>Sign In</span>
                  <LogIn size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
