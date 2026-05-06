import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CURSOR_SIZE = 56
const CURSOR_SIZE_HOVER = 84

export default function CursorHalo() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)
  const [enabled, setEnabled] = useState(false)

  // Slightly stiffer springs so the elephant tracks tightly without feeling laggy
  const sx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.45 })
  const sy = useSpring(y, { stiffness: 320, damping: 28, mass: 0.45 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return
    setEnabled(true)
    document.documentElement.classList.add('elephant-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const enter = (e) => {
      const t = e.target
      if (
        t instanceof Element &&
        t.closest(
          'a, button, input, textarea, select, label, [data-cursor="hover"]',
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
          'a, button, input, textarea, select, label, [data-cursor="hover"]',
        )
      ) {
        setHovered(false)
      }
    }
    const down = () => setActive(true)
    const up = () => setActive(false)
    const out = () => x.set(-200)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', enter, true)
    document.addEventListener('mouseout', leave, true)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', out)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', enter, true)
      document.removeEventListener('mouseout', leave, true)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', out)
      document.documentElement.classList.remove('elephant-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  const size = hovered ? CURSOR_SIZE_HOVER : CURSOR_SIZE

  return (
    <motion.div
      aria-hidden
      className="cursor-halo pointer-events-none fixed top-0 left-0 z-[90]"
      style={{ x: sx, y: sy }}
    >
      {/* Soft pink halo behind the elephant — gives presence without obscuring content */}
      <motion.div
        className="absolute rounded-full bg-brand-pink/15 blur-md"
        animate={{
          width: size + 28,
          height: size + 28,
          x: -(size + 28) / 2,
          y: -(size + 28) / 2,
          opacity: hovered ? 0.9 : 0.55,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      />

      {/* Elephant icon — slight bob + lean on hover, squish on click */}
      <motion.img
        src="/cursor.png"
        alt=""
        draggable={false}
        className="absolute select-none drop-shadow-[0_4px_10px_rgba(242,119,138,0.45)]"
        animate={{
          width: size,
          height: 'auto',
          x: -size / 2,
          y: -size / 2,
          rotate: hovered ? -8 : 0,
          scale: active ? 0.85 : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      />
    </motion.div>
  )
}
