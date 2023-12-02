import React, { useState } from 'react';
import { fetch_news } from './js-sentiment-model';
import ReactSpeedometer from 'react-d3-speedometer';

function TickerInput() {
    const [inputValue, setInputValue] = useState('');
    const [displayValue, setDisplayValue] = useState('');
    const [sentimentScore, setSentimentScore] = useState(0.5); // Initialized at neutral (0.5)
    const [sentimentLabel, setSentimentLabel] = useState('Neutral')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Only proceed if the Enter key is pressed
            const sentiment = await fetch_news(inputValue);
            const formattedSentiment = parseFloat(sentiment.toFixed(3));

            // Normalize score to 0-1 range
            let newSentimentScore = (formattedSentiment + 1) / 2;
            let label = '';

            if (formattedSentiment === 10) {
                label = `Company ${inputValue} not found. Please retry.`;
            } else if (formattedSentiment <= -0.35) {
                label = `Bearish`;
            } else if (formattedSentiment > -0.35 && formattedSentiment <= -0.15) {
                label = `Somewhat Bearish`;
            } else if (formattedSentiment > -0.15 && formattedSentiment < 0.15) {
                label = `Neutral`;
            } else if (formattedSentiment >= 0.15 && formattedSentiment < 0.35) {
                label = `Somewhat Bullish`;
            } else {
                label = `Bullish`;
            }

            setSentimentScore(newSentimentScore); // Update the score here
            setSentimentLabel(label); // Update the label here
            setDisplayValue(`Company: ${inputValue} | Sentiment: ${formattedSentiment} | ${label}`);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">



            <div className="mb-2"> {/* Reduce margin to bring elements closer */}
                <ReactSpeedometer
                    value={sentimentScore * 100} // Scale to 0-100
                    maxValue={100}
                    minValue={0}
                    needleColor="gray"
                    segmentColors={[
                        '#5BE12C', // Green
                        '#aed51f', // Yellow-Green
                        '#FFC914', // Yellow
                        '#FF6A15', // Orange
                        '#EA4228'  // Red
                    ]}
                    segments={5}
                    textColor="black"
                    valueTextFontSize="0px" // Hide value text
                    width={300} // Adjust width as needed
                    height={200} // Adjust height as needed
                    // ... other customization props as needed
                />
            </div>

            <div className="form-control w-full max-w-xs mb-6">
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

            <div className="sentiment-legend flex gap-4 p-4 border border-gray-300 rounded-lg">
                <div><strong>Bearish:</strong> -1 to -0.35</div>
                <div><strong>Somewhat Bearish:</strong> -0.35 to -0.15</div>
                <div><strong>Neutral:</strong> -0.15 to 0.15</div>
                <div><strong>Somewhat Bullish:</strong> 0.15 to 0.35</div>
                <div><strong>Bullish:</strong> 0.35 to 1</div>
            </div>
        </div>
    )
}

export default TickerInput;
