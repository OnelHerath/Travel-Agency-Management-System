import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import CreateEnquiry from './components/pages/Enquiry/CreateEnquiry.js';
import DeleteEnquiry from './components/pages/Enquiry/DeleteEnquiry.js';
import EditEnquiry from './components/pages/Enquiry/EditEnquiry.js';
import ShowEnquiry from './components/pages/Enquiry/ShowEnquiry.js';
import Dashboards from './components/home/Dashboards.js';
import EnquiryTable from './components/home/EnquiryTable.js';
import AllReports from './components/Reports/AllReports.js';
import EnquiryCard from './components/home/EnquiryCard.js';

import Home from './components/pages/Customer/Home';
import EnquiryHome from './components/pages/Enquiry/Home.js';
import CreateCustomers from './components/pages/Customer/CreateCustomers';
import Showcustomers from './components/pages/Customer/ShowCustomer';
import Editcustomers from './components/pages/Customer/EditCustomer';
import Deletecustomers from './components/pages/Customer/DeleteCustomer';
import Dashboard from './components/pages/Customer/Dashboard';
import NationllityReport from './components/Reports/NationallityReport';

function App() {
  return (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/customers/create' element={<CreateCustomers />} />
          <Route path='/customers/details/:id' element={<Showcustomers />} />
          <Route path='/customers/edit/:id' element={<Editcustomers />} />
          <Route path='/customers/delete/:id' element={<Deletecustomers />} />
          <Route path='/customers/dashboard' element={<Dashboard />} />
          <Route path='/customers/nationallityReport' element={<NationllityReport />} />
          <Route path="/home" element={<EnquiryHome />} />
          <Route path="/enquiries/create" element={<CreateEnquiry />} />
          <Route path="/enquiries/details/:id" element={<ShowEnquiry />} />
          <Route path="/enquiries/edit/:id" element={<EditEnquiry />} />
          <Route path="/enquiries/delete/:id" element={<DeleteEnquiry />} />
          <Route path="/enquiries/dashboard" element={<Dashboards />} />
          <Route path="/enquiries/EnquiryTable" element={<EnquiryTable />} />
          <Route path="/reports/AllReports" element={<AllReports />} />
          <Route path="/download/:id" element={<EnquiryTable />} />
          <Route path="/download/all" element={<EnquiryTable />} />
          <Route path="/download/type/:type" element={<EnquiryTable />} />
          <Route path="/enquiries/send-email" element={<email />} />
          <Route path="/" element={<EnquiryTable />} />
          <Route path="/enquiries/EnquiryCard" element={<EnquiryCard />} />
        </Routes>
  );
}

export default App;
