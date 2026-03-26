const express = require("express");

const astrologyRoutes = require("../router/astrology"); // keep this as per your structure

const app = express();

/**
 * ✅ GLOBAL CORS HANDLER (TOP PRIORITY)
 * This will FIX all CORS + OPTIONS issues
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ✅ Handle preflight immediately
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Middleware
app.use(express.json());

// Routes
app.use("/api/astrology", astrologyRoutes);

// Health routes
app.get("/", (req, res) => {
  res.json({ message: "FutureDecider API working ✅" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  res.status(500).json({
    success: false,
    error: err.message
  });
});

// Railway port
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`🌟 Server running on port ${PORT}`);
});

/**
 * ✅ Graceful shutdown (Railway)
 */
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down...");
  server.close(() => process.exit(0));
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down...");
  server.close(() => process.exit(0));
});