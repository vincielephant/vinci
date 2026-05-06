import { motion, useScroll, useTransform } from 'framer-motion'
import ElephantSilhouette from './ElephantSilhouette'

const ORBS = [
  { top: '8%', left: '6%', size: 64, depth: 0.3, delay: 0, opacity: 0.07 },
  { top: '24%', left: '88%', size: 48, depth: 0.6, delay: 1.2, opacity: 0.06 },
  { top: '52%', left: '4%', size: 88, depth: 0.45, delay: 0.5, opacity: 0.05 },
  { top: '70%', left: '92%', size: 52, depth: 0.8, delay: 2.1, opacity: 0.06 },
  { top: '110%', left: '20%', size: 72, depth: 0.5, delay: 0.8, opacity: 0.05 },
  { top: '140%', left: '78%', size: 60, depth: 0.7, delay: 1.6, opacity: 0.06 },
  { top: '180%', left: '12%', size: 84, depth: 0.4, delay: 0.2, opacity: 0.05 },
  { top: '220%', left: '85%', size: 44, depth: 0.9, delay: 2.4, opacity: 0.07 },
]

export default function FloatingMascots() {
  const { scrollY } = useScroll()

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {ORBS.map((orb, i) => (
        <Orb key={i} orb={orb} scrollY={scrollY} />
      ))}
    </div>
  )
}

function Orb({ orb, scrollY }) {
  const y = useTransform(scrollY, [0, 3000], [0, -600 * orb.depth])
  const rotate = useTransform(scrollY, [0, 3000], [0, 180 * orb.depth])

  return (
    <motion.div
      className="absolute"
      style={{
        top: orb.top,
        left: orb.left,
        y,
        rotate,
        opacity: orb.opacity,
      }}
      animate={{
        x: [0, 12, -8, 0],
        y: [0, -10, 6, 0],
      }}
      transition={{
        duration: 14 + orb.delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: orb.delay,
      }}
    >
      <ElephantSilhouette size={orb.size} color="#f2778a" />
    </motion.div>
  )
}
