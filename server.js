const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();

// MIDDLEWARE
app.use(cors({ origin: "*" }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// OPENAI CLIENT
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// COUNTRY RULES 2025 (30+ Years Expert Knowledge)
const COUNTRY_RULES = {
  "uk": { funds: 9, must_have: ["CAS", "course_fit"], red_flags: ["no ties"] },
  "usa": { funds: 12, must_have: ["I20"], red_flags: ["weak ties"] },
  "canada": { funds: 12, must_have: ["ties_home"] },
  "australia": { funds: 12, must_have: ["GTE"] },
  "poland": { funds: 6, must_have: ["admission_ref"] },
  "ireland": { funds: 6, must_have: ["fee_receipt"] }
};

// ================================
// TEST - HEALTH CHECK
// ================================
app.get("/", (req, res) => {
  res.json({ 
    status: "✅ SOPAI Backend LIVE", 
    openai: !!process.env.OPENAI_API_KEY,
    endpoints: ["/outline", "/generate", "/export"]
  });
});

// ================================
// 1. OUTLINE ENDPOINT
// ================================
app.post("/outline", async (req, res) => {
  try {
    const data = req.body;
    const country = data.country?.toLowerCase() || "uk";
    const rules = COUNTRY_RULES[country] || COUNTRY_RULES.uk;

    const prompt = `30-year visa expert. Write HUMAN outline for:
${JSON.stringify(data, null, 2)}

Country rules: ${JSON.stringify(rules, null, 2)}

8 sections:
1. Career story
2. Academic + gaps
3. Course fit
4. University choice
5. Work exp
6. Funding proof
7. Home ties
8. Return plan

SIMPLE HUMAN LANGUAGE.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 1200
    });

    res.json({
      outline: response.choices[0].message.content,
      quality
