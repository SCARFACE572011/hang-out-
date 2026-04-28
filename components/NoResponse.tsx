"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";

const ease22 = [0.22, 1, 0.36, 1] as [number, number, number, number];
const easeBounce = [0.175, 0.885, 0.32, 1.275] as [number, number, number, number];

interface Props {
  onReset: () => void;
}

export default function NoResponse({ onReset }: Props) {
  const [msg, setMsg] = useState("");
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [glitching, setGlitching] = useState(true);

  useEffect(() => {
    // Pick a random funny response
    const responses = config.no.responses;
    setMsg(responses[Math.floor(Math.random() * responses.length)]);

    const t1 = setTimeout(() => setGlitching(false), 800);
    const t2 = setTimeout(() => setShowFollowUp(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20 gap-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl flex flex-col items-center gap-8"
      >
        {/* Error badge */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: easeBounce }}
          className="relative"
        >
          <div
            className="rounded-2xl px-8 py-4 text-center"
            style={{
              border: "2px solid var(--pink)",
              boxShadow:
                "0 0 40px rgba(255,60,110,0.25), 0 0 80px rgba(255,60,110,0.08), inset 0 0 30px rgba(255,60,110,0.04)",
            }}
          >
            <span
              className="font-display text-pink"
              style={{ fontSize: "clamp(1.2rem, 4vw, 1.6rem)", fontWeight: 800, letterSpacing: "0.1em" }}
            >
              ERROR 404
            </span>
          </div>
        </motion.div>

        {/* Funny response */}
        <div className="text-center flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: ease22 }}
            className="relative"
          >
            {/* Glitch layers */}
            {glitching && (
              <>
                <span
                  aria-hidden
                  className="font-display absolute inset-0 text-center"
                  style={{
                    fontSize: "clamp(1.8rem, 6vw, 3rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "var(--accent)",
                    animation: "glitch1 0.15s steps(1) infinite",
                  }}
                >
                  {msg}
                </span>
                <span
                  aria-hidden
                  className="font-display absolute inset-0 text-center"
                  style={{
                    fontSize: "clamp(1.8rem, 6vw, 3rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "var(--pink)",
                    animation: "glitch2 0.2s steps(1) infinite",
                  }}
                >
                  {msg}
                </span>
              </>
            )}
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.8rem, 6vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                position: "relative",
              }}
            >
              {msg}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="font-body"
            style={{ color: "var(--muted)", fontSize: "0.95rem" }}
          >
            Your choice has been noted. Our records are updated.
          </motion.p>
        </div>

        {/* Follow-up card */}
        <AnimatePresence>
          {showFollowUp && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: ease22 }}
              className="glass-bright rounded-2xl w-full p-8 flex flex-col items-center gap-6 text-center"
              style={{ borderColor: "rgba(255,60,110,0.3)" }}
            >
              <span style={{ fontSize: "2.5rem" }}>🤔</span>

              <div className="flex flex-col gap-2">
                <h3
                  className="font-display"
                  style={{ fontSize: "clamp(1.3rem, 4vw, 1.8rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
                >
                  {config.no.followUp}
                </h3>
                <p
                  className="font-body"
                  style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7 }}
                >
                  {config.no.subtext}
                </p>
              </div>

              {/* Snack bribe visual */}
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-xl"
                style={{ background: "rgba(255,201,60,0.08)", border: "1px solid rgba(255,201,60,0.2)" }}
              >
                <span style={{ fontSize: "1.2rem" }}>🍟</span>
                <span className="font-mono text-gold" style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>
                  Snack incentive: PENDING
                </span>
              </div>

              <div className="flex gap-3 flex-wrap justify-center">
                <motion.button
                  type="button"
                  onClick={onReset}
                  className="btn-glow rounded-xl px-8 py-3"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Actually wait, YES →
                </motion.button>
                <motion.button
                  type="button"
                  onClick={onReset}
                  className="btn-glow btn-pink rounded-xl px-8 py-3"
                  style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "var(--muted)" }}
                  whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)", color: "var(--text)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Try again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
