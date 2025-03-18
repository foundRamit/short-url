const shortId = require('shortid');

// Temporary in-memory storage for URLs
const urlDatabase = {};

/**
 * Generate a new short URL
 */
const handleGenerateNewShortUrl = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: 'URL is required' });

        const shortCode = shortId.generate();
        urlDatabase[shortCode] = { redirectURL: url, visitHistory: [] }; // Store URL in memory

        return res.status(201).json({ shortUrl: `http://localhost:8001/url/${shortCode}` });
    } catch (error) {
        console.error("Error creating short URL:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * Redirect to the original URL
 */
const handleRedirect = async (req, res) => {
    try {
        const shortCode = req.params.id;
        const entry = urlDatabase[shortCode];

        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        // Track the visit
        entry.visitHistory.push({ timestamp: new Date() });

        // ✅ Redirect the user to the actual website
        return res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error during redirection:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * Fetch analytics for a short URL
 */
const handleAnalytics = async (req, res) => {
    try {
        const shortCode = req.params.id;
        const entry = urlDatabase[shortCode];

        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        res.json({
            totalClicks: entry.visitHistory.length,
            visitHistory: entry.visitHistory,
        });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { handleGenerateNewShortUrl, handleRedirect, handleAnalytics };

