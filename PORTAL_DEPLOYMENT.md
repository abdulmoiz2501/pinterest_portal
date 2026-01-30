# Admin Portal Deployment Guide

This repository contains the admin portal for managing products.

## ✅ Ready for Deployment

The code is configured and ready to deploy to Vercel.

## 🚀 Deploy to Vercel

### Step 1: Connect Repository
1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Import `pinterest_portal` repository
4. Vercel will auto-detect it's a Vite project

### Step 2: Configure Build Settings
Vercel should auto-detect, but verify:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Add Environment Variables
Add these 8 environment variables in Vercel Settings → Environment Variables:

**Firebase (6 variables):**
- `VITE_FIREBASE_API_KEY` = `AIzaSyB2NlZ7mnbRvSZSJAm_EGp0xlRhcJi7pw8`
- `VITE_FIREBASE_AUTH_DOMAIN` = `pinterest-fd684.firebaseapp.com`
- `VITE_FIREBASE_PROJECT_ID` = `pinterest-fd684`
- `VITE_FIREBASE_STORAGE_BUCKET` = `pinterest-fd684.firebasestorage.app`
- `VITE_FIREBASE_MESSAGING_SENDER_ID` = `467745876545`
- `VITE_FIREBASE_APP_ID` = `1:467745876545:web:9a2a00411ef52d6be2b4c0`

**Cloudinary (2 variables):**
- `VITE_CLOUDINARY_CLOUD_NAME` = `dc2sdk2mm`
- `VITE_CLOUDINARY_UPLOAD_PRESET` = `soft-pin-products`

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for build to complete
3. Your portal will be live!

## 🔗 Access Portal

After deployment, access at:
- **Portal URL**: `https://your-portal-name.vercel.app/admin/login`
- **Login**: 
  - Username: `admin`
  - Password: `admin123`

## ✅ What's Included

- ✅ `vercel.json` - Configured for React Router (SPA routing)
- ✅ All admin portal code
- ✅ Firebase integration
- ✅ Cloudinary integration
- ✅ All dependencies

## 📝 Notes

- The portal shares the same Firebase/Firestore as the main site
- Products added here will appear on the main ecommerce site
- Make sure Firestore rules allow writes (see FIRESTORE_RULES_FIX.md)

