require('dotenv').config()
const http = require('http')
const app = require('./app')
const attachSocket = require('./socket')
const { dbConnect } = require('./utiles/db')

const server = http.createServer(app)
attachSocket(server)

const port = process.env.PORT
dbConnect()
server.listen(port, () => console.log(`Server is running on port ${port}`))
