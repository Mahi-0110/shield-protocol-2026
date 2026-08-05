import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  Download,
  QrCode,
  Smartphone,
  Zap,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';
import { PAYMENT_CONFIG, getStandardUpiUrl } from '../../config/paymentConfig';

const PaymentMethods: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const qrDataUrl = '/phonepe-qr.png';

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(PAYMENT_CONFIG.upiId);
    setCopied(true);
    setToastMessage(`UPI ID ${PAYMENT_CONFIG.upiId} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2500);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const downloadLink = document.createElement('a');
    downloadLink.href = qrDataUrl;
    downloadLink.download = `Shield-Protocol-QR-${PAYMENT_CONFIG.registrationFee}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      {/* Toast Notification overlay */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-blue-primary text-white font-space font-semibold text-xs shadow-2xl flex items-center gap-2 border border-blue-accent/30 backdrop-blur-xl"
          >
            <CheckCircle2 size={16} className="text-white" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-card p-6 sm:p-10 border border-blue-primary/30 relative overflow-hidden backdrop-blur-xl bg-bg-secondary/80 rounded-3xl">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="section-badge mb-1">SCAN & PAY</div>
            <h2 className="font-sora font-bold text-2xl text-white">
              UPI Registration Fee Transfer
            </h2>
            <p className="text-muted text-xs sm:text-sm font-outfit mt-1">
              Scan the QR code using Google Pay, PhonePe, Paytm, BHIM, or copy the official UPI ID.
            </p>
          </div>
        </div>

        {/* Primary QR & Details Container */}
        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Scannable NPCI QR Code Box */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-primary via-blue-accent to-blue-primary rounded-3xl blur-xl opacity-40 group-hover:opacity-75 transition duration-500" />
              
              <div className="relative glass p-6 rounded-3xl border border-blue-primary/40 bg-bg-primary flex flex-col items-center">
                {/* Scannable NPCI Compliant QR Code with ₹725 Pre-configured */}
                <div className="relative p-4 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center border border-white/20 overflow-hidden min-h-[280px] min-w-[280px] sm:min-h-[320px] sm:min-w-[320px]">
                  {qrDataUrl ? (
                    <img
                      id="shield-upi-qr-img"
                      src={qrDataUrl}
                      alt={`UPI QR Code for ${PAYMENT_CONFIG.payeeName} (${PAYMENT_CONFIG.upiId})`}
                      className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-xl object-contain"
                    />
                  ) : (
                    <div className="w-[280px] h-[280px] flex items-center justify-center text-black text-xs font-mono">
                      Generating QR...
                    </div>
                  )}
                </div>

                <div className="mt-3 text-center">
                  <div className="text-[13px] font-space font-bold text-white mb-0.5">
                    {PAYMENT_CONFIG.payeeName}
                  </div>
                  <div className="text-[11px] font-space text-blue-accent font-semibold flex items-center gap-1.5 justify-center">
                    <Zap size={12} className="text-warning animate-pulse" />
                    Amount Fixed: ₹{PAYMENT_CONFIG.registrationFee}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Details & Quick Actions */}
          <div className="md:col-span-7 flex flex-col justify-center">
            {/* UPI ID Copy Card */}
            <div className="glass p-5 rounded-2xl border border-blue-primary/20 bg-bg-primary/60 mb-5 relative group">
              <span className="text-[10px] font-space uppercase tracking-widest text-muted block mb-1">
                OFFICIAL UPI VPA ADDRESS
              </span>
              <div className="flex items-center justify-between gap-3">
                <div className="font-mono text-base sm:text-lg font-bold text-white tracking-wide truncate">
                  {PAYMENT_CONFIG.upiId}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyUPI}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-space font-semibold text-xs transition-all shrink-0 ${
                    copied
                      ? 'bg-success text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                      : 'bg-blue-primary hover:bg-blue-accent text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={14} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy ID
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownloadQR}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass border border-white/10 text-white font-space font-medium text-xs hover:border-blue-primary/50 hover:bg-blue-primary/10 transition-all"
              >
                <Download size={15} className="text-blue-accent" />
                <span>Download QR Code</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyUPI}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-primary to-blue-accent text-white font-space font-semibold text-xs shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.7)] transition-all"
              >
                <Copy size={15} />
                <span>{copied ? 'UPI ID Copied!' : 'Copy UPI VPA'}</span>
              </motion.button>
            </div>

            <div className="text-[11px] font-outfit text-muted flex items-center gap-1.5 bg-blue-primary/5 p-3 rounded-xl border border-blue-primary/10">
              <ShieldAlert size={14} className="text-blue-accent shrink-0" />
              <span>
                Registration Fee <strong className="text-white">₹{PAYMENT_CONFIG.registrationFee}</strong> to payee <strong className="text-white">{PAYMENT_CONFIG.payeeName}</strong> ({PAYMENT_CONFIG.upiId}).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
