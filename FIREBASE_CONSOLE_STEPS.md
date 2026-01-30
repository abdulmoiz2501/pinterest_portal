# Firebase Console Setup - Step by Step (WITH CLOUDINARY)

Follow these exact steps in the Firebase Console. We're using **Cloudinary** for free image storage instead of Firebase Storage!

## STEP 1: Create Firebase Project ✅ (YOU'VE DONE THIS)

1. Go to https://console.firebase.google.com/
2. Click **"Add project"** (or "Create a project" if you're new)
3. **Project name**: Enter any name (e.g., "soft-pin-curations")
4. Click **"Continue"**
5. **Google Analytics**: You can disable this (toggle it off) or leave it enabled - doesn't matter
6. Click **"Create project"**
7. Wait for project creation (takes ~30 seconds)
8. Click **"Continue"**

✅ **You now have a Firebase project!**

---

## STEP 2: Enable Firestore Database ✅ (YOU'VE DONE THIS)

1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"** button
3. **Security rules**: Select **"Start in test mode"** (we'll fix rules later)
4. Click **"Next"**
5. **Cloud Firestore location**: Choose a location close to you (e.g., `us-central`, `us-east1`, `europe-west1`)
6. Click **"Enable"**
7. Wait for database creation (~30 seconds)

✅ **Firestore is now enabled!**

---

## STEP 3: SKIP FIREBASE STORAGE - We're Using Cloudinary Instead! 🎉

**You don't need to enable Firebase Storage!** We're using Cloudinary's free tier for image uploads.

**Skip to Step 4 below!**

---

## STEP 4: Get Your Firebase Configuration (THIS IS WHAT I NEED!)

1. In the left sidebar, click the **gear icon ⚙️** next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to the **"Your apps"** section
4. If you see any existing web apps, you can use one OR create a new one:
   - To create new: Click the **web icon `</>`** (looks like `</>`)
   - **App nickname**: Enter "Soft Pin Curations" (or anything)
   - **Firebase Hosting**: Leave unchecked (we don't need it)
   - Click **"Register app"**
5. You'll see a code block with `firebaseConfig` - **COPY THESE VALUES**:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

6. **I NEED THESE 6 VALUES FROM YOU:**
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket` (we won't use it, but Firebase requires it)
   - `messagingSenderId`
   - `appId`

✅ **You have the Firebase config values!**

---

## STEP 5: Set Up Firestore Security Rules

1. In left sidebar, click **"Firestore Database"**
2. Click the **"Rules"** tab (at the top)
3. **DELETE** all the existing rules
4. **PASTE** this code:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - anyone can read, only admin can write (via admin portal)
    match /products/{productId} {
      allow read: if true;
      allow write: if false; // Admin portal handles this
    }
    
    // Collections - anyone can read
    match /collections/{collectionId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

5. Click **"Publish"** button (top right)

✅ **Firestore rules are set!**

---

## STEP 6: Set Up Cloudinary (FREE IMAGE STORAGE) 🆓

### 6a. Create Cloudinary Account

1. Go to https://cloudinary.com/
2. Click **"Sign Up For Free"** (top right)
3. Fill in your details:
   - Email
   - Password
   - Name
4. Click **"Create Account"**
5. Verify your email if needed

✅ **Cloudinary account created!**

### 6b. Get Your Cloudinary Credentials

1. After logging in, you'll see your **Dashboard**
2. Look for **"Account Details"** or click your name → **"Dashboard"**
3. You'll see:
   - **Cloud Name** (e.g., `dabc123xyz`)
   - **API Key** (you'll need this later, but not for unsigned uploads)
   - **API Secret** (keep this secret!)

4. **Copy your Cloud Name** - you'll need this!

✅ **You have your Cloud Name!**

### 6c. Create Upload Preset (For Unsigned Uploads)

1. In Cloudinary Dashboard, go to **"Settings"** (gear icon) → **"Upload"** tab
2. Scroll down to **"Upload presets"** section
3. Click **"Add upload preset"**
4. Configure:
   - **Preset name**: `soft-pin-products` (or any name)
   - **Signing mode**: Select **"Unsigned"** (this allows uploads without backend!)
   - **Folder**: `products` (optional, but good for organization)
   - **Upload manipulation**: You can leave defaults or add:
     - **Format**: `auto`
     - **Quality**: `auto`
5. Click **"Save"**

6. **Copy the Preset name** you just created

✅ **Upload preset created!**

---

## STEP 7: Create Your .env File

1. In your project folder, create a file named `.env` (no extension, just `.env`)
2. Copy this template and fill in YOUR values:

```env
# Firebase Configuration (from Step 4)
VITE_FIREBASE_API_KEY=PASTE_YOUR_apiKey_HERE
VITE_FIREBASE_AUTH_DOMAIN=PASTE_YOUR_authDomain_HERE
VITE_FIREBASE_PROJECT_ID=PASTE_YOUR_projectId_HERE
VITE_FIREBASE_STORAGE_BUCKET=PASTE_YOUR_storageBucket_HERE
VITE_FIREBASE_MESSAGING_SENDER_ID=PASTE_YOUR_messagingSenderId_HERE
VITE_FIREBASE_APP_ID=PASTE_YOUR_appId_HERE

# Cloudinary Configuration (from Step 6)
VITE_CLOUDINARY_CLOUD_NAME=PASTE_YOUR_cloud_name_HERE
VITE_CLOUDINARY_UPLOAD_PRESET=PASTE_YOUR_preset_name_HERE
```

**Example:**
```env
# Firebase
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=soft-pin-curations.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=soft-pin-curations
VITE_FIREBASE_STORAGE_BUCKET=soft-pin-curations.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=dabc123xyz
VITE_CLOUDINARY_UPLOAD_PRESET=soft-pin-products
```

3. **Save the file**

✅ **Environment variables are configured!**

---

## STEP 8: Restart Your Dev Server

1. Stop your current dev server (Ctrl+C in terminal)
2. Run: `npm run dev`
3. The server should start with Firebase + Cloudinary connected

✅ **Everything is ready!**

---

## TEST IT OUT

1. Go to: `http://localhost:8080/admin/login`
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. Click **"Add Product"**
4. Fill in the form and **upload an image** (this will go to Cloudinary!)
5. Click **"Add Product"**
6. Go back to your main website - the product should appear!

---

## WHAT TO SEND ME

After completing the steps, send me:

**From Firebase (Step 4):**
- apiKey
- authDomain  
- projectId
- storageBucket
- messagingSenderId
- appId

**From Cloudinary (Step 6):**
- Cloud Name
- Upload Preset name

I'll create your `.env` file with all the correct values!

---

## CLOUDINARY FREE TIER LIMITS

Cloudinary's free tier includes:
- ✅ **25 GB storage**
- ✅ **25 GB bandwidth/month**
- ✅ **Unlimited transformations**
- ✅ **Perfect for this project!**

---

## TROUBLESHOOTING

**"Cloudinary configuration is missing" error:**
- Check your `.env` file has `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET`
- Make sure you restarted the dev server after creating `.env`

**"Permission denied" error (Firestore):**
- Make sure you published the Firestore rules (Step 5)

**Images not uploading:**
- Check your Cloudinary preset is set to "Unsigned"
- Verify Cloud Name and Preset name in `.env` are correct
- Check browser console for errors

**Products not showing:**
- Check browser console for errors
- Verify your `.env` file has correct Firebase values
- Make sure you restarted the dev server after creating `.env`
