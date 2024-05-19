import React, { useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import Chart from 'chart.js/auto';
import backgroundImage from './assets/adminback.png';

const Dashboard = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    const ctx = chartRef.current.getContext('2d');
    const newChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(255, 159, 64, 0.5)', // Couleur orange pour le premier diagramme
            borderColor: 'rgba(255, 159, 64, 1)', // Bordure orange pour le premier diagramme
            borderWidth: 1
          },
          {
            label: 'Expenses',
            data: [35, 45, 60, 40, 70, 80, 55],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Profit',
            data: [20, 14, 30, 41, 26, 35, 60],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    chartInstanceRef.current = newChartInstance;
  }, []);

  return (
    <div className="dashboard" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', paddingTop: '50px', height: 'calc(100vh - 50px)' }}>
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="dashboard-content">
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard!</p>
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
