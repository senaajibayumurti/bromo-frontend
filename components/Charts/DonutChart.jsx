import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import classNames from 'classnames';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ color, value, label }) => {
  // Dummy div to get the computed color value from Tailwind class
  const dummyDiv = document.createElement('div');
  dummyDiv.className = classNames(color);
  document.body.appendChild(dummyDiv);
  const computedColor = getComputedStyle(dummyDiv).backgroundColor;
  document.body.removeChild(dummyDiv);

  const data = {
    labels: ['Value', 'Remaining'],
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [computedColor, '#E0E0E0'],
        hoverBackgroundColor: [computedColor, '#E0E0E0'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw + '%';
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-48 h-48">
        <Doughnut data={data} options={options} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-center">
          {value}%
        </div>
      </div>
      <div className="text-center font-bold mt-2">
        {label}
      </div>
    </div>
  );
};

export default DonutChart;
