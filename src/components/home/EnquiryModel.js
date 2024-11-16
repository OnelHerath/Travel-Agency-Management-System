import React from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineTag, AiOutlineMail } from 'react-icons/ai'; // Icon for Enquiry ID and Contact Info
import { FiType } from 'react-icons/fi'; // Icon for Enquiry Type
import { MdDescription } from 'react-icons/md'; // Icon for Description
import '../css/EnquiryModel.css'; // Separate CSS file

const EnquiryModel = ({ enquiry, onClose }) => {
    // Helper function to apply the correct color for the status
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'new':
                return 'red';
            case 'pending':
                return 'yellow';
            case 'completed':
                return 'green';
            default:
                return 'gray';
        }
    };

    return (
        <div className="enquiry-overlay" onClick={onClose}>
            <div className="enquiry-modal" onClick={(event) => event.stopPropagation()}>
                <AiOutlineClose className="close-icon" onClick={onClose} />

                {/* Status on the left top side */}
                <div className="enquiry-status" style={{ backgroundColor: getStatusColor(enquiry.Status) }}>
                    <p>{enquiry.Status}</p>
                </div>

                {/* Customer name on the right side */}
                <div className="enquiry-name">
                    <BiUserCircle className="icon user-icon" />
                    <p className="customer-name">{enquiry.CustomerName}</p>
                </div>

                {/* Enquiry ID */}
                <div className="enquiry-id">
                    <AiOutlineTag className="icon" />
                    <p>{enquiry._id}</p>
                </div>

                {/* Enquiry Type */}
                <div className="enquiry-info">
                    <FiType className="icon" />
                    <p>{enquiry.EnquiryType}</p>
                </div>
                
                {/* Contact Info with icon */}
                <div className="enquiry-contact">
                    <AiOutlineMail className="icon" />
                    <p>{enquiry.ContactInfo}</p>
                </div>

                {/* Enquiry Description with icon */}
                <div className="enquiry-description">
                    <MdDescription className="icon" />
                    <h4>Description:</h4>
                    <p>{enquiry.EnquiryDescription}</p>
                </div>
            </div>
        </div>
    );
};

export default EnquiryModel;
