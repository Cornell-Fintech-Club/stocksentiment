const OpenAI = require("openai");
const axios = require('axios');

const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true});
const news_api = '9F4BYKOVZQ1BL8SJ';

async function fetch_news(symbol) {    
    const news_api_url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&apikey=${news_api}`;
    const response = await axios.get(news_api_url);
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
}

async function generate_chat_completion(messages) {
    console.log("#3 chat completion for " + JSON.stringify(messages));
    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
      });

    console.log(completion.choices[0].message.content);
    const sentiment = completion.choices[0].message.content
    return sentiment;
}


async function NewstoSentiment(ticker) {
    console.log("#1 Fetching news for " + ticker);
    
    try {
        // const news_data = await fetch_news(ticker);
        //const news_data_str = JSON.stringify(news_data);
        const news_data_str = "Google released a new product that is losing customers."

        const messages = [
            {
                "role": "system",
                "content": "You are a Goldman Sachs managing director, assign a stock sentiment value for this text between -1 and 1, with negative values being negative sentiment and positive values being positive sentiment. You should holistically analyze the input and decide the sentiment. Your output will have an impact on millions of dollars so you need to be very accurate otherwise you will lose your job. \nONLY OUTPUT A DOUBLE VALUE IN JSON in this format: \n{ \n \"ticker\":\"APPL\",\n\"sentiment\": 0.5 \n}"
            },
            {
                "role": "user",
                "content": news_data_str
            }
        ];
        console.log("#2 gpting for " + JSON.stringify(messages));
        
        const response = await generate_chat_completion(messages);
        console.log("Bot: " + response);
        return response;
    } catch (e) {
        console.error(e);
        throw e; // Re-throw the error after logging it
    }
}

module.exports = NewstoSentiment;