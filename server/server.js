const dns = require('dns')
dns.setDefaultResultOrder('ipv4first')

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

app.get('/', (req, res) =>
  res.json({ message: 'GNR Square API is running!' })
)

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/leads', require('./routes/lead.routes'))
app.use('/api/properties', require('./routes/property.routes'))
app.use('/api/marriage-profiles', require('./routes/marriageProfile.routes'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
)
