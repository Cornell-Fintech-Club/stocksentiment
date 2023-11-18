import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import Gainer from './Gainer';


const TopGainers = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // const key = 'TQ1EZ45XW03X7WZL'
      const response = await axios.get(`https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=emRPMNIDu6T9CnfhgVloBcnVBagawWcw`);
      setData(response.data)
    };

    fetchData();

    // const interval = setInterval(fetchData, 60000); // Call the API every 60 seconds

    // return () => clearInterval(interval);
  }, []);
  return (
    <div className="marquee">
      <div className="flex row inline-block space-around">{createTopGainers(data)}</div>
    </div>
  )
}

function createTopGainers(data: string | any[]) {
  const gainers = []

  for (var i = 0; i < data.length; i++) {
    var gainer = data[i];
    console.log(data)
    gainers.push(<div className="carousel-item w-1/7 h-auto flex-1 mx-4">
      <Gainer symbol={gainer.symbol} name={gainer.name} change={gainer.change} price={gainer.price} changesPercentage={gainer.changesPercentage}
      ></Gainer>

    </div>);
  }
  return gainers;
}

export default TopGainers