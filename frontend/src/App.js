import React, { useState } from "react";
import SentimentFilter from "./components/SentimentFilter";
import SentimentChart from "./components/SentimentChart";
import CSVDownload from "./components/CSVDownload";
import { fetchSentiments } from "./api";

export default function App() {
  const [subreddit, setSubreddit] = useState("");
  const [comments, setComments] = useState([]);
  const [filteredSentiments, setFilteredSentiments] = useState("all");

  const handleFetch = async () => {
    if (!subreddit) return;
    const data = await fetchSentiments(subreddit);
    setComments(data || []);
  };

  const filteredComments = comments.filter(comment => 
    filteredSentiments === "all" || comment.sentiment === filteredSentiments
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
      <button onClick={handleFetch} className="mt-2 bg-yellow-400 px-4 py-2 rounded-lg">Analyze</button>

      <SentimentFilter setFilter={setFilteredSentiments} />
      <SentimentChart comments={filteredComments} />
      <CSVDownload data={filteredComments} />
    </div>
  );
}
