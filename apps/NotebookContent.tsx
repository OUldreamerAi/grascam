"use client";
import { useState } from "react";
import { notes, setNotes } from "@/lib/state";

export default function NotebookContent() {
  const [text, setText] = useState(notes);

  function handleChange(e: React.ChangeEventz<HTMLTextAreaElement>) {
    setNotes(e.target.value);
    setText(e.target.value);
  }

  return (
    <div className="m-4 p-4">
      <h1 className="text-3xl font-bold mb-4 text-black">Notebook</h1>
      <textarea
        className="w-full h-64 border border-gray-300 rounded p-2 text-black resize-none"
        placeholder="Write something..."
        value={text}
        onChange={handleChange}
      />
    </div>
  );
}