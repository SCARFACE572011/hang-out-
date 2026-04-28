// ============================================================
//  CUSTOMIZE EVERYTHING HERE
// ============================================================

export const config = {
  // Your friend's name
  friendName: "Sasha",

  // Hero section
  hero: {
    eyebrow: "⚡ PRIORITY ONE — CLASSIFIED TRANSMISSION",
    question: "do you want\nto hang out?",
    subtext:
      "This invitation was hand-crafted, stress-tested, and cleared by a small team of professionals.\nYour answer will be recorded.",
    dropdownLabel: "Make your selection",
    submitLabel: "Confirm Your Fate",
  },

  // What happens on YES
  yes: {
    loadingMessages: [
      "Verifying friendship credentials...",
      "Calculating fun potential...",
      "Syncing vibes database...",
      "Mission briefing prepared...",
    ],
    badge: "MISSION ACCEPTED",
    headline: "Let's gooo 🎉",
    subtext:
      "Excellent choice. Your taste remains impeccable. Initiating hangout protocol.",
    ctaLabel: "View The Itinerary",
  },

  // What happens on NO
  no: {
    responses: [
      "Interesting. Bold choice. Respect.",
      "That seems statistically incorrect.",
      "We have noted your answer. Our lawyers have too.",
      "Bold. Wrong. But bold.",
      "Error 404: Good Reason Not Found.",
      "The audacity. The nerve. The gall.",
      "This will be added to your permanent record.",
    ],
    followUp: "...Are you absolutely sure though?",
    subtext: "Snacks could be involved. Just saying.",
  },

  // Hangout ideas shown after YES
  hangoutIdeas: [
    { emoji: "🍜", label: "Ramen run", tag: "HIGH PRIORITY" },
    { emoji: "🎮", label: "Arcade battle", tag: "CLASSIFIED" },
    { emoji: "☕", label: "Coffee & chaos", tag: "ROUTINE" },
    { emoji: "🎬", label: "Movie marathon", tag: "LOW EFFORT" },
    { emoji: "🛻", label: "Late night drive", tag: "RECOMMENDED" },
    { emoji: "🧋", label: "Boba & bad decisions", tag: "FUN" },
  ],

  // Fun stats
  stats: [
    { label: "Vibe Index", value: 100, unit: "%" },
    { label: "Boredom Prevention", value: 98, unit: "%" },
    { label: "Fun Potential", value: 99.9, unit: "%" },
    { label: "Regret Probability", value: 0, unit: "%" },
  ],

  // Hangout date options shown after YES
  dates: [
    { label: "April 29", day: "Tuesday", year: "2026", value: "4/29/26" },
    { label: "May 6",    day: "Wednesday", year: "2026", value: "5/06/26" },
  ],

  // Footer
  footer: {
    line1: "This invite was crafted with unnecessary dedication.",
    line2: "No AI was harmed. Several humans lost sleep.",
  },

  // Colors — change these to retheme the whole site
  // (also edit globals.css if you want deeper control)
  theme: {
    accent: "#00f5d4",     // cyan
    accentAlt: "#ff3c6e",  // pink
    gold: "#ffc93c",
  },
} as const;
