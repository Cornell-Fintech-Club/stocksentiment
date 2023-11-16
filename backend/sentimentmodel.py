from openai import OpenAI
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

#API KEYS
apikey = os.getenv('apikey')
apiend = os.getenv('apiend')


def generate_chat_completion(messages, apikey, apiend, model="gpt-4", temperature=1, max_tokens=None):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {apikey}",
    }

    data = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
    }

    if max_tokens is not None:
        data["max_tokens"] = max_tokens

    response = requests.post(apiend, headers=headers, data=json.dumps(data))

    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        raise Exception(f"Error {response.status_code}: {response.text}")

messages = [
            {"role": "system", "content": "Hello, how are you?"},
            {"role": "user", "content": prompt}
        ]

generate_chat_completion()