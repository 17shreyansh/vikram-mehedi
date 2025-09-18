import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  name: {
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
  phone: {
    type: String,
    required: true,
    trim: true
  },
  service: {
    type: String,
    required: true,
    enum: ['Bridal Mehndi', 'Arabic Mehndi', 'Indo-Western', 'Party Mehndi', 'General Inquiry']
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Replied', 'Closed'],
    default: 'New'
  },
  replied: {
    type: Boolean,
    default: false
  },
  replyMessage: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

contactSchema.index({ status: 1, createdAt: -1 })
contactSchema.index({ email: 1 })

export default mongoose.model('Contact', contactSchema)