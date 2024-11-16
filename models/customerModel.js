import mongoose from 'mongoose';

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    passportNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    arrivalDate: {
      type: String,
      required: true,
    },
    departureDate: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    emergencyContact: {
      name: { type: String, required: false },
      phoneNo: { type: String, required: false },
    },
    bookingReference: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Customer = mongoose.model('Customer', customerSchema);
