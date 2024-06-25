import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import classNames from 'classnames';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChartAmonia = ({ idKandang }) => {
  const [value, setValue] = useState(0); // Initialize with default value 0
  const [computedColor, setComputedColor] = useState('#FF0000'); // Default color
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const maxValue = 35; // Maximum value for ammonia

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

        const response = await fetch(`http://127.0.0.1:8080/api/sensor-amoniak/${idKandang}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch ammonia data');
        }

        const data = await response.json();
        setValue(data.data.length > 0 ? data.data[0].amoniak : 0);
        setIsLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error('Error fetching ammonia data:', error);
        setValue(0); // Set value to 0 in case of error
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idKandang]);

  useEffect(() => {
    let colorClass = value > maxValue ? 'bg-bromo-red-500' : value > 25 ? 'bg-bromo-yellow-500' : 'bg-bromo-green-500';

    const dummyDiv = document.createElement('div');
    dummyDiv.className = classNames(colorClass);
    document.body.appendChild(dummyDiv);
    const color = getComputedStyle(dummyDiv).backgroundColor;
    document.body.removeChild(dummyDiv);
    setComputedColor(color);
  }, [value]);

  const data = {
    labels: ['Amonia', 'Remaining'],
    datasets: [
      {
        data: isLoading ? [0, maxValue] : [value > maxValue ? maxValue : value, maxValue - (value > maxValue ? maxValue : value)],
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
            return tooltipItem.label + ': ' + tooltipItem.raw + ' ppm';
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="relative w-48 h-48">
        <Doughnut data={data} options={options} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-center ${value > maxValue ? 'text-bromo-error-500 font-bold' : 'text-bromo-neutral-900'}`}>
          {isLoading ? 0 : value} ppm
        </div>
      </div>
      <div className={`text-center mt-2 ${value > maxValue ? 'text-bromo-error-500' : 'text-bromo-neutral-900'}`}>
        Amonia
      </div>
    </div>
  );
};

export default DonutChartAmonia;
