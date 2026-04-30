"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onDatePicked: (date: string) => void;
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function DatePicker({ onDatePicked }: Props) {
  const [customDate, setCustomDate] = useState("");
  const [confirming, setConfirming] = useState(false);

  const canConfirm = !!customDate && !confirming;

  const handleConfirm = async () => {
    if (!canConfirm) return;
    setConfirming(true);
    try {
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: "yes", date: customDate }),
      });
    } catch {
      // non-blocking
    }
    onDatePicked(customDate);
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
          <span
            className="font-mono text-accent"
            style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
          >
            ▸ Step 2 of 2 — Select Your Date
          </span>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 7vw, 3.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            When works for you?
          </h2>
          <p className="font-body" style={{ color: "var(--muted)", fontSize: "0.9rem", maxWidth: 340 }}>
            Pick a date. We'll make it legendary.
          </p>
        </div>

        {/* Custom date card */}
        <div className="glass-bright rounded-2xl w-full p-8 flex flex-col items-center gap-6">
          <div
            className="rounded-xl p-5"
            style={{
              background: "rgba(0,245,212,0.06)",
              border: "1px solid rgba(0,245,212,0.2)",
            }}
          >
            <span style={{ fontSize: "2.4rem" }}>📅</span>
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <span
              className="font-mono"
              style={{ fontSize: "0.6rem", letterSpacing: "0.18em", color: "var(--muted)", textTransform: "uppercase" }}
            >
              Choose Your Date
            </span>
            <span className="font-body" style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
              Any day. Any time. We're flexible.
            </span>
          </div>

          <input
            type="date"
            value={customDate}
            onChange={(e) => setCustomDate(e.target.value)}
            className="w-full rounded-xl px-5 py-4 text-center"
            style={{
              background: customDate ? "rgba(0,245,212,0.08)" : "rgba(255,255,255,0.04)",
              border: customDate
                ? "1px solid rgba(0,245,212,0.4)"
                : "1px solid rgba(255,255,255,0.1)",
              color: customDate ? "var(--accent)" : "var(--text)",
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              letterSpacing: "0.05em",
              outline: "none",
              colorScheme: "dark",
              transition: "all 0.2s ease",
              boxShadow: customDate ? "0 0 20px rgba(0,245,212,0.1)" : "none",
            }}
          />
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
