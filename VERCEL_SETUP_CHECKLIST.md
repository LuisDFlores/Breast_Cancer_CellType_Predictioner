# Vercel Setup Checklist & Issues Found

## ✅ Files Present and Correct

1. **Root `vercel.json`** - ✅ Configured correctly
2. **`api/vercel_handler.py`** - ✅ Present
3. **`api/requirements.txt`** - ✅ Includes `mangum==0.17.0`
4. **`api/api.py`** - ✅ FastAPI app configured
5. **Model files** - ✅ `breast_cancer_model2.pkl` and `breast_cancer_scaler2.pkl` in `api/` directory
6. **Frontend** - ✅ Next.js app in `breast-cancer-ui/`
7. **Frontend API URL** - ✅ Updated to use relative path `/api`

## 🔧 Issues Fixed

### 1. Model File Path (CRITICAL - FIXED)
**Problem:** `api.py` was using `os.getcwd()` to find model files, which doesn't work correctly in Vercel's serverless environment.

**Fix Applied:** Changed to use `__file__` to get the directory where `api.py` is located:
```python
# Before:
current_dir = os.getcwd()

# After:
current_dir = os.path.dirname(os.path.abspath(__file__))
```

**Status:** ✅ FIXED

## ⚠️ Potential Issues to Watch For

### 1. Vercel Handler Function Format
**Status:** ⚠️ MAY NEED ADJUSTMENT

The current handler uses Mangum, which should work, but Vercel's Python runtime might need the handler to be async. If you get errors during deployment, we may need to adjust:

```python
# Current:
def vercel_handler(event, context=None):
    response = handler(event, context)
    if hasattr(response, '__await__'):
        import asyncio
        return asyncio.run(response)
    return response

# Might need to be:
async def vercel_handler(event, context=None):
    return await handler(event, context)
```

**Action:** Test during deployment. If you get async errors, we'll update it.

### 2. API Route Path Stripping
**Status:** ⚠️ MAY NEED ADJUSTMENT

When Vercel routes `/api/predict` to the handler, the FastAPI app receives the full path. FastAPI has routes at `/` and `/predict`, so:
- `/api/` → Should work (FastAPI `/` route)
- `/api/predict` → Might not work (FastAPI expects `/predict`, not `/api/predict`)

**Potential Fix:** We might need to add a path rewrite in `vercel.json` or add a route prefix to FastAPI.

**Action:** Test during deployment. If `/api/predict` returns 404, we'll add path rewriting.

### 3. Memory Configuration
**Status:** ✅ CONFIGURED

`vercel.json` has `"memory": 3008` configured, which should be enough for the model files and dependencies.

### 4. Model Files Size
**Status:** ✅ SHOULD BE OK

- Vercel serverless functions have 50MB limit (including dependencies)
- Your `.pkl` files should be small enough
- If deployment fails due to size, we may need to optimize or host models externally

## 📋 Pre-Deployment Checklist

- [x] `vercel.json` created at root
- [x] `api/vercel_handler.py` created
- [x] `mangum` added to `requirements.txt`
- [x] Model files in `api/` directory
- [x] Frontend API URL updated to use `/api`
- [x] Model path fixed to use `__file__`
- [ ] Test deployment (pending)
- [ ] Verify API routes work (pending)
- [ ] Test full application flow (pending)

## 🚀 Deployment Steps

1. **Commit all changes:**
   ```bash
   git add .
   git commit -m "Fix model path for Vercel deployment"
   git push
   ```

2. **Deploy to Vercel:**
   - Go to vercel.com
   - Import your GitHub repository
   - Vercel will auto-detect configuration
   - Deploy

3. **Test:**
   - Visit `https://your-app.vercel.app/api/` - Should return health check
   - Visit `https://your-app.vercel.app/api/predict` - Test with POST request
   - Visit `https://your-app.vercel.app/` - Frontend should load
   - Test full prediction flow

## 🐛 If Deployment Fails

### Error: "Cannot find model files"
- **Solution:** The `__file__` fix should resolve this. If not, check Vercel build logs.

### Error: "Handler function not found"
- **Solution:** May need to rename function or adjust export format.

### Error: "404 on /api/predict"
- **Solution:** Add path rewriting in `vercel.json` to strip `/api` prefix before passing to FastAPI.

### Error: "Function too large"
- **Solution:** Model files or dependencies exceed 50MB. May need to:
  - Optimize model files
  - Host models externally (S3, etc.)
  - Use Vercel Pro tier

## 📝 Notes

- All critical issues have been addressed
- The setup should work, but serverless environments can be tricky
- Test thoroughly after deployment
- Monitor Vercel logs for any runtime errors

