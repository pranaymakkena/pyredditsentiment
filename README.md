# Reddit Sentiment Analysis

## 📌 Overview
A web application that analyzes Reddit comments for sentiment (positive, neutral, negative).

## 🚀 How to Use
1. Enter a subreddit name (e.g., `economy`).
2. Click "Analyze" to fetch comments.
3. View sentiment results in a table.
4. Click "Save to CSV" to download results.

## 🛠 Tech Stack
- **Backend:** FastAPI, PRAW, TextBlob
- **Frontend:** React, Tailwind CSS
- **Deployment:** Backend on Render, Frontend on Vercel

## 📦 Installation
1. **Backend**
~~~bash
cd backend
~~~
~~~bash
pip install -r requirements.txt
~~~
~~~bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000
~~~
2. **Frontend**
~~~bash
cd frontend
~~~
~~~bash
npm install
~~~
~~~bash
npm start
~~~

## 🎯 Features
✅ Subreddit input  
✅ Sentiment analysis (positive, neutral, negative)  
✅ Save results as CSV  
✅ Beautiful UI with Tailwind CSS  
✅ Deployed on Render & Vercel  
