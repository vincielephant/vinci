import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorHalo() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  const sx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 24, mass: 0.4 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const enter = (e) => {
      const t = e.target
      if (
        t instanceof Element &&
        t.closest(
          'a, button, input, textarea, select, [data-cursor="hover"]',
        )
      ) {
        setHovered(true)
      }
    }
    const leave = (e) => {
      const t = e.target
      if (
        t instanceof Element &&
        t.closest(
          'a, button, input, textarea, select, [data-cursor="hover"]',
        )
      ) {
        setHovered(false)
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', enter, true)
    document.addEventListener('mouseout', leave, true)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', enter, true)
      document.removeEventListener('mouseout', leave, true)
    }
  }, [x, y, visible])

  return (
    <motion.div
      aria-hidden
      className="cursor-halo pointer-events-none fixed top-0 left-0 z-[90] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="rounded-full border border-brand-pink/40 bg-brand-pink/10 backdrop-blur-sm"
        animate={{
          width: hovered ? 64 : 22,
          height: hovered ? 64 : 22,
          opacity: visible ? 1 : 0,
          x: hovered ? -32 : -11,
          y: hovered ? -32 : -11,
          backgroundColor: hovered
            ? 'rgba(242,119,138,0.18)'
            : 'rgba(242,119,138,0.10)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      />
    </motion.div>
  )
}
