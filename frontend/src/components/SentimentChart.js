import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function SentimentChart({ comments }) {
  const sentimentCounts = comments.reduce(
    (acc, comment) => {
      acc[comment.sentiment]++;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );

  const data = [
    { name: "Positive", value: sentimentCounts.positive, color: "#34D399" },
    { name: "Neutral", value: sentimentCounts.neutral, color: "#FBBF24" },
    { name: "Negative", value: sentimentCounts.negative, color: "#EF4444" },
  ];

  return (
    <div className="flex justify-center items-center w-full my-6">
      <div className="w-full max-w-xs sm:max-w-md">
        <PieChart width={300} height={300}>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
