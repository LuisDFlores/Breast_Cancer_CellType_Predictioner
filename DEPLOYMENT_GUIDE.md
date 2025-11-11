# Free Hosting Deployment Guide

This guide will help you deploy your Breast Cancer Prediction Tool for **FREE** using:
- **Vercel** (Frontend) - Free tier, perfect for Next.js
- **Railway** or **Render** (Backend) - Free tiers available

## Prerequisites

1. GitHub account (to connect repositories)
2. Vercel account (free at vercel.com)
3. Railway account (free at railway.app) OR Render account (free at render.com)

---

## Step 1: Deploy Backend to Railway

### Option A: Railway (Recommended)

1. **Sign up** at [railway.app](https://railway.app) (use GitHub to sign in)

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `api` folder as the root directory

3. **Configure Service**:
   - Railway will auto-detect the Dockerfile
   - Add environment variable:
     - Key: `ENVIRONMENT`
     - Value: `production`

4. **Get Your Backend URL**:
   - Railway will provide a URL like: `https://your-app-name.up.railway.app`
   - **Copy this URL** - you'll need it for the frontend!

5. **Verify Backend**:
   - Visit `https://your-backend-url/` in your browser
   - You should see: `{"status":"healthy","message":"Breast Cancer Prediction API is running",...}`

### Option B: Render (Alternative)

1. **Sign up** at [render.com](https://render.com) (use GitHub to sign in)

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `breast-cancer-api`
     - **Root Directory**: `api`
     - **Environment**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn api:app --host 0.0.0.0 --port $PORT`
     - **Plan**: Free

3. **Add Environment Variable**:
   - Key: `ENVIRONMENT`
   - Value: `production`

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - **Copy the service URL** (e.g., `https://breast-cancer-api.onrender.com`)

---

## Step 2: Deploy Frontend to Vercel

1. **Sign up** at [vercel.com](https://vercel.com) (use GitHub to sign in)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `breast-cancer-ui`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

4. **Add Environment Variable**:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: Your backend URL from Step 1 (e.g., `https://your-app-name.up.railway.app`)
   - ⚠️ **Important**: Make sure to include `http://` or `https://` in the URL!

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build and deployment
   - Vercel will provide a URL like: `https://your-app-name.vercel.app`

6. **Verify Frontend**:
   - Visit your Vercel URL
   - The app should load and connect to your backend API

---

## Step 3: Update GitHub README

Add your live demo links to your README:

```markdown
## 🌐 Live Demo

- **Frontend**: [https://your-app-name.vercel.app](https://your-app-name.vercel.app)
- **Backend API**: [https://your-backend-url/](https://your-backend-url/)
```

---

## Troubleshooting

### Backend Issues

**Problem**: Backend returns 404 or connection errors
- **Solution**: Check that your backend URL is correct and includes `http://` or `https://`
- Verify the backend is running: Visit `https://your-backend-url/` directly

**Problem**: CORS errors
- **Solution**: The backend already has CORS enabled for all origins (`allow_origins=["*"]`), so this should work

### Frontend Issues

**Problem**: Frontend shows "API is currently unavailable"
- **Solution**: 
  1. Check `NEXT_PUBLIC_API_URL` in Vercel environment variables
  2. Make sure the backend URL is accessible
  3. Rebuild the frontend after updating environment variables

**Problem**: Environment variable not updating
- **Solution**: 
  1. Update the variable in Vercel dashboard
  2. Redeploy the frontend (Vercel auto-redeploys on env var changes)

### Railway/Render Free Tier Limits

- **Railway**: 
  - Free tier: $5 credit/month (usually enough for low-traffic apps)
  - Services sleep after inactivity (may take 30 seconds to wake up)
  
- **Render**:
  - Free tier: Services sleep after 15 minutes of inactivity
  - First request after sleep takes ~30 seconds to wake up

---

## Cost Comparison

| Service | AWS (Current) | Vercel | Railway/Render |
|---------|---------------|--------|----------------|
| Frontend | ~$20-50/month | **FREE** | N/A |
| Backend | ~$20-50/month | N/A | **FREE** (with limits) |
| **Total** | **~$150/month** | **$0/month** | **$0/month** |

---

## Next Steps

1. ✅ Deploy backend to Railway or Render
2. ✅ Deploy frontend to Vercel
3. ✅ Test the full application
4. ✅ Add live demo links to GitHub README
5. ✅ Share your project! 🎉

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs

