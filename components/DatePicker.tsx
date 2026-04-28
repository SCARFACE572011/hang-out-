"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/lib/config";

interface Props {
  onDatePicked: (date: string) => void;
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function DatePicker({ onDatePicked }: Props) {
  const [selected, setSelected] = useState("");
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = async () => {
    if (!selected || confirming) return;
    setConfirming(true);
    try {
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: "yes", date: selected }),
      });
    } catch {
      // non-blocking — don't fail the UX if tracking fails
    }
    onDatePicked(selected);
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
          <p
            className="font-body"
            style={{ color: "var(--muted)", fontSize: "0.9rem", maxWidth: 340 }}
          >
            Pick a date. We'll make it legendary.
          </p>
        </div>

        {/* Date cards */}
        <div className="grid grid-cols-2 gap-4 w-full">
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
                  background: isSelected
                    ? "rgba(0,245,212,0.1)"
                    : "rgba(255,255,255,0.04)",
                  border: isSelected
                    ? "2px solid var(--accent)"
                    : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: isSelected
                    ? "0 0 28px rgba(0,245,212,0.2), inset 0 0 20px rgba(0,245,212,0.05)"
                    : "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Selected checkmark */}
                {isSelected && (
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
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2 2 4-4"
                        stroke="#07080f"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}

                <span style={{ fontSize: "2rem" }}>📅</span>

                <span
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
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

        {/* Confirm button */}
        <motion.button
          type="button"
          onClick={handleConfirm}
          disabled={!selected || confirming}
          className="btn-glow rounded-xl py-4 px-12"
          style={{
            opacity: !selected || confirming ? 0.4 : 1,
            cursor: !selected || confirming ? "not-allowed" : "pointer",
          }}
          whileHover={selected && !confirming ? { scale: 1.03 } : {}}
          whileTap={selected && !confirming ? { scale: 0.97 } : {}}
        >
          {confirming ? "Locking it in..." : "Lock In The Date →"}
        </motion.button>
      </motion.div>
    </section>
  );
}
