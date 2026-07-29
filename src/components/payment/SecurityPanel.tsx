import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  CheckCircle,
  Eye,
  FileCheck,
  Shield,
  Zap,
} from 'lucide-react';
import { PAYMENT_CONFIG } from '../../config/paymentConfig';

const securityFeatures = [
  {
    icon: Lock,
    title: '256-bit Secure Interface',
    description: 'Bank-grade transport layer security for all data transmissions.',
    color: 'text-blue-accent',
  },
  {
    icon: CreditCard,
    title: 'No Card Information Collected',
    description: 'Zero card or banking credential exposure. Pure UPI transfer.',
    color: 'text-emerald-400',
  },
  {
    icon: CheckCircle,
    title: 'No Hidden Charges',
    description: `Exact fee ₹${PAYMENT_CONFIG.registrationFee} with zero convenience or gateway surcharges.`,
    color: 'text-cyan-400',
  },
  {
    icon: ShieldCheck,
    title: 'Official Event Collection Account',
    description: `Direct payment into ${PAYMENT_CONFIG.payeeName} verified UPI account.`,
    color: 'text-blue-primary',
  },
  {
    icon: Eye,
    title: 'Manual Payment Verification',
    description: 'Every transaction is cross-checked with UTR bank ledger logs.',
    color: 'text-purple-400',
  },
  {
    icon: FileCheck,
    title: 'Safe UPI Payment',
    description: 'Compliant with NPCI Unified Payments Interface security standards.',
    color: 'text-green-400',
  },
];

const SecurityPanel: React.FC = () => {
  return (
    <div className="w-full glass-card p-6 sm:p-8 border border-blue-primary/30 relative overflow-hidden backdrop-blur-xl bg-bg-secondary/70 rounded-3xl">
      {/* Background Cyber Graphic */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-blue-primary/10 border border-blue-primary/30 text-blue-accent relative group">
          <Shield size={24} className="animate-pulse" />
          <div className="absolute -inset-1 bg-blue-primary/20 rounded-2xl blur group-hover:opacity-100 transition" />
        </div>
        <div>
          <span className="section-badge text-[10px]">SECURITY GUARANTEE</span>
          <h3 className="font-sora font-bold text-xl text-white">
            Trust & Security Panel
          </h3>
        </div>
      </div>

      <p className="text-muted text-xs sm:text-sm font-outfit mb-6">
        The Shield Protocol 2026 employs zero-trust payment architecture to ensure maximum safety.
      </p>

      {/* Security Features Grid */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        {securityFeatures.map((item, index) => {
          const ItemIcon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ x: 4 }}
              className="glass p-3.5 sm:p-4 rounded-2xl border border-white/5 hover:border-blue-primary/30 flex items-start gap-3.5 transition-all bg-bg-primary/40 group"
            >
              <div className={`p-2.5 rounded-xl bg-white/5 shrink-0 ${item.color} group-hover:scale-110 transition-transform`}>
                <ItemIcon size={18} />
              </div>
              <div>
                <h4 className="font-sora font-semibold text-xs sm:text-sm text-white flex items-center gap-1.5">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-muted font-outfit mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Animated Cyber Shield Illustration Graphic */}
      <div className="glass p-6 rounded-2xl border border-blue-primary/30 bg-gradient-to-br from-blue-primary/10 via-bg-primary to-bg-secondary flex flex-col items-center text-center relative overflow-hidden">
        <div className="relative w-20 h-20 flex items-center justify-center mb-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-blue-primary/40"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="p-4 rounded-full bg-blue-primary/20 text-blue-accent border border-blue-accent/50 shadow-[0_0_20px_rgba(14,165,233,0.5)]"
          >
            <ShieldCheck size={36} />
          </motion.div>
        </div>

        <span className="font-space font-bold text-xs text-white tracking-wide uppercase">
          Verified Event Merchant
        </span>
        <span className="text-[11px] font-space text-muted mt-0.5">
          {PAYMENT_CONFIG.merchantName}
        </span>
      </div>
    </div>
  );
};

export default SecurityPanel;
