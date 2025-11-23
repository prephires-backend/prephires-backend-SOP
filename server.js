const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Base route
app.get("/", (req, res) => {
  res.send("PrepHires SOP Backend is running correctly!");
});

// ----------------------------
//   PREVIEW OUTLINE
// ----------------------------
app.post("/outline", async (req, res) => {
  try {
    const prompt = `Create a detailed SOP outline for the following data:\n\n${JSON.stringify(req.body, null, 2)}`;

    const ai = await client.responses.create({
      model: "gpt-4.1",
      input: prompt
    });

    res.json({ outline: ai.output_text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ----------------------------
//   GENERATE SOP
// ----------------------------
app.post("/generate", async (req, res) => {
  try {
    const prompt = `Write a full professional SOP based on this data:\n\n${JSON.stringify(req.body, null, 2)}`;

    const ai = await client.responses.create({
      model: "gpt-4.1",
      input: prompt
    });

    res.json({
      sop: ai.output_text,
      outline: "Auto-generated based on content",
      requiresHumanReview: false
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ----------------------------
//   EXPORT DOCUMENT
// ----------------------------
app.post("/export", (req, res) => {
  // We will connect this later—dummy for now
  res.json({ url: "https://prephires.com/download-coming-soon" });
});

// ----------------------------
//   REQUEST HUMAN REVIEW
// ----------------------------
app.post("/request-review", (req, res) => {
  res.json({ message: "Your SOP has been sent to PrepHires review team." });
});

// ----------------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Backend running on port " + PORT));
