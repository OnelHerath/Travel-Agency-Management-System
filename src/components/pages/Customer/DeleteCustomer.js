import React, { useState } from 'react';
import BackButton from '../../BackButton';
import Spinner from '../../Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Deletecustomers = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeletecustomers = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/customers/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Customer deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error occurred while deleting the customer', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='relative min-h-screen bg-gray-100 p-6 flex flex-col items-center'>
      <div className='absolute top-4 left-4'>
        <BackButton />
      </div>
      
      <div className='flex flex-col items-center justify-center flex-grow w-full max-w-md'>
        <h1 className='text-4xl font-semibold my-6 text-center text-gray-800'>
          Delete Customer
        </h1>

        {loading ? <Spinner /> : null}

        <div className='bg-white shadow-lg rounded-lg border border-gray-300 p-8 text-center transition-transform transform hover:scale-105'>
          <h3 className='text-2xl font-medium text-gray-800 mb-6'>
            Are you sure you want to delete this customer?
          </h3>

          <button
            className='w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 ease-in-out shadow-md transform hover:scale-105'
            onClick={handleDeletecustomers}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deletecustomers;
