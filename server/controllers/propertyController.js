const Property = require('../models/Property')

const getProperties = async (req, res) => {
  try {
    const { type } = req.query
    let query = {}
    if (type && type !== 'all') query.listingType = type
    const properties = await Property.find(query).sort({ createdAt: -1 })
    res.json({ success: true, properties })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body)
    res.status(201).json({ success: true, property })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Property deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { getProperties, createProperty, deleteProperty }