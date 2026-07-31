import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User, Sparkles, RefreshCw, ChevronRight, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react'
import { PAYMENT_CONFIG } from '../../config/paymentConfig'

interface Message {
  id: string
  sender: 'bot' | 'user'
  text: string
  timestamp: string
  actionUrl?: string
  actionText?: string
}

const QUICK_PROMPTS = [
  'How to Register?',
  'Registration Fee',
  'Hackathon & CTF',
  'Event Schedule',
  'Certificates',
  'Contact Support'
]

const KNOWLEDGE_BASE = [
  {
    keywords: ['register', 'registration', 'join', 'sign up', 'apply', 'enroll', 'book', 'slot'],
    text: `To register for **The Shield Protocol 2026**:\n\n1. Scroll down to the **Register Now** section.\n2. Click the **Register & Pay Fee** button.\n3. Fill in your details (Name, Email, Phone, College, Year).\n4. Complete your payment of **₹${PAYMENT_CONFIG.registrationFee}** on our secure UPI portal.\n5. Save your Registration ID & QR code for event entry!`,
    actionUrl: '#register',
    actionText: 'Go to Registration'
  },
  {
    keywords: ['fee', 'cost', 'price', 'amount', 'pay', 'payment', 'charge', 'money', 'upi'],
    text: `The registration fee is **₹${PAYMENT_CONFIG.registrationFee}** per individual participant.\n\nPayment perks include:\n• Access to 3-Day Workshops & 1-Day Hackathon\n• Official Participation Certificate\n• Mentorship & Networking Access\n• 256-Bit SSL Encrypted UPI Checkout`,
    actionUrl: '#register',
    actionText: 'Pay Registration Fee'
  },
  {
    keywords: ['hackathon', 'ctf', 'shield x', 'competition', 'code', 'challenge', 'prize', 'teams'],
    text: `**Shield X Hackathon & CTF**:\n\n• **Format**: 9 Hours intense cybersecurity sprint & CTF competition.\n• **CTF Categories**: Web Exploitation, Cryptography, Forensics, Reverse Engineering.\n• **Team Size**: 50+ Teams competing.\n• **Requirement**: Basic programming knowledge recommended.\n• **Prizes**: Top performers win special certificates and awards!`,
    actionUrl: '#hackathon',
    actionText: 'View Hackathon Details'
  },
  {
    keywords: ['schedule', 'event', 'workshop', 'timing', 'duration', 'date', 'sessions', 'program'],
    text: `**Event Structure**:\n\n• **3-Day Workshop**: 10+ hands-on sessions covering Cybersecurity fundamentals, Threat Hunting, and Defense.\n• **1-Day Hackathon**: 9-Hour continuous innovation sprint & CTF challenge.\n• **Delegates**: 200+ expected participants.\n• **Sessions**: Led by industry experts and cyber professionals.`,
    actionUrl: '#currentevent',
    actionText: 'Explore Event Schedule'
  },
  {
    keywords: ['certificate', 'cert', 'proof', 'reward', 'credit'],
    text: `**Certificates Provided**:\n\n• **Participation Certificate**: Provided to all registered attendees.\n• **Workshop Completion Certificate**: Awarded upon completing hands-on sessions.\n• **Merit Certificates**: Awarded to top Hackathon & CTF winners.`,
  },
  {
    keywords: ['bring', 'laptop', 'requirement', 'prerequisite', 'id card', 'documents'],
    text: `**What to bring on event day**:\n\n1. **Valid College ID Card**\n2. **Registration ID / QR Code** (received after payment)\n3. **Laptop & Charger** (Required for Workshops & Hackathon)\n4. Personal accessories & extensions`,
  },
  {
    keywords: ['meal', 'food', 'lunch', 'dinner', 'accommodation', 'stay'],
    text: `**Meals & Accommodations**:\n\nMeals are not provided individually. Participants are requested to arrange their own food and refreshments during the event days.`,
  },
  {
    keywords: ['contact', 'email', 'support', 'help', 'phone', 'location', 'bits'],
    text: `**Contact & Support**:\n\n• **Email**: theshieldprotocol@bitsvizag.com\n• **Location**: BITS Vizag Campus\n• **Support Team**: Available 24/7 via the Contact section below.`,
    actionUrl: '#contact',
    actionText: 'Contact Support'
  },
  {
    keywords: ['volunteer', 'volunteering', 'help out', 'join team'],
    text: `**Volunteer Opportunities**:\n\nYes! Interested students can apply to volunteer for The Shield Protocol 2026. Volunteers gain event management experience, networking with speakers, and a Volunteer Certificate.`,
  },
  {
    keywords: ['about', 'shield protocol', 'what is', 'overview', 'mission'],
    text: `**The Shield Protocol 2026** is more than an event — it is a cybersecurity movement designed to empower students to build, learn, and lead in cyber defense, ethical hacking, and innovative threat protection.`,
    actionUrl: '#about',
    actionText: 'Learn More About Us'
  },
  {
    keywords: ['social', 'instagram', 'whatsapp', 'follow', 'channel', 'page', 'socials'],
    text: `**Follow Us**:\n\n• **Instagram**: https://www.instagram.com/bits_vizag_official/\n• **WhatsApp Channel**: https://www.whatsapp.com/channel/0029VaU1VjEJkK7Gz9iBjP1B\n\nStay updated with live announcements and event highlights!`,
    actionUrl: 'https://www.instagram.com/bits_vizag_official/',
    actionText: 'Follow on Instagram'
  }
]

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hello!I am Cipher \nWelcome to **The Shield Protocol 2026**.\nHow can I help you today? Select a topic below or ask me any question!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen, isTyping])

  const findBestResponse = (query: string): { text: string; actionUrl?: string; actionText?: string } => {
    const q = query.toLowerCase()

    // Check against knowledge base
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some(k => q.includes(k))) {
        return {
          text: item.text,
          actionUrl: item.actionUrl,
          actionText: item.actionText
        }
      }
    }

    // Default Fallback
    return {
      text: `I'm not completely sure about that specific question, but I can help you with:\n\n• **Registration & Fees** (₹${PAYMENT_CONFIG.registrationFee})\n• **Hackathon & CTF Details**\n• **Event Schedule & Workshops**\n• **Contact & Support**\n\nFeel free to choose a topic or Contact our support team below!`,
      actionUrl: '#contact',
      actionText: 'Contact Support Team'
    }
  }

  const handleSend = (textToSend?: string) => {
    const userQuery = textToSend || input
    if (!userQuery.trim()) return

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userQuery,
      timestamp: time
    }

    setMessages(prev => [...prev, userMessage])
    if (!textToSend) setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const responseData = findBestResponse(userQuery)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionUrl: responseData.actionUrl,
        actionText: responseData.actionText
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 600)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  const handleActionClick = (url?: string) => {
    if (!url) return
    setIsOpen(false)
    if (url.startsWith('#')) {
      const target = document.querySelector(url)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.hash = url
      }
    } else {
      window.location.href = url
    }
  }

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        sender: 'bot',
        text: `Hi! I am Cipher , your AI guide for The Shield Protocol ask me about \n **The Shield Protocol 2026**, registrations, or hackathon.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ])
  }

  return (
    <>
      {/* Floating Chatbot Button (Fixed Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-[90] flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#051329]/90 border border-cyan-500/40 backdrop-blur-md shadow-lg text-xs font-space text-cyan-300"
          >
            <Sparkles size={13} className="text-cyan-400 animate-pulse" />
            <span>Need Help? Chat with Cipher</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_25px_rgba(14,165,233,0.7)] border border-cyan-300/40 cursor-pointer flex items-center justify-center group"
          aria-label="Toggle Cipher AI Assistant Chat"
        >
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping pointer-events-none" />
          {isOpen ? (
            <X size={24} className="relative z-10" />
          ) : (
            <MessageSquare size={24} className="relative z-10 group-hover:rotate-12 transition-transform" />
          )}
        </motion.button>
      </div>

      {/* Chat Popover Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-6 z-[90] w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[75vh] flex flex-col rounded-2xl bg-[#030c1b]/95 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_40px_rgba(3,12,27,0.9)] overflow-hidden font-outfit"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-[#071933] to-[#041024] border-b border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400">
                  <Bot size={20} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-[#030c1b]" />
                </div>
                <div>
                  <h4 className="font-space font-bold text-sm text-white flex items-center gap-1.5">
                    Cipher AI Assistant
                    <ShieldCheck size={14} className="text-cyan-400" />
                  </h4>
                  <p className="text-[11px] text-cyan-300/80 font-space">Official Event Guide & FAQ</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="p-1.5 text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  title="Reset Conversation"
                  aria-label="Reset Conversation"
                >
                  <RefreshCw size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  title="Close Chat"
                  aria-label="Close Chat"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 custom-scrollbar">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                      }`}
                  >
                    {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>

                  <div className={`max-w-[82%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-none shadow-md'
                        : 'bg-[#091f3d]/80 text-gray-200 border border-cyan-500/20 rounded-tl-none'
                        }`}
                    >
                      {msg.text}

                      {/* Action Button inside response */}
                      {msg.actionUrl && (
                        <button
                          onClick={() => handleActionClick(msg.actionUrl)}
                          className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-space font-semibold transition-all cursor-pointer"
                        >
                          <span>{msg.actionText || 'View Details'}</span>
                          <ArrowRight size={13} />
                        </button>
                      )}
                    </div>
                    <span className="text-[10px] text-muted font-space mt-1 block px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-cyan-400/70 text-xs font-space p-2">
                  <Bot size={14} />
                  <span className="animate-pulse">Assistant is typing...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Action Prompts */}
            <div className="px-3 py-2 bg-[#051329]/60 border-t border-cyan-500/10 overflow-x-auto whitespace-nowrap custom-scrollbar flex items-center gap-1.5">
              <HelpCircle size={12} className="text-cyan-400 shrink-0 ml-1" />
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full bg-cyan-950/60 hover:bg-cyan-500/20 border border-cyan-500/30 text-[11px] font-space text-cyan-300 hover:text-white transition-all cursor-pointer shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="p-3 bg-[#040f21] border-t border-cyan-500/20 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about registration, FAQs..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-[#091a36] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-cyan-500/30 focus:border-cyan-400 focus:outline-none placeholder:text-gray-400/60 font-outfit"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
