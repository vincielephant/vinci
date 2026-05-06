import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, Wrench, Users2, LineChart } from 'lucide-react'
import BgPattern from './BgPattern'

const STEPS = [
  {
    icon: Search,
    n: '01',
    title: 'אבחון ארגוני',
    body:
      'סקר חוויית עובד ממוקד + שיחות עומק עם מנהלים. תוצאה: מפת חוזקות וחסמים קונקרטית.',
  },
  {
    icon: Wrench,
    n: '02',
    title: 'תוכנית מותאמת',
    body:
      'בוחרים יחד את המסלול: סדנאות שבועיות, מפגשי 1:1, או היברידי — לפי תרבות החברה.',
  },
  {
    icon: Users2,
    n: '03',
    title: 'סדנאות חיות',
    body:
      'מפגשים אינטראקטיביים בני 90 דקות, עם תרגול מיידי, צ׳ק־אינים והעמקה בכלי השבוע.',
  },
  {
    icon: LineChart,
    n: '04',
    title: 'מדידה ושימור',
    body:
      'דשבורד שבועי למנהלים: שביעות רצון, שימור, פרודוקטיביות. ROI מוכח תוך 90 יום.',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const lineProgress = useTransform(scrollYProgress, [0.2, 0.85], [0, 1])

  return (
    <section
      ref={ref}
      id="how"
      className="section-pad relative isolate overflow-hidden bg-gradient-to-b from-white via-brand-pinkSoft/30 to-white"
    >
      <BgPattern variant="flow" className="opacity-40" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-pinkDeep">
              <span className="h-2 w-2 rounded-full bg-brand-pink" />
              איך זה עובד?
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
              ארבעה שלבים. אפס הפתעות.
            </h2>
          </div>

          {/* Hoodie character with speech bubble */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden items-end gap-3 md:flex"
            aria-hidden
          >
            <div className="rounded-2xl rounded-bl-sm bg-brand-ink px-4 py-3 text-sm font-semibold text-white shadow-card">
              בואו נתחיל ✨
            </div>
            <motion.img
              src="/character/hoodie.png"
              alt=""
              className="h-32 w-auto object-contain xl:h-40"
              animate={{ y: [0, -6, 0], rotate: [-1, 2, -1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              onError={(e) => (e.currentTarget.style.opacity = '0')}
            />
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Track */}
          <div
            className="absolute right-6 top-8 hidden h-[2px] w-[calc(100%-3rem)] bg-brand-ink/10 md:block"
            aria-hidden
          />
          <motion.div
            className="absolute right-6 top-8 hidden h-[3px] origin-right rounded-full bg-gradient-to-l from-brand-pink to-brand-pinkDeep md:block"
            style={{ scaleX: lineProgress, width: 'calc(100% - 3rem)' }}
            aria-hidden
          />

          <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
            {STEPS.map((step, i) => (
              <Step key={step.n} {...step} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Step({ icon: Icon, n, title, body, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex flex-col"
    >
      {/* Number badge */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: -4 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-brand-pink/30 bg-white shadow-soft"
      >
        <Icon className="h-7 w-7 text-brand-pinkDeep" strokeWidth={2} />
        <span className="absolute -bottom-2 -left-2 rounded-full bg-brand-ink px-2 py-0.5 text-[10px] font-bold tabular text-white">
          {n}
        </span>
      </motion.div>

      <h3 className="font-display mb-2 text-xl font-bold text-brand-ink">
        {title}
      </h3>
      <p className="text-base leading-relaxed text-brand-inkSoft">{body}</p>
    </motion.li>
  )
}
