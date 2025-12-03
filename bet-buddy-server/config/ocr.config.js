// OCR service configuration
// Supports multiple OCR providers

const OCR_PROVIDERS = {
  GOOGLE_VISION: 'google_vision',
  AWS_TEXTRACT: 'aws_textract',
  AZURE_VISION: 'azure_vision',
  TESSERACT: 'tesseract',
}

const OCR_CONFIG = {
  provider: process.env.OCR_PROVIDER || OCR_PROVIDERS.GOOGLE_VISION,
  
  // Google Cloud Vision
  googleVision: {
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  },
  
  // AWS Textract
  awsTextract: {
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  
  // Azure Computer Vision
  azureVision: {
    endpoint: process.env.AZURE_VISION_ENDPOINT,
    apiKey: process.env.AZURE_VISION_API_KEY,
  },
  
  // Tesseract.js (client-side or node)
  tesseract: {
    lang: 'eng',
    oem: 1,
    psm: 3,
  },
}

// Confidence threshold for OCR results
const CONFIDENCE_THRESHOLD = 0.7

// Parsing patterns for extracting bet information
const BET_PATTERNS = {
  teams: [
    /([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)\s+(?:vs\.?|@)\s+([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/i,
    /([A-Z]{2,})\s+(?:vs\.?|@)\s+([A-Z]{2,})/,
  ],
  
  odds: [
    /([+-]\d{3,})/,
    /(\d+\.\d{2})/,
    /(\d+\/\d+)/,
  ],
  
  stake: [
    /\$(\d+(?:\.\d{2})?)/,
    /(\d+(?:\.\d{2})?)\s*(?:dollars|usd)/i,
  ],
  
  type: [
    /\b(ML|moneyline)\b/i,
    /\b(spread|point spread)\b/i,
    /\b(parlay|multi)\b/i,
    /\b(over|under|o\/u|total)\b/i,
    /\b(prop|proposition)\b/i,
  ],
}

// Initialize OCR client based on provider
function initializeOCRClient() {
  const provider = OCR_CONFIG.provider
  
  switch (provider) {
    case OCR_PROVIDERS.GOOGLE_VISION:
      // const vision = require('@google-cloud/vision')
      // return new vision.ImageAnnotatorClient({
      //   keyFilename: OCR_CONFIG.googleVision.keyFilename,
      // })
      return null
      
    case OCR_PROVIDERS.AWS_TEXTRACT:
      // const AWS = require('aws-sdk')
      // AWS.config.update({
      //   region: OCR_CONFIG.awsTextract.region,
      //   accessKeyId: OCR_CONFIG.awsTextract.accessKeyId,
      //   secretAccessKey: OCR_CONFIG.awsTextract.secretAccessKey,
      // })
      // return new AWS.Textract()
      return null
      
    case OCR_PROVIDERS.AZURE_VISION:
      // const { ComputerVisionClient } = require('@azure/cognitiveservices-computervision')
      // const { ApiKeyCredentials } = require('@azure/ms-rest-js')
      // return new ComputerVisionClient(
      //   new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': OCR_CONFIG.azureVision.apiKey } }),
      //   OCR_CONFIG.azureVision.endpoint
      // )
      return null
      
    default:
      throw new Error(`Unsupported OCR provider: ${provider}`)
  }
}

module.exports = {
  OCR_PROVIDERS,
  OCR_CONFIG,
  CONFIDENCE_THRESHOLD,
  BET_PATTERNS,
  initializeOCRClient,
}
