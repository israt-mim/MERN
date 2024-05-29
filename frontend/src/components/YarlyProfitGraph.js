import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import SummaryApi from '../common';

const YearlyProfitGraph = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(SummaryApi.getYarlyProfit.url, {
                method: SummaryApi.getYarlyProfit.method,
                credentials: 'include',
            });
            const dataResponse = await response.json();
            setData(dataResponse);
        };
        fetchData();
    }, []);

    const chartData = {
        labels: data.map(item => `Month ${item.month}`),
        datasets: [
            {
                label: 'Profit',
                data: data.map(item => item.profit),
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    return (
        <div>
            <Line data={chartData} />
        </div>
    );
};

export default YearlyProfitGraph;
