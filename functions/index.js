import functions from "firebase-functions";
import fetch from "node-fetch";
import cors from "cors";

// Initialize CORS middleware
const corsHandler = cors({ origin: true });

export const getCmp = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const symbol = req.query.symbol;
    if (!symbol) return res.status(400).json({ error: "Symbol is required" });

    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=IN&symbols=${symbol}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
        "X-RapidAPI-Key": "3de33aa400mshd2cdb5a3c8453a4p1f6a75jsnd37626d4bcab", // 🔐 consider moving to .env
        "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
      });

      const data = await response.json();
      const price = data?.quoteResponse?.result?.[0]?.regularMarketPrice;

      if (!price) return res.status(500).json({ error: "Price not found" });

      return res.status(200).json({ price: parseFloat(price) });
    } catch (err) {
      return res.status(500).json({ error: "Fetch failed", details: err.message });
    }
  });
});
