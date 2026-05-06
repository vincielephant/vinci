import { motion } from 'framer-motion'

const COMPANIES = [
  'Lumiere',
  'Atlas HR',
  'NorthPoint',
  'Sela Tech',
  'Habitat',
  'Verdis',
  'Kinetic',
  'Mira Group',
]

export default function TrustStrip() {
  // Duplicated array for seamless marquee
  const list = [...COMPANIES, ...COMPANIES]

  return (
    <section
      aria-label="חברות שעובדות איתנו"
      className="relative border-y border-brand-ink/5 bg-white/60 py-10 backdrop-blur"
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-inkSoft"
      >
        נבחר על ידי מחלקות HR מובילות
      </motion.p>
      <div
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
        dir="ltr"
      >
        <div className="flex gap-14 animate-marquee whitespace-nowrap py-2">
          {list.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="font-display text-2xl font-semibold tracking-tight text-brand-ink/40 transition-colors hover:text-brand-pink"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
