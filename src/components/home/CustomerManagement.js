import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Deletecustomers from './Deletecustomers';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch initial customer data from API
    axios.get('http://localhost:5555/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.log('Error fetching customers', error));
  }, []);

  const deleteCustomer = (id) => {
    // Remove the customer from the state after deletion
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard customers={customers} />} />
        <Route path="/delete/:id" element={<Deletecustomers customers={customers} onDeleteCustomer={deleteCustomer} />} />
      </Routes>
    </Router>
  );
};

export default CustomerManagement;
