import { useState } from 'react';
import ScreenshotOCR from './ScreenshotOCR';

// Use environment variable or fallback to localhost for development
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/tools';

function ToolsDemo() {
  const [activeTab, setActiveTab] = useState<'odds' | 'stats' | 'validator' | 'export' | 'ocr'>('odds');
  const [result, setResult] = useState<string>('');

  // Odds Calculator Demo
  const testOddsConversion = async () => {
    try {
      const response = await fetch(`${API_BASE}/odds/convert/decimal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decimal: 2.5 }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  const testReturnCalculation = async () => {
    try {
      const response = await fetch(`${API_BASE}/odds/calculate-return`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stake: 100, odds: 2.5 }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  // Statistics Demo
  const testStatistics = async () => {
    try {
      const sampleBets = [
        { stake: 10, odds: 2.0, won: true },
        { stake: 10, odds: 2.5, won: false },
        { stake: 10, odds: 1.5, won: true },
        { stake: 10, odds: 3.0, won: true },
      ];
      const response = await fetch(`${API_BASE}/statistics/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bets: sampleBets }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  const testKellyCriterion = async () => {
    try {
      const response = await fetch(`${API_BASE}/statistics/kelly-criterion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ winProbability: 0.55, odds: 2.0 }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  // Validator Demo
  const testBetValidation = async () => {
    try {
      const response = await fetch(`${API_BASE}/validate/bet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stake: 50,
          odds: 2.0,
          result: true,
          date: new Date().toISOString(),
        }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  const testInvalidBet = async () => {
    try {
      const response = await fetch(`${API_BASE}/validate/bet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stake: -10, // Invalid negative stake
          odds: 0.5, // Invalid odds < 1
          result: true,
        }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  // Export Demo
  const testExport = async (format: string) => {
    try {
      const sampleBets = [
        { date: '2024-01-01', stake: 10, odds: 2.0, result: true, profit: 10 },
        { date: '2024-01-02', stake: 20, odds: 1.5, result: false, profit: -20 },
        { date: '2024-01-03', stake: 15, odds: 3.0, result: true, profit: 30 },
      ];
      const response = await fetch(`${API_BASE}/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bets: sampleBets, format }),
      });
      const data = await response.text();
      setResult(data);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>📊 Overlay Odds Tools</h1>
      <p>
        Professional utilities for betting analysis and data management - no external dependencies!
      </p>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('ocr')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: activeTab === 'ocr' ? '#4CAF50' : '#ddd',
            color: activeTab === 'ocr' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          📷 Screenshot OCR
        </button>
        <button
          onClick={() => setActiveTab('odds')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: activeTab === 'odds' ? '#4CAF50' : '#ddd',
            color: activeTab === 'odds' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Odds Calculator
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: activeTab === 'stats' ? '#4CAF50' : '#ddd',
            color: activeTab === 'stats' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Statistics Engine
        </button>
        <button
          onClick={() => setActiveTab('validator')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: activeTab === 'validator' ? '#4CAF50' : '#ddd',
            color: activeTab === 'validator' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Data Validator
        </button>
        <button
          onClick={() => setActiveTab('export')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'export' ? '#4CAF50' : '#ddd',
            color: activeTab === 'export' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Data Exporter
        </button>
      </div>

      {activeTab === 'ocr' && (
        <div>
          <ScreenshotOCR />
        </div>
      )}

      {activeTab === 'odds' && (
        <div>
          <h2>📊 Odds Calculator</h2>
          <p>Convert between different odds formats and calculate returns</p>
          <button
            onClick={testOddsConversion}
            style={{
              padding: '8px 16px',
              marginRight: '10px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Convert Decimal Odds (2.5)
          </button>
          <button
            onClick={testReturnCalculation}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Calculate Return ($100 @ 2.5)
          </button>
        </div>
      )}

      {activeTab === 'stats' && (
        <div>
          <h2>📈 Statistics Engine</h2>
          <p>Analyze betting performance with advanced metrics</p>
          <button
            onClick={testStatistics}
            style={{
              padding: '8px 16px',
              marginRight: '10px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Calculate Statistics
          </button>
          <button
            onClick={testKellyCriterion}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Kelly Criterion (55% @ 2.0)
          </button>
        </div>
      )}

      {activeTab === 'validator' && (
        <div>
          <h2>✅ Data Validator</h2>
          <p>Validate betting data before saving</p>
          <button
            onClick={testBetValidation}
            style={{
              padding: '8px 16px',
              marginRight: '10px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Validate Valid Bet
          </button>
          <button
            onClick={testInvalidBet}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Validate Invalid Bet
          </button>
        </div>
      )}

      {activeTab === 'export' && (
        <div>
          <h2>💾 Data Exporter</h2>
          <p>Export your betting data in multiple formats</p>
          <button
            onClick={() => testExport('csv')}
            style={{
              padding: '8px 16px',
              marginRight: '10px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Export as CSV
          </button>
          <button
            onClick={() => testExport('json')}
            style={{
              padding: '8px 16px',
              marginRight: '10px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Export as JSON
          </button>
          <button
            onClick={() => testExport('markdown')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Export as Markdown
          </button>
        </div>
      )}

      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          minHeight: '200px',
        }}
      >
        <h3>Result:</h3>
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{result || 'Click a button to test a tool'}</pre>
      </div>
    </div>
  );
}

export default ToolsDemo;
