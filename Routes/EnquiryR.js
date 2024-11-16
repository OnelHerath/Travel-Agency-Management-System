import express from 'express';
import { Enquiry } from '../models/Enquiry.js';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';



const router = express.Router();

// Route to send email
router.post('/send-email', async (req, res) => {
    const { to, user_name, user_email, message } = req.body;

    // Validate input
    if (!to || !user_name || !user_email || !message) {
        return res.status(400).json({ message: 'To, user_name, user_email, and message are required' });
    }

    const mailOptions = {
        from: 'your-email@gmail.com', // Sender address
        to, // Receiver address
        subject: `Message from ${user_name}`, // Dynamic subject
        text: message, // Email body
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
    }

});

router.get('/search', async (request, response) => {
    try {
        const { query } = request.query;

        if (!query) {
            return response.status(400).send({
                message: 'Query parameter is required'
            });
        }

        // Search across CustomerName, ContactInfo, and EnquiryType fields
        const enquiries = await Enquiry.find({
            $or: [
                { CustomerName: { $regex: query, $options: 'i' } }, // Case-insensitive search for CustomerName
                { ContactInfo: { $regex: query, $options: 'i' } },  // Case-insensitive search for ContactInfo (phone or email)
                { EnquiryType: { $regex: query, $options: 'i' } }   // Case-insensitive search for EnquiryType
            ]
        }).limit(10); // Optional: Limit the number of results

        // If no enquiries are found, send an error message
        if (enquiries.length === 0) {
            return response.status(404).json({
                message: 'No enquiries found for the search term'
            });
        }

        return response.status(200).json({
            count: enquiries.length,
            data: enquiries
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Route to add a new enquiry
router.post('/', async (request, response) => {
    try {
        const { CustomerName, ContactInfo, EnquiryType, EnquiryDescription, Status } = request.body;

        if (!CustomerName || !ContactInfo || !EnquiryType || !EnquiryDescription || !Status) {
            return response.status(400).send({
                message: 'Please add all required fields: CustomerName, ContactInfo, EnquiryType, EnquiryDescription, Status'
            });
        }

        // Create a new enquiry
        const newEnquiry = new Enquiry({
            CustomerName,
            ContactInfo,
            EnquiryType,
            EnquiryDescription,
            Status
        });

        // Save the enquiry to the database
        const enquiry = await newEnquiry.save();  // Use save() method
        return response.status(201).send(enquiry);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all enquiries from the database
router.get('/', async (request, response) => {
    try {
        const enquiries = await Enquiry.find({});
        return response.status(200).json({
            count: enquiries.length,
            data: enquiries
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get one enquiry from the database by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const enquiry = await Enquiry.findById(id);

        if (!enquiry) {
            return response.status(404).json({ message: 'Enquiry not found' });
        }

        return response.status(200).json({
            data: enquiry
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating an enquiry
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, request.body, { new: true });

        if (!updatedEnquiry) {
            return response.status(404).json({ message: 'Enquiry not found' });
        }

        return response.status(200).send({ message: 'Enquiry updated successfully', data: updatedEnquiry });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete an enquiry 
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Enquiry.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Enquiry not found' });
        }
        return response.status(200).send({ message: 'Enquiry deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/reports/EnquiryVolumeReport', async (request, response) => {
    try {
        const { startDate, endDate } = request.query;

        if (!startDate || !endDate) {
            return response.status(400).json({ message: 'startDate and endDate parameters are required' });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        const data = await Enquiry.aggregate([
            {
                $match: {
                    createdAt: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        return response.status(200).json({ data });
    } catch (error) {
        console.log('Error generating enquiry volume report:', error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/reports/DistributionReport', async (request, response) => {
    try {
        const data = await Enquiry.aggregate([
            {
                $group: {
                    _id: "$Status", // Group by the Status field
                    count: { $sum: 1 } // Count occurrences
                }
            }
        ]);

        // Map the aggregated data to the desired structure
        const formattedData = data.map(entry => ({
            name: entry._id, // Use _id as name
            count: entry.count // Use count from the aggregation
        }));

        return response.status(200).json({ data: formattedData });
    } catch (error) {
        console.log('Error generating distribution report:', error.message);
        response.status(500).send({ message: error.message });
    }
});


router.get('/reports/EnquiryTypeBreakdownReport', async (request, response) => {
    try {
        const data = await Enquiry.aggregate([
            {
                $group: {
                    _id: "$EnquiryType",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Map to a more suitable structure for the PieChart
        const formattedData = data.map(item => ({
            type: item._id, // Change _id to type
            count: item.count
        }));

        return response.status(200).json({ data: formattedData });
    } catch (error) {
        console.log('Error generating enquiry type breakdown report:', error.message);
        response.status(500).send({ message: error.message });
    }
});
// Download individual enquiry as PDF with enhanced design for a travel agency
router.get('/download/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const enquiry = await Enquiry.findById(id);

        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width; // Get page width for centering text

        // Add a header with travel agency branding
        doc.setFillColor(22, 160, 133); // Dark teal for header
        doc.rect(0, 0, pageWidth, 50, 'F'); // Increased height for the header
        doc.setFontSize(22); // Decreased font size for title
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255); // White text color for the title
        doc.text('Exciting Travels', pageWidth / 2, 30, { align: 'center' }); // Centered title

        // Add enquiry details
        doc.setFontSize(16); // Decreased font size for subtitle
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(255, 255, 255); // White subtitle
        doc.text('Enquiry Summary', pageWidth / 2, 45, { align: 'center' }); // Centered subtitle

        // Create a visually appealing table for enquiry data
        const statusColors = {
            'New': [255, 0, 0], // Red
            'Pending': [255, 165, 0], // Orange
            'Completed': [0, 128, 0], // Green
        };

        doc.autoTable({
            head: [['Field', 'Details']],
            body: [
                ['Customer Name', enquiry.CustomerName],
                ['Contact Info', enquiry.ContactInfo],
                ['Enquiry Type', enquiry.EnquiryType],
                ['Description', enquiry.EnquiryDescription],
                ['Status', { content: enquiry.Status, styles: { textColor: statusColors[enquiry.Status] || [0, 0, 0] } }], // Applying color to status
            ],
            startY: 55, // Adjust to start after the title
            theme: 'grid',
            headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255], fontSize: 14, fontStyle: 'bold' }, // Darker header with white text
            bodyStyles: { fillColor: [255, 255, 255], textColor: [40, 40, 40], fontSize: 12 }, // Decreased font size for body
            alternateRowStyles: { fillColor: [230, 230, 230] }, // Light grey alternating rows
            margin: { top: 10 },
        });

        // Add footer with a travel-related message
        doc.setFontSize(10); // Decreased font size for footer
        doc.setTextColor(100, 100, 100); // Soft grey color
        doc.text('Thank you for choosing Exciting Travels.', pageWidth / 2, doc.internal.pageSize.height - 20, { align: 'center' });
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });

        // Set headers for PDF download
        res.setHeader('Content-Disposition', `attachment; filename=${id}.pdf`);
        res.setHeader('Content-Type', 'application/pdf');

        // Send the PDF
        const pdfOutput = doc.output('arraybuffer');
        res.send(Buffer.from(pdfOutput));
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});


// Enquiry Type Report with enhanced design for a travel agency
router.get('/download/type/:type', async (req, res) => {
    try {
        const enquiries = await Enquiry.find({ EnquiryType: req.params.type });

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width; // Get page width for centering text

        // Add a header with travel agency branding
        doc.setFillColor(22, 160, 133); // Dark teal for header
        doc.rect(0, 0, pageWidth, 50, 'F'); // Increased height for the header
        doc.setFontSize(22); // Decreased font size for title
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255); // White text color for the title
        doc.text(`${req.params.type} Enquiries`, pageWidth / 2, 30, { align: 'center' }); // Centered title

        // Create a visually appealing table for the enquiry type report
        doc.autoTable({
            head: [['Customer Name', 'Contact Info', 'Enquiry Type', 'Description', 'Status']],
            body: enquiries.map(enquiry => {
                // Determine color based on status
                let statusColor = [0, 0, 0]; // Default to black
                if (enquiry.Status === 'Completed') {
                    statusColor = [0, 128, 0]; // Green
                } else if (enquiry.Status === 'Pending') {
                    statusColor = [255, 165, 0]; // Orange
                } else if (enquiry.Status === 'New') {
                    statusColor = [255, 0, 0]; // Red
                }

                // Return row with color-coded status
                return [
                    enquiry.CustomerName,
                    enquiry.ContactInfo,
                    enquiry.EnquiryType,
                    enquiry.EnquiryDescription,
                    { content: enquiry.Status, styles: { textColor: statusColor } }, // Applying color to status
                ];
            }),
            startY: 55,
            theme: 'grid',
            headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255], fontSize: 14, fontStyle: 'bold' }, // Darker header with white text
            bodyStyles: { fillColor: [255, 255, 255], textColor: [40, 40, 40], fontSize: 12 }, // Decreased font size for body
            alternateRowStyles: { fillColor: [230, 230, 230] }, // Light grey alternating rows
        });

        // Add footer with a travel-related message
        doc.setFontSize(10); // Decreased font size for footer
        doc.setTextColor(100, 100, 100); // Soft grey color
        doc.text('Thank you for choosing Exciting Travels.', pageWidth / 2, doc.internal.pageSize.height - 20, { align: 'center' });
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });

        // Set headers for PDF download
        res.setHeader('Content-Disposition', `attachment; filename=${req.params.type}-enquiries-report.pdf`);
        res.setHeader('Content-Type', 'application/pdf');

        // Send the PDF
        const pdfOutput = doc.output('arraybuffer');
        res.send(Buffer.from(pdfOutput));
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});


// Route to get enquiry counts by status
router.get('/reports/statusCounts', async (req, res) => {
    const date = req.query.date; // Get the date from the query parameter
    try {
        let data;

        if (date) {
            // Parse the date and create a range for the day
            const startDate = new Date(date); // Start of the day
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 1); // End of the day (next day)

            // Fetch status counts for the specified date
            data = await Enquiry.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: startDate,
                            $lt: endDate
                        }
                    }
                },
                {
                    $group: {
                        _id: "$Status", // Group by Status field
                        count: { $sum: 1 } // Count occurrences of each status
                    }
                }
            ]);
        } else {
            // If no date is provided, fetch all status counts
            data = await Enquiry.aggregate([
                {
                    $group: {
                        _id: "$Status", // Group by Status field
                        count: { $sum: 1 } // Count occurrences of each status
                    }
                }
            ]);
        }

        // Map the data to a more user-friendly format
        const formattedData = data.map(item => ({
            status: item._id, // Status (e.g., "completed", "new", "pending")
            count: item.count // Count of enquiries for each status
        }));

        // Return the formatted data as a JSON response
        return res.status(200).json({ data: formattedData });
    } catch (error) {
        console.error('Error fetching status counts:', error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router; 
