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
          🎲 Bet Buddy
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

export default App
