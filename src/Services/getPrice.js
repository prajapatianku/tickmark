import fetch from 'node-fetch';

export default async (req, res) => {
  const { symbol } = req.query;
  if (!symbol) return res.status(400).json({ error: 'symbol missing' });

  try {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}.NS`;
    const resp = await fetch(url);
    const json = await resp.json();
    const quote = json.quoteResponse?.result?.[0];
    if (!quote) throw new Error('No data');

    return res.status(200).json({ price: quote.regularMarketPrice });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
