import React from "react";

export default function SentimentFilter({ setFilter }) {
  return (
    <div className="mt-4">
      <button onClick={() => setFilter("all")} className="mx-2 bg-gray-300 px-4 py-2 rounded">All</button>
      <button onClick={() => setFilter("positive")} className="mx-2 bg-green-400 px-4 py-2 rounded">Positive</button>
      <button onClick={() => setFilter("neutral")} className="mx-2 bg-blue-400 px-4 py-2 rounded">Neutral</button>
      <button onClick={() => setFilter("negative")} className="mx-2 bg-red-400 px-4 py-2 rounded">Negative</button>
    </div>
  );
}
