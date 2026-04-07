export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: cors() });
  }
  if (req.method !== "POST") {
    return resp({ error: "POST only" }, 405);
  }

  const KEY = process.env.GEMINI_API_KEY;
  if (!KEY) {
    return resp({ error: "GEMINI_API_KEY not configured. Go to Netlify Site Settings > Environment Variables and add it." }, 500);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return resp({ error: "Invalid request body" }, 400);
  }

  const { state, city, basePrice, carpet } = body;
  if (!state || !city) {
    return resp({ error: "Missing state or city" }, 400);
  }

  const psf = carpet > 0 ? Math.round(basePrice / carpet) : 0;
  const priceLakh = Math.round((basePrice || 0) / 100000);

  const prompt = `You are an independent Indian real estate analyst. Zero builder affiliation.

Buyer looking at apartment in ${city}, ${state} at Rs ${priceLakh} lakh (Rs ${psf}/sqft, ${carpet} sqft).

Return ONLY valid JSON with no other text:
{"market_direction":{"signal":"buyers_market" or "sellers_market" or "balanced" or null,"reason":"one sentence" or null},"price_trend":{"direction":"rising" or "stable" or "falling" or null,"yoy_pct":number or null,"detail":"one sentence" or null},"rate_outlook":{"repo":number or null,"direction":"likely_cut" or "hold" or "likely_hike" or null,"note":"one sentence" or null},"buyer_tip":"one tip for this city" or null,"data_freshness":"month year" or null}

Use null if unsure. Be specific to ${city}.`;

  // Try models in order of reliability
  const attempts = [
    { model: "gemini-1.5-flash", withSearch: false },
    { model: "gemini-1.5-flash-latest", withSearch: false },
    { model: "gemini-2.0-flash", withSearch: false },
    { model: "gemini-1.5-flash", withSearch: true },
  ];

  const errors = [];

  for (const att of attempts) {
    try {
      const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.15,
          maxOutputTokens: 1024,
        },
      };

      if (att.withSearch) {
        payload.tools = [{ google_search: {} }];
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${att.model}:generateContent?key=${KEY}`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        errors.push(`${att.model}(search=${att.withSearch}): HTTP ${res.status} - ${errText.substring(0, 300)}`);
        continue;
      }

      const data = await res.json();

      // Check for blocked content
      if (data?.candidates?.[0]?.finishReason === "SAFETY") {
        errors.push(`${att.model}: blocked by safety filter`);
        continue;
      }

      const textPart = data?.candidates?.[0]?.content?.parts?.find((p) => p.text);
      if (!textPart || !textPart.text) {
        errors.push(`${att.model}: no text in response`);
        continue;
      }

      // Extract JSON from response
      const raw = textPart.text;
      const start = raw.indexOf("{");
      const end = raw.lastIndexOf("}");

      if (start === -1 || end === -1) {
        errors.push(`${att.model}: no JSON found in: ${raw.substring(0, 200)}`);
        continue;
      }

      let parsed;
      try {
        parsed = JSON.parse(raw.substring(start, end + 1));
      } catch (e) {
        errors.push(`${att.model}: JSON parse error: ${e.message}`);
        continue;
      }

      // Success - extract grounding sources if any
      const chunks = data?.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = chunks
        .map((c) => ({ title: c.web?.title || null, url: c.web?.uri || null }))
        .filter((s) => s.url);

      return resp({
        data: parsed,
        sources,
        model: att.model,
        grounded: att.withSearch && sources.length > 0,
        ts: new Date().toISOString(),
      });

    } catch (e) {
      errors.push(`${att.model}: exception - ${e.message}`);
      continue;
    }
  }

  // All failed — return detailed errors for debugging
  return resp({
    error: "All AI models failed",
    debug: errors,
    hint: "Check: 1) GEMINI_API_KEY is valid 2) Key has Generative Language API enabled at console.cloud.google.com/apis",
  }, 502);
};

function resp(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...cors() },
  });
}

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export const config = { path: "/api/intel" };
