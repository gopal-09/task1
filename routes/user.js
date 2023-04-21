const express=require('express')
const {signup,login,create,update,delemp,getall}= require('../controllers/userc')
const router =express.Router()
router.post('/signup',signup)
router.post('/login',login)
router.post('/create',create)
router.put('/update/:id',update)
router.delete('/delete/:id',delemp)
router.get('/get',getall)

//router.post('/forgotpass',forgotpassword)

module.exports=router