# Split Hosting Deployment Guide
## Vercel (Frontend) + Render (Backend) - 100% FREE

This guide will help you deploy your app using:
- **Vercel** for the Next.js frontend (FREE)
- **Render** for the FastAPI backend (FREE)

---

## ✅ What's Ready

- ✅ Frontend updated to use `NEXT_PUBLIC_API_URL` environment variable
- ✅ `render.yaml` configured for Render deployment
- ✅ `Dockerfile` ready for Render
- ✅ All files committed and pushed to GitHub

---

## 🚀 Step 1: Deploy Backend to Render

### 1.1 Sign Up / Login
1. Go to [render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended)

### 1.2 Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository:
   - Select: `LuisDFlores/Breast_Cancer_CellType_Predictioner`
   - Click **"Connect"**

### 1.3 Configure Service
Fill in the following settings:

**Basic Settings:**
- **Name**: `breast-cancer-api` (or any name you like)
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main`

**Build & Deploy:**
- **Root Directory**: `api` ⚠️ **IMPORTANT: Set this to `api`**
- **Environment**: Select **"Docker"** (or "Python 3" if Docker doesn't work)
- **Build Command**: Leave empty (auto-detected)
- **Start Command**: 
  - If using Docker: Leave empty (uses Dockerfile)
  - If using Python: `uvicorn api:app --host 0.0.0.0 --port $PORT`

**Plan:**
- Select **"Free"** plan

**Advanced Settings (Optional):**
- **Auto-Deploy**: `Yes` (deploys on every push)

### 1.4 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**:
- **Key**: `ENVIRONMENT`
- **Value**: `production`
- Click **"Save Changes"**

### 1.5 Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for first deployment
3. Render will build and deploy your backend
4. **Copy the service URL** (e.g., `https://breast-cancer-api.onrender.com`)
   - ⚠️ **SAVE THIS URL** - You'll need it for Vercel!

### 1.6 Verify Backend
1. Visit your Render URL: `https://your-backend-url.onrender.com/`
2. You should see:
   ```json
   {
     "status": "healthy",
     "message": "Breast Cancer Prediction API is running",
     "model_loaded": true,
     "scaler_loaded": true
   }
   ```

---

## 🚀 Step 2: Deploy Frontend to Vercel

### 2.1 Sign Up / Login
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign up with GitHub (recommended)

### 2.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository:
   - Select: `LuisDFlores/Breast_Cancer_CellType_Predictioner`
   - Click **"Import"**

### 2.3 Configure Project
Fill in the settings:

**Framework Preset:**
- Select **"Next.js"** (auto-detected)

**Root Directory:**
- Set to: `breast-cancer-ui` ⚠️ **IMPORTANT: Set this!**

**Build Settings:**
- **Build Command**: Leave default (`npm run build`)
- **Output Directory**: Leave default (`.next`)
- **Install Command**: Leave default (`npm install`)

### 2.4 Add Environment Variable
**CRITICAL STEP:**
1. Scroll down to **"Environment Variables"**
2. Click **"Add"**
3. Add:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: Your Render backend URL from Step 1.5
     - Example: `https://breast-cancer-api.onrender.com`
   - ⚠️ **Make sure to include `https://` and no trailing slash!**
4. Click **"Add"**

### 2.5 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build and deployment
3. Vercel will provide a URL like: `https://your-app-name.vercel.app`

### 2.6 Verify Frontend
1. Visit your Vercel URL
2. The frontend should load
3. Test the API connection:
   - Fill out the form
   - Submit a prediction
   - Should connect to Render backend

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Backend returns 404 or doesn't load
- **Solution**: 
  - Check Root Directory is set to `api`
  - Verify `render.yaml` is in the `api/` folder
  - Check Render build logs for errors

**Problem**: Model files not found
- **Solution**: 
  - Verify `.pkl` files are in `api/` directory
  - Check Render logs for file path errors

**Problem**: Service sleeps (first request slow)
- **Solution**: 
  - This is normal on Render free tier
  - First request after 15 min inactivity takes ~30 seconds
  - Subsequent requests are fast

### Frontend Issues

**Problem**: Frontend shows "API is currently unavailable"
- **Solution**: 
  - Check `NEXT_PUBLIC_API_URL` in Vercel environment variables
  - Make sure URL includes `https://` and no trailing slash
  - Verify Render backend is running
  - Rebuild frontend after updating env var

**Problem**: CORS errors
- **Solution**: 
  - Backend already has CORS enabled (`allow_origins=["*"]`)
  - Should work automatically
  - If issues persist, check Render backend logs

### Connection Issues

**Problem**: Frontend can't reach backend
- **Solution**: 
  1. Test backend directly: Visit Render URL in browser
  2. Check browser console for errors
  3. Verify environment variable is set correctly
  4. Make sure both services are deployed

---

## 📝 Post-Deployment Checklist

- [ ] Backend deployed on Render
- [ ] Backend health check works (`/` endpoint)
- [ ] Frontend deployed on Vercel
- [ ] `NEXT_PUBLIC_API_URL` set in Vercel
- [ ] Frontend loads correctly
- [ ] Form submission works
- [ ] Predictions are returned correctly

---

## 💰 Cost

**Total Cost: $0/month**
- ✅ Vercel: Free tier (unlimited deployments)
- ✅ Render: Free tier (services sleep after inactivity)

---

## 🔗 Useful Links

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Your Backend URL**: Check Render dashboard
- **Your Frontend URL**: Check Vercel dashboard

---

## 🎉 You're Done!

Once both are deployed:
1. Add your live demo links to GitHub README
2. Share your project!
3. Both services will auto-deploy on every git push

---

**Need Help?** Check the troubleshooting section or review the deployment logs in Render/Vercel dashboards.

