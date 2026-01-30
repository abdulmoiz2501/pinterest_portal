# 🚀 Quick Deploy - 5 Minutes

## Easiest Way: Vercel (Recommended)

### Step 1: Push to GitHub (2 min)
```bash
# If you don't have git initialized:
git init
git add .
git commit -m "Ready to deploy"

# Create a new repo on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel (2 min)
1. Go to **https://vercel.com**
2. Click **"Sign Up"** → Use **GitHub** to sign in
3. Click **"Add New Project"**
4. Select your repository
5. Click **"Deploy"** (Vercel auto-detects everything!)

### Step 3: Add Environment Variables (1 min)
1. In Vercel dashboard → Your project → **Settings** → **Environment Variables**
2. Add these 8 variables (copy from your `.env` file):

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_CLOUDINARY_CLOUD_NAME
VITE_CLOUDINARY_UPLOAD_PRESET
```

3. Go to **Deployments** → Click **"..."** → **Redeploy**

### ✅ Done!
- **Website**: `https://your-project.vercel.app`
- **Admin**: `https://your-project.vercel.app/admin/login`

---

## Alternative: Firebase Hosting (Since You Use Firebase)

### Step 1: Install & Login
```bash
npm install -g firebase-tools
firebase login
```

### Step 2: Initialize
```bash
firebase init hosting
# Select: Use existing project → pinterest-fd684
# Public directory: dist
# Single-page app: Yes
# Overwrite index.html: No
```

### Step 3: Build & Deploy
```bash
npm run build
firebase deploy --only hosting
```

### ✅ Done!
- **Website**: `https://pinterest-fd684.web.app`
- **Admin**: `https://pinterest-fd684.web.app/admin/login`

---

## 🎯 Which Should You Choose?

**Vercel** = Easiest, auto-deploys on every GitHub push
**Firebase** = You're already using it, one less service

Both are 100% FREE! 🎉

