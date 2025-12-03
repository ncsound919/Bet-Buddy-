/**
 * Tesseract.js OCR Tool
 * Extracts text from betting screenshots using Tesseract.js (open-source, no external API required)
 */

import Tesseract from 'tesseract.js';

export interface OCRResult {
  rawText: string;
  lines: string[];
  extractedOdds: ExtractedOdds[];
  confidence: number;
}

export interface ExtractedOdds {
  text: string;
  value: number | null;
  format: 'american' | 'decimal' | 'fractional' | 'unknown';
  confidence: number;
}

/**
 * Extract text from image using Tesseract.js OCR
 * This is a fully open-source solution that runs locally - no external API keys required
 * 
 * Note: On first run, Tesseract.js downloads language data (~15MB) from CDN.
 * Subsequent runs use cached data for faster processing.
 */
export async function extractTextFromImage(imageBuffer: Buffer): Promise<OCRResult> {
  try {
    // Use Tesseract.js to recognize text from the image buffer
    const result = await Tesseract.recognize(imageBuffer, 'eng', {
      logger: () => {
        // Silent logger - we don't need progress updates
      },
    });

    // Extract text from results
    const rawText = result.data.text.trim();
    const lines: string[] = rawText
      .split('\n')
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0);

    // Extract odds from text
    const extractedOdds = extractOddsFromText(lines);

    // Use Tesseract's confidence score (0-100, convert to 0-1)
    const tesseractConfidence = result.data.confidence / 100;

    // Calculate overall confidence combining Tesseract confidence and odds extraction
    const oddsConfidence =
      extractedOdds.length > 0 ? extractedOdds.reduce((sum, odd) => sum + odd.confidence, 0) / extractedOdds.length : 0;

    // Weight both confidences
    const confidence = extractedOdds.length > 0 ? (tesseractConfidence + oddsConfidence) / 2 : tesseractConfidence;

    return {
      rawText,
      lines,
      extractedOdds,
      confidence: parseFloat(confidence.toFixed(2)),
    };
  } catch (error) {
    console.error('Tesseract OCR error:', error);
    const errorMessage = (error as Error).message;
    
    // Check if it's a network error (can happen on first run when downloading language data)
    if (errorMessage.includes('FetchError') || errorMessage.includes('ENOTFOUND') || errorMessage.includes('network')) {
      throw new Error('OCR initialization failed. On first run, Tesseract.js needs internet access to download language data. Please ensure internet connectivity and try again.');
    }
    
    throw new Error(`Failed to process image: ${errorMessage}`);
  }
}

/**
 * Extract odds values from OCR text lines
 */
function extractOddsFromText(lines: string[]): ExtractedOdds[] {
  const extractedOdds: ExtractedOdds[] = [];

  for (const line of lines) {
    const text = line.trim();
    
    // Skip empty lines
    if (!text) continue;

    // Check for American odds (e.g., +150, -110, +100)
    const americanMatch = text.match(/([+-])(\d{2,})/g);
    if (americanMatch) {
      for (const match of americanMatch) {
        const value = parseInt(match);
        // American odds should be >= 100 or <= -100
        if (Math.abs(value) >= 100) {
          extractedOdds.push({
            text: match,
            value: value,
            format: 'american',
            confidence: 0.9,
          });
        }
      }
    }

    // Check for decimal odds (e.g., 2.5, 1.85)
    const decimalMatch = text.match(/\b([1-9]\d*\.\d{1,2})\b/g);
    if (decimalMatch) {
      for (const match of decimalMatch) {
        const value = parseFloat(match);
        if (value >= 1.01 && value <= 100) {
          extractedOdds.push({
            text: match,
            value: value,
            format: 'decimal',
            confidence: 0.85,
          });
        }
      }
    }

    // Check for fractional odds (e.g., 5/2, 3/1)
    const fractionalMatch = text.match(/(\d+)\/(\d+)/g);
    if (fractionalMatch) {
      for (const match of fractionalMatch) {
        const parts = match.split('/');
        const numerator = parseInt(parts[0]);
        const denominator = parseInt(parts[1]);
        if (denominator > 0 && numerator > 0) {
          extractedOdds.push({
            text: match,
            value: numerator / denominator,
            format: 'fractional',
            confidence: 0.9,
          });
        }
      }
    }
  }

  return extractedOdds;
}

/**
 * Parse odds and return in a standardized format
 */
export function parseOddsFromOCR(ocrResult: OCRResult): {
  odds: Array<{ original: string; decimal: number; format: string }>;
  suggestions: string[];
} {
  const odds = ocrResult.extractedOdds.map(odd => {
    let decimal = odd.value || 0;
    
    // Convert to decimal format
    if (odd.format === 'american' && odd.value) {
      if (odd.value > 0) {
        decimal = odd.value / 100 + 1;
      } else {
        // For negative American odds: decimal = 1 + (100 / abs(americanOdds))
        decimal = 1 + 100 / Math.abs(odd.value);
      }
    } else if (odd.format === 'fractional' && odd.value) {
      decimal = odd.value + 1;
    }

    return {
      original: odd.text,
      decimal: parseFloat(decimal.toFixed(2)),
      format: odd.format,
    };
  });

  const suggestions: string[] = [];
  if (odds.length === 0) {
    suggestions.push('No odds detected. Try taking a clearer screenshot.');
  }
  if (ocrResult.confidence < 0.7) {
    suggestions.push('Low confidence. Please verify the extracted values.');
  }

  return { odds, suggestions };
}
