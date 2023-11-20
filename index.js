// with OpenAi Package

const OpenAI = require("openai");
const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Use process.env for API key


app.use(express.json());

app.post("/api/chatgpt", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      // max_tokens: 100,
    });
    console.log(response.choices[0].message.content);

    res.status(200).json({
      message: "ChatGPT response generated successfully",
      response: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error making request to OpenAI API:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
