import Head from 'next/head'
import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react'
import type { JSX } from 'react'

const Confetti = dynamic(() => import('react-confetti'), { ssr: false })

const SOUND_URL = 'https://www.myinstants.com/media/sounds/angels-bonus-technique.mp3'
const MEME_URL = 'https://i.imgflip.com/aqfjo3.jpg'
const GNOME_URL =
  'https://www.pngitem.com/pimgs/m/121-1219639_transparent-dank-memes-png-gnome-child-png-download.png'

const GRAPE_SIZE = 80 // px — used for both render size and bounce bounds
const GRAPE_COUNT = 5

// Different starting velocities per grapefruit so they fan out
const GRAPE_VELOCITIES: Array<{ vx: number; vy: number }> = [
  { vx: 5, vy: 4 },
  { vx: -4, vy: 5 },
  { vx: 6, vy: -3 },
  { vx: -5, vy: -4 },
  { vx: 3, vy: 6 },
]

// Homokaasu-style hard-step rainbow: each letter cycles through the same
// colors but with a different animation-delay so the title shimmers chaotically
function RainbowText({ text }: { text: string }): JSX.Element {
  return (
    <span>
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{
            animation: 'homo-rainbow 0.8s steps(7, end) infinite',
            animationDelay: `${-i * 0.11}s`,
            display: 'inline-block',
            whiteSpace: 'pre',
            fontSize: '3em'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export default function AleksBursdag(): JSX.Element {
  const [opened, setOpened] = useState(false)
  const [winSize, setWinSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const giftRef = useRef<HTMLDivElement | null>(null)
  const grapeRefs = useRef<Array<HTMLDivElement | null>>([])
  const startPosRef = useRef<{ x: number; y: number } | null>(null)

  // Track viewport size for react-confetti
  useEffect(() => {
    function update() {
      setWinSize({ w: window.innerWidth, h: window.innerHeight })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // F to open — capture gift position BEFORE the gift unmounts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'f' || e.key === 'F') {
        if (!startPosRef.current && giftRef.current) {
          const rect = giftRef.current.getBoundingClientRect()
          startPosRef.current = {
            x: rect.left + rect.width / 2 - GRAPE_SIZE / 2,
            y: rect.top + rect.height / 2 - GRAPE_SIZE / 2,
          }
        }
        setOpened(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Audio loop
  useEffect(() => {
    if (!opened) return
    const audio = audioRef.current
    if (!audio) return
    audio.loop = true
    audio.volume = 1.0
    audio.currentTime = 0
    audio.play().catch(() => {
      // autoplay was blocked — should not happen since F is a user gesture
    })
  }, [opened])

  // Bouncing grapefruits — all start from the gift, fan out in different directions
  useEffect(() => {
    if (!opened) return

    const start = startPosRef.current ?? {
      x: window.innerWidth / 2 - GRAPE_SIZE / 2,
      y: window.innerHeight / 2 - GRAPE_SIZE / 2,
    }

    type Grape = { el: HTMLDivElement; x: number; y: number; vx: number; vy: number }
    const grapes: Grape[] = []
    for (let i = 0; i < GRAPE_COUNT; i++) {
      const el = grapeRefs.current[i]
      if (!el) continue
      const v = GRAPE_VELOCITIES[i % GRAPE_VELOCITIES.length]
      const g: Grape = { el, x: start.x, y: start.y, vx: v.vx, vy: v.vy }
      el.style.left = `${g.x}px`
      el.style.top = `${g.y}px`
      grapes.push(g)
    }
    if (grapes.length === 0) return

    let raf = 0
    function tick() {
      const maxX = window.innerWidth - GRAPE_SIZE
      const maxY = window.innerHeight - GRAPE_SIZE
      for (const g of grapes) {
        g.x += g.vx
        g.y += g.vy
        if (g.x <= 0) {
          g.x = 0
          g.vx = -g.vx
        } else if (g.x >= maxX) {
          g.x = maxX
          g.vx = -g.vx
        }
        if (g.y <= 0) {
          g.y = 0
          g.vy = -g.vy
        } else if (g.y >= maxY) {
          g.y = maxY
          g.vy = -g.vy
        }
        g.el.style.left = `${g.x}px`
        g.el.style.top = `${g.y}px`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [opened])

  return (
    <>
      <Head>
        <title>IT IS YOUR BIRTHDAY.</title>
        <link rel="icon" href="whale.png" />
      </Head>

      <main
        style={{
          textAlign: 'center',
          background: '#fff',
          color: '#000',
          minHeight: '100vh',
          padding: '24px 16px 80px',
          overflow: 'hidden',
          position: 'relative',
          fontFamily: '"Times New Roman", Times, serif',
        }}
      >
        <h1 style={{ margin: '16px 0 12px' }}>
          {opened ? <RainbowText text="GZ M DAG" /> : 'IT IS YOUR BIRTHDAY.'}
        </h1>

        <img
          src={MEME_URL}
          alt="aleks meme"
          style={{
            maxWidth: '100%',
            width: 480,
            border: '2px solid #000',
            margin: '12px auto 20px',
            display: 'block',
          }}
        />

        <p
          style={{
            fontSize: '1.25rem',
            margin: '0 auto 24px',
            maxWidth: 640,
            lineHeight: 1.5,
          }}
        >
          Nå er 20-åra ferri! Lykke til med de neste 20+. Her er gave osv.
        </p>

        {!opened && (
          <div
            ref={giftRef}
            aria-label="gift"
            style={{
              fontSize: 'clamp(6rem, 16vw, 11rem)',
              lineHeight: 1,
              margin: '8px 0',
            }}
          >
            🎁
          </div>
        )}

        {opened && (
          <img
            src={GNOME_URL}
            alt="gnome reveal"
            style={{
              maxWidth: '100%',
              width: 360,
              margin: '12px auto',
              display: 'block',
              animation: 'gnome-reveal 0.6s ease-out',
            }}
          />
        )}

        <p
          style={{
            fontSize: '1.5rem',
            margin: '16px 0 24px',
            fontStyle: 'courier',
          }}
        >
          {opened ? 'grapefruitgnome.mp3.exe' : "Trykk 'F' for å åpne gaven"}
        </p>

        <audio ref={audioRef} src={SOUND_URL} preload="auto" />

        {opened && (
          <>
            {Array.from({ length: GRAPE_COUNT }).map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  grapeRefs.current[i] = el
                }}
                aria-hidden="true"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: GRAPE_SIZE,
                  height: GRAPE_SIZE,
                  fontSize: `${GRAPE_SIZE}px`,
                  lineHeight: 1,
                  pointerEvents: 'none',
                  zIndex: 10000,
                  userSelect: 'none',
                }}
              >
                🍊
              </div>
            ))}

            <Confetti
              width={winSize.w}
              height={winSize.h}
              numberOfPieces={500}
              recycle={true}
              gravity={0.25}
              style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
            />
          </>
        )}

        <style>{`
          @keyframes gnome-reveal {
            0%   { opacity: 0; transform: scale(0.2) rotate(-15deg); }
            70%  { opacity: 1; transform: scale(1.1) rotate(5deg); }
            100% { opacity: 1; transform: scale(1) rotate(0deg); }
          }
          @keyframes homo-rainbow {
            0%   { color: #ff0000; }
            14%  { color: #ff8800; }
            28%  { color: #ffff00; }
            42%  { color: #00ff00; }
            57%  { color: #00ffff; }
            71%  { color: #0044ff; }
            85%  { color: #ff00ff; }
            100% { color: #ff0000; }
          }
        `}</style>
      </main>
    </>
  )
}
