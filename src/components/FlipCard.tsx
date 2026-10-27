import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FlipCardProps {
  flipped: boolean
  onFlip: () => void
  front: ReactNode
  back: ReactNode
  frontImage?: string
}

export function FlipCard({
  flipped,
  onFlip,
  front,
  back,
  frontImage,
}: FlipCardProps) {
  const faceClass =
    'absolute inset-0 overflow-hidden rounded-3xl border border-gold/55 card-border-bright backface-hidden'

  return (
    <div className="perspective-1000 w-full">
      <motion.div
        className="relative h-[min(58vh,440px)] w-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          role="button"
          tabIndex={0}
          aria-label="Tap to flip card"
          onClick={onFlip}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onFlip()
            }
          }}
          className={`${faceClass} cursor-pointer bg-navy-deep outline-none focus-visible:ring-2 focus-visible:ring-gold/70`}
          style={{ transform: 'rotateY(0deg)', transformStyle: 'preserve-3d' }}
        >
          {frontImage && (
            <img
              src={frontImage}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/35 via-navy-deep/45 to-navy-deep/70" />
          <div className="relative flex h-full flex-col p-6 sm:p-8">{front}</div>
        </div>

        <div
          className={`${faceClass} bg-gradient-to-br from-navy via-navy-deep to-maroon/40`}
          style={{ transform: 'rotateY(180deg)', transformStyle: 'preserve-3d' }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,168,83,0.16),transparent_55%)]" />
          <div className="relative flex h-full flex-col overflow-y-auto p-6 sm:p-8">
            {back}
          </div>
        </div>
      </motion.div>
    </div>
  )
}