import { useEffect, useMemo, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { Calculator, ArrowLeft, TrendingUp, HeartHandshake, Coins, Clock } from 'lucide-react'
import { calcRoi, formatILS, formatNumber } from '../lib/roi'
import BgPattern from './BgPattern'

export default function ROICalculator() {
  const [employees, setEmployees] = useState(120)
  const [stress, setStress] = useState(7)

  const result = useMemo(() => calcRoi(employees, stress), [employees, stress])

  return (
    <section
      id="roi"
      className="section-pad relative isolate overflow-hidden bg-brand-ink text-white"
    >
      {/* Decorative gradients */}
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(242,119,138,0.35), transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(242,119,138,0.25), transparent 60%)',
        }}
        aria-hidden
      />
      <BgPattern variant="dots" color="#f2778a" className="opacity-20" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl md:mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-pink/40 bg-brand-pink/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-brand-pink">
            <Calculator className="h-3.5 w-3.5" />
            ROI of Happiness™
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            כמה <span className="text-brand-pink">באמת</span> שווה לך
            <br />
            צוות שמרגיש טוב?
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-white/70 md:text-xl">
            הזיזו את הסליידרים — נראה לכם בזמן אמת מה התוצאה הצפויה אחרי 90 יום
            של עבודה משותפת.
          </p>
        </motion.div>

        <div className="grid items-stretch gap-10 lg:grid-cols-12">
          {/* Sliders panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl md:p-9 lg:col-span-5"
          >
            <SliderRow
              label="כמות עובדים בארגון"
              valueLabel={`${formatNumber(employees)} עובדים`}
              min={10}
              max={1000}
              step={5}
              value={employees}
              onChange={setEmployees}
            />
            <div className="my-8 h-px w-full bg-white/10" />
            <SliderRow
              label="רמת לחץ נוכחית בצוות"
              valueLabel={stressLabel(stress)}
              min={1}
              max={10}
              step={1}
              value={stress}
              onChange={setStress}
            />

            {/* Quick presets */}
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                דוגמאות:
              </span>
              {[
                { l: 'סטארטאפ', e: 35, s: 8 },
                { l: 'חברה בינונית', e: 180, s: 6 },
                { l: 'תאגיד', e: 600, s: 5 },
              ].map((p) => (
                <button
                  key={p.l}
                  onClick={() => {
                    setEmployees(p.e)
                    setStress(p.s)
                  }}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:border-brand-pink hover:bg-brand-pink/15 hover:text-white"
                >
                  {p.l}
                </button>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-pink px-6 py-3.5 text-sm font-semibold text-white shadow-button transition hover:-translate-y-0.5 hover:bg-brand-pinkDeep"
            >
              קבלו דוח מותאם למחלקה שלכם
              <ArrowLeft className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Whiteboard / outputs */}
          <div className="relative lg:col-span-7">
            <Whiteboard result={result} />

            {/* Professor character */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -10 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
              className="pointer-events-none absolute -bottom-6 -left-6 hidden h-44 w-44 md:block lg:-bottom-10 lg:-left-10 lg:h-56 lg:w-56"
              aria-hidden
            >
              <motion.img
                src="/character/professor.png"
                alt=""
                className="h-full w-full object-contain drop-shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                onError={(e) => (e.currentTarget.style.opacity = '0')}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function stressLabel(level) {
  if (level <= 3) return `${level} · רגוע`
  if (level <= 6) return `${level} · ממוצע`
  if (level <= 8) return `${level} · גבוה`
  return `${level} · קריטי`
}

function SliderRow({ label, valueLabel, min, max, step, value, onChange }) {
  return (
    <label className="block">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-white/80">{label}</span>
        <motion.span
          key={valueLabel}
          initial={{ opacity: 0, y: -4, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="rounded-full bg-brand-pink/15 px-3 py-1 text-sm font-bold text-brand-pink tabular"
        >
          {valueLabel}
        </motion.span>
      </div>
      <div dir="rtl">
        <input
          type="range"
          className="range-slider"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
        />
      </div>
      <div className="mt-2 flex justify-between text-[11px] font-medium uppercase tracking-wider text-white/40">
        <span>{formatNumber(min)}</span>
        <span>{formatNumber(max)}</span>
      </div>
    </label>
  )
}

function Whiteboard({ result }) {
  const cards = [
    {
      icon: TrendingUp,
      label: 'עליית פרודוקטיביות',
      value: result.productivityGain,
      suffix: '%',
      color: '#f2778a',
      detail: `${formatNumber(result.recoveredHours)} שעות עבודה ש"חוזרות" בשנה`,
    },
    {
      icon: HeartHandshake,
      label: 'שיפור בשימור עובדים',
      value: result.retentionGain,
      suffix: '%',
      color: '#fbb1bb',
      detail: `≈ ${result.savedDepartures} עובדים שלא יעזבו`,
    },
    {
      icon: Coins,
      label: 'חיסכון שנתי',
      value: result.annualSavings,
      suffix: '',
      currency: true,
      color: '#f2778a',
      detail: 'מבוסס על עלויות תחלופה ממוצעות',
    },
  ]

  return (
    <div className="relative h-full rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent p-7 backdrop-blur-xl md:p-9">
      <div className="absolute inset-x-12 -top-3 h-3 rounded-t-xl bg-white/10" />
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/40">
          <Clock className="h-4 w-4" />
          תחזית 12 חודשים
        </div>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
          ● חישוב חי
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <ResultCard key={c.label} {...c} />
        ))}
      </div>

      {/* Bar visualization */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
        <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-white/50">
          <span>תרומה יחסית</span>
          <span>baseline → after Vinci</span>
        </div>
        <div className="space-y-3">
          <Bar label="פרודוקטיביות" value={result.productivityGain} max={40} />
          <Bar label="שימור" value={result.retentionGain} max={40} />
          <Bar label="רווחה כללית" value={result.wellbeingGain} max={40} />
        </div>
      </div>
    </div>
  )
}

function ResultCard({ icon: Icon, label, value, suffix, currency, color, detail }) {
  const reduce = useReducedMotion()
  const target = useMotionValue(0)
  const spring = useSpring(target, { stiffness: 80, damping: 20, mass: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      return
    }
    target.set(value)
  }, [value, target, reduce])

  useEffect(() => {
    if (reduce) return
    return spring.on('change', (v) => setDisplay(v))
  }, [spring, reduce])

  const formatted = currency
    ? formatILS(Math.round(display))
    : `${Math.round(display)}${suffix || ''}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5"
      data-cursor="hover"
    >
      <div
        className="absolute -top-12 -right-12 h-28 w-28 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60"
        style={{ background: color }}
      />
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ background: `${color}25`, color }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="mb-1 text-xs font-medium uppercase tracking-wider text-white/50">
        {label}
      </div>
      <div className="font-display text-3xl font-bold text-white tabular md:text-4xl">
        {formatted}
      </div>
      <div className="mt-2 text-xs leading-relaxed text-white/55">{detail}</div>
    </motion.div>
  )
}

function Bar({ label, value, max }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between text-xs">
        <span className="text-white/70">{label}</span>
        <span className="font-bold text-brand-pink tabular">+{value}%</span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="absolute inset-y-0 right-0 rounded-full bg-gradient-to-l from-brand-pinkDeep to-brand-pink"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}
