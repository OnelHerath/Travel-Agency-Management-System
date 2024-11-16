import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import axios from 'axios';
import '../css/EnquiryVolumeReport.css'; // Import the CSS file for styling

const EnquiryVolumeReport = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchData = async (start, end) => {
        try {
            const response = await axios.get('http://localhost:5557/enquiries/reports/EnquiryVolumeReport', {
                params: { startDate: start, endDate: end }
            });
            console.log('Fetched Data:', response.data.data); // Log the data received
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching enquiry volume data', error);
        }
    };

    useEffect(() => {
        // Fetch initial data if no dates are selected
        if (!startDate && !endDate) {
            fetchData('1970-01-01', new Date().toISOString().split('T')[0]); // Default to a wide range
        }
    }, [startDate, endDate]);

    const handleDateChange = () => {
        if (startDate && endDate) {
            fetchData(startDate, endDate);
        }
    };

    return (
        <div className="chart-container">
            <h2 className="chart-title">Enquiry Volume Report</h2>
            <div className="date-picker">
                <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                />
                <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                />
                <button onClick={handleDateChange}>Filter</button>
            </div>
            <LineChart width={800} height={400} data={data} className="styled-chart">
                <CartesianGrid strokeDasharray="3 3" className="grid-style" />
                <XAxis dataKey="_id" className="axis-style" />
                <YAxis className="axis-style" />
                <Tooltip className="tooltip-style" />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
        </div>
    );
};

export default EnquiryVolumeReport;
