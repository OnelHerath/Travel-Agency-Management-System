import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle }  from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import CustomersModal from './CustomerModal';
import { PDFDownloadLink } from "@react-pdf/renderer";
import Cusreport from './CustomerReport';


const CustomersSingleCard = ({ customer }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-4 m-4 relative hover:shadow-lg transition-shadow duration-300">
      <h2 className="absolute top-2 right-2 px-4 py-1 bg-[#0A0526] text-white rounded-md text-sm font-semibold">
        {customer.name}
      </h2>
      <h4 className="my-2 text-gray-400 text-sm">{customer._id}</h4>
      <div className="flex items-center gap-x-2 mb-2">
        <PiBookOpenTextLight className="text-[#0A0526] text-xl" />
        <h2 className="text-lg font-medium text-gray-800">{customer.name}</h2>
      </div>
      <div className="flex items-center gap-x-2">
        <BiUserCircle className="text-[#0A0526] text-xl" />
        <h2 className="text-lg font-medium text-gray-800">{customer.email}</h2>
      </div>
      <div className="flex justify-between items-center gap-x-4 mt-4 pt-4 border-t border-gray-200">
        <BiShow
          className="text-3xl text-[#0A0526] hover:text-gray-700 cursor-pointer transition-colors duration-200"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/customers/details/${customer._id}`}>
          <BsInfoCircle className="text-2xl text-green-600 hover:text-green-400 transition-colors duration-200" />
        </Link>
        <Link to={`/customers/edit/${customer._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-yellow-400 transition-colors duration-200" />
        </Link>
        <div>
          <PDFDownloadLink
            document={<Cusreport customer={customer} />}
            fileName="customer_report.pdf"
          >
            {({ loading }) =>
              loading ? (
                <button className="text-sm text-gray-500">Loading...</button>
              ) : (
                <button className="items-center align-center justify-center  font-bold ">
                  Download Report
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
        <Link to={`/customers/delete/${customer._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-red-400 transition-colors duration-200" />
        </Link>
      </div>
      {showModal && (
        <CustomersModal customer={customer} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default CustomersSingleCard;
