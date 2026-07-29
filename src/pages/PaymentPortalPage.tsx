import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Shield, CheckCircle2, Lock, Sparkles, ExternalLink } from 'lucide-react';
import CursorSpotlight from '../components/payment/CursorSpotlight';
import ProgressBar, { PaymentStep } from '../components/payment/ProgressBar';
import HeroPaymentCard from '../components/payment/HeroPaymentCard';
import PaymentMethods from '../components/payment/PaymentMethods';
import SecurityPanel from '../components/payment/SecurityPanel';
import PaymentInstructions from '../components/payment/PaymentInstructions';
import TransactionForm, { SubmissionData } from '../components/payment/TransactionForm';
import SuccessState from '../components/payment/SuccessState';
import FloatingStatusCard from '../components/payment/FloatingStatusCard';
import RightSidebar from '../components/payment/RightSidebar';
import MobilePaymentBar from '../components/payment/MobilePaymentBar';
import ShieldLogo from '../components/ui/ShieldLogo';
import { PAYMENT_CONFIG } from '../config/paymentConfig';

interface PaymentPortalPageProps {
  onBackToHome?: () => void;
}

const PaymentPortalPage: React.FC<PaymentPortalPageProps> = ({ onBackToHome }) => {
  const [currentStep, setCurrentStep] = useState<PaymentStep>('payment');
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmission = (data: SubmissionData) => {
    setSubmissionData(data);
    setCurrentStep('verification');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setSubmissionData(null);
    setCurrentStep('payment');
  };

  return (
    <div className="min-h-screen bg-bg-primary text-white font-outfit relative overflow-x-hidden selection:bg-blue-primary/30 selection:text-blue-accent pb-24 md:pb-16">
      {/* Background Lighting & Cyber Grid */}
      <CursorSpotlight />
      <div className="absolute inset-0 cyber-grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px neon-line pointer-events-none" />

      {/* Top Ambient Glow Radial */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(14,165,233,0.18) 0%, rgba(16,24,32,0) 70%)',
        }}
      />

      {/* Portal Navbar Header */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-bg-primary/80 border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBackToHome && (
              <motion.button
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBackToHome}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass border border-white/10 text-xs font-space font-medium text-muted hover:text-white hover:border-blue-primary/40 transition-all"
              >
                <ArrowLeft size={14} /> Back to Event
              </motion.button>
            )}

            <div className="flex items-center gap-3">
              <ShieldLogo size={36} animated={true} glow={true} />
              <div>
                <span className="font-sora font-extrabold text-sm sm:text-base tracking-tight text-white block leading-none">
                  {PAYMENT_CONFIG.eventName}
                </span>
                <span className="font-space text-[10px] text-blue-accent tracking-widest uppercase block mt-0.5">
                  Official Checkout Portal
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-blue-primary/10 border border-blue-primary/30 text-blue-accent text-xs font-space">
              <Lock size={12} strokeWidth={2.5} /> Secure 256-Bit SSL
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-space">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Portal
            </div>
          </div>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 relative z-10">
        {/* Page Title & Subtitle Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-primary/10 border border-blue-primary/30 text-blue-accent text-xs font-space font-semibold uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(14,165,233,0.3)]">
              <Sparkles size={14} /> Final Step to Confirm Participation
            </div>

            <h1 className="font-sora font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Complete Your <span className="gradient-text">Registration</span>
            </h1>

            <div className="mt-4 space-y-1.5 text-muted text-sm sm:text-base font-outfit max-w-2xl mx-auto leading-relaxed">
              <p className="text-white font-medium flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-success shrink-0" />
                Your registration details have been successfully received.
              </p>
              <p className="text-blue-accent flex items-center justify-center gap-2">
                <Lock size={15} className="shrink-0" />
                Your seat is temporarily reserved.
              </p>
              <p className="text-muted">
                Complete the registration fee of <strong className="text-white">₹{PAYMENT_CONFIG.registrationFee}</strong> to confirm your participation.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Animated Progress Bar */}
        <ProgressBar currentStep={currentStep} />

        {/* Hero Payment Card */}
        <HeroPaymentCard
          statusText={submissionData ? 'Under Verification' : 'Waiting for Payment'}
          isSubmitted={!!submissionData}
        />

        {/* Main Grid: Left Column Payment Steps + Right Sidebar Summary */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* UPI Payment Methods Card */}
            <PaymentMethods />

            {/* Payment Instructions Timeline */}
            <PaymentInstructions />

            {/* Transaction Form OR Success State */}
            <div ref={formRef}>
              <AnimatePresence mode="wait">
                {submissionData ? (
                  <SuccessState
                    key="success"
                    data={submissionData}
                    onReset={handleResetForm}
                  />
                ) : (
                  <TransactionForm
                    key="form"
                    onSubmitSuccess={handleSubmission}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <RightSidebar />
            <SecurityPanel />
          </div>
        </div>
      </main>

      {/* Floating Real-Time Status Card */}
      <FloatingStatusCard currentStep={currentStep} />

      {/* Mobile Sticky Payment Bar */}
      <MobilePaymentBar
        isSubmitted={!!submissionData}
        onScrollToForm={scrollToForm}
      />
    </div>
  );
};

export default PaymentPortalPage;
