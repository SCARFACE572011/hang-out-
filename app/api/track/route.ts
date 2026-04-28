import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) {
    return NextResponse.json({ ok: false, error: "NTFY_TOPIC not set" }, { status: 500 });
  }

  const { answer, date } = await req.json();

  const isYes = answer === "yes";
  // Headers must be ASCII-only — no emojis
  const title = isYes ? "SASHA SAID YES!" : "Sasha said no";
  const message = isYes
    ? `✅ She's in for ${date} 🎉 Time to lock it in!`
    : "❌ She said no. Snack bribe pending.";
  const priority = isYes ? "high" : "default";
  const tags = isYes ? ["tada", "calendar"] : ["shrug"];

  const res = await fetch(`https://ntfy.sh/${topic}`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
      Title: title,
      Priority: priority,
      Tags: tags.join(","),
    },
    body: message,
  });

  if (!res.ok) {
    console.error("ntfy error:", res.status, await res.text());
  }

  return NextResponse.json({ ok: true });
}
