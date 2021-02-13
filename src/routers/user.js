const express = require('express')
const router = new express.Router()
const user = require('../controllers/user')
const auth = require('../middleware/auth')

//User Signup
router.post('/users/signup',user.user_create)

//User Login
router.post('/users/login',user.user_login)

//User logout
router.post('/users/logout',auth,user.user_logout)

//Display User Profile - Testing only
router.get('/users/me',auth, async(req,res)=>{
    res.send(req.user)
})

module.exports = router