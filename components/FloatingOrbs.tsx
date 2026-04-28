"use client";

// Each smiley has a fixed random-ish position, size, speed, and drift
const SMILEYS = [
  { top: "8%",  left: "7%",  size: 38, dur: 9,  delay: 0,    rotate: 12,  color: "#00f5d4" },
  { top: "15%", left: "82%", size: 28, dur: 13, delay: 1.5,  rotate: -8,  color: "#ff3c6e" },
  { top: "32%", left: "4%",  size: 22, dur: 11, delay: 3,    rotate: 20,  color: "#ffc93c" },
  { top: "55%", left: "90%", size: 44, dur: 15, delay: 0.8,  rotate: -15, color: "#a78bfa" },
  { top: "72%", left: "12%", size: 32, dur: 10, delay: 2.2,  rotate: 6,   color: "#00f5d4" },
  { top: "85%", left: "75%", size: 26, dur: 14, delay: 4,    rotate: -22, color: "#ff3c6e" },
  { top: "44%", left: "50%", size: 18, dur: 8,  delay: 1,    rotate: 30,  color: "#ffc93c" },
  { top: "20%", left: "38%", size: 34, dur: 12, delay: 3.5,  rotate: -5,  color: "#ff6b9d" },
  { top: "63%", left: "62%", size: 24, dur: 16, delay: 0.5,  rotate: 18,  color: "#00f5d4" },
  { top: "90%", left: "40%", size: 30, dur: 9,  delay: 2.8,  rotate: -12, color: "#a78bfa" },
  { top: "5%",  left: "55%", size: 20, dur: 11, delay: 1.8,  rotate: 8,   color: "#ffc93c" },
  { top: "78%", left: "28%", size: 42, dur: 13, delay: 0.2,  rotate: -25, color: "#ff3c6e" },
];

function SmileyFace({ color, size }: { color: string; size: number }) {
  const r = size / 2;
  const eyeY = r * 0.35;
  const eyeX = r * 0.32;
  const eyeR = r * 0.1;
  const smileR = r * 0.52;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Face circle */}
      <circle
        cx={r}
        cy={r}
        r={r - 1}
        stroke={color}
        strokeWidth={size > 30 ? 2 : 1.5}
        fill="none"
        opacity={0.9}
      />
      {/* Left eye */}
      <circle cx={r - eyeX} cy={r - eyeY} r={eyeR} fill={color} />
      {/* Right eye */}
      <circle cx={r + eyeX} cy={r - eyeY} r={eyeR} fill={color} />
      {/* Smile arc */}
      <path
        d={`M ${r - smileR * 0.7} ${r + smileR * 0.2} Q ${r} ${r + smileR * 0.75} ${r + smileR * 0.7} ${r + smileR * 0.2}`}
        stroke={color}
        strokeWidth={size > 30 ? 2 : 1.5}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function FloatingOrbs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* ── Big colorful orbs (more vivid than before) ── */}
      <div
        className="orb"
        style={{
          width: 650,
          height: 650,
          top: "-180px",
          left: "-140px",
          background:
            "radial-gradient(circle, rgba(0,245,212,0.28) 0%, rgba(0,200,255,0.12) 40%, transparent 70%)",
          animation: "drift1 14s ease-in-out infinite",
        }}
      />
      <div
        className="orb"
        style={{
          width: 700,
          height: 700,
          bottom: "-200px",
          right: "-150px",
          background:
            "radial-gradient(circle, rgba(255,60,110,0.26) 0%, rgba(167,60,255,0.12) 40%, transparent 70%)",
          animation: "drift2 18s ease-in-out infinite",
        }}
      />
      <div
        className="orb"
        style={{
          width: 420,
          height: 420,
          top: "35%",
          left: "48%",
          background:
            "radial-gradient(circle, rgba(255,201,60,0.2) 0%, rgba(255,100,150,0.1) 50%, transparent 70%)",
          animation: "drift3 22s ease-in-out infinite",
        }}
      />
      {/* Extra purple orb top-right */}
      <div
        className="orb"
        style={{
          width: 380,
          height: 380,
          top: "-60px",
          right: "10%",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.22) 0%, rgba(99,102,241,0.08) 50%, transparent 70%)",
          animation: "drift1 20s ease-in-out infinite reverse",
        }}
      />
      {/* Extra teal orb bottom-left */}
      <div
        className="orb"
        style={{
          width: 340,
          height: 340,
          bottom: "5%",
          left: "5%",
          background:
            "radial-gradient(circle, rgba(0,245,180,0.18) 0%, rgba(0,200,255,0.08) 50%, transparent 70%)",
          animation: "drift2 16s ease-in-out infinite reverse",
        }}
      />

      {/* ── Floating smiley faces ── */}
      {SMILEYS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            opacity: 0.18,
            transform: `rotate(${s.rotate}deg)`,
            animation: `floatSmiley${(i % 3) + 1} ${s.dur}s ease-in-out ${s.delay}s infinite`,
            filter: `drop-shadow(0 0 6px ${s.color}66)`,
          }}
        >
          <SmileyFace color={s.color} size={s.size} />
        </div>
      ))}
    </div>
  );
}
