import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/tools';

interface StakeSuggestion {
  suggestedStake: number;
  maxStake: number;
  minStake: number;
  riskLevel: string;
  reasoning: string;
}

interface StopLevels {
  stopLoss: number;
  stopLossPercentage: number;
  takeProfit: number;
  takeProfitPercentage: number;
  recommendations: string[];
}

interface ResponsibleGamblingData {
  tips: string[];
  resources: { name: string; description: string; url: string }[];
}

function BankrollManager() {
  const [bankroll, setBankroll] = useState<string>('1000');
  const [odds, setOdds] = useState<string>('2.0');
  const [winProbability, setWinProbability] = useState<string>('0.55');
  const [riskTolerance, setRiskTolerance] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');

  const [stakeSuggestion, setStakeSuggestion] = useState<StakeSuggestion | null>(null);
  const [flatStake, setFlatStake] = useState<number | null>(null);
  const [stopLevels, setStopLevels] = useState<StopLevels | null>(null);
  const [responsibleGamblingData, setResponsibleGamblingData] = useState<ResponsibleGamblingData | null>(null);

  const [activeTab, setActiveTab] = useState<'calculator' | 'limits' | 'tips'>('calculator');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Fetch responsible gambling tips on mount
  useEffect(() => {
    fetch(`${API_BASE}/bankroll/responsible-gambling`)
      .then((res) => res.json())
      .then((data) => setResponsibleGamblingData(data))
      .catch(() => console.error('Failed to fetch responsible gambling tips'));
  }, []);

  const calculateStakes = async () => {
    setLoading(true);
    setError('');

    try {
      // Calculate suggested stake
      const stakeResponse = await fetch(`${API_BASE}/bankroll/suggested-stake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bankroll: parseFloat(bankroll),
          odds: parseFloat(odds),
          estimatedWinProbability: parseFloat(winProbability),
          riskTolerance,
        }),
      });

      if (!stakeResponse.ok) {
        const err = await stakeResponse.json();
        throw new Error(err.error || 'Failed to calculate stake');
      }

      const stakeData = await stakeResponse.json();
      setStakeSuggestion(stakeData);

      // Calculate flat stake
      const flatResponse = await fetch(`${API_BASE}/bankroll/flat-stake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bankroll: parseFloat(bankroll),
          riskTolerance,
        }),
      });

      if (flatResponse.ok) {
        const flatData = await flatResponse.json();
        setFlatStake(flatData.suggestedStake);
      }

      // Calculate stop levels
      const stopResponse = await fetch(`${API_BASE}/bankroll/stop-levels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bankroll: parseFloat(bankroll),
          riskTolerance,
        }),
      });

      if (stopResponse.ok) {
        const stopData = await stopResponse.json();
        setStopLevels(stopData);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'conservative':
        return '#4CAF50';
      case 'moderate':
        return '#FF9800';
      case 'aggressive':
        return '#f44336';
      default:
        return '#888';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>💰 Bankroll Manager</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Calculate optimal stake sizes and manage your bankroll responsibly.
      </p>

      {/* Tabs */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setActiveTab('calculator')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'calculator' ? '#4CAF50' : '#e0e0e0',
            color: activeTab === 'calculator' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          🧮 Stake Calculator
        </button>
        <button
          onClick={() => setActiveTab('limits')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'limits' ? '#4CAF50' : '#e0e0e0',
            color: activeTab === 'limits' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          🎯 Stop Levels
        </button>
        <button
          onClick={() => setActiveTab('tips')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'tips' ? '#4CAF50' : '#e0e0e0',
            color: activeTab === 'tips' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          💡 Responsible Gambling
        </button>
      </div>

      {activeTab === 'calculator' && (
        <div>
          {/* Input Form */}
          <div
            style={{
              backgroundColor: '#f9f9f9',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
              }}
            >
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Bankroll ($)
                </label>
                <input
                  type="number"
                  value={bankroll}
                  onChange={(e) => setBankroll(e.target.value)}
                  min="1"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Decimal Odds
                </label>
                <input
                  type="number"
                  value={odds}
                  onChange={(e) => setOdds(e.target.value)}
                  min="1.01"
                  step="0.01"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Win Probability (0-1)
                </label>
                <input
                  type="number"
                  value={winProbability}
                  onChange={(e) => setWinProbability(e.target.value)}
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Risk Tolerance
                </label>
                <select
                  value={riskTolerance}
                  onChange={(e) =>
                    setRiskTolerance(e.target.value as 'conservative' | 'moderate' | 'aggressive')
                  }
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                  }}
                >
                  <option value="conservative">Conservative (1%)</option>
                  <option value="moderate">Moderate (2%)</option>
                  <option value="aggressive">Aggressive (5%)</option>
                </select>
              </div>
            </div>

            <button
              onClick={calculateStakes}
              disabled={loading}
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                backgroundColor: loading ? '#ccc' : '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
              }}
            >
              {loading ? 'Calculating...' : 'Calculate Optimal Stake'}
            </button>
          </div>

          {error && (
            <div
              style={{
                padding: '15px',
                backgroundColor: '#f8d7da',
                border: '1px solid #f5c6cb',
                borderRadius: '4px',
                color: '#721c24',
                marginBottom: '20px',
              }}
            >
              {error}
            </div>
          )}

          {/* Results */}
          {stakeSuggestion && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
              }}
            >
              {/* Kelly-Based Suggestion */}
              <div
                style={{
                  backgroundColor: '#e8f5e9',
                  border: '1px solid #4CAF50',
                  borderRadius: '8px',
                  padding: '20px',
                }}
              >
                <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🎯 Suggested Stake (Kelly)
                </h3>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4CAF50' }}>
                  ${stakeSuggestion.suggestedStake.toFixed(2)}
                </div>
                <div style={{ marginTop: '10px', color: '#666' }}>
                  <span
                    style={{
                      padding: '4px 8px',
                      backgroundColor: getRiskColor(stakeSuggestion.riskLevel),
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '12px',
                    }}
                  >
                    {stakeSuggestion.riskLevel}
                  </span>
                </div>
                <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
                  {stakeSuggestion.reasoning}
                </p>
                <div style={{ marginTop: '15px', fontSize: '12px', color: '#888' }}>
                  Range: ${stakeSuggestion.minStake.toFixed(2)} - ${stakeSuggestion.maxStake.toFixed(2)}
                </div>
              </div>

              {/* Flat Stake */}
              <div
                style={{
                  backgroundColor: '#e3f2fd',
                  border: '1px solid #2196F3',
                  borderRadius: '8px',
                  padding: '20px',
                }}
              >
                <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📊 Flat Stake (Simple)
                </h3>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2196F3' }}>
                  ${flatStake?.toFixed(2) || '—'}
                </div>
                <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
                  Fixed percentage of bankroll without considering edge. Use when unsure of win probability.
                </p>
                <div style={{ marginTop: '15px', fontSize: '12px', color: '#888' }}>
                  Based on {riskTolerance} risk profile
                </div>
              </div>

              {/* Expected Value */}
              <div
                style={{
                  backgroundColor: '#fff3e0',
                  border: '1px solid #FF9800',
                  borderRadius: '8px',
                  padding: '20px',
                }}
              >
                <h3 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📈 Expected Value
                </h3>
                {(() => {
                  const p = parseFloat(winProbability);
                  const o = parseFloat(odds);
                  const stake = stakeSuggestion.suggestedStake;
                  const ev = p * stake * (o - 1) - (1 - p) * stake;
                  const evPercent = (ev / stake) * 100;
                  return (
                    <>
                      <div
                        style={{
                          fontSize: '32px',
                          fontWeight: 'bold',
                          color: ev >= 0 ? '#4CAF50' : '#f44336',
                        }}
                      >
                        {ev >= 0 ? '+' : ''}${ev.toFixed(2)}
                      </div>
                      <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
                        {evPercent >= 0
                          ? `Positive EV (+${evPercent.toFixed(1)}%). Long-term profitable bet.`
                          : `Negative EV (${evPercent.toFixed(1)}%). Consider skipping this bet.`}
                      </p>
                    </>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'limits' && stopLevels && (
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            {/* Stop Loss */}
            <div
              style={{
                backgroundColor: '#ffebee',
                border: '1px solid #f44336',
                borderRadius: '8px',
                padding: '20px',
              }}
            >
              <h3 style={{ margin: '0 0 15px 0', color: '#c62828' }}>🛑 Stop Loss Level</h3>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f44336' }}>
                ${stopLevels.stopLoss.toFixed(2)}
              </div>
              <p style={{ marginTop: '10px', color: '#666' }}>
                Stop betting for the day if your bankroll drops to this level (-
                {stopLevels.stopLossPercentage}%)
              </p>
            </div>

            {/* Take Profit */}
            <div
              style={{
                backgroundColor: '#e8f5e9',
                border: '1px solid #4CAF50',
                borderRadius: '8px',
                padding: '20px',
              }}
            >
              <h3 style={{ margin: '0 0 15px 0', color: '#2e7d32' }}>🎉 Take Profit Level</h3>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4CAF50' }}>
                ${stopLevels.takeProfit.toFixed(2)}
              </div>
              <p style={{ marginTop: '10px', color: '#666' }}>
                Consider locking in profits when your bankroll reaches this level (+
                {stopLevels.takeProfitPercentage}%)
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div
            style={{
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              padding: '20px',
            }}
          >
            <h3 style={{ margin: '0 0 15px 0' }}>📋 Session Recommendations</h3>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {stopLevels.recommendations.map((rec, idx) => (
                <li key={idx} style={{ marginBottom: '10px', color: '#666' }}>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'limits' && !stopLevels && (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            color: '#666',
          }}
        >
          <p>Calculate your stake first to see stop levels.</p>
          <button
            onClick={() => setActiveTab('calculator')}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Go to Calculator
          </button>
        </div>
      )}

      {activeTab === 'tips' && responsibleGamblingData && (
        <div>
          {/* Tips */}
          <div
            style={{
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px',
            }}
          >
            <h3 style={{ margin: '0 0 15px 0' }}>💡 Tips for Responsible Gambling</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '10px',
              }}
            >
              {responsibleGamblingData.tips.map((tip, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#fff',
                    padding: '15px',
                    borderRadius: '4px',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <span style={{ marginRight: '10px' }}>✅</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div
            style={{
              backgroundColor: '#e3f2fd',
              borderRadius: '8px',
              padding: '20px',
            }}
          >
            <h3 style={{ margin: '0 0 15px 0' }}>🆘 Help Resources</h3>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              If you or someone you know needs help with problem gambling:
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '15px',
              }}
            >
              {responsibleGamblingData.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#fff',
                    padding: '15px',
                    borderRadius: '4px',
                    border: '1px solid #2196F3',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                  }}
                >
                  <div style={{ fontWeight: 'bold', color: '#2196F3', marginBottom: '5px' }}>
                    {resource.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>{resource.description}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BankrollManager;
