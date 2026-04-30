const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const path = require('path');
const prompts = require('./prompts');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1' 
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message, persona } = req.body;
        
        if (!prompts[persona]) {
            return res.status(400).json({ error: "Invalid persona selected" });
        }

        const systemPrompt = prompts[persona];

        const response = await openai.chat.completions.create({
            model: "llama-3.3-70b-versatile", // Updated to the active Groq model
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
            temperature: 0.7,
        });

        // Strip out the <thinking> tags before sending to frontend
        let reply = response.choices[0].message.content;
        reply = reply.replace(/<thinking>[\s\S]*?<\/thinking>/g, '').trim();

        res.json({ reply });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Failed to fetch response from the AI." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));