import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'

// ─── Floating petal SVG (purely decorative) ───────────────────────────────
const Petal = ({ style }) => (
  <svg viewBox="0 0 40 60" style={style} aria-hidden="true">
    <ellipse cx="20" cy="30" rx="14" ry="28"
      fill="rgba(255,20,147,0.18)" transform="rotate(-18 20 30)" />
  </svg>
)

// ─── Badge pill ───────────────────────────────────────────────────────────
const Badge = ({ children }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: 'rgba(255,20,147,0.12)',
    border: '1px solid rgba(255,20,147,0.35)',
    color: '#ff1493',
    fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
    textTransform: 'uppercase', padding: '5px 14px',
    borderRadius: 999,
  }}>{children}</span>
)

// ─── Product card (bottom strip) ─────────────────────────────────────────
const ProductCard = ({ icon, label, delay }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 16, padding: '16px 20px', cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    transition: 'transform 0.25s ease, background 0.25s ease',
    animation: `fadeUp 0.6s ease ${delay}s both`,
    minWidth: 90,
  }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-6px)'
      e.currentTarget.style.background = 'rgba(255,20,147,0.2)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
    }}
  >
    <span style={{ fontSize: 28 }}>{icon}</span>
    <span style={{ color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textAlign: 'center' }}>
      {label}
    </span>
  </div>
)

// ─── Slide data ───────────────────────────────────────────────────────────
const slides = [
  {
    image: assets.bouquet_hero,
    badge: '🌸 Bestseller',
    heading: ['Blooms That', 'Speak Your', 'Heart'],
    sub: 'Handcrafted bouquets woven with love — for every moment that matters.',
    cta: 'Shop Bouquets',
    accent: '#ff1493',
    tag: 'BOUQUETS',
  },
  {
    image: assets.pot_hero,
    badge: '🪴 New Arrivals',
    heading: ['Tiny Gardens,', 'Big Joy,', 'Forever Yours'],
    sub: 'Mini flower pots that bring lasting elegance to any space — no watering needed.',
    cta: 'Shop Pots',
    accent: '#e91e8c',
    tag: 'MINI POTS',
  },
  {
    image: assets.keychain_hero,
    badge: '🔑 Fan Favourite',
    heading: ['Carry a', 'Little Bloom,', 'Everywhere'],
    sub: 'Adorable handmade keychains that keep florals close wherever you go.',
    cta: 'Shop Keychains',
    accent: '#c2185b',
    tag: 'KEYCHAINS',
  },
]

// ─── Main Hero ────────────────────────────────────────────────────────────
const Hero = () => {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % slides.length)
      setAnimKey(k => k + 1)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const goTo = i => { setActive(i); setAnimKey(k => k + 1) }

  const slide = slides[active]

  const products = [
    { icon: '💐', label: 'Bouquets' },
    { icon: '🪴', label: 'Mini Pots' },
    { icon: '🔑', label: 'Keychains' },
    { icon: '🌸', label: 'Loose Flowers' },
    { icon: '🧲', label: 'Fridge Magnets' },
    { icon: '💌', label: 'Flower Cards' },
    { icon: '✨', label: 'Custom Orders' },
  ]

  return (
    <>
      {/* ── Keyframe styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .hero-section * { box-sizing: border-box; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes zoomBg {
          from { transform: scale(1.08); }
          to   { transform: scale(1); }
        }
        @keyframes floatPetal1 {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-22px) rotate(12deg); }
        }
        @keyframes floatPetal2 {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-16px) rotate(-8deg); }
        }
        @keyframes progressBar {
          from { width: 0%; } to { width: 100%; }
        }
        @keyframes badgePop {
          0%   { opacity: 0; transform: scale(0.8) translateY(-10px); }
          60%  { transform: scale(1.05) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .slide-heading-line {
          display: block;
          animation: fadeUp 0.7s ease both;
        }
        .slide-heading-line:nth-child(1) { animation-delay: 0.1s; }
        .slide-heading-line:nth-child(2) { animation-delay: 0.22s; }
        .slide-heading-line:nth-child(3) { animation-delay: 0.34s; }

        .hero-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #ff1493; color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600; letter-spacing: 0.06em;
          padding: 15px 36px; border-radius: 999px; border: none;
          cursor: pointer; text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          box-shadow: 0 8px 30px rgba(255,20,147,0.4);
          animation: fadeUp 0.7s 0.5s ease both;
        }
        .hero-cta-btn:hover {
          background: #e8017f;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 14px 40px rgba(255,20,147,0.5);
        }

        .hero-cta-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.85);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 500;
          padding: 14px 28px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.3);
          cursor: pointer; text-decoration: none;
          background: rgba(255,255,255,0.07); backdrop-filter: blur(6px);
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          animation: fadeUp 0.7s 0.65s ease both;
        }
        .hero-cta-ghost:hover {
          background: rgba(255,255,255,0.16);
          border-color: rgba(255,255,255,0.5);
          transform: translateY(-2px);
        }

        .hero-dot {
          width: 8px; height: 8px; border-radius: 999px;
          border: 1.5px solid rgba(255,255,255,0.5);
          background: transparent; cursor: pointer; padding: 0;
          transition: background 0.3s, width 0.3s, border-color 0.3s;
        }
        .hero-dot.active {
          background: #ff1493; width: 28px;
          border-color: #ff1493;
        }

        .hero-thumb {
          width: 72px; height: 72px; border-radius: 14px;
          overflow: hidden; cursor: pointer;
          border: 2px solid transparent;
          transition: border-color 0.3s, transform 0.3s;
          flex-shrink: 0;
        }
        .hero-thumb.active { border-color: #ff1493; transform: scale(1.07); }
        .hero-thumb img { width: 100%; height: 100%; object-fit: cover; }

        .progress-bar-track {
          width: 100%; height: 2px;
          background: rgba(255,255,255,0.15);
          border-radius: 2px; overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%; background: #ff1493; border-radius: 2px;
          animation: progressBar 5s linear both;
        }

        .product-strip-item { animation: fadeUp 0.6s ease both; }
      `}</style>

      <section className="hero-section" style={{ fontFamily: "'DM Sans', sans-serif", position: 'relative', width: '100%' }}>

        {/* ── MAIN HERO PANEL ── */}
        <div style={{
          position: 'relative', width: '100%',
          height: 'min(92vh, 780px)', minHeight: 540,
          overflow: 'hidden',
        }}>

          {/* Background image */}
          <img
            key={`bg-${animKey}`}
            src={slide.image}
            alt={slide.tag}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              animation: 'zoomBg 5s ease forwards',
            }}
          />

          {/* Gradient overlays */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(110deg, rgba(10,0,20,0.75) 40%, rgba(10,0,20,0.25) 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(80,0,40,0.55) 0%, transparent 55%)',
          }} />

          {/* Decorative floating petals */}
          <Petal style={{
            position: 'absolute', top: '12%', right: '22%',
            width: 60, opacity: 0.6,
            animation: 'floatPetal1 6s ease-in-out infinite',
          }} />
          <Petal style={{
            position: 'absolute', top: '35%', right: '14%',
            width: 40, opacity: 0.4,
            animation: 'floatPetal2 8s ease-in-out infinite 1s',
          }} />
          <Petal style={{
            position: 'absolute', bottom: '20%', right: '30%',
            width: 50, opacity: 0.3,
            animation: 'floatPetal1 7s ease-in-out infinite 2s',
          }} />

          {/* Content */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', padding: 'clamp(24px, 6vw, 80px)',
            maxWidth: 680,
          }}>

            {/* Badge */}
            <div key={`badge-${animKey}`} style={{ marginBottom: 24, animation: 'badgePop 0.5s ease both' }}>
              <Badge>{slide.badge}</Badge>
            </div>

            {/* Heading */}
            <h1
              key={`h-${animKey}`}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(44px, 7vw, 88px)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.05,
                margin: '0 0 22px',
                letterSpacing: '-0.01em',
              }}
            >
              {slide.heading.map((line, i) => (
                <span className="slide-heading-line" key={i}
                  style={{ color: i === 1 ? '#ff69b4' : '#fff' }}>
                  {line}
                </span>
              ))}
            </h1>

            {/* Subline */}
            <p key={`p-${animKey}`} style={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: 'clamp(14px, 1.6vw, 17px)',
              lineHeight: 1.7, maxWidth: 420,
              margin: '0 0 36px',
              animation: 'fadeUp 0.7s 0.4s ease both',
            }}>
              {slide.sub}
            </p>

            {/* CTA row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
              <a href="#shop" className="hero-cta-btn">
                {slide.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#customize" className="hero-cta-ghost">
                ✨ Customise Yours
              </a>
            </div>

            {/* Stats row */}
            <div key={`stats-${animKey}`} style={{
              display: 'flex', gap: 32, marginTop: 44,
              animation: 'fadeUp 0.7s 0.8s ease both',
            }}>
              {[['500+', 'Happy Customers'], ['100%', 'Handmade'], ['7+', 'Collections']].map(([n, l]) => (
                <div key={l}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 28, fontWeight: 700, color: '#ff69b4',
                  }}>{n}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right panel — thumbnails ── */}
          <div style={{
            position: 'absolute', right: 'clamp(16px, 4vw, 48px)',
            top: '50%', transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center',
          }}>
            {slides.map((s, i) => (
              <button
                key={i}
                className={`hero-thumb${active === i ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={s.tag}
                style={{ background: 'none', padding: 0 }}
              >
                <img src={s.image} alt={s.tag} />
              </button>
            ))}
          </div>

          {/* ── Bottom controls ── */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: 'clamp(16px, 3vw, 32px) clamp(24px, 6vw, 80px)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: 20, flexWrap: 'wrap',
          }}>

            {/* Progress + dots */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 140, flex: 1 }}>
              <div className="progress-bar-track">
                <div key={`prog-${animKey}`} className="progress-bar-fill" />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {slides.map((_, i) => (
                  <button key={i}
                    className={`hero-dot${active === i ? ' active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Slide label */}
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
            }}>
              {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </div>

            {/* Current tag */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13, fontStyle: 'italic',
              color: 'rgba(255,255,255,0.5)',
            }}>
              {slide.tag}
            </div>
          </div>

        </div>

        {/* ── PRODUCT STRIP ── */}
        <div style={{
          background: 'linear-gradient(135deg, #1a0011 0%, #2d0022 100%)',
          borderTop: '1px solid rgba(255,20,147,0.2)',
        }}>
          {/* Label row */}
          <div style={{
            textAlign: 'center', padding: '28px 24px 10px',
          }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(255,105,180,0.7)',
            }}>
              Explore Our Collections
            </span>
          </div>

          {/* Cards */}
          <div style={{
            display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
            gap: 12, padding: '12px 24px 28px',
          }}>
            {products.map((p, i) => (
              <ProductCard key={p.label} {...p} delay={0.05 * i} />
            ))}
          </div>

          {/* Customise banner */}
          <div style={{
            margin: '0 24px 28px',
            background: 'linear-gradient(110deg, rgba(255,20,147,0.15), rgba(255,105,180,0.08))',
            border: '1px solid rgba(255,20,147,0.3)',
            borderRadius: 18,
            padding: '18px 28px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16,
          }}>
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22, fontWeight: 700, color: '#fff',
                lineHeight: 1.2,
              }}>
                Want Something <em style={{ color: '#ff69b4' }}>Truly Unique?</em>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 5 }}>
                Send us your idea — we'll handcraft it just for you.
              </div>
            </div>
            <a href="#customize" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#ff1493', color: '#fff',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 600, letterSpacing: '0.05em',
              padding: '12px 26px', borderRadius: 999, textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(255,20,147,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              flexShrink: 0,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,20,147,0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,20,147,0.35)'
              }}
            >
              ✨ Get a Custom Order
            </a>
          </div>
        </div>

      </section>
    </>
  )
}

export default Hero
