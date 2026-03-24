const express = require("express");
const cors = require("cors");

const astrologyRoutes = require("../router/astrology"); // ✅ correct path

const app = express();

// ✅ CORS (enough, no manual OPTIONS needed)
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/astrology", astrologyRoutes);

// Root
app.get("/", (req, res) => {
  res.json({ message: "FutureDecider API working ✅" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  res.status(500).json({
    success: false,
    error: err.message
  });
});

// ✅ Railway port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌟 Server running on port ${PORT}`);
});