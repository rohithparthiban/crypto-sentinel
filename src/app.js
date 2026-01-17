const express = require("express");
const path = require("path");
const alertRoutes = require("./routes/alert.routes");

const app = express();

app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../public")));

// APIs
app.use("/alerts", alertRoutes);

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
