const express = require("express");
const cors = require("cors");

const astrologyRoutes = require("../router/astrology"); // ✅ correct path

const app = express();

// ✅ CORS Explicit Configuration for Vercel and Localhost
app.use(cors({
  origin: [
    "https://future-decider-client.vercel.app",
    "http://localhost:5173",
    "http://localhost:5000",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

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

const server = app.listen(PORT, () => {
  console.log(`🌟 Server running on port ${PORT}`);
});

// ✅ Graceful shutdown for Railway (SIGTERM)
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});