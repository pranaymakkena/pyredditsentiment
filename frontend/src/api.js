const API_URL = process.env.REACT_APP_API_URL || "https://pyredditsentiment.onrender.com";

export const fetchSentiments = async (subreddit) => {
  const response = await fetch(`${API_URL}/analyze?subreddit=${subreddit}`);
  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid API response format");
  }

  return data;
};
