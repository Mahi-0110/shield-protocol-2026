/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#050505',
        'bg-secondary': '#101820',
        'blue-primary': '#0EA5E9',
        'blue-accent': '#38BDF8',
        'blue-highlight': '#7DD3FC',
        'success': '#22C55E',
        'warning': '#FACC15',
        'error': '#EF4444',
        'muted': '#94A3B8',
        'border-subtle': 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
        'sora': ['Sora', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'particle': 'particle 20s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { top: '-100%' },
          '100%': { top: '200%' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #0EA5E9, 0 0 10px #0EA5E9' },
          '100%': { boxShadow: '0 0 20px #0EA5E9, 0 0 40px #0EA5E9, 0 0 60px #0EA5E9' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) translateX(0)' },
          '100%': { transform: 'translateY(-100px) translateX(100px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(14,165,233,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.05) 1px, transparent 1px)',
        'hero-gradient': 'radial-gradient(ellipse at top, #101820 0%, #050505 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(16,24,32,0.8) 100%)',
        'glow-gradient': 'radial-gradient(circle at center, rgba(14,165,233,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
