import express from 'express';
import { Customer } from '../models/customerModel.js';

const router = express.Router();

// Route for saving a new customer
router.post('/', async (req, res) => {
  try {
    const { 
      name, 
      passportNo, 
      email, 
      phoneNo, 
      arrivalDate, 
      departureDate, 
      nationality,  
      emergencyContact,
      bookingReference,
    } = req.body;

    // Ensure all required fields are provided
    if (!name || !passportNo || !email || !phoneNo || !arrivalDate || !departureDate || !nationality || !emergencyContact || !bookingReference) {
      return res.status(400).send({ message: 'Send all required fields' });
    }

    const newCustomer = {
      name,
      passportNo,
      email,
      phoneNo,
      arrivalDate,
      departureDate,
      nationality,
      emergencyContact,
      bookingReference,
    };

    const customer = await Customer.create(newCustomer);

    return res.status(201).send(customer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for getting all customers from the database
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find({});
    return res.status(200).json({ count: customers.length, data: customers });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for getting one customer by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    return res.status(200).json(customer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for updating a customer
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const result = await Customer.findByIdAndUpdate(id, updateData, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    return res.status(200).send({ message: 'Customer updated successfully', customer: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for deleting a customer
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Customer.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    return res.status(200).send({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
