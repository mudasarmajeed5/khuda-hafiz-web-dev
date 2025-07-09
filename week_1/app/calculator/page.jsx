"use client";
import { useState } from "react";

export default function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clear = () => setInput("");
  const calculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
  ];

  const isOperator = (val) => ["/", "*", "-", "+", "="].includes(val);

  return (
    <div className="flex flex-col mt-2 items-center justify-center bg-[var(--color-background)] px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6">
        {/* Display */}
        <input
          type="text"
          value={input}
          className="w-full text-3xl text-right p-4 mb-6 rounded-lg border-2 border-[var(--color-muted)] bg-[var(--color-success)] focus:outline-none"
          readOnly
        />

        <div className="grid grid-cols-4 gap-4">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => (btn === "=" ? calculate() : handleClick(btn))}
              className={`py-4 rounded-xl text-xl  font-semibold shadow-sm transition-colors duration-200
                ${
                  isOperator(btn)
                    ? "bg-[var(--color-primary)] text-black hover:bg-[var(--color-dark)]"
                    : "bg-[var(--color-muted)] text-black hover:bg-[var(--color-primary)]"
                }`}
            >
              {btn}
            </button>
          ))}

          <button
            onClick={clear}
            className="col-span-4 py-4 rounded-xl text-xl font-semibold bg-[var(--color-error)] text-white hover:bg-red-800 transition-colors duration-200 shadow-sm cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
