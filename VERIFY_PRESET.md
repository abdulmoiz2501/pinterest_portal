# Verify Cloudinary Preset - Step by Step

The error "Upload preset not found" means Cloudinary can't find your preset. Let's verify it exists:

## Step 1: Check Preset in Cloudinary Dashboard

1. Go to https://console.cloudinary.com/
2. Login to your account
3. Click **Settings** (gear icon ⚙️ in top right)
4. Click **Upload** tab (left sidebar)
5. Scroll down to **"Upload presets"** section
6. **Look for `soft-pin-products` in the list**

## Step 2: If Preset is Missing

If you DON'T see `soft-pin-products`:

1. Click **"Add upload preset"** button
2. Fill in:
   - **Preset name**: `soft-pin-products` (exactly this, no spaces)
   - **Signing mode**: Select **"Unsigned"** from dropdown
   - **Folder**: `products` (optional)
3. **Scroll down and click "Save"** (important!)
4. Wait for confirmation

## Step 3: If Preset Exists But Still Not Working

1. Click on the preset name to **edit** it
2. Verify:
   - **Signing mode** is **"Unsigned"** (not "Signed")
   - **Preset name** is exactly `soft-pin-products`
3. If anything is wrong, fix it and click **"Save"**
4. If everything looks correct, try **deleting and recreating** it

## Step 4: Alternative - Create New Preset with Different Name

If still not working, let's try a simpler name:

1. Create a NEW preset:
   - Name: `products` (simple, no dashes)
   - Signing mode: **Unsigned**
   - Save it
2. Tell me the new preset name
3. I'll update the `.env` file

## Step 5: Verify Account

Make sure you're logged into the correct Cloudinary account:
- Cloud Name should be: `dc2sdk2mm`
- Check the top of the dashboard - does it show this cloud name?

## Common Mistakes

❌ **Preset name has extra spaces**: `soft-pin-products ` (with trailing space)
✅ **Correct**: `soft-pin-products`

❌ **Preset is "Signed" instead of "Unsigned"**
✅ **Must be "Unsigned"**

❌ **Didn't click "Save" after creating**
✅ **Must click "Save" button**

❌ **Wrong Cloudinary account**
✅ **Must be logged into account with cloud name `dc2sdk2mm`**

## Quick Test

After verifying/creating the preset:
1. Refresh your browser
2. Try uploading an image again
3. Check browser console for the detailed error (I added better logging)

If it STILL doesn't work, send me:
- Screenshot of your Upload presets list
- Or tell me what you see when you click on the preset to edit it


