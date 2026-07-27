import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import ShieldLogo from './ui/ShieldLogo'

const quickLinks = [
  { label: 'Home', href: '#home' }, { label: 'About', href: '#about' },
  { label: 'Previous Event', href: '#previous-event' }, { label: 'Hackathon', href: '#hackathon' },
  { label: 'Current Event', href: '#current-event' }, { label: 'Gallery', href: '#gallery' },
  { label: 'Register', href: '#register' }, { label: 'Contact', href: '#contact' },
]

const sponsors = ['TechCorp India', 'CyberLabs', 'SecureNet', 'InnovateTech', 'CloudVault', 'DefendIQ']

const socials = [
  { label: 'Twitter/X', href: '#' }, { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' }, { label: 'GitHub', href: '#' }, { label: 'Discord', href: '#' },
]

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative bg-bg-secondary border-t border-white/5 overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 cyber-grid-bg opacity-5" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
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
                <a key={s.label} href={s.href} className="text-xs px-3 py-1.5 glass rounded-lg border border-white/10 text-muted hover:text-blue-accent hover:border-blue-primary/30 transition-all" aria-label={`Follow on ${s.label}`}>
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

          {/* Sponsors */}
          <div>
            <h3 className="font-space font-semibold text-white mb-4 text-sm uppercase tracking-wider">Partners & Sponsors</h3>
            <div className="space-y-2">
              {sponsors.map(s => (
                <div key={s} className="text-muted text-sm font-outfit hover:text-white transition-colors cursor-pointer">{s}</div>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-space font-semibold text-white mb-4 text-sm uppercase tracking-wider">Legal & Info</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Code of Conduct', 'Cookie Policy', 'Accessibility'].map(item => (
                <li key={item}>
                  <a href="#" className="text-muted text-sm hover:text-blue-accent transition-colors font-outfit">{item}</a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="font-space text-xs text-muted uppercase tracking-wider mb-2">Support</h4>
              <a href="mailto:support@shieldprotocol2026.in" className="text-sm text-blue-accent hover:underline">support@shieldprotocol2026.in</a>
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
