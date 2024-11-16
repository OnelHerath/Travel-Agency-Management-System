import React, { useState } from 'react';
import EnquirySingleCard from './EnquirySingleCard';
import Footer from './Footer';

const EnquiryCard = ({ enquiries }) => {
    // Remove setFilter if you don't need to update filter dynamically
    const [filter] = useState({
        dateCreated: '',
        contactType: '',
        contactValue: ''
    });

    const filteredEnquiries = enquiries.filter(enquiry => {
        const { dateCreated, contactType, contactValue } = filter;
        
        const matchesDate = dateCreated 
            ? new Date(enquiry.createdAt).toLocaleDateString() === new Date(dateCreated).toLocaleDateString() 
            : true;

        const matchesContact = (contactType === 'phone' && enquiry.ContactInfo.includes('07')) ||
                               (contactType === 'email' && enquiry.ContactInfo.includes('@')) || 
                               contactType === '';

        const matchesValue = contactValue ? enquiry.ContactInfo.includes(contactValue) : true;

        return matchesDate && matchesContact && matchesValue;
    });

    return (
        <div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start', 
                gap: '12px' 
            }}>
                {filteredEnquiries.map((item) => (
                    <EnquirySingleCard key={item._id} enquiry={item} />
                ))}
            </div>
        </div>
    );
};

export default EnquiryCard;
