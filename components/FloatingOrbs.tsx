"use client";

// ── Smiley faces ─────────────────────────────────────────────────
const SMILEYS = [
  { top: "8%",  left: "7%",  size: 38, dur: 9,  delay: 0,   rotate: 12,  color: "#00f5d4", anim: 1 },
  { top: "55%", left: "90%", size: 44, dur: 15, delay: 0.8, rotate: -15, color: "#a78bfa", anim: 2 },
  { top: "72%", left: "12%", size: 32, dur: 10, delay: 2.2, rotate: 6,   color: "#00f5d4", anim: 3 },
  { top: "20%", left: "38%", size: 28, dur: 12, delay: 3.5, rotate: -5,  color: "#ff6b9d", anim: 1 },
  { top: "5%",  left: "55%", size: 20, dur: 11, delay: 1.8, rotate: 8,   color: "#ffc93c", anim: 2 },
];

// ── Cats ─────────────────────────────────────────────────────────
const CATS = [
  { top: "15%", left: "82%", size: 36, dur: 13, delay: 1.5,  rotate: -8,  color: "#ff3c6e", anim: 2 },
  { top: "32%", left: "4%",  size: 28, dur: 11, delay: 3,    rotate: 20,  color: "#ffc93c", anim: 3 },
  { top: "85%", left: "75%", size: 32, dur: 14, delay: 4,    rotate: -22, color: "#ff3c6e", anim: 1 },
  { top: "44%", left: "50%", size: 22, dur: 8,  delay: 1,    rotate: 30,  color: "#a78bfa", anim: 3 },
  { top: "63%", left: "62%", size: 30, dur: 16, delay: 0.5,  rotate: 18,  color: "#00f5d4", anim: 2 },
  { top: "90%", left: "40%", size: 26, dur: 9,  delay: 2.8,  rotate: -12, color: "#a78bfa", anim: 1 },
  { top: "78%", left: "28%", size: 40, dur: 13, delay: 0.2,  rotate: -25, color: "#ff3c6e", anim: 3 },
];

function SmileyFace({ color, size }: { color: string; size: number }) {
  const r = size / 2;
  const eyeY = r * 0.35;
  const eyeX = r * 0.32;
  const eyeR = r * 0.1;
  const smileR = r * 0.52;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={r} cy={r} r={r - 1} stroke={color} strokeWidth={size > 30 ? 2 : 1.5} />
      <circle cx={r - eyeX} cy={r - eyeY} r={eyeR} fill={color} />
      <circle cx={r + eyeX} cy={r - eyeY} r={eyeR} fill={color} />
      <path
        d={`M ${r - smileR * 0.7} ${r + smileR * 0.2} Q ${r} ${r + smileR * 0.75} ${r + smileR * 0.7} ${r + smileR * 0.2}`}
        stroke={color}
        strokeWidth={size > 30 ? 2 : 1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

function CatFace({ color, size }: { color: string; size: number }) {
  const r = size / 2;
  const sw = size > 30 ? 2 : 1.5;

  // Ear points (left ear, right ear — pointy triangles)
  const earH = r * 0.55;
  const earW = r * 0.38;
  const earInset = r * 0.12;

  const leftEar = `${r - earW - earInset},${r * 0.35} ${r - earInset},${r * 0.35 - earH} ${r - earInset + earW * 0.6},${r * 0.35}`;
  const rightEar = `${r + earInset},${r * 0.35} ${r + earInset + earW * 0.4},${r * 0.35 - earH} ${r + earW + earInset},${r * 0.35}`;

  // Eyes — narrow cat slits
  const eyeY = r * 1.05;
  const eyeX = r * 0.32;

  // Nose
  const noseY = r * 1.32;
  const noseSize = r * 0.1;

  // Whiskers
  const whiskY = r * 1.38;
  const whiskLen = r * 0.55;

  // Mouth
  const mouthY = r * 1.48;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {/* Face circle */}
      <circle cx={r} cy={r * 1.1} r={r * 0.88} stroke={color} strokeWidth={sw} />

      {/* Left ear */}
      <polygon points={leftEar} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      {/* Right ear */}
      <polygon points={rightEar} stroke={color} strokeWidth={sw} strokeLinejoin="round" />

      {/* Eyes — almond / slit shape */}
      <ellipse cx={r - eyeX} cy={eyeY} rx={r * 0.13} ry={r * 0.07} fill={color} />
      <ellipse cx={r + eyeX} cy={eyeY} rx={r * 0.13} ry={r * 0.07} fill={color} />

      {/* Nose */}
      <polygon
        points={`${r},${noseY - noseSize} ${r - noseSize * 1.2},${noseY + noseSize * 0.6} ${r + noseSize * 1.2},${noseY + noseSize * 0.6}`}
        fill={color}
        opacity={0.9}
      />

      {/* Whiskers left */}
      <line x1={r - r * 0.18} y1={whiskY} x2={r - r * 0.18 - whiskLen} y2={whiskY - r * 0.06} stroke={color} strokeWidth={sw * 0.6} strokeLinecap="round" />
      <line x1={r - r * 0.18} y1={whiskY + r * 0.08} x2={r - r * 0.18 - whiskLen} y2={whiskY + r * 0.12} stroke={color} strokeWidth={sw * 0.6} strokeLinecap="round" />

      {/* Whiskers right */}
      <line x1={r + r * 0.18} y1={whiskY} x2={r + r * 0.18 + whiskLen} y2={whiskY - r * 0.06} stroke={color} strokeWidth={sw * 0.6} strokeLinecap="round" />
      <line x1={r + r * 0.18} y1={whiskY + r * 0.08} x2={r + r * 0.18 + whiskLen} y2={whiskY + r * 0.12} stroke={color} strokeWidth={sw * 0.6} strokeLinecap="round" />

      {/* Mouth — cute W shape */}
      <path
        d={`M ${r - r * 0.18} ${mouthY} Q ${r - r * 0.09} ${mouthY + r * 0.1} ${r} ${mouthY} Q ${r + r * 0.09} ${mouthY - r * 0.08} ${r + r * 0.18} ${mouthY}`}
        stroke={color}
        strokeWidth={sw * 0.8}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FloatingOrbs() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>

      {/* ── Colorful background orbs ── */}
      <div className="orb" style={{ width: 650, height: 650, top: "-180px", left: "-140px", background: "radial-gradient(circle, rgba(0,245,212,0.28) 0%, rgba(0,200,255,0.12) 40%, transparent 70%)", animation: "drift1 14s ease-in-out infinite" }} />
      <div className="orb" style={{ width: 700, height: 700, bottom: "-200px", right: "-150px", background: "radial-gradient(circle, rgba(255,60,110,0.26) 0%, rgba(167,60,255,0.12) 40%, transparent 70%)", animation: "drift2 18s ease-in-out infinite" }} />
      <div className="orb" style={{ width: 420, height: 420, top: "35%", left: "48%", background: "radial-gradient(circle, rgba(255,201,60,0.2) 0%, rgba(255,100,150,0.1) 50%, transparent 70%)", animation: "drift3 22s ease-in-out infinite" }} />
      <div className="orb" style={{ width: 380, height: 380, top: "-60px", right: "10%", background: "radial-gradient(circle, rgba(167,139,250,0.22) 0%, rgba(99,102,241,0.08) 50%, transparent 70%)", animation: "drift1 20s ease-in-out infinite reverse" }} />
      <div className="orb" style={{ width: 340, height: 340, bottom: "5%", left: "5%", background: "radial-gradient(circle, rgba(0,245,180,0.18) 0%, rgba(0,200,255,0.08) 50%, transparent 70%)", animation: "drift2 16s ease-in-out infinite reverse" }} />

      {/* ── Floating smiley faces ── */}
      {SMILEYS.map((s, i) => (
        <div
          key={`smiley-${i}`}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            opacity: 0.18,
            transform: `rotate(${s.rotate}deg)`,
            animation: `floatSmiley${s.anim} ${s.dur}s ease-in-out ${s.delay}s infinite`,
            filter: `drop-shadow(0 0 6px ${s.color}66)`,
          }}
        >
          <SmileyFace color={s.color} size={s.size} />
        </div>
      ))}

      {/* ── Floating cats ── */}
      {CATS.map((c, i) => (
        <div
          key={`cat-${i}`}
          style={{
            position: "absolute",
            top: c.top,
            left: c.left,
            opacity: 0.2,
            transform: `rotate(${c.rotate}deg)`,
            animation: `floatSmiley${c.anim} ${c.dur}s ease-in-out ${c.delay}s infinite`,
            filter: `drop-shadow(0 0 8px ${c.color}55)`,
          }}
        >
          <CatFace color={c.color} size={c.size} />
        </div>
      ))}
    </div>
  );
}
