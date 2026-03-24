const express = require("express");
const router = express.Router();

const { generateChart } = require("../services/ephemeris");
const { analyzeChart } = require("../services/ruleEngine");
const { translateAnalysisToTelugu } = require("../services/translations/translationHelper");

router.post("/analyze", async (req, res) => {
  try {
    const { date, time, place, language } = req.body;

    const chart = await generateChart(date, time, place);
    let analysis = analyzeChart(chart);

    // Translate to Telugu if requested
    if (language === "telugu") {
      analysis = translateAnalysisToTelugu(analysis);
    }

    res.json({ chart, analysis });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/ask", async (req, res) => {
  try {
    const { date, time, place, question, language } = req.body;

    const chart = await generateChart(date, time, place);
    let analysis = analyzeChart(chart);

    // Translate to Telugu if requested
    if (language === "telugu") {
      analysis = translateAnalysisToTelugu(analysis);
    }

    res.json({ chart, analysis });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Astrology API is healthy" });
});

module.exports = router;