import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

interface EquityPieChartProps {
    stocks: {
        ticker: string;
        totalValue: number;
    }[];
}

const EquityPieChart: React.FC<EquityPieChartProps> = ({ stocks }) => {
    // Prepare data for the Pie chart
    const data = {
        labels: stocks.map(stock => stock.ticker),
        datasets: [
            {
                label: 'Stock Value',
                data: stocks.map(stock => stock.totalValue),
                backgroundColor: [
                    '#AC1919',
                    '#D34645',
                    '#EB7676',
                    '#FFA7A7',
                    '#F9D5E0'
                    // ... add more colors as needed
                ],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div style={{ width: '300px', height: '300px' }}> {/* Adjust the size as needed */}
            <Pie data={data} />
        </div>
    );
};


export default EquityPieChart;