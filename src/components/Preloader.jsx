import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export default function Preloader({ visible }) {
  const reduce = useReducedMotion()

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-label="טוען..."
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-bg overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            clipPath: reduce ? 'inset(0)' : 'inset(0 0 100% 0)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* Pulsing rings behind logo */}
          {!reduce &&
            [0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2 border-brand-pink/40"
                style={{ width: 200, height: 200 }}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.5, 1.6], opacity: [0.7, 0] }}
                transition={{
                  duration: 2.4,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}

          {/* Soft pink halo */}
          <div
            className="absolute h-[420px] w-[420px] rounded-full bg-brand-pink/10 blur-3xl"
            aria-hidden
          />

          {/* Logo + character group */}
          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative"
            >
              {/* Mini elephant peeking up from below the logo */}
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.7,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="absolute -bottom-6 start-1/2 -translate-x-1/2"
                aria-hidden
              >
                <svg width="42" height="42" viewBox="0 0 64 64">
                  <motion.path
                    fill="#f2778a"
                    d="M14 22c0-8 7-14 16-14 9 0 16 6 16 14 0 3-1 5-1 7l5 4c2 1 2 4 0 5l-4 2c-1 4-4 7-8 8v6c0 2-2 3-4 3s-3-1-3-3v-5h-7v5c0 2-1 3-3 3s-4-1-4-3v-7c-3-2-5-5-6-9-3 0-6-2-7-5-2-4 0-8 4-9 1 0 3 0 4 1l1-3c0-1 0-3 1-4z"
                    animate={
                      reduce ? undefined : { y: [0, -3, 0] }
                    }
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                </svg>
              </motion.div>

              {/* The actual logo */}
              <img
                src="/logo.svg"
                alt="Vinci"
                className="h-20 md:h-28 w-auto select-none"
                draggable={false}
              />
            </motion.div>

            {/* Progress arc */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="relative h-12 w-12"
              aria-hidden
            >
              <svg
                className="h-full w-full"
                viewBox="0 0 50 50"
                style={{
                  animation: reduce
                    ? 'none'
                    : 'spin 1.2s linear infinite',
                }}
              >
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="rgba(242,119,138,0.15)"
                  strokeWidth="4"
                />
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="#f2778a"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="40 86"
                />
              </svg>
              <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
              `}</style>
            </motion.div>

            {/* Caption */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="font-display text-sm tracking-wide text-brand-inkSoft"
            >
              מכינים עבורך את החוויה<span className="mx-0.5">…</span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
