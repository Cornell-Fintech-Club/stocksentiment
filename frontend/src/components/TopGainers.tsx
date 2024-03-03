import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import Gainer from './Gainer';


const TopGainers = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const key = 'VRF428VYVZ9DUYOW'
      const response = await axios.get(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${key}`);
      setData(response.data.top_gainers)
    };
    fetchData();



    // OjJiZmUwZmNlYmM3ZjE4ODMxZWZlY2MyYzBmYjJhYWQ3

    // const interval = setInterval(fetchData, 60000); // Call the API every 60 seconds

    // return () => clearInterval(interval);
  }, []);
  return (
    <div className="marquee">
      <div className="flex row inline-block space-around">{createTopGainers(data)}</div>
    </div>
  )
}

// picks the font-color in a particular gainer
function determineTextColor(backgroundColor: string) { 
  return (backgroundColor === "white") ? "black": "white"; 
}

function createTopGainers(data: string | any[]) {
  const colors = ["white", "lightblue", "lightgreen", "lightcoral", "lightsalmon", "lightpink"]
  const gainers = []
  if (!data || data.length === 0) { 
    return null
  }

  for (var i = 0; i < data.length; i++) {
    var gainer = data[i];
    const gainerColor = colors[i % colors.length]
    const textColor = determineTextColor(gainerColor)
    // change_amount, change_percentage, volume, price, ticker
    gainers.push(<div className="carousel-item w-1/7 h-auto flex-1 mx-4">
      <Gainer ticker={gainer.ticker} 
              volume={gainer.volume} 
              change_amount={gainer.change_amount} 
              change_percentage={gainer.change_percentage}
              backgroundColor={gainerColor}
              color={textColor}
      ></Gainer>

    </div>);
  }
  return gainers;
}

export default TopGainers