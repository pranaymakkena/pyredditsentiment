import praw
import csv
import os
import logging
from fastapi import FastAPI, HTTPException
from textblob import TextBlob
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

# Initialize FastAPI app
app = FastAPI()

# Enable CORS (Allow frontend to call backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)

# Load Reddit API Credentials from Environment Variables
try:
    reddit = praw.Reddit(
        client_id=os.getenv("REDDIT_CLIENT_ID"),
        client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
        user_agent=os.getenv("REDDIT_USER_AGENT")
    )
except Exception as e:
    logging.error(f"Error initializing Reddit API: {e}")
    raise HTTPException(status_code=500, detail="Reddit API configuration error")

@app.get("/")
def home():
    return {"message": "Reddit Sentiment Analysis API"}

@app.get("/analyze/")
def analyze_reddit_sentiment(subreddit: str, limit: int = 50):
    try:
        subreddit_data = reddit.subreddit(subreddit)
        comments = []

        for submission in subreddit_data.hot(limit=limit):
            submission.comments.replace_more(limit=0)
            for comment in submission.comments.list():
                text = comment.body
                sentiment_score = TextBlob(text).sentiment.polarity
                sentiment = "positive" if sentiment_score > 0 else "negative" if sentiment_score < 0 else "neutral"
                comments.append({"text": text, "sentiment": sentiment, "polarity": sentiment_score})

        if not comments:
            raise HTTPException(status_code=404, detail="No comments found for the subreddit")

        return {"subreddit": subreddit, "comments_analyzed": len(comments), "results": comments}

    except Exception as e:
        logging.error(f"Error analyzing subreddit {subreddit}: {e}")
        raise HTTPException(status_code=500, detail="Error fetching subreddit data")

@app.get("/download/")
def download_csv(subreddit: str, limit: int = 50):
    try:
        data = analyze_reddit_sentiment(subreddit, limit)["results"]
        if not data:
            raise HTTPException(status_code=404, detail="No data available for download")

        file_path = f"{subreddit}_sentiments.csv"
        with open(file_path, mode="w", newline="", encoding="utf-8") as file:
            writer = csv.writer(file)
            writer.writerow(["Text", "Sentiment", "Polarity"])
            for row in data:
                writer.writerow([row["text"], row["sentiment"], row["polarity"]])

        return FileResponse(file_path, filename=file_path, media_type="text/csv")

    except Exception as e:
        logging.error(f"Error generating CSV for {subreddit}: {e}")
        raise HTTPException(status_code=500, detail="Error generating CSV")

@app.get("/healthz")
def healthz():
    return {"status": "ok"}
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
