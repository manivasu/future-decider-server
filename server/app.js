const express = require("express");
const cors = require("cors");

const astrologyRoutes = require("../router/astrology");

const app = express();

// ✅ VERY IMPORTANT: allow ALL first (debug mode)
app.use(cors());

// ✅ Explicit preflight handling
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// Middleware
app.use(express.json());

// API Routes
app.use("/api/astrology", astrologyRoutes);

// Root
app.get("/", (req, res) => {
  res.json({ message: "API working ✅" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  res.status(500).json({ error: err.message });
});

// ✅ CRITICAL FIX
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});