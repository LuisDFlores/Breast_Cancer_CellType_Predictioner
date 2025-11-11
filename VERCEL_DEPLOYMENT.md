# Vercel Deployment Guide

This guide will help you deploy your Breast Cancer Prediction Tool to **Vercel** for **FREE**.

## ✅ What's Been Set Up

1. **Root `vercel.json`** - Configures both frontend (Next.js) and backend (FastAPI) on Vercel
2. **`api/vercel_handler.py`** - Wraps FastAPI app to work with Vercel's serverless functions
3. **Updated `api/requirements.txt`** - Added `mangum` for ASGI-to-Lambda conversion
4. **Updated frontend** - Changed API URL to use relative path `/api` for Vercel deployment

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

1. **Make sure all files are committed:**
   ```bash
   git add .
   git commit -m "Setup Vercel deployment configuration"
   git push
   ```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. **Sign up/Login** at [vercel.com](https://vercel.com) (use GitHub to sign in)

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Configure Project Settings:**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: Leave empty (we're using root `vercel.json`)
   - **Build Command**: Leave default (Vercel will use `vercel.json`)
   - **Output Directory**: Leave default

4. **Add Environment Variables** (if needed):
   - Usually not needed since we're using relative paths
   - If you have other env vars, add them here

5. **Deploy:**
   - Click "Deploy"
   - Wait 3-5 minutes for build and deployment
   - Vercel will provide a URL like: `https://your-app-name.vercel.app`

#### Option B: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Select your project settings

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

### Step 3: Verify Deployment

1. **Check Frontend:**
   - Visit your Vercel URL (e.g., `https://your-app-name.vercel.app`)
   - The Next.js frontend should load

2. **Check Backend API:**
   - Visit `https://your-app-name.vercel.app/api/`
   - You should see: `{"status":"healthy","message":"Breast Cancer Prediction API is running",...}`

3. **Test Full Application:**
   - Fill out the form on the frontend
   - Submit a prediction
   - Verify it works end-to-end

## 📁 Project Structure for Vercel

```
Breast_Cancer_Prediction_Tool/
├── vercel.json                    # Vercel configuration (root)
├── api/
│   ├── api.py                    # FastAPI application
│   ├── vercel_handler.py         # Vercel serverless function handler
│   ├── requirements.txt          # Python dependencies (includes mangum)
│   ├── breast_cancer_model2.pkl  # ML model
│   └── breast_cancer_scaler2.pkl # Scaler
└── breast-cancer-ui/
    ├── package.json              # Next.js dependencies
    ├── src/                      # Next.js source code
    └── ...
```

## 🔧 How It Works

1. **Frontend (Next.js):**
   - Vercel automatically detects and builds the Next.js app in `breast-cancer-ui/`
   - Routes are handled by Next.js

2. **Backend (FastAPI):**
   - Requests to `/api/*` are routed to `api/vercel_handler.py`
   - `vercel_handler.py` uses Mangum to convert Vercel's request format to ASGI
   - FastAPI processes the request and returns a response
   - Mangum converts the response back to Vercel's format

## ⚠️ Important Notes

### Model Files Size
- Your `.pkl` files are included in the deployment
- Vercel serverless functions have a 50MB limit (including dependencies)
- If you exceed this, you may need to:
  - Use Vercel's larger memory tier (3008MB is configured)
  - Or host models externally (S3, etc.)

### Cold Starts
- Serverless functions have "cold starts" (first request after inactivity)
- This may take 2-5 seconds on the free tier
- Subsequent requests are fast

### Timeout Limits
- Free tier: 10 seconds (we configured 30 seconds, but free tier limits to 10s)
- Hobby tier: 60 seconds
- If predictions take longer, consider upgrading or optimizing

## 🐛 Troubleshooting

### Backend Returns 404
- **Check**: Is `api/vercel_handler.py` in the correct location?
- **Check**: Does `vercel.json` route `/api/*` correctly?
- **Check**: Are model files (`*.pkl`) in the `api/` directory?

### Import Errors
- **Check**: Does `api/requirements.txt` include all dependencies?
- **Check**: Is `mangum` in requirements.txt?

### Frontend Can't Connect to API
- **Check**: Is the frontend using `/api` (relative path)?
- **Check**: Browser console for CORS errors (shouldn't happen since CORS is enabled)

### Build Fails
- **Check**: Vercel build logs for specific errors
- **Check**: Python version compatibility
- **Check**: All dependencies are in `requirements.txt`

## 💰 Cost

**Vercel Free Tier Includes:**
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Serverless functions (with limits)
- ✅ Automatic HTTPS
- ✅ Custom domains (1 on free tier)

**Your app should be completely FREE** unless you exceed free tier limits.

## 📝 Next Steps

1. ✅ Deploy to Vercel
2. ✅ Test the application
3. ✅ Add your live demo link to GitHub README
4. ✅ Share your project! 🎉

## 🔗 Useful Links

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Python Runtime**: https://vercel.com/docs/functions/runtimes/python
- **Mangum Docs**: https://mangum.io/

