## Breast Cancer Prediction Tool

A full-stack web application for predicting breast cancer cell types using machine learning.

### 🚀 Features
- **Frontend:** Next.js (React, TypeScript, Tailwind CSS)
- **Backend:** FastAPI (Python)
- **Machine Learning:** Pre-trained model for breast cancer prediction
- **Containerized:** Docker & Docker Compose for easy local development
- **Cloud-Ready:** AWS deployment via CDK (ECS Fargate, ALB, ECR)
- **CI/CD:** Simple, production-ready workflow

### 🛠️ How It Works
- Users enter cell data in a modern, responsive web form.
- The frontend sends data to a FastAPI backend.
- The backend preprocesses input, runs the ML model, and returns predictions instantly.

### 🌎 Deployment
- **Local:** Run with Docker Compose (`docker-compose up --build`)
- **Free Hosting:** Deploy to Vercel (see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md))
- **Cloud:** Deploy to AWS with CDK (`cdk deploy`) - *Note: AWS deployment incurs costs*

### 👤 My Role
I designed and implemented the entire stack, including:
- Building the ML model and API
- Creating the Next.js frontend
- Dockerizing both services
- Automating AWS deployment with CDK

## Tech Stack

- Backend:
  - FastAPI
  - Python 3.9
  - scikit-learn
  - Docker

- Frontend:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - Docker

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend
   cd api
   pip install -r requirements.txt

   # Frontend
   cd ../breast-cancer-ui
   npm install
   ```

3. Run with Docker Compose:
   ```bash
   docker-compose up
   ```

## Environment Variables

### Backend
- `ENVIRONMENT`: Set to 'production' or 'development'

### Frontend
- `NEXT_PUBLIC_API_URL`: URL of the backend API (not needed for Vercel - uses relative path `/api`)

## 🆓 Free Hosting on Vercel

This project is configured for **FREE** deployment on Vercel:
- ✅ Frontend (Next.js) - Free tier
- ✅ Backend (FastAPI) - Serverless functions, Free tier
- ✅ Automatic HTTPS
- ✅ Custom domain support

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

