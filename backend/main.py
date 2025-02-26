import praw
import csv
from fastapi import FastAPI
from textblob import TextBlob
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Reddit API Credentials from Environment Variables
reddit = praw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    user_agent=os.getenv("REDDIT_USER_AGENT")
)

@app.get("/analyze/")
def analyze_reddit_sentiment(subreddit: str, limit: int = 50):
    subreddit_data = reddit.subreddit(subreddit)
    comments = []

    for submission in subreddit_data.hot(limit=limit):
        submission.comments.replace_more(limit=0)
        for comment in submission.comments.list():
            text = comment.body
            sentiment_score = TextBlob(text).sentiment.polarity
            sentiment = "positive" if sentiment_score > 0 else "negative" if sentiment_score < 0 else "neutral"
            comments.append({"text": text, "sentiment": sentiment, "polarity": sentiment_score})

    return comments  # Returns a list directly

@app.get("/download/")
def download_csv(subreddit: str, limit: int = 50):
    data = analyze_reddit_sentiment(subreddit, limit)  # Fix here
    file_path = f"{subreddit}_sentiments.csv"

    with open(file_path, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["Text", "Sentiment", "Polarity"])
        for row in data:
            writer.writerow([row["text"], row["sentiment"], row["polarity"]])

    return {"message": "CSV file created!", "file": file_path}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
