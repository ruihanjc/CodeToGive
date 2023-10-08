from flask import Flask, request, Response, stream_with_context, json
import requests
import sseclient
import tensorflow as tf

app = Flask(__name__)

from flask_cors import CORS

OPEN_AI_KEY = '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'

# handle cors
CORS(app)


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



@app.route("/api/upload-image", methods=["POST"])
def upload_image():
        imagefile = request.files.get('imagefile', '')

        # Load pre-trained model
        num_model = tf.keras.models.load_model('sign_language_predictor/models/number_model.h5')

        # Preprocessing steps
        # Normalize the data
        num_x = num_x / 255
        # Reshaping data from 1D to 3D
        num_x = num_x.reshape(-1,28,28,1)

        # Use model to predict number
        predictions = num_model.predict(num_x) 
        res = np.argmax(predictions,axis=1)

        prompt = ''
        if res == 1:
            prompt = 'Create a story of 300 words, with main characters called: Andy, style: Superhero, location: New york'
        elif res == 2:
            prompt = 'Create a story of 300 words, with main characters called: Ben, style: Ninja, location: London'
        elif res == 3:
            prompt = 'Create a story of 300 words, with main characters called: Cathy, style: Princess, location: Barcelona'
        elif res == 4:
            prompt = 'Create a story of 300 words, with main characters called: David, style: Adventure, location: Los Angeles'
        elif res == 5:
            prompt = 'Create a story of 300 words, with main characters called: Edward, style: Detective, location: Berlin'
        else: 
            prompt = 'Create a story of 300 words, with main characters called: Frida, style: Scary, location: Paris'
        
        

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


@app.route("/")
def index():
    return render_template("index.html");   

if __name__ == '__main__':
    app.run(port=4444, debug=True)