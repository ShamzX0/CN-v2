import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';
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
                tension: 0,
                fill: false,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: false,
                type: 'linear' as const, // Use 'as const' to assert the type
            },
            y: {
                display: false,
                type: 'linear' as const,
                min: minValue - (valueRange * 0.2),
                max: maxValue + (valueRange * 0.2),
                grace: '2%',
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        animation: {
            duration: 0
        }
    };

    return (
        <div style={{ width: '170px', height: '70px' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default Sparkline;