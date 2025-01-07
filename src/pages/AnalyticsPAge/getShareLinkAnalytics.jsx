import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Pie, Line, Bar, Radar, Doughnut } from "react-chartjs-2"; // Import necessary charts
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, BarElement, Filler } from 'chart.js';
import "../../styles/Analytics.css"

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, BarElement, Filler);

const GetShareLinkAnalytics = () => {
  const [chartData, setChartData] = useState({});
  const [lineChartData, setLineChartData] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [radarData, setRadarData] = useState({});
  const [doughnutData, setDoughnutData] = useState({});
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

          // 4. Device Category Distribution for Bar Chart
          setBarChartData({
            labels: pieLabels,
            datasets: [
              {
                label: 'Device Category Count',
                data: pieData,
                backgroundColor: '#36A2EB',
              },
            ],
          });

          // 5. Radar Chart for Device Category Performance
          setRadarData({
            labels: pieLabels,
            datasets: [
              {
                label: 'Device Category Performance',
                data: pieData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: '#FF6384',
                borderWidth: 1,
              },
            ],
          });

          // 6. Doughnut Chart for Device Category Distribution
          setDoughnutData({
            labels: pieLabels,
            datasets: [
              {
                data: pieData,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
              },
            ],
          });

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
      {/* Line Chart */}
      <div className="chart-container">
        <h2>Clicks Over Time</h2>
        {lineChartData.labels ? (
          <div className="line-chart">
            <Line data={lineChartData} />
          </div>
        ) : (
          <p>Loading chart...</p>
        )}
        {topDate.date && (
          <div className="top-performing-date">
            <h3>Top Performing Date</h3>
            <p>{topDate.date} with {topDate.count} clicks</p>
          </div>
        )}
      </div>

      {/* Pie Chart */}
      <div className="chart-container">
        <h2>Device Category Distribution (Pie)</h2>
        {chartData.labels ? (
          <div className="pie-chart">
            <Pie data={chartData} />
          </div>
        ) : (
          <p>Loading chart...</p>
        )}
      </div>

      {/* Bar Chart */}
      <div className="chart-container">
        <h2>Device Category Distribution (Bar)</h2>
        {barChartData.labels ? (
          <div className="bar-chart">
            <Bar data={barChartData} />
          </div>
        ) : (
          <p>Loading chart...</p>
        )}
      </div>

      {/* Radar Chart */}
      <div className="chart-container">
        <h2>Device Category Performance (Radar)</h2>
        {radarData.labels ? (
          <div className="radar-chart">
            <Radar data={radarData} />
          </div>
        ) : (
          <p>Loading chart...</p>
        )}
      </div>

      {/* Doughnut Chart */}
      <div className="chart-container">
        <h2>Device Category Distribution (Doughnut)</h2>
        {doughnutData.labels ? (
          <div className="doughnut-chart">
            <Doughnut data={doughnutData} />
          </div>
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default GetShareLinkAnalytics;
