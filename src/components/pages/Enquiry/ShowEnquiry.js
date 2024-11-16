import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../../BackButton';
import Spinner from '../../Spinner';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Footer from '../../home/Footer';
import NavBar from '../../home/NavBar'; 

const ShowEnquiry = () => {
  const [enquiries, setEnquiry] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5557/enquiries/${id}`)
      .then((response) => {
        console.log('API Response:', response.data.data);
        setEnquiry(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const containerStyle = {
    padding: '15px', // Decrease padding for reduced height
    backgroundImage: 'url("https://www.traveltrademaldives.com/assets/2023/01/33.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '40vh', // Adjust if needed
  };

  const titleStyle = {
    fontSize: '2rem',
    margin: '10px 0', // Decrease margin to reduce gap
    color: '#1f2937',
    textAlign: 'center',
    fontFamily: 'Times New Roman, serif',
    fontWeight: 'bold',
  };

  const detailsBoxStyle = {
    border: '1px solid #0ea5e9',
    borderRadius: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent background for better contrast
    padding: '24px',
    maxWidth: '550px',
    margin: 'auto',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Add shadow for depth
  };

  const detailStyle = {
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #e2e8f0',
  };

  const labelStyle = {
    fontSize: '1.125rem',
    color: '#4b5563',
    fontWeight: '600',
  };

  const valueStyle = {
    fontSize: '1rem',
    color: '#1f2937',
    textAlign: 'right',
    wordBreak: 'break-word', // Ensure long text doesn't overflow
  };

  return (
    <div style={containerStyle}>
      <NavBar />
      <div style={{ paddingTop: '10px' }}> {/* Decrease padding for BackButton */}
        <BackButton />
      </div>
      <h1 style={titleStyle}>Show Enquiry</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div style={detailsBoxStyle}>
          {Object.entries(enquiries).map(([key, value]) => (
            <div style={detailStyle} key={key}>
              <span style={labelStyle}>{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
              <span style={valueStyle}>
                {key.includes('Time') ? format(new Date(value), 'yyyy-MM-dd HH:mm:ss') : value}
              </span>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ShowEnquiry;
