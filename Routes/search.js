const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry'); // Import your Mongoose model

// GET /api/search/:name
router.get('/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const regex = new RegExp('^' + name, 'i'); // case-insensitive search
    const enquiries = await Enquiry.find({ CustomerName: { $regex: regex } });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
