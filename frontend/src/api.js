const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const fetchSentiments = async (subreddit) => {
  const response = await fetch(`${API_URL}/analyze?subreddit=${subreddit}`);
  return response.json();
};
