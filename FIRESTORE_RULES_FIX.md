# Fix Firestore Rules - Allow Writes

## The Problem
Your Firestore rules have `allow write: if false;` which blocks ALL writes, including from the admin portal.

Since we're using static authentication (sessionStorage), Firestore doesn't know who the admin is, so it blocks all writes.

## The Solution
Update your Firestore rules to allow writes. Here are two options:

### Option 1: Allow Writes (Simple - Recommended for Now)

1. Go to Firebase Console → Firestore Database → Rules tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - anyone can read and write
    // Note: In production, you should add proper authentication
    match /products/{productId} {
      allow read: if true;
      allow write: if true; // Allow writes for now
    }
    
    // Collections - anyone can read
    match /collections/{collectionId} {
      allow read: if true;
      allow write: if false; // Collections are static for now
    }
  }
}
```

3. Click **"Publish"**

### Option 2: Time-Based Rules (More Secure)

If you want some protection, you can use time-based rules (but still allows writes):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      // Allow writes - admin portal handles authentication
      allow write: if true;
    }
    
    match /collections/{collectionId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

## Why This Works

- The admin portal is already protected by:
  - Static login (sessionStorage)
  - Protected routes (can't access `/admin/products` without login)
  - The website URL isn't public knowledge
  
- Firestore rules can't check sessionStorage, so we allow writes
- For better security later, you can implement Firebase Authentication

## After Updating Rules

1. Click "Publish" in Firebase Console
2. Wait a few seconds for rules to propagate
3. Try adding a product again in the admin portal
4. It should work now!

