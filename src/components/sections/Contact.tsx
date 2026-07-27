import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'

const MAPS_URL = 'https://maps.app.goo.gl/C7uEWYzWyjr45xiM9?g_st=aw'

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative py-24 bg-bg-secondary overflow-hidden" aria-label="Contact us">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px neon-line" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Contact" title="Get In" highlight="Touch" subtitle="Have questions or want to collaborate? Reach out to us or visit our venue." />
        
        <div className="grid lg:grid-cols-2 gap-8 mt-14 items-stretch">

          {/* Left — Event Details & Socials */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6 flex flex-col justify-between">
            <div className="glass-card p-8 flex-1">
              <h3 className="font-sora font-bold text-xl text-white mb-6">Event <span className="gradient-text">Details</span></h3>
              <div className="space-y-6">
                {[
                  { icon: <MapPin size={22} />, label: 'Venue', value: 'BITS VIZAG (Autonomous)\nVisakhapatnam, Andhra Pradesh' },
                  { icon: <Phone size={22} />, label: 'Phone', value: '+91 98765 43210\n+91 87654 32109' },
                  { icon: <Mail size={22} />, label: 'Email', value: 'support@shieldprotocol2026.in\nhackathon@shieldprotocol2026.in' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-blue-primary/10 text-blue-accent shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-xs font-space text-muted uppercase tracking-wider mb-1">{item.label}</div>
                      {item.value.split('\n').map((v, j) => (
                        <div key={j} className="text-white text-base font-medium leading-snug">{v}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="glass-card p-6">
              <h4 className="font-space font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                {['Instagram', 'WhatsApp'].map(social => (
                  <button key={social} className="px-4 py-2 glass rounded-lg border border-white/10 text-xs font-space text-muted hover:text-blue-accent hover:border-blue-primary/30 transition-all">
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Google Maps Card */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex">
            <div className="glass-card p-8 w-full flex flex-col justify-between relative overflow-hidden group border border-blue-primary/20">
              <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-primary/10 text-blue-accent flex items-center justify-center mb-2">
                  <MapPin size={28} />
                </div>
                <h3 className="font-sora font-bold text-2xl text-white">
                  Find Us On <span className="gradient-text">Google Maps</span>
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  The Shield Protocol 2026 is hosted at BITS VIZAG (Autonomous), Visakhapatnam, Andhra Pradesh. Click below to view exact directions on Google Maps.
                </p>

                {/* Map Preview Embed */}
                <div className="w-full h-56 rounded-xl overflow-hidden border border-white/10 relative my-4">
                  <iframe
                    title="BITS Vizag Google Map Location"
                    src="https://maps.google.com/maps?q=BITS%20VIZAG%20Visakhapatnam&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 filter grayscale opacity-85 hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-blue-primary text-white font-space font-semibold hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transition-all group-hover:scale-[1.01]"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Contact
