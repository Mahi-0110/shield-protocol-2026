import React, { useState, lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'

import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'

// Lazy-loaded sections for fast initial load
const Hero         = lazy(() => import('./components/sections/Hero'))
const About        = lazy(() => import('./components/sections/About'))
const PreviousEvent= lazy(() => import('./components/sections/PreviousEvent'))
const Hackathon    = lazy(() => import('./components/sections/Hackathon'))
const CurrentEvent = lazy(() => import('./components/sections/CurrentEvent'))
const Gallery      = lazy(() => import('./components/sections/Gallery'))
const Testimonials = lazy(() => import('./components/sections/Testimonials'))
const FAQ          = lazy(() => import('./components/sections/FAQ'))
const Registration = lazy(() => import('./components/sections/Registration'))
const Contact      = lazy(() => import('./components/sections/Contact'))

const SectionLoader = () => (
  <div className="flex items-center justify-center py-32" role="status" aria-label="Loading">
    <div className="w-8 h-8 border-2 border-blue-primary border-t-transparent rounded-full animate-spin" />
  </div>
)

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />

          <main>
            <Suspense fallback={<SectionLoader />}><Hero /></Suspense>
            <Suspense fallback={<SectionLoader />}><About /></Suspense>
            <Suspense fallback={<SectionLoader />}><PreviousEvent /></Suspense>
            <Suspense fallback={<SectionLoader />}><Hackathon /></Suspense>
            <Suspense fallback={<SectionLoader />}><CurrentEvent /></Suspense>
            <Suspense fallback={<SectionLoader />}><Gallery /></Suspense>
            <Suspense fallback={<SectionLoader />}><Testimonials /></Suspense>
            <Suspense fallback={<SectionLoader />}><FAQ /></Suspense>
            <Suspense fallback={<SectionLoader />}><Registration /></Suspense>
            <Suspense fallback={<SectionLoader />}><Contact /></Suspense>
          </main>

          <Footer />
        </>
      )}
    </>
  )
}

export default App
