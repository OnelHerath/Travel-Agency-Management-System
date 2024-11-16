import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import EnquiryTable from './EnquiryTable';

const EnquiryManagement = () => {
    const [enquiries, setEnquiries] = useState([]);

    useEffect(() => {
        // Fetch all enquiries when the component mounts
        const fetchEnquiries = async () => {
            try {
                const response = await axios.get('http://localhost:5557/enquiries');
                setEnquiries(response.data.data);
            } catch (error) {
                console.log('Error fetching enquiries', error);
            }
        };

        fetchEnquiries();
    }, []);
 
    return (  
        <div> 
            {/* SearchBar passes setEnquiries to update the list */}
            <SearchBar setEnquiries={setEnquiries} />
            {/* EnquiryTable displays the list of enquiries */}
            <EnquiryTable enquiries={enquiries} setEnquiries={setEnquiries} />
        </div>
    );
};

export default EnquiryManagement;
