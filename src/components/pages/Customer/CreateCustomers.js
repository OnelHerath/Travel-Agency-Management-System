import React, { useState } from 'react';
import BackButton from '../../BackButton';
import Spinner from '../../Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateCustomers = () => {
  const [name, setName] = useState('');
  const [passportNo, setPassportNo] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [nationality, setNationality] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [bookingReference, setBookingReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNoRegex = /^[0-9]{10}$/; // 10 digits only
    const nameRegex = /^[A-Za-z\s]+$/; // Regex for name validation (only uppercase or lowercase letters)

    if (!name || !nameRegex.test(name)) {
      newErrors.name = 'Name must contain only letters (A-Z, a-z)';
    }
    if (!email || !emailRegex.test(email)) newErrors.email = 'Invalid email address';
    if (!phoneNo || !phoneNoRegex.test(phoneNo)) {
      newErrors.phoneNo = 'Phone number must contain exactly 10 digits';
    }
    if (!arrivalDate) newErrors.arrivalDate = 'Arrival date is required';
    if (!departureDate) newErrors.departureDate = 'Departure date is required';
    if (arrivalDate > departureDate) newErrors.dateRange = 'Arrival date cannot be after departure date';
    if (!nationality) newErrors.nationality = 'Nationality is required';
    if (!emergencyContactName) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!emergencyContactPhone || !phoneNoRegex.test(emergencyContactPhone)) {
      newErrors.emergencyContactPhone = 'Emergency contact phone must contain exactly 10 digits';
    }
    if (!bookingReference) newErrors.bookingReference = 'Booking reference is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveCustomer = () => {
    if (!validate()) return;

    const customerData = {
      name,
      passportNo,
      email,
      phoneNo,
      arrivalDate,
      departureDate,
      nationality,
      emergencyContact: {
        name: emergencyContactName,
        phoneNo: emergencyContactPhone,
      },
      bookingReference,
    };

    setLoading(true);
    axios
      .post('http://localhost:5555/customers', customerData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Customer created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error creating customer', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4 bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen'>
      <BackButton />
      <h1 className='text-4xl my-4 text-center text-white font-bold'>CREATE CUSTOMER</h1>
      {loading && <Spinner />}

      <div className='flex flex-col gap-8 mx-auto' style={{ maxWidth: '600px' }}>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl bg-white shadow-lg p-6'>
          {[ 
            { label: 'Name', value: name, setter: setName, type: 'text', required: true, errorKey: 'name' },
            { label: 'Passport No', value: passportNo, setter: setPassportNo, type: 'text', required: true, errorKey: 'passportNo' },
            { label: 'Email Address', value: email, setter: setEmail, type: 'email', required: true, errorKey: 'email' },
            { label: 'Phone Number', value: phoneNo, setter: setPhoneNo, type: 'text', required: true, errorKey: 'phoneNo' },
            { label: 'Arrival Date', value: arrivalDate, setter: setArrivalDate, type: 'date', required: true, errorKey: 'arrivalDate' },
            { label: 'Departure Date', value: departureDate, setter: setDepartureDate, type: 'date', required: true, errorKey: 'departureDate' },
            { label: 'Nationality', value: nationality, setter: setNationality, type: 'text', required: true, errorKey: 'nationality' },
            { label: 'Emergency Contact Name', value: emergencyContactName, setter: setEmergencyContactName, type: 'text', required: true, errorKey: 'emergencyContactName' },
            { label: 'Emergency Contact Phone', value: emergencyContactPhone, setter: setEmergencyContactPhone, type: 'text', required: true, errorKey: 'emergencyContactPhone' },
            { label: 'Booking Reference', value: bookingReference, setter: setBookingReference, type: 'select', options: ['Select...', 'Accommodations', 'Tour Guides', 'Tour Packages', 'Vehicles'], required: true, errorKey: 'bookingReference' }
          ].map(({ label, value, setter, type, required, errorKey, options }) => (
            <div className='my-4' key={label}>
              <label className='text-lg text-gray-800 font-semibold'>{label}{required && <span className='text-red-500'>*</span>}</label>
              {type === 'select' ? (
                <select
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className='border-2 border-gray-300 px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
                >
                  {options.map(option => (
                    <option value={option} key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className='border-2 border-gray-300 px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
                />
              )}
              {errors[errorKey] && <p className='text-red-500 text-sm'>{errors[errorKey]}</p>}
            </div>
          ))}
        </div>
        <button
          onClick={handleSaveCustomer}
          className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold shadow-md'
        >
          Save Customer
        </button>
      </div>
    </div>
  );
};

export default CreateCustomers;
