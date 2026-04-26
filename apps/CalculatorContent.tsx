"use client";
import { useState } from "react";

export default function CalculatorContent() {
  const [display, setDisplay] = useState("0");

  function appendNumber(num: string) {
    setDisplay((prev) => prev === "0" ? num : prev + num);
  }

  function appendOperation(op: string) {
    setDisplay((prev) => prev + op);
  }

  function clearDisplay() {
    setDisplay("0");
  }

  function calculate() {
    try {
      const result = eval(display);
      setDisplay(String(result));
    } catch {
      setDisplay("Error");
    }
  }

  return (
    <div className="p-4 flex flex-col items-center gap-3" style={{ fontFamily: "var(--font-myfont)" }}>
      <input type="text" disabled value={display}
        className="w-full border-2 border-gray-300 rounded p-3 text-right text-2xl font-mono text-black bg-gray-50" />

      <div className="grid grid-cols-4 gap-2 w-full">
        <button onClick={clearDisplay}              className="col-span-2 bg-red-400 hover:bg-red-500 text-white rounded p-3 font-bold">C</button>
        <button onClick={() => appendOperation('/')} className="bg-orange-400 hover:bg-orange-500 text-white rounded p-3 font-bold">/</button>
        <button onClick={() => appendOperation('*')} className="bg-orange-400 hover:bg-orange-500 text-white rounded p-3 font-bold">*</button>

        <button onClick={() => appendNumber('7')}   className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">7</button>
        <button onClick={() => appendNumber('8')}   className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">8</button>
        <button onClick={() => appendNumber('9')}   className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">9</button>
        <button onClick={() => appendOperation('-')} className="bg-orange-400 hover:bg-orange-500 text-white rounded p-3 font-bold">-</button>

        <button onClick={() => appendNumber('4')}   className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">4</button>
        <button onClick={() => appendNumber('5')}   className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">5</button>
        <button onClick={() => appendNumber('6')}   className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">6</button>
        <button onClick={() => appendOperation('+')} className="bg-orange-400 hover:bg-orange-500 text-white rounded p-3 font-bold">+</button>

        <button onClick={() => appendNumber('1')}   className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">1</button>
        <button onClick={() => appendNumber('2')}   className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">2</button>
        <button onClick={() => appendNumber('3')}   className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">3</button>
        <button onClick={() => appendNumber('0')}   className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">0</button>

        <button onClick={calculate} className="col-span-4 bg-blue-500 hover:bg-blue-600 text-white rounded p-3 font-bold text-xl">=</button>
      </div>
    </div>
  );
}