require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const adminModel = require('./models/adminModel')

// ---- EDIT THESE THREE VALUES ----
const ADMIN_NAME = 'Admin'
const ADMIN_EMAIL = 'admin@gmail.com'
const ADMIN_PASSWORD = 'admin123'
// ----------------------------------

const run = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Database connected..')

        const existing = await adminModel.findOne({ email: ADMIN_EMAIL })
        if (existing) {
            console.log('An admin with this email already exists. Nothing created.')
            process.exit(0)
        }

        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10)

        await adminModel.create({
            name: ADMIN_NAME,
            email: ADMIN_EMAIL,
            password: hashedPassword,
            image: 'https://via.placeholder.com/150',
            role: 'admin'
        })

        console.log('Admin created successfully!')
        console.log('Email:', ADMIN_EMAIL)
        console.log('Password:', ADMIN_PASSWORD)
        process.exit(0)
    } catch (error) {
        console.error('Error creating admin:', error.message)
        process.exit(1)
    }
}

run()