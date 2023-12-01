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
                const chartData: ChartData = {
                    labels: Object.keys(timeSeries).sort(),
                    datasets: [
                        {
                            label: 'Closing Price',
                            // Assert the correct type within the map function
                            data: Object.values(timeSeries).map((dailyData: DailyTimeSeries) => parseFloat(dailyData['4. close'])),
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }
                    ]
                };
                chartData.labels.reverse();
                chartData.datasets[0].data.reverse();
                // Loop through the time series to populate our chart data

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

    return <Line data={historicalData} />;
};

export default StockHistoryGraph;
