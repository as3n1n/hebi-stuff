const fetch = require("node-fetch");

const APIFY_ACTOR_URL = `https://api.apify.com/v2/acts/bebity~vinted-premium-actor/run-sync-get-dataset-items?token=${process.env.APIFY_TOKEN}`;

async function getLatestVinted(limit = 3) {
  try {
    const res = await fetch(APIFY_ACTOR_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "", country: "fr", maxItems: limit }),
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.slice(0, limit).map(i => ({
      title: i.title,
      price: i.price,
      url: i.url,
    }));
  } catch {
    return [];
  }
}

module.exports = { getLatestVinted };
