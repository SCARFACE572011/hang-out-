"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Option = { value: string; label: string; icon: string; flavor: string };

const OPTIONS: Option[] = [
  { value: "", label: "— Make your selection —", icon: "", flavor: "" },
  {
    value: "yes",
    label: "Yes",
    icon: "✦",
    flavor: "Obviously the correct answer",
  },
  {
    value: "no",
    label: "No",
    icon: "✕",
    flavor: "Bold. Questionable. But okay.",
  },
];

interface Props {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}

export default function CustomDropdown({ value, onChange, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (opt: Option) => {
    if (!opt.value) return;
    onChange(opt.value);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full select-none" style={{ zIndex: 10 }}>
      {/* Trigger */}
      <motion.button
        type="button"
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.01 }}
        whileTap={{ scale: disabled ? 1 : 0.99 }}
        onClick={() => !disabled && setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-xl text-left"
        style={{
          background: value
            ? "rgba(0,245,212,0.07)"
            : "rgba(255,255,255,0.04)",
          border: value
            ? "1px solid rgba(0,245,212,0.4)"
            : "1px solid rgba(255,255,255,0.1)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          letterSpacing: "0.04em",
          color: value ? "var(--accent)" : "var(--muted)",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          boxShadow: value
            ? "0 0 0 1px rgba(0,245,212,0.1), 0 0 20px rgba(0,245,212,0.08)"
            : "none",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <span className="flex items-center gap-3">
          {selected.icon && (
            <span
              className="text-accent"
              style={{ fontSize: "0.7rem", opacity: 0.7 }}
            >
              {selected.icon}
            </span>
          )}
          <span>{selected.label}</span>
        </span>

        {/* Chevron */}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{ flexShrink: 0, color: "var(--muted)" }}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 mt-2 rounded-xl overflow-hidden"
            style={{
              background: "rgba(10,11,20,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(24px)",
              boxShadow:
                "0 4px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,245,212,0.08)",
            }}
          >
            {OPTIONS.filter((o) => o.value).map((opt) => (
              <motion.button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt)}
                whileHover={{
                  backgroundColor:
                    opt.value === "yes"
                      ? "rgba(0,245,212,0.1)"
                      : "rgba(255,60,110,0.1)",
                }}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  letterSpacing: "0.04em",
                  color:
                    opt.value === "yes" ? "var(--accent)" : "var(--pink)",
                  borderBottom:
                    opt.value === "yes"
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "none",
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  transition: "background 0.15s ease",
                }}
              >
                <span className="flex items-center gap-3">
                  <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>
                    {opt.icon}
                  </span>
                  <span style={{ fontWeight: 700 }}>{opt.label}</span>
                </span>
                <span
                  style={{
                    fontSize: "0.65rem",
                    opacity: 0.5,
                    fontStyle: "italic",
                    fontFamily: "var(--font-body)",
                    letterSpacing: "0",
                  }}
                >
                  {opt.flavor}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
