import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

#API KEYS
apikey = os.getenv('apikey')
apiend = os.getenv('apiend')

def generate_chat_completion(messages, apikey=apikey, apiend=apiend, model="gpt-3.5-turbo", temperature=1, max_tokens=None):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {apikey}",
    }

    data = {
        "model": model,
        "messages": messages,
        "temperature": temperature
      #  "response_format": {"type": "json_object"} #Only on GPT-4??
    }

    if max_tokens is not None:
        data["max_tokens"] = max_tokens

    response = requests.post(apiend, headers=headers, data=json.dumps(data))

    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        raise Exception(f"Error {response.status_code}: {response.text}")



while True:

    user_input = input("User: ")
    messages=[
        {"role": "system", "content": "You are a Goldman Sachs managing director, assign a stock sentiment value for this text between -1 and 1, with negative values being negative sentiment and positive values being positive sentiment\nONLY OUTPUT A DOUBLE VALUE IN JSON"},
        {"role": "user", "content": user_input}
    ]
    response = generate_chat_completion(messages)
    print("Bot: " + response)