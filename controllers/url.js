// const shortid = require('shortid');
// const URL = require('../models/url');

// /**
//  * Handle generating a new short URL
//  */
// async function handleGenerateNewShortUrl(req, res) {
//     const body = req.body;
//     if (!body.url) return res.status(400).json({ error: 'URL is required' });

//     const shortId = shortid.generate();

//     await URL.create({
//         shortId: shortId,
//         redirectURL: body.url,
//         visitHistory: [],
//     });

//     return res.json({ id: shortId });
// }

// /**
//  * Handle redirection to the original URL & track visits
//  */
// async function handleRedirect(req, res) {
//     const shortId = req.params.id;
//     const entry = await URL.findOne({ shortId });

//     if (!entry) {
//         return res.status(404).json({ error: 'Short URL not found' });
//     }

//     // Track the visit
//     entry.visitHistory.push({ timestamp: new Date() });
//     await entry.save();

//     res.redirect(entry.redirectURL);
// }

// /**
//  * Handle fetching analytics for a short URL
//  */
// async function handleAnalytics(req, res) {
//     const shortId = req.params.id;
//     const entry = await URL.findOne({ shortId });

//     if (!entry) {
//         return res.status(404).json({ error: 'Short URL not found' });
//     }

//     res.json({
//         totalClicks: entry.visitHistory.length,
//         visitHistory: entry.visitHistory,
//     });
// }

// module.exports = {
//     handleGenerateNewShortUrl,
//     handleRedirect,
//     handleAnalytics,
// };

// const shortid = require('shortid'); // ✅ Correct import
// const URL = require('../models/url');

// /**
//  * Handle generating a new short URL
//  */
// const handleGenerateNewShortUrl = async (req, res) => {
//     try {
//         const { url } = req.body;
//         if (!url) return res.status(400).json({ error: 'URL is required' });

//         const shortId = shortid.generate(); // ✅ Corrected shortId generation

//         const newUrl = await URL.create({
//             shortId: shortId,
//             redirectURL: url,
//             visitHistory: [],
//         });

//         return res.status(201).json({ shortUrl: `http://localhost:8001/${shortId}` });
//     } catch (error) {
//         console.error("Error creating short URL:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// /**
//  * Handle redirecting to the original URL & track visits
//  */
// const handleRedirect = async (req, res) => {
//     try {
//         const shortId = req.params.id;
//         const entry = await URL.findOne({ shortId });

//         if (!entry) {
//             return res.status(404).json({ error: 'Short URL not found' });
//         }

//         // Track the visit
//         entry.visitHistory.push({ timestamp: new Date() });
//         await entry.save();

//         return res.redirect(entry.redirectURL);
//     } catch (error) {
//         console.error("Error during redirection:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// /**
//  * Handle fetching analytics for a short URL
//  */
// const handleAnalytics = async (req, res) => {
//     try {
//         const shortId = req.params.id;
//         const entry = await URL.findOne({ shortId });

//         if (!entry) {
//             return res.status(404).json({ error: 'Short URL not found' });
//         }

//         res.json({
//             totalClicks: entry.visitHistory.length,
//             visitHistory: entry.visitHistory,
//         });
//     } catch (error) {
//         console.error("Error fetching analytics:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// module.exports = { handleGenerateNewShortUrl, handleRedirect, handleAnalytics };

// const shortId = require('shortid');

// // Temporary in-memory storage for URLs
// const urlDatabase = {};

// /**
//  * Generate a new short URL
//  */
// const handleGenerateNewShortUrl = async (req, res) => {
//     try {
//         const { url } = req.body;
//         if (!url) return res.status(400).json({ error: 'URL is required' });

//         const shortCode = shortId.generate(); // Generates shortId
//         urlDatabase[shortCode] = { redirectURL: url, visitHistory: [] }; // Store in memory

//         return res.status(201).json({ shortUrl: `http://localhost:8001/url/${shortCode}` });
//     } catch (error) {
//         console.error("Error creating short URL:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// /**
//  * Redirect to the original URL
//  */
// const handleRedirect = async (req, res) => {
//     try {
//         const shortCode = req.params.id;
//         const entry = urlDatabase[shortCode];

//         if (!entry) {
//             return res.status(404).json({ error: 'Short URL not found' });
//         }

//         // Track the visit
//         entry.visitHistory.push({ timestamp: new Date() });

//         return res.json({ message: `Redirecting (Simulated) for Short ID: ${shortCode}` });
//     } catch (error) {
//         console.error("Error during redirection:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// /**
//  * Fetch analytics for a short URL
//  */
// const handleAnalytics = async (req, res) => {
//     try {
//         const shortCode = req.params.id;
//         const entry = urlDatabase[shortCode];

//         if (!entry) {
//             return res.status(404).json({ error: 'Short URL not found' });
//         }

//         res.json({
//             totalClicks: entry.visitHistory.length,
//             visitHistory: entry.visitHistory,
//         });
//     } catch (error) {
//         console.error("Error fetching analytics:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// // ✅ Export the functions
// module.exports = { handleGenerateNewShortUrl, handleRedirect, handleAnalytics };

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

