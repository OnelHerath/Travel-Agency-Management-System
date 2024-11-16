import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import { FaWhatsapp, FaEnvelope, FaSearch } from 'react-icons/fa'; // Import FaSearch
import EnquiryTable from '../../home/EnquiryTable.js';
import Spinner from '../../Spinner.js';
import EnquiryCard from '../../home/EnquiryCard.js';
import '../../css/Home.css';
import NavBar from '../../home/NavBar.js';
import Footer from '../../home/Footer.js';

const Home = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [filteredEnquiries, setFilteredEnquiries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
    const [filters, setFilters] = useState({
        dateCreated: '',
        dateUpdated: '',
        status: '',
        type: '',
        contactType: '',
        contactValue: '',
        search: ''
    });
    const [reportType, setReportType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5557/enquiries')
            .then((response) => {
                setEnquiries(response.data.data);
                setFilteredEnquiries(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const { dateCreated, dateUpdated, status, type, contactType, contactValue, search } = filters;

        const filtered = enquiries.filter(enquiry => {
            const matchesDateCreated = dateCreated ? new Date(enquiry.createdAt).toLocaleDateString() === new Date(dateCreated).toLocaleDateString() : true;
            const matchesDateUpdated = dateUpdated ? new Date(enquiry.updatedAt).toLocaleDateString() === new Date(dateUpdated).toLocaleDateString() : true;
            const matchesStatus = status ? enquiry.Status === status : true;
            const matchesType = type ? enquiry.EnquiryType === type : true;

            const matchesContactType = contactType
                ? (contactType === 'phone' ? enquiry.ContactInfo.includes(contactValue) : enquiry.ContactInfo.includes(contactValue))
                : true;

            const matchesContactValueSearch = contactValue
                ? (contactType === 'phone' ? enquiry.ContactInfo.includes(contactValue) : enquiry.ContactInfo.includes(contactValue))
                : true;

            const matchesSearch = search
                ? enquiry.CustomerName.toLowerCase().includes(search.toLowerCase()) ||
                enquiry.EnquiryDescription.toLowerCase().includes(search.toLowerCase()) ||
                enquiry.ContactInfo.includes(search) // Search both CustomerName and ContactInfo together
                : true;

            return matchesDateCreated && matchesDateUpdated && matchesStatus && matchesType && matchesContactType && matchesContactValueSearch && matchesSearch;
        });

        const sortedFiltered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setFilteredEnquiries(sortedFiltered);
    }, [filters, enquiries]);

    const handleFilterChange = (e) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleContactTypeChange = (e) => {
        setFilters(prev => ({
            ...prev,
            contactType: e.target.value,
            contactValue: ''
        }));
    };

    const handleReportDownload = () => {
        if (reportType) {
            const url = reportType === 'all'
                ? 'http://localhost:5557/enquiries/download/all'
                : `http://localhost:5557/enquiries/download/type/${reportType}`;
            window.open(url, '_blank');
        } else {
            alert("Please select a report type.");
        }
    };

    return (
        <div>
        <div className="container" style={{marginTop:'70px'}}>
            
            <NavBar />
            <div style={{ paddingTop: '60px' }}></div>

            <div className="view-toggle-buttons">
                <button
                    className="toggle-button"
                    onClick={() => setShowType('table')}
                >
                    Table
                </button>
                <button
                    className="toggle-button"
                    onClick={() => setShowType('card')}
                >
                    Card
                </button>
            </div>

            

            {/* Filters Section */}
            <div className="filters-container">
                <input
                    type="date"
                    name="dateCreated"
                    value={filters.dateCreated}
                    onChange={handleFilterChange}
                    placeholder="Date Created"
                />
                <input
                    type="date"
                    name="dateUpdated"
                    value={filters.dateUpdated}
                    onChange={handleFilterChange}
                    placeholder="Date Updated"
                />
                <select name="status" onChange={handleFilterChange} value={filters.status}>
                    <option value="">Status</option>
                    <option value="New">New</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
                <select name="type" onChange={handleFilterChange} value={filters.type}>
                    <option value="">Select Enquiry Type</option>
                    <option value="Tour Guide">Tour Guide</option>
                    <option value="Hotel Rates">Hotel Rates</option>
                    <option value="Tour Package">Tour Package</option>
                    <option value="Vehicle">Vehicle</option>
                </select>

                {/* Search Bar with Icon */}
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                        placeholder="Search"
                    />
                </div>
            </div>

            {/* Report Download Section */}
            <div className="report-download-container">
                <select
                    onChange={(e) => setReportType(e.target.value)}
                    value={reportType}
                    className="report-dropdown"
                >
                    <option value="">Select Report Type</option>
                    <option value="Tour Guide">Tour Guide Enquiries</option>
                    <option value="Tour Package">Tour Package Enquiries</option>
                    <option value="Vehicle">Vehicle Enquiries</option>
                    <option value="Hotel Rates">Hotel Rates Enquiries</option>
                </select>
                <button onClick={handleReportDownload} className="download-button">
                    Download PDF
                </button>

                <Link to='/enquiries/create'>
                    <MdOutlineAddBox className="add-enquiry-icon" />
                </Link>

                <div className="contact-icons">
                    <a href="whatsapp://send?phone=+940742228216" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp className="icon-whatsapp " />
                    </a>
                    <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" rel="noopener noreferrer">
                        <FaEnvelope className="contact-eicon" />
                    </a>
                </div>
            </div>

            <div className="content-container">
                <div className="content-header"></div>
                {loading ? (
                    <Spinner />
                ) : showType === 'table' ? (
                    <EnquiryTable enquiries={filteredEnquiries} setFilters={setFilters} handleContactTypeChange={handleContactTypeChange} />
                ) : (
                    <EnquiryCard enquiries={filteredEnquiries} setFilters={setFilters} handleContactTypeChange={handleContactTypeChange} />
                )}
            </div>
          
        </div>
          <Footer></Footer>
          </div>
    );
};

export default Home;
