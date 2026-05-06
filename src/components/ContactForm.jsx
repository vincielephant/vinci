import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Send, Calendar, Shield, Zap } from 'lucide-react'
import BgPattern from './BgPattern'
import ElephantSilhouette from './ElephantSilhouette'

const TRUST_BULLETS = [
  { icon: Calendar, text: 'שיחה של 30 דקות, בזמן שנוח לך' },
  { icon: Shield, text: 'NDA מלא — כל מה שנשתף נשאר בינינו' },
  { icon: Zap, text: 'תוצרי שיחה: מפת חסמים + הצעת תוכנית מותאמת' },
]

export default function ContactForm() {
  const [data, setData] = useState({
    name: '',
    role: '',
    company: '',
    email: '',
    phone: '',
    note: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [confetti, setConfetti] = useState(false)

  const update = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }))

  const valid =
    data.name.trim().length > 1 &&
    data.email.includes('@') &&
    data.company.trim().length > 1

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!valid) return
    // TODO: replace with Calendly / HubSpot / your CRM endpoint.
    console.log('Vinci lead submitted', data)
    setConfetti(true)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section-pad relative isolate overflow-hidden">
      <BgPattern variant="mesh" className="opacity-70" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Pitch column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.7 }}
            className="relative flex flex-col justify-center"
          >
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-brand-pinkSoft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-brand-pinkDeep">
              <span className="h-2 w-2 rounded-full bg-brand-pink" />
              צרו קשר
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight text-brand-ink sm:text-4xl md:text-5xl lg:text-6xl">
              בואו נדבר על
              <br />
              <span className="text-brand-pink">הצוות שלכם</span>.
            </h2>
            <p className="mt-5 max-w-md text-lg text-brand-inkSoft">
              נחזור אליכם תוך 24 שעות עם הצעה ראשונית, מותאמת לגודל הארגון
              ולאתגרים הספציפיים שלו.
            </p>

            <ul className="mt-8 space-y-3">
              {TRUST_BULLETS.map(({ icon: Icon, text }, i) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.2, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-pinkSoft text-brand-pinkDeep">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-brand-ink">{text}</span>
                </motion.li>
              ))}
            </ul>

            {/* Peeking character */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pointer-events-none mt-10 hidden lg:block"
              aria-hidden
            >
              <motion.img
                src="/character/peeking.png"
                alt=""
                className="h-40 w-auto object-contain xl:h-48"
                animate={{ y: [0, -8, 0], rotate: [-1, 2, -1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                onError={(e) => (e.currentTarget.style.opacity = '0')}
              />
            </motion.div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-brand-ink/5 bg-white p-7 shadow-card md:p-10">
              {/* Confetti layer */}
              {confetti && <Confetti onDone={() => setConfetti(false)} />}

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    className="grid gap-5"
                    noValidate
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="שם מלא"
                        value={data.name}
                        onChange={update('name')}
                        required
                      />
                      <Field
                        label="תפקיד"
                        value={data.role}
                        onChange={update('role')}
                        placeholder="VP People, CHRO..."
                      />
                    </div>
                    <Field
                      label="שם החברה"
                      value={data.company}
                      onChange={update('company')}
                      required
                    />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="אימייל"
                        type="email"
                        value={data.email}
                        onChange={update('email')}
                        required
                        dir="ltr"
                      />
                      <Field
                        label="טלפון"
                        type="tel"
                        value={data.phone}
                        onChange={update('phone')}
                        dir="ltr"
                      />
                    </div>
                    <Field
                      label="קצת על האתגר שלכם (אופציונלי)"
                      value={data.note}
                      onChange={update('note')}
                      multiline
                    />

                    <button
                      type="submit"
                      disabled={!valid}
                      className="shimmer group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-pink px-7 py-4 text-base font-semibold text-white shadow-button transition-all hover:-translate-y-0.5 hover:bg-brand-pinkDeep disabled:cursor-not-allowed disabled:bg-brand-ink/20 disabled:text-brand-ink/40 disabled:shadow-none disabled:hover:translate-y-0"
                    >
                      <Send className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                      קבעו פגישה
                    </button>
                    <p className="text-center text-xs text-brand-inkSoft">
                      בלחיצה על השליחה אתם מאשרים את{' '}
                      <a href="#" className="underline">
                        תנאי השימוש
                      </a>
                      .
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    className="flex flex-col items-center gap-5 py-10 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 220 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-pink text-white shadow-button"
                    >
                      <Check className="h-10 w-10" strokeWidth={3} />
                    </motion.div>
                    <h3 className="font-display text-3xl font-bold text-brand-ink">
                      קיבלנו את הפנייה!
                    </h3>
                    <p className="max-w-sm text-brand-inkSoft">
                      איש הצוות שלנו יחזור אליך תוך 24 שעות עם הצעה ראשונית
                      מותאמת ל-{data.company || 'הארגון שלך'}.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setData({
                          name: '',
                          role: '',
                          company: '',
                          email: '',
                          phone: '',
                          note: '',
                        })
                      }}
                      className="mt-2 text-sm font-semibold text-brand-pink underline-offset-4 hover:underline"
                    >
                      לשליחת פנייה נוספת
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
  multiline,
  placeholder,
  dir,
}) {
  const id = useMemo(
    () => `field-${label.replace(/\s+/g, '-')}-${Math.random().toString(36).slice(2, 7)}`,
    [label],
  )
  return (
    <label htmlFor={id} className="group block">
      <span className="mb-1.5 block text-sm font-semibold text-brand-ink">
        {label}
        {required && <span className="ms-1 text-brand-pink">*</span>}
      </span>
      {multiline ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          dir={dir}
          className="form-textarea w-full rounded-2xl border-2 border-brand-ink/10 bg-brand-bg/50 px-4 py-3 text-base text-brand-ink transition focus:border-brand-pink focus:bg-white focus:ring-4 focus:ring-brand-pink/15"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          dir={dir}
          className="form-input w-full rounded-2xl border-2 border-brand-ink/10 bg-brand-bg/50 px-4 py-3 text-base text-brand-ink transition focus:border-brand-pink focus:bg-white focus:ring-4 focus:ring-brand-pink/15"
        />
      )}
    </label>
  )
}

function Confetti({ onDone }) {
  const pieces = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 600,
    y: -200 - Math.random() * 300,
    rot: (Math.random() - 0.5) * 720,
    size: 18 + Math.random() * 22,
    delay: Math.random() * 0.2,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.5 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: 0,
            rotate: p.rot,
            scale: 1,
          }}
          transition={{ duration: 1.6, delay: p.delay, ease: 'easeOut' }}
          onAnimationComplete={p.id === pieces.length - 1 ? onDone : undefined}
          className="absolute left-1/2 top-1/2"
        >
          <ElephantSilhouette
            size={p.size}
            color={
              ['#f2778a', '#fbb1bb', '#e25b71', '#fde6ea'][p.id % 4]
            }
          />
        </motion.div>
      ))}
    </div>
  )
}
