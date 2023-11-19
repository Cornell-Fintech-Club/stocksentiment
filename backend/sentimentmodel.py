import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

#API KEYS
apikey = os.getenv('apikey')
apiend = os.getenv('apiend')

news_api = '9F4BYKOVZQ1BL8SJ'


def fetch_news(symbol):
    news_api_url = f"https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers={symbol}&apikey={apikey}"
    response = requests.get(news_api_url)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Error {response.status_code}: {response.text}")

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
    """This is a tester to help test differing input strings and analyze sentiment"""

    ticker = input("Enter stock symbol for news (e.g., AAPL): ")
    news_data = fetch_news(ticker)
    messages=[ # Prompt engineering
        {"role": "system", "content": "You are a Goldman Sachs managing director, assign a stock sentiment value for this text between -1 and 1, with negative values being negative sentiment and positive values being positive sentiment. You should holistically analyze the input and decide the sentiment. Your output will have an impact on millions of dollars so you need to be very accurate otherwise you will lose your job. \nONLY OUTPUT A DOUBLE VALUE IN JSON in this format: \n{ \n \"ticker\":\"APPL\",\n\"sentiment\": 0.5 \n}"},
        {"role": "user", "content": json.dump(news_data)}
    ]
    response = generate_chat_completion(messages)
    print("Bot: " + response)
