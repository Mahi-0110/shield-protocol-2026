import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, ArrowRight, User, Mail, Phone, BookOpen, Calendar, Users, Lock, Sparkles } from 'lucide-react';
import { createRegistration } from '../../services/registrationService';
import { RegistrationRecord } from '../../types/database';
import { PAYMENT_CONFIG } from '../../config/paymentConfig';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (record: RegistrationRecord) => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    year: '3rd Year',
    teamName: '',
    teamSize: 1,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName || !formData.email || !formData.phone || !formData.department) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      const record = await createRegistration({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        year: formData.year,
        team_name: formData.teamName,
        team_size: formData.teamSize,
      });

      setLoading(false);
      onSuccess(record);
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'An error occurred during registration. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-xl bg-bg-primary/80">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl glass-card p-6 sm:p-8 border border-blue-primary/40 rounded-2xl shadow-[0_0_50px_rgba(14,165,233,0.25)] my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-muted hover:text-white glass rounded-xl border border-white/10 hover:border-blue-primary/40 transition-all cursor-pointer"
            aria-label="Close registration modal"
          >
            <X size={18} />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-blue-primary/10 border border-blue-primary/30 text-blue-accent">
              <Shield size={24} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-primary/10 text-blue-accent text-[10px] font-space font-semibold uppercase tracking-wider mb-1">
                <Sparkles size={10} /> Step 1 of 2
              </div>
              <h2 className="font-sora font-extrabold text-xl sm:text-2xl text-white">
                Participant Registration
              </h2>
            </div>
          </div>

          <p className="text-muted text-xs sm:text-sm font-outfit mb-6 leading-relaxed">
            Enter your details below to register for <strong>{PAYMENT_CONFIG.eventName}</strong>. Upon submission, an official Registration ID will be assigned and payment instructions will be unlocked.
          </p>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-space">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-outfit text-sm">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-space font-medium text-muted mb-1.5">
                  Full Name <span className="text-blue-accent">*</span>
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Alex Morgan"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted/50 focus:outline-none focus:border-blue-primary transition-all font-outfit"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-space font-medium text-muted mb-1.5">
                  Email Address <span className="text-blue-accent">*</span>
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted/50 focus:outline-none focus:border-blue-primary transition-all font-outfit"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label className="block text-xs font-space font-medium text-muted mb-1.5">
                  Phone / WhatsApp <span className="text-blue-accent">*</span>
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted/50 focus:outline-none focus:border-blue-primary transition-all font-outfit"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Department */}
              <div>
                <label className="block text-xs font-space font-medium text-muted mb-1.5">
                  Department / Major <span className="text-blue-accent">*</span>
                </label>
                <div className="relative">
                  <BookOpen size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Computer Science / Cyber Security"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted/50 focus:outline-none focus:border-blue-primary transition-all font-outfit"
                  />
                </div>
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-space font-medium text-muted mb-1.5">
                  Academic Year <span className="text-blue-accent">*</span>
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-secondary border border-white/10 text-white focus:outline-none focus:border-blue-primary transition-all font-outfit appearance-none"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Professional / Other">Professional / Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Team Name */}
            <div>
              <label className="block text-xs font-space font-medium text-muted mb-1.5">
                Team Name (Optional for Hackathon/CTF)
              </label>
              <div className="relative">
                <Users size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  placeholder="e.g. CyberKnights"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted/50 focus:outline-none focus:border-blue-primary transition-all font-outfit"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-muted font-space">
                <Lock size={12} className="text-emerald-400" />
                Data stored securely on Supabase
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl glow-btn text-white font-space font-bold text-sm shadow-[0_0_25px_rgba(14,165,233,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Proceed to Payment (₹{PAYMENT_CONFIG.registrationFee})</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RegistrationModal;
