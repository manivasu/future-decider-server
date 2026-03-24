const express = require("express");
const router = express.Router();

const { generateChart } = require("../services/ephemeris");
const { analyzeChart, analyzeChartForQuestion } = require("../services/ruleEngine");
const TranslationHelper = require("../services/translations/translationHelper");
router.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});
/**
 * Comprehensive chart analysis
 * POST /api/astrology/analyze
 * Body: { date, time, place, userAge (optional), language (optional, "telugu" or "english") }
 */
router.post("/analyze", async (req, res) => {
  try {
    const { date, time, place, userAge, language } = req.body;

    if (!date || !time || !place) {
      return res.status(400).json({ 
        error: "Missing required fields: date, time, place" 
      });
    }

    const chart = await generateChart(date, time, place);
    let analysis = analyzeChart(chart, userAge);

    // Apply Telugu translation if requested
    if (language === "telugu") {
      analysis = TranslationHelper.translateAllResults(analysis);
    }

    res.json({ 
      success: true,
      chart, 
      analysis,
      language: language || "english"
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

/**
 * Analysis for specific question (Real-time problem solving)
 * POST /api/astrology/ask
 * Body: { date, time, place, question, userAge (optional), language (optional, "telugu" or "english") }
 */
router.post("/ask", async (req, res) => {
  try {
    const { date, time, place, question, userAge, language } = req.body;

    if (!date || !time || !place || !question) {
      return res.status(400).json({ 
        error: "Missing required fields: date, time, place, question" 
      });
    }

    const chart = await generateChart(date, time, place);
    let analysis = analyzeChartForQuestion(chart, question, userAge);

    // Apply Telugu translation if requested
    if (language === "telugu") {
      analysis = TranslationHelper.translateAllResults(analysis);
    }

    res.json({ 
      success: true,
      chart,
      question,
      analysis,
      language: language || "english"
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

/**
 * Health check endpoint
 */
router.get("/health", (req, res) => {
  res.json({ 
    status: "ok",
    message: "Astrology API server is running",
    features: [
      "Comprehensive chart analysis",
      "Real-time problem detection",
      "Yoga identification",
      "Dasha calculations",
      "Problem-specific answers"
    ]
  });
});

module.exports = router;