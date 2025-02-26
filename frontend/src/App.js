import React, { useState } from "react";
import SentimentFilter from "./components/SentimentFilter";
import SentimentChart from "./components/SentimentChart";
import CSVDownload from "./components/CSVDownload";
import { fetchSentiments } from "./api";

export default function App() {
  const [subreddit, setSubreddit] = useState("");
  const [comments, setComments] = useState([]);
  const [filteredSentiments, setFilteredSentiments] = useState("all");
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(false); // Loading state

  const handleFetch = async () => {
    if (!subreddit.trim()) {
      setError("Please enter a subreddit.");
      return;
    }

    setLoading(true);
    setError(null);
    setComments([]); // Reset comments before fetching

    try {
      const data = await fetchSentiments(subreddit);
      console.log("API Response:", data); // Debugging log

      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid API response format");
      }

      setComments(data);
    } catch (err) {
      console.error("Error fetching sentiments:", err);
      setError("Failed to fetch sentiments. Please check the subreddit name and try again.");
    }

    setLoading(false);
  };

  const filteredComments = comments.filter(
    (comment) => filteredSentiments === "all" || comment.sentiment === filteredSentiments
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Reddit Sentiment Analysis</h1>

      <input
        type="text"
        placeholder="Enter subreddit..."
        value={subreddit}
        onChange={(e) => setSubreddit(e.target.value)}
        className="p-2 rounded-lg text-black"
      />

      <button
        onClick={handleFetch}
        disabled={loading}
        className={`mt-2 px-4 py-2 rounded-lg ${loading ? "bg-gray-400" : "bg-yellow-400"}`}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p className="text-red-400 mt-2">{error}</p>}

      {comments.length > 0 && (
        <>
          <SentimentFilter setFilter={setFilteredSentiments} />
          <SentimentChart comments={filteredComments} />
          <CSVDownload data={filteredComments} />
        </>
      )}
    </div>
  );
}
