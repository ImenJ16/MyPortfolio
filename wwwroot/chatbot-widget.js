// chatbot-widget.js
class ChatbotWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.messageMode = false;
        this.messageData = {};
        this.messageStep = 0;
        this.currentBotName = getRandomBotName();
        this.init();
    }

    init() {
        // Create chatbot HTML with name badge
        const chatbotHTML = `
            <div id="chatbot-container" class="chatbot-container">
                <!-- Toggle Button with Name Badge -->
                <button id="chatbot-toggle" class="chatbot-toggle">
                    <span class="name-badge" id="name-badge">Name me!</span>
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
                            <p>Ask questions or leave a message!</p>
                        </div>
                    </div>
                    
                    <div id="chatbot-messages" class="chatbot-messages">
                        <div class="message bot-message">
                            <div class="message-content">
                                Hi! I'm Imen's AI assistant. Ask me anything about her background, skills, projects, or experience! Or leave a message !
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
                    
                    <!-- Name Ticker at Bottom -->
                    <div class="name-ticker">
                        <div class="name-ticker-content" id="name-ticker">
                            ${this.generateTickerContent()}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Name Suggestion Modal -->
            <div id="name-modal-overlay" class="name-modal-overlay">
                <div class="name-modal">
                    <button class="name-modal-close" id="close-modal">&times;</button>
                    
                    <div class="name-modal-header">
                        <h2>Name the Bot! 🤖</h2>
                        <p>Suggest a creative name for Imen's AI assistant</p>
                    </div>
                    
                    <form id="name-suggestion-form" class="name-form">
                        <div class="form-group">
                            <label for="suggested-name">Your Name Suggestion *</label>
                            <input 
                                type="text" 
                                id="suggested-name" 
                                placeholder="e.g., BotMcBotface, CodeWizard, ByteBuddy..."
                                required
                                maxlength="30"
                            />
                            <small>Keep it fun, creative, and appropriate!</small>
                        </div>
                        
                        <div class="form-group">
                            <label for="suggester-name">Your Name (optional)</label>
                            <input 
                                type="text" 
                                id="suggester-name" 
                                placeholder="So we can credit you if it's chosen!"
                                maxlength="50"
                            />
                        </div>
                        
                        <button type="submit" class="name-submit-btn">
                            Submit Suggestion
                        </button>
                    </form>
                    
                    <div id="name-success-message" style="display:none;">
                        <div class="success-message">
                            ✅ Thanks! Your suggestion has been sent to Imen for review!
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add to page
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);

        // Bind events
        this.bindEvents();
        this.bindNameModalEvents();
    }

    generateTickerContent() {
        const names = getAllBotNames();
        const tickerText = 'Suggested: ' + names.join(', ');
        return tickerText + ' • ' + tickerText; // Duplicate for seamless loop
    }

    bindEvents() {
        const toggle = document.getElementById('chatbot-toggle');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        toggle.addEventListener('click', (e) => {
            // Don't toggle if clicking the badge
            if (e.target.id === 'name-badge') {
                return;
            }
            this.toggleChat();
        });

        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    bindNameModalEvents() {
        const nameBadge = document.getElementById('name-badge');
        const modalOverlay = document.getElementById('name-modal-overlay');
        const closeModal = document.getElementById('close-modal');
        const form = document.getElementById('name-suggestion-form');

        // Open modal
        nameBadge.addEventListener('click', (e) => {
            e.stopPropagation();
            modalOverlay.classList.add('active');
        });

        // Close modal
        closeModal.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        // Close on overlay click
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });

        // Handle form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitNameSuggestion();
        });
    }

    async submitNameSuggestion() {
        const suggestedName = document.getElementById('suggested-name').value.trim();
        const suggesterName = document.getElementById('suggester-name').value.trim() || 'Anonymous';
        const submitBtn = document.querySelector('.name-submit-btn');
        const form = document.getElementById('name-suggestion-form');
        const successMessage = document.getElementById('name-success-message');

        if (!suggestedName) return;

        // Disable button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const templateParams = {
                suggested_name: suggestedName,
                suggester_name: suggesterName,
                sent_date: new Date().toLocaleString()
            };

            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.NAME_TEMPLATE_ID,
                templateParams
            );

            // Show success
            form.style.display = 'none';
            successMessage.style.display = 'block';

            // Reset after 3 seconds
            setTimeout(() => {
                document.getElementById('name-modal-overlay').classList.remove('active');
                setTimeout(() => {
                    form.style.display = 'block';
                    successMessage.style.display = 'none';
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit Suggestion';
                }, 300);
            }, 3000);

        } catch (error) {
            alert('Error sending suggestion. Please try again!');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Suggestion';
        }
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

        // If in message collection mode
        if (this.messageMode) {
            this.handleMessageCollection(message);
            return;
        }

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

                // Check if we should enter message mode
                if (data.trigger_message_mode) {
                    this.startMessageCollection();
                }
            } else {
                this.addMessage('Sorry, I encountered an error. Please try again!', 'bot');
            }
        } catch (error) {
            this.hideTyping();
            this.addMessage('Connection error. Make sure the backend is running!', 'bot');
        }
    }

    startMessageCollection() {
        this.messageMode = true;
        this.messageStep = 1;
        this.messageData = {};

        setTimeout(() => {
            this.addMessage("What's your name?", 'bot');
        }, 500);
    }

    handleMessageCollection(message) {
        switch (this.messageStep) {
            case 1: // Collecting name
                this.messageData.name = message;
                this.messageStep = 2;
                this.addMessage(`Nice to meet you, ${message}! What's your email address?`, 'bot');
                break;

            case 2: // Collecting email
                if (!this.isValidEmail(message)) {
                    this.addMessage("That doesn't look like a valid email. Please enter a valid email address:", 'bot');
                    return;
                }
                this.messageData.email = message;
                this.messageStep = 3;
                this.addMessage("Great! What would you like to tell Imen?", 'bot');
                break;

            case 3: // Collecting message
                this.messageData.message = message;
                this.sendEmail();
                break;
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async sendEmail() {
        this.showTyping();

        try {
            const templateParams = {
                from_name: this.messageData.name,
                user_email: this.messageData.email,
                message: this.messageData.message,
                sent_date: new Date().toLocaleString()
            };

            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams
            );

            this.hideTyping();
            this.addMessage(`✅ Message sent successfully! Imen will reply to you at ${this.messageData.email} soon. Thanks for reaching out!`, 'bot');

            // Reset message mode
            this.messageMode = false;
            this.messageStep = 0;
            this.messageData = {};

        } catch (error) {
            this.hideTyping();
            this.addMessage('❌ Sorry, there was an error sending your message. Please try again or email Imen directly at your convenience.', 'bot');
            this.messageMode = false;
            this.messageStep = 0;
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