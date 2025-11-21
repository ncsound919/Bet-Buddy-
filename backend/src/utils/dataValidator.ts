/**
 * Data Validator Tool
 * Validates betting data inputs
 * No external dependencies - pure TypeScript implementation
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validate bet stake amount
 */
export function validateStake(stake: number, minStake = 0.01, maxStake = 1000000): ValidationResult {
  const errors: string[] = [];

  if (typeof stake !== 'number' || isNaN(stake)) {
    errors.push('Stake must be a valid number');
  } else if (stake < minStake) {
    errors.push(`Stake must be at least ${minStake}`);
  } else if (stake > maxStake) {
    errors.push(`Stake must not exceed ${maxStake}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate odds value
 */
export function validateOdds(
  odds: number | string,
  format: 'decimal' | 'american' | 'fractional' = 'decimal'
): ValidationResult {
  const errors: string[] = [];

  if (format === 'decimal') {
    const oddsNum = Number(odds);
    if (typeof oddsNum !== 'number' || isNaN(oddsNum)) {
      errors.push('Decimal odds must be a valid number');
    } else if (oddsNum < 1) {
      errors.push('Decimal odds must be 1.00 or greater');
    } else if (oddsNum > 1000) {
      errors.push('Decimal odds seem unreasonably high (>1000)');
    }
  } else if (format === 'american') {
    const oddsNum = Number(odds);
    if (typeof oddsNum !== 'number' || isNaN(oddsNum)) {
      errors.push('American odds must be a valid number');
    } else if (oddsNum === 0 || (oddsNum > -100 && oddsNum < 100)) {
      errors.push('American odds must be <= -100 or >= 100');
    }
  } else if (format === 'fractional') {
    const oddsStr = String(odds);
    const parts = oddsStr.split('/');
    if (parts.length !== 2) {
      errors.push('Fractional odds must be in format "numerator/denominator"');
    } else {
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);
      if (isNaN(numerator) || isNaN(denominator)) {
        errors.push('Fractional odds must contain valid numbers');
      } else if (denominator === 0) {
        errors.push('Denominator cannot be zero');
      } else if (numerator < 0 || denominator < 0) {
        errors.push('Fractional odds cannot be negative');
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate date string or Date object
 */
export function validateDate(date: string | Date): ValidationResult {
  const errors: string[] = [];

  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      errors.push('Invalid date format');
    } else if (dateObj > new Date()) {
      errors.push('Date cannot be in the future');
    }
  } catch {
    errors.push('Invalid date');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate bet result (won/lost)
 */
export function validateBetResult(result: boolean | string): ValidationResult {
  const errors: string[] = [];

  if (typeof result === 'boolean') {
    // Valid
  } else if (typeof result === 'string') {
    const normalized = result.toLowerCase();
    if (!['won', 'lost', 'win', 'lose', 'true', 'false', 'yes', 'no'].includes(normalized)) {
      errors.push('Bet result must be won/lost, win/lose, yes/no, or true/false');
    }
  } else {
    errors.push('Bet result must be a boolean or string');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate complete bet data
 */
export interface BetData {
  stake: number;
  odds: number | string;
  oddsFormat?: 'decimal' | 'american' | 'fractional';
  result: boolean | string;
  date?: string | Date;
}

export function validateBet(bet: BetData): ValidationResult {
  const errors: string[] = [];

  // Validate stake
  const stakeValidation = validateStake(bet.stake);
  if (!stakeValidation.isValid) {
    errors.push(...stakeValidation.errors);
  }

  // Validate odds
  const oddsFormat = bet.oddsFormat || 'decimal';
  const oddsValidation = validateOdds(bet.odds, oddsFormat);
  if (!oddsValidation.isValid) {
    errors.push(...oddsValidation.errors);
  }

  // Validate result
  const resultValidation = validateBetResult(bet.result);
  if (!resultValidation.isValid) {
    errors.push(...resultValidation.errors);
  }

  // Validate date if provided
  if (bet.date) {
    const dateValidation = validateDate(bet.date);
    if (!dateValidation.isValid) {
      errors.push(...dateValidation.errors);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize and normalize bet result
 */
export function normalizeBetResult(result: boolean | string): boolean {
  if (typeof result === 'boolean') {
    return result;
  }

  const normalized = result.toLowerCase();
  return ['won', 'win', 'true', 'yes'].includes(normalized);
}
