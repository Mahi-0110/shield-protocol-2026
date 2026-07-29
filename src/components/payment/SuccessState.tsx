import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  MailCheck,
  ShieldCheck,
  Download,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { SubmissionData } from './TransactionForm';
import { PAYMENT_CONFIG } from '../../config/paymentConfig';

interface SuccessStateProps {
  data: SubmissionData;
  onReset?: () => void;
}

const SuccessState: React.FC<SuccessStateProps> = ({ data, onReset }) => {
  const [copied, setCopied] = React.useState(false);
  const refCode = `SHIELD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto mb-12"
    >
      <div className="glass-card p-8 sm:p-12 border border-success/40 relative overflow-hidden backdrop-blur-2xl bg-bg-secondary/90 rounded-3xl text-center shadow-[0_0_60px_rgba(34,197,94,0.15)]">
        {/* Top Glow bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-success/20 via-success to-success/20" />
        
        {/* Background ambient orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-success/10 rounded-full blur-3xl pointer-events-none" />

        {/* Large Animated Checkmark Icon */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-success/10 border-2 border-success text-success flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)]"
          >
            <CheckCircle2 size={48} className="animate-pulse" />
          </motion.div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-2 rounded-full border border-dashed border-success/30 pointer-events-none"
          />
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warning/10 border border-warning/30 text-warning text-xs font-space font-semibold mb-4 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
          <Clock size={14} className="animate-spin" /> STATUS: Under Verification
        </div>

        <h2 className="font-sora font-extrabold text-2xl sm:text-4xl text-white mb-3">
          Payment Details <span className="text-success">Submitted Successfully</span>
        </h2>

        <p className="text-muted font-outfit text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Your payment details have been securely received. Our organizing team is verifying your transaction.
          Verification generally takes <strong className="text-white">less than 12 hours</strong>. You will receive a confirmation email once your payment is approved.
        </p>

        {/* Submitted Data Summary Box */}
        <div className="glass p-6 sm:p-8 rounded-2xl border border-white/10 max-w-xl mx-auto text-left mb-8 bg-bg-primary/60">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <span className="font-space font-semibold text-xs text-muted uppercase tracking-wider">
              Verification Reference Code
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-blue-accent">{refCode}</span>
              <button
                onClick={handleCopyRef}
                className="p-1 rounded bg-white/5 hover:bg-white/10 text-muted hover:text-white transition"
              >
                {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-space">
            <div>
              <span className="text-muted block text-[10px] uppercase">Registered Email</span>
              <span className="text-white font-medium truncate block">{data.email}</span>
            </div>
            <div>
              <span className="text-muted block text-[10px] uppercase">Phone Number</span>
              <span className="text-white font-medium block">{data.phone}</span>
            </div>
            <div>
              <span className="text-muted block text-[10px] uppercase">Transaction UTR</span>
              <span className="text-blue-accent font-mono font-semibold block uppercase">
                {data.transactionId}
              </span>
            </div>
            <div>
              <span className="text-muted block text-[10px] uppercase">Amount Paid</span>
              <span className="text-success font-bold block">₹{data.amount}</span>
            </div>
          </div>

          {data.screenshotName && (
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-space text-muted flex items-center gap-2">
              <Sparkles size={13} className="text-blue-accent" />
              Screenshot attached: <span className="text-white font-mono">{data.screenshotName}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass border border-white/10 text-white font-space font-semibold text-xs hover:border-blue-primary/40 transition-all"
          >
            <Download size={15} /> Download Submission Receipt
          </button>

          {onReset && (
            <button
              onClick={onReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-primary text-white font-space font-semibold text-xs hover:bg-blue-accent transition-all"
            >
              Submit Another Transaction
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SuccessState;
