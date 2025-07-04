// /api/getPrice.js
export default async function handler(req, res) {
  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ error: "Symbol is required" });
  }

  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1m&range=1d`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const result = data?.chart?.result?.[0];
    const meta = result?.meta;
    const price = meta?.regularMarketPrice;

    if (!price) {
      return res.status(500).json({ error: "Price not found in Yahoo response" });
    }

    return res.status(200).json({ price });
  } catch (err) {
    console.error("Error fetching Yahoo price:", err);
    return res.status(500).json({ error: "Failed to fetch price" });
  }
}
