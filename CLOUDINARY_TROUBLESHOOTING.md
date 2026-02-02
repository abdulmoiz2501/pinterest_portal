# Cloudinary "Upload preset not found" Error - Fix Guide

## The Error
```
Upload preset not found
```

This means Cloudinary can't find your upload preset. Here's how to fix it:

## Solution Steps

### Step 1: Verify Preset Exists in Cloudinary

1. Go to Cloudinary Dashboard
2. Click **Settings** (gear icon) → **Upload** tab
3. Scroll to **"Upload presets"** section
4. Look for `soft-pin-products` in the list
5. **If you don't see it**, you need to create it again (see below)
6. **If you see it**, click on it to edit

### Step 2: Check Preset Configuration

When viewing/editing the preset, verify:

1. **Preset name** is exactly: `soft-pin-products` (no spaces, exact match)
2. **Signing mode** is set to: `Unsigned` ⚠️ (CRITICAL!)
3. **Status** should be: Active/Enabled
4. Click **"Save"** if you made any changes

### Step 3: Common Issues

**Issue A: Preset wasn't saved**
- Solution: Create it again and make sure to click "Save"

**Issue B: Preset name has typo**
- Solution: Either fix the preset name in Cloudinary OR update `.env` file to match exactly

**Issue C: Preset is "Signed" instead of "Unsigned"**
- Solution: Edit preset → Change "Signing mode" to "Unsigned" → Save

**Issue D: Preset is disabled**
- Solution: Make sure the preset is active/enabled

### Step 4: Verify Environment Variables

1. Make sure your `.env` file has:
```env
VITE_CLOUDINARY_CLOUD_NAME=dc2sdk2mm
VITE_CLOUDINARY_UPLOAD_PRESET=soft-pin-products
```

2. **Restart your dev server** after any `.env` changes:
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Step 5: Test with Different Preset Name

If still not working, try creating a new preset with a simpler name:

1. In Cloudinary: Settings → Upload → Upload presets
2. Click "Add upload preset"
3. Name: `products` (simpler, no dashes)
4. Signing mode: `Unsigned`
5. Save
6. Update `.env`:
```env
VITE_CLOUDINARY_UPLOAD_PRESET=products
```
7. Restart dev server

## Quick Checklist

- [ ] Preset exists in Cloudinary Dashboard
- [ ] Preset name matches exactly in `.env` file
- [ ] Preset is set to "Unsigned" mode
- [ ] Preset is saved/active
- [ ] `.env` file has correct values
- [ ] Dev server was restarted after `.env` changes
- [ ] Browser console shows correct Cloud Name and Preset values

## Still Not Working?

1. Check browser console - it should log the Cloud Name and Preset being used
2. Double-check the preset name has no extra spaces or special characters
3. Try creating a completely new preset with a different name
4. Make sure you're logged into the correct Cloudinary account


