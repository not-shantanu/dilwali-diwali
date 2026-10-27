import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { useCallback, useState } from 'react'
import { AmbientBackground } from './components/AmbientBackground'
import {
  DressBack,
  DressFront,
  OccasionBack,
  OccasionFront,
  RsvpBack,
  RsvpFront,
  VenueBack,
  VenueFront,
  VibeBack,
  VibeFront,
} from './components/CardFaces'
import { FlipCard } from './components/FlipCard'
import { BgMusic } from './components/BgMusic'
import { ProgressDots } from './components/ProgressDots'

const cards = [
  {
    id: 'occasion',
    front: <OccasionFront />,
    back: <OccasionBack />,
    frontImage: '/card-bg/card-1.jpg',
  },
  {
    id: 'venue',
    front: <VenueFront />,
    back: <VenueBack />,
    frontImage: '/card-bg/card-2.jpg',
  },
  {
    id: 'dress',
    front: <DressFront />,
    back: <DressBack />,
    frontImage: '/card-bg/card-3.jpg',
  },
  {
    id: 'vibe',
    front: <VibeFront />,
    back: <VibeBack />,
    frontImage: '/card-bg/card-4.jpg',
  },
  {
    id: 'rsvp',
    front: <RsvpFront />,
    back: <RsvpBack />,
    frontImage: '/card-bg/card-5.jpg',
  },
] as const

export default function App() {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [direction, setDirection] = useState(0)

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= cards.length || next === index) return
      setDirection(next > index ? 1 : -1)
      setFlipped(false)
      setIndex(next)
    },
    [index],
  )

  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-navy-deep px-4 py-8">
      <AmbientBackground />
      <BgMusic />

      <div className="relative z-10 flex w-full max-w-[400px] flex-col gap-5">
        <header className="flex flex-col items-center pb-1" aria-label="Flip the cards below">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { duration: 0.35 },
              y: { duration: 1.15, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="select-none text-4xl drop-shadow-[0_0_14px_rgba(212,168,83,0.45)]"
            aria-hidden
          >
            👇
          </motion.span>
        </header>

        <ProgressDots
          total={cards.length}
          current={index}
          onSelect={(i) => goTo(i)}
        />

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={cards[index].id}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 36 : -36, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction >= 0 ? -36 : 36, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <FlipCard
                flipped={flipped}
                onFlip={() => setFlipped((f) => !f)}
                front={cards[index].front}
                back={cards[index].back}
                frontImage={cards[index].frontImage}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-gold/20 text-cream/70 transition enabled:hover:border-gold/40 enabled:hover:text-gold disabled:opacity-30"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            className="flex min-h-11 items-center gap-2 rounded-full border border-gold/25 px-4 text-xs tracking-[0.14em] text-gold-light uppercase"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {flipped ? 'Front' : 'Flip'}
          </button>

          <button
            type="button"
            onClick={next}
            disabled={index === cards.length - 1}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-gold/20 text-cream/70 transition enabled:hover:border-gold/40 enabled:hover:text-gold disabled:opacity-30"
            aria-label="Next card"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <p className="text-center text-[11px] tracking-wide text-cream/35">
          {index + 1} of {cards.length}
          {!flipped && ' · tap the card to reveal'}
        </p>
      </div>
    </div>
  )
}