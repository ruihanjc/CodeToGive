from flask import Flask, request, Response, stream_with_context, json
import requests
import sseclient

app = Flask(__name__)

from flask_cors import CORS

OPEN_AI_KEY = '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'

# handle cors
CORS(app)


@app.route('/')
def index():
    return 'Hello World!'


@app.route('/api/textPrompt', methods=['GET', 'POST'])
def textPrompt():
    if request.method == 'POST':
        prompt = request.json['prompt']
    
        def generate():
            url = 'https://api.openai.com/v1/chat/completions'
            headers = {
                'content-type': 'application/json; charset=utf-8',
                'Authorization': f"Bearer {OPEN_AI_KEY}"            
            }

            data = {
                'model': 'gpt-3.5-turbo',
                'messages': [
                    {'role': 'system', 'content': "You are a caretaker for children. In this conversation, you are talking directly to the children."},
                    {'role': 'user', 'content': prompt}
                ],
                'temperature': 1, 
                'max_tokens': 400,
                'stream': True,            
            }

            response = requests.post(url, headers=headers, data=json.dumps(data), stream=True)
            client = sseclient.SSEClient(response)
            for event in client.events():
                if event.data != '[DONE]':
                    try:
                        text = json.loads(event.data)['choices'][0]['delta']['content']
                        yield(text)
                    except:
                        yield('')

        return Response(stream_with_context(generate()))

if __name__ == '__main__':
    app.run(port=4444, debug=True)