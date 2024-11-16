import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const ResponseTimeReport = () => {
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5557/enquiries/reports/ResponseTimeReport');
                console.log('Fetched Data:', response.data.data); // Log the data received
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching response time data', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const labels = data.map(item => item._id); // Assuming _id is the date string
            const responseTimes = data.map(item => item.responseTime);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Response Time',
                        data: responseTimes,
                        fill: false,
                        backgroundColor: '#8884d8',
                        borderColor: '#8884d8',
                        tension: 0.1,
                    },
                ],
            });
        }
    }, [data]);

    return (
        <div>
            <h2>Response Time Report</h2>
            {chartData.labels ? (
                <Line data={chartData} />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default ResponseTimeReport;
