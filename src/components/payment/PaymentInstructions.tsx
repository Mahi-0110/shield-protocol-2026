import React from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone,
  CreditCard,
  Copy,
  RotateCcw,
  Send,
  Clock,
  MailCheck,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { PAYMENT_CONFIG } from '../../config/paymentConfig';

const timelineSteps = [
  {
    step: 1,
    title: 'Open any UPI App',
    description: 'Launch GPay, PhonePe, Paytm, BHIM, or Amazon Pay on your mobile device.',
    icon: Smartphone,
  },
  {
    step: 2,
    title: `Pay ₹${PAYMENT_CONFIG.registrationFee}`,
    description: `Scan QR code or send payment directly to VPA ID ${PAYMENT_CONFIG.upiId}.`,
    icon: CreditCard,
  },
  {
    step: 3,
    title: 'Copy Transaction ID',
    description: 'After successful transfer, copy the 12-digit UTR / UPI Reference Number from payment receipt.',
    icon: Copy,
  },
  {
    step: 4,
    title: 'Return to this page',
    description: 'Keep this checkout portal window active or revisit to finalize verification.',
    icon: RotateCcw,
  },
  {
    step: 5,
    title: 'Submit Transaction Details',
    description: 'Fill out your Email, Phone Number, and 12-digit UTR in the form below.',
    icon: Send,
  },
  {
    step: 6,
    title: 'Wait for Verification',
    description: 'Our automated team cross-verifies bank logs within 12 hours max.',
    icon: Clock,
  },
  {
    step: 7,
    title: 'Receive Confirmation Email',
    description: 'Get your official entry pass and QR ticket directly in your registered inbox.',
    icon: MailCheck,
  },
];

const PaymentInstructions: React.FC = () => {
  return (
    <div className="w-full glass-card p-6 sm:p-10 border border-blue-primary/30 relative overflow-hidden backdrop-blur-xl bg-bg-secondary/70 rounded-3xl mb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="section-badge mb-1">STEP-BY-STEP GUIDE</div>
          <h2 className="font-sora font-bold text-2xl text-white flex items-center gap-2">
            Payment Instructions Timeline
          </h2>
          <p className="text-muted text-xs sm:text-sm font-outfit mt-1">
            Follow these 7 simple steps to guarantee rapid manual verification.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-primary/10 border border-blue-primary/30 text-blue-accent text-xs font-space">
          <Sparkles size={14} /> Guided Flow
        </div>
      </div>

      {/* Interactive Timeline Container */}
      <div className="relative pl-4 sm:pl-8 space-y-6 before:absolute before:left-[19px] sm:before:left-[35px] before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-blue-primary before:via-blue-accent/50 before:to-blue-primary/20">
        {timelineSteps.map((s, index) => {
          const StepIcon = s.icon;
          const isLast = index === timelineSteps.length - 1;

          return (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="relative flex items-start gap-4 sm:gap-6 group"
            >
              {/* Step Circle Badge */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-bg-primary border border-blue-primary/50 text-blue-accent font-space font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(14,165,233,0.3)] group-hover:bg-blue-primary group-hover:text-white transition-all duration-300"
              >
                {s.step}
              </motion.div>

              {/* Step Card */}
              <div className="flex-1 glass p-4 sm:p-5 rounded-2xl border border-white/5 group-hover:border-blue-primary/40 transition-all bg-bg-primary/50">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-sora font-semibold text-sm sm:text-base text-white group-hover:text-blue-accent transition-colors flex items-center gap-2">
                    <StepIcon size={16} className="text-blue-primary shrink-0" />
                    {s.title}
                  </h3>
                  <span className="text-[10px] font-mono text-muted/60">
                    Step 0{s.step}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted font-outfit leading-relaxed">
                  {s.description}
                </p>

                {/* Animated Arrow Connector except for last step */}
                {!isLast && (
                  <div className="mt-3 flex justify-center text-blue-primary/40 group-hover:text-blue-accent transition-colors">
                    <ChevronDown size={16} className="animate-bounce" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentInstructions;
