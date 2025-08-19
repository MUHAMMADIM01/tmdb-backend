# TMDB Backend API

A simple Flask-based REST API that retrieves movies data from **The Movie Database (TMDB)**.  
The application is deployed using **Gunicorn** on **Render**, and offers basic routes to check server health and list popular movies.

---

## 🔧 Built With

- **Python 3.12**
- **Flask 3.1**
- **Gunicorn (WSGI Server)**
- **Requests**
- **python-dotenv**
- **Render.com** (Deployment)

---

## 📡 Live API URL

> **Base URL:** https://tmdb-backend-sozi.onrender.com

---

## 🚀 API Routes

| Method | Route        | Description                          |
|--------|--------------|--------------------------------------|
| GET    | `/`          | Returns a welcome message            |
| GET    | `/movies`    | Returns a list of popular movies from TMDB |

---

## ▶️ Example Output

**GET `/`**
```json
{
  "status": "ok",
  "message": "TMDB Movies API App is running"
}
