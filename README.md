# un-real-estate

**the real cost, before you sign.**

Every real estate platform in India makes money from builders. Their "cost calculators" show you what the builder wants you to see. This tool shows you what they don't.

---

## The Problem

A buyer walks into a deal seeing one number: the agreement value. What they don't see:

- Stamp duty and registration that vary by state, gender, and city zone — and are charged on the **higher** of agreement value or circle rate, not what you negotiated
- GST at 5% on under-construction properties (1% for affordable housing under Rs 45L) — charged on every milestone payment, not at the end
- Pre-EMI interest during construction — interest-only payments on disbursed loan amounts that do **not** reduce your principal. On a 30-month construction cycle with a Rs 60L loan, this is Rs 5-8L in dead money
- Rent paid simultaneously during construction if the buyer hasn't moved out of their current home
- Loan processing fees, CERSAI charges, MODT documentation
- Society maintenance deposits (typically 2 years advance), corpus/sinking fund, club membership, utility connection deposits
- The cash component reality: when a builder demands Rs 30L in cash, a broker (almost always builder-connected) arranges the cash and charges 3-5% as a handling fee — paid in cash, zero paper trail. The buyer's actual burden becomes Rs 31-31.5L, not Rs 30L
- Interior fit-out costs that range from Rs 0 (fully furnished) to Rs 45L+ (bare shell luxury) for the same 1200 sqft apartment
- Annual recurring costs — property tax, insurance, maintenance — that compound over a 20-year tenure into a number larger than most buyers expect
- The opportunity cost of locking Rs 15-30L in a down payment instead of investing it

Most buyers discover these costs one at a time, after they've committed. This tool shows all of them before they sign.

---

## What Makes This Different

### 1. The Pyramid — Not a Spreadsheet

The interface is built around a visual pyramid. Users fill in details by expanding accordion sections (flat, equal cards). When complete, a "Transform" button morphs the flat cards into a proportional pyramid — sorted by actual cost weight, largest at the base. The shape itself tells the story: loan interest might be a bigger block than the property price.

Each segment is clickable for detailed line-item breakdowns. Floating labels show percentage contribution and rupee value. Timestamp labels show *when* that cost hits.

### 2. Cash Component Intelligence

No other calculator models the shadow economics of cash deals:

- **Handling fee**: 2% under Rs 10L, scaling to 5% above Rs 50L. Charged by builder-connected middlemen to source cash. Fee itself paid in cash.
- **Timing**: User specifies when cash is due (booking / registration / possession) — appears correctly in payment timeline.
- **Legal risk**: Section 269ST (100% penalty), Section 68/69 (78.6% tax), Benami Act (confiscation). IT Department's Project Insight uses AI to flag income-property mismatches.
- **Visual flagging**: Pulsing red indicator on the pyramid segment + dedicated warning banner.

### 3. Construction-Aware Calculations

Selecting "Under Construction" triggers follow-up inputs for possession timeline and current rent status, unlocking:

- **Pre-EMI interest**: Interest on ~50% average loan disbursement over construction months. Dead money — does not reduce principal.
- **Rent overlap**: Monthly rent x construction months. Two housing costs running in parallel.
- **Timeline accuracy**: Payment timeline correctly sequences milestone payments, pre-EMI, rent overlap, and post-possession EMI.

### 4. Interior / Furnishing Status

Handover condition (Bare Shell / Semi-Furnished / Fully Furnished for new; Move-in Ready / Refresh / Major Renovation for resale) dynamically adjusts the interior budget from Rs 0 to Rs 45L+. Resale renovation costs scale by property age (Rs 200/sqft for 0-5yr to Rs 1300/sqft for 20+yr).

### 5. Four Result Tabs

- **Insights**: Plain-English cards — multiplier, cash reality, pre-EMI drain, bank profit, gender-based stamp duty savings
- **Timeline**: Step-by-step payment events tagged "YOU" or "BANK" + loan amortization chart showing the interest-principal crossover year
- **Buy vs Rent**: Cumulative cost chart + opportunity cost analysis + directional verdict
- **Intelligence**: 2 free AI insights (Gemini Flash + Google Search), 6 locked premium cards with blurred teasers, email waitlist

### 6. AI Layer — Gemini Flash

Free tier uses Gemini 2.0 Flash for three reasons:
- **Built-in Google Search grounding** at zero additional cost — every insight is search-backed
- **Strongest Indic language support** at this price point for future Hindi/Telugu/Marathi localisation
- **Cost**: ~Rs 1-2 per 100 users. 50K users/month = under Rs 2,500/month total AI cost

Anti-hallucination enforced at schema level: exact JSON structure, every field search-backed or `null`, temperature 0.1. Results cached 12hrs per city.

Premium PDF reports (planned) will use Claude Sonnet for multi-step reasoning at Rs 499/report.

---

## Calculation Engine

### Government Charges
| Component | Logic |
|---|---|
| Stamp Duty | State + gender specific. Metro surcharges: Hyderabad +0.5%, Mumbai +1% |
| Registration | State rate, capped where applicable (Maharashtra: Rs 30,000) |
| Cess | Karnataka: 10% of stamp duty |
| GST | 5% under-construction (1% affordable). 0% ready/resale |
| TDS | 1% if value > Rs 50L (buyer deposits on seller's behalf) |
| Legal + Docs | 0.3% of value (Rs 15K-50K range) + Rs 5,000 franking |

### Financing
| Component | Logic |
|---|---|
| EMI | `P * r * (1+r)^n / ((1+r)^n - 1)` standard amortization |
| Pre-EMI | `(Loan * 50%) * (rate/12) * construction_months` |
| Processing | 0.5% of loan |
| CERSAI + MODT | Rs 500 + Rs 3,000-8,000 |

### Cash Component
| Component | Logic |
|---|---|
| Handling Fee | 2% (<10L), 3% (10-20L), 4% (20-50L), 5% (>50L) |
| Total Burden | Cash + handling fee |

### Move-in & Society
| Component | Logic |
|---|---|
| Interior | Carpet x quality tier (Rs 0-3,800/sqft based on handover + choice) |
| Renovation | Carpet x age-based rate (resale only: Rs 200-1,300/sqft) |
| Maintenance Deposit | Monthly maintenance x 24 months |
| Corpus Fund | Max(Rs 50,000, 0.5% of value) |
| Parking | Rs 1.5-5L by type and city |

### Recurring (Annual)
| Component | Logic |
|---|---|
| Maintenance | Carpet x city-specific rate (Rs 2-6/sqft/month) |
| Property Tax | Value x city rate (0.08-0.2%) |
| Insurance | Max(Rs 3,000, 0.05% of value) |

### Opportunity Cost
| Component | Logic |
|---|---|
| Down Payment FV | Day-1 cash compounded at user's expected return rate |
| Monthly Savings FV | (EMI + recurring/12 - rent) invested monthly |
| Property Appreciation | Base price at 4% and 7% CAGR |
| Total Rent | Monthly rent x 12 x tenure x 1.5 (5% annual hike average) |

---

## Supported Regions

| State | Cities | Stamp Duty (M/F) |
|---|---|---|
| Telangana | Hyderabad GHMC, Suburbs, Warangal | 6% / 6% + metro cess |
| Maharashtra | Mumbai, Pune, Thane, Nagpur | 6% / 5% + LBT (Mumbai) |
| Karnataka | Bengaluru BBMP, Outskirts, Mysuru | 5.6% / 4.2% + 10% cess |
| Delhi NCR | South Delhi, East/West, Noida, Gurgaon | 6% / 4% |
| Tamil Nadu | Chennai, Coimbatore | 7% / 7% |

Each city includes: circle rate range (for below-rate validation), maintenance rate/sqft, and property tax rate.

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | React 18 + Vite | Single-file, fast builds, no router needed |
| AI (Free) | Gemini 2.0 Flash | Cheapest with built-in Google Search |
| AI (Premium) | Claude Sonnet (planned) | Best reasoning for PDF reports |
| Serverless | Netlify Functions | API key server-side, auto-scales |
| Waitlist | Netlify Forms | Zero config, dashboard collection |
| Typography | Plus Jakarta Sans + JetBrains Mono | Editorial + data |

---

## Deploy

```powershell
# Already deployed. To redeploy after changes:
git add -A
git commit -m "your message"
git push
```
Netlify auto-builds on push. Environment variable `GEMINI_API_KEY` in Site Settings.

### Local Dev
```
cp .env.example .env   # Add Gemini key
npm install
npx netlify dev         # localhost:8888
```

### Waitlist Submissions
Netlify dashboard → Forms → "waitlist". Captures: email, pincode, city, state, price.

---

## Roadmap

- [x] Pyramid visualization with proportional transform
- [x] Cash component with handling fee + legal risk
- [x] Under-construction (pre-EMI, rent overlap, timeline)
- [x] Resale (age, renovation, transfer fees, brokerage)
- [x] Furnishing status with dynamic interior budgets
- [x] 4 result tabs (Insights, Timeline, Buy vs Rent, Intelligence)
- [x] Gemini Flash free insights with search grounding
- [x] Netlify Forms waitlist
- [ ] Hindi / Telugu / Marathi localisation
- [ ] Premium PDF (Claude multi-agent chain)
- [ ] Razorpay integration
- [ ] PMAY subsidy + Section 24(b)/80C tax benefits
- [ ] Pre-payment impact simulator
- [ ] Delayed possession scenario modelling

---

**un-real-estate** — because the brochure only shows half the truth.
