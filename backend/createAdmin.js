import mongoose from 'mongoose'
import Admin from './models/Admin.js'
import dotenv from 'dotenv'

dotenv.config()

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vikram-mehndi')
    
    const existingAdmin = await Admin.findOne({ username: 'admin' })
    if (existingAdmin) {
      console.log('Admin already exists')
      process.exit(0)
    }

    const admin = new Admin({
      username: 'admin',
      email: 'admin@vikrammehndi.com',
      password: 'admin123',
      role: 'super_admin'
    })

    await admin.save()
    console.log('✅ Admin created successfully')
    console.log('Username: admin')
    console.log('Password: admin123')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin:', error)
    process.exit(1)
  }
}

createAdmin()