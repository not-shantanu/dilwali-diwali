import { motion } from 'framer-motion'
import {
  Check,
  Copy,
  Dices,
  Flower2,
  Headphones,
  MapPin,
  Sparkles,
  Utensils,
} from 'lucide-react'
import { useState } from 'react'
import { invite } from '../data/invite'
import { RsvpForm } from './RsvpForm'

function TapHint() {
  return (
    <div className="mt-auto flex items-center justify-center gap-2 pt-4">
      <span className="h-px w-6 bg-gradient-to-r from-transparent to-gold/60" />
      <p className="text-[11px] tracking-[0.16em] text-cream/80 uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]">
        Tap to flip
      </p>
      <span className="h-px w-6 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  )
}

export function OccasionFront() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-[2.6rem] leading-[1.05] text-gold-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:text-[2.85rem]"
      >
        Dilwali Diwali
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-display mt-5 max-w-[16rem] text-[1.35rem] leading-snug text-cream italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-[1.45rem]"
      >
        Thodi Roshni, Thodi Masti, Dher Saari Yaade
      </motion.p>
      <TapHint />
    </div>
  )
}

export function OccasionBack() {
  return (
    <div className="flex h-full flex-col justify-center text-center">
      <p className="text-[11px] uppercase tracking-[0.2em] text-gold/70">When</p>
      <dl className="mt-6 space-y-5">
        <div>
          <dt className="text-[11px] uppercase tracking-[0.16em] text-cream/40">Date</dt>
          <dd className="mt-1 font-display text-2xl text-cream">{invite.date}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-[0.16em] text-cream/40">Day</dt>
          <dd className="mt-1 font-display text-2xl text-cream">{invite.day}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-[0.16em] text-cream/40">Time</dt>
          <dd className="mt-1 font-display text-2xl text-cream">{invite.time}</dd>
        </div>
      </dl>
      <p className="mt-8 text-sm leading-relaxed text-cream/55">
        Aa jao - lights, laughter, masti guaranteed.
      </p>
    </div>
  )
}

export function VenueFront() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/15 text-gold">
        <MapPin className="h-6 w-6" />
      </div>
      <h2 className="font-display text-[2.2rem] leading-tight text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
        Scene of the sparkle
      </h2>
      <p className="mt-3 text-sm tracking-wide text-gold-light drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]">
        Our humble abode
      </p>
      <TapHint />
    </div>
  )
}

export function VenueBack() {
  const [copied, setCopied] = useState(false)

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(invite.addressOneLine)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <p className="text-center text-[11px] uppercase tracking-[0.18em] text-gold/70">
        Address
      </p>
      <h3 className="font-display mt-2 text-center text-2xl text-gold-light">
        Our humble abode
      </h3>
      <p className="mt-5 whitespace-pre-line text-center text-sm leading-relaxed text-cream/80">
        {invite.address}
      </p>
      <div className="mt-auto flex flex-col gap-2.5 pt-6">
        <a
          href={invite.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-dim via-gold to-gold-light text-sm font-medium text-navy-deep"
        >
          <MapPin className="h-4 w-4" />
          Get Directions
        </a>
        <button
          type="button"
          onClick={copyAddress}
          className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-gold/40 text-sm text-gold-light"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy address'}
        </button>
      </div>
    </>
  )
}

export function DressFront() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <h2 className="font-display text-[2.4rem] leading-tight text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
        Kya pehne?
      </h2>
      <p className="mt-3 text-sm tracking-wide text-gold-light drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]">
        Thoda sajna, thoda chill
      </p>
      <TapHint />
    </div>
  )
}

export function DressBack() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <Sparkles className="mb-5 h-8 w-8 text-gold" />
      <p className="text-base tracking-wide text-gold-light/95">
        festive feels, zero fashion stress
      </p>
      <p className="mt-6 max-w-[16rem] rounded-2xl border border-gold/25 bg-midnight/40 px-4 py-3 text-sm leading-relaxed text-cream/75">
        Come as you are, add a little sparkle if you like, no pressure.
      </p>
    </div>
  )
}

const expectItems = [
  { icon: Headphones, label: 'jamming it out', color: '#ffe566' },
  { icon: Flower2, label: 'Gende ke Phool', color: '#ff8fab' },
  { icon: Sparkles, label: 'Rangolis and Diyas', color: '#f0d78c' },
  { icon: Dices, label: 'Nostalgic Fun Games', color: '#9ec9e8' },
  { icon: Utensils, label: 'Pet Puja', color: '#ffb347' },
] as const

export function VibeFront() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <h2 className="font-display text-[2.4rem] leading-tight text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
        Scene kya hai?
      </h2>
      <p className="mt-4 text-sm text-cream/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]">
        Flip for the night menu of masti
      </p>
      <TapHint />
    </div>
  )
}

export function VibeBack() {
  return (
    <ul className="flex h-full flex-col justify-center gap-3.5">
      {expectItems.map(({ icon: Icon, label, color }, i) => (
        <motion.li
          key={label}
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, type: 'spring', stiffness: 320, damping: 18 }}
          className="flex items-center gap-3.5"
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 shadow-[0_0_18px_-4px_rgba(240,215,140,0.55)]"
            style={{ backgroundColor: `${color}28`, color }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-fun text-[1.05rem] leading-snug font-medium tracking-wide text-cream sm:text-lg">
            {label}
          </span>
        </motion.li>
      ))}
    </ul>
  )
}

export function RsvpFront() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <h2 className="font-display text-[2.15rem] leading-tight text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
        Toh Pakka Aa Rahe Ho Na?
      </h2>
      <p className="mt-4 text-sm text-cream/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]">
        Flip & pick your vibe
      </p>
      <TapHint />
    </div>
  )
}

export function RsvpBack() {
  return <RsvpForm />
}