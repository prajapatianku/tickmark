export const getLivePrice = async (symbol) => {
  try {
    const response = await fetch(`/api/getCmp?symbol=${symbol}`);
    const data = await response.json();

    if (!data || !data.cmp) throw new Error("Invalid response");
    return parseFloat(data.cmp);
  } catch (err) {
    console.error("Failed to fetch live price from Yahoo:", err);
    return null;
  }
};
