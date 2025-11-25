# Screenshot OCR Setup Guide

This guide explains how Tesseract.js is used for screenshot-to-odds extraction in Bet Buddy.

## 🎯 What This Does

Upload betting screenshots (from DraftKings, FanDuel, etc.) and automatically extract:
- American odds (e.g., +150, -110)
- Decimal odds (e.g., 2.5, 1.91)
- Fractional odds (e.g., 3/2, 5/1)

Perfect for quickly importing bets from your mobile app!

## ✅ No Setup Required!

Bet Buddy uses **Tesseract.js** - a fully open-source OCR engine that runs locally in your browser/server. 

**Benefits:**
- 🆓 **Free forever** - no API keys or subscriptions needed
- 🔒 **Privacy-first** - all processing happens locally, images never leave your device
- 📴 **Offline capable** - works without internet connection
- ⚡ **Fast** - no network latency, instant processing

## 🚀 Quick Start

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
```

### 2. Test the Setup

Check if OCR is ready:
```bash
curl http://localhost:3001/api/ocr/status
```

You should see:
```json
{
  "configured": true,
  "service": "Tesseract.js (Open Source)",
  "message": "OCR service is ready - no external API keys required"
}
```

### 3. Use the OCR

Navigate to the Bet Buddy frontend and click the **"📷 Screenshot OCR"** tab to upload and extract odds from screenshots.

## 📱 Using with Mobile App

### Option 1: Direct Upload (WebView)

If your mobile app uses a WebView:
1. Navigate to the Bet Buddy frontend
2. Click the **"📷 Screenshot OCR"** tab
3. Use the file picker to upload screenshots
4. Extract odds automatically

### Option 2: API Integration

For native Android/iOS integration:

```kotlin
// Android - Upload screenshot to backend
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

```swift
// iOS - Upload screenshot to backend
func uploadScreenshot(image: UIImage) async throws -> OCRResponse {
    let url = URL(string: "http://your-backend/api/ocr/extract")!
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    
    let boundary = UUID().uuidString
    request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
    
    // Create multipart body with image data
    var body = Data()
    body.append("--\(boundary)\r\n".data(using: .utf8)!)
    body.append("Content-Disposition: form-data; name=\"image\"; filename=\"screenshot.jpg\"\r\n".data(using: .utf8)!)
    body.append("Content-Type: image/jpeg\r\n\r\n".data(using: .utf8)!)
    body.append(image.jpegData(compressionQuality: 0.8)!)
    body.append("\r\n--\(boundary)--\r\n".data(using: .utf8)!)
    
    request.httpBody = body
    
    let (data, _) = try await URLSession.shared.data(for: request)
    return try JSONDecoder().decode(OCRResponse.self, from: data)
}
```

## 💰 Pricing

**Free!** Tesseract.js is open-source software (Apache 2.0 license).

- No API keys required
- No usage limits
- No monthly fees
- No network costs

## 🔧 Troubleshooting

### "Failed to process image" Error

**Possible causes:**
1. **Unsupported image format:** Use JPG, PNG, or WebP
2. **Image too large:** Max 10MB
3. **Corrupted image file:** Try a different screenshot

### Low Confidence Scores

**Problem:** Extracted odds have low confidence

**Solutions:**
1. Take clearer screenshots
2. Ensure good lighting and contrast
3. Crop to just the odds section
4. Avoid screenshots with overlapping text

### Slow Processing

**Note:** First OCR request may take a few extra seconds as Tesseract loads language data. Subsequent requests are faster.

## 📊 Accuracy Tips

For best OCR results:
- ✅ Take screenshots in portrait orientation
- ✅ Ensure text is clearly visible
- ✅ Avoid glare or shadows
- ✅ Crop to relevant betting information
- ✅ Use high resolution (1080p+)
- ✅ Prefer dark mode screenshots (better contrast)

## 🔐 Security & Privacy

- **Local processing:** All OCR happens on your server, images never leave your infrastructure
- **No data collection:** Tesseract.js doesn't send any data externally
- **Memory only:** Images are processed in memory and not persisted to disk
- **Open source:** Full transparency - you can audit the code yourself

## 📚 Additional Resources

- [Tesseract.js Documentation](https://tesseract.projectnaptha.com/)
- [Tesseract.js GitHub](https://github.com/naptha/tesseract.js)
- [Tesseract OCR Engine](https://github.com/tesseract-ocr/tesseract)

## ❓ FAQ

**Q: Do I need any external accounts or API keys?**
A: No! Tesseract.js runs entirely locally. No external services required.

**Q: Will my screenshots be stored?**
A: No, images are processed in memory and not persisted.

**Q: Does this work offline?**
A: Yes! After the first load (which downloads language data), Tesseract.js works completely offline.

**Q: How accurate is the OCR?**
A: Tesseract.js provides good accuracy for clear screenshots. For best results, follow the accuracy tips above.

**Q: What languages are supported?**
A: Currently optimized for English. The system recognizes numbers and common odds formats.

**Q: Can I use this commercially?**
A: Yes! Tesseract.js is Apache 2.0 licensed, which allows commercial use.
