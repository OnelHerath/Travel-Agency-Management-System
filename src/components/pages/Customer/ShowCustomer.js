import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../BackButton';
import Spinner from '../../Spinner';

const Showcustomers = () => {
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/customers/${id}`)
      .then((response) => {
        setCustomer(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='relative min-h-screen bg-gray-100 p-6 flex flex-col items-center'>
      {/* Back Button positioned to the left */}
      <div className='absolute top-4 left-4'>
        <BackButton />
      </div>

      {/* Main content centered */}
      <div className='flex flex-col items-center justify-center flex-grow w-full max-w-3xl'>
        <h1 className='text-4xl font-semibold my-6 text-center text-gray-700'>
          SHOW CUSTOMER
        </h1>

        {loading ? (
          <Spinner />
        ) : (
          <div className='w-full bg-white shadow-lg rounded-lg border border-gray-300 p-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div className='flex flex-col'>
                <span className='text-gray-500 font-medium'>Customer ID</span>
                <span className='text-lg text-gray-800 font-semibold'>{customer._id}</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-500 font-medium'>Name</span>
                <span className='text-lg text-gray-800 font-semibold'>{customer.name}</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-500 font-medium'>Passport No</span>
                <span className='text-lg text-gray-800 font-semibold'>{customer.passportNo}</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-500 font-medium'>Email Address</span>
                <span className='text-lg text-gray-800 font-semibold'>{customer.email}</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-500 font-medium'>Phone No</span>
                <span className='text-lg text-gray-800 font-semibold'>{customer.phoneNo}</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-500 font-medium'>Arrival Date</span>
                <span className='text-lg text-gray-800 font-semibold'>{customer.arrivalDate}</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-500 font-medium'>Departure Date</span>
                <span className='text-lg text-gray-800 font-semibold'>{customer.departureDate}</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-500 font-medium'>Nationality</span>
                <span className='text-lg text-gray-800 font-semibold'>{customer.nationality}</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-500 font-medium'>Emergency Contact Name</span>
                <span className='text-lg text-gray-800 font-semibold'>{customer.emergencyContactName}</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-500 font-medium'>Emergency Contact Phone</span>
                <span className='text-lg text-gray-800 font-semibold'>{customer.emergencyContactPhone}</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-500 font-medium'>Booking Reference</span>
                <span className='text-lg text-gray-800 font-semibold'>{customer.bookingReference}</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-500 font-medium'>Created At</span>
                <span className='text-lg text-gray-800 font-semibold'>
                  {new Date(customer.createdAt).toLocaleString()}
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-500 font-medium'>Last Updated</span>
                <span className='text-lg text-gray-800 font-semibold'>
                  {new Date(customer.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Showcustomers;
