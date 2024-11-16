import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack'; // Import Notistack
import { BiShow, BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineDownload } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete, MdEmail } from 'react-icons/md';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { FaTaxi, FaHotel, FaSuitcase, FaMap } from 'react-icons/fa';
import EnquiryModel from './EnquiryModel';
import '../css/EnquirySingleCard.css';

const EnquirySingleCard = ({ enquiry, onUpdateStatus = () => {} }) => { // Default value for onUpdateStatus
    const [showModel, setShowModel] = useState(false);
    const { enqueueSnackbar } = useSnackbar(); // Initialize Notistack

    // Log the props received for debugging
    console.log('Props received:', { enquiry, onUpdateStatus });

    const handleDownloadIndividual = (id) => {
        window.open(`http://localhost:5557/enquiries/download/${id}`, '_blank');
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'new':
                return '#ef4444'; // red
            case 'pending':
                return '#facc15'; // yellow
            case 'completed':
                return '#10b981'; // green
            default:
                return '#6b7280'; // grey
        }
    };

    // Icon mapping based on enquiry type
    const enquiryTypeIcons = {
        'tour guide': <FaMap className="icon-type" />,
        'vehicle': <FaTaxi className="icon-type" />,
        'hotel rates': <FaHotel className="icon-type" />,
        'tour packages': <FaSuitcase className="icon-type" />,
        // Add more mappings as needed
    };

    // Function to validate email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to format phone number for WhatsApp
    const formatPhoneNumber = (phoneNumber) => {
        let cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
        if (cleanedPhoneNumber.length === 10) {
            cleanedPhoneNumber = '94' + cleanedPhoneNumber; // Assuming you want to prefix with '94'
        }
        return `+${cleanedPhoneNumber}`;
    };

    // Update status to completed
    const updateStatusToCompleted = () => {
        onUpdateStatus(enquiry._id, 'completed');
    };

    const openEmailTemplate = (enquiry) => {
        const { ContactInfo: email, CustomerName, EnquiryType } = enquiry;
        if (isValidEmail(email)) {
            const subject = `Regarding your enquiry: ${EnquiryType}`;
            const body = `Dear ${CustomerName},\n\nWe are writing to you regarding your enquiry about ${EnquiryType}. Please let us know if you need any further assistance.\n\nBest regards,\nExciting Travels`;
            
            // Open email client
            window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Delay status update to ensure email client has time to open
            setTimeout(() => {
                updateStatusToCompleted(); // Update status after the email client opens
            }, 1000); // Adjust this delay if necessary
        } else {
            enqueueSnackbar('The email address is invalid. Please check the contact info.', { variant: 'error' });
        }
    };
    
    const openWhatsAppReply = (enquiry) => {
        const { CustomerName, EnquiryType, ContactInfo } = enquiry;
    
        // Check if the ContactInfo is a valid phone number
        const cleanedPhoneNumber = ContactInfo.replace(/\D/g, '');
        const isPhoneNumber = cleanedPhoneNumber.length === 10; // Adjust this condition based on your requirements
    
        if (isValidEmail(ContactInfo) || !isPhoneNumber) {
            enqueueSnackbar('The WhatsApp contact number is invalid. Please check the contact info.', { variant: 'error' });
            return;
        }
    
        const phoneNumber = formatPhoneNumber(ContactInfo); // Proceed to format if it's a valid phone number
    
        const message = `Hello ${CustomerName},\n\nThank you for reaching out to us regarding your enquiry about ${EnquiryType}. We are reviewing your request and will get back to you as soon as possible.\n\nIf you have any additional questions, feel free to reply to this message.\n\nBest regards,\nExciting Travels`;
        const formattedMessage = encodeURIComponent(message);
    
        // Open WhatsApp chat with the message
        const url = `https://wa.me/${phoneNumber}?text=${formattedMessage}`;
        window.open(url, '_blank'); // Open in a new tab
    
        // Delay the status update to ensure WhatsApp chat has time to open
        setTimeout(() => {
            updateStatusToCompleted(); // Update status after opening WhatsApp chat
        }, 1000); // Adjust this delay if necessary
    };
    

    return (
        <div className="enquiry-card">
            <div
                className="status-badge"
                style={{ backgroundColor: getStatusColor(enquiry.Status) }}
            >
                {enquiry.Status}
            </div>

            <div className="customer-info">
                <BiUserCircle className="icon-user" />
                <h2 className="customer-name">
                    {enquiry.CustomerName}
                </h2>
            </div>

            <div className="enquiry-type">
                {enquiryTypeIcons[enquiry.EnquiryType.toLowerCase()] || <PiBookOpenTextLight className="icon-book" />}
                <p>{enquiry.EnquiryType}</p>
            </div>

            <div className="action-icons">
                <BiShow
                    className="icon-action icon-view"
                    onClick={() => setShowModel(true)}
                />
                <Link to={`/enquiries/details/${enquiry._id}`}>
                    <BsInfoCircle className="icon-action icon-info" />
                </Link>
                <AiOutlineDownload
                    className="icon-action icon-download"
                    onClick={() => handleDownloadIndividual(enquiry._id)}
                />
                <Link to={`/enquiries/edit/${enquiry._id}`}>
                    <AiOutlineEdit className="icon-action icon-edit" />
                </Link>
                <Link to={`/enquiries/delete/${enquiry._id}`}>
                    <MdOutlineDelete className="icon-action icon-delete" />
                </Link>
                <MdEmail
                    className="icon-action icon-email"
                    onClick={() => openEmailTemplate(enquiry)}
                    style={{ cursor: 'pointer' }}
                />
                <AiOutlineWhatsApp
                    className="icon-action icon-whatsapp"
                    onClick={() => openWhatsAppReply(enquiry)}
                    style={{ cursor: 'pointer' }}
                />
            </div>

            {showModel && <EnquiryModel enquiry={enquiry} onClose={() => setShowModel(false)} />}
        </div>
    );
};

export default EnquirySingleCard;
