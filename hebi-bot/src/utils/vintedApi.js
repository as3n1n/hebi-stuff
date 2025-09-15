// src/utils/vintedApi.js
const fetch = require("node-fetch");

const APIFY_ACTOR_URL = `https://api.apify.com/v2/acts/bebity~vinted-premium-actor/run-sync-get-dataset-items?token=${process.env.APIFY_TOKEN}`;

async function getLatestVinted(limit = 3) {
  try {
    const res = await fetch(APIFY_ACTOR_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // exemple config Apify → tu peux changer le query si tu veux filtrer par mot-clé
        query: "nike", // met "" si tu veux tout
        country: "fr",
        maxItems: limit,
      }),
    });

    if (!res.ok) {
      console.error("Vinted API error:", res.statusText);
      return [];
    }

    const data = await res.json();
    return data.slice(0, limit).map(item => ({
      title: item.title,
      price: item.price,
      url: item.url,
      photo: item.photos?.[0]?.url,
    }));
  } catch (err) {
    console.error("Vinted fetch error:", err.message);
    return [];
  }
}

module.exports = { getLatestVinted };
