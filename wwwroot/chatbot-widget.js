// chatbot-widget.js
class ChatbotWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        // Create chatbot HTML
        const chatbotHTML = `
            <div id="chatbot-container" class="chatbot-container">
                <!-- Toggle Button -->
                <button id="chatbot-toggle" class="chatbot-toggle">
                    <svg id="chat-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <svg id="close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <!-- Chat Window -->
                <div id="chatbot-window" class="chatbot-window">
                    <div class="chatbot-header">
                        <div>
                            <h3>Ask me about Imen!</h3>
                            <p>Chat or send me a message directly</p>
                        </div>
                    </div>
                    
                    <div id="chatbot-messages" class="chatbot-messages">
                        <div class="message bot-message">
                            <div class="message-content">
                                👋 Hi! I'm Imen's AI assistant. Ask me anything about her background, skills, projects, or experience!
                            </div>
                        </div>
                    </div>
                    
                    <div class="chatbot-input-container">
                        <input 
                            type="text" 
                            id="chatbot-input" 
                            placeholder="Ask about Imen's experience..."
                            autocomplete="off"
                        />
                        <button id="chatbot-send">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add to page
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);

        // Bind events
        this.bindEvents();
    }

    bindEvents() {
        const toggle = document.getElementById('chatbot-toggle');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        toggle.addEventListener('click', () => this.toggleChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbot-window');
        const chatIcon = document.getElementById('chat-icon');
        const closeIcon = document.getElementById('close-icon');

        if (this.isOpen) {
            window.style.display = 'flex';
            chatIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            window.style.display = 'none';
            chatIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTyping();

        try {
            // Call backend
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            // Remove typing indicator
            this.hideTyping();

            // Add bot response
            if (data.response) {
                this.addMessage(data.response, 'bot');
            } else {
                this.addMessage('Sorry, I encountered an error. Please try again!', 'bot');
            }
        } catch (error) {
            this.hideTyping();
            this.addMessage('Connection error. Make sure the backend is running!', 'bot');
        }
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTyping() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing';
        typingDiv.innerHTML = '<div class="message-content"><span></span><span></span><span></span></div>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTyping() {
        const typing = document.getElementById('typing');
        if (typing) typing.remove();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChatbotWidget();
});