// api/getCmp.js
import fetch from "node-fetch";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  const { symbol } = req.query;

  if (!symbol) return res.status(400).json({ error: "Symbol is required" });

  try {
    const url = `https://finance.yahoo.com/quote/${symbol}`;
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);
    const price = $('fin-streamer[data-field="regularMarketPrice"]').first().text();

    if (!price) {
      return res.status(500).json({ error: "Could not parse price" });
    }

    return res.status(200).json({ symbol, cmp: parseFloat(price) });
  } catch (err) {
    console.error("Yahoo CMP error:", err);
    return res.status(500).json({ error: "Failed to fetch CMP" });
  }
}
