import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import SummaryApi from '../common';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TopProductsChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(SummaryApi.topProducts.url, {
                method: SummaryApi.topProducts.method,
                credentials: 'include',
            });
            const dataResponse = await response.json();
            setData(dataResponse);
        };

        fetchData();
    }, []);

    const chartData = {
        labels: data.map((product) => product.productName),
        datasets: [
            {
                label: 'Total Sold',
                data: data.map((product) => product.totalSold),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                barThickness: 50,
                maxBarThickness: 100,
                categoryPercentage: 0.5,
            }
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                barThickness: 50,
                maxBarThickness: 100,
                categoryPercentage: 0.5,
                ticks: {
                    autoSkip: false,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='w-full h-[500px] p-2 border rounded shadow-lg'>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default TopProductsChart;
