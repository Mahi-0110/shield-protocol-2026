import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'

const testimonials = [
  {
    name: 'Sumeet Kumar',
    role: 'Final Year CSE',
    college: 'Shield Protocol 2025 Participant',
    content: 'This workshop turned a passing interest in cybersecurity into a definite career choice. Over three days, I gained hands-on experience setting up my first Kali Linux lab, using tools like Burp Suite and Wireshark, and conducting a social engineering phishing attack, culminating in a CTF hackathon where I was recognized at the Shield Protocol Hackathon for problem-solving and security fundamentals',
    rating: 5,
    initials: 'SK',
    image: '/sumeet-kumar.jpg',
  },
  {
    name: 'Bhavya',
    role: 'Final Year CSE',
    college: 'Shield Protocol 2025 Participant',
    content: 'Attending the Cybersecurity Workshop was a great learning experience with hands-on labs, interactive challenges, and a fun hackathon. Working with Kali Linux and cybersecurity tools boosted my practical skills and confidence. The mentors explained concepts clearly, making the workshop engaging, informative, and inspiring.',
    rating: 5,
    initials: 'B',
    image: '/bhavya.jpg',
  },
  {
    name: 'Shazia',
    role: '3rd Year Cyber Security',
    college: 'Shield Protocol 2025 Participant',
    content: 'Shield Protocol 2025 was a really fun and informative event. The cybersecurity workshop was engaging, and the hackathon gave us a chance to apply what we learned. The mentors were helpful, and the overall experience was well organised. Had a great time learning and collaborating with everyone and the way the event was organized was totally awesome!',
    rating: 5,
    initials: 'S',
    image: '/shazia.jpg',
  },
  {
    name: 'Kalyan',
    role: '3rd Year CSE-B',
    college: 'Shield Protocol 2025 Participant',
    content: 'One of the best workshops I have attended. The expert guidance, real-world demonstrations, and interactive sessions made it an unforgettable learning experience.',
    rating: 5,
    initials: 'K',
    image: '/kalyan.jpg',
  },
  {
    name: 'Jaishree',
    role: '3rd Year AIML',
    college: 'Shield Protocol 2025 Participant',
    content: 'The training was really good. At first, I thought it would be a normal PPT session, but it was completely hands-on, which made learning much easier. I learned Linux, basic tools, and many new concepts. The best part was the support from the team. Whenever we got stuck or had any doubts, the team members patiently guided us and helped us. Overall, it was a great learning experience. Thank you, Shield Protocol team!',
    rating: 5,
    initials: 'J',
    image: '/jaishree.jpg',
  },
  {
    name: 'Govardhan',
    role: '3rd Year CSE-A',
    college: 'Shield Protocol 2025 Participant',
    content: 'A wonderful workshop that transformed my understanding of cybersecurity. Thank you, Supraja Technologies, for delivering such a valuable and impactful learning experience.',
    rating: 5,
    initials: 'G',
    image: '/govardhan.png',
  },
  {
    name: 'Sai Sravani',
    role: 'Final Year CSE',
    college: 'Shield Protocol 2025 Participant',
    content: 'Attending the Shield Protocol Level 1 session was a truly enriching experience. The hands-on approach made learning cybersecurity concepts engaging and practical. I gained valuable skills and knowledge that I believe will be incredibly useful in my academic and professional journey.',
    rating: 5,
    initials: 'SS',
    image: '/saisravani.jpg',
  },
  {
    name: 'Sohail Khan',
    role: '3rd Year CSE-B',
    college: 'BITS Vizag & Supraja Technologies',
    content: 'The Shield Protocol workshop and hackathon was a valuable learning experience, leadership qualities. I am grateful to BITS Vizag and Supraja Technologies for this opportunity, and I am proud to have received an internship offer letter.',
    rating: 5,
    initials: 'SK',
    image: '/sohailkhan.jpg',
  },
  {
    name: 'Rithika',
    role: '3rd Year CSE-A',
    college: 'Shield Protocol 2025 Participant',
    content: 'Shield Protocol – Level 1 was an amazing learning experience with real-time cybersecurity tools and incidents.',
    rating: 5,
    initials: 'R',
    image: '/rithika.jpg',
  },
]

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 4000)
    return () => clearInterval(id)
  }, [autoplay])

  return (
    <section id="testimonials" className="relative py-24 bg-bg-secondary overflow-hidden" aria-label="Testimonials">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px neon-line" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Testimonials" title="What People" highlight="Say" subtitle="Hear from students, faculty, and industry experts who've experienced The Shield Protocol." />

        {/* Featured testimonial */}
        <div className="relative mt-12 mb-8">
          <AnimatePresence mode="wait">
            {testimonials[current] && (
              <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass-card p-8 md:p-12 max-w-3xl mx-auto text-center relative overflow-hidden">
                <Quote size={60} className="absolute top-6 right-6 text-blue-primary/10" />
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-primary/30 to-transparent flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-blue-accent font-sora border border-blue-primary/20 overflow-hidden shadow-lg">
                  {testimonials[current].image ? (
                    <img src={testimonials[current].image} alt={testimonials[current].name} className="w-full h-full object-cover" />
                  ) : (
                    testimonials[current].initials
                  )}
                </div>
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={18} className="text-warning fill-current" />
                  ))}
                </div>
                <blockquote className="text-white text-lg leading-relaxed mb-6 font-outfit italic">"{testimonials[current].content}"</blockquote>
                <div className="font-sora font-bold text-white mb-1">{testimonials[current].name}</div>
                <div className="text-blue-accent text-sm font-space">{testimonials[current].role}</div>
                {testimonials[current].college && <div className="text-muted text-xs mt-1">{testimonials[current].college}</div>}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => { setCurrent(c => (c - 1 + testimonials.length) % testimonials.length); setAutoplay(false) }} className="w-10 h-10 glass rounded-full flex items-center justify-center text-muted hover:text-white transition-colors" aria-label="Previous testimonial">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { setCurrent(i); setAutoplay(false) }} className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-blue-primary w-6' : 'bg-white/20'}`} aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>
            <button onClick={() => { setCurrent(c => (c + 1) % testimonials.length); setAutoplay(false) }} className="w-10 h-10 glass rounded-full flex items-center justify-center text-muted hover:text-white transition-colors" aria-label="Next testimonial">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Grid of testimonials */}
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-5 text-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-primary/20 to-transparent flex items-center justify-center text-sm font-bold text-blue-accent font-sora border border-blue-primary/10 overflow-hidden shrink-0">
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    t.initials
                  )}
                </div>
                <div>
                  <div className="font-space font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
              <p className="text-muted text-xs leading-relaxed line-clamp-3">"{t.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
