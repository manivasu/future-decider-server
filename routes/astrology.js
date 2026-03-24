const express = require("express");
const router = express.Router();

const { generateChart } = require("../services/ephemeris");
const { analyzeChart } = require("../services/ruleEngine");
const { translateAnalysisToTelugu } = require("../services/translations/translationHelper");

router.post("/analyze", async (req, res) => {
  try {
    console.log("🔥 Request received:", req.body);

    const { date, time, place, userAge, language } = req.body;

    const chart = await generateChart(date, time, place);
    console.log("✅ Chart generated");

    let analysis = analyzeChart(chart, userAge);
    console.log("✅ Analysis done");

    res.json({
      success: true,
      chart,
      analysis
    });

  } catch (err) {
    console.error("🔥 ERROR IN ANALYZE:", err); // 👈 VERY IMPORTANT

    res.status(500).json({
      success: false,
      error: err.message
    });
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