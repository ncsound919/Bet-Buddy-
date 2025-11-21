import { useState } from 'react'
import './App.css'
import basketballIcon from './assets/basketball.svg'
import footballIcon from './assets/football.svg'
import baseballIcon from './assets/baseball.svg'
import soccerIcon from './assets/soccer.svg'

function App() {
  const [activeStats] = useState({
    totalBets: 247,
    winRate: 68,
    activeBets: 12,
    profit: 3240
  })

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
    </div>
  )
}

export default App
