import { useState } from 'react'
import './App.css'
import basketballIcon from './assets/basketball.svg'
import footballIcon from './assets/football.svg'
import baseballIcon from './assets/baseball.svg'
import soccerIcon from './assets/soccer.svg'

function App() {
  const activeStats = {
    totalBets: 247,
    winRate: 68,
    activeBets: 12,
    profit: 3240
  }

  return (
    <div className="app-container">
      {/* Sports silhouettes background */}
      <div className="sports-background">
        <img src={basketballIcon} alt="" className="basketball" />
        <img src={footballIcon} alt="" className="football" />
        <img src={baseballIcon} alt="" className="baseball" />
        <img src={soccerIcon} alt="" className="soccer" />
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Bet Buddy</h1>
        <p className="hero-subtitle">Track, Analyze, and Master Your Sports Betting Game</p>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="stats-grid">
          <div className="stat-card" style={{ animationDelay: '0.1s' }}>
            <div className="stat-number">{activeStats.totalBets}</div>
            <div className="stat-label">Total Bets</div>
          </div>
          
          <div className="stat-card" style={{ animationDelay: '0.2s' }}>
            <div className="stat-number">{activeStats.winRate}%</div>
            <div className="stat-label">Win Rate</div>
          </div>
          
          <div className="stat-card" style={{ animationDelay: '0.3s' }}>
            <div className="stat-number">{activeStats.activeBets}</div>
            <div className="stat-label">Active Bets</div>
          </div>
          
          <div className="stat-card" style={{ animationDelay: '0.4s' }}>
            <div className="stat-number">${activeStats.profit}</div>
            <div className="stat-label">Total Profit</div>
          </div>
        </div>

        <div className="cta-section">
          <button className="cta-button">Place New Bet</button>
          <button className="cta-button">View Analytics</button>
        </div>
      </section>
import { useState } from 'react';
import './App.css';
import { AppProvider, useApp } from './context/AppContext';
import ToolsDemo from './components/ToolsDemo';
import SettingsPage from './components/SettingsPage';
import SimVCWallet from './components/SimVCWallet';
import GamesHub from './components/GamesHub';

type NavPage = 'home' | 'tools' | 'games' | 'settings';

function AppContent() {
  const [activePage, setActivePage] = useState<NavPage>('home');
  const { state } = useApp();

  const styles = {
    app: {
      minHeight: '100vh',
      backgroundColor: '#0d0d1a',
      color: '#fff',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      backgroundColor: '#1a1a2e',
      borderBottom: '1px solid #333',
      position: 'sticky' as const,
      top: 0,
      zIndex: 100,
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    logoText: {
      fontSize: '24px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    navLinks: {
      display: 'flex',
      gap: '8px',
    },
    navLink: (active: boolean) => ({
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: active ? '#667eea' : 'transparent',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: active ? 'bold' : 'normal',
      fontSize: '14px',
      transition: 'all 0.2s ease',
    }),
    walletSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    walletBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      backgroundColor: '#242438',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    vcAmount: {
      color: '#FFD700',
    },
    mainContent: {
      padding: '24px',
      maxWidth: '1400px',
      margin: '0 auto',
    },
    hero: {
      textAlign: 'center' as const,
      padding: '60px 20px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)',
      borderRadius: '24px',
      marginBottom: '40px',
    },
    heroTitle: {
      fontSize: '48px',
      fontWeight: 'bold',
      marginBottom: '16px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    heroSubtitle: {
      fontSize: '20px',
      color: '#888',
      marginBottom: '32px',
      maxWidth: '600px',
      margin: '0 auto 32px',
    },
    heroActions: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      flexWrap: 'wrap' as const,
    },
    primaryButton: {
      padding: '16px 32px',
      borderRadius: '12px',
      border: 'none',
      backgroundColor: '#667eea',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '16px',
      transition: 'transform 0.2s ease',
    },
    secondaryButton: {
      padding: '16px 32px',
      borderRadius: '12px',
      border: '2px solid #667eea',
      backgroundColor: 'transparent',
      color: '#667eea',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '16px',
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '40px',
    },
    featureCard: {
      backgroundColor: '#1a1a2e',
      borderRadius: '16px',
      padding: '24px',
      textAlign: 'center' as const,
      transition: 'transform 0.2s ease',
      cursor: 'pointer',
    },
    featureIcon: {
      fontSize: '48px',
      marginBottom: '16px',
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    featureDesc: {
      fontSize: '14px',
      color: '#888',
      lineHeight: 1.5,
    },
    walletPreview: {
      maxWidth: '400px',
      margin: '0 auto 40px',
    },
  };

  const renderHome = () => (
    <>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>🎲 Bet Buddy</h1>
        <p style={styles.heroSubtitle}>
          Your ultimate betting companion with AI-powered analysis, simulation games,
          and virtual currency to practice your strategies risk-free.
        </p>
        <div style={styles.heroActions}>
          <button style={styles.primaryButton} onClick={() => setActivePage('games')}>
            🎮 Play Games
          </button>
          <button style={styles.secondaryButton} onClick={() => setActivePage('tools')}>
            🛠️ Use Tools
          </button>
        </div>
      </div>

      <div style={styles.walletPreview}>
        <SimVCWallet />
      </div>

      <div style={styles.features}>
        <div style={styles.featureCard} onClick={() => setActivePage('games')}>
          <div style={styles.featureIcon}>🏀</div>
          <h3 style={styles.featureTitle}>Sports Simulations</h3>
          <p style={styles.featureDesc}>
            Play Bulls vs Blazers style basketball, Tecmo Bowl football, and classic baseball games.
            One game is FREE with the app!
          </p>
        </div>
        <div style={styles.featureCard} onClick={() => setActivePage('tools')}>
          <div style={styles.featureIcon}>📊</div>
          <h3 style={styles.featureTitle}>Analysis Tools</h3>
          <p style={styles.featureDesc}>
            Odds calculator, statistics engine, data validator, and OCR screenshot analysis
            to enhance your betting strategy.
          </p>
        </div>
        <div style={styles.featureCard} onClick={() => setActivePage('settings')}>
          <div style={styles.featureIcon}>🔗</div>
          <h3 style={styles.featureTitle}>API Integrations</h3>
          <p style={styles.featureDesc}>
            Connect Gmail, betting APIs, and MCP servers to automate your workflow
            and sync your data seamlessly.
          </p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>💰</div>
          <h3 style={styles.featureTitle}>SimVC Currency</h3>
          <p style={styles.featureDesc}>
            Earn and spend virtual currency on games, perks, and unlocks.
            Practice betting strategies without real money risk.
          </p>
        </div>
        <div style={styles.featureCard} onClick={() => setActivePage('settings')}>
          <div style={styles.featureIcon}>⚙️</div>
          <h3 style={styles.featureTitle}>Customizable Settings</h3>
          <p style={styles.featureDesc}>
            Enable or disable tools based on your needs. Configure API integrations
            and personalize your experience.
          </p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🎯</div>
          <h3 style={styles.featureTitle}>Hi-Res UI</h3>
          <p style={styles.featureDesc}>
            Modern, responsive design optimized for all devices with smooth animations
            and intuitive navigation.
          </p>
        </div>
      </div>
    </>
  );

  return (
    <div style={styles.app}>
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          <span style={{ fontSize: '32px' }}>🎲</span>
          <span style={styles.logoText}>Bet Buddy</span>
        </div>
        <div style={styles.navLinks}>
          <button
            style={styles.navLink(activePage === 'home')}
            onClick={() => setActivePage('home')}
          >
            🏠 Home
          </button>
          {state.settings.toolSettings.oddsCalculator && (
            <button
              style={styles.navLink(activePage === 'tools')}
              onClick={() => setActivePage('tools')}
            >
              🛠️ Tools
            </button>
          )}
          {state.settings.toolSettings.sportsGames && (
            <button
              style={styles.navLink(activePage === 'games')}
              onClick={() => setActivePage('games')}
            >
              🎮 Games
            </button>
          )}
          <button
            style={styles.navLink(activePage === 'settings')}
            onClick={() => setActivePage('settings')}
          >
            ⚙️ Settings
          </button>
        </div>
        <div style={styles.walletSection}>
          <div style={styles.walletBadge}>
            <span>💰</span>
            <span style={styles.vcAmount}>{state.simVC.amount.toLocaleString()} SimVC</span>
          </div>
        </div>
      </nav>

      <main style={styles.mainContent}>
        {activePage === 'home' && renderHome()}
        {activePage === 'tools' && <ToolsDemo />}
        {activePage === 'games' && <GamesHub onClose={() => setActivePage('home')} />}
        {activePage === 'settings' && <SettingsPage onClose={() => setActivePage('home')} />}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
import { useState } from 'react'
import './App.css'
import ToolsDemo from './components/ToolsDemo'
import BankrollManager from './components/BankrollManager'
import EducationalResources from './components/EducationalResources'

type Page = 'tools' | 'bankroll' | 'education'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('tools')

  return (
    <div>
      {/* Navigation */}
      <nav style={{
        backgroundColor: '#333',
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
          📊 Overlay Odds
        </span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setCurrentPage('tools')}
            style={{
              padding: '8px 16px',
              backgroundColor: currentPage === 'tools' ? '#4CAF50' : 'transparent',
              color: 'white',
              border: currentPage === 'tools' ? 'none' : '1px solid #666',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🛠️ Tools
          </button>
          <button
            onClick={() => setCurrentPage('bankroll')}
            style={{
              padding: '8px 16px',
              backgroundColor: currentPage === 'bankroll' ? '#4CAF50' : 'transparent',
              color: 'white',
              border: currentPage === 'bankroll' ? 'none' : '1px solid #666',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            💰 Bankroll
          </button>
          <button
            onClick={() => setCurrentPage('education')}
            style={{
              padding: '8px 16px',
              backgroundColor: currentPage === 'education' ? '#4CAF50' : 'transparent',
              color: 'white',
              border: currentPage === 'education' ? 'none' : '1px solid #666',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            📚 Learn
          </button>
        </div>
      </nav>

      {/* Page Content */}
      {currentPage === 'tools' && <ToolsDemo />}
      {currentPage === 'bankroll' && <BankrollManager />}
      {currentPage === 'education' && <EducationalResources />}
    </div>
  )
}

export default App;
