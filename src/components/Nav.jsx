import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { href: '#courses', label: 'הקורסים' },
  { href: '#how', label: 'איך זה עובד' },
  { href: '#roi', label: 'מחשבון ROI' },
  { href: '#testimonials', label: 'המלצות' },
  { href: '#contact', label: 'צרו קשר' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(27,27,27,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3.5 md:px-8">
        {/* Logo */}
        <a
          href="#top"
          className="group relative flex items-center"
          aria-label="Vinci"
        >
          <motion.img
            src="/logo.svg"
            alt="Vinci · Be Invincible"
            className="h-9 md:h-11 w-auto"
            whileHover={{ scale: 1.04, rotate: -1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            draggable={false}
          />
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-[15px] font-medium text-brand-inkSoft transition-colors hover:text-brand-ink"
            >
              {link.label}
              <span className="absolute -bottom-1 right-0 h-[2px] w-0 bg-brand-pink transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full bg-brand-ink px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-pink hover:shadow-button md:inline-flex"
        >
          תאמו שיחה
        </a>

        {/* Mobile burger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="פתח תפריט"
          className="md:hidden rounded-full border border-brand-ink/10 bg-white/80 p-2.5 backdrop-blur"
        >
          <Menu className="h-5 w-5 text-brand-ink" />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-brand-ink/40 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              className="fixed inset-y-0 right-0 z-50 w-[80%] max-w-sm bg-white p-6 shadow-2xl md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <img src="/logo.svg" alt="Vinci" className="h-9 w-auto" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="סגור תפריט"
                  className="rounded-full border border-brand-ink/10 p-2"
                >
                  <X className="h-5 w-5 text-brand-ink" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i + 0.1, duration: 0.4 }}
                    className="rounded-2xl px-4 py-3 text-lg font-medium text-brand-ink transition hover:bg-brand-pinkSoft"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-4 rounded-full bg-brand-pink px-5 py-3.5 text-center text-base font-semibold text-white shadow-button"
                >
                  תאמו שיחת ייעוץ
                </a>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
