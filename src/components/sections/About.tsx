import React from 'react'
import { motion } from 'framer-motion'
import {
  Target, Eye, Lightbulb, Users, BookOpen,
  Network, Briefcase, TrendingUp, Shield, Cpu, Lock, Globe
} from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'

const pillars = [
  {
    icon: <Shield size={24} />,
    title: 'Cyber Security',
    desc: 'Hands-on penetration testing and real-world defense strategies.',
    color: 'from-blue-primary/20 to-transparent',
  },
  {
    icon: <Lock size={24} />,
    title: 'Ethical Hacking',
    desc: 'CTF challenges, bug bounty simulations, and responsible disclosure workshops.',
    color: 'from-blue-accent/20 to-transparent',
  },
  {
    icon: <Cpu size={24} />,
    title: 'Artificial Intelligence',
    desc: 'AI-driven security tools, machine learning for threat detection, and automation.',
    color: 'from-blue-highlight/20 to-transparent',
  },
  {
    icon: <Globe size={24} />,
    title: 'Cloud Security',
    desc: 'Securing cloud infrastructure, zero-trust architecture, and DevSecOps practices.',
    color: 'from-blue-primary/20 to-transparent',
  },
]

const reasons = [
  {
    icon: <BookOpen size={20} />,
    title: 'Hands-on Learning',
    desc: 'Real-world labs, live demonstrations, and practical workshops led by industry experts.',
  },
  {
    icon: <Network size={20} />,
    title: 'Elite Networking',
    desc: 'Connect with 1200+ participants, mentors, and recruiters from top tech companies.',
  },
  {
    icon: <Briefcase size={20} />,
    title: 'Career Opportunities',
    desc: 'Direct interactions with hiring managers and placement opportunities.',
  },
  {
    icon: <TrendingUp size={20} />,
    title: 'Professional Growth',
    desc: 'Industry-recognized certificates, hackathon wins, and portfolio-worthy projects.',
  },
  {
    icon: <Users size={20} />,
    title: 'Community',
    desc: 'Join a thriving community of cyber professionals, builders, and innovators.',
  },
  {
    icon: <Lightbulb size={20} />,
    title: 'Innovation Lab',
    desc: 'Prototype real security tools, pitch ideas, and compete for prize pools.',
  },
]

const objectives = [
  {
    icon: <Target size={28} />,
    title: 'Mission',
    desc: 'Empower the next generation of cybersecurity professionals through immersive learning, cutting-edge workshops, and collaborative problem-solving. We exist to bridge the gap between academic theory and industry practice.',
  },
  {
    icon: <Eye size={28} />,
    title: 'Vision',
    desc: 'To become the most influential college-level cybersecurity event in the region — a launchpad for future security leaders, innovators, and ethical hackers who will shape the digital landscape.',
  },
]

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 bg-bg-primary overflow-hidden" aria-label="About the event">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid-bg opacity-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px neon-line" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="About The Event"
          title="What is"
          highlight="Shield Protocol?"
          subtitle="A multi-day immersive cybersecurity summit designed for students who refuse to be ordinary — where every challenge is a lesson and every connection is a career."
        />

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mt-16 mb-16">
          {objectives.map((obj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="glass-card p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-primary/10 transition-colors" />
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-primary/10 text-blue-accent shrink-0 group-hover:bg-blue-primary/20 transition-colors">
                  {obj.icon}
                </div>
                <div>
                  <h3 className="font-sora font-bold text-xl text-white mb-3">{obj.title}</h3>
                  <p className="text-muted leading-relaxed">{obj.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pillars */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-sora font-bold text-2xl text-white mb-8"
          >
            Core <span className="gradient-text">Domains</span>
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card p-6 text-center group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mx-auto mb-4 text-blue-accent group-hover:scale-110 transition-transform`}>
                  {p.icon}
                </div>
                <h4 className="font-sora font-semibold text-white mb-2">{p.title}</h4>
                <p className="text-muted text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Attend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12"
        >
          <h3 className="font-sora font-bold text-2xl md:text-3xl text-white mb-8 text-center">
            Why <span className="gradient-text">Attend</span>?
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className="p-2.5 rounded-lg bg-blue-primary/10 text-blue-accent shrink-0 group-hover:bg-blue-primary/20 transition-colors mt-0.5">
                  {r.icon}
                </div>
                <div>
                  <h4 className="font-space font-semibold text-white mb-1">{r.title}</h4>
                  <p className="text-muted text-sm leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Outcomes Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 relative rounded-2xl overflow-hidden border border-blue-primary/20 p-8 md:p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(16,24,32,0.9) 50%, rgba(14,165,233,0.08) 100%)',
          }}
        >
          <div className="absolute inset-0 cyber-grid-bg opacity-20" />
          <div className="relative z-10">
            <div className="section-badge mb-4">What You'll Take Home</div>
            <h3 className="font-sora font-bold text-2xl md:text-3xl text-white mb-6">
              Learning <span className="gradient-text">Outcomes</span>
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                'Industry-recognized participation certificates',
                'Hands-on CTF and hackathon experience',
                'Real-world cybersecurity project portfolio',
                'Expert-led networking opportunities',
                'Exposure to cutting-edge security tools',
                'Career guidance from industry leaders',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-left glass px-4 py-3 rounded-lg border border-blue-primary/10"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-accent shrink-0" />
                  <span className="text-sm text-muted">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
