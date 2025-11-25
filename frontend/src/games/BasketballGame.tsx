/**
 * Basketball Game Component
 * Bulls vs Blazers / Double Dribble style basketball simulation
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useApp } from '../context/AppContext';
import type { GameInfo, BasketballGameState, TeamStats } from '../types';

interface BasketballGameProps {
  gameInfo: GameInfo;
  onClose: () => void;
}

const TEAMS: TeamStats[] = [
  { name: 'Chicago Bulls', abbreviation: 'CHI', score: 0, offense: 85, defense: 80, speed: 82 },
  { name: 'Portland Blazers', abbreviation: 'POR', score: 0, offense: 80, defense: 82, speed: 85 },
  { name: 'LA Lakers', abbreviation: 'LAL', score: 0, offense: 88, defense: 78, speed: 80 },
  { name: 'Boston Celtics', abbreviation: 'BOS', score: 0, offense: 82, defense: 85, speed: 78 },
  { name: 'Miami Heat', abbreviation: 'MIA', score: 0, offense: 80, defense: 88, speed: 82 },
  { name: 'Golden State Warriors', abbreviation: 'GSW', score: 0, offense: 90, defense: 75, speed: 88 },
];

function BasketballGame({ gameInfo, onClose }: BasketballGameProps) {
  const { placeBet, resolveBet, state } = useApp();

  const [gameState, setGameState] = useState<BasketballGameState | null>(null);
  const [selectedHomeTeam, setSelectedHomeTeam] = useState<TeamStats>(TEAMS[0]);
  const [selectedAwayTeam, setSelectedAwayTeam] = useState<TeamStats>(TEAMS[1]);
  const [betAmount, setBetAmount] = useState<number>(50);
  const [betSelection, setBetSelection] = useState<'home' | 'away' | null>(null);
  const [currentBetId, setCurrentBetId] = useState<string | null>(null);
  const [gameLog, setGameLog] = useState<string[]>([]);
  const [showBetting, setShowBetting] = useState(true);
  
  // Use ref to track if bet was resolved
  const betResolvedRef = useRef(false);

  const addLog = useCallback((message: string) => {
    setGameLog((prev) => [...prev.slice(-9), message]);
  }, []);

  const initGame = () => {
    setGameState({
      homeTeam: { ...selectedHomeTeam, score: 0 },
      awayTeam: { ...selectedAwayTeam, score: 0 },
      quarter: 1,
      timeRemaining: 720, // 12 minutes per quarter
      possession: Math.random() > 0.5 ? 'home' : 'away',
      shotClock: 24,
      isPlaying: false,
      gameOver: false,
    });
    setGameLog([]);
    betResolvedRef.current = false;
    addLog(`🏀 ${selectedHomeTeam.name} vs ${selectedAwayTeam.name}`);
    addLog('Press START to begin!');
  };

  const simulatePossession = useCallback((gs: BasketballGameState): BasketballGameState => {
    const offenseTeam = gs.possession === 'home' ? gs.homeTeam : gs.awayTeam;
    const defenseTeam = gs.possession === 'home' ? gs.awayTeam : gs.homeTeam;

    const shotChance = (offenseTeam.offense - defenseTeam.defense + 50) / 100;
    const threePointChance = 0.35;
    const turnoverChance = 0.12;

    let newHomeScore = gs.homeTeam.score;
    let newAwayScore = gs.awayTeam.score;
    let log = '';

    if (Math.random() < turnoverChance) {
      log = `🔄 Turnover by ${offenseTeam.abbreviation}!`;
    } else if (Math.random() < shotChance) {
      const points = Math.random() < threePointChance ? 3 : 2;
      if (gs.possession === 'home') {
        newHomeScore += points;
        log = points === 3 
          ? `🎯 THREE POINTER! ${offenseTeam.abbreviation} scores!`
          : `🏀 ${offenseTeam.abbreviation} scores ${points}!`;
      } else {
        newAwayScore += points;
        log = points === 3 
          ? `🎯 THREE POINTER! ${offenseTeam.abbreviation} scores!`
          : `🏀 ${offenseTeam.abbreviation} scores ${points}!`;
      }
    } else {
      log = `❌ Shot missed by ${offenseTeam.abbreviation}`;
    }

    addLog(log);

    return {
      ...gs,
      homeTeam: { ...gs.homeTeam, score: newHomeScore },
      awayTeam: { ...gs.awayTeam, score: newAwayScore },
      possession: gs.possession === 'home' ? 'away' : 'home',
      shotClock: 24,
    };
  }, [addLog]);

  useEffect(() => {
    if (!gameState?.isPlaying || gameState.gameOver) return;

    const interval = setInterval(() => {
      setGameState((prev) => {
        if (!prev || prev.gameOver) return prev;

        let newTime = prev.timeRemaining - 8;
        let newQuarter = prev.quarter;
        let isGameOver = false;

        if (newTime <= 0) {
          if (prev.quarter >= 4) {
            // Check for tie - overtime
            if (prev.homeTeam.score === prev.awayTeam.score) {
              addLog('⏰ OVERTIME!');
              newQuarter = prev.quarter + 1;
              newTime = 300; // 5 minute overtime
            } else {
              isGameOver = true;
              const winner = prev.homeTeam.score > prev.awayTeam.score 
                ? prev.homeTeam.abbreviation 
                : prev.awayTeam.abbreviation;
              addLog(`🏆 GAME OVER! ${winner} WINS!`);
            }
          } else {
            newQuarter = prev.quarter + 1;
            newTime = 720;
            addLog(`📢 End of Q${prev.quarter}. Q${newQuarter} begins!`);
          }
        }

        const updated = simulatePossession({
          ...prev,
          timeRemaining: Math.max(0, newTime),
          quarter: newQuarter,
          gameOver: isGameOver,
          isPlaying: !isGameOver,
      });

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState?.isPlaying, gameState?.gameOver, simulatePossession, addLog]);

  // Handle bet resolution when game ends - using ref to avoid setState in effect
  useEffect(() => {
    if (gameState?.gameOver && currentBetId && !betResolvedRef.current) {
      betResolvedRef.current = true;
      const homeWon = gameState.homeTeam.score > gameState.awayTeam.score;
      const betWon = (betSelection === 'home' && homeWon) || (betSelection === 'away' && !homeWon);
      resolveBet(currentBetId, betWon);
    }
  }, [gameState?.gameOver, gameState?.homeTeam.score, gameState?.awayTeam.score, currentBetId, betSelection, resolveBet]);

  const handlePlaceBet = () => {
    if (!betSelection || betAmount <= 0) return;

    const team = betSelection === 'home' ? selectedHomeTeam : selectedAwayTeam;
    const odds = 1.9; // Standard odds

    const success = placeBet({
      gameId: gameInfo.id,
      sport: 'basketball',
      betType: 'moneyline',
      selection: team.name,
      amount: betAmount,
      odds,
      potentialPayout: Math.round(betAmount * odds),
    });

    if (success) {
      setCurrentBetId(`bet-${Date.now()}`);
      setShowBetting(false);
      initGame();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const styles = {
    container: {
      backgroundColor: '#1a1a2e',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '900px',
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    backButton: {
      background: 'none',
      border: 'none',
      color: '#888',
      fontSize: '24px',
      cursor: 'pointer',
    },
    court: {
      backgroundColor: '#C75B12',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '20px',
      border: '4px solid #8B4513',
    },
    scoreboard: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#0a0a15',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
    },
    teamScore: {
      textAlign: 'center' as const,
      flex: 1,
    },
    teamName: {
      fontSize: '14px',
      color: '#888',
      marginBottom: '4px',
    },
    score: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: '#fff',
    },
    gameInfo: {
      textAlign: 'center' as const,
      padding: '0 20px',
    },
    quarter: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#FFD700',
    },
    time: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#fff',
    },
    possession: {
      fontSize: '14px',
      color: '#4CAF50',
      marginTop: '8px',
    },
    controls: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '20px',
    },
    button: (primary: boolean) => ({
      padding: '12px 32px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: primary ? '#4CAF50' : '#333',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '16px',
    }),
    gameLog: {
      backgroundColor: '#0a0a15',
      borderRadius: '8px',
      padding: '16px',
      maxHeight: '200px',
      overflowY: 'auto' as const,
    },
    logEntry: {
      fontSize: '14px',
      color: '#ccc',
      padding: '4px 0',
      borderBottom: '1px solid #222',
    },
    bettingSection: {
      backgroundColor: '#242438',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
    },
    bettingTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#667eea',
      marginBottom: '16px',
    },
    teamSelect: {
      display: 'flex',
      gap: '12px',
      marginBottom: '16px',
    },
    teamOption: (selected: boolean) => ({
      flex: 1,
      padding: '16px',
      borderRadius: '8px',
      border: selected ? '2px solid #667eea' : '2px solid #333',
      backgroundColor: selected ? '#667eea33' : '#1a1a2e',
      cursor: 'pointer',
      textAlign: 'center' as const,
    }),
    select: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #444',
      backgroundColor: '#1a1a2e',
      color: '#fff',
      fontSize: '16px',
      marginBottom: '12px',
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #444',
      backgroundColor: '#1a1a2e',
      color: '#fff',
      fontSize: '16px',
      marginBottom: '16px',
    },
  };

  if (showBetting) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.title}>🏀 {gameInfo.name}</div>
          <button style={styles.backButton} onClick={onClose}>✕</button>
        </div>

        <div style={styles.bettingSection}>
          <div style={styles.bettingTitle}>Select Teams & Place Your Bet</div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#888', display: 'block', marginBottom: '8px' }}>Home Team</label>
            <select
              style={styles.select}
              value={selectedHomeTeam.name}
              onChange={(e) => setSelectedHomeTeam(TEAMS.find((t) => t.name === e.target.value) || TEAMS[0])}
            >
              {TEAMS.filter((t) => t.name !== selectedAwayTeam.name).map((team) => (
                <option key={team.name} value={team.name}>{team.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#888', display: 'block', marginBottom: '8px' }}>Away Team</label>
            <select
              style={styles.select}
              value={selectedAwayTeam.name}
              onChange={(e) => setSelectedAwayTeam(TEAMS.find((t) => t.name === e.target.value) || TEAMS[1])}
            >
              {TEAMS.filter((t) => t.name !== selectedHomeTeam.name).map((team) => (
                <option key={team.name} value={team.name}>{team.name}</option>
              ))}
            </select>
          </div>

          <div style={styles.bettingTitle}>Who Will Win?</div>
          <div style={styles.teamSelect}>
            <div
              style={styles.teamOption(betSelection === 'home')}
              onClick={() => setBetSelection('home')}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏠</div>
              <div style={{ fontWeight: 'bold', color: '#fff' }}>{selectedHomeTeam.abbreviation}</div>
              <div style={{ color: '#888', fontSize: '12px' }}>Odds: 1.90</div>
            </div>
            <div
              style={styles.teamOption(betSelection === 'away')}
              onClick={() => setBetSelection('away')}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>✈️</div>
              <div style={{ fontWeight: 'bold', color: '#fff' }}>{selectedAwayTeam.abbreviation}</div>
              <div style={{ color: '#888', fontSize: '12px' }}>Odds: 1.90</div>
            </div>
          </div>

          <div>
            <label style={{ color: '#888', display: 'block', marginBottom: '8px' }}>
              Bet Amount (Balance: {state.simVC.amount} SimVC)
            </label>
            <input
              style={styles.input}
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 0))}
              max={state.simVC.amount}
              min={1}
            />
          </div>

          {betSelection && (
            <div style={{ color: '#4CAF50', marginBottom: '16px' }}>
              Potential Payout: {Math.round(betAmount * 1.9)} SimVC
            </div>
          )}

          <button
            style={styles.button(true)}
            onClick={handlePlaceBet}
            disabled={!betSelection || betAmount > state.simVC.amount}
          >
            🎰 Place Bet & Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>🏀 {gameInfo.name}</div>
        <button style={styles.backButton} onClick={onClose}>✕</button>
      </div>

      <div style={styles.court}>
        <div style={styles.scoreboard}>
          <div style={styles.teamScore}>
            <div style={styles.teamName}>{gameState?.homeTeam.name || 'Home'}</div>
            <div style={styles.score}>{gameState?.homeTeam.score || 0}</div>
          </div>
          <div style={styles.gameInfo}>
            <div style={styles.quarter}>Q{gameState?.quarter || 1}</div>
            <div style={styles.time}>{formatTime(gameState?.timeRemaining || 720)}</div>
            <div style={styles.possession}>
              🏀 {gameState?.possession === 'home' 
                ? gameState?.homeTeam.abbreviation 
                : gameState?.awayTeam.abbreviation}
            </div>
          </div>
          <div style={styles.teamScore}>
            <div style={styles.teamName}>{gameState?.awayTeam.name || 'Away'}</div>
            <div style={styles.score}>{gameState?.awayTeam.score || 0}</div>
          </div>
        </div>

        <div style={styles.controls}>
          {!gameState?.isPlaying && !gameState?.gameOver && (
            <button
              style={styles.button(true)}
              onClick={() => setGameState((prev) => prev ? { ...prev, isPlaying: true } : null)}
            >
              ▶️ START
            </button>
          )}
          {gameState?.isPlaying && (
            <button
              style={styles.button(false)}
              onClick={() => setGameState((prev) => prev ? { ...prev, isPlaying: false } : null)}
            >
              ⏸️ PAUSE
            </button>
          )}
          {gameState?.gameOver && (
            <button style={styles.button(true)} onClick={() => setShowBetting(true)}>
              🔄 NEW GAME
            </button>
          )}
        </div>
      </div>

      <div style={styles.gameLog}>
        {gameLog.map((log, i) => (
          <div key={i} style={styles.logEntry}>{log}</div>
        ))}
      </div>
    </div>
  );
}

export default BasketballGame;
