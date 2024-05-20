const URL = require("../models/url");

// Custom function to generate a unique, URL-safe ID
async function generateShortID() {
  const charactersAndNumbers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 7;
  let isUnique = false;
  let shortID;

  // Generate a unique ID
  while (!isUnique) {
    shortID = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersAndNumbers.length);
      shortID += charactersAndNumbers[randomIndex];
    }

    // Check if the generated ID already exists in the database
    const existingURL = await URL.findOne({ shortId: shortID });
    if (!existingURL) {
      isUnique = true;
    }
  }

  return shortID;
}

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const shortID = await generateShortID();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (!result) {
    return res.status(404).json({ error: "URL not found" });
  }
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
