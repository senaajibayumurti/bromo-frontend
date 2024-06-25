import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import classNames from 'classnames';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChartSuhu = ({ idKandang }) => {
  const [value, setValue] = useState(0); // Initialize with default temperature value 0°C
  const [computedColor, setComputedColor] = useState('#FFFF00'); // Default color, assumed yellow for middle range
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (!idKandang) {
      setValue(0); // Set to 0 if no id is provided
      setIsLoading(false);
      return;
    }

    setIsLoading(true); // Set loading to true when starting fetch
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const response = await fetch(`https://toko.technosv.my.id/api/sensor-suhu-kelembaban/${idKandang}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch temperature data');
        }

        const data = await response.json();
        setValue(data.data ? data.data.suhu : 0);
        setIsLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error('Error fetching temperature data:', error);
        setValue(0); // Set value to 0 in case of error
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idKandang]);

  useEffect(() => {
    let colorClass;
    if (value >= 25 && value <= 32) {
      colorClass = 'bg-bromo-green-500';
    } else if ((value >= 21 && value < 25) || (value > 32 && value <= 35)) {
      colorClass = 'bg-bromo-yellow-500';
    } else {
      colorClass = 'bg-bromo-red-500';
    }

    if (value > 50) {
      colorClass = 'bg-bromo-red-500'; // Change color to red if value is greater than 50
    }

    const dummyDiv = document.createElement('div');
    dummyDiv.className = classNames(colorClass);
    document.body.appendChild(dummyDiv);
    const color = getComputedStyle(dummyDiv).backgroundColor;
    document.body.removeChild(dummyDiv);
    setComputedColor(color);
  }, [value]);

  const data = {
    labels: ['Suhu', 'Remaining'],
    datasets: [
      {
        data: isLoading ? [0, 100] : [Math.min(value, 50), 50 - Math.min(value, 50)], // Adjust chart data based on loading state and limit maximum value to 50
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
          label: function (tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw + '°C';
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="relative w-48 h-48">
        <Doughnut data={data} options={options} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-center ${isLoading ? 'text-gray-600' : 'text-black'}`}>
          {isLoading ? '0°C' : `${value}°C`}
        </div>
      </div>
      <div className="text-center mt-2 text-bromo-neutral-900">
        Suhu
      </div>
    </div>
  );
};

export default DonutChartSuhu;
