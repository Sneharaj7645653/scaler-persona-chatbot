# Scaler Persona-Based AI Chatbot
**Assignment 01 — Prompt Engineering | Scaler Academy**

## Overview
This project is a fully functional, persona-based AI chatbot built to simulate real conversations with three key Scaler personalities: **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra**. 

Instead of relying on generic system instructions, the prompts driving this application were heavily researched and engineered using raw data scraped from their public podcasts, LinkedIn posts, and Scaler Masterclass transcripts. The backend leverages the **Groq API (Llama-3.3-70b-versatile)** to bypass traditional LLM quota limits while maintaining high-fidelity instruction following.

## Live Deployment
- **Live URL:** https://scaler-persona-chatbot-00h0.onrender.com/

## Tech Stack
- **Frontend:** Vanilla HTML, CSS, JavaScript (Zero-dependency, lightweight DOM manipulation)
- **Backend:** Node.js, Express.js
- **AI Integration:** OpenAI SDK pointed to the Groq API Base URL
- **Environment Management:** `dotenv`

## Key Features
1. **Dynamic Persona Switching:** The UI clears context and shifts the system prompt seamlessly when switching tabs.
2. **Chain-of-Thought Reasoning:** The backend enforces `<thinking>` tags in the prompt, forcing the LLM to process first principles before generating a response. The backend strips these tags before sending the final output to the user.
3. **High-Fidelity Prompting:** Few-shot examples contain real quotes ("Drowning Rat experiment", "Screwdriver Mechanics", "Grifters vs. Optimists") to anchor the AI's vocabulary.
4. **Secure API Handling:** API keys are secured server-side and never exposed to the client.

## Local Setup Instructions
1. Clone this repository to your local machine.
2. Open your terminal and navigate to the project folder.
3. Run `npm install` to install the backend dependencies (Express, Cors, Dotenv, OpenAI SDK).
4. Create a `.env` file in the root directory. You can use the provided `.env.example` as a template.
5. Add your Groq (or OpenAI/DeepSeek) API key to the `.env` file:
   \`\`\`text
   GROQ_API_KEY=your_actual_api_key_here
   PORT=3000
   \`\`\`
6. Run `npm start` to boot up the Express server.
7. Open `http://localhost:3000` in your web browser.

## Repository Structure
- `/public` - Contains the frontend HTML, CSS, and vanilla JS.
- `server.js` - The Express backend that securely routes the AI calls.
- `prompts.js` - The core logic file containing the deeply researched system prompts.
- `prompts.md` - Documentation of the prompt engineering decisions and research sources.
- `reflection.md` - A 400-word analysis on the GIGO principle and the learning process.



## UI Demo
###Desktop screen
<img width="1280" height="832" alt="Screenshot 2026-04-30 at 9 15 02 PM" src="https://github.com/user-attachments/assets/0cb1ba10-c403-4be3-9a84-f31b8a328d14" />
###Mobile view
<img width="1280" height="832" alt="Screenshot 2026-04-30 at 9 16 02 PM" src="https://github.com/user-attachments/assets/f311b9b2-4dd4-42fb-b0a1-d31dad5d94f2" />

