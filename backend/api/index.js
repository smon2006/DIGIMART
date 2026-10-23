const app = require('../app')
const { connectOnce } = require('../utiles/db')

module.exports = async (req, res) => {
    try {
        await connectOnce()
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: 'Database connection failed' })
    }
    return app(req, res)
}
