/**
 * Baseball Game Component
 * Classic baseball simulation with full gameplay
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useApp } from '../context/AppContext';
import type { GameInfo, BaseballGameState, TeamStats } from '../types';

interface BaseballGameProps {
  gameInfo: GameInfo;
  onClose: () => void;
}

const TEAMS: TeamStats[] = [
  { name: 'New York Yankees', abbreviation: 'NYY', score: 0, offense: 88, defense: 85, speed: 80 },
  { name: 'Los Angeles Dodgers', abbreviation: 'LAD', score: 0, offense: 86, defense: 88, speed: 82 },
  { name: 'Boston Red Sox', abbreviation: 'BOS', score: 0, offense: 85, defense: 82, speed: 78 },
  { name: 'Houston Astros', abbreviation: 'HOU', score: 0, offense: 84, defense: 86, speed: 80 },
  { name: 'Atlanta Braves', abbreviation: 'ATL', score: 0, offense: 90, defense: 80, speed: 84 },
  { name: 'San Diego Padres', abbreviation: 'SD', score: 0, offense: 82, defense: 84, speed: 85 },
];

// Helper function to advance runners - moved outside component
function advanceRunners(bases: [boolean, boolean, boolean], numBases: number): number {
  let runs = 0;
  const newBases: [boolean, boolean, boolean] = [false, false, false];

  // Move existing runners
  for (let i = 2; i >= 0; i--) {
    if (bases[i]) {
      const newPos = i + numBases;
      if (newPos >= 3) {
        runs++;
      } else {
        newBases[newPos] = true;
      }
    }
  }

  // Place batter
  if (numBases >= 3) {
    runs++;
  } else {
    newBases[numBases - 1] = true;
  }

  // Update original array
  bases[0] = newBases[0];
  bases[1] = newBases[1];
  bases[2] = newBases[2];

  return runs;
}

function BaseballGame({ gameInfo, onClose }: BaseballGameProps) {
  const { placeBet, resolveBet, state } = useApp();

  const [gameState, setGameState] = useState<BaseballGameState | null>(null);
  const [selectedHomeTeam, setSelectedHomeTeam] = useState<TeamStats>(TEAMS[0]);
  const [selectedAwayTeam, setSelectedAwayTeam] = useState<TeamStats>(TEAMS[1]);
  const [betAmount, setBetAmount] = useState<number>(50);
  const [betSelection, setBetSelection] = useState<'home' | 'away' | null>(null);
  const [currentBetId, setCurrentBetId] = useState<string | null>(null);
  const [gameLog, setGameLog] = useState<string[]>([]);
  const [showBetting, setShowBetting] = useState(true);
  
  // Use ref to track if bet was resolved to avoid state in effect
  const betResolvedRef = useRef(false);

  const addLog = useCallback((message: string) => {
    setGameLog((prev) => [...prev.slice(-9), message]);
  }, []);

  const initGame = () => {
    setGameState({
      homeTeam: { ...selectedHomeTeam, score: 0 },
      awayTeam: { ...selectedAwayTeam, score: 0 },
      inning: 1,
      isTopInning: true,
      outs: 0,
      balls: 0,
      strikes: 0,
      bases: [false, false, false],
      isPlaying: false,
      gameOver: false,
    });
    setGameLog([]);
    betResolvedRef.current = false;
    addLog(`⚾ ${selectedHomeTeam.name} vs ${selectedAwayTeam.name}`);
    addLog('Press START to play ball!');
  };

  const simulateAtBat = useCallback((gs: BaseballGameState): BaseballGameState => {
    const battingTeam = gs.isTopInning ? gs.awayTeam : gs.homeTeam;
    const pitchingTeam = gs.isTopInning ? gs.homeTeam : gs.awayTeam;

    const hitChance = (battingTeam.offense - pitchingTeam.defense + 50) / 150;
    const walkChance = 0.08;
    const strikeoutChance = 0.22;
    const homeRunChance = 0.03;
    const extraBaseChance = 0.15;

    let newHomeScore = gs.homeTeam.score;
    let newAwayScore = gs.awayTeam.score;
    let newOuts = gs.outs;
    const newBases: [boolean, boolean, boolean] = [...gs.bases];
    let log = '';

    const random = Math.random();

    if (random < strikeoutChance) {
      newOuts++;
      log = `🔇 Strikeout! ${newOuts} out${newOuts > 1 ? 's' : ''}`;
    } else if (random < strikeoutChance + walkChance) {
      // Walk - advance runners
      log = `🚶 Walk!`;
      const rbi = advanceRunners(newBases, 1);
      if (gs.isTopInning) {
        newAwayScore += rbi;
      } else {
        newHomeScore += rbi;
      }
      if (rbi > 0) log += ` RBI! ${rbi} run${rbi > 1 ? 's' : ''} score${rbi === 1 ? 's' : ''}!`;
    } else if (random < strikeoutChance + walkChance + homeRunChance) {
      // Home run!
      const rbi = 1 + newBases.filter(b => b).length;
      if (gs.isTopInning) {
        newAwayScore += rbi;
      } else {
        newHomeScore += rbi;
      }
      newBases[0] = false;
      newBases[1] = false;
      newBases[2] = false;
      log = `💥 HOME RUN! ${rbi} run${rbi > 1 ? 's' : ''} score!`;
    } else if (random < strikeoutChance + walkChance + homeRunChance + hitChance) {
      // Hit
      const hitType = Math.random();
      if (hitType < extraBaseChance) {
        // Extra base hit (double or triple)
        const isTriple = Math.random() < 0.3;
        const bases = isTriple ? 3 : 2;
        const rbi = advanceRunners(newBases, bases);
        if (gs.isTopInning) {
          newAwayScore += rbi;
        } else {
          newHomeScore += rbi;
        }
        log = isTriple ? `🏃 TRIPLE! ${rbi} RBI!` : `🏃 Double! ${rbi > 0 ? rbi + ' RBI!' : ''}`;
      } else {
        // Single
        const rbi = advanceRunners(newBases, 1);
        if (gs.isTopInning) {
          newAwayScore += rbi;
        } else {
          newHomeScore += rbi;
        }
        log = `🎯 Single! ${rbi > 0 ? rbi + ' RBI!' : ''}`;
      }
    } else {
      // Out
      const outType = Math.random();
      if (outType < 0.4) {
        log = `⬇️ Ground out. ${newOuts + 1} out${newOuts + 1 > 1 ? 's' : ''}`;
      } else if (outType < 0.7) {
        log = `🪰 Fly out. ${newOuts + 1} out${newOuts + 1 > 1 ? 's' : ''}`;
      } else {
        log = `⚾ Line out. ${newOuts + 1} out${newOuts + 1 > 1 ? 's' : ''}`;
      }
      newOuts++;
    }

    addLog(log);

    // Check for inning change
    let newInning = gs.inning;
    let newIsTopInning = gs.isTopInning;
    let isGameOver = false;
    const clearedBases: [boolean, boolean, boolean] = [false, false, false];

    if (newOuts >= 3) {
      newOuts = 0;
      if (gs.isTopInning) {
        newIsTopInning = false;
        addLog(`📢 Middle of ${gs.inning}. ${gs.homeTeam.abbreviation} coming to bat.`);
      } else {
        // Check for walk-off
        if (gs.inning >= 9 && newHomeScore > newAwayScore) {
          isGameOver = true;
          addLog(`🏆 WALK-OFF! ${gs.homeTeam.abbreviation} WINS!`);
        } else {
          newInning = gs.inning + 1;
          newIsTopInning = true;
          
          // Check end of game
          if (gs.inning >= 9 && newHomeScore !== newAwayScore) {
            isGameOver = true;
            const winner = newHomeScore > newAwayScore ? gs.homeTeam : gs.awayTeam;
            addLog(`🏆 GAME OVER! ${winner.abbreviation} WINS!`);
          } else {
            addLog(`📢 Top of ${newInning}. ${gs.awayTeam.abbreviation} coming to bat.`);
          }
        }
      }
      return {
        ...gs,
        homeTeam: { ...gs.homeTeam, score: newHomeScore },
        awayTeam: { ...gs.awayTeam, score: newAwayScore },
        inning: newInning,
        isTopInning: newIsTopInning,
        outs: newOuts,
        balls: 0,
        strikes: 0,
        bases: clearedBases,
        isPlaying: !isGameOver,
        gameOver: isGameOver,
      };
    }

    return {
      ...gs,
      homeTeam: { ...gs.homeTeam, score: newHomeScore },
      awayTeam: { ...gs.awayTeam, score: newAwayScore },
      inning: newInning,
      isTopInning: newIsTopInning,
      outs: newOuts,
      balls: 0,
      strikes: 0,
      bases: newBases,
      isPlaying: !isGameOver,
      gameOver: isGameOver,
    };
  }, [addLog]);

  useEffect(() => {
    if (!gameState?.isPlaying || gameState.gameOver) return;

    const interval = setInterval(() => {
      setGameState((prev) => {
        if (!prev || prev.gameOver) return prev;
        return simulateAtBat(prev);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [gameState?.isPlaying, gameState?.gameOver, simulateAtBat]);

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
      sport: 'baseball',
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

  const getInningDisplay = (): string => {
    if (!gameState) return '1st';
    const suffix = gameState.inning === 1 ? 'st' : gameState.inning === 2 ? 'nd' : gameState.inning === 3 ? 'rd' : 'th';
    return `${gameState.isTopInning ? '▲' : '▼'} ${gameState.inning}${suffix}`;
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
    diamond: {
      backgroundColor: '#4a7c40',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '20px',
      border: '4px solid #2d5a27',
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
    inning: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#FFD700',
    },
    outs: {
      fontSize: '16px',
      color: '#ff5252',
      marginTop: '8px',
    },
    basesContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '16px',
    },
    baseDiamond: {
      position: 'relative' as const,
      width: '80px',
      height: '80px',
    },
    base: (occupied: boolean, position: string) => {
      const positions: Record<string, { top?: string; left?: string; right?: string; bottom?: string; transform?: string }> = {
        first: { right: '0', top: '50%', transform: 'translateY(-50%)' },
        second: { top: '0', left: '50%', transform: 'translateX(-50%)' },
        third: { left: '0', top: '50%', transform: 'translateY(-50%)' },
      };
      const positionStyle = positions[position] || {};
      return {
        position: 'absolute' as const,
        width: '20px',
        height: '20px',
        backgroundColor: occupied ? '#FFD700' : '#444',
        transform: positionStyle.transform ? `rotate(45deg) ${positionStyle.transform}` : 'rotate(45deg)',
        top: positionStyle.top,
        left: positionStyle.left,
        right: positionStyle.right,
        bottom: positionStyle.bottom,
      };
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
          <div style={styles.title}>⚾ {gameInfo.name}</div>
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
        <div style={styles.title}>⚾ {gameInfo.name}</div>
        <button style={styles.backButton} onClick={onClose}>✕</button>
      </div>

      <div style={styles.diamond}>
        <div style={styles.scoreboard}>
          <div style={styles.teamScore}>
            <div style={styles.teamName}>{gameState?.awayTeam.name || 'Away'}</div>
            <div style={styles.score}>{gameState?.awayTeam.score || 0}</div>
          </div>
          <div style={styles.gameInfo}>
            <div style={styles.inning}>{getInningDisplay()}</div>
            <div style={styles.outs}>
              {gameState?.outs || 0} Out{(gameState?.outs || 0) !== 1 ? 's' : ''}
            </div>
            <div style={styles.basesContainer}>
              <div style={styles.baseDiamond}>
                <div style={styles.base(gameState?.bases[1] || false, 'second')} />
                <div style={styles.base(gameState?.bases[2] || false, 'third')} />
                <div style={styles.base(gameState?.bases[0] || false, 'first')} />
              </div>
            </div>
          </div>
          <div style={styles.teamScore}>
            <div style={styles.teamName}>{gameState?.homeTeam.name || 'Home'}</div>
            <div style={styles.score}>{gameState?.homeTeam.score || 0}</div>
          </div>
        </div>

        <div style={styles.controls}>
          {!gameState?.isPlaying && !gameState?.gameOver && (
            <button
              style={styles.button(true)}
              onClick={() => setGameState((prev) => prev ? { ...prev, isPlaying: true } : null)}
            >
              ▶️ PLAY BALL
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

export default BaseballGame;
