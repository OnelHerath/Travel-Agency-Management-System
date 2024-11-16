import React from 'react';
import { FaWhatsapp, FaEnvelope, FaHome } from 'react-icons/fa';

const ContactPage = () => {
  // WhatsApp link with a pre-filled message for a Sri Lankan number
  const handleWhatsAppClick = () => {
    window.location.href = 'https://wa.me/94742228216?text=Hello! Enter your enquiry here.';
  };

  // Email link with pre-filled subject and body
  const handleEmailClick = () => {
    window.open('https://mail.google.com/mail/u/0/#inbox', '_blank');
  };

  // Home Page link within your React app
  const handleHomeClick = () => {
    window.location.href = '/home'; // Assuming '/home' is the route for your homepage
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.cardContainer}>
        <h2 style={styles.heading}>Hi! Welcome Back</h2>
        <p style={styles.description}>Choose an option below to reach out to us:</p>

        {/* WhatsApp Button */}
        <button onClick={handleWhatsAppClick} style={styles.buttonWhatsapp}>
          <FaWhatsapp style={styles.icon} /> Open WhatsApp
        </button>

        {/* Email Button */}
        <button onClick={handleEmailClick} style={styles.buttonEmail}>
          <FaEnvelope style={styles.icon} /> Open Email
        </button>

        {/* Home Page Button */}
        <button onClick={handleHomeClick} style={styles.buttonHome}>
          <FaHome style={styles.icon} /> Go to Enquiry Management
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  pageContainer: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#031140',
    backgroundImage: 'url("https://myrussiantours.com/wp-content/uploads/2018/10/2018-10-21_20-20-57.jpg")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover', // Add this to ensure the background covers the entire page
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Slightly darker shadow for contrast
    width: '350px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
  },
  description: {
    fontSize: '16px',
    marginBottom: '30px',
    color: '#555',
  },
  buttonWhatsapp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0',
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#25D366',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
  },
  buttonEmail: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0',
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#0072C6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
  },
  buttonHome: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0',
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
  },
  icon: {
    marginRight: '10px',
  },
};

export default ContactPage;
