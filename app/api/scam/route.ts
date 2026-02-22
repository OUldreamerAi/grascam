import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages, systemPrompt } = await req.json();

  const apiKey = process.env.NEXT_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ reply: "Server error: API key not configured." });
  }

  const res = await fetch("https://ai.hackclub.com/proxy/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "qwen/qwen3-32b",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    }),
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content ?? "...";
  return NextResponse.json({ reply });
}