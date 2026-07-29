import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'qrcode';
import {
  Copy,
  Check,
  Download,
  ExternalLink,
  QrCode,
  Smartphone,
  Sparkles,
  Zap,
  ArrowUpRight,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';
import { PAYMENT_CONFIG } from '../../config/paymentConfig';

const getUpiUrl = () =>
  `upi://pay?pa=${encodeURIComponent(PAYMENT_CONFIG.upiId)}&pn=${encodeURIComponent(
    PAYMENT_CONFIG.payeeName
  )}&am=${PAYMENT_CONFIG.registrationFee}&cu=${PAYMENT_CONFIG.currency}`;

const UPI_APPS = [
  {
    name: 'Google Pay',
    brandColor: '#4285F4',
    bgGradient: 'from-blue-600/20 to-emerald-500/10',
    borderColor: 'rgba(66, 133, 244, 0.4)',
    getPackageIntent: () =>
      `intent://pay?pa=${PAYMENT_CONFIG.upiId}&pn=${encodeURIComponent(
        PAYMENT_CONFIG.payeeName
      )}&am=${PAYMENT_CONFIG.registrationFee}&cu=${PAYMENT_CONFIG.currency}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`,
    badge: 'Popular',
    iconLetter: 'GPay',
  },
  {
    name: 'PhonePe',
    brandColor: '#5F259F',
    bgGradient: 'from-purple-600/20 to-indigo-500/10',
    borderColor: 'rgba(95, 37, 159, 0.4)',
    getPackageIntent: () =>
      `intent://pay?pa=${PAYMENT_CONFIG.upiId}&pn=${encodeURIComponent(
        PAYMENT_CONFIG.payeeName
      )}&am=${PAYMENT_CONFIG.registrationFee}&cu=${PAYMENT_CONFIG.currency}#Intent;scheme=upi;package=com.phonepe.app;end`,
    badge: 'Fast',
    iconLetter: 'PhonePe',
  },
  {
    name: 'Paytm',
    brandColor: '#00BAF2',
    bgGradient: 'from-sky-500/20 to-blue-600/10',
    borderColor: 'rgba(0, 186, 242, 0.4)',
    getPackageIntent: () =>
      `intent://pay?pa=${PAYMENT_CONFIG.upiId}&pn=${encodeURIComponent(
        PAYMENT_CONFIG.payeeName
      )}&am=${PAYMENT_CONFIG.registrationFee}&cu=${PAYMENT_CONFIG.currency}#Intent;scheme=upi;package=net.one97.paytm;end`,
    badge: 'Instant',
    iconLetter: 'Paytm',
  },
  {
    name: 'BHIM UPI',
    brandColor: '#00529C',
    bgGradient: 'from-blue-700/20 to-orange-500/10',
    borderColor: 'rgba(0, 82, 156, 0.4)',
    getPackageIntent: () =>
      `intent://pay?pa=${PAYMENT_CONFIG.upiId}&pn=${encodeURIComponent(
        PAYMENT_CONFIG.payeeName
      )}&am=${PAYMENT_CONFIG.registrationFee}&cu=${PAYMENT_CONFIG.currency}#Intent;scheme=upi;package=in.org.npci.upiapp;end`,
    badge: 'Govt NPCI',
    iconLetter: 'BHIM',
  },
  {
    name: 'Amazon Pay',
    brandColor: '#FF9900',
    bgGradient: 'from-amber-500/20 to-yellow-600/10',
    borderColor: 'rgba(255, 153, 0, 0.4)',
    getPackageIntent: () =>
      `intent://pay?pa=${PAYMENT_CONFIG.upiId}&pn=${encodeURIComponent(
        PAYMENT_CONFIG.payeeName
      )}&am=${PAYMENT_CONFIG.registrationFee}&cu=${PAYMENT_CONFIG.currency}#Intent;scheme=upi;package=com.amazon.mShop.android.shopping;end`,
    badge: 'Rewards',
    iconLetter: 'Amazon',
  },
];

const PaymentMethods: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'qr' | 'upiId'>('qr');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const url = getUpiUrl();
        const dataUrl = await QRCode.toDataURL(url, {
          width: 400,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
          errorCorrectionLevel: 'H',
        });
        setQrDataUrl(dataUrl);
      } catch (err) {
        console.error('Failed to generate QR Code', err);
      }
    };

    generateQrCode();
  }, []);

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
    downloadLink.download = `${PAYMENT_CONFIG.eventName}-UPI-QR.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleLaunchApp = (intentUrl: string, appName: string) => {
    // Copy UPI ID for user convenience
    navigator.clipboard.writeText(PAYMENT_CONFIG.upiId);
    setToastMessage(`Opening ${appName}... (UPI ID ${PAYMENT_CONFIG.upiId} copied)`);
    setTimeout(() => setToastMessage(null), 4000);

    // Trigger redirection
    window.location.href = intentUrl;
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
            <div className="section-badge mb-1">SELECT PAYMENT METHOD</div>
            <h2 className="font-sora font-bold text-2xl text-white">
              UPI Instant Transfer
            </h2>
            <p className="text-muted text-xs sm:text-sm font-outfit mt-1">
              Scan QR or select your preferred UPI application to complete payment.
            </p>
          </div>

          {/* Toggle Tab Buttons */}
          <div className="flex items-center p-1 bg-bg-primary/80 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setSelectedTab('qr')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-space font-semibold transition-all ${
                selectedTab === 'qr'
                  ? 'bg-blue-primary text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]'
                  : 'text-muted hover:text-white'
              }`}
            >
              <QrCode size={15} /> QR Code
            </button>
            <button
              onClick={() => setSelectedTab('upiId')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-space font-semibold transition-all ${
                selectedTab === 'upiId'
                  ? 'bg-blue-primary text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]'
                  : 'text-muted hover:text-white'
              }`}
            >
              <Smartphone size={15} /> UPI VPA ID
            </button>
          </div>
        </div>

        {/* Primary QR & Details Container */}
        <div className="grid md:grid-cols-12 gap-8 items-center mb-10">
          {/* Left Column: Interactive QR Code Box */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-primary via-blue-accent to-blue-primary rounded-3xl blur-xl opacity-40 group-hover:opacity-75 transition duration-500" />
              
              <div className="relative glass p-6 rounded-3xl border border-blue-primary/40 bg-bg-primary flex flex-col items-center">
                {/* Dynamically Generated Scannable QR Code */}
                <div className="relative p-3 bg-white rounded-2xl shadow-2xl flex items-center justify-center min-w-[190px] min-h-[190px]">
                  {qrDataUrl ? (
                    <img
                      id="shield-upi-qr-img"
                      src={qrDataUrl}
                      alt={`UPI QR Code for ${PAYMENT_CONFIG.upiId}`}
                      className="w-[190px] h-[190px] rounded-lg object-contain"
                    />
                  ) : (
                    <div className="w-[190px] h-[190px] flex items-center justify-center text-muted font-space text-xs">
                      Generating QR...
                    </div>
                  )}
                </div>

                <div className="mt-3 text-center">
                  <div className="text-[11px] font-space text-muted flex items-center gap-1.5 justify-center">
                    <Zap size={12} className="text-warning animate-pulse" />
                    Scan with any UPI App to pay ₹{PAYMENT_CONFIG.registrationFee}
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

            {/* Direct Quick Action Buttons */}
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
                onClick={() => handleLaunchApp(getUpiUrl(), 'UPI App')}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-primary to-blue-accent text-white font-space font-semibold text-xs shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.7)] transition-all"
              >
                <span>Open Payment App</span>
                <ExternalLink size={15} />
              </motion.button>
            </div>

            <div className="text-[11px] font-outfit text-muted flex items-center gap-1.5 bg-blue-primary/5 p-3 rounded-xl border border-blue-primary/10">
              <ShieldAlert size={14} className="text-blue-accent shrink-0" />
              <span>
                Amount <strong className="text-white">₹{PAYMENT_CONFIG.registrationFee}</strong> is pre-configured for <strong className="text-white">{PAYMENT_CONFIG.upiId}</strong>.
              </span>
            </div>
          </div>
        </div>

        {/* UPI Apps Grid Header */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="font-sora font-semibold text-sm text-white flex items-center gap-2">
              <Sparkles size={14} className="text-blue-accent" /> Pay Directly via UPI App
            </span>
            <span className="text-[11px] font-space text-muted">
              Auto-fills amount ₹{PAYMENT_CONFIG.registrationFee}
            </span>
          </div>

          {/* UPI App Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {UPI_APPS.map((app) => (
              <motion.button
                key={app.name}
                onClick={() => handleLaunchApp(app.getPackageIntent(), app.name)}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`glass p-3.5 rounded-2xl border flex flex-col items-center text-center transition-all bg-gradient-to-b ${app.bgGradient} relative overflow-hidden group cursor-pointer w-full`}
                style={{ borderColor: app.borderColor }}
              >
                {/* Glow badge */}
                <span className="absolute top-2 right-2 text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white/80 group-hover:bg-blue-primary group-hover:text-white transition-colors">
                  {app.badge}
                </span>

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-sora font-black text-xs text-white my-2 shadow-lg group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: app.brandColor }}
                >
                  {app.iconLetter.substring(0, 3)}
                </div>

                <span className="font-sora font-semibold text-xs text-white group-hover:text-blue-accent transition-colors flex items-center gap-1">
                  {app.name}
                  <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>

                <span className="text-[10px] font-space text-muted mt-0.5">
                  Launch App
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
