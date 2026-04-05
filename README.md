# un-real-estate — the real cost, before you sign

Free cost intelligence tool for Indian homebuyers. Pyramid visualization, cash component reality, AI market insights, email waitlist.

## Deploy (10 minutes)

### 1. Get Gemini API key
Go to https://aistudio.google.com/apikey — create key (free: 1500 req/day)

### 2. Push to GitHub
```bash
git init && git add -A && git commit -m "un-real-estate v3"
gh repo create un-real-estate --public --source=. --push
```

### 3. Deploy on Netlify
1. app.netlify.com → Add new site → Import from Git
2. Select repo — build settings auto-detected from netlify.toml
3. Site Settings → Environment Variables → Add: `GEMINI_API_KEY` = your key
4. Trigger redeploy

### 4. Verify
- Calculator works without API key (pure client-side)
- AI insights need the key (Intelligence tab → "Get Insights")
- Waitlist submissions: Netlify dashboard → Forms → "waitlist"

## Architecture
```
src/App.jsx              — Full app (pyramid UX, calculator, 4 result tabs)
netlify/functions/intel.js — Gemini Flash proxy (search-grounded, JSON schema)
```

### AI: 2 free + 6 locked
- Free: Market Direction + Price Trend (Gemini Flash with Google Search)
- Locked: Price Assessment, Supply Pipeline, Infrastructure, Negotiation, Builder Track Record, Target Alternatives
- Cached 12hrs per city in localStorage

### Waitlist: Netlify Forms
- `data-netlify="true"` on the form — zero config
- Captures: email, pincode, city, state, price
- View submissions: Netlify dashboard → Forms

### Cost at scale
- 50K users/month: ~$15 in Gemini costs
- Premium (future): Claude Sonnet for PDF reports, Rs 499 each
