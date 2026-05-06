import { motion } from 'framer-motion'

/**
 * Reusable decorative background patterns inspired by the elephant character —
 * trunk-like flowing curves, radiating dotted circles, and soft dot grids.
 *
 * Props:
 *   variant: 'flow' | 'radial' | 'dots' | 'mesh'
 *   className: positioning utilities (defaults absolute inset-0 -z-10)
 *   color: stroke/fill color (default brand pink)
 *   opacity: overall opacity multiplier (0..1)
 *   animate: enable subtle motion (default true)
 */
export default function BgPattern({
  variant = 'flow',
  className = '',
  color = '#f2778a',
  opacity = 1,
  animate = true,
}) {
  const base = `pointer-events-none absolute inset-0 -z-10 ${className}`

  if (variant === 'flow') {
    return (
      <svg
        className={base}
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
        style={{ opacity }}
      >
        <defs>
          <linearGradient id="bg-flow-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          'M-100 600 C 200 480, 400 720, 700 540 S 1100 380, 1300 480',
          'M-100 700 C 250 560, 450 800, 750 620 S 1100 460, 1300 560',
          'M-100 500 C 200 380, 400 620, 700 440 S 1100 280, 1300 380',
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeOpacity={0.18 - i * 0.04}
            initial={animate ? { pathLength: 0 } : false}
            whileInView={animate ? { pathLength: 1 } : false}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 2.4, delay: i * 0.2, ease: 'easeOut' }}
          />
        ))}
        <ellipse cx="200" cy="180" rx="220" ry="160" fill="url(#bg-flow-grad)" />
        <ellipse cx="980" cy="640" rx="280" ry="200" fill="url(#bg-flow-grad)" />
      </svg>
    )
  }

  if (variant === 'radial') {
    return (
      <svg
        className={base}
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        style={{ opacity }}
      >
        {[60, 110, 165, 225, 290, 360, 435].map((r, i) => (
          <motion.circle
            key={r}
            cx="300"
            cy="300"
            r={r}
            fill="none"
            stroke={color}
            strokeOpacity={0.45 - i * 0.05}
            strokeWidth={1.5}
            strokeDasharray="2 6"
            initial={animate ? { scale: 0.7, opacity: 0 } : false}
            animate={
              animate
                ? { scale: [0.92, 1, 0.92], opacity: [0.6, 1, 0.6] }
                : false
            }
            transition={{
              duration: 6 + i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.15,
            }}
            style={{ transformOrigin: '300px 300px' }}
          />
        ))}
      </svg>
    )
  }

  if (variant === 'dots') {
    const cols = 24
    const rows = 16
    const dots = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push(
          <circle
            key={`${r}-${c}`}
            cx={(c + 0.5) * (1200 / cols)}
            cy={(r + 0.5) * (800 / rows)}
            r={2}
            fill={color}
            opacity={0.16}
          />,
        )
      }
    }
    return (
      <svg
        className={base}
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
        style={{ opacity }}
      >
        {dots}
      </svg>
    )
  }

  // mesh — soft layered blobs
  return (
    <div
      className={base}
      style={{
        opacity,
        background: `
          radial-gradient(ellipse 50% 40% at 15% 20%, rgba(242,119,138,0.22), transparent 60%),
          radial-gradient(ellipse 60% 50% at 85% 80%, rgba(242,119,138,0.18), transparent 60%),
          radial-gradient(ellipse 40% 30% at 50% 50%, rgba(253,230,234,0.6), transparent 60%)
        `,
      }}
    />
  )
}
