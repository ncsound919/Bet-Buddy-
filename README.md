# Parlay Formula Project

Batch daily odds you collect into `slate.csv`, then run portfolio builds and TapSpeak summaries.

## Files
- `slate.csv` — your collected odds for the day. See `slate.sample.csv` for schema.
- `config.json` — parameters for payout targets and ticket counts.
- `main.py` — runs selection, builds moonshot and spray tickets, writes outputs to CSV.

## Quick start
1) Paste your slate into `slate.csv` with the headers shown below.
2) Edit `config.json` if you want different targets.
3) Run:
```bash
python main.py
```
Outputs:
- `tickets_moonshot.csv`
- `tickets_spray.csv`
- `legs_scored.csv`

## CSV schema: `slate.csv`
```
leg_id,sport,game,market,selection,decimal_odds,model_prob
L1,NBA,MIL@WAS,ML,Bucks,1.28,0.83
L2,NBA,UTA@LAC,ML,Clippers,1.29,0.80
L3,NBA,TOR@ATL,Spread,Hawks -6,1.91,0.56
L4,NBA,CLE@NYK,ML,Knicks,1.57,0.64
L5,NBA,GSW@LAL,Total,Over 225.5,1.91,0.54
```
- `decimal_odds` are *book* decimal odds you observed.
- `model_prob` is your probability from *your* formulas (0–1). Leave blank if unknown; the tool will skip those legs.

## Notes
- The tool never scrapes the web. You paste odds you collected.
- Only moneyline, spreads, totals are supported.
- All outputs are math-only and neutral.
