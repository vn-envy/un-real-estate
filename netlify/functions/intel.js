// Secure proxy: API key in Netlify env vars, never touches browser.
// Returns 2 free insight cards (market direction + price trend).
// Full 6-card report reserved for premium.

export default async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { status: 200, headers: cors() });
  if (req.method !== "POST") return json({ error: "POST only" }, 405);

  const KEY = process.env.GEMINI_API_KEY;
  if (!KEY) return json({ error: "GEMINI_API_KEY not set" }, 500);

  let body;
  try { body = await req.json(); } catch { return json({ error: "Bad JSON" }, 400); }
  const { state, city, basePrice, carpet } = body;
  if (!state || !city) return json({ error: "state and city required" }, 400);

  const psf = carpet > 0 ? Math.round(basePrice / carpet) : 0;
  const prompt = `You are an independent Indian real estate market analyst. Zero builder affiliation.

A buyer is looking at an apartment in ${city}, ${state} at Rs ${(basePrice||0).toLocaleString("en-IN")} (Rs ${psf}/sqft, ${carpet} sqft).

Search the web for the MOST RECENT data (2024-2026 only) and return this exact JSON. If no search-backed data exists for a field, return null. NEVER guess.

{
  "market_direction": {
    "signal": "buyers_market" | "sellers_market" | "balanced" | null,
    "reason": "One sentence with specific data" | null
  },
  "price_trend": {
    "direction": "rising" | "stable" | "falling" | null,
    "yoy_pct": number | null,
    "detail": "One sentence with data" | null
  },
  "rate_outlook": {
    "repo": number | null,
    "direction": "likely_cut" | "hold" | "likely_hike" | null,
    "note": "One sentence" | null
  },
  "buyer_tip": "One specific, actionable tip for this city and price point" | null,
  "data_freshness": "Month Year of most recent data" | null
}

RULES: Search-backed only. Null > guess. Recent data only. Be specific to this city.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          tools: [{ google_search: {} }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 1024, response_mime_type: "application/json" },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Gemini error:", res.status, err);
      return json({ error: "AI unavailable", status: res.status }, 502);
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.find(p => p.text)?.text;
    if (!text) return json({ error: "Empty AI response" }, 502);

    let parsed;
    try { parsed = JSON.parse(text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim()); }
    catch { parsed = { raw: text, parse_error: true }; }

    const sources = (data?.candidates?.[0]?.groundingMetadata?.groundingChunks || [])
      .map(c => ({ title: c.web?.title, url: c.web?.uri }))
      .filter(s => s.url);

    return json({ data: parsed, sources, ts: new Date().toISOString() });
  } catch (e) {
    console.error("Function error:", e);
    return json({ error: e.message }, 500);
  }
};

function json(d, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { "Content-Type": "application/json", ...cors() } });
}
function cors() {
  return { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST,OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
}
export const config = { path: "/api/intel" };
