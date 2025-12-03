/**
 * Tools API Routes
 * Exposes utility tools as API endpoints
 */

import { Router, Request, Response } from 'express';
import {
  convertFromDecimal,
  convertFromAmerican,
  convertFromFractional,
  calculateReturn,
  calculateProfit,
} from '../utils/oddsCalculator';
import {
  calculateStatistics,
  calculateKellyCriterion,
  calculateExpectedValue,
  BetResult,
} from '../utils/statisticsEngine';
import {
  validateStake,
  validateOdds,
  validateBet,
  BetData,
} from '../utils/dataValidator';
import { exportData, BetRecord } from '../utils/dataExporter';
import {
  formatCurrency,
  formatPercentage,
  formatOdds,
  formatDate,
} from '../utils/dataFormatter';
import {
  calculateSuggestedStake,
  calculateFlatStake,
  calculateUnitSize,
  checkBettingLimits,
  calculateStopLevels,
  getResponsibleGamblingTips,
  evaluateBettingSession,
  BankrollConfig,
} from '../utils/bankrollManager';

const router = Router();

// Odds Calculator Endpoints
router.post('/odds/convert/decimal', (req: Request, res: Response) => {
  try {
    const { decimal } = req.body;
    if (!decimal) {
      res.status(400).json({ error: 'Decimal odds value is required' });
      return;
    }
    const result = convertFromDecimal(Number(decimal));
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/odds/convert/american', (req: Request, res: Response) => {
  try {
    const { american } = req.body;
    if (!american) {
      res.status(400).json({ error: 'American odds value is required' });
      return;
    }
    const result = convertFromAmerican(Number(american));
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/odds/convert/fractional', (req: Request, res: Response) => {
  try {
    const { fractional } = req.body;
    if (!fractional) {
      res.status(400).json({ error: 'Fractional odds value is required' });
      return;
    }
    const result = convertFromFractional(String(fractional));
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/odds/calculate-return', (req: Request, res: Response) => {
  try {
    const { stake, odds, format = 'decimal' } = req.body;
    if (!stake || !odds) {
      res.status(400).json({ error: 'Stake and odds are required' });
      return;
    }
    const result = calculateReturn(Number(stake), Number(odds), format);
    res.json({ stake, odds, format, return: result, profit: result - Number(stake) });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/odds/calculate-profit', (req: Request, res: Response) => {
  try {
    const { stake, odds, format = 'decimal' } = req.body;
    if (!stake || !odds) {
      res.status(400).json({ error: 'Stake and odds are required' });
      return;
    }
    const result = calculateProfit(Number(stake), Number(odds), format);
    res.json({ stake, odds, format, profit: result });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Statistics Engine Endpoints
router.post('/statistics/calculate', (req: Request, res: Response) => {
  try {
    const { bets } = req.body;
    if (!Array.isArray(bets)) {
      res.status(400).json({ error: 'Bets array is required' });
      return;
    }
    const result = calculateStatistics(bets as BetResult[]);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/statistics/kelly-criterion', (req: Request, res: Response) => {
  try {
    const { winProbability, odds } = req.body;
    if (!winProbability || !odds) {
      res.status(400).json({ error: 'Win probability and odds are required' });
      return;
    }
    const result = calculateKellyCriterion(Number(winProbability), Number(odds));
    res.json({ 
      winProbability, 
      odds, 
      kellyCriterion: result,
      recommendation: result > 0 ? 'Bet recommended' : 'No edge - do not bet'
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/statistics/expected-value', (req: Request, res: Response) => {
  try {
    const { stake, winProbability, odds } = req.body;
    if (!stake || !winProbability || !odds) {
      res.status(400).json({ error: 'Stake, win probability, and odds are required' });
      return;
    }
    const result = calculateExpectedValue(
      Number(stake),
      Number(winProbability),
      Number(odds)
    );
    res.json({ 
      stake, 
      winProbability, 
      odds, 
      expectedValue: result,
      recommendation: result > 0 ? 'Positive expected value' : 'Negative expected value'
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Data Validator Endpoints
router.post('/validate/stake', (req: Request, res: Response) => {
  try {
    const { stake, minStake, maxStake } = req.body;
    if (stake === undefined) {
      res.status(400).json({ error: 'Stake is required' });
      return;
    }
    const result = validateStake(Number(stake), minStake, maxStake);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/validate/odds', (req: Request, res: Response) => {
  try {
    const { odds, format = 'decimal' } = req.body;
    if (odds === undefined) {
      res.status(400).json({ error: 'Odds value is required' });
      return;
    }
    const result = validateOdds(odds, format);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/validate/bet', (req: Request, res: Response) => {
  try {
    const betData = req.body as BetData;
    if (!betData) {
      res.status(400).json({ error: 'Bet data is required' });
      return;
    }
    const result = validateBet(betData);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Data Exporter Endpoints
router.post('/export', (req: Request, res: Response) => {
  try {
    const { bets, format = 'json' } = req.body;
    if (!Array.isArray(bets)) {
      res.status(400).json({ error: 'Bets array is required' });
      return;
    }
    
    const result = exportData(bets as BetRecord[], format);
    
    // Set appropriate content type
    const contentTypes: { [key: string]: string } = {
      csv: 'text/csv',
      json: 'application/json',
      jsonlines: 'application/x-ndjson',
      tsv: 'text/tab-separated-values',
      html: 'text/html',
      markdown: 'text/markdown',
    };
    
    res.set('Content-Type', contentTypes[format] || 'text/plain');
    res.send(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Data Formatter Endpoints
router.post('/format/currency', (req: Request, res: Response) => {
  try {
    const { amount, currency = 'USD', locale = 'en-US' } = req.body;
    if (amount === undefined) {
      res.status(400).json({ error: 'Amount is required' });
      return;
    }
    const result = formatCurrency(Number(amount), currency, locale);
    res.json({ original: amount, formatted: result });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/format/percentage', (req: Request, res: Response) => {
  try {
    const { value, decimalPlaces = 2, includeSign = false } = req.body;
    if (value === undefined) {
      res.status(400).json({ error: 'Value is required' });
      return;
    }
    const result = formatPercentage(Number(value), decimalPlaces, includeSign);
    res.json({ original: value, formatted: result });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/format/odds', (req: Request, res: Response) => {
  try {
    const { odds, format = 'decimal' } = req.body;
    if (odds === undefined) {
      res.status(400).json({ error: 'Odds value is required' });
      return;
    }
    const result = formatOdds(Number(odds), format);
    res.json({ original: odds, format, formatted: result });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/format/date', (req: Request, res: Response) => {
  try {
    const { date, style = 'medium', locale = 'en-US' } = req.body;
    if (!date) {
      res.status(400).json({ error: 'Date is required' });
      return;
    }
    const result = formatDate(date, style, locale);
    res.json({ original: date, formatted: result });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Bankroll Management Endpoints
router.post('/bankroll/suggested-stake', (req: Request, res: Response) => {
  try {
    const { bankroll, odds, estimatedWinProbability, riskTolerance = 'moderate' } = req.body;
    if (bankroll == null || odds == null || estimatedWinProbability == null) {
      res.status(400).json({ error: 'Bankroll, odds, and estimatedWinProbability are required' });
      return;
    }
    const result = calculateSuggestedStake(
      Number(bankroll),
      Number(odds),
      Number(estimatedWinProbability),
      riskTolerance
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/bankroll/flat-stake', (req: Request, res: Response) => {
  try {
    const { bankroll, riskTolerance = 'moderate' } = req.body;
    if (bankroll == null) {
      res.status(400).json({ error: 'Bankroll is required' });
      return;
    }
    const stake = calculateFlatStake(Number(bankroll), riskTolerance);
    res.json({
      bankroll: Number(bankroll),
      riskTolerance,
      suggestedStake: stake,
      unitsPerBankroll: Math.round(Number(bankroll) / stake),
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/bankroll/unit-size', (req: Request, res: Response) => {
  try {
    const { bankroll, unitsInBankroll = 100 } = req.body;
    if (bankroll == null) {
      res.status(400).json({ error: 'Bankroll is required' });
      return;
    }
    const unitSize = calculateUnitSize(Number(bankroll), Number(unitsInBankroll));
    res.json({
      bankroll: Number(bankroll),
      unitsInBankroll: Number(unitsInBankroll),
      unitSize,
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/bankroll/check-limits', (req: Request, res: Response) => {
  try {
    const { stake, config, currentDailyWagered = 0, currentWeeklyWagered = 0, currentMonthlyWagered = 0 } = req.body;
    if (stake == null || config == null) {
      res.status(400).json({ error: 'Stake and config are required' });
      return;
    }
    const result = checkBettingLimits(
      Number(stake),
      config as BankrollConfig,
      Number(currentDailyWagered),
      Number(currentWeeklyWagered),
      Number(currentMonthlyWagered)
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/bankroll/stop-levels', (req: Request, res: Response) => {
  try {
    const { bankroll, riskTolerance = 'moderate' } = req.body;
    if (bankroll == null) {
      res.status(400).json({ error: 'Bankroll is required' });
      return;
    }
    const result = calculateStopLevels(Number(bankroll), riskTolerance);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get('/bankroll/responsible-gambling', (_req: Request, res: Response) => {
  try {
    const tips = getResponsibleGamblingTips();
    res.json(tips);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/bankroll/evaluate-session', (req: Request, res: Response) => {
  try {
    const { recentResults, bankroll, originalBankroll } = req.body;
    if (!recentResults || bankroll === undefined || originalBankroll === undefined) {
      res.status(400).json({ error: 'recentResults, bankroll, and originalBankroll are required' });
      return;
    }
    const result = evaluateBettingSession(recentResults, Number(bankroll), Number(originalBankroll));
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Tools listing endpoint
router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Overlay Odds Tools API',
    version: '1.0.0',
    tools: {
      oddsCalculator: {
        endpoints: [
          'POST /api/tools/odds/convert/decimal',
          'POST /api/tools/odds/convert/american',
          'POST /api/tools/odds/convert/fractional',
          'POST /api/tools/odds/calculate-return',
          'POST /api/tools/odds/calculate-profit',
        ],
      },
      statisticsEngine: {
        endpoints: [
          'POST /api/tools/statistics/calculate',
          'POST /api/tools/statistics/kelly-criterion',
          'POST /api/tools/statistics/expected-value',
        ],
      },
      dataValidator: {
        endpoints: [
          'POST /api/tools/validate/stake',
          'POST /api/tools/validate/odds',
          'POST /api/tools/validate/bet',
        ],
      },
      dataExporter: {
        endpoints: ['POST /api/tools/export'],
        supportedFormats: ['csv', 'json', 'jsonlines', 'tsv', 'html', 'markdown'],
      },
      dataFormatter: {
        endpoints: [
          'POST /api/tools/format/currency',
          'POST /api/tools/format/percentage',
          'POST /api/tools/format/odds',
          'POST /api/tools/format/date',
        ],
      },
      bankrollManager: {
        endpoints: [
          'POST /api/tools/bankroll/suggested-stake',
          'POST /api/tools/bankroll/flat-stake',
          'POST /api/tools/bankroll/unit-size',
          'POST /api/tools/bankroll/check-limits',
          'POST /api/tools/bankroll/stop-levels',
          'GET /api/tools/bankroll/responsible-gambling',
          'POST /api/tools/bankroll/evaluate-session',
        ],
        description: 'Bankroll management and responsible gambling tools',
      },
    },
  });
});

export default router;
