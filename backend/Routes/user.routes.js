const express = require('express')
const {signupUser,loginUser} = require('../Controllers/user.controller')
const upload = require('../Middleware/multer')
const router = express.Router()



router.post('/signup',upload.single('photo'),signupUser)

router.post('/login',loginUser)



module.exports = router