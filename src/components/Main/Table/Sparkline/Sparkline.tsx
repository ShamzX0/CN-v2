import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface SparklineProps {
    data: number[];
    color?: string;
}

const Sparkline: React.FC<SparklineProps> = ({ data, color = 'rgba(75,192,192,1)' }) => {
    // Calculate the min and max values
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const valueRange = maxValue - minValue;

    const chartData = {
        labels: data.map((_, index) => index),
        datasets: [
            {
                data,
                borderColor: color,
                borderWidth: 1.4,
                pointRadius: 0,
                tension: 0,  // Remove smoothing for sharper lines
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
                type: 'linear' as const,
                // Set a very tight range around the actual data
                min: minValue - (valueRange * 0.2),
                max: maxValue + (valueRange * 0.2),
                grace: '2%'
            },
        },
        plugins: {
            legend: { display: false },
        },
        animation: {
            duration: 0
        }
    };

    return (
        <div style={{ width: '100%', height: '40px', minWidth: '200px' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default Sparkline;