import { NextRequest, NextResponse } from "next/server";

const calls: Record<string, number[]> = {};

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  calls[ip] = (calls[ip] ?? []).filter(t => now - t < 40_000);
  if (calls[ip].length >= 10) {
    return NextResponse.json({ reply: "Too many requests. Please wait a moment." }, { status: 429 });
  }
  calls[ip].push(now);

  const { messages, systemPrompt } = await req.json(); // no apiKey

  const res = await fetch("https://ai.hackclub.com/proxy/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.HACKCLUB_API_KEY}`,
    },
    body: JSON.stringify({
      model: "qwen/qwen3-32b",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    return NextResponse.json({ reply: `API error (${res.status}): ${errorData.error ?? "Something went wrong"}` });
  }

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content ?? "...";
  return NextResponse.json({ reply });
}