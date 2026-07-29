import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Clock, Lock } from 'lucide-react';
import ShieldLogo from '../ui/ShieldLogo';
import { PAYMENT_CONFIG } from '../../config/paymentConfig';

interface HeroPaymentCardProps {
  statusText?: string;
  isSubmitted?: boolean;
}

const HeroPaymentCard: React.FC<HeroPaymentCardProps> = ({
  statusText = 'Waiting for Payment',
  isSubmitted = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto mb-12"
    >
      <div className="relative group">
        {/* Soft Ambient Glow backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-primary/30 via-blue-accent/20 to-blue-primary/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 pointer-events-none" />

        {/* Main Floating Glass Card */}
        <div className="relative glass-card p-6 sm:p-10 md:p-12 border border-blue-primary/30 shadow-[0_0_50px_rgba(14,165,233,0.15)] rounded-3xl overflow-hidden backdrop-blur-2xl bg-bg-secondary/70">
          {/* Neon Top Line accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-primary to-transparent" />

          {/* Glowing Background Orbs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            {/* Left Header info */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-3 mb-4">
                <ShieldLogo size={52} animated={true} glow={true} />
                <div>
                  <span className="section-badge tracking-widest text-[11px] block">
                    THE SHIELD PROTOCOL • 2026
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-primary/10 border border-blue-primary/30 text-[11px] font-space text-blue-accent">
                      <Lock size={11} /> 256-Bit Encrypted Portal
                    </span>
                  </div>
                </div>
              </div>

              <h1 className="font-sora font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
                Secure Registration <span className="gradient-text">Payment</span>
              </h1>

              <p className="text-muted font-outfit text-sm sm:text-base mt-2 max-w-md">
                Official checkout portal for {PAYMENT_CONFIG.eventName}. Complete fee to secure your seat.
              </p>

              {/* Status Indicator */}
              <div className="mt-5 flex items-center gap-2">
                <div className="text-xs font-space font-medium text-muted uppercase tracking-wider">
                  Payment Status:
                </div>
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-space font-semibold border ${
                    isSubmitted
                      ? 'bg-success/10 text-success border-success/30 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                      : 'bg-warning/10 text-warning border-warning/30 shadow-[0_0_15px_rgba(250,204,21,0.3)]'
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isSubmitted ? 'bg-success' : 'bg-warning'
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-2 w-2 ${
                        isSubmitted ? 'bg-success' : 'bg-warning'
                      }`}
                    />
                  </span>
                  {statusText}
                </div>
              </div>
            </div>

            {/* Right Display: Fee in Very Large Typography */}
            <div className="w-full md:w-auto flex flex-col items-center md:items-end">
              <div className="glass p-6 sm:p-8 rounded-2xl border border-blue-primary/30 w-full sm:w-80 text-center md:text-right relative overflow-hidden group/fee bg-gradient-to-br from-bg-secondary/90 to-bg-primary">
                {/* Micro reflection shimmer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover/fee:translate-x-full transition-transform duration-1000" />

                <div className="flex items-center justify-between md:justify-end gap-2 text-xs font-space text-muted mb-1">
                  <span>REGISTRATION FEE</span>
                  <span className="px-2 py-0.5 bg-blue-primary/20 text-blue-accent rounded font-mono text-[10px]">
                    {PAYMENT_CONFIG.currency}
                  </span>
                </div>

                <div className="flex items-baseline justify-center md:justify-end gap-1 my-1">
                  <span className="font-sora font-extrabold text-3xl text-blue-accent">
                    {PAYMENT_CONFIG.currencySymbol}
                  </span>
                  <span className="font-sora font-black text-5xl sm:text-6xl text-white tracking-tight drop-shadow-[0_0_20px_rgba(14,165,233,0.5)]">
                    {PAYMENT_CONFIG.registrationFee}
                  </span>
                </div>

                <div className="pt-3 mt-3 border-t border-white/10 text-[12px] font-space text-muted flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="text-muted/70">Merchant:</span>
                    <span className="text-white font-medium">{PAYMENT_CONFIG.merchantName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted/70">Purpose:</span>
                    <span className="text-blue-accent font-medium">Cybersecurity Summit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroPaymentCard;
