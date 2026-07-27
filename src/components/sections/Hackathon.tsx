import React from 'react'
import { motion } from 'framer-motion'
import {
  Code2, Users, Clock, Star, Brain, Shield, Link, Cloud, Cpu,
  Trophy, Award, ExternalLink
} from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import StatCard from '../ui/StatCard'

const domains = [
  { icon: <Brain size={24} />, title: 'AI & Machine Learning', color: 'from-blue-primary/20', desc: 'Build AI-powered security tools, threat detection systems, and intelligent anomaly detection.' },
  { icon: <Shield size={24} />, title: 'Cybersecurity', color: 'from-blue-accent/20', desc: 'Create defensive tools, vulnerability scanners, intrusion detection, and security frameworks.' },
  { icon: <Link size={24} />, title: 'Blockchain', color: 'from-blue-highlight/20', desc: 'Develop secure identity systems, smart contract auditors, and decentralized security applications.' },
  { icon: <Cloud size={24} />, title: 'Cloud & DevSecOps', color: 'from-blue-primary/20', desc: 'Infrastructure security automation, CI/CD hardening, and cloud posture management tools.' },
  { icon: <Cpu size={24} />, title: 'IoT Security', color: 'from-blue-accent/20', desc: 'Secure IoT firmware, network traffic analyzers, and embedded security solutions.' },
]

const winners = [
  {
    place: '1st Place',
    team: 'CipherStorm',
    project: 'AI-Powered SIEM Dashboard',
    desc: 'A real-time Security Information and Event Management system using ML to detect zero-day attacks with 97.3% accuracy.',
    tech: ['Python', 'TensorFlow', 'Elasticsearch', 'React'],
    prize: '₹25,000',
    color: 'text-warning border-warning/30 bg-warning/5',
  },
  {
    place: '2nd Place',
    team: 'NullPointers',
    project: 'Decentralized Identity Vault',
    desc: 'A blockchain-based self-sovereign identity system for secure credential management without central authority.',
    tech: ['Solidity', 'Web3.js', 'IPFS', 'React'],
    prize: '₹15,000',
    color: 'text-muted border-muted/30 bg-muted/5',
  },
  {
    place: '3rd Place',
    team: 'ByteForce',
    project: 'CloudGuard Sentinel',
    desc: 'Automated cloud misconfiguration detector with auto-remediation for AWS and Azure environments.',
    tech: ['Go', 'Terraform', 'AWS SDK', 'Vue.js'],
    prize: '₹10,000',
    color: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
  },
]

const problemStatements = [
  'Design a real-time threat intelligence sharing platform for organizations',
  'Build an AI-powered phishing detection browser extension',
  'Create a secure, encrypted communication app resistant to MITM attacks',
  'Develop a blockchain-based digital evidence chain of custody system',
  'Build an automated CVE patch prioritization engine using ML',
  'Design a zero-trust network access controller for remote teams',
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
          subtitle="A 36-hour non-stop innovation marathon where the brightest minds tackled real-world cybersecurity challenges. 120+ teams. 25+ mentors. Limitless ideas."
        />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-16">
          {[
            { value: 500, suffix: '+', label: 'Participants', icon: <Users size={20} /> },
            { value: 120, suffix: '+', label: 'Teams', icon: <Code2 size={20} /> },
            { value: 36, suffix: 'h', label: 'Duration', icon: <Clock size={20} /> },
            { value: 25, suffix: '+', label: 'Mentors', icon: <Star size={20} /> },
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
              Shield X was not just a hackathon — it was a 36-hour innovation sprint where participants were given real problem statements from industry partners, access to cloud sandboxes, and mentorship from cybersecurity veterans. Teams built, broke, and secured systems under pressure, with judging criteria including security, innovation, scalability, and presentation quality.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Real Problem Statements', 'Industry Mentors', 'Cloud Sandboxes', 'Expert Jury', 'Live Demos'].map((tag, i) => (
                <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-blue-primary/10 text-blue-accent border border-blue-primary/20 font-space">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Domains */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-2xl text-white mb-8 text-center"
          >
            Hackathon <span className="gradient-text">Domains</span>
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {/* Problem Statements */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-2xl text-white mb-8 text-center"
          >
            Sample Problem <span className="gradient-text">Statements</span>
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-4">
            {problemStatements.map((ps, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass p-4 rounded-xl border border-white/5 flex items-start gap-3 group hover:border-blue-primary/20 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-blue-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs text-blue-accent font-bold">{i + 1}</span>
                </div>
                <p className="text-muted text-sm group-hover:text-white/80 transition-colors">{ps}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Winning Teams */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sora font-bold text-2xl text-white mb-8 text-center"
          >
            Winning <span className="gradient-text">Teams</span>
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-6">
            {winners.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`glass-card p-6 border ${w.color}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Trophy size={20} className={w.color.split(' ')[0]} />
                  <span className={`font-space font-bold text-sm uppercase tracking-wider ${w.color.split(' ')[0]}`}>
                    {w.place}
                  </span>
                  <span className="ml-auto font-sora font-bold text-white">{w.prize}</span>
                </div>
                <h4 className="font-sora font-bold text-lg text-white mb-1">{w.team}</h4>
                <h5 className="text-blue-accent text-sm mb-3 font-medium">{w.project}</h5>
                <p className="text-muted text-sm leading-relaxed mb-4">{w.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {w.tech.map((t, j) => (
                    <span key={j} className="text-xs px-2 py-1 rounded bg-white/5 text-muted font-space">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hackathon
