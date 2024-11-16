import React, { useState } from 'react';
import BackButton from '../../BackButton';
import Spinner from '../../Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import '../../css/CreateEnquiry.css';
import Footer from '../../home/Footer';
import NavBar from '../../home/NavBar'; 

const CreateEnquiry = () => {
  const [CustomerName, setCustomerName] = useState('');
  const [ContactInfo, setContactInfo] = useState('');
  const [EnquiryType, setEnquiryType] = useState('');
  const [EnquiryDescription, setEnquiryDescription] = useState('');
  const [ContactType, setContactType] = useState('phone'); // Default to phone
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveEnquiry = () => {
    if (!CustomerName.trim()) {
      enqueueSnackbar('Customer name is required.', { variant: 'error' });
      return;
    }
    // Check if CustomerName contains numbers
    if (/\d/.test(CustomerName)) {
      enqueueSnackbar('Customer name cannot contain numbers.', { variant: 'error' });
      return;
    }
    if (ContactType === 'phone' && !/^\d{10}$/.test(ContactInfo)) {
      enqueueSnackbar('Invalid phone number.', { variant: 'error' });
      return;
    }
    if (ContactType === 'email' && !/^\S+@\S+\.\S+$/.test(ContactInfo)) {
      enqueueSnackbar('Invalid email address.', { variant: 'error' });
      return;
    }
    if (!EnquiryType) {
      enqueueSnackbar('Please select an enquiry type.', { variant: 'error' });
      return;
    }
    if (!EnquiryDescription.trim()) {
      enqueueSnackbar('Enquiry description is required.', { variant: 'error' });
      return;
    }

    const data = {
      CustomerName,
      ContactInfo,
      EnquiryType,
      EnquiryDescription,
      Status: 'New', // Status is set to 'New' by default
    };

    setLoading(true);

    axios
      .post('http://localhost:5557/enquiries', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Enquiry Created Successfully!', { variant: 'success' });
        navigate('/home');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="create-enquiry-container">
      <NavBar /> {/* Add NavBar here */}
      <BackButton />
      
      <h1 className="create-enquiry-title" style={{marginTop:'100px'}}>Create Enquiry</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="create-enquiry-form">
          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              value={CustomerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
            />
          </div>
          <div className="form-group">
            <label>Contact Type</label>
            <select
              value={ContactType}
              onChange={(e) => setContactType(e.target.value)}
            >
              <option value="phone">Phone Number</option>
              <option value="email">Email Address</option>
            </select>
          </div>
          <div className="form-group">
            <label>{ContactType === 'phone' ? 'Phone Number' : 'Email Address'}</label>
            <input
              type="text"
              value={ContactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder={ContactType === 'phone' ? 'Enter phone number' : 'Enter email address'}
            />
          </div>
          <div className="form-group">
            <label>Enquiry Type</label>
            <select
              value={EnquiryType}
              onChange={(e) => setEnquiryType(e.target.value)}
            >
              <option value="">Select Enquiry Type</option>
              <option value="Tour Guide">Tour Guide</option>
              <option value="Tour Package">Tour Package</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Hotel Rates">Hotel Rates</option>
            </select>
          </div>
          <div className="form-group">
            <label>Enquiry Description</label>
            <input
              type="text"
              value={EnquiryDescription}
              onChange={(e) => setEnquiryDescription(e.target.value)}
              placeholder="Enter enquiry description"
            />
          </div>
          <button
            className="save-button"
            onClick={handleSaveEnquiry}
          >
            Save
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CreateEnquiry;
