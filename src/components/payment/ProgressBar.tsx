import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, CreditCard, ShieldCheck, Award } from 'lucide-react';

export type PaymentStep = 'registration' | 'payment' | 'verification' | 'confirmation';

interface ProgressBarProps {
  currentStep: PaymentStep;
}

const steps = [
  {
    id: 'registration',
    label: 'Registration',
    icon: CheckCircle2,
    symbol: '✔',
    description: 'Details Received',
  },
  {
    id: 'payment',
    label: 'Payment',
    icon: CreditCard,
    symbol: '●',
    description: 'UPI Transfer',
  },
  {
    id: 'verification',
    label: 'Verification',
    icon: ShieldCheck,
    symbol: '○',
    description: 'Manual Check',
  },
  {
    id: 'confirmation',
    label: 'Confirmation',
    icon: Award,
    symbol: '○',
    description: 'Ticket Issued',
  },
] as const;

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const getStepIndex = (step: PaymentStep) => {
    switch (step) {
      case 'registration':
        return 0;
      case 'payment':
        return 1;
      case 'verification':
        return 2;
      case 'confirmation':
        return 3;
      default:
        return 1;
    }
  };

  const activeIndex = getStepIndex(currentStep);

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 px-4">
      {/* Container */}
      <div className="glass-card p-4 sm:p-6 border border-blue-primary/20 relative overflow-hidden">
        {/* Glow background line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-primary/10 via-blue-primary to-blue-primary/10" />

        <div className="relative flex items-center justify-between">
          {/* Connector Line Background */}
          <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-white/10 -z-0 hidden sm:block" />

          {/* Connector Line Active Fill */}
          <motion.div
            className="absolute top-5 left-[10%] h-0.5 bg-gradient-to-r from-blue-primary to-blue-accent -z-0 hidden sm:block shadow-[0_0_12px_#0EA5E9]"
            initial={{ width: '0%' }}
            animate={{
              width: `${(activeIndex / (steps.length - 1)) * 80}%`,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />

          {steps.map((step, index) => {
            const isCompleted = index < activeIndex || (index === 0 && activeIndex >= 0);
            const isCurrent = index === activeIndex;
            const StepIcon = step.icon;

            return (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center flex-1 text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-blue-primary text-white shadow-[0_0_20px_rgba(14,165,233,0.5)] border border-blue-accent'
                      : isCurrent
                      ? 'bg-bg-secondary text-blue-accent border-2 border-blue-primary shadow-[0_0_25px_rgba(14,165,233,0.8)] animate-pulse'
                      : 'bg-bg-secondary/80 text-muted border border-white/10'
                  }`}
                >
                  {isCompleted ? (
                    <span className="font-space font-bold text-lg text-white">✔</span>
                  ) : isCurrent ? (
                    <span className="font-space font-bold text-lg text-blue-accent animate-ping">●</span>
                  ) : (
                    <span className="font-space text-muted">○</span>
                  )}
                </motion.div>

                <div className="mt-3 flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <StepIcon
                      size={14}
                      className={
                        isCompleted
                          ? 'text-blue-accent'
                          : isCurrent
                          ? 'text-blue-primary animate-pulse'
                          : 'text-muted'
                      }
                    />
                    <span
                      className={`font-sora font-semibold text-xs sm:text-sm tracking-wide ${
                        isCompleted || isCurrent ? 'text-white' : 'text-muted'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-space text-muted/80 mt-0.5 hidden sm:block">
                    {step.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
