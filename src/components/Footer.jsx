import { motion } from 'framer-motion'
import { Instagram, Linkedin, Mail } from 'lucide-react'

const SOCIALS = [
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Mail, href: '#', label: 'Email' },
]

const COLS = [
  {
    title: 'הקורסים',
    items: ['חשיבה חיובית', 'מיינדסט מנהיגותי', 'התמודדות עם לחץ', 'יצירתיות בצוות'],
  },
  {
    title: 'משאבים',
    items: ['בלוג', 'מקרי בוחן', 'דוח מצב 2026', 'שאלות נפוצות'],
  },
  {
    title: 'משרד',
    items: ['רוטשילד 22, תל אביב', 'ימים א׳–ה׳ · 09:00–18:00', 'hello@vinci.com'],
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-ink text-white/80">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-brand-pink to-transparent" />
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-12 lg:col-span-4">
            <motion.img
              src="/logo.svg"
              alt="Vinci"
              className="mb-5 h-12 w-auto brightness-0 invert"
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              Vinci · Be Invincible. קורסי חשיבה חיובית ומיינדסט שעוצבו עם
              ובשביל מחלקות HR בארגונים מובילים.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3, rotate: -4 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-brand-pink hover:bg-brand-pink hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Columns */}
          <div className="grid gap-8 sm:grid-cols-3 md:col-span-12 lg:col-span-8">
            {COLS.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/40">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-white/75 transition-colors hover:text-brand-pink"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Vinci. כל הזכויות שמורות.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-pink">
              תנאי שימוש
            </a>
            <a href="#" className="hover:text-brand-pink">
              מדיניות פרטיות
            </a>
            <a href="#" className="hover:text-brand-pink">
              נגישות
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
