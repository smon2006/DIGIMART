const mongoose = require('mongoose')
module.exports.dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database connected..")
    } catch (error) {
        console.log(error.message)
    }
}
const cached = global._mongo || (global._mongo = { conn: null, promise: null })

module.exports.connectOnce = async () => {
    if (cached.conn) return cached.conn
    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.DB_URL, {
            bufferCommands: false,
            maxPoolSize: 5,
            serverSelectionTimeoutMS: 8000
        })
    }
    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null   // allow a retry on the next request
        throw e
    }
    return cached.conn
}
