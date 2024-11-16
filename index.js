import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import customersRoute from './routes/customersRoute.js';
import enquiryRoute from './routes/EnquiryR.js';
import cors from 'cors';

//import React from 'react';
//import ReactDOM from 'react-dom/client';
//import './index.css';
//import Dashboard from './App';

//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(
  //<React.StrictMode>
   // <Dashboard />
  //</React.StrictMode>
//);


const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome');
});

app.use('/customers', customersRoute);
app.use('/enquiries', enquiryRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
