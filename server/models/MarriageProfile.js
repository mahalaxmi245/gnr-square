const mongoose = require('mongoose')
const marriageProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  education: { type: String },
  profession: { type: String },
  religion: { type: String },
  caste: { type: String },
  location: { type: String },
  photo: { type: String },
  about: { type: String },
  interests: [{ type: String }],
  lifestyle: { type: String },
  dob: { type: String },
  height: { type: String },
  verified: { type: Boolean, default: false },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('MarriageProfile', marriageProfileSchema)