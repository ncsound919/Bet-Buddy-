/**
 * Settings Page Component
 * Customizable tool access and API integration settings
 */

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { ToolSettings, APIIntegration } from '../types';

interface SettingsPageProps {
  onClose?: () => void;
}

function SettingsPage({ onClose }: SettingsPageProps) {
  const { state, dispatch, updateToolSettings, updateAPIIntegration } = useApp();
  const [activeSection, setActiveSection] = useState<'tools' | 'integrations' | 'appearance'>('tools');
  const [editingIntegration, setEditingIntegration] = useState<string | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [endpointInput, setEndpointInput] = useState('');

  const handleToolToggle = (tool: keyof ToolSettings) => {
    updateToolSettings({ [tool]: !state.settings.toolSettings[tool] });
  };

  const handleIntegrationToggle = (integration: APIIntegration) => {
    updateAPIIntegration({ ...integration, enabled: !integration.enabled });
  };

  const handleSaveIntegration = (integration: APIIntegration) => {
    updateAPIIntegration({
      ...integration,
      apiKey: apiKeyInput || integration.apiKey,
      endpoint: endpointInput || integration.endpoint,
      configured: !!(apiKeyInput || integration.apiKey),
    });
    setEditingIntegration(null);
    setApiKeyInput('');
    setEndpointInput('');
  };

  const styles = {
    container: {
      backgroundColor: '#1a1a2e',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '800px',
      margin: '0 auto',
      color: '#fff',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      borderBottom: '1px solid #333',
      paddingBottom: '16px',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0,
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: '#888',
      fontSize: '24px',
      cursor: 'pointer',
      padding: '8px',
    },
    tabs: {
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
    },
    tab: (active: boolean) => ({
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: active ? '#667eea' : '#2a2a3e',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: active ? 'bold' : 'normal',
      transition: 'all 0.2s ease',
    }),
    section: {
      backgroundColor: '#242438',
      borderRadius: '12px',
      padding: '20px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '16px',
      color: '#667eea',
    },
    settingRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 0',
      borderBottom: '1px solid #333',
    },
    settingInfo: {
      flex: 1,
    },
    settingName: {
      fontSize: '16px',
      fontWeight: '500',
      marginBottom: '4px',
    },
    settingDesc: {
      fontSize: '14px',
      color: '#888',
    },
    toggle: (enabled: boolean) => ({
      width: '50px',
      height: '26px',
      borderRadius: '13px',
      backgroundColor: enabled ? '#4CAF50' : '#444',
      position: 'relative' as const,
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      border: 'none',
    }),
    toggleKnob: (enabled: boolean) => ({
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      backgroundColor: '#fff',
      position: 'absolute' as const,
      top: '2px',
      left: enabled ? '26px' : '2px',
      transition: 'left 0.2s ease',
    }),
    integrationCard: {
      backgroundColor: '#2a2a3e',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
    },
    integrationHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
    },
    integrationStatus: (configured: boolean) => ({
      fontSize: '12px',
      padding: '4px 8px',
      borderRadius: '4px',
      backgroundColor: configured ? '#4CAF5033' : '#ff980033',
      color: configured ? '#4CAF50' : '#ff9800',
    }),
    input: {
      width: '100%',
      padding: '10px 12px',
      borderRadius: '6px',
      border: '1px solid #444',
      backgroundColor: '#1a1a2e',
      color: '#fff',
      fontSize: '14px',
      marginBottom: '8px',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: '#667eea',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: 'bold',
      marginRight: '8px',
    },
    secondaryButton: {
      padding: '10px 20px',
      borderRadius: '6px',
      border: '1px solid #444',
      backgroundColor: 'transparent',
      color: '#888',
      cursor: 'pointer',
    },
  };

  const toolDescriptions: Record<keyof ToolSettings, { name: string; desc: string }> = {
    oddsCalculator: {
      name: '📊 Odds Calculator',
      desc: 'Convert between odds formats and calculate returns',
    },
    statisticsEngine: {
      name: '📈 Statistics Engine',
      desc: 'Analyze betting performance with advanced metrics',
    },
    dataValidator: {
      name: '✅ Data Validator',
      desc: 'Validate betting data before saving',
    },
    dataExporter: {
      name: '💾 Data Exporter',
      desc: 'Export data in multiple formats (CSV, JSON, etc.)',
    },
    screenshotOCR: {
      name: '📷 Screenshot OCR',
      desc: 'Extract odds from betting screenshots',
    },
    sportsGames: {
      name: '🎮 Sports Games',
      desc: 'Play simulation games and bet with SimVC',
    },
    apiIntegrations: {
      name: '🔗 API Integrations',
      desc: 'Connect to external betting APIs and services',
    },
  };

  const integrationDescriptions: Record<string, { icon: string; desc: string }> = {
    gmail: {
      icon: '📧',
      desc: 'Sync bet confirmations from email',
    },
    'betting-api': {
      icon: '🎰',
      desc: 'Connect to betting platform APIs',
    },
    mcp: {
      icon: '🤖',
      desc: 'Model Context Protocol integration',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>⚙️ Settings</h2>
        {onClose && (
          <button style={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        )}
      </div>

      <div style={styles.tabs}>
        <button
          style={styles.tab(activeSection === 'tools')}
          onClick={() => setActiveSection('tools')}
        >
          🛠️ Tools
        </button>
        <button
          style={styles.tab(activeSection === 'integrations')}
          onClick={() => setActiveSection('integrations')}
        >
          🔗 Integrations
        </button>
        <button
          style={styles.tab(activeSection === 'appearance')}
          onClick={() => setActiveSection('appearance')}
        >
          🎨 Appearance
        </button>
      </div>

      {activeSection === 'tools' && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Tool Access</h3>
          <p style={{ color: '#888', marginBottom: '16px' }}>
            Enable or disable tools based on your needs
          </p>
          {(Object.keys(toolDescriptions) as Array<keyof ToolSettings>).map((tool) => (
            <div key={tool} style={styles.settingRow}>
              <div style={styles.settingInfo}>
                <div style={styles.settingName}>{toolDescriptions[tool].name}</div>
                <div style={styles.settingDesc}>{toolDescriptions[tool].desc}</div>
              </div>
              <button
                style={styles.toggle(state.settings.toolSettings[tool])}
                onClick={() => handleToolToggle(tool)}
                aria-label={`Toggle ${tool}`}
              >
                <div style={styles.toggleKnob(state.settings.toolSettings[tool])} />
              </button>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'integrations' && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>API Integrations</h3>
          <p style={{ color: '#888', marginBottom: '16px' }}>
            Connect external services to enhance your experience
          </p>
          {state.settings.apiIntegrations.map((integration) => (
            <div key={integration.id} style={styles.integrationCard}>
              <div style={styles.integrationHeader}>
                <div>
                  <div style={styles.settingName}>
                    {integrationDescriptions[integration.id]?.icon || '🔌'} {integration.name}
                  </div>
                  <div style={styles.settingDesc}>
                    {integrationDescriptions[integration.id]?.desc || 'Custom integration'}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={styles.integrationStatus(integration.configured)}>
                    {integration.configured ? '✓ Configured' : '○ Not configured'}
                  </span>
                  <button
                    style={styles.toggle(integration.enabled)}
                    onClick={() => handleIntegrationToggle(integration)}
                    aria-label={`Toggle ${integration.name}`}
                  >
                    <div style={styles.toggleKnob(integration.enabled)} />
                  </button>
                </div>
              </div>

              {editingIntegration === integration.id ? (
                <div style={{ marginTop: '12px' }}>
                  <label htmlFor={`api-key-${integration.id}`} style={{ display: 'block', color: '#888', fontSize: '12px', marginBottom: '4px' }}>
                    API Key
                  </label>
                  <input
                    id={`api-key-${integration.id}`}
                    style={styles.input}
                    type="password"
                    placeholder="Enter your API key"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                  />
                  <div style={{ color: '#b26a00', fontSize: '12px', marginBottom: '8px' }}>
                    ⚠️ Your API key will be stored locally in your browser without encryption.
                  </div>
                  {integration.type !== 'gmail' && (
                    <>
                      <label htmlFor={`endpoint-${integration.id}`} style={{ display: 'block', color: '#888', fontSize: '12px', marginBottom: '4px' }}>
                        Endpoint URL
                      </label>
                      <input
                        id={`endpoint-${integration.id}`}
                        style={styles.input}
                        type="text"
                        placeholder="Enter endpoint URL"
                        value={endpointInput}
                        onChange={(e) => setEndpointInput(e.target.value)}
                      />
                    </>
                  )}
                  <div style={{ marginTop: '8px' }}>
                    <button
                      style={styles.button}
                      onClick={() => handleSaveIntegration(integration)}
                    >
                      Save
                    </button>
                    <button
                      style={styles.secondaryButton}
                      onClick={() => setEditingIntegration(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  style={{ ...styles.secondaryButton, marginTop: '12px' }}
                  onClick={() => setEditingIntegration(integration.id)}
                >
                  Configure
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {activeSection === 'appearance' && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Appearance & Preferences</h3>
          <div style={styles.settingRow}>
            <div style={styles.settingInfo}>
              <div style={styles.settingName}>🔊 Sound Effects</div>
              <div style={styles.settingDesc}>Enable sound effects for games and notifications</div>
            </div>
            <button
              style={styles.toggle(state.settings.soundEnabled)}
              onClick={() => dispatch({ type: 'TOGGLE_SOUND', enabled: !state.settings.soundEnabled })}
              aria-label="Toggle sound"
            >
              <div style={styles.toggleKnob(state.settings.soundEnabled)} />
            </button>
          </div>
          <div style={styles.settingRow}>
            <div style={styles.settingInfo}>
              <div style={styles.settingName}>🔔 Notifications</div>
              <div style={styles.settingDesc}>Receive notifications for bet results</div>
            </div>
            <button
              style={styles.toggle(state.settings.notifications)}
              onClick={() => dispatch({ type: 'TOGGLE_NOTIFICATIONS', enabled: !state.settings.notifications })}
              aria-label="Toggle notifications"
            >
              <div style={styles.toggleKnob(state.settings.notifications)} />
            </button>
          </div>
          <div style={{ ...styles.settingRow, borderBottom: 'none' }}>
            <div style={styles.settingInfo}>
              <div style={styles.settingName}>🌙 Theme</div>
              <div style={styles.settingDesc}>Choose your preferred color theme</div>
            </div>
            <select
              id="theme-select"
              style={{
                ...styles.input,
                width: 'auto',
                marginBottom: 0,
              }}
              value={state.settings.theme}
              onChange={(e) => dispatch({ type: 'SET_THEME', theme: e.target.value as 'light' | 'dark' | 'system' })}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
