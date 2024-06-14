import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import classNames from 'classnames';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChartKelembaban = ({ idKandang }) => {
  const [value, setValue] = useState(0); // Default humidity value
  const [computedColor, setComputedColor] = useState('#00FF00'); // Default color

  useEffect(() => {
    // Fetch humidity data based on idKandang
    const fetchData = async () => {
      if (!idKandang) return;

      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const response = await fetch(`http://toko.technosv.my.id/api/sensor-suhu-kelembaban/${idKandang}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch humidity data');
        }

        const data = await response.json();
        setValue(data.data.kelembaban || 0);
      } catch (error) {
        console.error('Error fetching humidity data:', error);
      }
    };

    fetchData();
  }, [idKandang]);

  useEffect(() => {
    // Dummy div to get the computed color value from Tailwind class
    const dummyDiv = document.createElement('div');
    dummyDiv.className = classNames('bg-bromo-green-500');
    document.body.appendChild(dummyDiv);
    const color = getComputedStyle(dummyDiv).backgroundColor;
    document.body.removeChild(dummyDiv);
    setComputedColor(color);
  }, []);

  const data = {
    labels: ['Kelembaban', 'Remaining'],
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
          label: function (tooltipItem) {
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-center text-bromo-neutral-900">
          {value}%
        </div>
      </div>
      <div className="text-center mt-2 text-bromo-neutral-900">
        Kelembaban
      </div>
    </div>
  );
};

export default DonutChartKelembaban;