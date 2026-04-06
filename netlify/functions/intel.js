export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: cors() });
  }
  if (req.method !== "POST") {
    return resp({ error: "POST only" }, 405);
  }

  const KEY = process.env.GEMINI_API_KEY;
  if (!KEY) {
    return resp({ error: "GEMINI_API_KEY not set" }, 500);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return resp({ error: "Bad JSON" }, 400);
  }

  const { state, city, basePrice, carpet } = body;
  if (!state || !city) {
    return resp({ error: "state, city required" }, 400);
  }

  const psf = carpet > 0 ? Math.round(basePrice / carpet) : 0;
  const priceLakh = Math.round((basePrice || 0) / 100000);

  const prompt = `You are an independent Indian real estate analyst. Zero builder affiliation.

Buyer looking at apartment in ${city}, ${state} at Rs ${priceLakh} lakh (Rs ${psf}/sqft, ${carpet} sqft).

Return ONLY this JSON (no markdown, no backticks):
{
  "market_direction": {"signal":"buyers_market" or "sellers_market" or "balanced" or null,"reason":"one sentence" or null},
  "price_trend": {"direction":"rising" or "stable" or "falling" or null,"yoy_pct":number or null,"detail":"one sentence" or null},
  "rate_outlook": {"repo":number or null,"direction":"likely_cut" or "hold" or "likely_hike" or null,"note":"one sentence" or null},
  "buyer_tip":"one actionable tip for this city" or null,
  "data_freshness":"month year" or null
}
Use null if unsure. Never guess. Be specific to ${city}.`;

  const attempts = [
    { model: "gemini-2.0-flash", ground: false },
    { model: "gemini-2.0-flash", ground: true },
    { model: "gemini-1.5-flash", ground: false },
  ];

  for (const att of attempts) {
    try {
      const reqBody = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.15, maxOutputTokens: 1024 },
      };
      if (att.ground) {
        reqBody.tools = [{ google_search: {} }];
      }

      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${att.model}:generateContent?key=${KEY}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(reqBody) }
      );

      if (!r.ok) {
        console.error(`${att.model} g=${att.ground}: ${r.status}`);
        continue;
      }

      const d = await r.json();
      const txt = d?.candidates?.[0]?.content?.parts?.find(p => p.text)?.text;
      if (!txt) continue;

      const clean = txt.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim();
      const start = clean.indexOf("{");
      const end = clean.lastIndexOf("}");
      if (start === -1 || end === -1) continue;

      let parsed;
      try {
        parsed = JSON.parse(clean.substring(start, end + 1));
      } catch {
        console.error(`${att.model} parse fail`);
        continue;
      }

      const sources = (d?.candidates?.[0]?.groundingMetadata?.groundingChunks || [])
        .map(c => ({ title: c.web?.title, url: c.web?.uri })).filter(s => s.url);

      return resp({ data: parsed, sources, model: att.model, grounded: att.ground && sources.length > 0, ts: new Date().toISOString() });
    } catch (e) {
      console.error(`${att.model} err:`, e.message);
      continue;
    }
  }

  return resp({ error: "AI unavailable. Try again." }, 502);
};

function resp(d, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { "Content-Type": "application/json", ...cors() } });
}
function cors() {
  return { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST,OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
}
export const config = { path: "/api/intel" };
