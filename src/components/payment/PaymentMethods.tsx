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
  ShieldAlert,
  CheckCircle2,
  X,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  PAYMENT_CONFIG,
  getStandardUpiUrl,
  getPhonePeUpiUrl,
  getGPayUpiUrl,
  getPaytmUpiUrl,
} from '../../config/paymentConfig';

const UPI_APPS = [
  {
    name: 'PhonePe',
    brandColor: '#5F259F',
    bgGradient: 'from-purple-600/20 to-indigo-500/10',
    borderColor: 'rgba(95, 37, 159, 0.4)',
    badge: 'Direct PhonePe',
    iconLetter: 'PhonePe',
    getUrl: getPhonePeUpiUrl,
  },
  {
    name: 'Google Pay',
    brandColor: '#4285F4',
    bgGradient: 'from-blue-600/20 to-emerald-500/10',
    borderColor: 'rgba(66, 133, 244, 0.4)',
    badge: 'Popular',
    iconLetter: 'GPay',
    getUrl: getGPayUpiUrl,
  },
  {
    name: 'Paytm',
    brandColor: '#00BAF2',
    bgGradient: 'from-sky-500/20 to-blue-600/10',
    borderColor: 'rgba(0, 186, 242, 0.4)',
    badge: 'Instant',
    iconLetter: 'Paytm',
    getUrl: getPaytmUpiUrl,
  },
  {
    name: 'BHIM UPI',
    brandColor: '#00529C',
    bgGradient: 'from-blue-700/20 to-orange-500/10',
    borderColor: 'rgba(0, 82, 156, 0.4)',
    badge: 'Govt NPCI',
    iconLetter: 'BHIM',
    getUrl: getStandardUpiUrl,
  },
  {
    name: 'Amazon Pay',
    brandColor: '#FF9900',
    bgGradient: 'from-amber-500/20 to-yellow-600/10',
    borderColor: 'rgba(255, 153, 0, 0.4)',
    badge: 'Rewards',
    iconLetter: 'Amazon',
    getUrl: getStandardUpiUrl,
  },
];

const PaymentMethods: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'qr' | 'upiId'>('qr');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeModalApp, setActiveModalApp] = useState<{ name: string; getUrl: () => string } | null>(null);

  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const upiUrl = getStandardUpiUrl();
        const dataUrl = await QRCode.toDataURL(upiUrl, {
          width: 450,
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
    downloadLink.download = `Shield-Protocol-QR-${PAYMENT_CONFIG.registrationFee}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleSelectApp = (appName: string, getUrl: () => string) => {
    // 1. Copy UPI ID immediately for smooth user fallback
    navigator.clipboard.writeText(PAYMENT_CONFIG.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);

    // 2. Open app specific URL immediately on mobile
    const appUrl = getUrl();
    try {
      window.location.href = appUrl;
    } catch (e) {
      console.warn('App launch error:', e);
    }

    // 3. Open guidance modal as backup
    setActiveModalApp({ name: appName, getUrl });
  };

  const handleDirectLaunch = () => {
    if (!activeModalApp) return;
    window.location.href = activeModalApp.getUrl();
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

      {/* Interactive App Launch & Guidance Modal */}
      <AnimatePresence>
        {activeModalApp && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setActiveModalApp(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="glass p-6 sm:p-8 rounded-3xl border border-blue-primary/40 bg-[#070e1c] max-w-md w-full relative shadow-[0_0_50px_rgba(14,165,233,0.3)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalApp(null)}
                className="absolute top-4 right-4 text-muted hover:text-white p-1 rounded-lg bg-white/5 transition"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-purple-600/20 border border-purple-500/40 text-purple-300">
                  <Smartphone size={24} />
                </div>
                <div>
                  <div className="section-badge text-[10px]">PAYMENT VIA {activeModalApp.name.toUpperCase()}</div>
                  <h3 className="font-sora font-bold text-lg text-white">
                    Pay ₹{PAYMENT_CONFIG.registrationFee}
                  </h3>
                </div>
              </div>

              {/* Status banner */}
              <div className="p-3.5 rounded-2xl bg-success/10 border border-success/30 text-success text-xs font-space font-semibold flex items-center gap-2 mb-5">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>UPI ID <strong className="font-mono">{PAYMENT_CONFIG.upiId}</strong> Copied!</span>
              </div>

              {/* Instructions steps */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-xs font-outfit text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-blue-primary/30 text-blue-accent font-space font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span>Opening <strong>{activeModalApp.name}</strong> app...</span>
                </div>
                <div className="flex items-start gap-3 text-xs font-outfit text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-blue-primary/30 text-blue-accent font-space font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span>If prompted, paste copied UPI ID: <span className="font-mono text-cyan-300">{PAYMENT_CONFIG.upiId}</span></span>
                </div>
                <div className="flex items-start gap-3 text-xs font-outfit text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-blue-primary/30 text-blue-accent font-space font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span>Enter amount <strong>₹{PAYMENT_CONFIG.registrationFee}</strong> and confirm. Or scan QR Code!</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleDirectLaunch}
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-space font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(147,51,234,0.4)] hover:scale-[1.02] transition-transform"
                >
                  <span>Re-launch {activeModalApp.name}</span>
                  <ExternalLink size={14} />
                </button>
                <button
                  onClick={() => {
                    setActiveModalApp(null);
                    setSelectedTab('qr');
                  }}
                  className="px-4 py-3 rounded-xl glass border border-white/20 text-white font-space font-semibold text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition"
                >
                  <QrCode size={14} />
                  <span>Scan QR Code</span>
                </button>
              </div>
            </motion.div>
          </div>
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
          {/* Left Column: Interactive Scannable NPCI QR Code Box */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-primary via-blue-accent to-blue-primary rounded-3xl blur-xl opacity-40 group-hover:opacity-75 transition duration-500" />
              
              <div className="relative glass p-6 rounded-3xl border border-blue-primary/40 bg-bg-primary flex flex-col items-center">
                {/* Scannable NPCI Compliant QR Code with ₹725 Pre-configured */}
                <div className="relative p-3 bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center border border-white/20 overflow-hidden min-h-[220px] min-w-[220px]">
                  {qrDataUrl ? (
                    <img
                      id="shield-upi-qr-img"
                      src={qrDataUrl}
                      alt={`UPI QR Code for ${PAYMENT_CONFIG.payeeName} (${PAYMENT_CONFIG.upiId})`}
                      className="w-[220px] h-[220px] rounded-xl object-contain"
                    />
                  ) : (
                    <div className="w-[220px] h-[220px] flex items-center justify-center text-black text-xs font-mono">
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
                onClick={() => handleSelectApp('PhonePe', getPhonePeUpiUrl)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-space font-semibold text-xs shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.7)] transition-all"
              >
                <span>Pay via PhonePe</span>
                <ArrowRight size={15} />
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
              <Sparkles size={14} className="text-blue-accent" /> Select Your Preferred UPI App
            </span>
            <span className="text-[11px] font-space text-muted">
              Auto-copies UPI ID & preset amount ₹{PAYMENT_CONFIG.registrationFee}
            </span>
          </div>

          {/* UPI App Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {UPI_APPS.map((app) => (
              <motion.button
                key={app.name}
                onClick={() => handleSelectApp(app.name, app.getUrl)}
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
                </span>

                <span className="text-[10px] font-space text-muted mt-0.5">
                  1-Tap Launch
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
