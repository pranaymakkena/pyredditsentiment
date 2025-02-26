import React from "react";
import { CSVLink } from "react-csv";

export default function CSVDownload({ data }) {
  const headers = [
    { label: "Text", key: "text" },
    { label: "Sentiment", key: "sentiment" },
    { label: "Polarity", key: "polarity" },
  ];

  return (
    <div className="mt-4 w-full flex justify-center">
      {data.length > 0 && (
        <CSVLink
          data={data}
          headers={headers}
          filename="reddit_sentiments.csv"
          className="bg-green-500 text-white px-4 py-2 rounded-lg text-center w-full sm:w-auto"
        >
          Download CSV
        </CSVLink>
      )}
    </div>
  );
}
