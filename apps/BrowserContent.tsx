"use client";
import { useState } from "react";

export default function BrowserContent() {
  const [text, setText] = useState("");

  return (
    <div className="m-4 p-4">
      <h1 className="text-3xl font-bold mb-4 text-black">Browser</h1>
      <textarea
        className="w-full h-64 border border-gray-300 rounded p-2 text-black resize-none"
        placeholder="Write something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}