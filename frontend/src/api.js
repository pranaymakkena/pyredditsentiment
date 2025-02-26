const API_URL = process.env.REACT_APP_API_URL || "https://pyredditsentiment.onrender.com";

export const fetchSentiments = async (subreddit) => {
  try {
    const response = await fetch(`${API_URL}/analyze/?subreddit=${subreddit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // Debugging log

    // ✅ Extract the array from "results"
    if (!data || !data.results || !Array.isArray(data.results)) {
      throw new Error("Invalid API response format");
    }

    return data.results; // Return the array of comments
  } catch (error) {
    console.error("Error fetching sentiments:", error);
    return [];
  }
};
