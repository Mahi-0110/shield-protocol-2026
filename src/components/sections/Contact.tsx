import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import GlowButton from '../ui/GlowButton'

const inputClass = 'input-cyber w-full px-4 py-3 rounded-xl text-sm font-outfit'
const labelClass = 'block text-xs font-space font-semibold text-muted uppercase tracking-wider mb-2'

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email required'
    if (!form.subject.trim()) errs.subject = 'Subject is required'
    if (!form.message.trim()) errs.message = 'Message is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    // Simulate a brief delay then show success
    // (wire up to your preferred service — EmailJS, Formspree, etc.)
    await new Promise(r => setTimeout(r, 1200))
    setSent(true)
    setLoading(false)
  }

  return (
    <section id="contact" className="relative py-24 bg-bg-secondary overflow-hidden" aria-label="Contact us">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px neon-line" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Contact" title="Get In" highlight="Touch" subtitle="Have questions or want to collaborate? We'd love to hear from you." />
        <div className="grid lg:grid-cols-2 gap-12 mt-16">

          {/* Left — Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-sora font-bold text-xl text-white mb-6">Event <span className="gradient-text">Details</span></h3>
              <div className="space-y-4">
                {[
                  { icon: <MapPin size={20} />, label: 'Venue', value: 'Engineering College Auditorium\nMain Campus, Chennai – 600025' },
                  { icon: <Phone size={20} />, label: 'Phone', value: '+91 98765 43210\n+91 87654 32109' },
                  { icon: <Mail size={20} />, label: 'Email', value: 'support@shieldprotocol2026.in\nhackathon@shieldprotocol2026.in' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-blue-primary/10 text-blue-accent shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-xs font-space text-muted uppercase tracking-wider mb-0.5">{item.label}</div>
                      {item.value.split('\n').map((v, j) => (
                        <div key={j} className="text-white text-sm font-medium">{v}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="glass-card p-4 h-48 relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 cyber-grid-bg opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                <MapPin size={32} className="text-blue-primary" />
                <div className="text-white font-space font-semibold text-sm">Chennai, Tamil Nadu</div>
                <div className="text-muted text-xs">Engineering College Campus</div>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="mt-2 text-xs text-blue-accent font-space hover:underline">
                  Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="glass-card p-6">
              <h4 className="font-space font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                {['Twitter/X', 'LinkedIn', 'Instagram', 'GitHub', 'Discord'].map(social => (
                  <button key={social} className="px-4 py-2 glass rounded-lg border border-white/10 text-xs font-space text-muted hover:text-blue-accent hover:border-blue-primary/30 transition-all">
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="glass-card p-8">
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <CheckCircle2 size={64} className="text-success mx-auto mb-4" />
                  <h3 className="font-sora font-bold text-xl text-white mb-2">Message Sent!</h3>
                  <p className="text-muted text-sm mb-6">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="text-blue-accent text-sm font-space hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h3 className="font-sora font-bold text-xl text-white mb-6">Send a <span className="gradient-text">Message</span></h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} htmlFor="contact-name">Name *</label>
                        <input id="contact-name" className={inputClass} placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} aria-required="true" />
                        {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="contact-email">Email *</label>
                        <input id="contact-email" type="email" className={inputClass} placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} aria-required="true" />
                        {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="contact-subject">Subject *</label>
                      <input id="contact-subject" className={inputClass} placeholder="What is this about?" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} aria-required="true" />
                      {errors.subject && <p className="text-error text-xs mt-1">{errors.subject}</p>}
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="contact-message">Message *</label>
                      <textarea id="contact-message" className={`${inputClass} resize-none`} rows={5} placeholder="Tell us what's on your mind..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} aria-required="true" />
                      {errors.message && <p className="text-error text-xs mt-1">{errors.message}</p>}
                    </div>
                    <GlowButton type="submit" fullWidth size="md" disabled={loading} icon={<Send size={16} />}>
                      {loading ? 'Sending…' : 'Send Message'}
                    </GlowButton>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
