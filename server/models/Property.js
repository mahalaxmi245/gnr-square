const mongoose = require('mongoose')
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  listingType: { type: String, enum: ['buy', 'sell', 'rent'], required: true },
  propertyType: { type: String },
  price: { type: String, required: true },
  location: { type: String, required: true },
  area: { type: String },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  description: { type: String },
  photos: [{ type: String }],
  amenities: [{ type: String }],
  featured: { type: Boolean, default: false },
  status: { type: String, default: 'available' },
  createdAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('Property', propertySchema)