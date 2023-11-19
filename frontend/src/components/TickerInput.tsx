import React, { useState } from 'react';
import NewstoSentiment from './js-sentiment-model.js';

function TickerInput() {
    const [inputValue, setInputValue] = useState('');
    const [displayValue, setDisplayValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }
    
    const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const sentiment = await NewstoSentiment(inputValue);
            console.log("userside")
            console.log("SENT" + sentiment)
            const sentimentObj = JSON.parse(sentiment);
            setDisplayValue(`Company: ${sentimentObj.ticker} | Sentiment: ${sentimentObj.sentiment}`);
        }
    }

    return (
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
    )
}

export default TickerInput;