import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Award, Users, Zap, CheckCircle, ArrowRight, UserCheck } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { PAYMENT_CONFIG } from '../../config/paymentConfig'
import RegistrationModal from '../registration/RegistrationModal'
import { RegistrationRecord } from '../../types/database'

const perks = [
  { icon: <Shield size={20} />, text: 'Access to all Keynotes & Cyber Workshops' },
  { icon: <Award size={20} />, text: 'Participation Certificate for all attendees' },
  { icon: <Users size={20} />, text: 'Network with  Cyber Professionals & Mentors' },
  { icon: <Zap size={20} />, text: 'Compete in Shield X Hackathon & CTF' },
]

interface RegistrationProps {
  onOpenPaymentPortal?: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ onOpenPaymentPortal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegistrationSuccess = (_record: RegistrationRecord) => {
    // Keep modal open on Step 3 confirmation screen (no redirection)
  };

  return (
    <>
      <section
        id="register"
        className="relative py-24 bg-bg-primary overflow-hidden"
        aria-label="Event registration"
      >
        {/* Background elements */}
        <div className="absolute inset-0 cyber-grid-bg opacity-10" aria-hidden="true" />
        <div className="absolute top-0 left-0 right-0 h-px neon-line" aria-hidden="true" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(14,165,233,0.08) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Join The Event"
            title="Pay & Register"
            highlight="Now"
            subtitle="Secure your spot at The Shield Protocol 2026. Complete fee via our secure UPI payment portal."
          />

          <div className="mt-14 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 md:p-12 relative overflow-hidden border border-blue-primary/30 text-center"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-primary/10 text-blue-accent border border-blue-primary/20 text-xs font-space font-semibold mb-6">
                <CheckCircle size={14} /> Registration & Payment Verification Open
              </div>

              <h3 className="font-sora font-bold text-2xl md:text-4xl text-white mb-4">
                Ready to Join <span className="gradient-text">{PAYMENT_CONFIG.eventName}?</span>
              </h3>

              <p className="text-muted text-base max-w-2xl mx-auto mb-8 font-outfit leading-relaxed">
                Complete your registration fee of <strong className="text-white">₹{PAYMENT_CONFIG.registrationFee}</strong> via our official 256-bit encrypted UPI payment portal.
              </p>

              {/* Event Perks Grid */}
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10 text-left">
                {perks.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 glass p-4 rounded-xl border border-white/5">
                    <div className="p-2 rounded-lg bg-blue-primary/10 text-blue-accent shrink-0">
                      {p.icon}
                    </div>
                    <span className="text-white text-sm font-space leading-snug">{p.text}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl glow-btn text-white font-space font-bold text-base shadow-[0_0_30px_rgba(14,165,233,0.6)] hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <UserCheck size={20} />
                  <span>Pay Fee & Register(₹{PAYMENT_CONFIG.registrationFee})</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              <p className="text-xs text-muted font-space mt-4">
                🔒 • Safe • Trusted • 256-Bit SSL Encrypted
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleRegistrationSuccess}
      />
    </>
  )
}

export default Registration
