const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(express.json());
app.use(cors()); // Allows requests from your frontend

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/generate-summary', async (req, res) => {
    const userContent = req.body.userContent;
    const number = req.body.number;
    const option = req.body.option;
  
    const systemMessage = `Summarize the following content in ${number} ${option}`;
  
    try {
      const openaiResponse = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemMessage,
          },
          {
            role: 'user',
            content: userContent,
          },
        ],
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      res.json({ summary: openaiResponse.data.choices[0].message.content });
    } catch (err) {
      res.status(500).send('Error generating summary');
    }
  });
  

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
