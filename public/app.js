document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const tabs = document.querySelectorAll('.tab');
    const typingIndicator = document.getElementById('typing-indicator');
    const activeNameDisplay = document.getElementById('active-name-display');
    const chipsContainer = document.getElementById('suggestion-chips');

    let currentPersona = 'anshuman';

    // Map internal IDs to Display Names
    const personaNames = {
        anshuman: "Anshuman Singh",
        abhimanyu: "Abhimanyu Saxena",
        kshitij: "Kshitij Mishra"
    };

    const suggestions = {
        anshuman: [
            "How can I groom myself for a tech lead role?",  
            "Is it better to learn Java or Python?",      
        ],
        abhimanyu: [
            "How did Scaler actually start?",        
            "Why are hands-on projects important?",  
        ],
        kshitij: [
            "Are data structures important for coding interviews?",   
            "How can prepare for system design interviews?",               
        ]
    };

    function loadChips() {
        chipsContainer.innerHTML = '';
        suggestions[currentPersona].forEach(text => {
            const chip = document.createElement('button');
            chip.className = 'chip';
            chip.textContent = text;
            chip.type = 'button'; // Prevent form submit
            chip.onclick = () => {
                userInput.value = text;
                chatForm.dispatchEvent(new Event('submit', { cancelable: true }));
            };
            chipsContainer.appendChild(chip);
        });
    }

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.textContent = text;
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function resetConversation() {
        chatWindow.innerHTML = '';
        appendMessage(`Hi, I am ${personaNames[currentPersona]}. How can I help you today?`, 'ai');
        loadChips();
    }

    // Persona Switcher Logic
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Remove active class from all
            tabs.forEach(t => t.classList.remove('active'));
            // Add to clicked
            e.target.classList.add('active');
            
            // Update State
            currentPersona = e.target.dataset.persona;
            activeNameDisplay.textContent = personaNames[currentPersona];
            
            // Reset UI
            resetConversation();
        });
    });

    // Form Submission Logic
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        // Add user message
        appendMessage(text, 'user');
        userInput.value = '';
        
        // Hide chips and show typing
        chipsContainer.classList.add('hidden');
        typingIndicator.classList.remove('hidden');
        chatWindow.scrollTop = chatWindow.scrollHeight;

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, persona: currentPersona })
            });

            const data = await response.json();
            
            typingIndicator.classList.add('hidden');
            chipsContainer.classList.remove('hidden');

            if (response.ok) {
                appendMessage(data.reply, 'ai');
            } else {
                appendMessage(data.error || "An error occurred.", 'error');
            }
        } catch (error) {
            typingIndicator.classList.add('hidden');
            chipsContainer.classList.remove('hidden');
            appendMessage("Failed to connect to the server. Please check your internet connection.", 'error');
        }
    });

    // Init first load
    resetConversation();
});