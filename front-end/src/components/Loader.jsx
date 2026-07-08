import React from "react";

export default function Loader({ label = "Wrapping something beautiful for you" }) {
  return (
    <div className="ribbon-wrap">
      <style>{`
        .ribbon-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 26px;
          min-height: 60vh;
          width: 100%;
          padding: 40px 20px;
          background: radial-gradient(120% 100% at 50% 0%, #fff5f8 0%, #ffe4ef 45%, #ffd3e6 100%);
        }

        .ribbon-stage {
          position: relative;
          width: 170px;
          height: 170px;
        }

        .ribbon-halo {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(233,79,157,0.25), rgba(233,79,157,0) 70%);
          animation: rHaloPulse 2.4s ease-in-out infinite;
        }

        @keyframes rHaloPulse {
          0%, 100% { transform: scale(0.88); opacity: 0.55; }
          50%      { transform: scale(1.1); opacity: 1; }
        }

        .ribbon-svg {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 170px;
          height: 170px;
        }

        .bow-loop {
          fill: none;
          stroke-width: 7;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 260;
          animation: drawLoop 2.4s ease-in-out infinite;
        }

        .bow-loop.left  { stroke: #e94f9d; animation-delay: 0s; }
        .bow-loop.right { stroke: #b6266f; animation-delay: 0.15s; }

        @keyframes drawLoop {
          0%   { stroke-dashoffset: 260; opacity: 0.35; }
          45%  { stroke-dashoffset: 0; opacity: 1; }
          80%  { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -260; opacity: 0.35; }
        }

        .bow-tail {
          fill: none;
          stroke-width: 7;
          stroke-linecap: round;
          stroke-dasharray: 90;
          animation: drawTail 2.4s ease-in-out infinite;
        }
        .bow-tail.a { stroke: #f37bb6; animation-delay: 0.3s; }
        .bow-tail.b { stroke: #d4548c; animation-delay: 0.42s; }

        @keyframes drawTail {
          0%   { stroke-dashoffset: 90; opacity: 0; }
          40%  { opacity: 1; }
          60%  { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }

        .bow-knot {
          animation: knotPop 2.4s ease-in-out infinite;
          animation-delay: 0.55s;
          transform-origin: 85px 85px;
          transform-box: fill-box;
        }

        @keyframes knotPop {
          0%, 40%   { transform: scale(0); }
          65%       { transform: scale(1.15); }
          80%, 100% { transform: scale(1); }
        }

        .drift-dot {
          position: absolute;
          border-radius: 50%;
          background: #f090bc;
          opacity: 0;
          animation: dotDrift 2.6s ease-in-out infinite;
        }

        @keyframes dotDrift {
          0%   { opacity: 0; transform: translateY(6px) scale(0.5); }
          25%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(-46px) scale(1); }
        }

        .ribbon-text {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-size: 19px;
          color: #b6266f;
          letter-spacing: 0.2px;
          text-align: center;
          max-width: 300px;
          display: flex;
          justify-content: center;
          align-items: baseline;
          gap: 4px;
          flex-wrap: wrap;
        }

        .ribbon-dots span {
          animation: rDotFade 1.4s ease-in-out infinite;
          opacity: 0;
        }
        .ribbon-dots span:nth-child(1) { animation-delay: 0s; }
        .ribbon-dots span:nth-child(2) { animation-delay: 0.2s; }
        .ribbon-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes rDotFade {
          0%, 100% { opacity: 0; }
          50%      { opacity: 1; }
        }

        .ribbon-sub {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 12px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #d885ac;
          text-align: center;
          margin-top: 4px;
        }

        @media (prefers-reduced-motion: reduce) {
          .ribbon-halo, .bow-loop, .bow-tail, .bow-knot, .drift-dot, .ribbon-dots span {
            animation: none !important;
          }
          .bow-loop, .bow-tail { stroke-dashoffset: 0; opacity: 1; }
          .bow-knot { transform: scale(1); }
        }
      `}</style>

      <div className="ribbon-stage" role="status" aria-label="Loading products">
        <div className="ribbon-halo" />

        <svg className="ribbon-svg" viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
          <path
            className="bow-loop left"
            d="M85,85 C60,60 30,60 22,85 C30,110 60,110 85,85"
          />
          <path
            className="bow-loop right"
            d="M85,85 C110,60 140,60 148,85 C140,110 110,110 85,85"
          />
          <path className="bow-tail a" d="M78,95 C70,112 62,122 56,138" />
          <path className="bow-tail b" d="M92,95 C100,112 108,122 114,138" />
          <ellipse className="bow-knot" cx="85" cy="85" rx="11" ry="14" fill="#93235f" />
        </svg>

        {[
          { top: "6%",  left: "20%", size: 5, delay: "0s" },
          { top: "14%", left: "78%", size: 4, delay: "0.5s" },
          { top: "82%", left: "30%", size: 4, delay: "1s" },
          { top: "76%", left: "70%", size: 6, delay: "0.25s" },
        ].map((s, i) => (
          <div
            key={i}
            className="drift-dot"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
          />
        ))}
      </div>

      <div>
        <p className="ribbon-text">
          {label}
          <span className="ribbon-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </p>
        <p className="ribbon-sub">Twist N Bloom</p>
      </div>
    </div>
  );
}
