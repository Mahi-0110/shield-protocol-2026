import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import ShieldLogo from './ui/ShieldLogo'
import GlowButton from './ui/GlowButton'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  {
    label: 'Proceedings',
    href: '#proceedings',
    children: [
      { label: 'Previous Event', href: '#previous-event' },
      { label: 'Shield X Hackathon', href: '#hackathon' },
    ],
  },
  { label: 'Current Event', href: '#current-event' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Register', href: '#register' },
  { label: 'Contact', href: '#contact' },
]

const scrollTo = (href: string) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const Navbar: React.FC = () => {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNav = (href: string) => {
    scrollTo(href)
    setMobileOpen(false)
    setActiveDropdown(null)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-2 glass border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-4 bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <button
              onClick={() => handleNav('#home')}
              className="flex items-center gap-3 group"
              aria-label="The Shield Protocol 2026 — Home"
            >
              <ShieldLogo size={scrolled ? 38 : 44} animated glow />
              <div className="hidden sm:block">
                <div className="font-sora font-bold text-white text-sm leading-tight group-hover:text-blue-accent transition-colors">
                  THE SHIELD PROTOCOL
                </div>
                <div className="font-space text-blue-primary text-xs font-medium tracking-widest">
                  2026
                </div>
              </div>
            </button>

            {/* Desktop nav */}
            <div ref={dropdownRef} className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.label} className="relative">
                  {link.children ? (
                    <>
                      <button
                        onClick={() =>
                          setActiveDropdown(activeDropdown === link.label ? null : link.label)
                        }
                        className="flex items-center gap-1 px-3 py-2 text-sm font-outfit text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5"
                        aria-expanded={activeDropdown === link.label}
                        aria-haspopup="true"
                      >
                        {link.label}
                        <motion.span
                          animate={{ rotate: activeDropdown === link.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={14} />
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {activeDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-52 glass rounded-xl border border-white/10 overflow-hidden shadow-xl"
                          >
                            {link.children.map((child) => (
                              <button
                                key={child.label}
                                onClick={() => handleNav(child.href)}
                                className="w-full text-left px-4 py-3 text-sm text-muted hover:text-white hover:bg-white/5 transition-colors font-outfit flex items-center gap-2"
                              >
                                <div className="w-1 h-1 rounded-full bg-blue-primary" />
                                {child.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <button
                      onClick={() => handleNav(link.href)}
                      className="px-3 py-2 text-sm font-outfit text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    >
                      {link.label}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Right — mobile toggle */}
            <div className="flex items-center gap-3">

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg glass border-border-subtle text-muted hover:text-white transition-colors"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <X size={18} />
                    </motion.span>
                  ) : (
                    <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                      <Menu size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 glass border-l border-white/10 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Logo in mobile menu */}
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                  <ShieldLogo size={40} animated />
                  <div>
                    <div className="font-sora font-bold text-white text-sm">THE SHIELD PROTOCOL</div>
                    <div className="font-space text-blue-primary text-xs">2026</div>
                  </div>
                </div>

                <nav className="space-y-1" role="navigation">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {link.children ? (
                        <div>
                          <div className="px-4 py-2 text-xs font-space font-semibold text-blue-primary/60 uppercase tracking-wider mt-4 mb-1">
                            {link.label}
                          </div>
                          {link.children.map((child) => (
                            <button
                              key={child.label}
                              onClick={() => handleNav(child.href)}
                              className="w-full text-left px-4 py-3 text-sm text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-3"
                            >
                              <div className="w-1 h-1 rounded-full bg-blue-primary" />
                              {child.label}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleNav(link.href)}
                          className="w-full text-left px-4 py-3 text-sm text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          {link.label}
                        </button>
                      )}
                    </motion.div>
                  ))}
                </nav>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
