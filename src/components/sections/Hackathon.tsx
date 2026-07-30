import React from 'react'
import { motion } from 'framer-motion'
import {
  Code2, Users, Clock, Star, Brain, Shield, Cpu
} from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import StatCard from '../ui/StatCard'

const domains = [
  { icon: <Brain size={24} />, title: 'AI & Machine Learning', color: 'from-blue-primary/20', desc: 'Build AI-powered security tools, threat detection systems, and intelligent anomaly detection.' },
  { icon: <Shield size={24} />, title: 'Cybersecurity', color: 'from-blue-accent/20', desc: 'Create defensive tools, vulnerability scanners, intrusion detection, and security frameworks.' },
  { icon: <Cpu size={24} />, title: 'IoT Security', color: 'from-blue-accent/20', desc: 'Secure IoT firmware, network traffic analyzers, and embedded security solutions.' },
]

const Hackathon: React.FC = () => {
  return (
    <section id="hackathon" className="relative py-24 bg-bg-primary overflow-hidden" aria-label="Shield X Hackathon">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px neon-line" aria-hidden="true" />

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_100%,rgba(14,165,233,0.06)_0%,transparent_100%)]" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Case Study"
          title="Shield X"
          highlight="Hackathon"
          subtitle="A 9-hour non-stop innovation marathon where the brightest minds tackled real-world cybersecurity challenges. 50+ teams. 3 mentors. Limitless ideas."
        />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-16">
          {[
            { value: 200, suffix: '', label: 'Delegates', icon: <Users size={20} /> },
            { value: 50, suffix: '+', label: 'Teams', icon: <Code2 size={20} /> },
            { value: 9, suffix: 'Hrs', label: 'Duration', icon: <Clock size={20} /> },
            { value: 3, suffix: '+', label: 'Mentors', icon: <Star size={20} /> },
          ].map((s, i) => (
            <StatCard key={i} {...s} delay={i * 0.1} />
          ))}
        </div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl">
            <span className="section-badge mb-3 block">Overview</span>
            <h3 className="font-sora font-bold text-2xl md:text-3xl text-white mb-4">
              Where Innovation Meets <span className="gradient-text">Security</span>
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              Shield X was not just a hackathon — it was a 9-hour innovation sprint where participants were given real problem statements from Cyber Experts, and mentorship from cybersecurity veterans. Teams built and secured systems under pressure, with judging criteria including security, and presentation quality.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Real Problem Statements', 'Industry Mentors', 'Expert Jury', 'Live Demos'].map((tag, i) => (
                <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-blue-primary/10 text-blue-accent border border-blue-primary/20 font-space">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Domains */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-2xl text-white mb-8 text-center"
          >
            Hackathon <span className="gradient-text">Domains</span>
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {domains.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-6 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${d.color} to-transparent flex items-center justify-center mb-4 text-blue-accent group-hover:scale-110 transition-transform`}>
                  {d.icon}
                </div>
                <h4 className="font-space font-semibold text-white mb-2">{d.title}</h4>
                <p className="text-muted text-sm leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hackathon
