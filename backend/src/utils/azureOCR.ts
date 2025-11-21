/**
 * Azure Computer Vision OCR Tool
 * Extracts text from betting screenshots using Azure Computer Vision API
 */

import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';

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
 * Initialize Azure Computer Vision client
 */
function getVisionClient(): ComputerVisionClient | null {
  const endpoint = process.env.AZURE_VISION_ENDPOINT;
  const apiKey = process.env.AZURE_VISION_KEY;

  if (!endpoint || !apiKey) {
    console.warn('Azure Computer Vision credentials not configured');
    return null;
  }

  const credentials = new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': apiKey } });
  return new ComputerVisionClient(credentials, endpoint);
}

/**
 * Extract text from image using Azure Computer Vision OCR
 */
export async function extractTextFromImage(imageBuffer: Buffer): Promise<OCRResult> {
  const client = getVisionClient();

  if (!client) {
    throw new Error('Azure Computer Vision not configured. Please set AZURE_VISION_ENDPOINT and AZURE_VISION_KEY environment variables.');
  }

  try {
    // Use Read API for better accuracy
    const readResult = await client.readInStream(imageBuffer);
    
    // Get operation location from headers
    const operationLocation = readResult._response.headers.get('operation-location');
    if (!operationLocation) {
      throw new Error('Failed to get operation location from Azure response');
    }

    // Extract operation ID from the URL
    const operationId = operationLocation.split('/').pop();
    if (!operationId) {
      throw new Error('Failed to extract operation ID');
    }

    // Poll for results
    let result = await client.getReadResult(operationId);
    let attempts = 0;
    const maxAttempts = 20;

    while (result.status === 'running' || result.status === 'notStarted') {
      if (attempts >= maxAttempts) {
        throw new Error('OCR operation timed out');
      }
      await new Promise(resolve => setTimeout(resolve, 500));
      result = await client.getReadResult(operationId);
      attempts++;
    }

    if (result.status !== 'succeeded') {
      throw new Error(`OCR operation failed with status: ${result.status}`);
    }

    // Extract text from results
    const lines: string[] = [];
    let rawText = '';

    if (result.analyzeResult?.readResults) {
      for (const page of result.analyzeResult.readResults) {
        if (page.lines) {
          for (const line of page.lines) {
            lines.push(line.text || '');
            rawText += (line.text || '') + '\n';
          }
        }
      }
    }

    // Extract odds from text
    const extractedOdds = extractOddsFromText(lines);

    // Calculate overall confidence
    const confidence = extractedOdds.length > 0
      ? extractedOdds.reduce((sum, odd) => sum + odd.confidence, 0) / extractedOdds.length
      : 0;

    return {
      rawText: rawText.trim(),
      lines,
      extractedOdds,
      confidence: parseFloat(confidence.toFixed(2)),
    };
  } catch (error) {
    console.error('Azure OCR error:', error);
    throw new Error(`Failed to process image: ${(error as Error).message}`);
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

    // Check for American odds (e.g., +150, -110)
    const americanMatch = text.match(/([+-])(\d{3,})/g);
    if (americanMatch) {
      for (const match of americanMatch) {
        const value = parseInt(match);
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
        decimal = 1 - 100 / odd.value;
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
