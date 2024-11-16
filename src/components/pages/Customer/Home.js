import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../Spinner';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import { AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai'; // Settings and Logout icons
import { FaUserAlt, FaFileAlt } from 'react-icons/fa'; // Customer Dashboard and Reports icons
import { HiOutlineViewList, HiOutlineClipboardList } from 'react-icons/hi'; // List icons
import CustomersTable from '../../home/CustomerTable';
import CustomersCard from '../../home/CustomerCard';
import Footer from '../../home/Footer';

const Home = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [currentTime, setCurrentTime] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5555/customers');
        setCustomers(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const customerNavItems = [
    { name: 'Dashboard', path: '/customers/dashboard', icon: <FaUserAlt /> },
    { name: 'Customer List', path: '/', icon: <HiOutlineViewList /> },
    { name: 'Create Customers', path: '/customers/create', icon: <MdOutlineAddBox /> },
    { name: 'User Reports', path: '/customers/nationallityReport', icon: <FaFileAlt /> },
  ];

  const enquiryNavItems = [
    { name: 'Inquiry Dashboard', path: '/enquiries/dashboard', icon: <FaUserAlt /> },
    { name: 'Inquiry List', path: '/home', icon: <HiOutlineClipboardList /> },
    { name: 'Create Inquiry', path: '/enquiries/create', icon: <MdOutlineAddBox /> },
    { name: 'Inquiry Reports', path: '/reports/AllReports', icon: <FaFileAlt /> },
  ];

  return (
    <div>
      <div className='flex h-screen' style={{ height: '180vh' }}>
        {/* Navigation Bar */}
        <aside className='w-72 h-full bg-gradient-to-b from-sky-800 to-sky-600 text-white flex flex-col p-6 shadow-lg border-r-2 border-gray-200'>
          <h2 className='text-3xl mb-8 text-center font-bold text-white shadow-md'>Exciting Travels</h2>

          {/* Customer Section */}
          <div>
            <h3 className='text-lg font-semibold text-white mb-2'>Customer</h3>
            <nav className='flex flex-col space-y-4 mb-6'>
              {customerNavItems.map(({ name, path, icon }) => (
                <Link
                  key={name}
                  to={path}
                  className={`flex items-center py-2 px-3 rounded-md transition duration-200 ${
                    location.pathname === '/' && path === '/' ? 'bg-sky-500 text-white' : location.pathname === path ? 'bg-sky-500 text-white' : 'hover:bg-sky-700 hover:text-white'
                  }`}
                >
                  {icon}
                  <span className='ml-2'>{name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Inquiry Section */}
          <div>
            <h3 className='text-lg font-semibold text-white mb-2'>Inquiry</h3>
            <nav className='flex flex-col space-y-4 mb-6'>
              {enquiryNavItems.map(({ name, path, icon }) => (
                <Link
                  key={name}
                  to={path}
                  className={`flex items-center py-2 px-3 rounded-md transition duration-200 ${
                    location.pathname === path ? 'bg-sky-500 text-white' : 'hover:bg-sky-700 hover:text-white'
                  }`}
                >
                  {icon}
                  <span className='ml-2'>{name}</span>
                </Link>
              ))}
            </nav>
          </div>

          <nav className='flex flex-col space-y-4 mt-auto'>
            <Link
              to='/settings'
              className={`flex items-center py-2 px-3 rounded-md transition duration-200 ${
                location.pathname === '/settings' ? 'bg-sky-500 text-white' : 'hover:bg-sky-700 hover:text-white'
              }`}
            >
              <AiOutlineSetting className='mr-2' />
              Settings
            </Link>
            <Link
              to='/logout'
              className='flex items-center py-2 px-3 rounded-md bg-red-500 hover:bg-red-600 text-white transition duration-200'
            >
              <AiOutlineLogout className='mr-2' />
              Logout
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className='flex-1 p-0 overflow-auto'>
          <header className='flex justify-between items-center bg-indigo-900 h-16 px-4'>
            <h1 className='text-3xl text-white flex-grow text-center'>EXCITING TRAVELS</h1>
            <div className='text-lg font-semibold text-white'>{currentTime}</div>
          </header>

          {/* Button to toggle between table and card view */}
          <div className='flex justify-center items-center gap-x-4 mb-4 pt-10'>
            {['Table', 'Card'].map((type) => (
              <button
                key={type}
                className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg transition duration-200'
                onClick={() => setShowType(type.toLowerCase())}
              >
                {type}
              </button>
            ))}
          </div>

          <div className='flex justify-between items-center'>
            <Link to='/customers/create'>
              <MdOutlineAddBox className='text-sky-800 text-4xl cursor-pointer hover:text-sky-600 transition duration-200' />
            </Link>
          </div>

          {loading ? (
            <Spinner />
          ) : showType === 'table' ? (
            <CustomersTable customers={customers} />
          ) : (
            <CustomersCard customers={customers} />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
