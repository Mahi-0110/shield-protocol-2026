import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2, Shield } from 'lucide-react';
import { PAYMENT_CONFIG } from '../../config/paymentConfig';

interface MobilePaymentBarProps {
  isSubmitted: boolean;
  onScrollToForm: () => void;
}

const MobilePaymentBar: React.FC<MobilePaymentBarProps> = ({ isSubmitted, onScrollToForm }) => {
  const upiUrl = `upi://pay?pa=${encodeURIComponent(
    PAYMENT_CONFIG.upiId
  )}&pn=${encodeURIComponent(PAYMENT_CONFIG.payeeName)}&am=${
    PAYMENT_CONFIG.registrationFee
  }&cu=${PAYMENT_CONFIG.currency}`;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden p-3 bg-bg-primary/95 backdrop-blur-2xl border-t border-blue-primary/30 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-[10px] font-space text-muted uppercase">REGISTRATION FEE</span>
          <span className="font-sora font-extrabold text-xl text-white flex items-baseline gap-1">
            <span className="text-sm text-blue-accent">₹</span>
            {PAYMENT_CONFIG.registrationFee}
          </span>
        </div>

        {isSubmitted ? (
          <div className="px-5 py-3 rounded-xl bg-success/10 border border-success/30 text-success font-space font-bold text-xs flex items-center gap-2">
            <CheckCircle2 size={16} /> Submitted
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={onScrollToForm}
              className="px-3 py-3 rounded-xl glass border border-white/10 text-white font-space font-medium text-xs hover:border-blue-primary/40 transition"
            >
              Submit UTR
            </button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigator.clipboard.writeText(PAYMENT_CONFIG.upiId);
                window.location.href = upiUrl;
              }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-primary to-blue-accent text-white font-space font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(14,165,233,0.5)]"
            >
              <span>Pay via UPI</span>
              <ExternalLink size={14} />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobilePaymentBar;
