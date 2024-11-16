import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/sideMenue.css';

const SideMenu = ({ children }) => {
    // State to control the side menu visibility
    const [isOpen, setIsOpen] = useState(true);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false); // State for submenu

    // Function to toggle the menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Function to toggle the submenu
    const toggleSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };

    return (
        <div className={`side-menu-container ${isOpen ? 'open' : 'closed'}`}>
            {/* Side Navigation Menu */}
            <div className={`side-menu ${isOpen ? 'open' : 'closed'}`}>
                <h2 className='menu-title'>Exciting Travels</h2>

                <div>
                    <Link to='/home' className='menu-link' onClick={toggleSubmenu}>
                        Enquiry List
                    </Link>
                    {isSubmenuOpen && (
                        <div className="submenu">
                            <Link to='/home' className='submenu-link'>Table View</Link>
                            <Link to='/enquiries/enquiryCard' className='submenu-link'>Card View</Link>

                        </div>
                    )}
                </div>

                <Link to='/enquiries/create' className='menu-link'>Create Enquiry</Link>
                <Link to='/reports/AllReports' className='menu-link'>Reports</Link>

                {/* Spacer to push Settings and Logout to the bottom */}
                <div className='menu-spacer' />

                {/* Settings and Logout buttons */}
                <Link to='/settings' className='menu-link'>Settings</Link>
                <Link to='/logout' className='menu-link'>Logout</Link>
            </div>

            {/* Toggle Button */}
            <button className="toggle-button" onClick={toggleMenu}>
                {isOpen ? 'Close' : 'Open'} 
            </button>

            {/* Main content */}
            <div className='content'>
                {children}
            </div>
        </div>
    );
};

export default SideMenu;
