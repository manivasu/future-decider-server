const express = require("express");
const cors = require("cors");

const astrologyRoutes = require("../router/astrology");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/astrology", astrologyRoutes);

// Welcome endpoint
app.get("/", (req, res) => {
  res.json({
    message: "FutureDecider - Real-time Astrology API",
    version: "1.0.0",
    features: [
      "Comprehensive birth chart analysis",
      "Real-time problem detection and solutions",
      "Beneficial yoga identification",
      "Dasha (timing) calculations",
      "Question-specific astrology readings"
    ],
    endpoints: {
      health: "GET /api/astrology/health",
      analyze: "POST /api/astrology/analyze",
      ask: "POST /api/astrology/ask"
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    message: err.message
  });
});

app.listen(5000, () => {
  console.log("🌟 FutureDecider Server running on port 5000");
  console.log("📊 Astrology API endpoints ready: /api/astrology/analyze or /api/astrology/ask");
});