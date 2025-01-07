import  { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Pie } from "react-chartjs-2"; // Import the Pie chart from Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const GetShareLinkAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchAnalytics = async () => {
      const promiseTitleId = Cookies.get("promiseId");
      try {
        const response = await axios.get(`https://auth-zxvu.onrender.com/api/auth/analytics/${promiseTitleId}`);
        if (response.data.success) {
          const analytics = response.data.analytics;
          console.log('Share link analytics:', analytics);
          
          // Process the analytics data to create chart data
          const deviceCategories = analytics.reduce((acc, item) => {
            const category = item.deviceCategory;
            acc[category] = (acc[category] || 0) + 1; // Count occurrences of each category
            return acc;
          }, {});
          
          // Prepare data for the pie chart
          const labels = Object.keys(deviceCategories);
          const data = Object.values(deviceCategories);

          setChartData({
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
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
    <div>
      <h2>Device Category Distribution</h2>
      {chartData.labels ? (
        <Pie data={chartData} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default GetShareLinkAnalytics;
