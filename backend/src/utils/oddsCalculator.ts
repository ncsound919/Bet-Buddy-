/**
 * Odds Calculator Tool
 * Converts between different odds formats and calculates probabilities
 * No external dependencies - pure TypeScript implementation
 */

export interface OddsConversion {
  decimal: number;
  fractional: string;
  american: number;
  impliedProbability: number;
}

/**
 * Convert decimal odds to all formats
 */
export function convertFromDecimal(decimal: number): OddsConversion {
  if (decimal < 1) {
    throw new Error('Decimal odds must be 1 or greater');
  }

  // Fractional odds
  const fractional = decimalToFractional(decimal);

  // American odds
  const american = decimalToAmerican(decimal);

  // Implied probability
  const impliedProbability = (1 / decimal) * 100;

  return {
    decimal,
    fractional,
    american,
    impliedProbability: parseFloat(impliedProbability.toFixed(2)),
  };
}

/**
 * Convert American odds to all formats
 */
export function convertFromAmerican(american: number): OddsConversion {
  if (american === 0 || (american > -100 && american < 100)) {
    throw new Error('American odds must be <= -100 or >= 100');
  }

  // Decimal odds
  const decimal = americanToDecimal(american);

  return convertFromDecimal(decimal);
}

/**
 * Convert fractional odds (e.g., "5/2") to all formats
 */
export function convertFromFractional(fractional: string): OddsConversion {
  const parts = fractional.split('/');
  if (parts.length !== 2) {
    throw new Error('Fractional odds must be in format "numerator/denominator"');
  }

  const numerator = parseFloat(parts[0]);
  const denominator = parseFloat(parts[1]);

  if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
    throw new Error('Invalid fractional odds');
  }

  const decimal = numerator / denominator + 1;

  return convertFromDecimal(decimal);
}

// Helper functions
function decimalToFractional(decimal: number): string {
  const decimalValue = decimal - 1;
  const gcd = findGCD(Math.round(decimalValue * 100), 100);
  const numerator = Math.round(decimalValue * 100) / gcd;
  const denominator = 100 / gcd;

  return `${numerator}/${denominator}`;
}

function decimalToAmerican(decimal: number): number {
  if (decimal >= 2) {
    return Math.round((decimal - 1) * 100);
  } else {
    return Math.round(-100 / (decimal - 1));
  }
}

function americanToDecimal(american: number): number {
  if (american > 0) {
    return american / 100 + 1;
  } else {
    return 1 - 100 / american;
  }
}

function findGCD(a: number, b: number): number {
  return b === 0 ? a : findGCD(b, a % b);
}

/**
 * Calculate potential return from stake and odds
 */
export function calculateReturn(stake: number, odds: number, format: 'decimal' | 'american' | 'fractional' = 'decimal'): number {
  if (stake <= 0) {
    throw new Error('Stake must be greater than 0');
  }

  let decimal = odds;

  if (format === 'american') {
    decimal = americanToDecimal(odds);
  } else if (format === 'fractional') {
    const parts = odds.toString().split('/');
    decimal = parseFloat(parts[0]) / parseFloat(parts[1]) + 1;
  }

  return parseFloat((stake * decimal).toFixed(2));
}

/**
 * Calculate profit from stake and odds
 */
export function calculateProfit(stake: number, odds: number, format: 'decimal' | 'american' | 'fractional' = 'decimal'): number {
  const totalReturn = calculateReturn(stake, odds, format);
  return parseFloat((totalReturn - stake).toFixed(2));
}
