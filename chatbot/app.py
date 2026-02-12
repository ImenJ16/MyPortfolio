from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
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
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Load FAQ content
def load_faq():
    with open('faq.txt', 'r', encoding='utf-8') as file:
        return file.read()

FAQ_CONTENT = load_faq()

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')
    
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    
    try:
        # Create the response using Groq
        response = get_chatbot_response(user_message)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_chatbot_response(user_message):
    # This is the RAG part - we give the AI the context from FAQ
    system_prompt = f"""You are Imen Jouini's personal assistant chatbot on her portfolio website.

STRICT RULES:
1. ONLY answer questions about Imen Jouini based on the context below
2. If asked about ANYTHING else (weather, general knowledge, other people, etc.), politely say: "I'm here to answer questions about Imen Jouini and her work. Please ask me something about her background, skills, projects, or experience!"
3. Be friendly, professional, and concise
4. If the answer isn't in the context, say: "I don't have that specific information about Imen. You can reach out to her directly at +216 97 534 723 or check her resume."

CONTEXT ABOUT IMEN JOUINI:
{FAQ_CONTENT}

Remember: ONLY answer questions about Imen. Refuse anything else politely."""

    # Call Groq API
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        model="llama-3.1-8b-instant",  # Fast, free model
        temperature=0.3,  # Lower = more focused responses
        max_tokens=300
    )
    
    return chat_completion.choices[0].message.content

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)