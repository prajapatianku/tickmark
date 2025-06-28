import yahooFinance from "yahoo-finance2";

export default async function handler(req, res) {
  const { symbol } = req.query;

  if (!symbol) return res.status(400).json({ error: "Symbol required" });

  try {
    const data = await yahooFinance.quote(`${symbol}.NS`);
    const price = data.regularMarketPrice;
    res.status(200).json({ symbol, price });
  } catch (error) {
    console.error("Yahoo API error:", error);
    res.status(500).json({ error: "Failed to fetch price" });
  }
}
