const sparkles = [
  { top: '6%', left: '10%', delay: '0s', size: 3 },
  { top: '11%', left: '82%', delay: '0.4s', size: 2 },
  { top: '18%', left: '28%', delay: '0.9s', size: 2.5 },
  { top: '22%', left: '58%', delay: '1.3s', size: 2 },
  { top: '30%', left: '8%', delay: '0.2s', size: 3 },
  { top: '34%', left: '90%', delay: '1.7s', size: 2 },
  { top: '42%', left: '18%', delay: '0.7s', size: 2.5 },
  { top: '48%', left: '72%', delay: '1.1s', size: 3 },
  { top: '55%', left: '42%', delay: '1.9s', size: 2 },
  { top: '62%', left: '6%', delay: '0.5s', size: 2.5 },
  { top: '68%', left: '88%', delay: '1.4s', size: 2 },
  { top: '74%', left: '32%', delay: '0.8s', size: 3 },
  { top: '80%', left: '64%', delay: '1.6s', size: 2 },
  { top: '86%', left: '14%', delay: '2.1s', size: 2.5 },
  { top: '90%', left: '78%', delay: '0.3s', size: 2 },
  { top: '15%', left: '45%', delay: '2.4s', size: 2 },
  { top: '50%', left: '52%', delay: '1.0s', size: 2.5 },
  { top: '38%', left: '38%', delay: '2.0s', size: 2 },
]

const stars = [
  { top: '9%', left: '36%', delay: '0s', size: 10 },
  { top: '26%', left: '70%', delay: '0.8s', size: 8 },
  { top: '58%', left: '24%', delay: '1.5s', size: 9 },
  { top: '76%', left: '54%', delay: '0.4s', size: 7 },
  { top: '44%', left: '86%', delay: '2s', size: 8 },
]

const diyas = [
  { top: '10%', left: '4%', delay: '0s', scale: 0.7 },
  { top: '20%', right: '3%', delay: '0.9s', scale: 0.85 },
  { top: '40%', left: '2%', delay: '1.6s', scale: 0.6 },
  { top: '52%', right: '4%', delay: '0.4s', scale: 0.75 },
  { top: '70%', left: '5%', delay: '2.2s', scale: 0.68 },
  { top: '82%', right: '6%', delay: '1.1s', scale: 0.8 },
  { top: '88%', left: '28%', delay: '1.8s', scale: 0.55 },
]

const crackers = [
  { top: '16%', left: '20%', delay: '0s', color: '#ff6b35' },
  { top: '28%', left: '75%', delay: '0.7s', color: '#ffe566' },
  { top: '46%', left: '12%', delay: '1.4s', color: '#e91e8c' },
  { top: '60%', left: '68%', delay: '0.3s', color: '#f0d78c' },
  { top: '78%', left: '45%', delay: '1.9s', color: '#9ec9e8' },
  { top: '36%', left: '48%', delay: '1.1s', color: '#ffb347' },
]

function DiyaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <ellipse cx="24" cy="36" rx="14" ry="4" fill="#d4a853" opacity="0.3" />
      <path
        d="M12 34c0-8 5.5-15 12-22 6.5 7 12 14 12 22a12 12 0 1 1-24 0z"
        fill="#d4a853"
        opacity="0.6"
      />
      <path
        d="M24 16c1.8 3.5 4.5 8 4.5 12a4.5 4.5 0 1 1-9 0c0-4 2.7-8.5 4.5-12z"
        fill="#f0d78c"
        opacity="0.9"
        className="animate-twinkle-flame origin-bottom"
        style={{ transformOrigin: '24px 34px' }}
      />
      <circle cx="24" cy="24" r="2.2" fill="#ffb347" />
    </svg>
  )
}

function StarBurst({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#f0d78c" aria-hidden>
      <path d="M12 2l1.2 7.2L20 12l-6.8 2.8L12 22l-1.2-7.2L4 12l6.8-2.8L12 2z" opacity="0.85" />
    </svg>
  )
}

export function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="animate-ambient absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/25 blur-[110px]" />
      <div className="animate-ambient absolute bottom-0 left-0 h-72 w-72 rounded-full bg-ember/15 blur-[100px] [animation-delay:2s]" />
      <div className="animate-ambient absolute right-0 top-1/3 h-64 w-64 rounded-full bg-magenta/15 blur-[90px] [animation-delay:1s]" />
      <div className="animate-ambient absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-pakka/10 blur-[80px] [animation-delay:3s]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#080d18_78%)]" />

      {diyas.map((d, i) => (
        <div
          key={`diya-${i}`}
          className="animate-float-diya absolute"
          style={{
            top: d.top,
            left: d.left,
            right: d.right,
            animationDelay: d.delay,
            transform: `scale(${d.scale})`,
          }}
        >
          <DiyaIcon className="h-12 w-12 drop-shadow-[0_0_10px_rgba(255,179,71,0.45)]" />
        </div>
      ))}

      {sparkles.map((s, i) => (
        <span
          key={`spark-${i}`}
          className="animate-sparkle absolute rounded-full bg-gold-light"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            boxShadow: '0 0 10px 2px rgba(240, 215, 140, 0.55)',
          }}
        />
      ))}

      {stars.map((s, i) => (
        <div
          key={`star-${i}`}
          className="animate-star-spin absolute"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        >
          <StarBurst size={s.size} />
        </div>
      ))}

      {crackers.map((c, i) => (
        <span
          key={`cracker-${i}`}
          className="animate-cracker absolute h-2 w-2 rounded-full"
          style={{
            top: c.top,
            left: c.left,
            backgroundColor: c.color,
            animationDelay: c.delay,
            boxShadow: `0 0 12px 3px ${c.color}`,
          }}
        />
      ))}
    </div>
  )
}