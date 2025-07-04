export async function getLivePrice(symbol) {
  try {
    const res = await fetch(`/api/getPrice?symbol=${symbol}`);
    const data = await res.json();
    return parseFloat(data.price);
  } catch (err) {
    console.error("Failed to fetch live price from Yahoo:", err);
    return null;
  }
}
