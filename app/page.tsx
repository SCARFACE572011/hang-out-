"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FloatingOrbs from "@/components/FloatingOrbs";
import HeroSection from "@/components/HeroSection";
import YesResponse from "@/components/YesResponse";
import NoResponse from "@/components/NoResponse";
import Footer from "@/components/Footer";

type State = "hero" | "yes" | "no";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Home() {
  const [state, setState] = useState<State>("hero");

  const handleAnswer = (answer: "yes" | "no") => setState(answer);
  const handleReset = () => setState("hero");

  return (
    <div className="relative min-h-screen flex flex-col">
      <FloatingOrbs />

      <AnimatePresence mode="wait">
        {state === "hero" && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col flex-1"
          >
            <HeroSection onAnswer={handleAnswer} />
          </motion.div>
        )}

        {state === "yes" && (
          <motion.div
            key="yes"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-col flex-1"
          >
            <YesResponse />
          </motion.div>
        )}

        {state === "no" && (
          <motion.div
            key="no"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-col flex-1"
          >
            <NoResponse onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
