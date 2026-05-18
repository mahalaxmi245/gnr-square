const MarriageProfile = require('../models/MarriageProfile')

const getProfiles = async (req, res) => {
  try {
    const { gender } = req.query
    let query = { status: 'active' }
    if (gender) query.gender = gender
    const profiles = await MarriageProfile.find(query).sort({ createdAt: -1 })
    res.json({ success: true, profiles })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const createProfile = async (req, res) => {
  try {
    const profile = await MarriageProfile.create(req.body)
    res.status(201).json({ success: true, profile })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { getProfiles, createProfile }