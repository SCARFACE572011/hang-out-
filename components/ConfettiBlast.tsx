"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiBlast() {
  useEffect(() => {
    const colors = ["#00f5d4", "#ff3c6e", "#ffc93c", "#ffffff", "#a78bfa"];

    // Initial burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.55 },
      colors,
      ticks: 300,
      gravity: 0.8,
      scalar: 1.1,
    });

    // Side cannons
    const timer1 = setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
        ticks: 250,
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
        ticks: 250,
      });
    }, 300);

    // Final shower
    const timer2 = setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.3 },
        colors,
        ticks: 200,
        gravity: 1.2,
        scalar: 0.8,
      });
    }, 700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return null;
}
