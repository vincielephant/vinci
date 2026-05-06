import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Base width in CSS px; hover/click vary via `scale` (Framer animates that cleanly).
// Halo keeps a fixed wrapper size and varies via scale + opacity.
const CURSOR_W = 60
const HALO_W = 92

export default function CursorHalo() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const [imgOk, setImgOk] = useState(true)

  // Stiff springs so the elephant snaps to the cursor without lag.
  const sx = useSpring(x, { stiffness: 380, damping: 30, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 380, damping: 30, mass: 0.4 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    setEnabled(true)
    let firstMove = true

    const showCustom = () => document.documentElement.classList.add('elephant-cursor')
    const hideCustom = () => document.documentElement.classList.remove('elephant-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (firstMove) {
        firstMove = false
        showCustom()
      }
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

    // When mouse leaves the window, restore native cursor + park the elephant
    const docLeave = () => {
      hideCustom()
      x.set(-200)
      y.set(-200)
      firstMove = true
    }
    // On re-entry, take the next mousemove as "first move" again
    const docEnter = () => {
      firstMove = true
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', enter, true)
    document.addEventListener('mouseout', leave, true)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', docLeave)
    document.addEventListener('mouseenter', docEnter)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', enter, true)
      document.removeEventListener('mouseout', leave, true)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', docLeave)
      document.removeEventListener('mouseenter', docEnter)
      hideCustom()
    }
  }, [x, y])

  if (!enabled || !imgOk) return null

  // Hover state grows everything to 1.5x; click squishes to 0.85x
  const targetScale = active ? 0.85 : hovered ? 1.5 : 1

  return (
    <motion.div
      aria-hidden
      className="cursor-halo pointer-events-none fixed top-0 left-0 z-[90]"
      style={{ x: sx, y: sy }}
    >
      {/* Soft pink halo behind the elephant — adds presence without obscuring content */}
      <motion.div
        className="absolute left-0 top-0 rounded-full bg-brand-pink/20 blur-md"
        style={{
          width: HALO_W,
          height: HALO_W,
          x: -HALO_W / 2,
          y: -HALO_W / 2,
        }}
        animate={{
          scale: targetScale,
          opacity: hovered ? 0.85 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      />

      {/* Elephant icon — slight lean on hover, squish on click */}
      <motion.img
        src="/cursor.png"
        alt=""
        draggable={false}
        onError={() => setImgOk(false)}
        className="absolute left-0 top-0 max-w-none select-none drop-shadow-[0_4px_10px_rgba(242,119,138,0.45)]"
        style={{
          width: CURSOR_W,
          height: 'auto',
          x: -CURSOR_W / 2,
          y: -CURSOR_W / 2,
        }}
        animate={{
          scale: targetScale,
          rotate: hovered ? -8 : 0,
        }}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      />
    </motion.div>
  )
}
