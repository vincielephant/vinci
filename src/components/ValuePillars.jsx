import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { Brain, ShieldCheck, TrendingUp } from 'lucide-react'
import BgPattern from './BgPattern'

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'שקט תעשייתי לצוות שלך',
    body:
      'מסגרת מעשית להתמודדות עם לחץ, כשלים ושינויים ארגוניים — בלי סיסמאות, רק כלים שעובדים.',
    accent: 'מתאים גם לצוותים מבוזרים',
  },
  {
    icon: Brain,
    title: 'כלים פרקטיים, לא סיסמאות',
    body:
      'מתודולוגיה מבוססת מחקר מתחום הפסיכולוגיה החיובית, מותאמת לסביבת עבודה ישראלית.',
    accent: 'בנוי על מחקר, לא על קלישאות',
  },
  {
    icon: TrendingUp,
    title: 'ROI מדיד תוך 90 יום',
    body:
      'דשבורד מנהלים עם מדדי שביעות רצון, פרודוקטיביות ושימור — שקיפות מלאה ממנהל ל-CEO.',
    accent: 'דוחות שבועיים אוטומטיים',
  },
]

export default function ValuePillars() {
  return (
    <section
      id="courses"
      className="section-pad relative overflow-hidden"
      aria-label="מה תקבלו"
    >
      <BgPattern variant="dots" className="opacity-30" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-start gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <Eyebrow>מה תקבלו?</Eyebrow>
            <h2 className="font-display text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
              שלוש סיבות שמחלקות HR{' '}
              <span className="relative">
                בוחרות בנו
                <Underline />
              </span>
            </h2>
          </div>
          <p className="max-w-md text-lg text-brand-inkSoft">
            אנחנו לא מספרים סיפורים — אנחנו בונים תרבות שמבוססת על נתונים,
            התמדה וכלים שצוותים יכולים להפעיל ביום־יום.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </div>

      {/* Pointing character — visual cue toward the cards */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: -40, rotate: -8 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
        className="absolute bottom-6 -left-10 hidden h-44 w-44 lg:block xl:-left-4 xl:h-56 xl:w-56"
      >
        <motion.img
          src="/character/pointing.png"
          alt=""
          className="h-full w-full object-contain"
          animate={{ x: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          onError={(e) => (e.currentTarget.style.opacity = '0')}
        />
      </motion.div>
    </section>
  )
}

function PillarCard({ icon: Icon, title, body, accent, index }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 180,
    damping: 18,
  })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 180,
    damping: 18,
  })

  const handleMove = (e) => {
    if (reduce) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      style={{
        rotateX: reduce ? 0 : rx,
        rotateY: reduce ? 0 : ry,
        transformPerspective: 1000,
      }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-brand-ink/5 bg-white p-6 shadow-card transition-shadow hover:shadow-soft sm:p-7 md:p-8 ${
        index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''
      }`}
      data-cursor="hover"
    >
      {/* corner glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-brand-pink/15 blur-3xl transition-opacity duration-500 group-hover:bg-brand-pink/30" />

      {/* Icon */}
      <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-pinkSoft text-brand-pinkDeep transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
        <Icon className="h-7 w-7" strokeWidth={2} />
        <span className="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-brand-pink/60" />
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-brand-pink" />
      </div>

      <h3 className="font-display mb-3 text-2xl font-bold leading-tight text-brand-ink">
        {title}
      </h3>
      <p className="flex-1 text-base leading-relaxed text-brand-inkSoft">
        {body}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-brand-ink/5 pt-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-pinkDeep">
          {accent}
        </span>
        <span className="text-xs font-bold tabular text-brand-ink/30">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.article>
  )
}

function Eyebrow({ children }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-pinkDeep">
      <span className="h-2 w-2 rounded-full bg-brand-pink" />
      {children}
    </div>
  )
}

function Underline() {
  return (
    <svg
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
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
    </svg>
  )
}
