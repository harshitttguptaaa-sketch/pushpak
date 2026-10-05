// GET /api/stats  ->  numbers computed from the Supabase valuations table
module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!process.env.SUPABASE_URL || !key) { res.statusCode = 500; return res.end(JSON.stringify({ error: "Server is missing Supabase settings." })); }
  const headers = { apikey: key, "Content-Type": "application/json" };
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;
  try {
    const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/pushpak_stats`, { method: "POST", headers, body: "{}" });
    if (!r.ok) throw new Error(String(r.status));
    const row = (await r.json())[0] || {};
    res.statusCode = 200;
    res.end(JSON.stringify({
      balancesValued: Number(row.balances_valued || 0),
      totalValueInr: Number(row.total_value_inr || 0),
      avgInputTokens: row.avg_input_tokens === null ? null : Number(row.avg_input_tokens),
      avgOutputTokens: row.avg_output_tokens === null ? null : Number(row.avg_output_tokens)
    }));
  } catch (e) {
    res.statusCode = 502;
    res.end(JSON.stringify({ error: "Could not read usage numbers." }));
  }
};
