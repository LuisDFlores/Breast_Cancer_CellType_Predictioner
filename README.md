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
- **Free Hosting:** Split hosting on Vercel (Frontend) + Render (Backend) - **100% FREE** (see [SPLIT_HOSTING_GUIDE.md](./SPLIT_HOSTING_GUIDE.md))
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
- `NEXT_PUBLIC_API_URL`: URL of the backend API (set to Render backend URL for production)

## 🆓 Free Hosting (Split Hosting)

This project is configured for **100% FREE** deployment using split hosting:
- ✅ **Frontend (Next.js)** on Vercel - Free tier, unlimited deployments
- ✅ **Backend (FastAPI)** on Render - Free tier, Docker support
- ✅ No size limits (unlike Vercel's 250MB limit)
- ✅ Automatic HTTPS
- ✅ Auto-deploy on git push

See [SPLIT_HOSTING_GUIDE.md](./SPLIT_HOSTING_GUIDE.md) for detailed deployment instructions.

