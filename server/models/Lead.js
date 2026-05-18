const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String },
  formData: { type: Object },
  status: { type: String, default: 'new' },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Lead', leadSchema)