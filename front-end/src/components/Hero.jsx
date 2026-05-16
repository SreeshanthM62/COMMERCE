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
    fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
    textTransform: 'uppercase', padding: '4px 12px',
    borderRadius: 999,
  }}>{children}</span>
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
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { transform: scale(1.06); }
          to   { transform: scale(1); }
        }
        @keyframes progressBar {
          from { width: 0%; } to { width: 100%; }
        }
        @keyframes badgePop {
          0%   { opacity: 0; transform: scale(0.85) translateY(-6px); }
          60%  { transform: scale(1.04) translateY(0); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes petalFloat {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%     { transform: translateY(-14px) rotate(9deg); }
        }

        .slide-heading-line {
          display: block;
          animation: fadeUp 0.6s ease both;
        }
        .slide-heading-line:nth-child(1) { animation-delay: 0.08s; }
        .slide-heading-line:nth-child(2) { animation-delay: 0.18s; }
        .slide-heading-line:nth-child(3) { animation-delay: 0.28s; }

        /* ─────────────────────────────────────────
           DESKTOP: side-by-side split
           ───────────────────────────────────────── */
        .hero-split {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 75vh;
          max-height: 680px;
          min-height: 460px;
          background: linear-gradient(140deg, #130009 0%, #2b001a 55%, #190010 100%);
          overflow: hidden;
        }

        /* LEFT — text panel */
        .hero-split__left {
          flex: 0 0 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 32px 40px 32px 48px;
          position: relative;
          z-index: 2;
          overflow: hidden;
        }

        /* RIGHT — image panel.
           object-fit: contain so the FULL portrait is always visible, zero cropping.
           Dark bg fills any gap around the image naturally.              */
        .hero-split__right {
          flex: 0 0 50%;
          position: relative;
          overflow: hidden;
          background: #0e0008;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-split__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
          animation: zoomIn 5s ease forwards;
        }

        /* Soft left-edge blend into dark left panel */
        .hero-split__right::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to right, #130009 0%, transparent 18%);
          z-index: 1; pointer-events: none;
        }
        .hero-split__right::after { content: none; }

        /* Thumbnail strip */
        .hero-thumbs {
          position: absolute;
          right: 14px; top: 50%;
          transform: translateY(-50%);
          display: flex; flex-direction: column;
          gap: 8px; z-index: 3;
        }
        .hero-thumb {
          width: 52px; height: 68px;
          border-radius: 8px; overflow: hidden;
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
          display: inline-flex; align-items: center; gap: 8px;
          background: #ff1493; color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600; letter-spacing: 0.05em;
          padding: 11px 26px; border-radius: 999px; border: none;
          cursor: pointer; text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          box-shadow: 0 5px 22px rgba(255,20,147,0.38);
          animation: fadeUp 0.7s 0.48s ease both;
          white-space: nowrap;
        }
        .hero-btn-primary:hover {
          background: #e8017f;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 10px 30px rgba(255,20,147,0.5);
        }
        .hero-btn-ghost {
          display: inline-flex; align-items: center; gap: 7px;
          color: rgba(255,255,255,0.82);
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 500;
          padding: 10px 20px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.26);
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(6px);
          cursor: pointer; text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          animation: fadeUp 0.7s 0.6s ease both;
          white-space: nowrap;
        }
        .hero-btn-ghost:hover {
          background: rgba(255,255,255,0.13);
          border-color: rgba(255,255,255,0.44);
          transform: translateY(-2px);
        }

        /* Dot indicators */
        .hero-dot {
          width: 7px; height: 7px; border-radius: 999px;
          border: 1.5px solid rgba(255,255,255,0.4);
          background: transparent; cursor: pointer; padding: 0;
          transition: background 0.3s, width 0.3s, border-color 0.3s;
        }
        .hero-dot.active { background: #ff1493; width: 22px; border-color: #ff1493; }

        /* Progress bar */
        .progress-track {
          width: 100%; height: 2px;
          background: rgba(255,255,255,0.13);
          border-radius: 2px; overflow: hidden;
        }
        .progress-fill {
          height: 100%; background: #ff1493; border-radius: 2px;
          animation: progressBar 5s linear both;
        }

        /* Bottom controls bar */
        .hero-bar {
          background: rgba(10,0,6,0.92);
          border-top: 1px solid rgba(255,20,147,0.15);
          padding: 10px 48px;
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* ─────────────────────────────────────────
           MOBILE: original full-bleed single image
           with text overlay — exactly like v1
           ───────────────────────────────────────── */
        @media (max-width: 767px) {

          /* Hide the split layout entirely on mobile */
          .hero-split { display: none; }
          .hero-bar   { display: none; }

          /* Show the mobile-only full-bleed slider */
          .hero-mobile { display: block; }
        }

        @media (min-width: 768px) {
          /* Hide mobile slider on desktop */
          .hero-mobile { display: none; }
        }

        /* Mobile slide */
        .mobile-slide {
          position: relative;
          height: 65vh;
          width: 100%;
          overflow: hidden;
        }
        .mobile-slide__img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          animation: zoomIn 5s ease forwards;
        }
        .mobile-slide__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(10,0,6,0.82) 0%,
            rgba(10,0,6,0.38) 50%,
            rgba(10,0,6,0.18) 100%
          );
        }
        .mobile-slide__content {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          text-align: center;
          padding: 0 24px 36px;
        }

        /* Mobile bottom bar */
        .hero-bar--mobile {
          background: rgba(10,0,6,0.92);
          border-top: 1px solid rgba(255,20,147,0.15);
          padding: 10px 22px;
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
      `}</style>

      <section className="hero-section" style={{ fontFamily: "'DM Sans', sans-serif", width: '100%' }}>

        {/* ══════════════════════════════════════════
            DESKTOP — compact split layout
            ══════════════════════════════════════════ */}
        <div className="hero-split">

          {/* LEFT — text */}
          <div className="hero-split__left">

            <Petal style={{
              position: 'absolute', top: 30, right: 24,
              width: 44, opacity: 0.2,
              animation: 'petalFloat 7s ease-in-out infinite',
              pointerEvents: 'none',
            }} />

            {/* Badge */}
            <div key={`badge-${animKey}`}
              style={{ marginBottom: 14, animation: 'badgePop 0.5s ease both' }}>
              <Badge>{slide.badge}</Badge>
            </div>

            {/* Heading — smaller font to match compact height */}
            <h1 key={`h-${animKey}`} style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(30px, 3.8vw, 58px)',
              fontWeight: 700, color: '#fff',
              lineHeight: 1.08, margin: '0 0 14px',
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
              color: 'rgba(255,255,255,0.68)',
              fontSize: 'clamp(12px, 1.1vw, 14px)',
              lineHeight: 1.7, maxWidth: 360,
              margin: '0 0 22px',
              animation: 'fadeUp 0.7s 0.38s ease both',
            }}>
              {slide.sub}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
              <a href="#shop" className="hero-btn-primary">
                {slide.cta}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Stats — compact */}
            <div key={`stats-${animKey}`} style={{
              display: 'flex', gap: 22, marginTop: 26,
              animation: 'fadeUp 0.7s 0.75s ease both',
              flexWrap: 'wrap',
            }}>
              
            </div>
          </div>

          {/* RIGHT — portrait image */}
          <div className="hero-split__right">
            <img
              key={`img-${animKey}`}
              src={slide.image}
              alt={slide.tag}
              className="hero-split__img"
            />
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

        {/* Bottom bar — desktop only */}
        <div className="hero-bar">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 110, flex: 1 }}>
            <div className="progress-track">
              <div key={`prog-${animKey}`} className="progress-fill" />
            </div>
            <div style={{ display: 'flex', gap: 7 }}>
              {slides.map((_, i) => (
                <button key={i}
                  className={`hero-dot${active === i ? ' active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
          }}>
            {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 12, fontStyle: 'italic',
            color: 'rgba(255,255,255,0.38)',
          }}>
            {slide.tag}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            MOBILE — original full-bleed image slider
            with centered text overlay (like v1)
            ══════════════════════════════════════════ */}
        <div className="hero-mobile">
          <div className="mobile-slide">
            <img
              key={`mob-img-${animKey}`}
              src={slide.image}
              alt={slide.tag}
              className="mobile-slide__img"
            />
            <div className="mobile-slide__overlay" />
            <div className="mobile-slide__content">

              {/* Badge */}
              <div key={`mob-badge-${animKey}`}
                style={{ marginBottom: 12, animation: 'badgePop 0.5s ease both' }}>
                <Badge>{slide.badge}</Badge>
              </div>

              {/* Heading */}
              <h1 key={`mob-h-${animKey}`} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(32px, 8vw, 48px)',
                fontWeight: 700, color: '#fff',
                lineHeight: 1.1, margin: '0 0 10px',
                letterSpacing: '-0.01em',
              }}>
                {slide.heading.map((line, i) => (
                  <span key={i} style={{
                    display: 'block',
                    color: i === 1 ? '#ff69b4' : '#fff',
                    animation: `fadeUp 0.6s ${0.08 + i * 0.1}s ease both`,
                  }}>
                    {line}
                  </span>
                ))}
              </h1>

              {/* Sub */}
              <p key={`mob-p-${animKey}`} style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: 13, lineHeight: 1.65,
                margin: '0 0 20px', maxWidth: 300,
                animation: 'fadeUp 0.7s 0.38s ease both',
              }}>
                {slide.sub}
              </p>

              {/* CTA */}
              <a href="#shop" key={`mob-cta-${animKey}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#ff1493', color: '#fff',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, fontWeight: 600, letterSpacing: '0.05em',
                  padding: '11px 26px', borderRadius: 999, textDecoration: 'none',
                  boxShadow: '0 5px 22px rgba(255,20,147,0.4)',
                  animation: 'fadeUp 0.7s 0.5s ease both',
                }}>
                {slide.cta}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Mobile bottom bar */}
          <div className="hero-bar--mobile">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              <div className="progress-track">
                <div key={`mob-prog-${animKey}`} className="progress-fill" />
              </div>
              <div style={{ display: 'flex', gap: 7 }}>
                {slides.map((_, i) => (
                  <button key={i}
                    className={`hero-dot${active === i ? ' active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 12, fontStyle: 'italic',
              color: 'rgba(255,255,255,0.38)',
            }}>
              {slide.tag}
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Hero
