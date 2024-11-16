import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';


const CustomersModal = ({ customer, onClose }) => {
    const [customMessage, setCustomMessage] = useState(`Hello ${customer.name}, Dear Valued Customer,
  Thank you for choosing Exciting Travel Holidays Lanka, the most famous travel agency in Sri Lanka. We are grateful for your trust in us to make your travel dreams a reality. As a token of our appreciation, we are excited to offer you a small discount on your next booking. We look forward to welcoming you back soon and providing you with another unforgettable experience. All the details of your discount will be attached to this above thank you card.
  Warm regards,
  The Exciting Travel Holidays Lanka Team`); // State for custom message
  
    const handleSendEmail = () => {
      const subject = encodeURIComponent('Reservation Details');
      const body = encodeURIComponent(customMessage);
      window.location.href = `mailto:${customer.email}?subject=${subject}&body=${body}`;
    };
  
    const handleSendWhatsapp = () => {
      const message = encodeURIComponent(customMessage);
      window.open(`https://wa.me/${customer.phone}?text=${message}`, '_blank');
    };
  
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="w-[600px] max-w-full h-[900px] bg-white rounded-lg p-6 flex flex-col relative shadow-lg overflow-auto transition-transform transform hover:scale-105"
        >
          {/* Close Icon */}
          <AiOutlineClose
            className="absolute right-4 top-4 text-2xl text-[#0A0526] cursor-pointer hover:text-red-500 transition-colors duration-200"
            onClick={onClose}
          />
          
          {/* Customer Name */}
          <h2 className="w-fit px-4 py-1 bg-[#0A0526] text-white rounded-md text-lg font-semibold">
            {customer.name}
          </h2>
          <h4 className="my-2 text-gray-500 text-sm">{customer._id}</h4>
  
          {/* Customer Name and Passport No Section */}
          <div className="flex justify-between items-center my-2">
            {/* Customer Name with Icon */}
            <div className="flex items-center gap-x-2">
              <PiBookOpenTextLight className="text-[#0A0526] text-xl" />
              <h2 className="text-lg font-medium text-gray-800">{customer.name}</h2>
            </div>
            
            {/* Passport Number and Action Buttons */}
            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-2">
                <BiUserCircle className="text-[#0A0526] text-xl" />
                <h2 className="text-lg font-medium text-gray-800">
                  {customer.passportNo}
                </h2>
              </div>
              
              <div className="flex gap-x-2">
                <button
                  onClick={handleSendEmail}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-sm"
                >
                  Send Email
                </button>
                <button
                  onClick={handleSendWhatsapp}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 text-sm flex items-center gap-x-2"
                >
                  <FaWhatsapp className="text-lg" />
                  Send WhatsApp
                </button>
              </div>
            </div>
          </div>
  
          {/* Customer Packages and Preferences Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800">Customer Preferences</h3>
            <p className="my-2 text-gray-600 text-sm">
              <span className="font-bold">Meal Preferences:</span> Sri Lankan / Indian / Italian
            </p>
            <p className="my-2 text-gray-600 text-sm">
              <span className="font-bold">Favourite Traveling Places:</span> Nuwara Eliya / Galle / Matara / Kandy
            </p>
          </div>
  
          {/* Accommodation and Tour Package Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Services Overview</h3>
            
            {/* Accommodations */}
            <div className="mt-4">
              <h4 className="text-md font-semibold text-gray-700">Accommodations</h4>
              <p className="text-sm text-gray-600 mb-2">Cinnamon Bay Hotel - 2024-09-18 to 2024-10-12</p>
              <button
                className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition duration-200"
                onClick={() => window.open('/accommodations', '_blank')}
              >
                View Accommodations
              </button>
            </div>
  
            {/* Tour Packages */}
            <div className="mt-4">
              <h4 className="text-md font-semibold text-gray-700">Tour Package</h4>
              <p className="text-sm text-gray-600 mb-2">PACKAGE 02</p>
              <button
                className="px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition duration-200"
                onClick={() => window.open('/tour-packages', '_blank')}
              >
                View Tour Packages
              </button>
            </div>
  
            {/* Tour Guide */}
            <div className="mt-4">
              <h4 className="text-md font-semibold text-gray-700">Tour Guide</h4>
              <p className="text-sm text-gray-600 mb-2">Mr. Nihal Thaldoowa</p>
              <button
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition duration-200"
                onClick={() => window.open('/tour-guides', '_blank')}
              >
                View Tour Guide
              </button>
            </div>
  
            {/* Vehicles */}
            <div className="mt-4">
              <h4 className="text-md font-semibold text-gray-700">Vehicles</h4>
              <p className="text-sm text-gray-600 mb-2">Vehicle Type: SUV</p>
              <button
                className="px-4 py-2 bg-orange-500 text-white text-sm rounded-md hover:bg-orange-600 transition duration-200"
                onClick={() => window.open('/vehicles', '_blank')}
              >
                View Vehicles
              </button>
            </div>
  
            {/* Enquiry */}
            <div className="mt-4">
              <h4 className="text-md font-semibold text-gray-700">Enquiry</h4>
              <p className="text-sm text-gray-600 mb-2">For any questions or clarifications.</p>
              <button
                className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition duration-200"
                onClick={() => window.open('/enquiry', '_blank')}
              >
                View Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CustomersModal;
  