const Lead = require('../models/Lead')

const createLead = async (req, res) => {
  try {
    const { name, phone, service, message, formData } = req.body
    const lead = await Lead.create({ name, phone, service, message, formData })
    res.status(201).json({ success: true, lead })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 })
    res.json({ success: true, leads })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, lead })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { createLead, getLeads, updateLead }