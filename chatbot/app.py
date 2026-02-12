from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

app = Flask(__name__)
CORS(app, resources={
    r"/chat": {
        "origins": [
            "https://imenj16.github.io",
            "http://localhost:*",
            "http://127.0.0.1:*"
        ]
    }
})

# Initialize Groq client
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# Load FAQ content
with open('faq.txt', 'r', encoding='utf-8') as f:
    faq_content = f.read()

# Keywords that trigger message collection mode
MESSAGE_KEYWORDS = [
    'contact', 'message', 'email', 'hire', 'work together', 
    'reach out', 'collaborate', 'project', 'opportunity',
    'get in touch', 'send message', 'leave message', 'connect', 'network', 'partnership', 'inquiry','talk to imen', 'speak with imen', 'contact imen', 'message imen', 'email imen'
]

def check_message_intent(user_message):
    """Check if user wants to send a message to Imen"""
    message_lower = user_message.lower()
    
    # Check for /message command
    if message_lower.strip() == '/message':
        return True
    
    # Check for keywords
    return any(keyword in message_lower for keyword in MESSAGE_KEYWORDS)

def get_chatbot_response(user_message):
    """Get response from Groq API"""
    
    # Check if user wants to send a message
    if check_message_intent(user_message):
        return "I'd be happy to help you send a message to Imen! Let me collect your details.", True
    
    # Build the system prompt with FAQ context
    system_prompt = f"""You are Imen Jouini's AI assistant. Your role is to answer questions about Imen based ONLY on the information below.

STRICT RULES:
1. ONLY answer questions about Imen Jouini
2. If asked about anything else (weather, news, other people, general topics), politely say: "I can only answer questions about Imen Jouini. Please ask about her background, skills, projects, or experience!"
3. Be friendly and professional
4. Keep responses concise (2-3 sentences max)
5. If you don't know something about Imen, say: "I don't have that information. You can contact Imen directly for more details!"

INFORMATION ABOUT IMEN:
{faq_content}

Remember: Stay on topic about Imen ONLY!"""

    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=0.3,
            max_tokens=300
        )
        
        return completion.choices[0].message.content, False
        
    except Exception as e:
        return f"Sorry, I encountered an error: {str(e)}", False

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        # Get response and check if message mode should be triggered
        response_text, trigger_message = get_chatbot_response(user_message)
        
        return jsonify({
            'response': response_text,
            'trigger_message_mode': trigger_message
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)