import { motion } from 'framer-motion'

const pieces = Array.from({ length: 36 }).map((_, i) => {
  const angle = (i / 36) * Math.PI * 2
  const dist = 80 + (i % 5) * 28
  return {
    id: i,
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist - 40,
    rotate: (i * 47) % 360,
    color: ['#d4a853', '#f0d78c', '#ffb347', '#ff6b35', '#f7edd8', '#c9a227'][
      i % 6
    ],
    size: 5 + (i % 4),
  }
})

export function ConfettiBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute left-1/2 top-1/2 rounded-sm"
          style={{
            width: p.size,
            height: p.size * 1.4,
            backgroundColor: p.color,
            boxShadow: `0 0 6px ${p.color}`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y + 120,
            opacity: 0,
            scale: 0.4,
            rotate: p.rotate,
          }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
