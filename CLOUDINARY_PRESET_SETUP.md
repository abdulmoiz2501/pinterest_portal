# Cloudinary Upload Preset Setup - Quick Guide

## Step 6c: Create Upload Preset

1. In Cloudinary Dashboard, click **"Settings"** (gear icon ⚙️ in top right)
2. Click **"Upload"** tab (in the left sidebar of Settings)
3. Scroll down to **"Upload presets"** section
4. Click **"Add upload preset"** button
5. Fill in the form:
   - **Preset name**: `soft-pin-products` (or any name you like)
   - **Signing mode**: Select **"Unsigned"** ⚠️ (THIS IS CRITICAL!)
   - **Folder**: `products` (optional, but helps organize)
   - **Upload manipulation** (optional, but recommended):
     - **Format**: `auto` (auto-optimize format)
     - **Quality**: `auto` (auto-optimize quality)
6. Click **"Save"** button at the bottom

✅ **You now have an Upload Preset!**

## What to Send Me

After creating the preset, send me:
- **Preset name** (the name you entered, e.g., `soft-pin-products`)

I already have your Cloud Name: `dc2sdk2mm`

I'll update your `.env` file with both values!


