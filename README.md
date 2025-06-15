# Breast Cancer Prediction Tool

A machine learning-based web application for predicting breast cancer using the Wisconsin Breast Cancer dataset.

## Features

- Machine learning model for breast cancer prediction
- FastAPI backend with automatic API documentation
- Modern Next.js frontend with Tailwind CSS
- Docker containerization
- Deployed on Render

## Tech Stack

- Backend:
  - Python 3.9
  - FastAPI
  - Scikit-learn
  - Docker

- Frontend:
  - Next.js
  - Tailwind CSS
  - TypeScript

## Getting Started

1. Clone the repository
2. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Install frontend dependencies:
   ```bash
   cd breast-cancer-ui
   npm install
   ```
4. Run the backend:
   ```bash
   uvicorn api:app --reload
   ```
5. Run the frontend:
   ```bash
   cd breast-cancer-ui
   npm run dev
   ```

## API Documentation

Once the backend is running, visit `/docs` for interactive API documentation.

## License

MIT 