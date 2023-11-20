// with OpenAi/chatGPT Api

const axios = require('axios');
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';

app.post("/api/chatgpt", async (req, res) => {
    try {

      const { message } = req.body;
    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

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
