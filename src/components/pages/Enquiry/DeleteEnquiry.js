import React, { useState } from 'react';
import BackButton from '../../BackButton';
import Spinner from '../../Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import '../../css/DeleteEnquiry.css';

const DeleteEnquiry = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteEnquiry = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5557/enquiries/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Enquiry Deleted Successfully!', { variant: 'success' });
        navigate('/home');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An Error Occurred. Please Check Console.', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="container">
      <BackButton/>
      <h1 className="title">Delete Enquiry</h1>
      {loading && <Spinner />}
      <div className="form-container">
        <h3 className="form-title">Are you sure you want to delete this enquiry?</h3>
        <button 
          className="delete-button"
          onClick={handleDeleteEnquiry}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
}

export default DeleteEnquiry;
