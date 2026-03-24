const express = require("express");
const router = express.Router();

const { generateChart } = require("../services/ephemeris");
const { analyzeChart, analyzeChartForQuestion } = require("../services/ruleEngine");
const TranslationHelper = require("../services/translations/translationHelper");

/**
 * POST /api/astrology/analyze
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
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

/**
 * POST /api/astrology/ask
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
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

/**
 * GET /api/astrology/health
 */
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Astrology API server is running"
  });
});

module.exports = router;