import { AnimatePresence, motion } from 'framer-motion'
import { CloudFog, Sparkles, UtensilsCrossed } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  RSVP_STORAGE_KEY,
  type RsvpEntry,
  type RsvpResponse,
} from '../data/invite'
import { ConfettiBurst } from './ConfettiBurst'

const options: {
  value: RsvpResponse
  label: string
  className: string
  textClass: string
  Icon: typeof Sparkles
}[] = [
  {
    value: 'pakka',
    label: 'Pakka Pakka',
    className: 'bg-pakka shadow-[0_8px_28px_-8px_rgba(255,229,102,0.7)]',
    textClass: 'text-navy-deep',
    Icon: Sparkles,
  },
  {
    value: 'plate',
    label: "Save Me A Plate, I'm In",
    className: 'bg-magenta shadow-[0_8px_28px_-8px_rgba(233,30,140,0.65)]',
    textClass: 'text-white',
    Icon: UtensilsCrossed,
  },
  {
    value: 'confused',
    label: '90% in, 10% confused',
    className: 'bg-confused/80 shadow-[0_8px_24px_-10px_rgba(158,201,232,0.55)]',
    textClass: 'text-navy-deep',
    Icon: CloudFog,
  },
]

const messages: Record<RsvpResponse, { title: string; body: string }> = {
  pakka: {
    title: 'Pakka pakka!!',
    body: 'Seat reserved. Sparkle mode: ON. See you at Dilwali Diwali.',
  },
  plate: {
    title: 'Plate saved!',
    body: "We're keeping the good stuff warm for you. Aa jao hungrily.",
  },
  confused: {
    title: 'Noted, almost-hero',
    body: "We'll hold a soft maybe seat. Flip back when the 10% figures it out.",
  },
}

function loadSaved(): RsvpEntry | null {
  try {
    const raw = localStorage.getItem(RSVP_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as RsvpEntry
    if (!['pakka', 'plate', 'confused'].includes(parsed.response)) return null
    return parsed
  } catch {
    return null
  }
}

export function RsvpForm() {
  const [submitted, setSubmitted] = useState<RsvpEntry | null>(null)
  const [burst, setBurst] = useState(false)
  const [pulse, setPulse] = useState<RsvpResponse | null>(null)

  useEffect(() => {
    setSubmitted(loadSaved())
  }, [])

  function pick(response: RsvpResponse) {
    setPulse(response)
    const entry: RsvpEntry = {
      response,
      submittedAt: new Date().toISOString(),
    }
    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(entry))
    window.setTimeout(() => {
      setSubmitted(entry)
      setBurst(true)
      window.setTimeout(() => setBurst(false), 1600)
    }, 420)
  }

  function reset() {
    localStorage.removeItem(RSVP_STORAGE_KEY)
    setSubmitted(null)
    setPulse(null)
    setBurst(false)
  }

  if (submitted) {
    const msg = messages[submitted.response]
    return (
      <div className="relative flex h-full flex-col items-center justify-center text-center">
        {burst && <ConfettiBurst />}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -4 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 16 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 0.55 }}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/15 text-gold-light"
          >
            <Sparkles className="h-6 w-6" />
          </motion.div>
          <p className="font-display text-2xl text-gold-light">{msg.title}</p>
          <p className="max-w-[16rem] text-sm leading-relaxed text-cream/65">{msg.body}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-2 min-h-11 rounded-full px-4 text-xs tracking-wide text-cream/50 underline-offset-4 hover:text-gold hover:underline"
          >
            Change mind
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col justify-center gap-3" onClick={(e) => e.stopPropagation()}>
      <p className="mb-1 text-center text-[11px] uppercase tracking-[0.18em] text-gold/70">
        Pick one
      </p>
      <AnimatePresence>
        {options.map((opt, i) => {
          const Icon = opt.Icon
          const isPulsing = pulse === opt.value
          return (
            <motion.button
              key={opt.value}
              type="button"
              initial={{ opacity: 0, x: -12 }}
              animate={
                isPulsing
                  ? { opacity: 1, x: 0, scale: [1, 1.06, 0.98, 1.04], rotate: [0, -2, 2, 0] }
                  : { opacity: 1, x: 0, scale: 1, rotate: 0 }
              }
              transition={
                isPulsing
                  ? { duration: 0.45, ease: 'easeOut' }
                  : { delay: i * 0.05, type: 'spring', stiffness: 320, damping: 20 }
              }
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => pick(opt.value)}
              className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold ${opt.className} ${opt.textClass}`}
            >
              <motion.span
                animate={isPulsing ? { rotate: [0, -20, 20, 0], scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                <Icon className="h-4 w-4" />
              </motion.span>
              {opt.label}
            </motion.button>
          )
        })}
      </AnimatePresence>
    </div>
  )
}