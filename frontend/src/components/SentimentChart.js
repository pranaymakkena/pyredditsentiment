import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function SentimentChart({ comments }) {
  const counts = { positive: 0, neutral: 0, negative: 0 };
  comments.forEach(comment => counts[comment.sentiment]++);

  const data = [
    { name: "Positive", value: counts.positive, color: "#22c55e" },
    { name: "Neutral", value: counts.neutral, color: "#3b82f6" },
    { name: "Negative", value: counts.negative, color: "#ef4444" },
  ];

  return (
    <PieChart width={300} height={300}>
      <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
