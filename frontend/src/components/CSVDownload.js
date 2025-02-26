import React from "react";
import { CSVLink } from "react-csv";

export default function CSVDownload({ data }) {
  const headers = [
    { label: "Comment", key: "text" },
    { label: "Sentiment", key: "sentiment" }
  ];

  return (
    <CSVLink data={data} headers={headers} filename="sentiments.csv"
      className="mt-4 bg-gray-700 px-4 py-2 rounded text-white">
      Download CSV
    </CSVLink>
  );
}
