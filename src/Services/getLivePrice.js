export const getLivePrice = async (symbol) => {
  try {
    const res = await fetch(`/api/getPrice?symbol=${symbol.toUpperCase()}`);
    const json = await res.json();
    if (res.ok && json.price != null) return parseFloat(json.price);
    console.error("API error:", json.error);
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};
