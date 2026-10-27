import { Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const TRACK = '/audio/wheres-the-party-tonight.mp3'

export function BgMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [started, setStarted] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const audio = new Audio(TRACK)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.45
    audioRef.current = audio

    let unlocked = false

    const markStarted = () => {
      setStarted(true)
      setMuted(audio.muted)
    }

    const tryPlay = async () => {
      try {
        audio.muted = false
        await audio.play()
        unlocked = true
        markStarted()
        return true
      } catch {
        return false
      }
    }

    const unlockOnGesture = () => {
      if (unlocked) return
      void tryPlay().then((ok) => {
        if (ok) {
          window.removeEventListener('pointerdown', unlockOnGesture)
          window.removeEventListener('keydown', unlockOnGesture)
          window.removeEventListener('touchstart', unlockOnGesture)
        }
      })
    }

    void tryPlay().then((ok) => {
      if (!ok) {
        // Browsers block autoplay with sound — start on first tap anywhere
        window.addEventListener('pointerdown', unlockOnGesture, { passive: true })
        window.addEventListener('keydown', unlockOnGesture)
        window.addEventListener('touchstart', unlockOnGesture, { passive: true })
      }
    })

    return () => {
      window.removeEventListener('pointerdown', unlockOnGesture)
      window.removeEventListener('keydown', unlockOnGesture)
      window.removeEventListener('touchstart', unlockOnGesture)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  function toggleMute() {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setMuted(audio.muted)
    if (!audio.muted && audio.paused) {
      void audio.play().then(() => setStarted(true))
    }
  }

  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-label={muted || !started ? 'Unmute music' : 'Mute music'}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 bg-navy/90 text-gold-light shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md"
    >
      {muted || !started ? (
        <VolumeX className="h-5 w-5" />
      ) : (
        <Volume2 className="h-5 w-5" />
      )}
    </button>
  )
}
