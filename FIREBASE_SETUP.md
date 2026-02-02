# Firebase Setup Guide

This guide will help you set up Firebase for the admin portal and product management.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard:
   - Enter a project name
   - Enable/disable Google Analytics (optional)
   - Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project, go to **Firestore Database** in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development) or "Start in production mode" (for production)
4. Select a location for your database
5. Click "Enable"

## Step 3: Enable Firebase Storage

1. In your Firebase project, go to **Storage** in the left sidebar
2. Click "Get started"
3. Review the security rules (default is fine for development)
4. Select a location (should match your Firestore location)
5. Click "Done"

## Step 4: Get Your Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon `</>` to add a web app
5. Register your app with a nickname (e.g., "Soft Pin Curations")
6. Copy the `firebaseConfig` object values

## Step 5: Configure Environment Variables

1. Create a `.env` file in the root of your project (copy from `.env.example`)
2. Add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

## Step 6: Set Up Firestore Security Rules (Important!)

1. Go to **Firestore Database** > **Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products collection - read for all, write for authenticated admin
    match /products/{productId} {
      allow read: if true; // Anyone can read products
      allow write: if false; // Only through admin portal (you can add Firebase Auth later)
    }
    
    // Collections collection - read for all
    match /collections/{collectionId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

**Note:** For production, you should implement proper authentication. The admin portal currently uses static login (sessionStorage).

## Step 7: Set Up Storage Security Rules

1. Go to **Storage** > **Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true; // Anyone can read images
      allow write: if false; // Only through admin portal
    }
  }
}
```

## Step 8: Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to `/admin/login`
3. Login with default credentials:
   - Username: `admin`
   - Password: `admin123`
4. Try adding a product with an image upload

## Admin Portal Access

- **URL**: `http://localhost:8080/admin/login`
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin123`

**⚠️ IMPORTANT:** Change the admin password in production by editing `src/pages/admin/Login.tsx`

## Troubleshooting

### "Firebase: Error (auth/unauthorized-domain)"
- Add your domain to Firebase Console > Authentication > Settings > Authorized domains

### "Permission denied" errors
- Check your Firestore and Storage security rules
- Make sure they allow read operations

### Images not uploading
- Check Storage rules allow writes
- Verify your Storage bucket is properly configured
- Check browser console for errors

## Next Steps

1. **Change admin credentials** - Update the static login in `src/pages/admin/Login.tsx`
2. **Implement Firebase Authentication** - Replace static login with Firebase Auth for better security
3. **Add collections management** - Extend the admin portal to manage collections
4. **Set up production rules** - Configure proper security rules for production


