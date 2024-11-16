import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/NavBar.css';

const NavBar = ({ setFilters }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Update the timer every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval on component unmount
    }, []);

    // Format the time to HH:MM:SS
    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            {/* Navigation Links */}
            <ul className="nav_links">
                <li>
                    <NavLink to="/enquiries/dashboard" exact activeClassName="active" onClick={toggleMenu}>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/home" exact activeClassName="active" onClick={toggleMenu}>
                        Enquiry List
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/enquiries/create" exact activeClassName="active" onClick={toggleMenu}>
                        Create Enquiry
                    </NavLink>
                </li>
                
                <li>
                    <NavLink to="/reports/AllReports" activeClassName="active">
                        Charts
                    </NavLink>
                </li>
            </ul>

            <h1 className="enquiry-list-header">Enquiry Management</h1>

            {/* Timer */}
            <div className="timer">
                {formatTime(currentTime)}
            </div>

            
        </nav>
    );
};

export default NavBar;
