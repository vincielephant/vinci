import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const QUOTES = [
  {
    quote:
      'אחרי 12 שבועות עם Vinci ראינו ירידה של 41% בימי מחלה ועלייה משמעותית בשביעות הרצון. זו הייתה ההשקעה החכמה ביותר שעשינו השנה.',
    name: 'מיכל אברמסון',
    role: 'VP People · Lumiere Tech',
    monogram: 'L',
  },
  {
    quote:
      'הצוות שלנו עבר טרנספורמציה אמיתית. אנשים מדברים אחרת, מתמודדים עם לחץ אחרת, מובילים אחרת. הדשבורד עזר לי להראות את ה-ROI לדירקטוריון.',
    name: 'דניאל בן־דוד',
    role: 'Head of HR · Atlas Group',
    monogram: 'A',
  },
  {
    quote:
      'התכנים מעשיים, מבוססי מחקר, ומותאמים בצורה מדויקת לסביבת עבודה ישראלית. אין כאן סיסמאות — יש כלים שעובדים.',
    name: 'תמר שלו',
    role: 'CHRO · NorthPoint',
    monogram: 'N',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setActive((a) => (a + 1) % QUOTES.length)
    }, 6000)
    return () => clearInterval(t)
  }, [paused])

  return (
    <section
      id="testimonials"
      className="section-pad relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-pinkDeep">
            <span className="h-2 w-2 rounded-full bg-brand-pink" />
            המלצות
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
            מנהלי HR מספרים
          </h2>
        </motion.div>

        <div className="relative">
          {/* Giant ghost quote */}
          <Quote
            className="absolute -top-10 right-0 h-32 w-32 text-brand-pinkSoft md:h-44 md:w-44"
            aria-hidden
          />

          <div className="relative min-h-[280px] md:min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={active}
                initial={{ opacity: 0, x: -30, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl border border-brand-ink/5 bg-white p-6 shadow-card sm:p-8 md:p-12"
              >
                <blockquote className="font-display text-xl font-medium leading-snug text-brand-ink sm:text-2xl md:text-3xl">
                  "{QUOTES[active].quote}"
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-brand-ink/5 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-pink to-brand-pinkDeep text-lg font-bold text-white">
                    {QUOTES[active].monogram}
                  </div>
                  <div>
                    <div className="font-bold text-brand-ink">
                      {QUOTES[active].name}
                    </div>
                    <div className="text-sm text-brand-inkSoft">
                      {QUOTES[active].role}
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {QUOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`עבור להמלצה ${i + 1}`}
                  className="h-2 overflow-hidden rounded-full bg-brand-ink/10 transition-all"
                  style={{ width: i === active ? 40 : 12 }}
                >
                  <motion.span
                    className="block h-full bg-brand-pink"
                    initial={false}
                    animate={{ width: i === active ? '100%' : '0%' }}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setActive((a) => (a - 1 + QUOTES.length) % QUOTES.length)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-ink/10 bg-white text-brand-ink transition hover:border-brand-pink hover:text-brand-pink"
                aria-label="הקודם"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => setActive((a) => (a + 1) % QUOTES.length)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-ink/10 bg-white text-brand-ink transition hover:border-brand-pink hover:text-brand-pink"
                aria-label="הבא"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
