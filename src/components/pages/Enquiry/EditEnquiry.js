import React, { useState, useEffect } from 'react';
import BackButton from '../../BackButton';
import Spinner from '../../Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import '../../css/EditEnquiry.css' // Import the CSS file
import Footer from '../../home/Footer';
import NavBar from '../../home/NavBar'; 

const EditEnquiry = () => {
  const [CustomerName, setCustomerName] = useState('');
  const [ContactInfo, setContactInfo] = useState('');
  const [EnquiryType, setEnquiryType] = useState('');
  const [EnquiryDescription, setEnquiryDescription] = useState('');
  const [Status, setStatus] = useState('');
  const [loading, setLoading] = useState(true); 
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (id) { 
      axios 
        .get(`http://localhost:5557/enquiries/${id}`)
        .then((response) => {
          const { CustomerName, ContactInfo, EnquiryType, EnquiryDescription, Status } = response.data.data;
          setCustomerName(CustomerName || '');  
          setContactInfo(ContactInfo || '');    
          setEnquiryType(EnquiryType || 'Tour Guide'); 
          setEnquiryDescription(EnquiryDescription || ''); 
          setStatus(Status || 'New');
          setLoading(false); 
        })
        .catch((error) => {
          setLoading(false);
          alert('An error occurred. Please check the console.');
          console.log(error);
        });
    }
  }, [id]);

  const handleEditEnquiry = () => {
    const data = {
      CustomerName,
      ContactInfo,
      EnquiryType,
      EnquiryDescription,
      Status,
    };

    setLoading(true);

    axios
      .put(`http://localhost:5557/enquiries/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Enquiry Edited Successfully!', { variant: 'success' });
        navigate('/home');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  if (loading) return <Spinner />;

  return (
    <div className="edit-enquiry-container">
      <NavBar /> {/* Add NavBar here */}
      <BackButton />
      
      <h1 className="edit-enquiry-title">Edit Enquiry</h1>
      <div className="edit-enquiry-form">
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="customerName" className="edit-enquiry-label">Customer Name</label>
          <input
            id="customerName"
            type="text"
            value={CustomerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="edit-enquiry-input"
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="contactInfo" className="edit-enquiry-label">Contact Info</label>
          <input
            id="contactInfo"
            type="text"
            value={ContactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            className="edit-enquiry-input"
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="enquiryType" className="edit-enquiry-label">Enquiry Type</label>
          <select
            id="enquiryType"
            value={EnquiryType}
            onChange={(e) => setEnquiryType(e.target.value)}
            className="edit-enquiry-select"
          >
            <option value="Tour Guide">Tour Guide</option>
            <option value="Tour Package">Tour Package</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Hotel Rates">Hotel Rates</option>
          </select>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="enquiryDescription" className="edit-enquiry-label">Enquiry Description</label>
          <input
            id="enquiryDescription"
            type="text"
            value={EnquiryDescription}
            onChange={(e) => setEnquiryDescription(e.target.value)}
            className="edit-enquiry-input"
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="status" className="edit-enquiry-label">Status</label>
          <select
            id="status"
            value={Status}
            onChange={(e) => setStatus(e.target.value)}
            className="edit-enquiry-select"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button
          className="edit-enquiry-button"
          onClick={handleEditEnquiry}
        >
          Save Changes
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default EditEnquiry;
