import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, Mail, Clock } from 'lucide-react'
import ShieldLogo from './ui/ShieldLogo'

const quickLinks = [
  { label: 'Home', href: '#home' }, { label: 'About', href: '#about' },
  { label: 'Previous Event', href: '#previous-event' }, { label: 'Hackathon', href: '#hackathon' },
  { label: 'Current Event', href: '#current-event' }, { label: 'Gallery', href: '#gallery' },
  { label: 'Pay & Register', href: '#register' }, { label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/bits_vizag_official/' },
  { label: 'WhatsApp', href: 'https://www.whatsapp.com/channel/0029VaU1VjEJkK7Gz9iBjP1B' },
]

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative bg-bg-secondary border-t border-white/5 overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 cyber-grid-bg opacity-5" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <ShieldLogo size={48} animated />
              <div>
                <div className="font-sora font-bold text-white text-sm">THE SHIELD</div>
                <div className="font-sora font-bold text-white text-sm">PROTOCOL</div>
                <div className="font-space text-blue-primary text-xs">2026</div>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-5">
              The flagship cybersecurity and innovation event. Protect. Build. Innovate. Secure.
            </p>
            <div className="flex flex-wrap gap-2">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 glass rounded-lg border border-white/10 text-muted hover:text-blue-accent hover:border-blue-primary/30 transition-all inline-flex items-center gap-1.5"
                  aria-label={`Follow on ${s.label}`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-space font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <button onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })} className="text-muted text-sm hover:text-blue-accent transition-colors font-outfit flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-blue-primary/40 group-hover:bg-blue-primary transition-colors" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-space font-semibold text-white mb-4 text-sm uppercase tracking-wider">Support</h3>
            <p className="text-muted text-sm leading-relaxed mb-4 font-outfit">
              Have questions or need assistance with registration, payments, or event details? Contact our support team.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:theshieldprotocol@bitsvizag.com"
                className="flex items-center gap-2.5 text-sm text-blue-accent hover:underline font-outfit"
              >
                <Mail size={16} className="text-blue-primary shrink-0" />
                theshieldprotocol@bitsvizag.com
              </a>
              <div className="flex items-center gap-2.5 text-xs text-muted font-space">
                <Clock size={14} className="text-blue-primary/60 shrink-0" />
                Response time: Within 24 hours
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="neon-line mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs font-space text-center md:text-left">
            © 2026 The Shield Protocol. All rights reserved. Built with passion for cybersecurity education.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-muted font-space">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden="true" />
              All systems operational
            </div>
            <button onClick={scrollToTop} className="w-10 h-10 glass rounded-xl border border-white/10 flex items-center justify-center text-muted hover:text-blue-accent hover:border-blue-primary/30 transition-all" aria-label="Back to top">
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
