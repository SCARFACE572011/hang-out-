"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/lib/config";
import ConfettiBlast from "./ConfettiBlast";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const barVariant = (pct: number) => ({
  hidden: { width: "0%" },
  show: {
    width: `${pct}%`,
    transition: { duration: 1.2, ease, delay: 0.6 },
  },
});

export default function YesResponse() {
  const [showItinerary, setShowItinerary] = useState(false);

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-start px-6 py-20 gap-12">
      <ConfettiBlast />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-2xl flex flex-col items-center gap-10"
      >
        {/* MISSION ACCEPTED stamp */}
        <motion.div variants={item} className="flex flex-col items-center gap-3">
          <div className="relative">
            <div
              className="stamp rounded-2xl px-8 py-4 text-center"
              style={{
                border: "2px solid var(--accent)",
                boxShadow:
                  "0 0 40px rgba(0,245,212,0.3), 0 0 80px rgba(0,245,212,0.1), inset 0 0 40px rgba(0,245,212,0.05)",
              }}
            >
              <span
                className="shimmer-text font-display"
                style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)", fontWeight: 800, letterSpacing: "0.08em" }}
              >
                {config.yes.badge}
              </span>
            </div>
            <div className="pulse-ring" style={{ borderRadius: "1rem" }} />
          </div>
        </motion.div>

        {/* Success headline */}
        <motion.div variants={item} className="text-center flex flex-col gap-3">
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2.2rem, 7vw, 4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}
          >
            {config.yes.headline}
          </h2>
          <p className="font-body" style={{ color: "var(--muted)", maxWidth: 380, margin: "0 auto", lineHeight: 1.7 }}>
            {config.yes.subtext}
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div variants={item} className="glass-bright rounded-2xl w-full p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="font-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}>
              Mission Parameters
            </span>
            <span className="font-mono text-accent" style={{ fontSize: "0.6rem", letterSpacing: "0.14em" }}>
              ALL SYSTEMS GO
            </span>
          </div>

          {config.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-body" style={{ fontSize: "0.8rem", color: "var(--text)" }}>
                  {stat.label}
                </span>
                <span className="font-mono text-accent" style={{ fontSize: "0.8rem", fontWeight: 700 }}>
                  {stat.value}{stat.unit}
                </span>
              </div>
              <div
                style={{
                  height: 4,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.06)",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  variants={barVariant(stat.value)}
                  initial="hidden"
                  animate="show"
                  style={{
                    height: "100%",
                    borderRadius: 4,
                    background:
                      stat.value === 0
                        ? "var(--pink)"
                        : "linear-gradient(90deg, var(--accent), #00d4b8)",
                    boxShadow:
                      stat.value === 0
                        ? "0 0 8px rgba(255,60,110,0.6)"
                        : "0 0 8px rgba(0,245,212,0.5)",
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA to reveal hangout ideas */}
        {!showItinerary && (
          <motion.div variants={item}>
            <motion.button
              type="button"
              onClick={() => setShowItinerary(true)}
              className="btn-glow rounded-xl px-10 py-4"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {config.yes.ctaLabel} →
            </motion.button>
          </motion.div>
        )}

        {/* Hangout ideas */}
        {showItinerary && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="w-full flex flex-col gap-4"
          >
            <div className="text-center mb-2">
              <span className="font-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}>
                Possible Itinerary — Eyes Only
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {config.hangoutIdeas.map((idea, i) => (
                <motion.div
                  key={idea.label}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease }}
                  className="glass rounded-2xl p-4 flex flex-col gap-2"
                  style={{
                    border: "1px solid rgba(255,255,255,0.07)",
                    cursor: "default",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  whileHover={{
                    borderColor: "rgba(0,245,212,0.25)",
                    boxShadow: "0 0 20px rgba(0,245,212,0.08)",
                  }}
                >
                  <span style={{ fontSize: "1.8rem" }}>{idea.emoji}</span>
                  <span className="font-body" style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text)" }}>
                    {idea.label}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.55rem",
                      letterSpacing: "0.12em",
                      color: "var(--accent)",
                      opacity: 0.7,
                      textTransform: "uppercase",
                    }}
                  >
                    {idea.tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
