const express = require('express')
const router = express.Router()
const { getProfiles, createProfile } = require('../controllers/marriageProfileController')
router.get('/', getProfiles)
router.post('/', createProfile)
module.exports = router