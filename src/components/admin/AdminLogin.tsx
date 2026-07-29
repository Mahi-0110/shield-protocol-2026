import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, ArrowRight, AlertCircle, Key } from 'lucide-react';
import { verifyAdminPassword } from '../../services/adminService';
import ShieldLogo from '../ui/ShieldLogo';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (verifyAdminPassword(password)) {
        setLoading(false);
        onLoginSuccess();
      } else {
        setLoading(false);
        setError('Invalid Organizer Security Passcode. Access Denied.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4 relative overflow-hidden font-outfit">
      <div className="absolute inset-0 cyber-grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px neon-line pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-card p-8 rounded-3xl border border-blue-primary/40 shadow-[0_0_50px_rgba(14,165,233,0.3)] relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <ShieldLogo size={56} animated glow />
          <h1 className="font-sora font-extrabold text-2xl text-white mt-4">
            Organizer Portal
          </h1>
          <p className="font-space text-xs text-blue-accent tracking-widest uppercase mt-1">
            The Shield Protocol 2026 Admin
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-space flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-space font-semibold text-muted uppercase tracking-wider mb-2">
              Organizer Security Passcode
            </label>
            <div className="relative">
              <Key size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl input-cyber text-sm tracking-widest text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl glow-btn text-white font-space font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(14,165,233,0.5)] cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Lock size={16} />
                <span>Authenticate & Launch Dashboard</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <p className="text-[11px] text-muted text-center font-space mt-6">
          🔒 Restricted Area • Supabase Database Control Console
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
