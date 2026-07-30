import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { PAYMENT_CONFIG, getPhonePeUpiUrl } from '../../config/paymentConfig';

interface MobilePaymentBarProps {
  isSubmitted: boolean;
  onScrollToForm: () => void;
}

const MobilePaymentBar: React.FC<MobilePaymentBarProps> = ({ isSubmitted, onScrollToForm }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handlePayClick = () => {
    // 1. Copy UPI ID to user clipboard
    navigator.clipboard.writeText(PAYMENT_CONFIG.upiId);
    setToastMessage(`UPI ID ${PAYMENT_CONFIG.upiId} copied!`);
    setTimeout(() => setToastMessage(null), 3000);

    // 2. Launch direct PhonePe scheme handler
    window.location.href = getPhonePeUpiUrl();
  };

  return (
    <>
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-purple-600 text-white font-space font-semibold text-xs shadow-2xl flex items-center gap-2 border border-purple-400/30"
          >
            <CheckCircle2 size={15} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden p-3 bg-bg-primary/95 backdrop-blur-2xl border-t border-purple-500/30 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-space text-muted uppercase">REGISTRATION FEE</span>
            <span className="font-sora font-extrabold text-xl text-white flex items-baseline gap-1">
              <span className="text-sm text-purple-400">₹</span>
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
                className="px-3 py-3 rounded-xl glass border border-white/10 text-white font-space font-medium text-xs hover:border-purple-400/40 transition"
              >
                Submit UTR
              </button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handlePayClick}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-space font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.5)]"
              >
                <span>Pay via PhonePe</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobilePaymentBar;
