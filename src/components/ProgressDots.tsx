import { motion } from 'framer-motion'

interface ProgressDotsProps {
  total: number
  current: number
  onSelect?: (index: number) => void
}

export function ProgressDots({ total, current, onSelect }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Invitation sections">
      {Array.from({ length: total }).map((_, i) => {
        const active = i === current
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`Section ${i + 1}`}
            onClick={() => onSelect?.(i)}
            className="flex h-8 w-8 items-center justify-center"
          >
            <motion.span
              className="block rounded-full"
              animate={{
                width: active ? 22 : 8,
                height: 8,
                backgroundColor: active
                  ? 'rgb(212, 168, 83)'
                  : 'rgba(247, 237, 216, 0.25)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            />
          </button>
        )
      })}
    </div>
  )
}
