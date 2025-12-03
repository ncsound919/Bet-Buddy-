/**
 * Games Hub Component
 * Browse and access sports simulation games
 */

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { GameInfo, SportType } from '../types';
import BasketballGame from '../games/BasketballGame';
import FootballGame from '../games/FootballGame';
import BaseballGame from '../games/BaseballGame';

interface GamesHubProps {
  onClose?: () => void;
}

function GamesHub({ onClose }: GamesHubProps) {
  const { state, unlockGame } = useApp();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [filter, setFilter] = useState<SportType | 'all'>('all');

  const filteredGames = state.games.filter(
    (game) => filter === 'all' || game.sport === filter
  );

  const handleUnlock = (game: GameInfo) => {
    if (unlockGame(game.id)) {
      // Show success message or animation
    }
  };

  const handlePlay = (game: GameInfo) => {
    if (game.unlocked) {
      setSelectedGame(game.id);
    }
  };

  const getSportEmoji = (sport: SportType): string => {
    switch (sport) {
      case 'basketball':
        return '🏀';
      case 'football':
        return '🏈';
      case 'baseball':
        return '⚾';
      default:
        return '🎮';
    }
  };

  const styles = {
    container: {
      backgroundColor: '#0d0d1a',
      minHeight: '100vh',
      padding: '24px',
      color: '#fff',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    title: {
      fontSize: '32px',
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
      fontSize: '28px',
      cursor: 'pointer',
      padding: '8px',
    },
    filterBar: {
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
      flexWrap: 'wrap' as const,
    },
    filterButton: (active: boolean) => ({
      padding: '10px 20px',
      borderRadius: '20px',
      border: 'none',
      backgroundColor: active ? '#667eea' : '#1a1a2e',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: active ? 'bold' : 'normal',
      transition: 'all 0.2s ease',
    }),
    gamesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
    },
    gameCard: (unlocked: boolean) => ({
      backgroundColor: '#1a1a2e',
      borderRadius: '16px',
      overflow: 'hidden',
      border: unlocked ? '2px solid #4CAF50' : '2px solid transparent',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
    }),
    gameThumbnail: {
      height: '160px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '64px',
    },
    gameInfo: {
      padding: '20px',
    },
    gameName: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    gameDesc: {
      fontSize: '14px',
      color: '#888',
      marginBottom: '16px',
      lineHeight: 1.4,
    },
    gameFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    badge: (isFree: boolean) => ({
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold',
      backgroundColor: isFree ? '#4CAF5033' : '#FFD70033',
      color: isFree ? '#4CAF50' : '#FFD700',
    }),
    playButton: (unlocked: boolean) => ({
      padding: '10px 24px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: unlocked ? '#4CAF50' : '#667eea',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '14px',
    }),
    cost: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      color: '#FFD700',
      fontWeight: 'bold',
    },
  };

  // If a game is selected, show the game component
  if (selectedGame) {
    const game = state.games.find((g) => g.id === selectedGame);
    if (game) {
      const GameComponent = {
        basketball: BasketballGame,
        football: FootballGame,
        baseball: BaseballGame,
      }[game.sport];

      return (
        <div style={styles.container}>
          <GameComponent
            gameInfo={game}
            onClose={() => setSelectedGame(null)}
          />
        </div>
      );
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🎮 Sports Games</h1>
        {onClose && (
          <button style={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        )}
      </div>

      <div style={styles.filterBar}>
        <button
          style={styles.filterButton(filter === 'all')}
          onClick={() => setFilter('all')}
        >
          All Games
        </button>
        <button
          style={styles.filterButton(filter === 'basketball')}
          onClick={() => setFilter('basketball')}
        >
          🏀 Basketball
        </button>
        <button
          style={styles.filterButton(filter === 'football')}
          onClick={() => setFilter('football')}
        >
          🏈 Football
        </button>
        <button
          style={styles.filterButton(filter === 'baseball')}
          onClick={() => setFilter('baseball')}
        >
          ⚾ Baseball
        </button>
      </div>

      <div style={styles.gamesGrid}>
        {filteredGames.map((game) => (
          <div
            key={game.id}
            style={styles.gameCard(game.unlocked)}
            onClick={() => game.unlocked && handlePlay(game)}
          >
            <div style={styles.gameThumbnail}>
              {getSportEmoji(game.sport)}
            </div>
            <div style={styles.gameInfo}>
              <div style={styles.gameName}>{game.name}</div>
              <div style={styles.gameDesc}>{game.description}</div>
              <div style={styles.gameFooter}>
                <div>
                  {game.isFree ? (
                    <span style={styles.badge(true)}>FREE</span>
                  ) : game.unlocked ? (
                    <span style={styles.badge(true)}>UNLOCKED</span>
                  ) : (
                    <span style={styles.cost}>
                      💰 {game.cost} SimVC
                    </span>
                  )}
                </div>
                {game.unlocked ? (
                  <button
                    style={styles.playButton(true)}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(game);
                    }}
                  >
                    ▶️ Play
                  </button>
                ) : (
                  <button
                    style={styles.playButton(false)}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnlock(game);
                    }}
                    disabled={state.simVC.amount < game.cost}
                  >
                    🔓 Unlock
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div style={{ textAlign: 'center', color: '#888', padding: '40px' }}>
          No games found for this category
        </div>
      )}
    </div>
  );
}

export default GamesHub;
