import React, { useState } from 'react';
import { fetch_news } from './js-sentiment-model';

function TickerInput() {
    const [inputValue, setInputValue] = useState('');
    const [displayValue, setDisplayValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }


    
    const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const sentiment = await fetch_news(inputValue);
            const formattedSentiment = parseFloat(sentiment.toFixed(3));
            console.log(sentiment)
            console.log(formattedSentiment)
            if (formattedSentiment == 10) { 
                setDisplayValue(`Company ${inputValue} not found. Please retry.`);
            } else if (formattedSentiment <= -0.35) {
                setDisplayValue(`Company: ${inputValue} | Sentiment: ${formattedSentiment} | Bearish`);
            } else if (formattedSentiment > -0.35 && formattedSentiment <= -0.15) {
                setDisplayValue(`Company: ${inputValue} | Sentiment: ${formattedSentiment} | Somewhat Bearish`);
            } else if (formattedSentiment > -0.15 && formattedSentiment < 0.15) {
                setDisplayValue(`Company: ${inputValue} | Sentiment: ${formattedSentiment} | Neutral`);
            } else if (formattedSentiment >= 0.15 && formattedSentiment < 0.35) {
                setDisplayValue(`Company: ${inputValue} | Sentiment: ${formattedSentiment} | Somewhat Bullish`);
            } else {
                setDisplayValue(`Company: ${inputValue} | Sentiment: ${formattedSentiment} | Bullish`);
            }
    
        }
    }
    
    return (
        <div>
            <div className="flex justify-center items-start h-screen pt-20">
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Sentiment Analyzer</span>
                    <span className="label-text-alt">Input Ticker</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={handleInputChange} onKeyPress={handleKeyPress} />
                <label className="label">
                    <span className="label-text-alt">Any company that is listed on a public stock exchange</span>
                </label>
                <p className="mt-4">{displayValue}</p>
            </div>
        </div>

        </div>
    )
}

export default TickerInput;