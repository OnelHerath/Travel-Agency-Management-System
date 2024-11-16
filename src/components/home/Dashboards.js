import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/EnquiryDashboard.css'; // Import the CSS file
import NavBar from './NavBar';
import DatePicker from 'react-datepicker'; // Import the DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for DatePicker

const Dashboard = () => {
    const [statusCounts, setStatusCounts] = useState([]); // Array to hold counts of each status
    const [totalCount, setTotalCount] = useState(0); // State to hold total enquiries count
    const [selectedDate, setSelectedDate] = useState(null); // State to hold the selected date

    useEffect(() => {
        const fetchStatusCounts = async (date) => {
            try {
                const response = await axios.get('http://localhost:5557/enquiries/reports/statusCounts', {
                    params: { date: date ? date.toISOString().split('T')[0] : undefined }
                });
                
                setStatusCounts(response.data.data);

                // Calculate total count from the statusCounts
                const total = response.data.data.reduce((acc, statusItem) => acc + statusItem.count, 0);
                setTotalCount(total);
            } catch (error) {
                console.error('Error fetching status counts:', error);
            }
        };

        fetchStatusCounts(selectedDate); // Fetch status counts based on selected date
    }, [selectedDate]); // Re-run effect when selectedDate changes

    return (
        <div>
            <NavBar />
            <div style={{ marginBottom: '60px' }}></div>
            <h2 style={{marginTop:'100px'}}>Dashboard</h2>
            <div className="date-picker-container">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , marginTop:'20px'}}>
            <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)} // Update selected date
                dateFormat="yyyy-MM-dd" // Format the date
                placeholderText="Select a date"
                isClearable // Allow clearing the date selection
                inline // Show the calendar inline
                className="react-datepicker" // Add className for custom styling
            />
            </div>
            <div className="status-cards" >
                {/* Total Count Card */}
                <div className={`status-card total-count-card`}>
                    <h3>Total Enquiries</h3>
                    <p>{totalCount}</p>
                </div>
                
                {statusCounts.map((statusItem) => (
                    <div 
                        key={statusItem.status} 
                        className={`status-card status-${statusItem.status.toLowerCase()}`} // Assign color class based on status
                    >
                        <h3>{statusItem.status}</h3>
                        <p>Count: {statusItem.count}</p>
                    </div>
                ))}
            </div>       
            </div>

        </div>
    );
};

export default Dashboard;
