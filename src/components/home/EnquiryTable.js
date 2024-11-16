import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDownload } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete, MdEmail } from 'react-icons/md';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { useSnackbar } from 'notistack'; // Import useSnackbar from notistack
import axios from 'axios'; // Import axios for API calls
import '../css/EnquiryTable.css';
import Footer from './Footer';

const EnquiryTable = ({ enquiries, setFilters }) => {
    const { enqueueSnackbar } = useSnackbar(); // Hook for displaying snackbars

    // Function to get the appropriate CSS class based on the status
    const getStatusClassName = (status) => {
        switch (status) {
            case 'New':
                return 'status-button status-new';
            case 'Pending':
                return 'status-button status-pending';
            case 'Completed':
                return 'status-button status-completed';
            default:
                return 'status-button';
        }
    };

    // Function to handle downloading individual enquiry reports
    const handleDownloadIndividual = (id) => {
        window.open(`http://localhost:5557/enquiries/download/${id}`, '_blank');
    };

    // Function to validate the email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to format phone number for WhatsApp
    const formatPhoneNumber = (phoneNumber) => {
        let cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
        if (cleanedPhoneNumber.length === 10) {
            cleanedPhoneNumber = '94' + cleanedPhoneNumber;
        }
        return `+${cleanedPhoneNumber}`;
    };

    // Function to validate phone number
    const isValidPhoneNumber = (phoneNumber) => {
        const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
        return cleanedPhoneNumber.length === 10;
    };

    // Function to update the enquiry status to "Completed"
    const updateEnquiryStatus = async (id) => {
        try {
            await axios.put(`http://localhost:5557/enquiries/${id}`, { Status: 'Completed' });
            enqueueSnackbar('Enquiry status updated to Completed', { variant: 'success' });
        } catch (error) {
            console.error('Error updating enquiry status:', error);
            enqueueSnackbar('Failed to update enquiry status', { variant: 'error' });
        }
    };

    // Open email client and update enquiry status
    const openEmailTemplate = async (enquiry) => {
        const { ContactInfo: email, CustomerName, EnquiryType, _id } = enquiry;
        if (isValidEmail(email)) {
            const subject = `Regarding your enquiry: ${EnquiryType}`;
            const body = `Dear ${CustomerName},\n\nWe are writing to you regarding your enquiry about ${EnquiryType}. Please let us know if you need any further assistance.\n\nBest regards,\nExciting Travels`;
            window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Update status after opening the email client
            await updateEnquiryStatus(_id);
        } else {
            enqueueSnackbar('The email address is invalid. Please check the contact info.', { variant: 'error' });
        }
    };

    // Open WhatsApp and update enquiry status
    const openWhatsAppReply = async (enquiry) => {
        const { CustomerName, EnquiryType, ContactInfo, _id } = enquiry;
        if (!isValidPhoneNumber(ContactInfo)) {
            enqueueSnackbar('The phone number is invalid. Please check the contact info.', { variant: 'error' });
            return;
        }

        const message = `Hello ${CustomerName},\n\nThank you for reaching out to us regarding your enquiry about ${EnquiryType}. We are reviewing your request and will get back to you as soon as possible.\n\nIf you have any additional questions, feel free to reply to this message.\n\nBest regards,\nExciting Travels`;
        const formattedMessage = encodeURIComponent(message);
        const phoneNumber = formatPhoneNumber(ContactInfo);

        // Open WhatsApp chat with the message
        const url = `https://wa.me/${phoneNumber}?text=${formattedMessage}`;

        // Check if the user is on a mobile device
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            // If mobile, open in the app if installed, otherwise in the browser
            window.open(url, '_self'); // Use '_self' to navigate in the same tab
        } else {
            // If on desktop, open in a new tab
            window.open(url, '_blank');
        }

        // Update status after opening WhatsApp
        await updateEnquiryStatus(_id);
    };


    return (
        <div className="container">
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th>Contact Info</th>
                            <th className="enquiry-type-header">Enquiry Type</th>
                            <th className="enquiry-description-header">Enquiry Description</th>
                            <th>Status</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enquiries.map((enquiry, index) => (
                            <tr key={enquiry._id}>
                                <td>{index + 1}</td>
                                <td>{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                                <td>{enquiry.CustomerName}</td>
                                <td>{enquiry.ContactInfo}</td>
                                <td>
                                    <button
                                        className="enquiry-type-button"
                                        onClick={() => console.log(`Clicked on ${enquiry.EnquiryType}`)}
                                    >
                                        {enquiry.EnquiryType}
                                    </button>
                                </td>
                                <td className="enquiry-description">{enquiry.EnquiryDescription}</td>
                                <td>
                                    <button className={getStatusClassName(enquiry.Status)}>
                                        {enquiry.Status}
                                    </button>
                                </td>
                                <td className="operations">
                                    <Link to={`/enquiries/details/${enquiry._id}`}>
                                        <BsInfoCircle className="icon icon-info" />
                                    </Link>
                                    <AiOutlineDownload
                                        className="icon icon-download"
                                        onClick={() => handleDownloadIndividual(enquiry._id)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <Link to={`/enquiries/edit/${enquiry._id}`}>
                                        <AiOutlineEdit className="icon icon-edit" />
                                    </Link>
                                    <Link to={`/enquiries/delete/${enquiry._id}`}>
                                        <MdOutlineDelete className="icon icon-delete" />
                                    </Link>
                                    <MdEmail
                                        className="icon icon-email"
                                        onClick={() => openEmailTemplate(enquiry)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <AiOutlineWhatsApp
                                        className="icon icon-whatsapp"
                                        onClick={() => openWhatsAppReply(enquiry)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
  
        </div>
    );
};

export default EnquiryTable;
