# Screenshot OCR Setup Guide

This guide explains how to set up Azure Computer Vision for screenshot-to-odds extraction in Overlay Odds.

## 🎯 What This Does

Upload betting screenshots (from DraftKings, FanDuel, etc.) and automatically extract:
- American odds (e.g., +150, -110)
- Decimal odds (e.g., 2.5, 1.91)
- Fractional odds (e.g., 3/2, 5/1)

Perfect for quickly importing bets from your Android app!

## 📋 Prerequisites

- Microsoft Azure account (free tier available)
- Credit card for verification (not charged unless you exceed free tier)

## 🚀 Setup Steps

### 1. Create Azure Computer Vision Resource

1. Go to [Azure Portal](https://portal.azure.com/)
2. Click **"Create a resource"**
3. Search for **"Computer Vision"**
4. Click **"Create"**

### 2. Configure the Resource

Fill in the details:
- **Subscription:** Your Azure subscription
- **Resource group:** Create new or use existing
- **Region:** Choose closest to you (e.g., East US, West Europe)
- **Name:** `overlay-odds-ocr` (or any name you prefer)
- **Pricing tier:** **Free F0** (5,000 transactions/month)

Click **"Review + create"** then **"Create"**

### 3. Get Your Credentials

Once deployed:
1. Go to your Computer Vision resource
2. Click **"Keys and Endpoint"** in the left menu
3. Copy:
   - **Endpoint** (e.g., `https://overlay-odds-ocr.cognitiveservices.azure.com/`)
   - **Key 1** (your subscription key)

### 4. Configure Overlay Odds Backend

Add to your `backend/.env` file:

```env
# Azure Computer Vision for OCR
AZURE_VISION_ENDPOINT=https://your-resource.cognitiveservices.azure.com/
AZURE_VISION_KEY=your-subscription-key-here
```

### 5. Restart Backend

```bash
cd backend
npm run dev
```

### 6. Test the Setup

Check if OCR is configured:
```bash
curl http://localhost:3001/api/ocr/status
```

You should see:
```json
{
  "configured": true,
  "service": "Azure Computer Vision",
  "message": "OCR service is ready"
}
```

## 📱 Using with Android App

### Option 1: Direct Upload (WebView)

If your Android app uses a WebView:
1. Navigate to the Overlay Odds frontend
2. Click the **"📷 Screenshot OCR"** tab
3. Use the file picker to upload screenshots
4. Extract odds automatically

### Option 2: API Integration

For native Android integration:

```kotlin
// Upload screenshot to backend
fun uploadScreenshot(imageFile: File) {
    val requestBody = MultipartBody.Builder()
        .setType(MultipartBody.FORM)
        .addFormDataPart(
            "image", 
            imageFile.name,
            imageFile.asRequestBody("image/*".toMediaType())
        )
        .build()
    
    val request = Request.Builder()
        .url("http://your-backend/api/ocr/extract")
        .post(requestBody)
        .build()
    
    // Handle response with extracted odds
}
```

## 💰 Pricing

**Free Tier (F0):**
- 5,000 transactions/month
- 20 transactions/minute
- Perfect for personal use

**Paid Tier (S1):** (if you exceed free tier)
- $1.00 per 1,000 transactions
- Up to 10M transactions/month

## 🔧 Troubleshooting

### "OCR Not Configured" Warning

**Problem:** Frontend shows yellow warning box

**Solution:**
1. Check that `AZURE_VISION_ENDPOINT` and `AZURE_VISION_KEY` are set in `.env`
2. Restart the backend server
3. Verify credentials at `http://localhost:3001/api/ocr/status`

### "Failed to process image" Error

**Problem:** Upload fails with error

**Possible causes:**
1. **Invalid credentials:** Double-check endpoint and key
2. **Rate limit exceeded:** Wait or upgrade to paid tier
3. **Unsupported image format:** Use JPG, PNG, or WebP
4. **Image too large:** Max 10MB

### Low Confidence Scores

**Problem:** Extracted odds have low confidence

**Solutions:**
1. Take clearer screenshots
2. Ensure good lighting and contrast
3. Crop to just the odds section
4. Avoid screenshots with overlapping text

## 📊 Accuracy Tips

For best OCR results:
- ✅ Take screenshots in portrait orientation
- ✅ Ensure text is clearly visible
- ✅ Avoid glare or shadows
- ✅ Crop to relevant betting information
- ✅ Use high resolution (1080p+)

## 🔐 Security

- Keys are stored in `.env` (never commit to git)
- All requests use HTTPS
- Azure handles all data processing securely
- Images are not stored after processing

## 🌐 Alternative: Manual Input

If you prefer not to use Azure OCR:
- Use the other Overlay Odds tools to manually input data
- The odds calculator and validator help speed up data entry
- No external dependencies required

## 📚 Additional Resources

- [Azure Computer Vision Documentation](https://learn.microsoft.com/en-us/azure/cognitive-services/computer-vision/)
- [Azure Free Account](https://azure.microsoft.com/free/)
- [OCR API Reference](https://learn.microsoft.com/en-us/rest/api/computervision/)

## ❓ FAQ

**Q: Do I need a paid Azure subscription?**
A: No, the free tier is sufficient for most personal use.

**Q: Will my screenshots be stored?**
A: No, images are processed in memory and not persisted.

**Q: Can I use a different OCR service?**
A: Yes, you can implement a different OCR provider by modifying `backend/src/utils/azureOCR.ts`

**Q: Does this work offline?**
A: No, Azure Computer Vision requires an internet connection. For offline use, consider Tesseract.js (less accurate).

**Q: What about privacy?**
A: Azure processes data securely according to their privacy policy. For maximum privacy, use manual input instead.
