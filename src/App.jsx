import { useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import CursorHalo from './components/CursorHalo'
import FloatingMascots from './components/FloatingMascots'
import Nav from './components/Nav'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import ValuePillars from './components/ValuePillars'
import HowItWorks from './components/HowItWorks'
import ROICalculator from './components/ROICalculator'
import Testimonials from './components/Testimonials'
import FinalCTA from './components/FinalCTA'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const minMs = 900
    const maxMs = 2500
    const start = performance.now()

    const ready = Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise((res) => {
        const img = new Image()
        img.onload = res
        img.onerror = res
        img.src = '/logo.svg'
      }),
    ])

    const cap = new Promise((res) => setTimeout(res, maxMs))

    Promise.race([ready, cap]).then(() => {
      const elapsed = performance.now() - start
      const remaining = Math.max(0, minMs - elapsed)
      setTimeout(() => setLoading(false), remaining)
    })
  }, [])

  return (
    <div className="relative">
      <Preloader visible={loading} />
      <ScrollProgress />
      <CursorHalo />
      <FloatingMascots />

      <Nav />

      <main className="relative z-10">
        <Hero />
        <TrustStrip />
        <ValuePillars />
        <HowItWorks />
        <ROICalculator />
        <Testimonials />
        <FinalCTA />
        <ContactForm />
      </main>

      <Footer />
    </div>
  )
}
