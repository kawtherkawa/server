const express = require ("express")
const { register, login, updateInfoUser, getOneUser, getUsers } = require("../controllers/user")
const isAuth = require("../middelwares/isAuth")
const { registerValidator, loginValidator, validation } = require("../middelwares/Validator")

const router=express.Router()


router.post('/register',registerValidator(),validation, register)

router.post('/login',loginValidator(),validation, login)

router.get('/current',isAuth, (req,res)=>{
    res.send(req,user)
})

router.put('/:_id', validation, updateInfoUser) 

router.get('/:_id',getOneUser) 
router.get('/all/Users',getUsers)  

module.exports = router