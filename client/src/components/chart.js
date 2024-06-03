// src/components/Chart.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ data }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    setChartData({
      labels: Object.keys(data),
      datasets: [
        {
          label: 'Clicks by Source',
          data: Object.values(data),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, [data]);

  const options = {
    scales: {
      yAxes: [{ ticks: { beginAtZero: true } }],
    },
  };

  return (
    <div>
      <h2>Clicks by Source</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Chart;
