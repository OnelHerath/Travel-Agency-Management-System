import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const EnquiryTypeBreakdownReport = () => {
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5557/enquiries/reports/EnquiryTypeBreakdownReport');
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching enquiry type breakdown data', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const labels = data.map(item => item.type);
            const counts = data.map(item => item.count);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        data: counts,
                        backgroundColor: [
                            '#0088FE',
                            '#00C49F',
                            '#FFBB28',
                            '#FF8042',
                        ],
                        hoverBackgroundColor: [
                            '#007BFF',
                            '#28A745',
                            '#FFC107',
                            '#DC3545',
                        ],
                    },
                ],
            });
        }
    }, [data]);

    return (
        <div>
            <h2>Enquiry Type Breakdown Report</h2>
            {chartData.labels ? (
                <Pie data={chartData} />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default EnquiryTypeBreakdownReport;
