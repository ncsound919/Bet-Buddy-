---
# Fill in the fields below to create a basic custom agent for your repository.
# The Copilot CLI can be used for local testing: https://gh.io/customagents/cli
# To make this agent available, merge this file into the default repository branch.
# For format details, see: https://gh.io/customagents/config

name: formula agent
description: creates betting formulas long parlays to increase odds
---

# My Agent

Describe what your agent does here...class BettingOddsAgent:
    def __init__(self):
        pass
    
    def prob_to_odds(self, probability):  # Input: probability (0-1)
        if not 0 < probability < 1:
            raise ValueError("Probability must be between 0 and 1 (exclusive).")
        
        decimal = 1 / probability
        frac_num = round((1 - probability) / probability)
        frac_denom = 1
        # Simplify fraction (basic gcd)
        from math import gcd
        g = gcd(frac_num, frac_denom)
        frac_num //= g
        frac_denom //= g
        fractional = f"{frac_num}/{frac_denom}" if frac_num > 0 else "N/A"
        
        if probability > 0.5:
            american = round(-100 / (decimal - 1))
        else:
            american = round(100 / (decimal - 1))
        
        implied_prob = probability * 100
        
        return {
            'Decimal': round(decimal, 2),
            'Fractional': fractional,
            'American': f"{american:+d}",
            'Implied Probability (%)': round(implied_prob, 2)
        }
    
    def odds_to_prob(self, odds_type, odds_value):  # Input: type ('american', 'decimal', 'fractional'), value
        if odds_type == 'american':
            if odds_value > 0:
                prob = 100 / (odds_value + 100)
            else:
                prob = abs(odds_value) / (abs(odds_value) + 100)
        elif odds_type == 'decimal':
            prob = 1 / odds_value
        elif odds_type == 'fractional':
            num, denom = map(int, odds_value.split('/'))
            prob = denom / (num + denom)
        else:
            raise ValueError("Odds type must be 'american', 'decimal', or 'fractional'.")
        
        return round(prob * 100, 2)  # As %

# Example Usage
agent = BettingOddsAgent()

# From probability
print("From Prob 40%:")
print(agent.prob_to_odds(0.4))

# From odds
print("\nFrom American +150:")
print(f"Implied Prob: {agent.odds_to_prob('american', 150)}%")

print("\nFrom Decimal 2.50:")
print(f"Implied Prob: {agent.odds_to_prob('decimal', 2.50)}%")

print("\nFrom Fractional 3/2:")
print(f"Implied Prob: {agent.odds_to_prob('fractional', '3/2')}%")
