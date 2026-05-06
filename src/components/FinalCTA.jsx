import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import BgPattern from './BgPattern'

export default function FinalCTA() {
  return (
    <section className="section-pad relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-pink via-brand-pinkDeep to-[#a83b51] px-8 py-14 shadow-soft md:px-14 md:py-20">
          <BgPattern variant="radial" color="#fff" className="opacity-25" />

          {/* Animated shapes */}
          <motion.div
            className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />
          <motion.div
            className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-brand-pinkSoft/30 blur-3xl"
            animate={{ scale: [1.1, 1, 1.1], rotate: [0, -90, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />

          <div className="relative grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur">
                ⚡ הצעד הבא
              </div>
              <h2 className="font-display text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-6xl">
                מוכנים להפוך את הצוות שלכם?
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/85">
                שיחת אבחון של 30 דקות, ללא עלות וללא התחייבות. נמפה איתכם את
                החסמים הכי קריטיים, ונראה לאן יכולים להגיע.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MagneticCTA href="#contact">תאמו פגישה היום</MagneticCTA>
                <span className="text-sm text-white/70">
                  ⏱ זמינות מוגבלת — 4 פגישות נותרו השבוע
                </span>
              </div>
            </motion.div>

            {/* Hoodie character */}
            <motion.div
              initial={{ opacity: 0, x: 80, rotate: 12 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }}
              className="relative flex h-72 items-center justify-center md:h-96"
              aria-hidden
            >
              <motion.img
                src="/character/hoodie.png"
                alt=""
                className="h-full w-auto select-none object-contain drop-shadow-2xl [transform:scaleX(-1)]"
                draggable={false}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                onError={(e) => (e.currentTarget.style.opacity = '0')}
              />
              {/* Sparkles */}
              {[
                { top: '10%', left: '20%', d: 0 },
                { top: '40%', left: '80%', d: 0.6 },
                { top: '70%', left: '15%', d: 1.2 },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-white"
                  style={{ top: s.top, left: s.left }}
                  animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: s.d,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MagneticCTA({ children, href }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    x.set(dx * 0.2)
    y.set(dy * 0.3)
  }
  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className="shimmer group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-pinkDeep shadow-2xl"
    >
      {children}
      <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
    </motion.a>
  )
}
