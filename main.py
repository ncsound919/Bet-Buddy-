import csv, json, math
from dataclasses import dataclass
from typing import List, Dict, Tuple


# ---------- helpers ----------
def D_from_decimal(d: float) -> float:
    return float(d)


def implied_p_from_D(D: float) -> float:
    return 1.0 / D


@dataclass
class Leg:
    leg_id: str
    sport: str
    game: str
    market: str  # ML/Spread/Total
    selection: str
    D: float  # decimal odds
    p_hat: float  # user model probability
    p_bk: float  # 1/D
    r: float  # edge ratio p_hat/p_bk = p_hat*D
    e: float  # efficiency log(r)/log(D)


def load_slate(path: str) -> List[Leg]:
    legs: List[Leg] = []
    with open(path, newline="") as f:
        for row in csv.DictReader(f):
            if not row["model_prob"]:
                continue
            D = D_from_decimal(float(row["decimal_odds"]))
            p_hat = float(row["model_prob"])
            p_bk = implied_p_from_D(D)
            r = p_hat * D
            e = (math.log(max(r, 1e-12)) / max(1e-12, math.log(D))) if D > 1.0 else -1e9
            legs.append(
                Leg(
                    leg_id=row["leg_id"],
                    sport=row["sport"],
                    game=row["game"],
                    market=row["market"],
                    selection=row["selection"],
                    D=D,
                    p_hat=p_hat,
                    p_bk=p_bk,
                    r=r,
                    e=e,
                )
            )
    return legs


def product(xs: List[float]) -> float:
    out = 1.0
    for x in xs:
        out *= x
    return out


def parlay_ev(Ds: List[float], ps: List[float]) -> Tuple[float, float, float]:
    D_star = product(Ds)
    p_star = product(ps)
    EV_per1 = p_star * D_star - 1.0
    return D_star, p_star, EV_per1


# ---------- TapSpeak summary ----------
def tapspeak(D_star: float, p_star: float, EV: float) -> str:
    if EV > 0 and p_star >= 0.05:
        tone = "high-confidence multi-leg"
    elif EV > 0:
        tone = "positive-ev longshot"
    else:
        tone = "negative-ev configuration"
    return (
        f"{tone}; hit prob {p_star:.3f}, gross decimal {D_star:.1f}, "
        f"EV/1u {EV:.2f}."
    )


# ---------- ticket builders ----------
def moonshot_builder(
    legs: List[Leg], target_D: float, min_r: float, max_legs: int
) -> List[List[Leg]]:
    good = [L for L in legs if L.r >= min_r]
    good.sort(key=lambda L: L.e, reverse=True)
    tickets = []
    # greedy fill until reaching target
    acc, sum_logD = [], 0.0
    for L in good:
        if len(acc) >= max_legs:
            break
        acc.append(L)
        sum_logD += math.log(L.D)
        if sum_logD >= math.log(target_D):
            tickets.append(acc[:])
            # start a new variant by dropping the weakest efficiency leg
            acc.sort(key=lambda x: x.e)
            if acc:
                acc.pop(0)
            sum_logD = sum(math.log(x.D) for x in acc)
    return tickets[:3]  # up to 3 designs


def spray_builder(
    legs: List[Leg],
    band_lo: float,
    band_hi: float,
    min_r: float,
    max_legs: int,
    max_tix: int,
) -> List[List[Leg]]:
    good = [L for L in legs if L.r >= min_r]
    good.sort(key=lambda L: (L.e, L.p_hat), reverse=True)
    tickets = []
    # simple combinatorial grow-and-cap
    for seed in good:
        cur = [seed]
        for L in good:
            if L.leg_id in {x.leg_id for x in cur}:
                continue
            if len(cur) >= max_legs:
                break
            D_now = product([x.D for x in cur + [L]])
            if D_now <= band_hi:
                cur.append(L)
                if D_now >= band_lo:
                    tickets.append(cur[:])
                    break
        if len(tickets) >= max_tix:
            break
    return tickets


def write_legs(legs: List[Leg], path: str):
    with open(path, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(
            [
                "leg_id",
                "sport",
                "game",
                "market",
                "selection",
                "D",
                "p_hat",
                "p_bk",
                "r",
                "e",
            ]
        )
        for L in legs:
            w.writerow(
                [
                    L.leg_id,
                    L.sport,
                    L.game,
                    L.market,
                    L.selection,
                    f"{L.D:.2f}",
                    f"{L.p_hat:.3f}",
                    f"{L.p_bk:.3f}",
                    f"{L.r:.3f}",
                    f"{L.e:.3f}",
                ]
            )


def write_tickets(tickets: List[List[Leg]], path: str):
    with open(path, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["ticket_id", "legs", "D_star", "p_star", "EV_per1", "tapspeak"])
        for i, T in enumerate(tickets, 1):
            Ds = [x.D for x in T]
            ps = [x.p_hat for x in T]
            D_star, p_star, EV = parlay_ev(Ds, ps)
            w.writerow(
                [
                    f"T{i}",
                    " | ".join(f"{x.leg_id}:{x.selection}@{x.D:.2f}" for x in T),
                    f"{D_star:.2f}",
                    f"{p_star:.4f}",
                    f"{EV:.2f}",
                    tapspeak(D_star, p_star, EV),
                ]
            )


# ---------- main ----------
if __name__ == "__main__":
    with open("config.json") as f:
        cfg = json.load(f)
    legs = load_slate("slate.csv")
    write_legs(legs, "legs_scored.csv")

    # Moonshot
    target_D = cfg["moonshot"]["target_gross_per_unit"]
    moon = moonshot_builder(
        legs, target_D, cfg["filters"]["min_edge_ratio"], cfg["moonshot"]["max_legs"]
    )
    write_tickets(moon, "tickets_moonshot.csv")

    # Spray
    lo, hi = cfg["spray"]["payout_band"]
    spray = spray_builder(
        legs,
        lo,
        hi,
        cfg["filters"]["min_edge_ratio"],
        cfg["spray"]["max_legs"],
        cfg["spray"]["max_tickets"],
    )
    write_tickets(spray, "tickets_spray.csv")

    print("Done. Wrote: legs_scored.csv, tickets_moonshot.csv, tickets_spray.csv")
