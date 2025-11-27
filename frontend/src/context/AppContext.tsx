/**
 * App Context Provider
 * Manages global application state including SimVC, settings, and games
 */

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type {
  AppState,
  SimVCTransaction,
  SimBet,
  ToolSettings,
  APIIntegration,
  GameInfo,
} from '../types';
import { defaultAppState } from '../types';
import { generateUniqueId } from '../utils/generateId';

// Action types
type AppAction =
  | { type: 'ADD_SIMVC'; amount: number; description: string }
  | { type: 'SPEND_SIMVC'; amount: number; description: string; gameId?: string }
  | { type: 'UPDATE_TOOL_SETTINGS'; settings: Partial<ToolSettings> }
  | { type: 'UPDATE_API_INTEGRATION'; integration: APIIntegration }
  | { type: 'PLACE_BET'; bet: SimBet }
  | { type: 'RESOLVE_BET'; betId: string; won: boolean }
  | { type: 'UNLOCK_GAME'; gameId: string }
  | { type: 'SET_THEME'; theme: 'light' | 'dark' | 'system' }
  | { type: 'TOGGLE_SOUND'; enabled: boolean }
  | { type: 'TOGGLE_NOTIFICATIONS'; enabled: boolean }
  | { type: 'LOAD_STATE'; state: AppState };

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_SIMVC': {
      const transaction: SimVCTransaction = {
        id: generateUniqueId('tx'),
        type: 'earn',
        amount: action.amount,
        description: action.description,
        timestamp: new Date(),
      };
      return {
        ...state,
        simVC: {
          amount: state.simVC.amount + action.amount,
          lastUpdated: new Date(),
        },
        transactions: [transaction, ...state.transactions].slice(0, 100), // Keep last 100
      };
    }

    case 'SPEND_SIMVC': {
      if (state.simVC.amount < action.amount) return state;
      const transaction: SimVCTransaction = {
        id: generateUniqueId('tx'),
        type: 'spend',
        amount: -action.amount,
        description: action.description,
        timestamp: new Date(),
        gameId: action.gameId,
      };
      return {
        ...state,
        simVC: {
          amount: state.simVC.amount - action.amount,
          lastUpdated: new Date(),
        },
        transactions: [transaction, ...state.transactions].slice(0, 100),
      };
    }

    case 'UPDATE_TOOL_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          toolSettings: { ...state.settings.toolSettings, ...action.settings },
        },
      };

    case 'UPDATE_API_INTEGRATION': {
      const updatedIntegrations = state.settings.apiIntegrations.map((i) =>
        i.id === action.integration.id ? action.integration : i
      );
      return {
        ...state,
        settings: {
          ...state.settings,
          apiIntegrations: updatedIntegrations,
        },
      };
    }

    case 'PLACE_BET': {
      if (state.simVC.amount < action.bet.amount) return state;
      const transaction: SimVCTransaction = {
        id: generateUniqueId('tx'),
        type: 'spend',
        amount: -action.bet.amount,
        description: `Bet placed: ${action.bet.selection}`,
        timestamp: new Date(),
        gameId: action.bet.gameId,
      };
      return {
        ...state,
        simVC: {
          amount: state.simVC.amount - action.bet.amount,
          lastUpdated: new Date(),
        },
        activeBets: [...state.activeBets, action.bet],
        transactions: [transaction, ...state.transactions].slice(0, 100),
      };
    }

    case 'RESOLVE_BET': {
      const bet = state.activeBets.find((b) => b.id === action.betId);
      if (!bet) return state;

      const winAmount = action.won ? bet.potentialPayout : 0;
      const transaction: SimVCTransaction = {
        id: generateUniqueId('tx'),
        type: action.won ? 'bet_win' : 'bet_loss',
        amount: action.won ? winAmount : 0,
        description: action.won
          ? `Won bet: ${bet.selection} (+${winAmount} SimVC)`
          : `Lost bet: ${bet.selection}`,
        timestamp: new Date(),
        gameId: bet.gameId,
      };

      return {
        ...state,
        simVC: {
          amount: state.simVC.amount + winAmount,
          lastUpdated: new Date(),
        },
        activeBets: state.activeBets.map((b) =>
          b.id === action.betId ? { ...b, status: action.won ? 'won' : 'lost' } : b
        ),
        transactions: [transaction, ...state.transactions].slice(0, 100),
      };
    }

    case 'UNLOCK_GAME': {
      const game = state.games.find((g) => g.id === action.gameId);
      if (!game || game.unlocked || state.simVC.amount < game.cost) return state;

      const transaction: SimVCTransaction = {
        id: generateUniqueId('tx'),
        type: 'spend',
        amount: -game.cost,
        description: `Unlocked game: ${game.name}`,
        timestamp: new Date(),
        gameId: action.gameId,
      };

      return {
        ...state,
        simVC: {
          amount: state.simVC.amount - game.cost,
          lastUpdated: new Date(),
        },
        games: state.games.map((g) =>
          g.id === action.gameId ? { ...g, unlocked: true } : g
        ),
        transactions: [transaction, ...state.transactions].slice(0, 100),
      };
    }

    case 'SET_THEME':
      return {
        ...state,
        settings: { ...state.settings, theme: action.theme },
      };

    case 'TOGGLE_SOUND':
      return {
        ...state,
        settings: { ...state.settings, soundEnabled: action.enabled },
      };

    case 'TOGGLE_NOTIFICATIONS':
      return {
        ...state,
        settings: { ...state.settings, notifications: action.enabled },
      };

    case 'LOAD_STATE':
      return action.state;

    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Convenience methods
  addSimVC: (amount: number, description: string) => void;
  spendSimVC: (amount: number, description: string, gameId?: string) => boolean;
  placeBet: (bet: Omit<SimBet, 'id' | 'status' | 'timestamp'>) => boolean;
  resolveBet: (betId: string, won: boolean) => void;
  unlockGame: (gameId: string) => boolean;
  updateToolSettings: (settings: Partial<ToolSettings>) => void;
  updateAPIIntegration: (integration: APIIntegration) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = 'bet-buddy-state';

// Load state from localStorage
function loadState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      return {
        ...defaultAppState,
        ...parsed,
        simVC: {
          ...parsed.simVC,
          lastUpdated: new Date(parsed.simVC.lastUpdated),
        },
        transactions: parsed.transactions.map((t: SimVCTransaction) => ({
          ...t,
          timestamp: new Date(t.timestamp),
        })),
        activeBets: parsed.activeBets.map((b: SimBet) => ({
          ...b,
          timestamp: new Date(b.timestamp),
        })),
      };
    }
  } catch (e) {
    console.error('Failed to load state:', e);
  }
  return defaultAppState;
}

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, null, loadState);

  // Save state to localStorage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Convenience methods
  const addSimVC = (amount: number, description: string) => {
    dispatch({ type: 'ADD_SIMVC', amount, description });
  };

  const spendSimVC = (amount: number, description: string, gameId?: string): boolean => {
    if (state.simVC.amount < amount) return false;
    dispatch({ type: 'SPEND_SIMVC', amount, description, gameId });
    return true;
  };

  const placeBet = (bet: Omit<SimBet, 'id' | 'status' | 'timestamp'>): boolean => {
    if (state.simVC.amount < bet.amount) return false;
    const fullBet: SimBet = {
      ...bet,
      id: generateUniqueId('bet'),
      status: 'pending',
      timestamp: new Date(),
    };
    dispatch({ type: 'PLACE_BET', bet: fullBet });
    return true;
  };

  const resolveBet = (betId: string, won: boolean) => {
    dispatch({ type: 'RESOLVE_BET', betId, won });
  };

  const unlockGame = (gameId: string): boolean => {
    const game = state.games.find((g: GameInfo) => g.id === gameId);
    if (!game || game.unlocked || state.simVC.amount < game.cost) return false;
    dispatch({ type: 'UNLOCK_GAME', gameId });
    return true;
  };

  const updateToolSettings = (settings: Partial<ToolSettings>) => {
    dispatch({ type: 'UPDATE_TOOL_SETTINGS', settings });
  };

  const updateAPIIntegration = (integration: APIIntegration) => {
    dispatch({ type: 'UPDATE_API_INTEGRATION', integration });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        addSimVC,
        spendSimVC,
        placeBet,
        resolveBet,
        unlockGame,
        updateToolSettings,
        updateAPIIntegration,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Hook to use app context
export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
