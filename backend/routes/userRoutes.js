const express = require('express')
const {registerUser, getMe, loginUser} = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware");
const router = express.Router()

router.post('/', registerUser)
router.get('/me', protect, getMe)
router.post('/login', loginUser)

module.exports = router

