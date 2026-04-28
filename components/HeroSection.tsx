"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { config } from "@/lib/config";
import CustomDropdown from "./CustomDropdown";

interface Props {
  onAnswer: (answer: "yes" | "no") => void;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function HeroSection({ onAnswer }: Props) {
  const [choice, setChoice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [showScanline, setShowScanline] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowScanline(false), 1400);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = () => {
    if (!choice || submitting) return;
    setSubmitting(true);

    if (choice === "yes") {
      // Cycle through loading messages for comedic effect
      let i = 0;
      const msgs = config.yes.loadingMessages;
      const interval = setInterval(() => {
        i++;
        if (i < msgs.length) {
          setLoadingMsg(i);
        } else {
          clearInterval(interval);
          setTimeout(() => onAnswer("yes"), 300);
        }
      }, 600);
    } else {
      setTimeout(() => onAnswer("no"), 500);
    }
  };

  const lines = config.hero.question.split("\n");

  return (
    <>
      {showScanline && <div className="scanline" aria-hidden />}

      <section
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-2xl flex flex-col items-center gap-8"
        >
          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-3">
            <span
              className="font-mono text-accent"
              style={{ fontSize: "0.6rem", letterSpacing: "0.2em", opacity: 0.6 }}
            >
              ▸▸▸
            </span>
            <span
              className="font-mono text-accent"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                opacity: 0.75,
              }}
            >
              {config.hero.eyebrow}
            </span>
            <span
              className="font-mono text-accent"
              style={{ fontSize: "0.6rem", letterSpacing: "0.2em", opacity: 0.6 }}
            >
              ◂◂◂
            </span>
          </motion.div>

          {/* Main card */}
          <motion.div
            variants={item}
            className="glass-bright rounded-3xl w-full overflow-hidden"
          >
            {/* Card header bar */}
            <div
              className="flex items-center gap-2 px-6 py-3 border-b"
              style={{ borderColor: "rgba(0,245,212,0.1)" }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--pink)", opacity: 0.8 }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--gold)", opacity: 0.8 }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)", opacity: 0.8 }} />
              <span
                className="font-mono ml-auto"
                style={{ fontSize: "0.6rem", letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase" }}
              >
                priority-one-invite.exe
              </span>
            </div>

            <div className="px-8 py-12 flex flex-col items-center gap-8">
              {/* Friend name */}
              <div className="flex flex-col items-center gap-1">
                <span
                  className="font-mono"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}
                >
                  Addressed to:
                </span>
                <span
                  className="font-display text-accent"
                  style={{
                    fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {config.friendName}
                </span>
              </div>

              {/* Question */}
              <div className="text-center">
                {lines.map((line, i) => (
                  <h1
                    key={i}
                    className="font-display"
                    style={{
                      fontSize: "clamp(2.6rem, 9vw, 5.2rem)",
                      fontWeight: 800,
                      lineHeight: 0.95,
                      letterSpacing: "-0.04em",
                      color: "var(--text)",
                      display: "block",
                    }}
                  >
                    {i === 0 ? (
                      line
                    ) : (
                      <span className="text-accent">{line}</span>
                    )}
                  </h1>
                ))}
              </div>

              {/* Subtext */}
              <p
                className="font-body text-center"
                style={{
                  maxWidth: 420,
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  lineHeight: 1.7,
                }}
              >
                {config.hero.subtext}
              </p>

              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  height: 1,
                  background: "linear-gradient(90deg, transparent, rgba(0,245,212,0.2), transparent)",
                }}
              />

              {/* Dropdown + button */}
              <div className="w-full max-w-sm flex flex-col gap-4">
                <label
                  className="font-mono"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--muted)", textTransform: "uppercase" }}
                >
                  {config.hero.dropdownLabel}
                </label>

                <CustomDropdown
                  value={choice}
                  onChange={setChoice}
                  disabled={submitting}
                />

                {/* Loading message */}
                {submitting && choice === "yes" && (
                  <motion.p
                    key={loadingMsg}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-center"
                    style={{ fontSize: "0.7rem", color: "var(--accent)", letterSpacing: "0.08em" }}
                  >
                    {config.yes.loadingMessages[loadingMsg]}
                    <span className="cursor" />
                  </motion.p>
                )}

                {submitting && choice === "no" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-center text-pink"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}
                  >
                    Processing your questionable decision...
                  </motion.p>
                )}

                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!choice || submitting}
                  className="btn-glow rounded-xl py-4 w-full"
                  style={{
                    opacity: !choice || submitting ? 0.4 : 1,
                    cursor: !choice || submitting ? "not-allowed" : "pointer",
                  }}
                  whileHover={choice && !submitting ? { scale: 1.02 } : {}}
                  whileTap={choice && !submitting ? { scale: 0.98 } : {}}
                >
                  {submitting ? "Processing..." : config.hero.submitLabel}
                </motion.button>
              </div>

              {/* Tiny disclaimer */}
              <p
                className="font-mono text-center"
                style={{ fontSize: "0.55rem", color: "var(--muted)", opacity: 0.5, letterSpacing: "0.08em" }}
              >
                * By selecting an option you agree that this hangout is a great idea.
              </p>
            </div>
          </motion.div>

          {/* Decorative floating elements */}
          <motion.div
            variants={item}
            className="flex items-center gap-6"
            style={{ opacity: 0.35 }}
          >
            {["[ENCRYPTED]", "v2.0.1", "PRIORITY:HIGH", "[VERIFIED]"].map((t) => (
              <span key={t} className="font-mono" style={{ fontSize: "0.55rem", letterSpacing: "0.14em", color: "var(--muted)" }}>
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
