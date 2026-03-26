const express = require("express");

const app = express();

// ✅ SIMPLE TEST ROUTE
app.get("/", (req, res) => {
  res.send("SERVER WORKING ✅");
});

// ✅ IMPORTANT: use Railway port
const PORT = process.env.PORT || 8080;

// ✅ IMPORTANT: bind 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Server running on port ${PORT}`);
});