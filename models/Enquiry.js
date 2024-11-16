import mongoose from 'mongoose';


const enquirySchema = new mongoose.Schema(
    {
        Date: {
            type: Date,
            default: Date.now, // Default to the current date
        },
        
        CustomerName: {
            type: String,
            required: true,
        },  
        
        ContactInfo: {
            type: String,
            required: true,
        },
        EnquiryType: {
            type: String,
            required: true,
        },
        EnquiryDescription: {
            type: String,
            required: true,
        },
        Status: {
            type: String,
            required: true,
        },
        
    },
    
    {
        timestamps: true,
    }
);

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
