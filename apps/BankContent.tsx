"use client";
import { useState } from "react";

export default function BrowserContent() {
  const [money, setMoney] = useState();

  return (
    <div className="m-4 p-4">
      <h1 className="text-3xl font-bold mb-4 text-black">Bank</h1>

    </div>
  );
}