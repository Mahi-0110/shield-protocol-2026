import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Clock,
  HelpCircle,
  Mail,
  Phone,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  Ticket,
} from 'lucide-react';
import { PAYMENT_CONFIG } from '../../config/paymentConfig';

const RightSidebar: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 30, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* Event Summary Card */}
      <div className="glass-card p-6 sm:p-7 border border-blue-primary/30 relative overflow-hidden backdrop-blur-xl bg-bg-secondary/80 rounded-3xl">
        <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-4">
          <div className="p-2.5 rounded-xl bg-blue-primary/10 text-blue-accent border border-blue-primary/30">
            <Ticket size={20} />
          </div>
          <div>
            <span className="section-badge text-[10px]">SUMMARY</span>
            <h3 className="font-sora font-bold text-lg text-white">Event Pass Summary</h3>
          </div>
        </div>

        <div className="space-y-4 text-xs font-space">
          {/* Event Name */}
          <div className="flex items-start justify-between">
            <span className="text-muted">Event Name:</span>
            <span className="text-white font-bold text-right font-sora">{PAYMENT_CONFIG.eventName}</span>
          </div>

          {/* Subtitle */}
          <div className="flex items-start justify-between">
            <span className="text-muted">Category:</span>
            <span className="text-blue-accent font-medium text-right">{PAYMENT_CONFIG.eventSubtitle}</span>
          </div>

          {/* Registration Fee */}
          <div className="flex items-start justify-between pt-2 border-t border-white/5">
            <span className="text-muted">Registration Fee:</span>
            <span className="text-white font-black text-sm text-right">₹{PAYMENT_CONFIG.registrationFee} INR</span>
          </div>

          {/* Venue */}
          <div className="flex items-start justify-between">
            <span className="text-muted flex items-center gap-1">
              <MapPin size={13} className="text-blue-primary" /> Venue:
            </span>
            <span className="text-white font-medium text-right max-w-[150px] truncate">{PAYMENT_CONFIG.venue}</span>
          </div>

          {/* Duration */}
          <div className="flex items-start justify-between">
            <span className="text-muted flex items-center gap-1">
              <Calendar size={13} className="text-blue-primary" /> Duration:
            </span>
            <span className="text-white font-medium text-right">{PAYMENT_CONFIG.eventDuration}</span>
          </div>

          {/* Payment Method */}
          <div className="flex items-start justify-between">
            <span className="text-muted">Payment Method:</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 size={13} /> UPI Transfer
            </span>
          </div>
        </div>

        {/* Countdown Timer Badge */}
        <div className="mt-6 p-4 rounded-2xl bg-blue-primary/10 border border-blue-primary/30 text-center">
          <span className="text-[10px] font-space text-muted uppercase tracking-widest block mb-2 flex items-center justify-center gap-1.5">
            <Clock size={12} className="text-warning animate-spin" /> Seat Reservation Countdown
          </span>
          <div className="flex items-center justify-center gap-2 font-mono font-bold text-lg text-white">
            <span className="px-3 py-1.5 rounded-xl bg-bg-primary border border-blue-primary/40 text-blue-accent font-extrabold text-xl shadow-[0_0_15px_rgba(14,165,233,0.3)]">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            <span className="text-blue-accent font-bold text-xl">:</span>
            <span className="px-3 py-1.5 rounded-xl bg-bg-primary border border-blue-primary/40 text-white font-extrabold text-xl">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>
      </div>

      {/* Organizer Support Contact Card */}
      <div className="glass-card p-6 border border-white/10 relative overflow-hidden backdrop-blur-xl bg-bg-secondary/70 rounded-3xl">
        <div className="flex items-center gap-2.5 mb-4">
          <HelpCircle size={18} className="text-blue-accent" />
          <h4 className="font-sora font-bold text-sm text-white">Need Help?</h4>
        </div>

        <p className="text-xs text-muted font-outfit mb-4">
          Have questions regarding payment or UTR submission? Contact our organizing desk:
        </p>

        <div className="space-y-3 text-xs font-space">
          <a
            href={`mailto:${PAYMENT_CONFIG.supportEmail}`}
            className="flex items-center gap-2.5 p-3 rounded-xl glass border border-white/5 hover:border-blue-primary/40 text-muted hover:text-white transition group"
          >
            <Mail size={15} className="text-blue-primary group-hover:scale-110 transition-transform" />
            <span className="truncate">{PAYMENT_CONFIG.supportEmail}</span>
          </a>

          <a
            href={`tel:${PAYMENT_CONFIG.supportPhone}`}
            className="flex items-center gap-2.5 p-3 rounded-xl glass border border-white/5 hover:border-blue-primary/40 text-muted hover:text-white transition group"
          >
            <Phone size={15} className="text-blue-primary group-hover:scale-110 transition-transform" />
            <span>{PAYMENT_CONFIG.supportPhone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
