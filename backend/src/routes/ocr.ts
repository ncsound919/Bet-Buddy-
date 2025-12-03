/**
 * OCR API Routes
 * Handles screenshot upload and text extraction using Tesseract.js (open-source OCR)
 */

import { Router, Request, Response } from 'express';
import multer from 'multer';
import { extractTextFromImage, parseOddsFromOCR } from '../utils/tesseractOCR';

const router = Router();

// Configure multer for memory storage (no disk writes)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
  fileFilter: (_req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

/**
 * POST /api/ocr/extract
 * Upload a screenshot and extract text and odds
 */
router.post('/extract', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No image file provided' });
      return;
    }

    // Extract text from image using Tesseract.js
    const ocrResult = await extractTextFromImage(req.file.buffer);

    // Parse odds from extracted text
    const parsed = parseOddsFromOCR(ocrResult);

    res.json({
      success: true,
      rawText: ocrResult.rawText,
      lines: ocrResult.lines,
      extractedOdds: ocrResult.extractedOdds,
      confidence: ocrResult.confidence,
      parsedOdds: parsed.odds,
      suggestions: parsed.suggestions,
    });
  } catch (error) {
    console.error('OCR extraction error:', error);
    res.status(500).json({
      error: 'Failed to process image',
      message: (error as Error).message,
    });
  }
});

/**
 * GET /api/ocr/status
 * Check if OCR service is available (always true for Tesseract.js since it's local)
 */
router.get('/status', (_req: Request, res: Response) => {
  res.json({
    configured: true,
    service: 'Tesseract.js (Open Source)',
    message: 'OCR service is ready - no external API keys required',
  });
});

/**
 * GET /api/ocr
 * OCR API information
 */
router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Bet Buddy OCR API - Tesseract.js (Open Source)',
    message: 'Overlay Odds OCR API - Azure Computer Vision',
    version: '1.0.0',
    endpoints: {
      extract: 'POST /api/ocr/extract - Upload screenshot to extract odds',
      status: 'GET /api/ocr/status - Check if OCR is configured',
    },
    usage: {
      endpoint: '/api/ocr/extract',
      method: 'POST',
      contentType: 'multipart/form-data',
      field: 'image',
      maxFileSize: '10MB',
      acceptedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    },
    features: {
      noApiKeyRequired: true,
      offlineCapable: true,
      openSource: true,
      engine: 'Tesseract.js v5',
    },
  });
});

export default router;
