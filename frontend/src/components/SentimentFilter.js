import React from "react";

export default function SentimentFilter({ setFilter }) {
  return (
    <div className="mt-4 w-full flex flex-wrap justify-center gap-2">
      {["all", "positive", "neutral", "negative"].map((type) => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
}
