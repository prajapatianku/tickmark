// /Services/getLivePrice.js
export const getLivePrice = async (symbol) => {
  try {
    const res = await fetch(`/api/getPrice?symbol=${symbol}`);
    const data = await res.json();
    if (data.price) return parseFloat(data.price);
    console.error("Price not found:", data);
    return null;
  } catch (err) {
    console.error("Failed to fetch live price from backend:", err);
    return null;
  }
};
