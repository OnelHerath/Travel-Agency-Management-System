import React, { useState, useEffect } from "react";
import moment from 'moment'; // Import moment.js
import BackButton from '../../BackButton';

const Dashboard = () => {
  const [dateTime, setDateTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
  const [customers, setCustomers] = useState([
    { id: 125, name: "John Doe", nationality: "Indian", status: "Pending" },
    { id: 230, name: "Jane Smith", nationality: "American", status: "Completed" },
    { id: 310, name: "Michael Johnson", nationality: "Canadian", status: "Out" },
    { id: 400, name: "Emily Davis", nationality: "British", status: "Pending" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(moment().format('YYYY-MM-DD HH:mm:ss'));
    }, 1000);

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, []);

  const pendingCustomers = customers.filter(customer => customer.status === "Pending");
  const outCustomers = customers.filter(customer => customer.status === "Out");

  return (
    
    <div className="p-6 min-h-screen bg-gray-100">
      <BackButton />
      {/* Centered Customer Dashboard heading */}
      <div className="mb-8 text-center">
        <h1 className="text-6xl font-extrabold mb-2 text-gray-800">Customer Dashboard</h1>
        {/* Centered Current Date & Time */}
        <p className="text-lg text-gray-600">Current Date & Time: {dateTime}</p>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Total Number of Customers */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-center py-6 rounded-lg shadow-lg transition transform hover:scale-105">
          <h3 className="text-xl font-semibold">Total Number of Customers</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        {/* Total Number of In Customers */}
        <div className="bg-gradient-to-r from-blue-500 to-orange-400 text-white text-center py-6 rounded-lg shadow-lg transition transform hover:scale-105">
          <h3 className="text-xl font-semibold">Total Number of In Customers</h3>
          <p className="text-3xl font-bold">05</p>
        </div>
        {/* Total Number of Out Customers */}
        <div className="bg-gradient-to-r from-blue-500 to-red-500 text-white text-center py-6 rounded-lg shadow-lg transition transform hover:scale-105">
          <h3 className="text-xl font-semibold">Total Number of Out Customers</h3>
          <p className="text-3xl font-bold">07</p>
        </div>
      </div>

      {/* Centered All Customers heading */}
      <div className="mb-8">
        <h2 className="text-4xl font-semibold mb-4 text-center text-gray-800">All Customers</h2>
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-4 px-8 text-left">ID</th>
              <th className="py-4 px-8 text-left">Name</th>
              <th className="py-4 px-8 text-left">Nationality</th>
              <th className="py-4 px-8 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id} className="border-b hover:bg-gray-100">
                <td className="py-4 px-8">{customer.id}</td>
                <td className="py-4 px-8">{customer.name}</td>
                <td className="py-4 px-8">{customer.nationality}</td>
                <td className="py-4 px-8">{customer.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Centered In Customers heading */}
      <div className="mb-8">
        <h2 className="text-4xl font-semibold mb-4 text-center text-gray-800">In Customers</h2>
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="py-4 px-8 text-left">ID</th>
              <th className="py-4 px-8 text-left">Name</th>
              <th className="py-4 px-8 text-left">Nationality</th>
              <th className="py-4 px-8 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingCustomers.map(customer => (
              <tr key={customer.id} className="border-b hover:bg-gray-100">
                <td className="py-4 px-8">{customer.id}</td>
                <td className="py-4 px-8">{customer.name}</td>
                <td className="py-4 px-8">{customer.nationality}</td>
                <td className="py-4 px-8">{customer.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Centered Out Customers heading */}
      <div>
        <h2 className="text-4xl font-semibold mb-4 text-center text-gray-800">Out Customers</h2>
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="py-4 px-8 text-left">ID</th>
              <th className="py-4 px-8 text-left">Name</th>
              <th className="py-4 px-8 text-left">Nationality</th>
              <th className="py-4 px-8 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {outCustomers.map(customer => (
              <tr key={customer.id} className="border-b hover:bg-gray-100">
                <td className="py-4 px-8">{customer.id}</td>
                <td className="py-4 px-8">{customer.name}</td>
                <td className="py-4 px-8">{customer.nationality}</td>
                <td className="py-4 px-8">{customer.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
