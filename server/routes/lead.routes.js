const express = require('express')
const router = express.Router()
const { createLead, getLeads, updateLead } = require('../controllers/leadController')

router.post('/', createLead)
router.get('/', getLeads)
router.put('/:id', updateLead)

module.exports = router