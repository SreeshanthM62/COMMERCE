import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'

// ─── Floating petal (decorative) ─────────────────────────────────────────
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

// ─── Product card ─────────────────────────────────────────────────────────
const ProductCard = ({ icon, label, delay }) => (
  <div
    style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.13)',
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
      e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
    }}
  >
    <span style={{ fontSize: 26 }}>{icon}</span>
    <span style={{ color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textAlign: 'center' }}>
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
    tag: 'BOUQUETS',
  },
  {
    image: assets.pot_hero,
    badge: '🪴 New Arrivals',
    heading: ['Tiny Gardens,', 'Big Joy,', 'Forever Yours'],
    sub: 'Mini flower pots that bring lasting elegance to any space — no watering needed.',
    cta: 'Shop Pots',
    tag: 'MINI POTS',
  },
  {
    image: assets.keychain_hero,
    badge: '🔑 Fan Favourite',
    heading: ['Carry a', 'Little Bloom,', 'Everywhere'],
    sub: 'Adorable handmade keychains that keep florals close wherever you go.',
    cta: 'Shop Keychains',
    tag: 'KEYCHAINS',
  },
]

const products = [
  { icon: '💐', label: 'Bouquets' },
  { icon: '🪴', label: 'Mini Pots' },
  { icon: '🔑', label: 'Keychains' },
  { icon: '🌸', label: 'Loose Flowers' },
  { icon: '🧲', label: 'Fridge Magnets' },
  { icon: '💌', label: 'Flower Cards' },
  { icon: '✨', label: 'Custom Orders' },
]

// ─── Main Hero ────────────────────────────────────────────────────────────
const Hero = () => {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % slides.length)
      setAnimKey(k => k + 1)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const goTo = i => { setActive(i); setAnimKey(k => k + 1) }
  const slide = slides[active]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .hero-section * { box-sizing: border-box; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { transform: scale(1.07); }
          to   { transform: scale(1); }
        }
        @keyframes progressBar {
          from { width: 0%; } to { width: 100%; }
        }
        @keyframes badgePop {
          0%   { opacity: 0; transform: scale(0.8) translateY(-8px); }
          60%  { transform: scale(1.05) translateY(0); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes petalFloat {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%     { transform: translateY(-18px) rotate(10deg); }
        }

        .slide-heading-line {
          display: block;
          animation: fadeUp 0.65s ease both;
        }
        .slide-heading-line:nth-child(1) { animation-delay: 0.08s; }
        .slide-heading-line:nth-child(2) { animation-delay: 0.2s; }
        .slide-heading-line:nth-child(3) { animation-delay: 0.32s; }

        /* ── SPLIT LAYOUT (desktop) ── */
        .hero-split {
          display: flex;
          flex-direction: row;
          width: 100%;
          /*
           * Height is driven by the RIGHT panel's image.
           * We clamp it so it never gets too tall or too short.
           */
          min-height: min(88vh, 780px);
          background: linear-gradient(140deg, #130009 0%, #2b001a 55%, #190010 100%);
          overflow: hidden;
        }

        /* LEFT — text, fills available height */
        .hero-split__left {
          flex: 0 0 52%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(40px, 6vw, 88px) clamp(32px, 5vw, 72px);
          position: relative;
          z-index: 2;
        }

        /* RIGHT — image panel */
        .hero-split__right {
          flex: 0 0 48%;
          position: relative;
          overflow: hidden;
          /*
           * KEY FIX: portrait images need a tall container.
           * We set a min-height so short screens still look good.
           */
          min-height: 500px;
        }

        /*
         * KEY FIX for portrait images:
         * object-fit: cover + object-position: center top
         * shows the top portion of the portrait (flowers/bouquet focus area).
         * The right panel is tall enough (min-height: 500px) that most of the
         * portrait is visible without aggressive cropping.
         *
         * If you want ZERO cropping: change object-fit to 'contain' and
         * set background: #190010 on .hero-split__right
         */
        .hero-split__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          animation: zoomIn 5s ease forwards;
        }

        /* Soft left-edge blend into the dark left panel */
        .hero-split__right::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #190010 0%, transparent 20%);
          z-index: 1;
          pointer-events: none;
        }
        /* Light tint over image */
        .hero-split__right::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(15, 0, 10, 0.16);
          z-index: 1;
          pointer-events: none;
        }

        /* Thumbnail strip inside right panel */
        .hero-thumbs {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 3;
        }
        .hero-thumb {
          width: 60px; height: 80px;
          border-radius: 10px; overflow: hidden;
          cursor: pointer; border: 2px solid transparent;
          flex-shrink: 0; padding: 0; background: none;
          transition: border-color 0.3s, transform 0.3s;
        }
        .hero-thumb.active { border-color: #ff1493; transform: scale(1.08); }
        .hero-thumb img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
        }

        /* CTA buttons */
        .hero-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: #ff1493; color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600; letter-spacing: 0.06em;
          padding: 14px 34px; border-radius: 999px; border: none;
          cursor: pointer; text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          box-shadow: 0 6px 28px rgba(255,20,147,0.4);
          animation: fadeUp 0.7s 0.5s ease both;
        }
        .hero-btn-primary:hover {
          background: #e8017f;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 12px 36px rgba(255,20,147,0.5);
        }
        .hero-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.82);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 500;
          padding: 13px 26px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(6px);
          cursor: pointer; text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          animation: fadeUp 0.7s 0.65s ease both;
        }
        .hero-btn-ghost:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.48);
          transform: translateY(-2px);
        }

        /* Dot indicators */
        .hero-dot {
          width: 8px; height: 8px; border-radius: 999px;
          border: 1.5px solid rgba(255,255,255,0.45);
          background: transparent; cursor: pointer; padding: 0;
          transition: background 0.3s, width 0.3s, border-color 0.3s;
        }
        .hero-dot.active { background: #ff1493; width: 26px; border-color: #ff1493; }

        /* Progress bar */
        .progress-track {
          width: 100%; height: 2px;
          background: rgba(255,255,255,0.14);
          border-radius: 2px; overflow: hidden;
        }
        .progress-fill {
          height: 100%; background: #ff1493; border-radius: 2px;
          animation: progressBar 5s linear both;
        }

        /* Bottom controls bar */
        .hero-bar {
          background: rgba(10,0,6,0.92);
          border-top: 1px solid rgba(255,20,147,0.16);
          padding: 14px clamp(32px,5vw,72px);
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 20px; flex-wrap: wrap;
        }

        /* Product strip */
        .product-strip {
          background: linear-gradient(135deg, #180010 0%, #280018 100%);
          border-top: 1px solid rgba(255,20,147,0.18);
        }

        /* ── MOBILE ── */
        @media (max-width: 767px) {
          .hero-split {
            flex-direction: column;
            min-height: unset;
          }
          /* Image on top at a portrait-friendly aspect ratio */
          .hero-split__right {
            flex: none;
            order: 1;
            width: 100%;
            /* 3:4 ratio suits portrait photos perfectly on mobile */
            aspect-ratio: 3 / 4;
            min-height: unset;
            max-height: 85vw;
          }
          .hero-split__right::before {
            background: linear-gradient(to top, #190010 0%, transparent 30%);
          }
          .hero-split__left {
            flex: none;
            order: 2;
            padding: 28px 22px 30px;
          }
          .hero-thumbs { display: none; }
          .hero-bar { padding: 12px 22px; }
        }

        /* ── LARGE SCREENS ── */
        @media (min-width: 1280px) {
          .hero-split { min-height: min(88vh, 860px); }
        }
      `}</style>

      <section className="hero-section" style={{ fontFamily: "'DM Sans', sans-serif", width: '100%' }}>

        {/* ── SPLIT HERO ── */}
        <div className="hero-split">

          {/* LEFT — text content */}
          <div className="hero-split__left">

            {/* Decorative floating petal */}
            <Petal style={{
              position: 'absolute', top: 48, right: 32,
              width: 52, opacity: 0.22,
              animation: 'petalFloat 7s ease-in-out infinite',
              pointerEvents: 'none',
            }} />

            {/* Badge */}
            <div key={`badge-${animKey}`}
              style={{ marginBottom: 22, animation: 'badgePop 0.5s ease both' }}>
              <Badge>{slide.badge}</Badge>
            </div>

            {/* Heading */}
            <h1 key={`h-${animKey}`} style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(38px, 5vw, 80px)',
              fontWeight: 700, color: '#fff',
              lineHeight: 1.06, margin: '0 0 20px',
              letterSpacing: '-0.01em',
            }}>
              {slide.heading.map((line, i) => (
                <span className="slide-heading-line" key={i}
                  style={{ color: i === 1 ? '#ff69b4' : '#fff' }}>
                  {line}
                </span>
              ))}
            </h1>

            {/* Sub */}
            <p key={`p-${animKey}`} style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 'clamp(14px, 1.3vw, 16px)',
              lineHeight: 1.75, maxWidth: 400,
              margin: '0 0 32px',
              animation: 'fadeUp 0.7s 0.4s ease both',
            }}>
              {slide.sub}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
              <a href="#shop" className="hero-btn-primary">
                {slide.cta}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#customize" className="hero-btn-ghost">✨ Customise Yours</a>
            </div>

            {/* Stats */}
            <div key={`stats-${animKey}`} style={{
              display: 'flex', gap: 28, marginTop: 42,
              animation: 'fadeUp 0.7s 0.8s ease both',
              flexWrap: 'wrap',
            }}>
              {[['500+', 'Happy Customers'], ['100%', 'Handmade'], ['7+', 'Collections']].map(([n, l]) => (
                <div key={l}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 26, fontWeight: 700, color: '#ff69b4',
                  }}>{n}</div>
                  <div style={{
                    fontSize: 11, color: 'rgba(255,255,255,0.52)',
                    letterSpacing: '0.06em', marginTop: 2,
                  }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — portrait image shown fully */}
          <div className="hero-split__right">
            <img
              key={`img-${animKey}`}
              src={slide.image}
              alt={slide.tag}
              className="hero-split__img"
            />
            {/* Thumbnail nav */}
            <div className="hero-thumbs">
              {slides.map((s, i) => (
                <button
                  key={i}
                  className={`hero-thumb${active === i ? ' active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`View ${s.tag}`}
                >
                  <img src={s.image} alt={s.tag} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM CONTROLS BAR ── */}
        <div className="hero-bar">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 120, flex: 1 }}>
            <div className="progress-track">
              <div key={`prog-${animKey}`} className="progress-fill" />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`hero-dot${active === i ? ' active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.38)',
          }}>
            {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 13, fontStyle: 'italic',
            color: 'rgba(255,255,255,0.42)',
          }}>
            {slide.tag}
          </div>
        </div>

        {/* ── PRODUCT STRIP ── */}
        <div className="product-strip">
          <div style={{ textAlign: 'center', padding: '26px 24px 10px' }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(255,105,180,0.65)',
            }}>
              Explore Our Collections
            </span>
          </div>

          <div style={{
            display: 'flex', justifyContent: 'center',
            flexWrap: 'wrap', gap: 12,
            padding: '12px 24px 26px',
          }}>
            {products.map((p, i) => (
              <ProductCard key={p.label} {...p} delay={0.05 * i} />
            ))}
          </div>

          {/* Custom order banner */}
          <div style={{
            margin: '0 24px 28px',
            background: 'linear-gradient(110deg, rgba(255,20,147,0.13), rgba(255,105,180,0.06))',
            border: '1px solid rgba(255,20,147,0.28)',
            borderRadius: 18, padding: '18px 26px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16,
          }}>
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 21, fontWeight: 700, color: '#fff', lineHeight: 1.2,
              }}>
                Want Something <em style={{ color: '#ff69b4' }}>Truly Unique?</em>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 5 }}>
                Send us your idea — we'll handcraft it just for you.
              </div>
            </div>
            <a
              href="#customize"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#ff1493', color: '#fff',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, fontWeight: 600, letterSpacing: '0.05em',
                padding: '12px 24px', borderRadius: 999, textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(255,20,147,0.32)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,20,147,0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,20,147,0.32)'
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
