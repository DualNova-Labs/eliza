# Deployment Instructions for Eliza's Birthday Card

## Quick Deploy to Netlify

### Step 1: Upload Image to Telegraph
1. Go to https://telegra.ph
2. Click "Create a new article"
3. Upload Eliza's image (local/1762105793079.jpg)
4. Publish the article
5. Right-click on the image and copy the image URL

### Step 2: Deploy to Netlify
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select the repository: `DualNova-Labs/eliza`
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Step 3: Set Environment Variables
In Netlify's site settings, add these environment variables:

**Required:**
- `NAME` = `Eliza`
- `PIC` = `<paste-the-telegraph-image-url-here>`

**Optional:**
- `NICKNAME` = `Eliza`
- `HBD_MSG` = `Wishing you the happiest birthday, Eliza!`

### Step 4: Deploy
Click "Deploy site" and Netlify will build and deploy your birthday card!

---

## Alternative: Use a Public Image URL

If you have the image hosted elsewhere, you can use that URL directly for the `PIC` environment variable.

The image must be:
- Publicly accessible
- Preferably 1:1 aspect ratio (square)
- Will be automatically resized to 400x400px

---

## Troubleshooting

If the build fails:
1. Make sure all environment variables are set correctly
2. Ensure the PIC URL is a direct image link (ends with .jpg, .png, etc.)
3. Check the build logs for specific errors
