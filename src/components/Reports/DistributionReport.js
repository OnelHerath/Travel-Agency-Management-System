import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const DistributionReport = () => {
    const [data, setData] = useState([]);
    const chartRef = useRef(null); // Reference for Chart.js canvas
    let chartInstance = null; // To track the chart instance

    useEffect(() => {
        // Fetch the data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5557/enquiries/reports/DistributionReport');
                setData(response.data.data); // Ensure the response has the correct structure
            } catch (error) {
                console.error('Error fetching distribution data', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Only render the chart when data is available
        if (data.length > 0 && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            // Destroy the previous chart instance if it exists to avoid rendering issues
            if (chartInstance) {
                chartInstance.destroy();
            }

            // Create a new chart
            chartInstance = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: data.map(entry => entry.name), // Get names directly from the data
                    datasets: [
                        {
                            label: 'Enquiry Distribution',
                            data: data.map(entry => entry.count), // Get counts directly from the data
                            backgroundColor: ['#0088FE', '#00C49F', '#FFBB28'], // Example colors
                            hoverBackgroundColor: ['#0078DE', '#00B48F', '#FFAA18'] // Example hover colors
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Enquiry Distribution by Type'
                        },
                        tooltip: {
                            callbacks: {
                                label: (tooltipItem) => {
                                    const label = data[tooltipItem.dataIndex]?.name || ''; // Get the correct label
                                    const value = tooltipItem.raw; // Get the correct value
                                    return `${label}: ${value}`;
                                }
                            }
                        }
                    }
                }
            });
        }
    }, [data]);

    return (
        <div className="container">
            <h2>Distribution Report</h2>
            {/* Create the canvas where Chart.js will render the chart */}
            <canvas ref={chartRef} width="400" height="400"></canvas>
        </div>
    );
};

export default DistributionReport;
