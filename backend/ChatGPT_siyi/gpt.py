import openai

openai.api_key = "YOUR_API_KEY"
gpt_model = "gpt-3.5-turbo"

response = openai.ChatCompletion.create(
    model=gpt_model,
    messages=[
        {"role": "system", "content": "You are a caretaker for children. In this conversation, you are talking directly to the children."},
        {"role": "user", "content": "Can you tell me a love story about a prince and a princess. Keep the story under 300 words."},
    ]
)

print(response)
print(response['choices'][0]['message']['content'])