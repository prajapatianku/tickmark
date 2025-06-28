export const getLivePrice = async (symbol) => {
  try {
    const proxyUrl = "https://corsproxy.io/?";
    const apiUrl = `https://groww.in/v1/api/stocks_data/quotes?symbols=NSE:${symbol.toUpperCase()}`;
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    const json = await response.json();

    const ltp = json?.data?.[0]?.ltp;
    return ltp ? parseFloat(ltp) : null;
  } catch (err) {
    console.error("Error fetching CMP via proxy:", err);
    return null;
  }
};
