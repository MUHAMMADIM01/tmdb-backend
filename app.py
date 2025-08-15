import os
import requests
from flask import Flask, jsonify
from dotenv import load_dotenv

load_dotenv()  # loads .env from current dir

app = Flask(__name__)

TMDB_API_KEY = os.getenv("TMDB_API_KEY")

@app.route("/")
def home():
    return jsonify({"status": "ok", "message": "TMDB Movies API App is running"})

@app.route("/movies")
def get_movies():
    if not TMDB_API_KEY:
        return jsonify({"error": "TMDB_API_KEY not set"}), 500
    url = f"https://api.themoviedb.org/3/movie/popular?api_key={TMDB_API_KEY}&language=en-US&page=1"
    r = requests.get(url, timeout=20)
    return jsonify(r.json())

if __name__ == "__main__":
    # Dev only; production zai yi Gunicorn
    app.run(debug=True, host="0.0.0.0", port=5000)
