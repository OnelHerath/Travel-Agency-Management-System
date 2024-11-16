import { useState } from "react";
import { FiSearch } from 'react-icons/fi';
import CustomersSingleCard from './CustomerSingleCard';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const CustomersCard = ({ customers }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [nationality, setNationality] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleArrivalDateChange = (e) => {
        setArrivalDate(e.target.value);
    };

    const handleDepartureDateChange = (e) => {
        setDepartureDate(e.target.value);
    };

    const handleNationalityChange = (e) => {
        setNationality(e.target.value);
    };

    const filteredCustomers = customers.filter((customer) => {
        const searchMatch =
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.passportNo.toLowerCase().includes(searchTerm.toLowerCase());

        const arrivalMatch = arrivalDate
            ? new Date(customer.arrivalDate).toISOString().split('T')[0] === arrivalDate
            : true;

        const departureMatch = departureDate
            ? new Date(customer.departureDate).toISOString().split('T')[0] === departureDate
            : true;

        const nationalityMatch =
            nationality ? customer.nationality.toLowerCase().includes(nationality.toLowerCase()) : true;

        return searchMatch && arrivalMatch && departureMatch && nationalityMatch;
    });

    const handleDownloadReport = () => {
        const doc = new jsPDF();

        // Add report title
        doc.setFontSize(18);
        doc.text('Customers Report - Filter by Nationality', 14, 20);

        // Add generation date
        const currentDate = new Date().toLocaleDateString();
        doc.setFontSize(12);
        doc.text(`Report generated on: ${currentDate}`, 14, 30);

        // Define table columns
        const tableColumn = [
            'No.',
            'Name',
            'Passport No.',
            'Nationality',
            'Arrival Date',
            'Departure Date',
        ];

        // Map filtered customers to table rows
        const tableRows = filteredCustomers.map((customer, index) => [
            index + 1,
            customer.name,
            customer.passportNo,
            customer.nationality,
            customer.arrivalDate,
            customer.departureDate,
        ]);

        // Add table to the PDF using autoTable
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 40, // Starting Y position after the title
            theme: 'grid', // Use grid theme for a cleaner look
            styles: {
                fontSize: 10,
                cellPadding: 4,
            },
            headStyles: {
                fillColor: [22, 160, 133], // Tailwind's teal-500 equivalent
                textColor: 255, // White text for headers
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240], // Light gray for alternate row backgrounds
            },
            margin: { top: 10 },
            didDrawPage: (data) => {
                // Add page number at the bottom of each page
                let pageSize = doc.internal.pageSize;
                let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                doc.text(
                    `Page ${doc.internal.getNumberOfPages()}`,
                    data.settings.margin.left,
                    pageHeight - 10
                );
            },
        });

        // Save the PDF
        doc.save('Personal customer-report.pdf');
    };


    return (
        <div className="p-4">
            {/* Search bar container */}
            <div className="flex justify-center mb-4">
                <div className="relative">
                    {/* Search Icon */}
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <FiSearch />
                    </span>
                    {/* Search input */}
                    <input
                        type="text"
                        placeholder="Search by Name or Passport No"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-72 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                    />
                </div>
            </div>

            {/* Filters container */}
            <div className="flex justify-center mb-4 space-x-4">
                {/* Arrival Date Filter */}
                <div>
                    <input
                        type="date"
                        value={arrivalDate}
                        onChange={handleArrivalDateChange}
                        className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                        placeholder="Arrival Date"
                    />
                </div>

                {/* Departure Date Filter */}
                <div>
                    <input
                        type="date"
                        value={departureDate}
                        onChange={handleDepartureDateChange}
                        className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                        placeholder="Departure Date"
                    />
                </div>

                {/* Nationality Filter */}
                <div>
                    <input
                        type="text"
                        value={nationality}
                        onChange={handleNationalityChange}
                        placeholder="Filter by Nationality..."
                        className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                    />
                </div>

                {/* Download Report Button */}
                <div>
                    <button
                        onClick={handleDownloadReport}
                        className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 ease-in-out"
                    >
                        Download Report
                    </button>
                </div>
            </div>

            {/* Customer Cards */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((item) => (
                        <CustomersSingleCard key={item._id} customer={item} />
                    ))
                ) : (
                    <p>No customers match the selected filters.</p>
                )}
            </div>
        </div>
    );
};

export default CustomersCard;
