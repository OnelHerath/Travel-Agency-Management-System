import React, { useState, useEffect } from 'react';
import BackButton from '../../BackButton';
import Spinner from '../../Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditCustomers = () => {
  const [formData, setFormData] = useState({
    name: '',
    passportNo: '',
    email: '',
    phoneNo: '',
    departureDate: '',
    arrivalDate: '',
    nationality: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    bookingReference: '',
    preferredLanguages: [], // Initialize preferred languages here
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/customers/${id}`)
      .then((response) => {
        const customer = response.data;
        setFormData({
          name: customer.name,
          passportNo: customer.passportNo,
          email: customer.email,
          phoneNo: customer.phoneNo,
          departureDate: customer.departureDate,
          arrivalDate: customer.arrivalDate,
          nationality: customer.nationality,
          emergencyContactName: customer.emergencyContact.name,
          emergencyContactPhone: customer.emergencyContact.phoneNo,
          bookingReference: customer.bookingReference,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
        enqueueSnackbar('Error fetching customer data', { variant: 'error' });
        setLoading(false);
      });
  }, [id, enqueueSnackbar]);

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/; // Only uppercase and lowercase letters
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNoRegex = /^[0-9]{10}$/;

    if (!formData.name || !nameRegex.test(formData.name)) {
      newErrors.name = 'Name must contain only letters (A-Z, a-z)';
    }
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.phoneNo || !phoneNoRegex.test(formData.phoneNo)) {
      newErrors.phoneNo = 'Phone number must contain exactly 10 digits';
    }
    if (!formData.arrivalDate) newErrors.arrivalDate = 'Arrival date is required';
    if (!formData.departureDate) newErrors.departureDate = 'Departure date is required';
    if (formData.arrivalDate > formData.departureDate) {
      newErrors.dateRange = 'Arrival date cannot be after departure date';
    }
    if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    if (!formData.emergencyContactName) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!formData.emergencyContactPhone || !phoneNoRegex.test(formData.emergencyContactPhone)) {
      newErrors.emergencyContactPhone = 'Emergency contact phone must contain exactly 10 digits';
    }
    if (!formData.bookingReference) newErrors.bookingReference = 'Booking reference is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateCustomer = () => {
    if (!validate()) return;

    setLoading(true);
    axios
      .put(`http://localhost:5555/customers/${id}`, formData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Customer updated successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating customer', { variant: 'error' });
        console.error('Error updating customer:', error);
      });
  };

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      preferredLanguages: prev.preferredLanguages.includes(value)
        ? prev.preferredLanguages.filter((lang) => lang !== value)
        : [...prev.preferredLanguages, value],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='min-h-screen p-6 bg-gray-100 flex flex-col items-center'>
      <div className='absolute top-4 left-4'>
        <BackButton />
      </div>

      <div className='flex flex-col items-center justify-center flex-grow w-full max-w-lg'>
        <h1 className='text-4xl font-semibold my-6 text-center text-gray-700'>
          Edit Customer
        </h1>

        {loading && <Spinner />}

        <div className='bg-white shadow-lg rounded-lg border border-gray-300 p-8 w-full'>
          {[
            { label: 'Name', name: 'name', type: 'text', value: formData.name },
            { label: 'Passport No', name: 'passportNo', type: 'text', value: formData.passportNo },
            { label: 'Email Address', name: 'email', type: 'email', value: formData.email },
            { label: 'Phone Number', name: 'phoneNo', type: 'text', value: formData.phoneNo },
            { label: 'Arrival Date', name: 'arrivalDate', type: 'date', value: formData.arrivalDate },
            { label: 'Departure Date', name: 'departureDate', type: 'date', value: formData.departureDate },
            { label: 'Nationality', name: 'nationality', type: 'text', value: formData.nationality },
            { label: 'Emergency Contact Name', name: 'emergencyContactName', type: 'text', value: formData.emergencyContactName },
            { label: 'Emergency Contact Phone', name: 'emergencyContactPhone', type: 'text', value: formData.emergencyContactPhone },
          ].map((field) => (
            <div key={field.name} className='my-4'>
              <label className='text-lg text-gray-700 font-medium'>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={handleInputChange}
                className='w-full mt-2 p-3 border rounded-md focus:outline-none focus:border-blue-500 transition-all'
              />
              {errors[field.name] && <p className='text-red-500 text-sm'>{errors[field.name]}</p>}
            </div>
          ))}

          <div className='my-4'>
            <label className='text-lg text-gray-700 font-medium'>Booking Reference</label>
            <select
              name='bookingReference'
              value={formData.bookingReference}
              onChange={handleInputChange}
              className='w-full mt-2 p-3 border rounded-md focus:outline-none focus:border-blue-500 transition-all'
            >
              <option value='Accommodations'>Accommodations</option>
              <option value='TourGuides'>Tour Guides</option>
              <option value='TourPackages'>Tour Packages</option>
              <option value='Vehicles'>Vehicles</option>
            </select>
            {errors.bookingReference && <p className='text-red-500 text-sm'>{errors.bookingReference}</p>}
          </div>

          <button
            onClick={handleUpdateCustomer}
            className='w-full bg-blue-500 text-white py-3 mt-6 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out'
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Customer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCustomers;
