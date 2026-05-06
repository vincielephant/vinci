import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { ArrowLeft, PlayCircle, Sparkles } from 'lucide-react'
import BgPattern from './BgPattern'

const TITLE_WORDS = ['הופכים', 'את', 'התרבות', 'הארגונית', 'למנוע', 'של', 'צמיחה']

export default function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const characterY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const characterScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-32 lg:pt-36"
    >
      <BgPattern variant="flow" className="opacity-90" />
      <BgPattern
        variant="dots"
        className="opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 md:gap-14 md:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Text column (RTL — right side visually) */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-pink/30 bg-brand-pinkSoft/60 px-4 py-1.5 text-sm font-medium text-brand-pinkDeep backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" />
            פלטפורמת מיינדסט למחלקות HR
          </motion.div>

          <h1 className="font-display text-[2.25rem] font-bold leading-[1.05] tracking-tight text-brand-ink sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.6rem] xl:text-[4.4rem]">
            {TITLE_WORDS.map((word, i) => {
              const isHighlight = word === 'צמיחה'
              return (
                <span
                  key={i}
                  className="relative me-2 inline-block overflow-hidden align-baseline"
                >
                  <motion.span
                    initial={
                      reduce ? { opacity: 0 } : { y: '110%', opacity: 0 }
                    }
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.2 + i * 0.08,
                      duration: 0.85,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`inline-block ${
                      isHighlight ? 'text-brand-pink' : ''
                    }`}
                  >
                    {word}
                    {isHighlight && (
                      <motion.svg
                        viewBox="0 0 200 12"
                        className="absolute -bottom-2 right-0 h-3 w-full"
                        aria-hidden
                      >
                        <motion.path
                          d="M2 8 Q 50 -2 100 6 T 198 6"
                          fill="none"
                          stroke="#f2778a"
                          strokeWidth="3"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            delay: 1.2,
                            duration: 1,
                            ease: 'easeInOut',
                          }}
                        />
                      </motion.svg>
                    )}
                  </motion.span>
                </span>
              )
            })}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-brand-inkSoft md:text-xl"
          >
            קורסי חשיבה חיובית ומיינדסט שמעניקים לעובדים שלך את הכלים להצליח, ולך
            את <span className="font-semibold text-brand-ink">השקט התעשייתי</span>{' '}
            שחיפשת.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              className="shimmer group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-pink px-6 py-3.5 text-sm font-semibold text-white shadow-button transition-transform hover:-translate-y-0.5 sm:px-7 sm:py-4 sm:text-base"
            >
              תאמו שיחת ייעוץ אישית
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </a>
            <a
              href="#how"
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-brand-ink/15 bg-white px-6 py-3.5 text-sm font-semibold text-brand-ink transition-all hover:border-brand-ink hover:bg-brand-ink hover:text-white sm:px-7 sm:py-4 sm:text-base"
            >
              <PlayCircle className="h-5 w-5 text-brand-pink transition-colors group-hover:text-white" />
              צפו בסילבוס המלא
            </a>
          </motion.div>

          {/* Trust micro-strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-brand-inkSoft md:mt-10 md:gap-5"
          >
            <div className="flex -space-x-2 -space-x-reverse">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-9 w-9 rounded-full border-2 border-white bg-gradient-to-br from-brand-pink to-brand-pinkDeep shadow"
                  style={{
                    background: [
                      'linear-gradient(135deg,#f2778a,#e25b71)',
                      'linear-gradient(135deg,#fbb1bb,#f2778a)',
                      'linear-gradient(135deg,#e25b71,#a83b51)',
                      'linear-gradient(135deg,#fde6ea,#f2778a)',
                    ][i],
                  }}
                  aria-hidden
                />
              ))}
            </div>
            <span>
              <strong className="text-brand-ink">+1,200</strong> עובדים בהכשרה
              פעילה
            </span>
          </motion.div>
        </motion.div>

        {/* Character column */}
        <motion.div
          style={{ y: characterY, scale: characterScale }}
          className="relative flex items-center justify-center"
        >
          <CharacterBlob />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
        aria-hidden
      >
        <motion.div
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-brand-ink/20 p-1"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="block h-2 w-1 rounded-full bg-brand-pink" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function CharacterBlob() {
  const reduce = useReducedMotion()

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[560px]">
      {/* Morphing pink halo */}
      <motion.div
        className="absolute inset-6 bg-gradient-to-br from-brand-pink/45 via-brand-pinkSoft to-brand-pinkSoft/30 shadow-soft animate-morph"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Radial pattern behind character */}
      <BgPattern variant="radial" className="opacity-60" />

      {/* Character image — replace /character/hero-peace.png with your asset */}
      <motion.img
        src="/character/hero-peace.png"
        alt="The Pink Catalyst — דמות המותג של Vinci"
        className="relative z-10 mx-auto h-full w-full select-none object-contain"
        draggable={false}
        initial={
          reduce
            ? { opacity: 0 }
            : { x: -120, opacity: 0, rotate: -15, scale: 0.9 }
        }
        animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
        transition={{
          delay: 0.5,
          duration: 1,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        onError={(e) => {
          e.currentTarget.style.opacity = '0'
        }}
      />

      {/* Idle float wrapper for subtle life */}
      <div
        className="pointer-events-none absolute inset-0 animate-floatSlow"
        aria-hidden
      />

      {/* Floating chip — productivity */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{ delay: 1.4, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        className="absolute top-4 right-0 z-20 sm:top-2 sm:right-2 md:right-0"
      >
        <motion.div
          animate={
            reduce ? undefined : { y: [0, -10, 0], rotate: [-3, 3, -3] }
          }
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-card"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-lg">
            ↑
          </span>
          <div className="text-start">
            <div className="text-[11px] font-medium text-brand-inkSoft">
              פרודוקטיביות
            </div>
            <div className="text-base font-bold text-brand-ink">+34%</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating chip — wellbeing */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        className="absolute bottom-4 left-0 z-20 sm:bottom-2 sm:left-2 md:-left-6"
      >
        <motion.div
          animate={
            reduce ? undefined : { y: [0, 8, 0], rotate: [2, -2, 2] }
          }
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-card"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-pinkSoft text-lg">
            🌱
          </span>
          <div className="text-start">
            <div className="text-[11px] font-medium text-brand-inkSoft">
              שביעות רצון
            </div>
            <div className="text-base font-bold text-brand-ink">+58%</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
