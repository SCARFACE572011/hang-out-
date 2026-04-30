"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";

interface Props {
  onDatePicked: (date: string) => void;
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const CUSTOM_VALUE = "__custom__";

function Checkmark() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "var(--accent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 5l2 2 4-4" stroke="#07080f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}

export default function DatePicker({ onDatePicked }: Props) {
  const [selected, setSelected] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [confirming, setConfirming] = useState(false);

  const isCustom = selected === CUSTOM_VALUE;
  const finalDate = isCustom ? customDate : selected;
  const canConfirm = selected && (!isCustom || customDate) && !confirming;

  const handleConfirm = async () => {
    if (!canConfirm) return;
    setConfirming(true);
    try {
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: "yes", date: finalDate }),
      });
    } catch {
      // non-blocking
    }
    onDatePicked(finalDate);
  };

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="w-full max-w-xl flex flex-col items-center gap-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="font-mono text-accent" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            ▸ Step 2 of 2 — Select Your Date
          </span>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2rem, 7vw, 3.4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05 }}
          >
            When works for you?
          </h2>
          <p className="font-body" style={{ color: "var(--muted)", fontSize: "0.9rem", maxWidth: 340 }}>
            Pick one of the suggested dates or choose your own.
          </p>
        </div>

        {/* Date cards */}
        <div className="flex flex-col gap-3 w-full">
          {/* Preset dates */}
          <div className="grid grid-cols-2 gap-3">
            {config.dates.map((date) => {
              const isSelected = selected === date.value;
              return (
                <motion.button
                  key={date.value}
                  type="button"
                  onClick={() => setSelected(date.value)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-center gap-2 rounded-2xl p-6 text-center"
                  style={{
                    background: isSelected ? "rgba(0,245,212,0.1)" : "rgba(255,255,255,0.04)",
                    border: isSelected ? "2px solid var(--accent)" : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: isSelected ? "0 0 28px rgba(0,245,212,0.2), inset 0 0 20px rgba(0,245,212,0.05)" : "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {isSelected && <Checkmark />}
                  <span style={{ fontSize: "2rem" }}>📅</span>
                  <span
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      color: isSelected ? "var(--accent)" : "var(--text)",
                      transition: "color 0.2s",
                    }}
                  >
                    {date.label}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      color: isSelected ? "var(--accent)" : "var(--muted)",
                      textTransform: "uppercase",
                      transition: "color 0.2s",
                      opacity: 0.8,
                    }}
                  >
                    {date.day} · {date.year}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Custom date card */}
          <motion.button
            type="button"
            onClick={() => setSelected(CUSTOM_VALUE)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center gap-4 rounded-2xl px-6 py-5 text-left"
            style={{
              background: isCustom ? "rgba(255,201,60,0.08)" : "rgba(255,255,255,0.04)",
              border: isCustom ? "2px solid var(--gold)" : "1px solid rgba(255,255,255,0.08)",
              boxShadow: isCustom ? "0 0 24px rgba(255,201,60,0.15)" : "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              position: "relative",
            }}
          >
            {isCustom && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "var(--gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="#07080f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}
            <span style={{ fontSize: "1.8rem" }}>✏️</span>
            <div className="flex flex-col gap-0.5">
              <span
                className="font-display"
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: isCustom ? "var(--gold)" : "var(--text)",
                  transition: "color 0.2s",
                }}
              >
                Pick a different date
              </span>
              <span className="font-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--muted)", textTransform: "uppercase" }}>
                Name your date
              </span>
            </div>
          </motion.button>

          {/* Custom date input */}
          <AnimatePresence>
            {isCustom && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease }}
                style={{ overflow: "hidden" }}
              >
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full rounded-xl px-5 py-4"
                  style={{
                    background: "rgba(255,201,60,0.06)",
                    border: "1px solid rgba(255,201,60,0.3)",
                    color: "var(--text)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.9rem",
                    letterSpacing: "0.05em",
                    outline: "none",
                    colorScheme: "dark",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Confirm button */}
        <motion.button
          type="button"
          onClick={handleConfirm}
          disabled={!canConfirm}
          className="btn-glow rounded-xl py-4 px-12"
          style={{
            opacity: canConfirm ? 1 : 0.4,
            cursor: canConfirm ? "pointer" : "not-allowed",
          }}
          whileHover={canConfirm ? { scale: 1.03 } : {}}
          whileTap={canConfirm ? { scale: 0.97 } : {}}
        >
          {confirming ? "Locking it in..." : "Lock In The Date →"}
        </motion.button>
      </motion.div>
    </section>
  );
}
