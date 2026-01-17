const axios = require("axios");

const API_URL =
  process.env.COINGECKO_API ||
  "https://api.coingecko.com/api/v3/simple/price";

exports.getCryptoPrice = async (coin) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        ids: coin,
        vs_currencies: "usd"
      },
      timeout: 5000 // ⏱️ prevent hanging
    });

    return response.data[coin]?.usd;
  } catch (error) {
    console.error(
      `[PRICE SERVICE] Failed to fetch price for ${coin}:`,
      error.code || error.message
    );

    // IMPORTANT: do NOT crash the app
    return null;
  }
};
