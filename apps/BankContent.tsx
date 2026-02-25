"use client";
import { useState, useEffect } from "react";
import { money } from "@/lib/state";

export default function BankContent() {
  const [balance, setBalance] = useState(money);

  useEffect(() => {
    setBalance(money);
  }, []);

  return (
    <div className="m-4 p-4 text-black">
      <div className="bg-green-50 border-2 border-green-400 rounded p-4 mb-4">
        <h1 className="text-2xl font-bold text-green-800">ScamBank™</h1>
        <p className="text-xs text-green-600">Your offshore account — 100% untraceable</p>
      </div>

      <div className="border-2 border-gray-200 rounded-xl p-6 bg-white shadow text-center mb-4">
        <p className="text-gray-400 text-sm mb-1">Current Balance</p>
        <p className="text-5xl font-bold text-green-600">{balance}€</p>
        <p className="text-xs text-gray-400 mt-2">Updated from scam earnings</p>
      </div>

    </div>
  );
}