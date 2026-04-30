# Prompt Engineering Decision Document

This document outlines the research and architectural decisions behind the system prompts for Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra. To avoid the GIGO (Garbage In, Garbage Out) trap of generic prompting, **I personally went through hours of their video lectures, read their LinkedIn posts, and analyzed their internal community messages.** This allowed me to extract their exact mental models, catchphrases, and teaching philosophies rather than just guessing their tones.

## 1. Persona: Anshuman Singh
**Goal:** Emulate a rigorous, academic, "First Principles" thinker.
*   **Data Source 1 (Video Lectures & Podcasts):** From watching his podcast with Raj Shamani, I noticed he uses scientific metaphors to explain human behavior. I extracted his concepts of "Context Switching" (comparing human focus to a CPU) and the "Drowning Rat Experiment" (hope vs. discipline). These were injected directly into his few-shot examples.
*   **Data Source 2 (DSA Masterclass Videos):** While watching his DSA lectures, I saw how heavily he critiques engineers who memorize syntax without understanding logic. I embedded his "Screwdriver Mechanic" metaphor to trigger a negative constraint: the AI is instructed to actively pivot users away from "tool-based" questions toward fundamental problem-solving.
*   **Architectural Choice:** Added a strict negative constraint (`Never give direct code solutions immediately`) and forced the AI to end with a Socratic question to simulate his intense, academic teaching style.

## 2. Persona: Abhimanyu Saxena
**Goal:** Emulate a mission-driven, structural, and resilient "Technology Builder."
*   **Data Source 1 (LinkedIn Posts):** I went through his LinkedIn posts regarding the founding of Scaler. I embedded the exact origin story he shared ("roadside chai tapri at 2 AM in Pune") to ground the AI's identity in his mission of helping underprivileged engineers. 
*   **Data Source 2 (SST Video Interviews):** In his video interviews regarding the Scaler School of Technology, Abhimanyu constantly emphasizes implementation over theory. I programmed the AI to reference the "RICE values" (Respect, Integrity, Curiosity, Excellence) and used his exact classroom analogy of "opening up a motherboard" to enforce his "hands-on" worldview.
*   **Architectural Choice:** The `<thinking>` tags for Abhimanyu explicitly command the LLM to evaluate the user's query through the lens of "architectural trade-offs" and "building for the real world."

## 3. Persona: Kshitij Mishra
**Goal:** Emulate an infectious, high-energy accountability partner ("Dronacharya").
*   **Data Source 1 (Internal Community Messages):** I analyzed his messages to the student community, where he has a distinct way of categorizing behavior. I embedded his exact framework of "Grifters" (negative complainers), "Optimists" (builders), and "Normies". The LLM is instructed to use this framework to correct negative user mindsets.
*   **Data Source 2 (Career Video Lectures):** I went through his career guidance videos to extract his practical advice, specifically the "XYZ Resume Formula," the "5 Minutes of Rage" framework, and the "Activation Energy" concept. 
*   **Architectural Choice:** To capture his specific energy, the prompt requires the use of his exact catchphrases ("Rock and Roll," "Listen to me very carefully") and mandates that every single output must contain exactly one actionable "Nudge."