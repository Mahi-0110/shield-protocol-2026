import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle2, Clock, Lock, ChevronUp, ChevronDown } from 'lucide-react';
import { PaymentStep } from './ProgressBar';

interface FloatingStatusCardProps {
  currentStep: PaymentStep;
}

const FloatingStatusCard: React.FC<FloatingStatusCardProps> = ({ currentStep }) => {
  const [collapsed, setCollapsed] = useState(false);

  const getStatusText = (step: string) => {
    if (step === 'registration') return { text: 'Completed', color: 'text-success', icon: '✔' };
    if (step === 'payment') {
      if (currentStep === 'verification' || currentStep === 'confirmation') {
        return { text: 'Submitted', color: 'text-success', icon: '✔' };
      }
      return { text: 'In Progress', color: 'text-warning', icon: '●' };
    }
    if (step === 'verification') {
      if (currentStep === 'verification') return { text: 'Pending (Under Review)', color: 'text-warning', icon: '⌛' };
      if (currentStep === 'confirmation') return { text: 'Verified', color: 'text-success', icon: '✔' };
      return { text: 'Pending', color: 'text-muted', icon: '○' };
    }
    if (step === 'confirmation') {
      if (currentStep === 'confirmation') return { text: 'Confirmed', color: 'text-success', icon: '✔' };
      return { text: 'Waiting', color: 'text-muted', icon: '🔒' };
    }
    return { text: 'Waiting', color: 'text-muted', icon: '○' };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-40 hidden md:block"
    >
      <div className="glass-card p-4 border border-blue-primary/40 shadow-[0_0_30px_rgba(14,165,233,0.25)] rounded-2xl backdrop-blur-2xl bg-bg-secondary/90 w-72">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-primary/10 text-blue-accent">
              <Shield size={16} />
            </div>
            <span className="font-sora font-bold text-xs text-white">Live Registration Status</span>
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 text-muted hover:text-white transition"
          >
            {collapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2.5 text-xs font-space"
            >
              {/* Step 1 */}
              <div className="flex items-center justify-between">
                <span className="text-muted flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-success" /> Registration:
                </span>
                <span className="text-success font-semibold">Completed</span>
              </div>

              {/* Step 2 */}
              <div className="flex items-center justify-between">
                <span className="text-muted flex items-center gap-1.5">
                  <Clock size={13} className="text-blue-accent" /> Payment:
                </span>
                <span className={`font-semibold ${getStatusText('payment').color}`}>
                  {getStatusText('payment').text}
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex items-center justify-between">
                <span className="text-muted flex items-center gap-1.5">
                  <Clock size={13} className="text-warning" /> Verification:
                </span>
                <span className={`font-semibold ${getStatusText('verification').color}`}>
                  {getStatusText('verification').text}
                </span>
              </div>

              {/* Step 4 */}
              <div className="flex items-center justify-between">
                <span className="text-muted flex items-center gap-1.5">
                  <Lock size={13} className="text-muted" /> Confirmation:
                </span>
                <span className={`font-semibold ${getStatusText('confirmation').color}`}>
                  {getStatusText('confirmation').text}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FloatingStatusCard;
