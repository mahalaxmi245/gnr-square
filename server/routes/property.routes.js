const express = require('express')
const router = express.Router()
const { getProperties, createProperty, deleteProperty } = require('../controllers/propertyController')
router.get('/', getProperties)
router.post('/', createProperty)
router.delete('/:id', deleteProperty)
module.exports = router