import { useState } from 'react';

interface Guide {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  content: string;
}

const guides: Guide[] = [
  {
    id: 'understanding-odds',
    title: 'Understanding Betting Odds',
    category: 'Basics',
    difficulty: 'Beginner',
    content: `
## What Are Betting Odds?

Betting odds represent the probability of an event occurring and determine how much you can win from a bet. There are three main formats:

### 1. Decimal Odds (European)
The most straightforward format. Your total return = Stake × Odds.

**Example:** At 2.50 odds, a $10 bet returns $25 ($15 profit + $10 stake).

### 2. American Odds (Moneyline)
- **Positive odds (+150):** Shows profit on a $100 bet. +150 means win $150 on a $100 bet.
- **Negative odds (-150):** Shows how much to bet to win $100. -150 means bet $150 to win $100.

### 3. Fractional Odds (UK)
Written as a fraction (5/2). The first number is profit, second is stake.

**Example:** At 5/2 odds, you win $5 for every $2 wagered.

### Implied Probability
Odds also tell you the bookmaker's estimated probability:
- Decimal: Probability = 1 / Decimal Odds
- At 2.00 odds: 1/2.00 = 50% implied probability

**Tip:** Compare the implied probability to your own estimate to find value bets!
    `,
  },
  {
    id: 'types-of-bets',
    title: 'Types of Bets Explained',
    category: 'Basics',
    difficulty: 'Beginner',
    content: `
## Common Bet Types

### Moneyline (Match Winner)
Simply pick who wins. No point spread involved.
- Favorites have negative odds (lower risk, lower reward - more likely to win but pay less)
- Underdogs have positive odds (higher risk, higher reward - less likely to win but pay more)

### Point Spread
The favorite must win by more than the spread, or the underdog must lose by less than the spread (or win).

**Example:** Lakers -5.5 means they must win by 6+ points.

### Totals (Over/Under)
Bet on whether the total combined score will be over or under a set number.

**Example:** O/U 215.5 - bet on whether both teams' combined score is over or under 215.5 points.

### Parlays
Combine multiple bets into one. All selections must win for the parlay to pay out. Higher risk, higher reward.

**Warning:** While payouts are larger, the probability of winning decreases with each added leg.

### Props (Proposition Bets)
Bets on specific events within a game, not the final outcome.

**Examples:**
- Player to score first
- Total touchdowns by a player
- Team to score first

### Futures
Bets on events that will be decided in the future.

**Examples:**
- Season MVP
- Championship winner
- Division winner
    `,
  },
  {
    id: 'bankroll-management',
    title: 'Bankroll Management 101',
    category: 'Strategy',
    difficulty: 'Beginner',
    content: `
## Protecting Your Bankroll

The most important skill in betting is managing your money. Here's how to do it right:

### Set a Bankroll
Your bankroll is money set aside **specifically** for betting - money you can afford to lose.

**Never bet with:**
- Rent or bill money
- Emergency funds
- Money borrowed from others

### The Unit System
A "unit" is a fixed percentage of your bankroll, typically 1-5%.

**Example with $1,000 bankroll:**
- Conservative: 1% = $10 per unit
- Moderate: 2% = $20 per unit
- Aggressive: 5% = $50 per unit

### Staking Strategies

**Flat Betting:** Same stake on every bet. Simplest and safest approach.

**Percentage Betting:** Stake a fixed percentage of current bankroll. Adjusts as your bankroll grows or shrinks.

**Kelly Criterion:** Mathematical formula to optimize bet size based on edge. More complex but potentially more profitable.

### Golden Rules
1. **Never chase losses** - Stick to your unit size
2. **Don't bet your entire bankroll** on one bet
3. **Track all bets** to identify patterns
4. **Set loss limits** - Stop betting if you hit your daily/weekly limit
5. **Take breaks** - Step away when on a losing streak
    `,
  },
  {
    id: 'kelly-criterion',
    title: 'The Kelly Criterion',
    category: 'Strategy',
    difficulty: 'Intermediate',
    content: `
## Kelly Criterion: Optimal Bet Sizing

The Kelly Criterion is a mathematical formula to determine the optimal bet size based on your edge.

### The Formula
\`\`\`
f* = (bp - q) / b
\`\`\`

Where:
- **f*** = fraction of bankroll to bet
- **b** = net odds (decimal odds - 1)
- **p** = probability of winning
- **q** = probability of losing (1 - p)

### Example
You estimate a 55% chance of winning at 2.00 odds:
- b = 2.00 - 1 = 1.00
- p = 0.55
- q = 0.45

f* = (1.00 × 0.55 - 0.45) / 1.00 = 0.10 = **10% of bankroll**

### Fractional Kelly
Full Kelly is aggressive. Most bettors use a fraction:
- **Quarter Kelly (25%):** Very conservative
- **Half Kelly (50%):** Recommended for most bettors
- **Three-Quarter Kelly (75%):** More aggressive

Using the example above with Half Kelly: 10% × 0.5 = **5% of bankroll**

### When to Use Kelly
✅ You have a reliable edge estimate
✅ Long-term perspective
✅ Comfortable with variance

### When NOT to Use Kelly
❌ Unsure of your probability estimates
❌ Correlated bets (parlays)
❌ Unable to handle drawdowns
    `,
  },
  {
    id: 'finding-value',
    title: 'Finding Value Bets',
    category: 'Strategy',
    difficulty: 'Intermediate',
    content: `
## What is a Value Bet?

A value bet occurs when the probability of an outcome is **higher** than what the odds suggest.

### The Concept
Bookmakers set odds based on their probability estimates. If you believe the true probability is higher, there's value.

**Example:**
- Bookmaker odds: 2.50 (40% implied probability)
- Your estimate: 50% chance of winning
- **This is a value bet!** You expect positive long-term returns.

### How to Find Value

**1. Develop Your Own Models**
- Research team/player statistics
- Consider factors bookmakers might miss
- Track your predictions vs. outcomes

**2. Shop for Odds**
Different bookmakers offer different odds. Always use the best available.

**3. Specialize**
Focus on specific leagues or markets where you have an edge.

**4. Look for Situational Spots**
- Teams playing on short rest
- Key injuries not reflected in odds
- Motivation factors (playoff clinching, rivalry games)

### Expected Value (EV)
Calculate your expected profit per bet:

\`\`\`
EV = (Win Probability × Potential Profit) - (Lose Probability × Stake)
\`\`\`

**Positive EV = Value Bet!**

### Warning Signs
- Odds seem "too good" - research why
- Sharp money moving the opposite direction
- Line moves against your position
    `,
  },
  {
    id: 'avoiding-common-mistakes',
    title: 'Common Betting Mistakes to Avoid',
    category: 'Psychology',
    difficulty: 'Beginner',
    content: `
## Top Mistakes and How to Avoid Them

### 1. Chasing Losses
**The Mistake:** Increasing bets to recover losses quickly.
**The Fix:** Stick to your staking plan regardless of recent results.

### 2. Betting Without Research
**The Mistake:** Betting based on gut feeling or team loyalty.
**The Fix:** Base decisions on data and analysis, not emotion.

### 3. Ignoring Bankroll Management
**The Mistake:** Betting random amounts or too large a portion of bankroll.
**The Fix:** Use a consistent unit size (1-5% of bankroll).

### 4. Overvaluing Parlays
**The Mistake:** Always betting parlays for bigger payouts.
**The Fix:** Understand parlays favor the bookmaker. Use sparingly.

### 5. Recency Bias
**The Mistake:** Overweighting recent performances.
**The Fix:** Consider larger sample sizes and long-term trends.

### 6. Not Shopping for Odds
**The Mistake:** Always using the same bookmaker.
**The Fix:** Compare odds across multiple books.

### 7. Betting Too Many Games
**The Mistake:** Betting every game to stay entertained.
**The Fix:** Be selective. Only bet when you find value.

### 8. Ignoring Line Movement
**The Mistake:** Not paying attention to how odds change.
**The Fix:** Track line movement to understand where sharp money goes.

### 9. Betting Under Influence
**The Mistake:** Making bets when drunk or emotional.
**The Fix:** Never bet when impaired. Clear mind = better decisions.

### 10. Not Tracking Bets
**The Mistake:** No record of wins, losses, or ROI.
**The Fix:** Track every bet to identify strengths and weaknesses.
    `,
  },
  {
    id: 'responsible-gambling',
    title: 'Responsible Gambling Guide',
    category: 'Safety',
    difficulty: 'Beginner',
    content: `
## Gambling Responsibly

Betting should be entertainment, not a source of income or a way to escape problems.

### Signs of Problem Gambling
- Betting more than you can afford
- Chasing losses
- Borrowing money to gamble
- Neglecting work, family, or responsibilities
- Lying about gambling habits
- Feeling anxious or irritable when not betting
- Unable to stop or cut back

### Setting Healthy Limits

**Money Limits:**
- Set a strict betting budget
- Never use money needed for bills
- Set daily, weekly, and monthly limits

**Time Limits:**
- Limit betting sessions
- Take regular breaks
- Don't bet every day

**Emotional Limits:**
- Don't bet when upset or stressed
- Stop if it's no longer fun
- Recognize when emotions are driving decisions

### Tools to Help

**Self-Exclusion:** Most betting sites offer temporary or permanent self-exclusion.

**Deposit Limits:** Set maximum deposit amounts on your accounts.

**Reality Checks:** Enable notifications that show time/money spent.

### Getting Help

If you or someone you know has a gambling problem:

🇺🇸 **National Council on Problem Gambling**
1-800-522-4700 | ncpgambling.org

🇬🇧 **GamCare**
0808-8020-133 | gamcare.org.uk

🌍 **Gamblers Anonymous**
gamblersanonymous.org

**Remember:** Asking for help is a sign of strength, not weakness.
    `,
  },
  {
    id: 'line-shopping',
    title: 'Line Shopping: Finding the Best Odds',
    category: 'Strategy',
    difficulty: 'Intermediate',
    content: `
## Why Line Shopping Matters

Even small differences in odds can significantly impact your long-term profits.

### The Math
Consider betting $100 on a 50/50 proposition:

| Bookmaker | Odds | Win Return | Expected Value |
|-----------|------|------------|----------------|
| Book A    | 1.91 | $191       | -$4.50         |
| Book B    | 1.95 | $195       | -$2.50         |
| Book C    | 2.00 | $200       | $0.00          |

Over 100 bets at Book A: -$450
Over 100 bets at Book C: $0

**That's $450 saved just by shopping!**

### How to Line Shop Effectively

**1. Use Multiple Sportsbooks**
Sign up at 3-5 different bookmakers to compare odds.

**2. Check Before Every Bet**
Compare odds before placing any wager.

**3. Use Odds Comparison Sites**
Many sites aggregate odds from multiple books.

**4. Consider Timing**
- Odds change throughout the day
- Early lines often have value
- Late lines reflect more information

### Best Practices

✅ Focus on your primary sports/leagues
✅ Note which books have the best odds for different sports
✅ Factor in any deposit/withdrawal fees
✅ Consider bonuses and promotions

### Important Notes
- Opening multiple accounts takes time upfront but pays off long-term
- Always use legal, licensed sportsbooks
- Keep track of balances across all accounts
    `,
  },
];

const categories = ['All', 'Basics', 'Strategy', 'Psychology', 'Safety'];

function EducationalResources() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuides = guides.filter((guide) => {
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#4CAF50';
      case 'Intermediate':
        return '#FF9800';
      case 'Advanced':
        return '#f44336';
      default:
        return '#888';
    }
  };

  if (selectedGuide) {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <button
          onClick={() => setSelectedGuide(null)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          ← Back to Guides
        </button>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
          <span
            style={{
              padding: '4px 8px',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            {selectedGuide.category}
          </span>
          <span
            style={{
              padding: '4px 8px',
              backgroundColor: getDifficultyColor(selectedGuide.difficulty),
              color: 'white',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            {selectedGuide.difficulty}
          </span>
        </div>

        <h1>{selectedGuide.title}</h1>

        <div
          style={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            lineHeight: '1.6',
          }}
        >
          {selectedGuide.content.split('\n').map((line, idx) => {
            if (line.startsWith('## ')) {
              return (
                <h2 key={idx} style={{ marginTop: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                  {line.replace('## ', '')}
                </h2>
              );
            }
            if (line.startsWith('### ')) {
              return (
                <h3 key={idx} style={{ marginTop: '15px', color: '#333' }}>
                  {line.replace('### ', '')}
                </h3>
              );
            }
            if (line.startsWith('**') && line.endsWith('**')) {
              return (
                <p key={idx} style={{ fontWeight: 'bold', marginTop: '10px' }}>
                  {line.replace(/\*\*/g, '')}
                </p>
              );
            }
            if (line.startsWith('- ') || line.startsWith('✅') || line.startsWith('❌')) {
              return (
                <p key={idx} style={{ marginLeft: '20px', marginTop: '5px' }}>
                  {line}
                </p>
              );
            }
            if (line.startsWith('```')) {
              return null;
            }
            if (line.trim() === '') {
              return <br key={idx} />;
            }
            return (
              <p key={idx} style={{ marginTop: '5px' }}>
                {line}
              </p>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>📚 Educational Resources</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Learn the fundamentals of sports betting, from understanding odds to advanced strategies.
      </p>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search guides..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        />
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '8px 16px',
              backgroundColor: selectedCategory === category ? '#4CAF50' : '#e0e0e0',
              color: selectedCategory === category ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            onClick={() => setSelectedGuide(guide)}
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <span
                style={{
                  padding: '2px 8px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                  fontSize: '11px',
                }}
              >
                {guide.category}
              </span>
              <span
                style={{
                  padding: '2px 8px',
                  backgroundColor: getDifficultyColor(guide.difficulty),
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '11px',
                }}
              >
                {guide.difficulty}
              </span>
            </div>
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{guide.title}</h3>
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
              {guide.content.slice(0, 100).replace(/[#*`]/g, '')}...
            </p>
          </div>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            color: '#666',
          }}
        >
          <p>No guides found matching your search.</p>
        </div>
      )}

      <div
        style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ margin: '0 0 10px 0' }}>⚠️ Remember: Bet Responsibly</h3>
        <p style={{ margin: 0 }}>
          Sports betting should be entertainment, not a source of income. Never bet more than you can afford to lose.
          If you feel gambling is becoming a problem, please seek help at{' '}
          <a href="https://www.ncpgambling.org/" target="_blank" rel="noopener noreferrer">
            ncpgambling.org
          </a>{' '}
          or call 1-800-522-4700.
        </p>
      </div>
    </div>
  );
}

export default EducationalResources;
