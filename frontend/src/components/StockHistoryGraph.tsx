import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

interface IStockDetailGraphProps {
    ticker: string;
}

interface ChartData {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
        fill: boolean;
        borderColor: string;
        tension: number;
    }>;
}

interface DailyTimeSeries {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
}

interface TimeSeriesData {
    [key: string]: DailyTimeSeries;
}

const StockHistoryGraph: React.FC<IStockDetailGraphProps> = ({ ticker }) => {
    const [historicalData, setHistoricalData] = useState<any>(null);
    useEffect(() => {
        const fetchHistoricalData = async () => {
            try {
                const apiKey = 'VRF428VYVZ9DUYOW'; // API KEY
                const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${apiKey}`;
                const response = await axios.get(url);
                const timeSeries: TimeSeriesData = response.data['Time Series (Daily)'] as TimeSeriesData;
                const filteredLabels = Object.keys(timeSeries).sort().filter((_, index) => index % 10 === 0);
                const filteredData = filteredLabels.map(label => parseFloat(timeSeries[label]['4. close']));
                const chartData: ChartData = {
                    labels: filteredLabels,
                    datasets: [
                        {
                            label: 'Closing Price',
                            data: filteredData,
                            fill: false,
                            borderColor: 'rgb(172, 25, 25)',
                            tension: 0.1
                        }
                    ]
                };
                setHistoricalData(chartData);
            } catch (error) {
                console.error('Error fetching historical data:', error);
            }
        };
        if (ticker) {
            fetchHistoricalData();
        }
    }, [ticker]);

    if (!historicalData) {
        return <div>Loading...</div>;
    }

    const options = {
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <div className='py-3 h-full w-full'>
            <Line data={historicalData} options={options} />
        </div>
    );
};

export default StockHistoryGraph;
