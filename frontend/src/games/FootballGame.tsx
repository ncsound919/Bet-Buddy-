/**
 * Football Game Component
 * Tecmo Bowl style football simulation
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useApp } from '../context/AppContext';
import type { GameInfo, FootballGameState, TeamStats } from '../types';
import { generateUniqueId } from '../utils/generateId';

interface FootballGameProps {
  gameInfo: GameInfo;
  onClose: () => void;
}

const TEAMS: TeamStats[] = [
  { name: 'San Francisco 49ers', abbreviation: 'SF', score: 0, offense: 88, defense: 82, speed: 85 },
  { name: 'Dallas Cowboys', abbreviation: 'DAL', score: 0, offense: 85, defense: 85, speed: 82 },
  { name: 'Kansas City Chiefs', abbreviation: 'KC', score: 0, offense: 92, defense: 78, speed: 88 },
  { name: 'Buffalo Bills', abbreviation: 'BUF', score: 0, offense: 86, defense: 84, speed: 80 },
  { name: 'Philadelphia Eagles', abbreviation: 'PHI', score: 0, offense: 84, defense: 88, speed: 82 },
  { name: 'Miami Dolphins', abbreviation: 'MIA', score: 0, offense: 90, defense: 76, speed: 92 },
];

function FootballGame({ gameInfo, onClose }: FootballGameProps) {
  const { placeBet, resolveBet, state } = useApp();

  const [gameState, setGameState] = useState<FootballGameState | null>(null);
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
      timeRemaining: 900, // 15 minutes per quarter
      down: 1,
      yardsToGo: 10,
      ballPosition: 25, // Start at own 25
      possession: Math.random() > 0.5 ? 'home' : 'away',
      isPlaying: false,
      gameOver: false,
    });
    setGameLog([]);
    betResolvedRef.current = false;
    addLog(`🏈 ${selectedHomeTeam.name} vs ${selectedAwayTeam.name}`);
    addLog('Press START to begin!');
  };

  const simulatePlay = useCallback((gs: FootballGameState): FootballGameState => {
    const offenseTeam = gs.possession === 'home' ? gs.homeTeam : gs.awayTeam;
    const defenseTeam = gs.possession === 'home' ? gs.awayTeam : gs.homeTeam;

    const playTypes = ['run', 'short_pass', 'deep_pass', 'screen'];
    const play = playTypes[Math.floor(Math.random() * playTypes.length)];

    let yardsGained = 0;
    let turnover = false;
    let touchdown = false;
    let log = '';

    const offenseAdvantage = (offenseTeam.offense - defenseTeam.defense) / 10;

    switch (play) {
      case 'run':
        yardsGained = Math.floor(Math.random() * 8 + offenseAdvantage);
        log = yardsGained > 0 
          ? `🏃 Run play gains ${yardsGained} yards!`
          : `🛑 Run stuffed for ${yardsGained} yards!`;
        break;
      case 'short_pass':
        if (Math.random() < 0.75) {
          yardsGained = Math.floor(Math.random() * 12 + offenseAdvantage + 3);
          log = `🎯 Short pass complete for ${yardsGained} yards!`;
        } else if (Math.random() < 0.15) {
          turnover = true;
          log = `🔄 INTERCEPTION by ${defenseTeam.abbreviation}!`;
        } else {
          log = `❌ Pass incomplete`;
        }
        break;
      case 'deep_pass':
        if (Math.random() < 0.35) {
          yardsGained = Math.floor(Math.random() * 30 + offenseAdvantage + 20);
          log = `💨 DEEP PASS complete for ${yardsGained} yards!`;
        } else if (Math.random() < 0.2) {
          turnover = true;
          log = `🔄 INTERCEPTION on deep ball by ${defenseTeam.abbreviation}!`;
        } else {
          log = `❌ Deep pass incomplete`;
        }
        break;
      case 'screen':
        yardsGained = Math.floor(Math.random() * 15 + offenseAdvantage);
        if (yardsGained < -2) {
          log = `🛑 Screen blown up for loss of ${Math.abs(yardsGained)} yards!`;
        } else {
          log = `📺 Screen pass gains ${yardsGained} yards!`;
        }
        break;
    }

    let newPosition = gs.ballPosition + yardsGained;
    let newDown = gs.down + 1;
    let newYardsToGo = gs.yardsToGo - yardsGained;
    let newPossession = gs.possession;
    let newHomeScore = gs.homeTeam.score;
    let newAwayScore = gs.awayTeam.score;

    // Check for touchdown
    if (newPosition >= 100) {
      touchdown = true;
      const points = 7; // TD + PAT assumed
      if (gs.possession === 'home') {
        newHomeScore += points;
      } else {
        newAwayScore += points;
      }
      log = `🏈 TOUCHDOWN ${offenseTeam.abbreviation}! (+${points} points)`;
      newPosition = 25;
      newDown = 1;
      newYardsToGo = 10;
      newPossession = gs.possession === 'home' ? 'away' : 'home';
    }

    // Check for first down
    if (!touchdown && !turnover && newYardsToGo <= 0) {
      addLog('✅ First down!');
      newDown = 1;
      newYardsToGo = 10;
    }

    // Check for turnover on downs
    if (!touchdown && !turnover && newDown > 4) {
      addLog(`📍 Turnover on downs! ${defenseTeam.abbreviation} takes over`);
      turnover = true;
    }

    // Handle turnover
    if (turnover) {
      newPossession = gs.possession === 'home' ? 'away' : 'home';
      newPosition = 100 - newPosition;
      newDown = 1;
      newYardsToGo = 10;
    }

    // Safety check
    if (newPosition <= 0) {
      const safetyTeam = gs.possession === 'home' ? 'away' : 'home';
      if (safetyTeam === 'home') {
        newHomeScore += 2;
      } else {
        newAwayScore += 2;
      }
      addLog(`🚨 SAFETY! ${safetyTeam === 'home' ? gs.homeTeam.abbreviation : gs.awayTeam.abbreviation} gets 2 points!`);
      newPosition = 25;
      newPossession = gs.possession === 'home' ? 'away' : 'home';
      newDown = 1;
      newYardsToGo = 10;
    }

    addLog(log);

    return {
      ...gs,
      homeTeam: { ...gs.homeTeam, score: newHomeScore },
      awayTeam: { ...gs.awayTeam, score: newAwayScore },
      down: newDown,
      yardsToGo: Math.max(1, newYardsToGo),
      ballPosition: Math.min(99, Math.max(1, newPosition)),
      possession: newPossession,
    };
  }, [addLog]);

  useEffect(() => {
    if (!gameState?.isPlaying || gameState.gameOver) return;

    const interval = setInterval(() => {
      setGameState((prev) => {
        if (!prev || prev.gameOver) return prev;

        let newTime = prev.timeRemaining - 25;
        let newQuarter = prev.quarter;
        let isGameOver = false;

        if (newTime <= 0) {
          if (prev.quarter >= 4) {
            if (prev.homeTeam.score === prev.awayTeam.score) {
              addLog('⏰ OVERTIME!');
              newQuarter = prev.quarter + 1;
              newTime = 600;
            } else {
              isGameOver = true;
              const winner = prev.homeTeam.score > prev.awayTeam.score 
                ? prev.homeTeam.abbreviation 
                : prev.awayTeam.abbreviation;
              addLog(`🏆 GAME OVER! ${winner} WINS!`);
            }
          } else {
            newQuarter = prev.quarter + 1;
            newTime = 900;
            addLog(`📢 End of Q${prev.quarter}. Q${newQuarter} begins!`);
          }
        }

        const updated = simulatePlay({
          ...prev,
          timeRemaining: Math.max(0, newTime),
          quarter: newQuarter,
          gameOver: isGameOver,
          isPlaying: !isGameOver,
        });

        return updated;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [gameState?.isPlaying, gameState?.gameOver, simulatePlay, addLog]);

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
    const odds = 1.9;

    const success = placeBet({
      gameId: gameInfo.id,
      sport: 'football',
      betType: 'moneyline',
      selection: team.name,
      amount: betAmount,
      odds,
      potentialPayout: Math.round(betAmount * odds),
    });

    if (success) {
      setCurrentBetId(generateUniqueId('bet'));
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
    field: {
      backgroundColor: '#2E7D32',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '20px',
      border: '4px solid #1B5E20',
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
    downInfo: {
      fontSize: '16px',
      color: '#4CAF50',
      marginTop: '8px',
    },
    fieldPosition: {
      backgroundColor: '#1B5E20',
      borderRadius: '4px',
      padding: '8px 16px',
      marginTop: '12px',
      color: '#fff',
      fontSize: '14px',
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
          <div style={styles.title}>🏈 {gameInfo.name}</div>
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
        <div style={styles.title}>🏈 {gameInfo.name}</div>
        <button style={styles.backButton} onClick={onClose}>✕</button>
      </div>

      <div style={styles.field}>
        <div style={styles.scoreboard}>
          <div style={styles.teamScore}>
            <div style={styles.teamName}>{gameState?.homeTeam.name || 'Home'}</div>
            <div style={styles.score}>{gameState?.homeTeam.score || 0}</div>
          </div>
          <div style={styles.gameInfo}>
            <div style={styles.quarter}>Q{gameState?.quarter || 1}</div>
            <div style={styles.time}>{formatTime(gameState?.timeRemaining || 900)}</div>
            <div style={styles.downInfo}>
              {gameState?.down || 1}
              {gameState?.down === 1 ? 'st' : gameState?.down === 2 ? 'nd' : gameState?.down === 3 ? 'rd' : 'th'}
              {' & '}{gameState?.yardsToGo || 10}
            </div>
            <div style={styles.fieldPosition}>
              🏈 Ball on {gameState?.ballPosition || 25} yard line
              <br />
              {gameState?.possession === 'home' 
                ? gameState?.homeTeam.abbreviation 
                : gameState?.awayTeam.abbreviation} has possession
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

export default FootballGame;
