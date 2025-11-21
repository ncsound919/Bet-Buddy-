import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ExtractedOdd {
  text: string;
  value: number | null;
  format: string;
  confidence: number;
}

interface ParsedOdd {
  original: string;
  decimal: number;
  format: string;
}

interface OCRResponse {
  success: boolean;
  rawText: string;
  lines: string[];
  extractedOdds: ExtractedOdd[];
  confidence: number;
  parsedOdds: ParsedOdd[];
  suggestions: string[];
}

function ScreenshotOCR() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OCRResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [ocrConfigured, setOcrConfigured] = useState<boolean | null>(null);

  // Check if OCR is configured on mount
  useState(() => {
    fetch(`${API_BASE}/ocr/status`)
      .then(res => res.json())
      .then(data => setOcrConfigured(data.configured))
      .catch(() => setOcrConfigured(false));
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError('');
      setResult(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(`${API_BASE}/ocr/extract`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.message || data.error || 'Failed to process image');
      }
    } catch (err) {
      setError(`Upload failed: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview('');
    setResult(null);
    setError('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>📷 Screenshot OCR</h1>
      <p>Upload a betting screenshot to automatically extract odds using Azure Computer Vision</p>

      {ocrConfigured === false && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
          <strong>⚠️ OCR Not Configured</strong>
          <p style={{ margin: '10px 0 0 0' }}>
            Azure Computer Vision credentials are not set. Please configure AZURE_VISION_ENDPOINT and
            AZURE_VISION_KEY in your backend .env file.
          </p>
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ marginRight: '10px' }}
          disabled={loading}
        />
        <button
          onClick={handleUpload}
          disabled={!selectedFile || loading || ocrConfigured === false}
          style={{
            padding: '8px 16px',
            marginRight: '10px',
            backgroundColor: loading || !selectedFile || ocrConfigured === false ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading || !selectedFile || ocrConfigured === false ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '⏳ Processing...' : '🔍 Extract Odds'}
        </button>
        <button
          onClick={handleClear}
          disabled={loading}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          Clear
        </button>
      </div>

      {preview && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Preview:</h3>
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '400px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
      )}

      {error && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
            marginBottom: '20px',
            color: '#721c24',
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div>
          <h3>📊 Extracted Results</h3>

          {result.suggestions.length > 0 && (
            <div
              style={{
                padding: '10px',
                backgroundColor: '#d1ecf1',
                border: '1px solid #bee5eb',
                borderRadius: '4px',
                marginBottom: '15px',
              }}
            >
              <strong>💡 Suggestions:</strong>
              <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
                {result.suggestions.map((suggestion, idx) => (
                  <li key={idx}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          <div
            style={{
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              marginBottom: '15px',
            }}
          >
            <p>
              <strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%
            </p>
            <p>
              <strong>Odds Found:</strong> {result.parsedOdds.length}
            </p>
          </div>

          {result.parsedOdds.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h4>🎯 Detected Odds:</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#e0e0e0' }}>
                    <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Original</th>
                    <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Format</th>
                    <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Decimal</th>
                  </tr>
                </thead>
                <tbody>
                  {result.parsedOdds.map((odd, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{odd.original}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        {odd.format.charAt(0).toUpperCase() + odd.format.slice(1)}
                      </td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{odd.decimal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <details style={{ marginTop: '20px' }}>
            <summary style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
              📝 View Raw Text ({result.lines.length} lines)
            </summary>
            <pre
              style={{
                padding: '15px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                marginTop: '10px',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
              }}
            >
              {result.rawText}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}

export default ScreenshotOCR;
