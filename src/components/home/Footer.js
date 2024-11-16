import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import '../css/Footer.css'; // Assuming your CSS is in a separate file

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    {/* Logo and Social Media */}
                    <div className="col">
                        <img src="https://th.bing.com/th/id/OIP.93fNiKYbRVZKrDTI4GQx0AHaEc?pid=ImgDet&w=139&h=139&c=7&dpr=1.5" alt="Exciting Travel" className="logo" />
                        <div className="social">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        </div>
                    </div>
                    <div className="col">
                        <h3>Contact</h3>
                        <div className="contact-details">
                            <FaEnvelope />
                            <p>excitingtravels@gmail.com</p>
                        </div>
                        <div className="contact-details">
                            <FaPhone />
                            <p>+94110042500</p>
                        </div>
                        <div className="contact-details">
                            <FaGlobe />
                            <p>www.ExcitingTravels.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr color="black" width="100%" /><br />
            <p className="copyright">Copyright © 2024 - Exciting Travels - All rights Reserved</p>
        </footer>
    );
};

export default Footer;
