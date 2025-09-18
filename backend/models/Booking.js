import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  service: {
    type: String,
    required: true,
    enum: ['Bridal Mehndi', 'Arabic Mehndi', 'Indo-Western', 'Party Mehndi']
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    trim: true
  },
  guests: {
    type: Number,
    default: 1
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  amount: {
    type: Number,
    min: 0
  },
  advance: {
    type: Number,
    min: 0,
    default: 0
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

bookingSchema.index({ date: 1, status: 1 })
bookingSchema.index({ email: 1 })

export default mongoose.model('Booking', bookingSchema)