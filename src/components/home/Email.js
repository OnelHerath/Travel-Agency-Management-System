import React, { useRef, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import PropTypes from 'prop-types';
import '../css/Email.css'; 


const Email = ({ email, userName, userEmail, onClose }) => {
    const form = useRef();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        form.current.user_name.value = userName;
        form.current.user_email.value = userEmail;
    }, [userName, userEmail]);

    const sendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await emailjs.sendForm('service_3l0w9s9', 'template_a8226se', form.current, 'hRBeCU0UPdwbtYVm0');
            alert('Email sent successfully!');
            onClose();
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="email-modal">
            <div className="email-modal-content">
                <h2>Send Email to {email}</h2>
                <form ref={form} onSubmit={sendEmail} className="email-form" encType="multipart/form-data">
                    <label>Name</label>
                    <input type="text" name="user_name" required />
                    <label>Email</label>
                    <input type="email" name="user_email" required />
                    <label>Message</label>
                    <textarea name="message" required />
                    
                    {/* Add file input for image/pdf attachments */}
                    <label>Attach a file (PDF/Image)</label>
                    <input type="file" name="attachment" accept=".pdf,.jpg,.png,.jpeg" />

                    <input type="submit" value={loading ? 'Sending...' : 'Send'} disabled={loading} />
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

Email.propTypes = {
    email: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Email;
