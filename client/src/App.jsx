import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const LinkAnalytics = () => {
  const [clickData, setClickData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/links/');
        setClickData(response.data);
      } catch (error) {
        console.error('Error fetching click analytics:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Link Analytics</h2>
      <Bar
        data={{
          labels: Object.keys(clickData),
          datasets: [
            {
              label: 'Clicks',
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: Object.values(clickData),
            },
          ],
        }}
        options={{
          title: {
            display: true,
            text: 'Clicks Distribution',
            fontSize: 20,
          },
          legend: {
            display: true,
            position: 'right',
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
          },
        }}
      />
    </div>
  );
};

export default LinkAnalytics;
