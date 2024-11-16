import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineSearch } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import autoTable if you're using it for PDF

const CustomersTable = ({ customers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [arrivalDateFilter, setArrivalDateFilter] = useState('');
  const [departureDateFilter, setDepartureDateFilter] = useState('');
  const [nationalityFilter, setNationalityFilter] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleArrivalDateChange = (e) => {
    setArrivalDateFilter(e.target.value);
  };

  const handleDepartureDateChange = (e) => {
    setDepartureDateFilter(e.target.value);
  };

  const handleNationalityChange = (e) => {
    setNationalityFilter(e.target.value.toLowerCase());
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearchTerm =
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.passportNo.toLowerCase().includes(searchTerm);

    const matchesArrivalDate =
      !arrivalDateFilter || customer.arrivalDate === arrivalDateFilter;

    const matchesDepartureDate =
      !departureDateFilter || customer.departureDate === departureDateFilter;

    const matchesNationality =
      !nationalityFilter || customer.nationality.toLowerCase().includes(nationalityFilter);

    return (
      matchesSearchTerm &&
      matchesArrivalDate &&
      matchesDepartureDate &&
      matchesNationality
    );
  });

  const getBookingReferenceLink = (reference) => {
    switch (reference.toLowerCase()) {
      case 'accommodations':
        return '/accommodations';
      case 'tour guide':
        return '/tour-guides';
      case 'tour packages':
        return '/tour-packages';
      case 'vehicles':
        return '/vehicles';
      default:
        return '#'; // Fallback in case of unexpected values
    }
  };

  // Function to generate PDF
  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.text('Customer Report - Filtered', 10, 10);

    const tableColumn = [
      'No',
      'Name',
      'Passport No',
      'Email Address',
      'Phone No',
      'Arrival Date',
      'Departure Date',
      'Nationality',
      'Emergency Contact Name',
      'Emergency Contact Phone',
      'Booking Reference'
    ];

    const tableRows = filteredCustomers.map((customer, index) => [
      index + 1,
      customer.name,
      customer.passportNo,
      customer.email,
      customer.phoneNo,
      customer.arrivalDate,
      customer.departureDate,
      customer.nationality,
      customer.emergencyContact.name,
      customer.emergencyContact.phoneNo,
      customer.bookingReference
    ]);

    // Create the table in the PDF
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    
    // Save the PDF
    doc.save('customer-report.pdf');
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Search bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Search by name or passport no..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 transition-all duration-200 ease-in-out hover:shadow-lg"
          />
        </div>
      </div>

      {/* Date and Nationality Filters */}
      <div className="flex justify-center mb-6 space-x-4">
        <div className="flex flex-col">
          <input
            type="date"
            value={arrivalDateFilter}
            onChange={handleArrivalDateChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 transition-all duration-200 ease-in-out hover:shadow-lg"
            placeholder="Filter by arrival date"
          />
        </div>
        <div className="flex flex-col">
          <input
            type="date"
            value={departureDateFilter}
            onChange={handleDepartureDateChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 transition-all duration-200 ease-in-out hover:shadow-lg"
            placeholder="Filter by departure date"
          />
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Filter by Nationality..."
            value={nationalityFilter}
            onChange={handleNationalityChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 transition-all duration-200 ease-in-out hover:shadow-lg"
          />
        </div>

        {/* Download Report Button */}
        <div className="flex flex-col">
          <button
            onClick={handleDownloadReport}
            className="p-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-200 ease-in-out"
          >
            Download Report
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full border-separate border-spacing-0 border border-gray-300">
        <thead>
          <tr className="bg-[#0A0526] text-white">
            <th className="border border-[#0A0526] p-3 rounded-md">No</th>
            <th className="border border-[#0A0526] p-3 rounded-md">Name</th>
            <th className="border border-[#0A0526] p-3 rounded-md hidden md:table-cell">Passport No</th>
            <th className="border border-[#0A0526] p-3 rounded-md hidden md:table-cell">Email Address</th>
            <th className="border border-[#0A0526] p-3 rounded-md hidden md:table-cell">Phone No</th>
            <th className="border border-[#0A0526] p-3 rounded-md hidden md:table-cell">Arrival Date</th>
            <th className="border border-[#0A0526] p-3 rounded-md hidden md:table-cell">Departure Date</th>
            <th className="border border-[#0A0526] p-3 rounded-md hidden md:table-cell">Nationality</th>
            <th className="border border-[#0A0526] p-3 rounded-md hidden md:table-cell">Emergency Contact Name</th>
            <th className="border border-[#0A0526] p-3 rounded-md hidden md:table-cell">Emergency Contact Phone</th>
            <th className="border border-[#0A0526] p-3 rounded-md hidden md:table-cell">Booking Reference</th>
            <th className="border border-[#0A0526] p-3 rounded-md">Operations</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <tr key={customer._id} className={`h-12 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'} hover:bg-gray-200`}>
              <td className="border border-[#0A0526] p-3 text-center">{index + 1}</td>
              <td className="border border-[#0A0526] p-3 text-center">{customer.name}</td>
              <td className="border border-[#0A0526] p-3 text-center hidden md:table-cell">{customer.passportNo}</td>
              <td className="border border-[#0A0526] p-3 text-center hidden md:table-cell">{customer.email}</td>
              <td className="border border-[#0A0526] p-3 text-center hidden md:table-cell">{customer.phoneNo}</td>
              <td className="border border-[#0A0526] p-3 text-center hidden md:table-cell">{customer.arrivalDate}</td>
              <td className="border border-[#0A0526] p-3 text-center hidden md:table-cell">{customer.departureDate}</td>
              <td className="border border-[#0A0526] p-3 text-center hidden md:table-cell">{customer.nationality}</td>
              <td className="border border-[#0A0526] p-3 text-center hidden md:table-cell">{customer.emergencyContact.name}</td>
              <td className="border border-[#0A0526] p-3 text-center hidden md:table-cell">{customer.emergencyContact.phoneNo}</td>
              <td className="border border-[#0A0526] p-3 text-center hidden md:table-cell">
                <Link to={getBookingReferenceLink(customer.bookingReference)}>{customer.bookingReference}</Link>
              </td>
              <td className="border border-[#0A0526] p-3 text-center">
                <Link to={`/edit/${customer._id}`}><AiOutlineEdit className="text-green-500" /></Link>
                <Link to={`/delete/${customer._id}`}><MdOutlineDelete className="text-red-500 ml-3" /></Link>
                <Link to={`/show/${customer._id}`}><BsInfoCircle className="text-blue-500 ml-3" /></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;
