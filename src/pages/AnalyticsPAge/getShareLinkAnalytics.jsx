import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Pie, Line } from "react-chartjs-2"; // Import Pie and Line charts from Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import "../../styles/Analytics.css"

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const GetShareLinkAnalytics = () => {
  const [chartData, setChartData] = useState({});
  const [lineChartData, setLineChartData] = useState({});
  const [topDate, setTopDate] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      const promiseTitleId = Cookies.get("promiseId");
      try {
        const response = await axios.get(`https://auth-zxvu.onrender.com/api/auth/analytics/${promiseTitleId}`);
        if (response.data.success) {
          const analytics = response.data.analytics;
          console.log('Share link analytics:', analytics);
          
          // 1. Device Category Distribution for Pie Chart
          const deviceCategories = analytics.reduce((acc, item) => {
            const category = item.deviceCategory;
            acc[category] = (acc[category] || 0) + 1; // Count occurrences of each category
            return acc;
          }, {});
          
          // Prepare data for the pie chart
          const pieLabels = Object.keys(deviceCategories);
          const pieData = Object.values(deviceCategories);

          // Set pie chart data
          setChartData({
            labels: pieLabels,
            datasets: [
              {
                data: pieData,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
              },
            ],
          });

          // 2. Clicks Over Time for Line Chart
          const dailyClicks = analytics.reduce((acc, item) => {
            const date = item.timestamp.split('T')[0]; // Extract the date part (YYYY-MM-DD)
            acc[date] = (acc[date] || 0) + 1; // Count clicks for that date
            return acc;
          }, {});

          // Prepare data for the line chart
          const dates = Object.keys(dailyClicks);
          const clicks = Object.values(dailyClicks);

          // Set line chart data
          setLineChartData({
            labels: dates,
            datasets: [
              {
                label: 'Clicks Over Time',
                data: clicks,
                borderColor: '#FF6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
              },
            ],
          });

          // 3. Find the Top Performing Date
          const topDateData = Object.entries(dailyClicks).reduce((acc, [date, count]) => {
            if (count > acc.count) {
              acc = { date, count };
            }
            return acc;
          }, { date: '', count: 0 });

          setTopDate(topDateData);
        } else {
          console.log('Failed to retrieve analytics');
        }
      } catch (error) {
        console.error('Error retrieving share link analytics:', error);
      }
    };
    
    fetchAnalytics();
  }, []);

  return (
    <div className="analytics-container">
      <div className="chart-container">
        <h2>Clicks Over Time</h2>
        {lineChartData.labels ? (
          <div className="line-chart">
            <Line data={lineChartData} />
          </div>
        ) : (
          <p>Loading chart...</p>
        )}
      </div>

      <div className="chart-container">
        <h2>Device Category Distribution</h2>
        {chartData.labels ? (
          <div className="pie-chart">
            <Pie data={chartData} />
          </div>
        ) : (
          <p>Loading chart...</p>
        )}
      </div>

      {topDate.date && (
        <div className="top-performing-date">
          <h3>Top Performing Date</h3>
          <p>{topDate.date} with {topDate.count} clicks</p>
        </div>
      )}
    </div>
  );
};

export default GetShareLinkAnalytics;
