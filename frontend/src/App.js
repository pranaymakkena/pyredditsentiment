import React, { useState } from "react";
import SentimentFilter from "./components/SentimentFilter";
import SentimentChart from "./components/SentimentChart";
import CSVDownload from "./components/CSVDownload";
import { fetchSentiments } from "./api";

export default function App() {
  const [subreddit, setSubreddit] = useState("");
  const [comments, setComments] = useState([]);
  const [filteredSentiments, setFilteredSentiments] = useState("all");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!subreddit) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchSentiments(subreddit);
      console.log("API Response:", data);

      if (!Array.isArray(data)) {
        throw new Error("Invalid API response format");
      }

      setComments(data);
    } catch (err) {
      console.error("Error fetching sentiments:", err);
      setError("Failed to fetch sentiments. Please try again.");
    }

    setLoading(false);
  };

  const filteredComments = Array.isArray(comments)
    ? comments.filter((comment) => filteredSentiments === "all" || comment.sentiment === filteredSentiments)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Reddit Sentiment Analysis</h1>

      <input
        type="text"
        placeholder="Enter subreddit..."
        value={subreddit}
        onChange={(e) => setSubreddit(e.target.value)}
        className="p-2 rounded-lg text-black w-full max-w-md"
      />

      <button onClick={handleFetch} className="mt-2 bg-yellow-400 px-4 py-2 rounded-lg w-full max-w-md">
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p className="text-red-400 mt-2">{error}</p>}

      <div className="w-full flex flex-col items-center mt-4">
        <SentimentFilter setFilter={setFilteredSentiments} />
        <SentimentChart comments={filteredComments} />
        <CSVDownload data={filteredComments} />
      </div>
    </div>
  );
}
