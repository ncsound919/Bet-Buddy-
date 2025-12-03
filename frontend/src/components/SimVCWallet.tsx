/**
 * SimVC Wallet Component
 * Displays virtual currency balance and transaction history
 */

import { useState } from 'react';
import { useApp } from '../context/AppContext';

interface SimVCWalletProps {
  compact?: boolean;
}

function SimVCWallet({ compact = false }: SimVCWalletProps) {
  const { state, addSimVC } = useApp();
  const [showHistory, setShowHistory] = useState(false);

  const formatAmount = (amount: number): string => {
    return amount.toLocaleString();
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Daily bonus claim (can be expanded)
  const claimDailyBonus = () => {
    addSimVC(100, 'Daily bonus claimed');
  };

  const styles = {
    container: {
      backgroundColor: '#1a1a2e',
      borderRadius: '16px',
      padding: compact ? '12px 16px' : '20px',
      color: '#fff',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: compact ? '0' : '16px',
    },
    label: {
      fontSize: '14px',
      color: '#888',
      marginBottom: '4px',
    },
    balance: {
      fontSize: compact ? '24px' : '32px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    vcIcon: {
      fontSize: compact ? '20px' : '28px',
      marginRight: '8px',
    },
    balanceContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    actions: {
      display: 'flex',
      gap: '8px',
      marginTop: '16px',
    },
    button: {
      flex: 1,
      padding: '12px 16px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '#667eea',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '14px',
      transition: 'transform 0.2s ease, background-color 0.2s ease',
    },
    secondaryButton: {
      flex: 1,
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid #444',
      backgroundColor: 'transparent',
      color: '#888',
      cursor: 'pointer',
      fontSize: '14px',
    },
    historySection: {
      marginTop: '20px',
      borderTop: '1px solid #333',
      paddingTop: '16px',
    },
    historyTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '12px',
      color: '#667eea',
    },
    transaction: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid #2a2a3e',
    },
    txInfo: {
      flex: 1,
    },
    txDesc: {
      fontSize: '14px',
      marginBottom: '4px',
    },
    txDate: {
      fontSize: '12px',
      color: '#666',
    },
    txAmount: (isPositive: boolean) => ({
      fontSize: '16px',
      fontWeight: 'bold',
      color: isPositive ? '#4CAF50' : '#ff5252',
    }),
    emptyState: {
      textAlign: 'center' as const,
      color: '#666',
      padding: '20px',
    },
  };

  if (compact) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <div style={styles.label}>SimVC Balance</div>
            <div style={styles.balanceContainer}>
              <span style={styles.vcIcon}>💰</span>
              <span style={styles.balance}>{formatAmount(state.simVC.amount)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <div style={styles.label}>SimVC Balance</div>
          <div style={styles.balanceContainer}>
            <span style={styles.vcIcon}>💰</span>
            <span style={styles.balance}>{formatAmount(state.simVC.amount)}</span>
          </div>
        </div>
      </div>

      <div style={styles.actions}>
        <button style={styles.button} onClick={claimDailyBonus}>
          🎁 Daily Bonus
        </button>
        <button
          style={styles.secondaryButton}
          onClick={() => setShowHistory(!showHistory)}
        >
          📜 {showHistory ? 'Hide' : 'History'}
        </button>
      </div>

      {showHistory && (
        <div style={styles.historySection}>
          <h4 style={styles.historyTitle}>Transaction History</h4>
          {state.transactions.length === 0 ? (
            <div style={styles.emptyState}>No transactions yet</div>
          ) : (
            state.transactions.slice(0, 10).map((tx) => (
              <div key={tx.id} style={styles.transaction}>
                <div style={styles.txInfo}>
                  <div style={styles.txDesc}>{tx.description}</div>
                  <div style={styles.txDate}>{formatDate(tx.timestamp)}</div>
                </div>
                <div style={styles.txAmount(tx.amount > 0)}>
                  {tx.amount > 0 ? '+' : ''}{formatAmount(tx.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SimVCWallet;
