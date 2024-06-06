// components/DonutChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

// Register ArcElement globally
Chart.register(ArcElement);

const DonutChart = ({ data }) => {
  if (!data) return null;

  const { labels, datasets } = data;

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '300px' }}>
      <Doughnut data={{ labels, datasets }} options={options} />
    </div>
  );
};

export default DonutChart;