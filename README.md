# Breast Cancer Prediction Tool

A full-stack application for predicting breast cancer using machine learning.

## Features

- Machine learning model for breast cancer prediction
- FastAPI backend
- Next.js frontend with modern UI
- Docker containerization
- AWS deployment ready

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
- `NEXT_PUBLIC_API_URL`: URL of the backend API

## Deployment

The application is configured for AWS deployment using:
- AWS ECS (Elastic Container Service)
- AWS ECR (Elastic Container Registry)
- AWS CodeBuild
- AWS CodePipeline

See `aws-deploy.yml` for deployment configuration.

## License

MIT 