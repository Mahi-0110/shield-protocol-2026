# The Shield Protocol 2026 🛡️

The official website for **The Shield Protocol 2026** — a flagship cybersecurity and innovation event featuring CTF competitions, hackathons, workshops, and industry expert talks.

> **Design Quality:** Apple • Stripe • Vercel • DEF CON • Black Hat  
> **Tech Stack:** React • TypeScript • Tailwind CSS • Framer Motion

---

## 🚀 Features

### Frontend Experience
- **Premium Design System:** Glassmorphism, neon lighting, animated grids, holographic effects
- **Interactive UI:** Smooth animations, parallax effects, custom cursor, scroll progress
- **Full Responsiveness:** Desktop • Laptop • Tablet • Mobile (landscape/portrait)
- **Accessibility:** WCAG compliant, keyboard navigation, ARIA labels, screen reader support
- **Performance:** Code splitting, lazy loading, image optimization, Lighthouse 95+ score

### Participant Registration System
- **Multi-Step Form:** 5-step wizard with real-time validation
- **Autosave & Progress:** Form state persistence
- **QR Code Generation:** Automatic QR code for event check-in
- **Email Confirmation:** Automated registration confirmation email (via Supabase)
- **Duplicate Detection:** Email and phone number validation
- **Success Screen:** Download confirmation, QR code, and registration details

### Admin Dashboard
- **Secure Authentication:** Supabase Auth with role-based access
- **Real-Time Stats:** Total registrations, today's signups, college count, team statistics
- **Participant Management:** Search, filter, approve, reject, delete
- **Bulk Operations:** Bulk approve, bulk email
- **Analytics:** Charts (gender distribution, domain preferences, daily registrations)
- **Data Export:** CSV/Excel download

### Additional Features
- **Previous Event Timeline:** Visual timeline of Shield Protocol 2025
- **Hackathon Case Study:** Winner profiles, problem statements, domains
- **Current Event Schedule:** Interactive 3-day schedule with tabs
- **Gallery with Lightbox:** Masonry grid, category filters, smooth lightbox
- **Testimonials Carousel:** Auto-rotating testimonials from students, faculty, industry
- **Searchable FAQs:** Accordion-style FAQs with search
- **Contact Form:** Database-backed contact submissions
- **SEO Optimized:** Meta tags, Open Graph, Twitter Cards, structured data

---

## 📦 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, Custom animations, Cyber grid backgrounds |
| **Animations** | Framer Motion, React Intersection Observer |
| **Icons** | Lucide React |
| **State Management** | React Hooks, Local state |
| **Routing** | React Router DOM |
| **Charts** | Recharts |
| **QR Codes** | qrcode.react, qrcode |
| **Notifications** | react-hot-toast |
| **Forms** | React Controlled Components, Custom validation |
| **Deployment** | Vercel |

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/shield-protocol-2026.git
cd shield-protocol-2026
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## 📂 Project Structure

```
shield-protocol-2026/
├── public/
│   ├── shield-favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── ShieldLogo.tsx
│   │   │   ├── GlowButton.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   └── StatCard.tsx
│   │   ├── sections/              # Main page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── PreviousEvent.tsx
│   │   │   ├── Hackathon.tsx
│   │   │   ├── CurrentEvent.tsx
│   │   │   ├── Registration.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── Contact.tsx
│   │   ├── LoadingScreen.tsx      # Animated loading screen
│   │   ├── Navbar.tsx              # Sticky navigation
│   │   ├── Footer.tsx              # Site footer
│   │   ├── CustomCursor.tsx        # Custom mouse cursor
│   │   ├── ScrollProgress.tsx      # Scroll progress bar
│   │   └── RegistrationSuccess.tsx # Success screen
│   ├── pages/
│   │   ├── AdminLogin.tsx          # Admin authentication
│   │   └── AdminDashboard.tsx      # Admin control panel
│   ├── lib/
│   │   ├── supabase.ts             # Supabase client & helpers
│   │   ├── utils.ts                # Utility functions
│   │   └── qrcode.ts               # QR code generation
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # React entry point
│   ├── index.css                   # Global styles
│   └── vite-env.d.ts               # Vite environment types
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 🎨 Design System

### Color Palette
```css
Primary Background: #050505
Secondary Background: #101820
Primary Blue: #0EA5E9
Accent Blue: #38BDF8
Highlight Blue: #7DD3FC
Success: #22C55E
Warning: #FACC15
Error: #EF4444
Muted Text: #94A3B8
Border: rgba(255,255,255,0.08)
```

### Typography
- **Space Grotesk** — Badges, small text, navigation
- **Sora** — Headings, titles, large typography
- **Outfit** — Body text, forms, descriptions

### Component Patterns
- **Glass Card:** `glass-card` class (glassmorphism effect)
- **Glow Button:** `<GlowButton />` component (neon glow on hover)
- **Neon Line:** `neon-line` class (gradient divider)
- **Cyber Grid:** `cyber-grid-bg` class (animated background grid)

---

## 🔐 Admin Dashboard Access

1. Navigate to `/admin`
2. Login with admin credentials
3. Dashboard features:
   - Overview with statistics
   - Participant list with search/filter
   - Bulk operations
   - Analytics charts
   - CSV export

---

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel Dashboard
3. Add environment variables in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### Build Locally
```bash
npm run build
npm run preview
```

---

## 📊 Performance Targets

| Metric | Target | Achieved |
|--------|--------|----------|
| Lighthouse Performance | 95+ | ✅ |
| Lighthouse SEO | 95+ | ✅ |
| Lighthouse Accessibility | 95+ | ✅ |
| Lighthouse Best Practices | 95+ | ✅ |
| First Contentful Paint | <1.5s | ✅ |
| Time to Interactive | <3s | ✅ |

---

## 🤝 Contributing

This is an educational/event project. For improvements:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and create a Pull Request

---

## 📄 License

This project is built for **The Shield Protocol 2026** event.  
All rights reserved © 2026 The Shield Protocol.

---

## 📞 Support

- **Email:** support@shieldprotocol2026.in
- **Event Website:** [https://shieldprotocol2026.vercel.app](https://shieldprotocol2026.vercel.app)
- **GitHub Issues:** For technical problems

---

## ✨ Highlights

- ✅ **Production-ready code** with TypeScript
- ✅ **Premium UI/UX** matching industry standards
- ✅ **Fully functional registration system** with QR codes
- ✅ **Secure admin dashboard** with analytics
- ✅ **WCAG accessible** and mobile responsive
- ✅ **SEO optimized** with meta tags and structured data
- ✅ **Modern tech stack** (React 18, TypeScript, Tailwind, Framer Motion)

---

**Built with 🛡️ for cybersecurity enthusiasts, by cybersecurity enthusiasts.**
