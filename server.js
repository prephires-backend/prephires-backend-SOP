const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Default test route
app.get("/", (req, res) => {
  res.send("Prephires Backend is running!");
});

// POST: SOP Generation Route
app.post("/generate-sop", (req, res) => {
  const data = req.body;

  if (!data.name || !data.country || !data.purpose) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sopText = `
Dear Visa Officer,
My name is ${data.name}. I am applying for a visa to ${data.country}.
Purpose: ${data.purpose}.
Thank you.
  `;

  res.json({ sop: sopText });
});

// Render PORT Fix
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Backend running on port " + PORT);
});
