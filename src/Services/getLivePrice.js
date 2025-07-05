export async function getLivePrice(symbol) {
  try {
    const response = await fetch(
      `https://us-central1-tickmark-346bb.cloudfunctions.net/getCmp?symbol=${symbol}`
    );
    const data = await response.json();

    if (!data.price) {
      console.error("No price found in response:", data);
      return null;
    }

    return data.price;
  } catch (err) {
    console.error("CMP fetch error:", err);
    return null;
  }
}
